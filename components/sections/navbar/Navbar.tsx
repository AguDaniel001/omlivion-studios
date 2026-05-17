"use client";

import { useState } from "react";
import Link from "next/link";
import NavOverlay from "./NavOverlay";
import DaButton from "@/components/ui/buttons/DaButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[110] bg-transparent">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter mix-blend-difference text-white">
            OMLIVION
          </Link>
        </div>
      </nav>

      <DaButton variant="underline" className="fixed top-7 right-25" >let's talk</DaButton>

      {/* Fixed Menu Button at Top Right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-6 z-[120] group flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 transition-transform active:scale-95"
      >
        <div className="relative flex flex-col items-center justify-center w-6 gap-1.5 z-10">
          <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </div>
        <div className="absolute inset-0 bg-zinc-800 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
      </button>

      <NavOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
