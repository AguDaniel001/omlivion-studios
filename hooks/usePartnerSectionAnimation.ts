"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { revealWords, revealFromUnder } from "@/lib/gsap/animations";

export interface PartnerSectionAnimationRefs {
  container: React.RefObject<HTMLDivElement | null>;
  header: React.RefObject<HTMLDivElement | null>;
  title: React.RefObject<HTMLDivElement | null>;
  image: React.RefObject<HTMLDivElement | null>;
  options: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook to handle Partner Section level animations (Header reveal, image reveal, etc.)
 */
export function usePartnerSectionAnimation(refs: PartnerSectionAnimationRefs) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header words when section comes into view
      const words = refs.title.current?.querySelectorAll(".word-inner");
      if (words && words.length > 0) {
        revealWords(words, refs.header.current!);
      }

      // Reveal image with a slide and fade
      if (refs.image.current) {
        gsap.from(refs.image.current, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "custom-3",
          scrollTrigger: {
            trigger: refs.image.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      // Reveal options sequentially
      if (refs.options.current) {
        const optionItems = refs.options.current.querySelectorAll(".partner-option");
        revealFromUnder(Array.from(optionItems), refs.options.current);
      }
    }, refs.container);

    return () => ctx.revert();
  }, [refs.container, refs.header, refs.title, refs.image, refs.options]);
}
