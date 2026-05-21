"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export interface NavOverlayAnimationRefs {
  overlay: React.RefObject<HTMLDivElement | null>;
  circle: React.RefObject<HTMLDivElement | null>;
  links: React.RefObject<HTMLDivElement | null>;
  contact: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook to handle the NavOverlay open/close animations.
 */
export function useNavOverlayAnimation(refs: NavOverlayAnimationRefs, isOpen: boolean) {
  const ctx = useRef<gsap.Context | null>(null);

  // 1. Initialize context once
  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {}, refs.overlay);
    return () => ctx.current?.revert();
  }, [refs.overlay]);

  // 2. Animate based on isOpen state
  useLayoutEffect(() => {
    ctx.current?.add(() => {
      if (isOpen) {
        const tl = gsap.timeline();

        // Scale up the circle
        tl.to(refs.circle.current, {
          scale: 1500,
          duration: 0.8,
          ease: "power2.inOut",
        });

        tl.to(refs.overlay.current, {
          autoAlpha: 1,
          duration: 0.1,
        }, 0);

        // Animate content in
        tl.fromTo(
          refs.links.current?.children || [],
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.5"
        );

        tl.fromTo(
          refs.contact.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "<0.1"
        );
      } else {
        const tl = gsap.timeline();

        // Close animation
        tl.to(refs.links.current?.children || [], {
          x: -30,
          opacity: 0,
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.in",
        });

        tl.to(refs.contact.current, {
          y: 30,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        }, "<");

        tl.to(refs.circle.current, {
          scale: 0,
          duration: 0.5,
          ease: "power4.in",
          onComplete: () => {
            gsap.set(refs.overlay.current, { autoAlpha: 0 });
          },
        }, "-=0.2");
      }
    });
  }, [isOpen]);
}
