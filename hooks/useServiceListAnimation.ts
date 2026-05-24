"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { revealWords } from "@/lib/gsap/animations";

export interface ServiceListAnimationRefs {
  container: React.RefObject<HTMLDivElement | null>;
  header: React.RefObject<HTMLDivElement | null>;
  title: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook to handle Service List Section level animations (Header reveal, etc.)
 */
export function useServiceListAnimation(refs: ServiceListAnimationRefs) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header words when section comes into view
      const words = refs.title.current?.querySelectorAll(".word-inner");
      if (words && words.length > 0) {
        revealWords(words, refs.header.current!);
      }
    }, refs.container);

    return () => ctx.revert();
  }, [refs.container, refs.header, refs.title]);
}
