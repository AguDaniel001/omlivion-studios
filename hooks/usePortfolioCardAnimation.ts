"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { revealFromUnder, applyCardHoverEffect, applyScrollParallax } from "@/lib/gsap/animations";

export interface PortfolioCardAnimationRefs {
  parallax: React.RefObject<HTMLDivElement | null>;
  container: React.RefObject<HTMLDivElement | null>;
  skew: React.RefObject<HTMLDivElement | null>;
  image: React.RefObject<HTMLDivElement | null>;
  title: React.RefObject<HTMLDivElement | null>;
  subtitle: React.RefObject<HTMLDivElement | null>;
}

interface PortfolioCardAnimationOptions {
  index: number;
  parallax: boolean;
}

/**
 * Hook to handle PortfolioCard specific animations: 
 * entry reveal, hover interactions, and scroll parallax.
 */
export function usePortfolioCardAnimation(
  refs: PortfolioCardAnimationRefs, 
  options: PortfolioCardAnimationOptions
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const delay = (options.index % 2) * 0.2;

      // 1. Image Reveal Animation
      if (refs.skew.current && refs.image.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: refs.container.current,
            start: "top 95%",
            toggleActions: "play none none none",
          }
        });

        tl.fromTo(refs.skew.current, 
          { yPercent: 100 },
          { 
            yPercent: 0,
            duration: 1.8,
            delay: delay,
            ease: "custom-3",
          }
        );

        tl.fromTo(refs.image.current,
          { yPercent: -100, scale: 1.2 },
          { 
            yPercent: 0,
            scale: 1,
            duration: 1.8,
            ease: "custom-3",
          },
          "<"
        );
      }

      // 2. Text Reveal Animation
      if (refs.title.current && refs.subtitle.current) {
        revealFromUnder([refs.title.current, refs.subtitle.current], refs.container.current!, {
          delay: delay + 0.4
        });
      }

      // 3. Hover Interactions
      if (refs.container.current && refs.skew.current && refs.image.current) {
        applyCardHoverEffect(refs.container.current, refs.skew.current, refs.image.current);
      }

      // 4. Scroll Parallax
      if (options.parallax && refs.parallax.current) {
        applyScrollParallax(refs.parallax.current, refs.parallax.current);
      }
    });

    return () => ctx.revert();
  }, [options.parallax, options.index]); // refs are stable
}
