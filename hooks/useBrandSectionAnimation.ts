"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealWords } from "@/lib/gsap/animations";

gsap.registerPlugin(ScrollTrigger);

export interface BrandSectionAnimationRefs {
  container: React.RefObject<HTMLDivElement | null>;
  header: React.RefObject<HTMLDivElement | null>;
  title: React.RefObject<HTMLDivElement | null>;
  logos: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook to handle Brand Section level animations
 */
export function useBrandSectionAnimation(refs: BrandSectionAnimationRefs) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header words
      const words = refs.title.current?.querySelectorAll(".word-inner");
      if (words && words.length > 0) {
        revealWords(words, refs.header.current!);
      }

      // Reveal logos in rows together as they enter the viewport
      const logoItems = refs.logos.current?.querySelectorAll(".logo-item");
      if (logoItems && logoItems.length > 0) {
        // Set initial state
        gsap.set(logoItems, { opacity: 0, y: 40 });

        // Use ScrollTrigger.batch to group items that enter together (rows)
        ScrollTrigger.batch(logoItems, {
          onEnter: (batch) => gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0, // No stagger, so they appear at the same time
            overwrite: true,
          }),
          start: "top 85%",
        });
      }
    }, refs.container);

    return () => ctx.revert();
  }, [refs.container, refs.header, refs.title, refs.logos]);
}
