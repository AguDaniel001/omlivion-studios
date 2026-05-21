"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import DaText from "@/components/ui/typography/DaText";
import DaSectionContainer from "@/components/layout/DaSectionContainer";
import { revealBackground } from "@/lib/gsap/animations";

export default function QuoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgFillRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal Background
      if (bgFillRef.current && sectionRef.current) {
        revealBackground(bgFillRef.current, sectionRef.current);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main 
      ref={sectionRef} 
      className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Fill */}
      <div 
        ref={bgFillRef} 
        className="absolute inset-0 bg-bg-accent z-0" 
      />

      <DaSectionContainer className="relative z-20 w-full max-w-[1100px] flex flex-col ">
        <DaText variant="overline" color="white" className="pb-10">
          A Digital Agency
        </DaText>
        <DaText variant="bodyLg" color="white" className="pl-8">
          We are a web design and development company, building websites 
          that drive traffic, engagement, and conversion for industry-leading 
          brands and startups in Africa.
        </DaText>
      </DaSectionContainer>
    </main>
  );
}
