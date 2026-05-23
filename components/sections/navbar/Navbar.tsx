"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
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
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const handleMagnet = (e: React.MouseEvent) => {
    const btn = hamburgerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(btn, {
      x: x * 1.5, // Increased intensity
      y: y * 1.5,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const resetMagnet = () => {
    gsap.to(hamburgerRef.current, {
      x: 0,
      y: 0,
      duration: 1, // Longer duration for better bounce visibility
      ease: "elastic.out(1, 0.9)", // More pronounced bounce
      overwrite: "auto",
    });
  };

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
  
  // For cutout effect: 
  // - Dark circle (Black) + White spans + mix-blend-multiply = Black circle with background-colored holes
  // - Light circle (White) + Black spans + mix-blend-screen = White circle with background-colored holes
  const hamburgerBg = isDarkElements ? "bg-black" : "bg-white";
  const hamburgerSpan = isDarkElements ? "bg-white" : "bg-black";
  const blendClass = isDarkElements ? "mix-blend-multiply" : "mix-blend-screen";

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
      <nav ref={containerRef} className={`navbar fixed top-8 left-0 w-full z-[110] bg-transparent transition-all duration-100 ease-in-out ${colorClass}`}>
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
                <path d="M29.2793 48.5293C24.5269 49.4745 19.6007 48.9891 15.124 47.1348C10.6474 45.2804 6.82093 42.1402 4.1289 38.1113C1.43687 34.0824 1.65726e-05 29.3456 -5.11432e-06 24.5C-5.11432e-06 18.0022 2.58118 11.7704 7.17578 7.17579C11.7704 2.58116 18.0022 2.09342e-05 24.5 6.67333e-06C29.3456 6.67333e-06 34.0823 1.43687 38.1113 4.12891C42.1403 6.82096 45.2804 10.6473 47.1348 15.124C48.9891 19.6007 49.4746 24.5269 48.5293 29.2793C47.584 34.0318 45.2506 38.3978 41.8242 41.8242C38.3978 45.2506 34.0318 47.584 29.2793 48.5293ZM24.5 45.3955C28.6343 45.3966 32.6762 44.1712 36.1143 41.875C39.5522 39.5788 42.2318 36.3145 43.8144 32.4951C45.397 28.6758 45.8121 24.4728 45.0059 20.418C44.1995 16.3631 42.2085 12.6382 39.2852 9.71485C36.3618 6.79147 32.6369 4.80047 28.582 3.99415C24.5272 3.18786 20.3242 3.60301 16.5049 5.18555C12.6855 6.76819 9.42026 9.44773 7.12402 12.8857C4.82787 16.3237 3.60341 20.3658 3.60449 24.5C3.61172 30.0397 5.81528 35.3505 9.73242 39.2676C13.6496 43.1847 18.9603 45.3883 24.5 45.3955ZM22.8281 37.3272L14.7764 15.2715H17.8525C18.2642 15.2709 18.6658 15.4003 19 15.6406C19.334 15.881 19.5845 16.22 19.7148 16.6104L20.5693 19.1748L21.7129 22.7959L24.4072 30.8203L27.1953 22.7959L28.4033 19.1748L29.2861 16.5947C29.4197 16.2086 29.6702 15.8729 30.0029 15.6357C30.3356 15.3988 30.7342 15.2717 31.1426 15.2715H34.2295L26.2041 37.3272H22.8281Z" fill={iconColor}/>
              </svg>
            </div>
          </Link>

          <div className="flex irems-center gap-3 ">
            <div className="flex-1 pt-3 items-center h-full">
                <Link href="/contact" className={`   my-auto    z-[110] mr-12 transition-all duration-100 ease-in-out ${colorClass}`}>
                <DaButton variant="underline">let&apos;s talk</DaButton>
              </Link>
            </div>
             

            <div 
              className="z-[120] flex items-center justify-center w-16 h-16 -mr-6" // Larger trigger area
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
            >
              <button
                ref={hamburgerRef}
                onClick={() => setIsOpen(!isOpen)}
                data-magnetic="true"
                className={`group flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-100 ease-in-out active:scale-95 ${hamburgerBg} ${blendClass}`}
              >
                <div className="relative flex flex-col items-end justify-center w-5 gap-1 z-10">
                  <span className={`block w-full h-0.5 transition-all duration-500 ${hamburgerSpan} ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                  <span className={`block w-full h-0.5 !w-4 transition-all duration-500 ${hamburgerSpan} ${isOpen ? "opacity-0" : "opacity-100"}`} />
                  <span className={`block w-full h-0.5 transition-all duration-500 ${hamburgerSpan} ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </div>
              </button>
            </div>
          </div>
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
