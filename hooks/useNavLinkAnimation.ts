"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export interface NavLinkAnimationRefs {
  link: React.RefObject<HTMLElement | null>;
  text: React.RefObject<HTMLElement | null>;
}

/**
 * Hook to handle individual NavLink hover animations.
 * Maintains a persistent context to prevent "reset jumps" during state changes.
 */
export function useNavLinkAnimation(
  refs: NavLinkAnimationRefs, 
  isHovered: boolean, 
  isDimmed: boolean
) {
  const ctx = useRef<gsap.Context | null>(null);

  // 1. Initialize context once for the life of the component
  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {}, refs.link);
    return () => ctx.current?.revert();
  }, [refs.link]);

  // 2. Run animations within that context without reverting on every state change
  useLayoutEffect(() => {
    ctx.current?.add(() => {
      // Movement Animation
      gsap.to(refs.link.current, {
        x: isHovered ? 48 : 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto" // Smoothly kills previous conflicting tweens
      });

      // Internal Color Wipe Animation
      gsap.to(refs.text.current, {
        "--wipe-pos": isDimmed ? "100%" : "0%",
        duration: 0.8,
        ease: "power3.inOut",
        overwrite: "auto"
      });
    });
  }, [isHovered, isDimmed]);
}
