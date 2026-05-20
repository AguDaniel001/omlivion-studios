"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  
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
  container: HTMLElement,
  image: HTMLElement,
  text: HTMLElement
) => {
  // Set transform origin to the right so it stays static
  gsap.set(container, { transformOrigin: "right center", transformPerspective: 2000 });

  const tl = gsap.timeline({ 
    paused: true, 
    defaults: { 
      ease: "custom-1", 
      duration: 1.2 // Even slower and smoother
    } 
  });

  tl.to(container, {
    rotateY: -8, // Negative rotateY with right origin swings the left side BACKWARD
    z: -40,      // Noticeable push back
  })
  .to(image, {
    scale: 1.1, // Reduced zoom scale
  }, 0)
  .to(text, {
    x: 80, 
  }, 0);

  container.addEventListener("mouseenter", () => tl.play());
  container.addEventListener("mouseleave", () => tl.reverse());

  return () => {
    container.removeEventListener("mouseenter", () => tl.play());
    container.removeEventListener("mouseleave", () => tl.reverse());
  };
};
