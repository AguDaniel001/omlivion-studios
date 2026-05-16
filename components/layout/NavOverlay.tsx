"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import DaTypography from "@/components/ui/typography/DaTypography";

const navItems = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Individual Nav Link with Internal Color Wipe
 */
function NavLink({
  name,
  href,
  onClick,
  isHovered,
  isDimmed,
  onMouseEnter,
}: {
  name: string;
  href: string;
  onClick: () => void;
  isHovered: boolean;
  isDimmed: boolean;
  onMouseEnter: () => void;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Movement Animation
    gsap.to(linkRef.current, {
      x: isHovered ? 48 : 0,
      duration: 0.6,
      ease: "power3.out",
    });

    // 2. Internal Color Wipe Animation
    // We animate a CSS variable to control the background-position of the text clip
    // 100% = Dark Gray (from right), 0% = White (from left)
    gsap.to(textRef.current, {
      "--wipe-pos": isDimmed ? "100%" : "0%",
      duration: 0.8,
      ease: "power3.inOut", // Smooth starting and ending
    });
  }, [isHovered, isDimmed]);

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="relative block py-1"
    >
      <div 
        ref={textRef} 
        style={{ "--wipe-pos": "0%" } as React.CSSProperties}
      >
        <DaTypography
          variant="displayHero"
          color="inherit"
          className="whitespace-nowrap !text-transparent bg-clip-text bg-gradient-to-r from-white from-50% to-zinc-700 to-50% bg-[length:200%_100%] [background-position:var(--wipe-pos)_0%]"
        >
          {name}
        </DaTypography>
      </div>
    </Link>
  );
}

export default function NavOverlay({ isOpen, onClose }: NavOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Open animation
      gsap.to(circleRef.current, {
        scale: 1500,
        duration: 0.8,
        ease: "power4.inOut",
      });

      gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.1,
      });

      gsap.fromTo(
        linksRef.current?.children || [],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      // Close animation
      setHoveredIndex(null);
      setIsMenuHovered(false);
      gsap.to(linksRef.current?.children || [], {
        x: -50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.in",
      });

      gsap.to(circleRef.current, {
        scale: 0,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.2,
        onComplete: () => {
          gsap.set(overlayRef.current, { autoAlpha: 0 });
        },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] invisible flex items-center px-12 md:px-24 pointer-events-none"
    >
      {/* Background Circle */}
      <div
        ref={circleRef}
        className="fixed top-10 right-12 w-4 h-4 rounded-full bg-zinc-900 origin-center pointer-events-none scale-0"
      />

      {/* Nav Links Container */}
      <div
        ref={linksRef}
        onMouseEnter={() => setIsMenuHovered(true)}
        onMouseLeave={() => {
          setIsMenuHovered(false);
          setHoveredIndex(null);
        }}
        className="relative z-10 flex flex-col gap-1 pointer-events-auto"
      >
        {navItems.map((item, index) => (
          <NavLink
            key={item.name}
            name={item.name}
            href={item.href}
            onClick={onClose}
            isHovered={hoveredIndex === index}
            isDimmed={isMenuHovered && hoveredIndex !== index}
            onMouseEnter={() => setHoveredIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
