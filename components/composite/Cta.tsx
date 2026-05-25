"use client";

import { useRef } from "react";
import DaSectionContainer from "@/components/layout/DaSectionContainer";
import DaText from "@/components/ui/typography/DaText";
import DaButton from "@/components/ui/buttons/DaButton";
import DaSectionHeader from "@/components/layout/DaSectionHeader";
import { useQuoteAnimation } from "@/hooks/useQuoteAnimation";
import { Circle } from "@/components/ui/Circle";
import { Spark } from "@/components/ui/Spark";
import { cn } from "@/lib/utils";

interface CtaSectionProps {
  /** Background fill color. Default: "brand" */
  bgFill?: "brand" | "dark" | "white";
  /** Overline text above the headline. Default: "We are omlivion" */
  overline?: string;
  /** Main headline text. Default: "Let’s work together to build something great." */
  headline?: string;
  /** Button label. Default: "Let's Talk" */
  buttonText?: string;
  /** Button destination URL. Default: "/contact" */
  buttonHref?: string;
  /** Additional classes for the section container */
  className?: string;
  /** Whether to show the decorative spark. Default: true */
  showSpark?: boolean;
  /** Whether to show the decorative circle. Default: true */
  showCircle?: boolean;
}

/**
 * Reusable CTA Section with configurable background and automatic text color adjustment.
 * Supports "brand" (bg-bg-brand), "dark" (bg-bg-dark), and "white" (bg-white) fills.
 */
export default function CtaSection({
  bgFill = "brand",
  overline = "We are omlivion",
  headline = "Let’s work together to build something great.",
  buttonText = "Let's Talk",
  buttonHref = "/contact",
  className,
  showSpark = true,
  showCircle = true,
}: CtaSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgFillRef = useRef<HTMLDivElement>(null);

  useQuoteAnimation({
    section: sectionRef,
    bgFill: bgFillRef,
  });

  const isWhite = bgFill === "white";
  
  // Map internal prop to Tailwind classes as requested
  const bgClasses = {
    brand: "bg-bg-brand",
    dark: "bg-bg-dark",
    white: "bg-white",
  };

  // Automatic color selection based on background theme
  const textColor = isWhite ? "primary" : "white";
  const buttonClassName = isWhite ? "text-primary" : "text-white";
  
  // Decorative element colors adjusted for visibility on light/dark backgrounds
  const sparkColor = isWhite ? "#00000020" : "#dddddd49";
  const sparkAccentColor = isWhite ? "#111111" : "#dcdcdc";
  const circleStroke = isWhite ? "#11111120" : "#ffffff";

  return (
    <section 
      data-theme={isWhite ? "light" : "dark"}
      ref={sectionRef} 
      className={cn(
        "relative min-h-[80vh] overflow-hidden flex justify-center w-full",
        className
      )}
    >
      {showSpark && (
        <Spark 
          variant="sparkAfrica" 
          color={sparkColor} 
          accentColor={sparkAccentColor} 
          className="w-40 h-40 z-10 absolute right-20 top-50" 
        />
      )}
      
      {showCircle && (
        <Circle 
          size="120vh" 
          stroke={circleStroke} 
          className="absolute -bottom-30 z-10 right-1" 
        />
      )}

      {/* Animated Background Fill */}
      <div 
        ref={bgFillRef} 
        className={cn("absolute inset-0 z-0", bgClasses[bgFill])} 
      />

      <DaSectionContainer className="relative z-5 w-full mx-auto max-w-[1200px] flex-col">
        <div className="pb-14">
          <DaText variant="overline" color={textColor}>
            {overline}
          </DaText>
        </div>
        
        <DaSectionHeader 
          headline={headline}
          variant="headlineSm"
          color={textColor}
          align="left"
          className="mb-8 pl-10"
          maxW="700px"
        />

        <div className="pl-10 mt-4">
          <DaButton 
            variant="circle-plus" 
            className={cn("w-38.5", buttonClassName)} 
            href={buttonHref}
          >
            {buttonText}
          </DaButton>
        </div>
      </DaSectionContainer>
    </section>
  );
}
