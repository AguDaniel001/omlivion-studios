"use client";

import { useRef } from "react";
import Image from "next/image";
import DaText from "@/components/ui/typography/DaText";
import { usePortfolioCardAnimation } from "@/hooks/usePortfolioCardAnimation";

interface InsightCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  parallax?: boolean;
  index?: number;
}

export default function InsightCard({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  parallax = false,
  index = 0,
}: InsightCardProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const skewRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  // Use the same custom hook for consistent animations
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
    <div ref={parallaxRef} className="w-full">
      <div 
        ref={containerRef}
        className="group relative flex flex-col  w-full cursor-pointer"
      >
        {/* Rectangle Image Container */}
        <div className="relative aspect-video w-full overflow-hidden">
          <div ref={skewRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div ref={imageRef} className="relative h-full w-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px, ) 100vw, 600px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Typography Content Bellow */}
        <div className="flex flex-col gap-6 px-6 py-15">
          <div ref={titleRef}>
            <DaText variant="titleSm" className="font-semibold">
              {title}
            </DaText>
          </div>
          <div ref={subtitleRef}>
            <DaText variant="bodyLg">
              {subtitle}
            </DaText>
          </div>
        </div>
      </div>
    </div>
  );
}
