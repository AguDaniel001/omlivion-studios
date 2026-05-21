"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { revealFromUnder } from "@/lib/gsap/animations";

export interface PortfolioSectionAnimationRefs {
  container: React.RefObject<HTMLDivElement | null>;
  header: React.RefObject<HTMLDivElement | null>;
  title: React.RefObject<HTMLDivElement | null>;
  body: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook to handle Portfolio Section level animations (Header reveal, etc.)
 */
export function usePortfolioSectionAnimation(refs: PortfolioSectionAnimationRefs) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header text when section comes into view
      if (refs.title.current && refs.body.current) {
        revealFromUnder([refs.title.current, refs.body.current], refs.header.current!, {
          stagger: 0.1,
          duration: 1,
        });
      }
    }, refs.container);

    return () => ctx.revert();
  }, []); // refs are stable
}
