"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface DaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: "underline" | "circle-plus";
  children: string;
}

/**
 * Variant 1: Underline with Wave Effect
 * Characters move up and down like a wave on hover
 */
function UnderlineVariant({ children, className, ...props }: Omit<DaButtonProps, "variant">) {
  const charsRef = useRef<HTMLSpanElement[]>([]);
  
  const onMouseEnter = () => {
    gsap.to(charsRef.current, {
      y: -5,
      duration: 0.3,
      stagger: {
        each: 0.08,
        yoyo: true,
        repeat: 1
      },
      ease: "sine.inOut"
    });
  };

  return (
    <button 
      onMouseEnter={onMouseEnter}
      className={cn("relative uppercase flex flex-col items-start group py-1 font-bold", className)}
      {...props}
    >
      <div className="flex">
        {children.toUpperCase().split("").map((char, i) => (
          <span 
            key={i} 
            ref={el => { if(el) charsRef.current[i] = el }}
            className="inline-block text-white"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      <div className="w-full h-[1px] bg-white mt-1 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
    </button>
  );
}

/**
 * Variant 2: Circle + Plus Icon with Circle Movement
 * Gray circle slides from behind first character to behind plus icon on hover
 */
function CirclePlusVariant({ children, className, ...props }: Omit<DaButtonProps, "variant">) {
  const circleRef = useRef<HTMLDivElement>(null);
  const firstCharRef = useRef<HTMLSpanElement>(null);
  const plusRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (!circleRef.current || !firstCharRef.current || !containerRef.current) return;
    
    const updatePos = () => {
      const containerRect = containerRef.current!.getBoundingClientRect();
      const firstRect = firstCharRef.current!.getBoundingClientRect();
      const x = firstRect.left - containerRect.left + (firstRect.width / 2);
      gsap.set(circleRef.current, { x, xPercent: -170, width: 40 });
    };

    updatePos();
    const timeout = setTimeout(updatePos, 50);
    window.addEventListener('resize', updatePos);
    return () => {
      window.removeEventListener('resize', updatePos);
      clearTimeout(timeout);
    };
  }, []);

  const onMouseEnter = () => {
    if (!circleRef.current || !plusRef.current || !containerRef.current || !firstCharRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const firstRect = firstCharRef.current.getBoundingClientRect();
    const plusRect = plusRef.current.getBoundingClientRect();
    
    const startX = firstRect.left - containerRect.left + (firstRect.width / 2);
    const targetX = plusRect.left - containerRect.left + (plusRect.width / 2);
    const distance = targetX - startX;
    
    const tl = gsap.timeline();
    // Expand strictly to the right. Left edge remains fixed.
    tl.to(circleRef.current, {
      width: distance + 40,
      x: startX + (1.7 * distance),
      duration: 0.3,
      ease: "power2.inOut"
    })
    // Contract towards targetX
    .to(circleRef.current, {
      width: 40,
      x: targetX,
      duration: 0.3,
      ease: "power2.inOut"
    });
  };

  const onMouseLeave = () => {
    if (!circleRef.current || !firstCharRef.current || !containerRef.current || !plusRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const firstRect = firstCharRef.current.getBoundingClientRect();
    const plusRect = plusRef.current.getBoundingClientRect();
    
    const startX = firstRect.left - containerRect.left + (firstRect.width / 2);
    const targetX = plusRect.left - containerRect.left + (plusRect.width / 2);
    const distance = targetX - startX;
    
    const tl = gsap.timeline();
    // Expand back to the left. Right edge remains fixed.
    tl.to(circleRef.current, {
      width: distance + 40,
      x: targetX + (0.7 * distance),
      duration: 0.3,
      ease: "power2.inOut"
    })
    // Contract back to startX
    .to(circleRef.current, {
      width: 40,
      x: startX,
      duration: 0.3,
      ease: "power2.inOut"
    });
  };

  return (
    <button
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn("relative flex items-center gap-8 px-6 py-3 uppercase group font-bold text-sm isolate overflow-visible text-white tracking-widest ", className)}
      {...props}
    >
      <div 
        ref={circleRef}
        className="absolute w-10 h-10 bg-bg-on-dark rounded-full -z-10 top-1/2 -translate-y-1/2 pointer-events-none"
      />
      <div className="flex">
        {children.toUpperCase().split("").map((char, i) => (
          <span key={i} ref={i === 0 ? firstCharRef : null}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      <div ref={plusRef} className="flex items-center justify-center w-3 h-3">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-full h-full">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </div>
    </button>
  );
}

/**
 * DaButton Component
 * Two variants with GSAP animations
 */
export default function DaButton({
  variant = "underline",
  children = "Button",
  ...props
}: DaButtonProps) {
  if (variant === "circle-plus") {
    return <CirclePlusVariant {...props}>{children}</CirclePlusVariant>;
  }

  return <UnderlineVariant {...props}>{children}</UnderlineVariant>;
}
