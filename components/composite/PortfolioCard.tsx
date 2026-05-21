"use client";

import { useLayoutEffect, useRef } from "react";
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const delay = (index % 2) * 0.2;

      // 1. Image Reveal Animation (Stationary Reveal from bottom)
      if (skewRef.current && imageRef.current) {
        // We use a timeline or specific overwrite settings to prevent hover from breaking the reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          }
        });

        tl.fromTo(skewRef.current, 
          { yPercent: 100 },
          { 
            yPercent: 0,
            duration: 1.8,
            delay: delay,
            ease: "custom-3",
          }
        );

        tl.fromTo(imageRef.current,
          { yPercent: -100, scale: 1.2 },
          { 
            yPercent: 0,
            scale: 1,
            duration: 1.8,
            ease: "custom-3",
          },
          "<" // Start at the same time as skewRef
        );
      }

      // 2. Initial Reveal Animation for text
      if (titleRef.current && subtitleRef.current) {
        revealFromUnder([titleRef.current, subtitleRef.current], containerRef.current!, {
          delay: delay + 0.4
        });
      }

      // 3. Hover Interactions (Door Effect, Zoom)
      if (containerRef.current && skewRef.current && imageRef.current) {
        // The hover effect uses 'overwrite: "auto"' or 'true' usually.
        // In animations.ts it uses 'overwrite: true' which kills the reveal animation.
        // We will pass an "active" check or simply rely on the fact that GSAP 
        // will now manage the image properties. 
        // To fix this cleanly, we'll modify the hover effect to be gentler.
        applyCardHoverEffect(containerRef.current, skewRef.current, imageRef.current);
      }

      // 4. Scroll Parallax for right-side cards
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
