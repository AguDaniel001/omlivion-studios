"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { revealBackground } from "@/lib/gsap/animations";

export interface QuoteAnimationRefs {
  section: React.RefObject<HTMLDivElement | null>;
  bgFill: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook to handle Quote Section animations.
 */
export function useQuoteAnimation(refs: QuoteAnimationRefs) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (refs.bgFill.current && refs.section.current) {
        revealBackground(refs.bgFill.current, refs.section.current);
      }
    }, refs.section);

    return () => ctx.revert();
  }, []); // refs are stable
}
