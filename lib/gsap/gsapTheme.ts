"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to detect the current section theme based on data-theme attribute.
 */
export function useThemeDetection() {
  const [isLight, setIsLight] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger to account for new page layout
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

      // Initial check with a slight delay to ensure DOM is ready
      const timeoutId = setTimeout(updateTheme, 100);

      const triggers = sections.map((section: any) => {
        const theme = section.getAttribute('data-theme');
        
        return ScrollTrigger.create({
          trigger: section,
          start: "top 112px",
          end: "bottom 112px",
          onEnter: () => setIsLight(theme === 'light'),
          onEnterBack: () => setIsLight(theme === 'light'),
        });
      });

      window.addEventListener('scroll', updateTheme);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('scroll', updateTheme);
      };
    });

    return () => ctx.revert();
  }, [pathname]);

  return isLight;
}
