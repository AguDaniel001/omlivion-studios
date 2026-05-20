"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import DaText from "@/components/ui/typography/DaText";
import gsap from "gsap";
import { revealFromUnder, applyCardHoverEffect, applyScrollParallax } from "@/lib/gsap/animations";

interface PortfolioCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  parallax?: boolean;
}

export default function PortfolioCard({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  parallax = false,
}: PortfolioCardProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const skewRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Reveal Animation for text
      if (titleRef.current && subtitleRef.current) {
        revealFromUnder([titleRef.current, subtitleRef.current], containerRef.current!);
      }

      // 2. Hover Interactions (Door Effect, Zoom)
      // We only skew the image container (skewRef) so the text stays flat
      if (containerRef.current && skewRef.current && imageRef.current) {
        applyCardHoverEffect(containerRef.current, skewRef.current, imageRef.current);
      }

      // 3. Scroll Parallax for right-side cards
      if (parallax && parallaxRef.current) {
        applyScrollParallax(parallaxRef.current, parallaxRef.current);
      }
    });

    return () => ctx.revert();
  }, [parallax]);

  return (
    <div ref={parallaxRef} className="w-full max-w-[550px]">
      <div 
        ref={containerRef}
        className="group relative flex flex-col justify-end aspect-[4/5] w-full cursor-pointer"
      >
        {/* Background Image Container (Handles clipping for zoom and skew) */}
        <div ref={skewRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div ref={imageRef} className="relative h-full w-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
          </div>
        </div>

        {/* Typography/Content Footer */}
        <div 
          ref={textRef} 
          className=" md:p-12 z-20 text-right"
        >
          {/* Title Wrap */}
          <div className="overflow-hidden translate-x-16  ">
            <div ref={titleRef}>
              <DaText variant="bodyLg" align="right" >
                {title}
              </DaText>
            </div>
          </div>
          {/* Subtitle Wrap */}
          <div className="overflow-hidden translate-x-18 ">
            <div ref={subtitleRef}>
              <DaText variant="bodySm" align="right" className="opacity-90">
                {subtitle}
              </DaText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
