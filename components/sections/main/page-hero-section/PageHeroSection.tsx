"use client";

import { useRef } from "react";
import DaSectionContainer from "@/components/layout/DaSectionContainer";
import DaText from "@/components/ui/typography/DaText";
import { Spark } from "@/components/ui/Spark";
import { Circle } from "@/components/ui/Circle";
import { usePageHeroAnimation } from "@/hooks/usePageHeroAnimation";
import DaButton from "@/components/ui/buttons/DaButton";

interface PageHeroSectionProps {
  overline?: string;
  headline?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function PageHeroSection({
  overline = "We are omlivion",
  headline = "A digital agency focused on web.",
  description,
  ctaText,
  ctaHref
}: PageHeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  const headlineWords = headline.split(" ");

  // Orchestrate animations via custom hook
  usePageHeroAnimation({
    section: sectionRef,
    overline: overlineRef,
    headline: headlineRef,
    description: descriptionRef,
    cta: ctaRef,
    spark: sparkRef,
    circle: circleRef,
  });

  return (
    <section data-theme="light" ref={sectionRef} className="relative overflow-hidden bg-white h-[84vh]">
      
      {/* Background decoration */}

      <Circle ref={circleRef} size="120vh" className="absolute -bottom-30  right-0" />
      <DaSectionContainer className="relative z-10 flex h-full  flex-col items-start justify-center max-w-7xl mx-auto">
      <Spark variant="sparkAfrica" color='#dcdcdc' accentColor='#dcdcdc' className="w-40 h-40 " />
  
        <div className="relative z-10 flex w-full">
          <div className="w-full max-w-4xl flex-shrink-0">
            <div ref={overlineRef} style={{ opacity: 0 }}>
              <DaText variant="overline" size="base" className="pb-14">
                {overline}
              </DaText>
            </div>
            
            <div ref={headlineRef}>
            <DaText className="pl-10 flex flex-wrap max-w-3xl  " size="5xl2"  variant="headlineLg" color="primary">
                {headlineWords.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden mr-[0.25em] leading-[1.3]">
                    <span className="word-inner inline-block">
                      {word}
                    </span>
                  </span>
                ))}
              </DaText>
            </div>

            {/* {ctaText && (
              <div ref={ctaRef} style={{ opacity: 0 }} className="pl-8 mt-4">
                <DaButton variant="circle-plus" className="text-dark" href={ctaHref}>
                  {ctaText}
                </DaButton>
              </div>
            )} */}
          </div>
          <div className="flex-1 hidden lg:block" />

           {description && (
            <div 
                ref={descriptionRef} 
                className="absolute bottom-16 right-10 lg:right-20 w-full max-w-[250px]  text-left lg:text-right"
                style={{ opacity: 0 }}
            >
                <DaText
                className="mt-0 w-full"
                variant="bodySm"
                color="tertiary"
                >
                {description}
                </DaText>
            </div>
            )}
        </div>

       
      </DaSectionContainer>
    </section>
  );
}
