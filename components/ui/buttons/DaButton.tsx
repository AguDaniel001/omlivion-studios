"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface DaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: "underline" | "circle-plus" | "solid-black";
  href?: string;
  target?: string;
  rel?: string;
  children: string;
}

/**
 * Variant 1: Underline with Wave Effect
 */
function UnderlineVariant({ children, className, href, target, rel, ...props }: Omit<DaButtonProps, "variant">) {
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);
  
  const animateUnderlineCycle = () => {
    const underline = underlineRef.current;
    if (!underline) return;

    gsap.killTweensOf(underline);
    const tl = gsap.timeline({ overwrite: true });

    tl.set(underline, { transformOrigin: "right center" })
      .to(underline, {
        scaleX: 0,
        duration: 0.22,
        ease: "power2.in",
      })
      .set(underline, { transformOrigin: "left center" })
      .to(underline, {
        scaleX: 1,
        duration: 0.26,
        ease: "power2.out",
      });

    return tl;
  };

  const onMouseEnter = () => {
    animateUnderlineCycle();

    gsap.to(charsRef.current, {
      y: -7,
      duration: 0.2,
      stagger: {
        each: 0.02,
        yoyo: true,
        repeat: 1,
      },
      ease: "sine.inOut"
    });
  };

  const content = (
    <>
      <div className="flex">
        {children.toUpperCase().split("").map((char, i) => (
          <span 
            key={i} 
            ref={el => { if(el) charsRef.current[i] = el }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      <div
        ref={underlineRef}
        className="w-full h-[1px] bg-current mt-2 transition-opacity duration-100 "
        style={{ transformOrigin: "left center", transform: "scaleX(1)" }}
      />
    </>
  );

  const sharedClasses = cn("relative uppercase flex flex-col items-start group py-1 font-semibold text-base cursor-pointer font-neueplak text-inherit" , className);

  if (href) {
    return (
      <Link 
        href={href} 
        target={target} 
        rel={rel} 
        className={sharedClasses} 
        onMouseEnter={onMouseEnter}
      >
        {content}
      </Link>
    );
  }

  return (
    <button 
      onMouseEnter={onMouseEnter}
      className={sharedClasses}
      {...props}
    >
      {content}
    </button>
  );
}

/**
 * Variant 2: Circle + Plus Icon with Circle Movement
 */
function CirclePlusVariant({ children, className, href, target, rel, ...props }: Omit<DaButtonProps, "variant">) {
  const circleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<any>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!circleRef.current || !containerRef.current) return;
      
      const updatePos = () => {
        if (!circleRef.current || !containerRef.current) return;
        const h = containerRef.current.offsetHeight;
        gsap.set(circleRef.current, { width: h, x: 0 });
      };

      updatePos();
      window.addEventListener("resize", updatePos);
      return () => window.removeEventListener("resize", updatePos);
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const onMouseEnter = () => {
    if (!circleRef.current || !containerRef.current) return;
    const h = containerRef.current.offsetHeight;
    const w = containerRef.current.offsetWidth;
    
    gsap.timeline({ overwrite: "auto" })
      .to(circleRef.current, { width: w, x: 0, duration: 0.3, ease: "power2.inOut" })
      .to(circleRef.current, { width: h, x: w - h, duration: 0.3, ease: "power2.inOut" });
  };

  const onMouseLeave = () => {
    if (!circleRef.current || !containerRef.current) return;
    const h = containerRef.current.offsetHeight;
    const w = containerRef.current.offsetWidth;
    
    gsap.timeline({ overwrite: "auto" })
      .to(circleRef.current, { width: w, x: 0, duration: 0.45, ease: "power2.inOut" })
      .to(circleRef.current, { width: h, x: 0, duration: 0.45, ease: "power2.inOut" });
  };

  const content = (
    <>
      <div 
        ref={circleRef}
        className="absolute h-full bg-[var(--color-sub-gray-4)] opacity-30 left-0 top-0 -z-10 pointer-events-none rounded-full"
      />
      <span className="whitespace-nowrap">{children.toUpperCase()}</span>
      <div className="flex items-center justify-center w-3 h-3">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-full h-full">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );

  const sharedClasses = cn(
    "relative flex items-center gap-6 px-4.5 pr-3.5 py-3 uppercase group font-bold text-sm isolate overflow-hidden text-inherit tracking-widest cursor-pointer font-neueplak rounded-full transition-colors duration-300", 
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={containerRef}
        target={target}
        rel={rel}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={sharedClasses}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={sharedClasses}
      {...props}
    >
      {content}
    </button>
  );
}

/**
 * Variant 3: Solid Black Button with Plus Icon
 */
function SolidBlackVariant({ children, className, href, target, rel, ...props }: Omit<DaButtonProps, "variant">) {
  const plusRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => {
    gsap.to(plusRef.current, { rotation: 90, duration: 0.3, ease: "power2.out" });
  };

  const onMouseLeave = () => {
    gsap.to(plusRef.current, { rotation: 0, duration: 0.3, ease: "power2.out" });
  };

  const content = (
    <>
      <span>{children}</span>
      <div ref={plusRef} className="ml-4 flex items-center justify-center w-3 h-3 text-gray-400 group-hover:text-white transition-colors">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-full h-full">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );

  const sharedClasses = cn(
    "flex items-center justify-between bg-[#111111] hover:bg-bg-accent duration-700 ease-in-out text-white px-8 py-4 rounded-full transition-colors group uppercase font-bold text-xs tracking-[0.2em] font-neueplak",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={sharedClasses}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={sharedClasses}
      {...props}
    >
      {content}
    </button>
  );
}

export default function DaButton({
  variant = "underline",
  children = "Button",
  href,
  ...props
}: DaButtonProps) {
  if (variant === "circle-plus") return <CirclePlusVariant href={href} {...props}>{children}</CirclePlusVariant>;
  if (variant === "solid-black") return <SolidBlackVariant href={href} {...props}>{children}</SolidBlackVariant>;

  return <UnderlineVariant href={href} {...props}>{children}</UnderlineVariant>;
}

