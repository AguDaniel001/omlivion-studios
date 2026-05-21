"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase, ScrollTrigger);
  
  // Register custom eases from global.css
  CustomEase.create("custom-1", "0.475, 0.425, 0, 0.995");
  CustomEase.create("custom-2", "0.835, -0.005, 0.06, 1");
  CustomEase.create("custom-3", "0.19, 1, 0.22, 1");
  CustomEase.create("custom-4", "0.63, 0.03, 0.21, 1");
}

/**
 * Reusable Reveal Animation
 * Animate elements from under (y: 100%) to their natural position.
 */
export const revealFromUnder = (
  elements: gsap.DOMTarget,
  trigger: gsap.DOMTarget,
  options: gsap.TimelineVars = {}
) => {
  return gsap.from(elements, {
    y: "110%",
    opacity: 0,
    duration: 1.2, // Slightly slower for more impact
    ease: "custom-3",
    stagger: 0.15, // Noticeable stagger between elements
    scrollTrigger: {
      trigger: trigger,
      start: "top 90%", // Trigger a bit earlier
      toggleActions: "play none none none",
    },
    ...options,
  });
};

/**
 * Reusable Card Skew & Zoom Interaction
 * Applies a "Door Opening" effect from the left (Right edge static)
 */
export const applyCardHoverEffect = (
  trigger: HTMLElement,
  skewElement: HTMLElement,
  image: HTMLElement,
) => {
  // Set transform origin to the RIGHT so the right corner stays static
  gsap.set(skewElement, { transformOrigin: "right center", transformPerspective: 2000 });

  const handleMouseEnter = () => {
    gsap.to(skewElement, {
      rotateY: -10, // Swings the left side backward into the screen
      duration: 0.6,
      ease: "custom-1",
      overwrite: "auto"
    });
    gsap.to(image, {
      scale: 1.1,
      duration: 1.8,
      ease: "custom-1",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(skewElement, {
      rotateY: 0,
      duration: 0.6,
      ease: "custom-1",
      overwrite: "auto"
    });
    gsap.to(image, {
      scale: 1,
      duration: 1.8,
      ease: "custom-1",
      overwrite: "auto"
    });
  };

  trigger.addEventListener("mouseenter", handleMouseEnter);
  trigger.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    trigger.removeEventListener("mouseenter", handleMouseEnter);
    trigger.removeEventListener("mouseleave", handleMouseLeave);
  };
};

/**
 * Reusable Scroll Parallax Animation
 * Elements move upwards as the user scrolls down.
 */
export const applyScrollParallax = (
  element: HTMLElement,
  trigger: HTMLElement,
  amount: number = 160 // Increased to ensure it moves past neighbors
) => {
  gsap.fromTo(element, 
    { y: amount }, 
    { 
      y: -amount, 
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    }
  );
};
