"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavOverlay from "./NavOverlay";
import DaButton from "@/components/ui/buttons/DaButton";
import { useThemeDetection } from "@/lib/gsap/gsapTheme";

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

      // 1. Initial State
      gsap.set(logoIconRef.current, { opacity: 0, scale: 0.9, display: "none" });

      // 2. Page Load Animation
      gsap.from(logoTextRef.current, {
        y: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // 3. Scroll Animation
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
  const hamburgerBg = isDarkElements ? "bg-dark" : "bg-white";
  const hamburgerSpan = isDarkElements ? "bg-white" : "bg-black";

  return (
    <>
      <nav ref={containerRef} className={`navbar fixed top-8 left-0 w-full z-[110] bg-transparent transition-all duration-500 ${colorClass}`}>
        <div className=" px-10 h-20 flex items-center justify-between">
          <Link href="/" className="relative flex items-center h-10" onClick={() => setIsOpen(false)}>
            {/* Logo Text SVG */}
            <div ref={logoTextRef} className="flex items-center">
              <svg width="130" height="29" viewBox="0 0 187 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="logo-path transition-all duration-500" d="M0 8.15752C0 6.64838 0.384524 5.282 1.15357 4.05837C1.93611 2.82114 2.975 1.83544 4.27024 1.10127C5.56548 0.367089 7.00238 0 8.58095 0H15.3202C16.8988 0 18.3357 0.367089 19.631 1.10127C20.9397 1.83544 21.9786 2.82114 22.7476 4.05837C23.5167 5.282 23.9012 6.64838 23.9012 8.15752V20.8425C23.9012 22.338 23.5167 23.7044 22.7476 24.9416C21.9786 26.1789 20.9397 27.1646 19.631 27.8987C18.3357 28.6329 16.8988 29 15.3202 29H8.58095C7.00238 29 5.56548 28.6329 4.27024 27.8987C2.975 27.1646 1.93611 26.1789 1.15357 24.9416C0.384524 23.7044 0 22.338 0 20.8425V8.15752ZM4.27024 20.8629C4.27024 21.9233 4.68849 22.8343 5.525 23.5956C6.375 24.3434 7.39365 24.7173 8.58095 24.7173H15.3202C16.521 24.7173 17.5397 24.3434 18.3762 23.5956C19.2127 22.8343 19.631 21.9233 19.631 20.8629V8.13713C19.631 7.07665 19.2127 6.17253 18.3762 5.42475C17.5397 4.66338 16.521 4.2827 15.3202 4.2827H8.58095C7.39365 4.2827 6.375 4.66338 5.525 5.42475C4.68849 6.17253 4.27024 7.07665 4.27024 8.13713V20.8629Z" fill={iconColor}/>
                <path className="logo-path transition-all duration-500" d="M29.5881 0H33.494L42.7833 11.4409L52.0726 0H55.9786V29H51.7083V7.32138L44.5643 16.0499H41.0226L33.8583 7.32138V29H29.5881V0Z" fill={iconColor}/>
                <path className="logo-path transition-all duration-500" d="M61.6452 0H65.8952V20.8833C65.8952 21.9437 66.2663 22.8479 67.0083 23.5956C67.7504 24.3434 68.6409 24.7173 69.6798 24.7173H83.9476V29H69.6798C68.2091 29 66.8599 28.6397 65.6321 27.9191C64.4179 27.185 63.4464 26.206 62.7179 24.9824C62.0028 23.7452 61.6452 22.3788 61.6452 20.8833V0Z" fill={iconColor}/>
                <path className="logo-path transition-all duration-500" d="M87.5905 0H91.8607V29H87.5905V0Z" fill={iconColor}/>
                <path className="logo-path transition-all duration-500" d="M100.077 0L108.496 23.7792L116.895 0H121.449L111.148 29H105.825L95.5238 0H100.077Z" fill={iconColor}/>
                <path className="logo-path transition-all duration-500" d="M125.112 0H129.382V29H125.112V0Z" fill={iconColor}/>
                <path className="logo-path transition-all duration-500" d="M135.069 8.15752C135.069 6.64838 135.454 5.282 136.223 4.05837C137.005 2.82114 138.044 1.83544 139.339 1.10127C140.635 0.367089 142.071 0 143.65 0H150.389C151.968 0 153.405 0.367089 154.7 1.10127C156.009 1.83544 157.048 2.82114 157.817 4.05837C158.586 5.282 158.97 6.64838 158.97 8.15752V20.8425C158.97 22.338 158.586 23.7044 157.817 24.9416C157.048 26.1789 156.009 27.1646 154.7 27.8987C153.405 28.6329 151.968 29 150.389 29H143.65C142.071 29 140.635 28.6329 139.339 27.8987C138.044 27.1646 137.005 26.1789 136.223 24.9416C135.454 23.7044 135.069 22.338 135.069 20.8425V8.15752ZM139.339 20.8629C139.339 21.9233 139.758 22.8343 140.594 23.5956C141.444 24.3434 142.463 24.7173 143.65 24.7173H150.389C151.59 24.7173 152.609 24.3434 153.445 23.5956C154.282 22.8343 154.7 21.9233 154.7 20.8629V8.13713C154.7 7.07665 154.282 6.17253 153.445 5.42475C152.609 4.66338 151.59 4.2827 150.389 4.2827H143.65C142.463 4.2827 141.444 4.66338 140.594 5.42475C139.758 6.17253 139.339 7.07665 139.339 8.13713V20.8629Z" fill={iconColor}/>
                <path className="logo-path transition-all duration-500" d="M164.657 0H170.202L182.73 22.7799V0H187V29H181.455L168.927 6.52602V29H164.657V0Z" fill={iconColor}/>
              </svg>
            </div>

            {/* Logo Icon SVG */}
            <div ref={logoIconRef} className="flex items-center">
              <svg width="40" height="40" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="transition-all duration-500" d="M24.5 0C38.031 0 49 10.969 49 24.5C49 38.031 38.031 49 24.5 49C10.969 49 0 38.031 0 24.5C0 10.969 10.969 0 24.5 0ZM24.5 3C12.6259 3 3 12.6259 3 24.5C3 36.3741 12.6259 46 24.5 46C36.3741 46 46 36.3741 46 24.5C46 12.6259 36.3741 3 24.5 3ZM25.0225 30.4062L31.1582 17H35L26.1865 36H23.791L15 17H18.8418L25.0225 30.4062Z" fill={iconColor}/>
              </svg>
            </div>
          </Link>

          <div className="flex justify-end items-center">
             <Link href="/contact" className={`z-[110] mr-12 transition-all duration-500 ${colorClass}`}>
              <DaButton variant="underline">let&apos;s talk</DaButton>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`z-[120] group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 active:scale-95 ${hamburgerBg}`}
            >
              <div className="relative flex flex-col items-center justify-center w-6 gap-1.5 z-10">
                <span className={`block w-full h-0.5 transition-all duration-500 ${hamburgerSpan} ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-full h-0.5 transition-all duration-500 ${hamburgerSpan} ${isOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`block w-full h-0.5 transition-all duration-500 ${hamburgerSpan} ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <NavOverlay 
        key={isOpen ? "open" : "closed"} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        isLightSection={isLight}
      />
    </>
  );
}
