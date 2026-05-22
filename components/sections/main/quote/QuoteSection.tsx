import { useRef } from "react";
import DaText from "@/components/ui/typography/DaText";
import DaSectionContainer from "@/components/layout/DaSectionContainer";
import { useQuoteAnimation } from "@/hooks/useQuoteAnimation";

export default function QuoteSection() {
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
        <DaText variant="bodyXl" color="white" className="pl-8">
          We are a web design and development company, building websites 
          that drive traffic, engagement, and conversion for industry-leading 
          brands and startups in Africa.
        </DaText>
      </DaSectionContainer>
    </section>
  );
}
