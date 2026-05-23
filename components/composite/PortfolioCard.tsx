"use client";

import { useRef } from "react";
import Image from "next/image";
import DaText from "@/components/ui/typography/DaText";
import { usePortfolioCardAnimation } from "@/hooks/usePortfolioCardAnimation";

interface PortfolioCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  parallax?: boolean;
  index?: number;
}

export default function PortfolioCard({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  parallax = false,
  index = 0,
}: PortfolioCardProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const skewRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  // Use the custom hook for all card-specific animations
  usePortfolioCardAnimation(
    {
      parallax: parallaxRef,
      container: containerRef,
      skew: skewRef,
      image: imageRef,
      title: titleRef,
      subtitle: subtitleRef,
    },
    { index, parallax }
  );

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
              <DaText variant="titleMd" align="right" >
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
