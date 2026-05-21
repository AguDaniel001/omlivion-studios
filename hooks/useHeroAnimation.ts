"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { applyScrollParallax } from "@/lib/gsap/animations";

export interface HeroAnimationRefs {
  section: React.RefObject<HTMLDivElement | null>;
  bgFill: React.RefObject<HTMLDivElement | null>;
  overline: React.RefObject<HTMLDivElement | null>;
  headline: React.RefObject<HTMLDivElement | null>;
  body: React.RefObject<HTMLDivElement | null>;
  cta: React.RefObject<HTMLDivElement | null>;
  spark1: React.RefObject<HTMLDivElement | null>;
  spark2: React.RefObject<HTMLDivElement | null>;
  vGradient: React.RefObject<SVGLinearGradientElement | null>;
  othersGradient: React.RefObject<SVGLinearGradientElement | null>;
  otherPaths: React.RefObject<SVGGElement | null>;
  vPath: React.RefObject<SVGPathElement | null>;
  svgWrapper: React.RefObject<HTMLDivElement | null>;
  circle: React.RefObject<SVGCircleElement | null>;
}

/**
 * Custom hook to handle the complex Hero Section animation timeline.
 * Encapsulates GSAP context and ensures proper cleanup.
 */
export function useHeroAnimation(refs: HeroAnimationRefs) {
  useLayoutEffect(() => {
    // gsap.context handles scoping and automatic cleanup of ScrollTriggers
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Final color: bg-bg-on-dark (#323135)
      const ON_DARK_COLOR = "#323135";

      // Initialize the decorative circle for an anti-clockwise draw animation
      if (refs.circle.current) {
        const radius = refs.circle.current.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        gsap.set(refs.circle.current, {
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
          rotation: -90, // Start from top
          transformOrigin: "50% 50%"
        });
      }

      // 0. Scroll Parallax for the LIVIO SVG
      if (refs.svgWrapper.current && refs.section.current) {
        applyScrollParallax(refs.svgWrapper.current, refs.section.current, 250);
      }

      // Parallax for Spark 1 (sparkAfrica) - Moves UP faster (amount: 400)
      if (refs.spark1.current && refs.section.current) {
        gsap.fromTo(refs.spark1.current,
          { y: 400 },
          {
            y: -400,
            ease: "none",
            scrollTrigger: {
              trigger: refs.section.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }

      // Parallax for Spark 2 - Moves DOWN slowly (reverse direction, amount: -150)
      if (refs.spark2.current && refs.section.current) {
        gsap.fromTo(refs.spark2.current,
          { y: -150 },
          {
            y: 150,
            ease: "none",
            scrollTrigger: {
              trigger: refs.section.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }

      // 1. V Path FILLS IN black first (Transparent -> Black wipe, Left to Right)
      tl.fromTo(refs.vGradient.current,
        { attr: { x1: "-100%", x2: "0%" } },
        { attr: { x1: "100%", x2: "200%" }, duration: 1.5, ease: "custom-1" }
      );

      // 2. Hero background fills from left to right
      tl.fromTo(refs.bgFill.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.6, ease: "custom-1" },
        "-=0.5"
      );

      // 3. Simultaneously transition V to black and WIPE others (Right to Left)
      const triggerReveal = () => {
        const revealTl = gsap.timeline();
        const vStops = refs.vGradient.current?.querySelectorAll("stop");
        
        // Others: Reset to White (x1=100%)
        revealTl.set(refs.othersGradient.current, { attr: { x1: "100%", x2: "200%" } }, 0);
        
        // V: Transition from Black to Grey via a Right-to-Left wipe
        if (vStops) {
          revealTl.set(vStops[0], { stopColor: "black" }, 0);
          revealTl.set(vStops[1], { stopColor: "black" }, 0);
          revealTl.set(vStops[2], { stopColor: ON_DARK_COLOR }, 0);
          revealTl.set(vStops[3], { stopColor: ON_DARK_COLOR }, 0);
        }
        revealTl.set(refs.vGradient.current, { attr: { x1: "100%", x2: "200%" } }, 0);

        // Synchronized reveal to ON_DARK_COLOR for both
        revealTl.to([refs.othersGradient.current, refs.vGradient.current],
          { attr: { x1: "-100%", x2: "0%" }, duration: 1.8, ease: "custom-1" },
          0.1
        );
        
        return revealTl;
      };

      tl.add(triggerReveal(), "<");
      tl.addLabel("bgDone"); // Mark the point where background sequence is complete

      // 4. Reveal sparks JUST BEFORE text
      const spark1Points = refs.spark1.current?.querySelectorAll(".spark-point");
      const spark2Points = refs.spark2.current?.querySelectorAll(".spark-point");
      
      if (spark1Points && spark1Points.length > 0) {
        tl.fromTo(spark1Points,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 0.6, 
            duration: 0.4, 
            stagger: { each: 0.04, from: "random" },
            ease: "back.out(2)" 
          },
          "bgDone-=0.4" // Start reveal slightly before bg ends
        );
      }

      if (spark2Points && spark2Points.length > 0) {
        tl.fromTo(spark2Points,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 0.6, 
            duration: 0.4, 
            stagger: { each: 0.04, from: "random" },
            ease: "back.out(2)" 
          },
          "<0.1"
        );
      }

      // 5. Reveal hero text - Starts immediately as background reveal is done
      tl.fromTo(refs.overline.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "bgDone" // Start exactly at the label
      );

      const words = refs.headline.current?.querySelectorAll(".word-inner");
      if (words) {
        tl.fromTo(words,
          { y: "110%" },
          { y: "0%", duration: 1, stagger: 0.1, ease: "power4.out" },
          "-=0.7" // Start headline shortly after overline
        );
      }

      tl.fromTo([refs.body.current, refs.cta.current],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        "-=0.7"
      );

      // 6. Decorative Circle Fill (Anti-clockwise, very slow, at the end)
      if (refs.circle.current) {
        const radius = refs.circle.current.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        
        // Use negative offset to draw anti-clockwise
        tl.fromTo(refs.circle.current, {
          strokeDasharray: circumference,
          strokeDashoffset: -circumference,
          rotation: -90, 
          transformOrigin: "50% 50%"
        }, {
          strokeDashoffset: 0,
          duration: 16.5, // Even slower for a quiet feel
          ease: "power1.inOut",
        }, "-=0.5");
      }
    }, refs.section);

    return () => ctx.revert();
  }, []); // refs are stable
}

