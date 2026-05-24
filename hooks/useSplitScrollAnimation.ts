"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealWords, applyScrollParallax } from "@/lib/gsap/animations";

gsap.registerPlugin(ScrollTrigger);

export interface SplitScrollAnimationRefs {
  container: React.RefObject<HTMLDivElement | null>;
  header: React.RefObject<HTMLDivElement | null>;
  title: React.RefObject<HTMLDivElement | null>;
  spark: React.RefObject<HTMLDivElement | null>;
  sparkSpeed?: number;
}

/**
 * Hook to handle Split Scroll Section level animations
 */
export function useSplitScrollAnimation(refs: SplitScrollAnimationRefs) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header words
      const words = refs.title.current?.querySelectorAll(".word-inner");
      if (words && words.length > 0) {
        revealWords(words, refs.header.current!);
      }

      // Parallel scroll (parallax) for the spark with adjustable speed
      if (refs.spark.current && refs.container.current) {
        applyScrollParallax(refs.spark.current, refs.container.current, refs.sparkSpeed ?? 150);
      }

      // Header "disappear reverse" at the bottom of the section
      if (refs.header.current && refs.container.current) {
        gsap.to(refs.header.current, {
          opacity: 0,
          y: -50,
          ease: "power2.in",
          scrollTrigger: {
            trigger: refs.container.current,
            start: "bottom 40%", // Start disappearing when section bottom reaches 40% of viewport
            end: "bottom top",    // Fully gone when section bottom leaves the top
            scrub: true,
          }
        });
      }

    }, refs.container);

    return () => ctx.revert();
  }, [refs.container, refs.header, refs.title, refs.spark, refs.sparkSpeed]);
}
