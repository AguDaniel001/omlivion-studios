"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavOverlay from "./NavOverlay";
import { useThemeDetection } from "@/lib/gsap/gsapTheme";
import NavLogo from "./NavLogo";
import NavActions from "./NavActions";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLight = useThemeDetection();
  const containerRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const logoIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);

      // 1. Initial State for swapped logo
      gsap.set(logoIconRef.current, { opacity: 0, scale: 0.9, display: "none" });

      // 2. Scroll Animation
      const tl = gsap.timeline({ paused: true });

      tl.to(q(".logo-path"), {
        x: -25,
        opacity: 0,
        stagger: 0.08,
        duration: 1.2,
        ease: "power2.inOut",
      })
      .set(logoTextRef.current, { display: "none" })
      .set(logoIconRef.current, { display: "block" })
      .to(logoIconRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
      }, "-=0.4");

      ScrollTrigger.create({
        start: 1,
        onToggle: (self) => {
          gsap.to(tl, { 
            progress: self.isActive ? 1 : 0, 
            duration: self.isActive ? 2.0 : 0.8, 
            ease: "power2.inOut",
            overwrite: "auto"
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const isDarkElements = (isOpen && !isLight) || (!isOpen && isLight);
  const colorClass = isDarkElements ? "text-dark" : "text-white";
  const iconColor = isDarkElements ? "#1f1e1d" : "#ffffff";
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        color: isDarkElements ? "var(--color-dark)" : "var(--color-white)",
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDarkElements]);

  return (
    <>
      <nav ref={containerRef} className={`navbar fixed top-8 left-0 w-full z-[110] bg-transparent transition-all duration-100 ease-in-out pointer-events-none ${colorClass}`}>
        <div className=" px-10 h-20 flex items-center justify-between">
          <NavLogo 
            iconColor={iconColor} 
            onClick={() => setIsOpen(false)}
            logoTextRef={logoTextRef}
            logoIconRef={logoIconRef}
          />

          <NavActions 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            colorClass={colorClass}
          />
        </div>
      </nav>

      <NavOverlay 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        isLightSection={isLight}
      />
    </>
  );
}
