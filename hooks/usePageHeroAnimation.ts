"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Simplified animation hook for sub-page hero sections.
 * Optimized for light theme and refined layout.
 */

export interface PageHeroAnimationRefs {
  section: React.RefObject<HTMLDivElement | null>;
  overline: React.RefObject<HTMLDivElement | null>;
  headline: React.RefObject<HTMLDivElement | null>;
  description?: React.RefObject<HTMLDivElement | null>;
  cta?: React.RefObject<HTMLDivElement | null>;
  spark: React.RefObject<HTMLDivElement | null>;
  circle: React.RefObject<SVGCircleElement | null>;
}

export function usePageHeroAnimation(refs: PageHeroAnimationRefs) {
  useLayoutEffect(() => {
    // Register ScrollTrigger if not already registered
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Initial states for decorative elements
      if (refs.circle.current) {
        const radius = refs.circle.current.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        gsap.set(refs.circle.current, {
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
          rotation: -90,
          transformOrigin: "50% 50%"
        });
      }

      // 2. Reveal Spark
      const sparkPoints = refs.spark.current?.querySelectorAll(".spark-point");
      if (sparkPoints && sparkPoints.length > 0) {
        tl.fromTo(sparkPoints,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 0.4, 
            duration: 0.4, 
            stagger: { each: 0.04, from: "random" },
            ease: "back.out(2)" 
          }
        );
      }

      // 3. Text Entrance (Overline then Headline)
      tl.fromTo(refs.overline.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.2"
      );

      const words = refs.headline.current?.querySelectorAll(".word-inner");
      if (words) {
        tl.fromTo(words,
          { y: "110%" },
          { y: "0%", duration: 1, stagger: 0.08, ease: "power4.out" },
          "-=0.7"
        );
      }

      // 4. Description and CTA Entrance (if present)
      const secondaryElements = [];
      if (refs.description?.current) secondaryElements.push(refs.description.current);
      if (refs.cta?.current) secondaryElements.push(refs.cta.current);

      if (secondaryElements.length > 0) {
        tl.fromTo(secondaryElements,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
          "-=0.6"
        );
      }

      // 5. Circle Draw Animation
      if (refs.circle.current) {
        tl.to(refs.circle.current, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
        }, "-=1.2");
      }

      // 6. Subtle Scroll Parallax for Spark
      if (refs.spark.current && refs.section.current) {
        gsap.to(refs.spark.current, {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: refs.section.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }

    }, refs.section);

    return () => ctx.revert();
  }, []);
}
