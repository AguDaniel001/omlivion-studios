"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import DaText from "@/components/ui/typography/DaText";
import gsap from "gsap";
import { revealFromUnder, applyCardHoverEffect } from "@/lib/gsap/animations";

interface PortfolioCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
}

export default function PortfolioCard({
  imageSrc,
  imageAlt,
  title,
  subtitle,
}: PortfolioCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Reveal Animation for text
      // We pass an array of the individual elements to get the stagger effect
      if (titleRef.current && subtitleRef.current) {
        revealFromUnder([titleRef.current, subtitleRef.current], containerRef.current!);
      }

      // 2. Hover Interactions (Door Effect, Zoom, Translate)
      if (containerRef.current && imageRef.current && textRef.current) {
        applyCardHoverEffect(containerRef.current, imageRef.current, textRef.current);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="group relative  flex flex-col justify-end aspect-[4/5] w-full max-w-[550px] cursor-pointer"
    >
      {/* Background Image Container (Handles clipping for zoom) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
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
        className="relative p-8 md:p-12 z-20 text-left"
      >
        {/* Title Wrap */}
        <div className="overflow-hidden">
          <div ref={titleRef}>
            <DaText variant="bodyLg" color="white">
              {title}
            </DaText>
          </div>
        </div>
        {/* Subtitle Wrap */}
        <div className="overflow-hidden">
          <div ref={subtitleRef}>
            <DaText variant="bodySm" color="white" className="opacity-80">
              {subtitle}
            </DaText>
          </div>
        </div>
      </div>
    </div>
  );
}
