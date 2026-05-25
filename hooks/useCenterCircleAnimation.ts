"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { applyCenterCircleScale } from "@/lib/gsap/animations";

export interface CenterCircleAnimationRefs {
  circle: React.RefObject<HTMLDivElement | null>;
  container: React.RefObject<HTMLElement | null>;
}

/**
 * Hook to handle Center Circle scaling animation on scroll.
 */
export function useCenterCircleAnimation(refs: CenterCircleAnimationRefs) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (refs.circle.current && refs.container.current) {
        applyCenterCircleScale(refs.circle.current, refs.container.current);
      }
    }, refs.container);

    return () => ctx.revert();
  }, [refs.circle, refs.container]);
}
