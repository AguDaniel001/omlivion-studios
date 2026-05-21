"use client";

import { useRef } from "react";
import DaSectionContainer from "@/components/layout/DaSectionContainer";
import DaButton from "@/components/ui/buttons/DaButton";
import DaText from "@/components/ui/typography/DaText";
import { Spark } from "@/components/ui/Spark";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";

/**
 * HeroBackgroundSVG
 * Uses the exact paths from the user's HeroBackgroundSVG.svg.
 */
const HeroBackgroundSVG = ({ 
  vGradientRef, 
  othersGradientRef,
  otherPathsRef,
  vPathRef
}: { 
  vGradientRef: React.RefObject<SVGLinearGradientElement | null>, 
  othersGradientRef: React.RefObject<SVGLinearGradientElement | null>,
  otherPathsRef: React.RefObject<SVGGElement | null>,
  vPathRef: React.RefObject<SVGPathElement | null>
}) => (
  <svg
    viewBox="0 0 29 103"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="hero-svg h-full w-auto"
  >
    <defs>
      {/* 
        The gradient for the V.
        Wipe from Transparent to Black (Left to Right).
        Initial: x1=-100%, x2=0% -> Object is in the 'after' zone (Transparent)
        Final: x1=100%, x2=200% -> Object is in the 'before' zone (Black)
      */}
      <linearGradient id="v-wipe-gradient" x1="-100%" y1="0%" x2="0%" y2="0%" gradientUnits="userSpaceOnUse" ref={vGradientRef}>
        <stop offset="0%" stopColor="black" />
        <stop offset="50%" stopColor="black" />
        <stop offset="50%" stopColor="transparent" /> 
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>

      {/* 
        The gradient for the other paths (O, Bars, L).
        Wipe from White to ON_DARK_COLOR (Right to Left).
        Initial: x1=100%, x2=200% -> Object is in the 'before' zone (White)
        Final: x1=-100%, x2=0% -> Object is in the 'after' zone (ON_DARK_COLOR)
      */}
      <linearGradient id="others-wipe-gradient" x1="100%" y1="0%" x2="200%" y2="0%" gradientUnits="userSpaceOnUse" ref={othersGradientRef}>
        <stop offset="0%" stopColor="white" />
        <stop offset="50%" stopColor="white" />
        <stop offset="50%" stopColor="#323135" /> 
        <stop offset="100%" stopColor="#323135" />
      </linearGradient>
    </defs>

    {/* Other glyph parts: O, Horizontal Bars, L */}
    <g ref={otherPathsRef} fill="url(#others-wipe-gradient)">
      <path fillRule="evenodd" clipRule="evenodd" d="M20.8428 0C22.3382 5.09967e-05 23.7043 0.385319 24.9414 1.1543C26.1785 1.92329 27.1643 2.96191 27.8984 4.27051C28.6326 5.56565 28.9999 7.00263 29 8.58105V15.3203C29 16.8989 28.6326 18.3366 27.8984 19.6318C27.1643 20.9269 26.1785 21.9656 24.9414 22.748C23.7043 23.517 22.3381 23.9013 20.8428 23.9014H8.15723C6.64826 23.9013 5.2821 23.517 4.05859 22.748C2.82151 21.9656 1.83571 20.9269 1.10156 19.6318C0.367385 18.3366 0 16.8989 0 15.3203V8.58105C5.67696e-05 7.00263 0.367442 5.56565 1.10156 4.27051C1.83572 2.96191 2.82146 1.92329 4.05859 1.1543C5.28213 0.385319 6.64822 5.06994e-05 8.15723 0H20.8428ZM8.13672 4.27051C7.07645 4.27062 6.17247 4.68904 5.4248 5.52539C4.66351 6.36181 4.2823 7.38042 4.28223 8.58105V15.3203C4.28223 16.5076 4.66344 17.527 5.4248 18.377C6.17245 19.2132 7.0765 19.6317 8.13672 19.6318H20.8633C21.9235 19.6317 22.8345 19.2133 23.5957 18.377C24.3435 17.527 24.7178 16.5076 24.7178 15.3203V8.58105C24.7177 7.38042 24.3434 6.36181 23.5957 5.52539C22.8344 4.689 21.9236 4.27062 20.8633 4.27051H8.13672Z" />
      <path d="M29 33.8584H0V29.5889H29V33.8584Z" />
      <path d="M29 76.3799H0V72.1104H29V76.3799Z" />
      <path d="M29 94.291C29 95.7616 28.6325 97.1111 27.9189 98.3389C27.1848 99.553 26.2059 100.524 24.9824 101.253C23.7452 101.968 22.3783 102.325 20.8828 102.325H0V98.0752H20.8828C21.9433 98.0752 22.8479 97.704 23.5957 96.9619C24.3433 96.2199 24.7178 95.3298 24.7178 94.291V80.0234H29V94.291Z" />
    </g>

    {/* 3. Middle Arrow / "V" Shape (animated) */}
    <path
      ref={vPathRef}
      d="M14.0312 59.0215L22.6211 39.9707H28L15.6621 66.9707H12.3066L0 39.9707H5.37891L14.0312 59.0215Z"
      fill="url(#v-wipe-gradient)"
    />
  </svg>
);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgFillRef = useRef<HTMLDivElement>(null);
  const overlineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const spark1Ref = useRef<HTMLDivElement>(null);
  const spark2Ref = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  
  const vGradientRef = useRef<SVGLinearGradientElement>(null);
  const othersGradientRef = useRef<SVGLinearGradientElement>(null);
  const otherPathsRef = useRef<SVGGElement>(null);
  const vPathRef = useRef<SVGPathElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);

  const headline = "A digital agency focused on web.";
  const headlineWords = headline.split(" ");

  // Orchestrate animations via custom hook
  useHeroAnimation({
    section: sectionRef,
    bgFill: bgFillRef,
    overline: overlineRef,
    headline: headlineRef,
    body: bodyRef,
    cta: ctaRef,
    spark1: spark1Ref,
    spark2: spark2Ref,
    vGradient: vGradientRef,
    othersGradient: othersGradientRef,
    otherPaths: otherPathsRef,
    vPath: vPathRef,
    svgWrapper: svgWrapperRef,
    circle: circleRef,
  });

  return (
    <section data-theme="dark" ref={sectionRef} className="relative overflow-hidden bg-white min-h-screen">
      <div 
        ref={bgFillRef} 
        className="absolute inset-0 bg-dark z-0" 
      />
      
      {/* Background decoration */}
      <div className="absolute bottom-10 right-5 h-[130vh] pointer-events-none z-0 overflow-visible">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-auto"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <circle 
            ref={circleRef}
            cx="50" 
            cy="50" 
            r="45" 
            stroke="#9ca3af" 
            strokeWidth={0.2} 
            fill="transparent" 
            strokeOpacity={0.1} 
          />
        </svg>
      </div>

      <DaSectionContainer className="relative z-10 flex min-h-screen flex-col items-center justify-center max-w-7xl mx-auto">
        {/* Sparks - Increased z-index to z-20 to be in front of text (z-10) and SVG (z-0) */}
        <div ref={spark1Ref} className="absolute bottom-60 right-24 z-20 pointer-events-none text-white">
          <Spark variant="sparkAfrica" className="w-28 h-28" />
        </div>
        <div ref={spark2Ref} className="absolute bottom-0 right-1/3 z-20 pointer-events-none text-white">
          <Spark variant="spark2" className="w-28 h-28" />
        </div>

        {/* LIVIO Background SVG */}
        <div ref={svgWrapperRef} className="absolute top-1/2 -translate-y-1/2 right-30 h-[130vh] w-auto pointer-events-none z-0">
            <HeroBackgroundSVG 
              vGradientRef={vGradientRef} 
              othersGradientRef={othersGradientRef}
              otherPathsRef={otherPathsRef} 
              vPathRef={vPathRef}
            />
        </div>

        <div className="relative z-10 flex w-full items-center justify-between gap-12 pt-20 ">
          <div className="w-full max-w-3xl flex-shrink-0">
            <div ref={overlineRef} style={{ opacity: 0 }}>
              <DaText variant="overline" className="pb-10">
                We are omlivion
              </DaText>
            </div>
            
            <div ref={headlineRef}>
              <DaText className="pl-8 pb-6 flex flex-wrap" variant="headlineLg" color="white">
                {headlineWords.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden mr-[0.25em] leading-[1.1]">
                    <span className="word-inner inline-block">
                      {word}
                    </span>
                  </span>
                ))}
              </DaText>
            </div>

            <div ref={bodyRef} style={{ opacity: 0 }}>
              <DaText
                className="pl-8 pb-8 mt-0 w-full "
                variant="bodyMd"
                color="white"
              >
                We are a creative team of designers, developers, strategists,
                and producers building elevated websites in the heart of Africa.
              </DaText>
            </div>
            
            <div ref={ctaRef} style={{ opacity: 0 }}>
              <DaButton variant="circle-plus" className="pl-12 text-white">
                Get to know us
              </DaButton>
            </div>
          </div>
          <div className="flex-1 hidden lg:block" />
        </div>
      </DaSectionContainer>
    </section>
  );
}
