"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import DaButton from "@/components/ui/buttons/DaButton";

interface NavActionsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  colorClass: string;
}

export default function NavActions({
  isOpen,
  setIsOpen,
  colorClass,
}: NavActionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const handleMagnet = (e: React.MouseEvent) => {
    const btn = hamburgerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(btn, {
      x: x * 1.5,
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
      duration: 1,
      ease: "elastic.out(1, 0.9)",
      overwrite: "auto",
    });
  };

  useLayoutEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        y: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.1,
      });
    }
  }, []);

  const isDarkElements = colorClass.includes("text-dark");
  const hamburgerBg = isDarkElements ? "bg-black" : "bg-white";
  const hamburgerSpan = isDarkElements ? "bg-white" : "bg-black";
  const blendClass = isDarkElements ? "mix-blend-multiply" : "mix-blend-screen";

  return (
    <div ref={containerRef} className="flex gap-3 pointer-events-auto">
      <div className="flex-1 pt-3 items-center h-full">
        <Link 
          href="/contact" 
          className={`my-auto z-[110] mr-12 transition-all duration-100 ease-in-out ${colorClass}`}
        >
          <DaButton variant="underline">let&apos;s talk</DaButton>
        </Link>
      </div>

      <div 
        className="z-[120] flex items-center justify-center w-16 h-16 -mr-6"
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
  );
}
