"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to detect the current section theme based on data-theme attribute.
 */
export function useThemeDetection() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Ensure ScrollTrigger is ready
    ScrollTrigger.refresh();

    const sections = gsap.utils.toArray('[data-theme]');
    
    const updateTheme = () => {
      const scrollPos = window.scrollY + 112; // Navbar trigger point
      
      let currentTheme = 'dark';
      sections.forEach((section: any) => {
        const rect = section.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = rect.bottom + window.scrollY;
        
        if (scrollPos >= top && scrollPos < bottom) {
          currentTheme = section.getAttribute('data-theme');
        }
      });
      
      setIsLight(currentTheme === 'light');
    };

    // Initial check
    updateTheme();

    const triggers = sections.map((section: any) => {
      const theme = section.getAttribute('data-theme');
      
      return ScrollTrigger.create({
        trigger: section,
        start: "top 112px",
        end: "bottom 112px",
        onEnter: () => setIsLight(theme === 'light'),
        onEnterBack: () => setIsLight(theme === 'light'),
        onLeave: () => {
          // If we leave the last section, we might need a fallback, 
          // but updateTheme handles the gaps better.
        }
      });
    });

    window.addEventListener('scroll', updateTheme);

    return () => {
      triggers.forEach(t => t.kill());
      window.removeEventListener('scroll', updateTheme);
    };
  }, []);

  return isLight;
}
