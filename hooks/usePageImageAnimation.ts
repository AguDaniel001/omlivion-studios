"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface PageImageAnimationRefs {
  container: React.RefObject<HTMLDivElement | null>;
  mask: React.RefObject<HTMLDivElement | null>;
  image: React.RefObject<HTMLImageElement | null>;
}

export function usePageImageAnimation(refs: PageImageAnimationRefs) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!refs.container.current || !refs.mask.current || !refs.image.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: refs.container.current,
          start: "top bottom", // Starts when the top of the section hits the bottom of the viewport
          end: "top",   // Ends when the bottom of the section hits the top of the viewport
          scrub: true,
        },
      });

      // 1. Mask Animation (from 0% to 14%)
      tl.fromTo(
        refs.mask.current,
        {
          "--mask-percent": -3,
        } as any,
        {
          "--mask-percent": 14,
          ease: "none",
        },
        0
      );

      // 2. Parallax Animation (image moves up slightly)
      tl.fromTo(
        refs.image.current,
        {
          y: "0%",
        },
        {
          y: "-10%", // Subtle move up
          ease: "none",
        },
        0
      );
    }, refs.container);

    return () => ctx.revert();
  }, []);
}
