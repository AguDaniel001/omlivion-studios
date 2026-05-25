"use client";

import { useRef } from "react";
import DaSectionContainer from "@/components/layout/DaSectionContainer";
import DaText from "@/components/ui/typography/DaText";
import DaButton from "@/components/ui/buttons/DaButton";
import DaSectionHeader from "@/components/layout/DaSectionHeader";
import { useQuoteAnimation } from "@/hooks/useQuoteAnimation";
import { Circle } from "@/components/ui/Circle";
import { Spark } from "@/components/ui/Spark";

export default function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgFillRef = useRef<HTMLDivElement>(null);

  useQuoteAnimation({
    section: sectionRef,
    bgFill: bgFillRef,
  });

  return (
    <section 
      data-theme="dark"
      ref={sectionRef} 
      className="relative min-h-[80vh] overflow-hidden flex justify-center w-full"
      >
      <Spark variant="sparkAfrica" color='#dddddd49' accentColor='#dcdcdc' className="w-40 h-40 z-10 absolute right-20 top-50" />
      {/* Animated Background Fill */}
      <Circle size="120vh" stroke="#ffffff" className="absolute -bottom-30 z-10 right-1" />
      <div 
        ref={bgFillRef} 
        className="absolute inset-0 bg-bg-accent z-0" 
      />
      <DaSectionContainer className="relative  z-5  w-full mx-auto  max-w-[1200px] flex-col">

       
          <div className="pb-14">
            <DaText variant="overline" color="white">
              We are omlivion
            </DaText>
          </div>
          
          <DaSectionHeader 
            headline="Let’s work together to build something great."
            variant="headlineSm"
            color="white"
            align="left"
            className="mb-8 pl-10"
            maxW="700px"
          />

          <div className="pl-10 mt-4">
            <DaButton variant="circle-plus" className="text-light" href="/contact">
              Let's Talk
            </DaButton>
          </div>
      </DaSectionContainer>
    </section>
  );
}
