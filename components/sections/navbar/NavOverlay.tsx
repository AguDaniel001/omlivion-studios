"use client";

import { useRef, useState, useMemo, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import DaText from "@/components/ui/typography/DaText";
import { useNavOverlayAnimation } from "@/hooks/useNavOverlayAnimation";
import { useNavLinkAnimation } from "@/hooks/useNavLinkAnimation";
import { cn } from "@/lib/utils";

import DaIcon from "@/components/ui/icon/DaIcon";

const navItems = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const socialIcons = [
  { name: "Twitter", href: "#", iconName: "twitter" },
  { name: "LinkedIn", href: "#", iconName: "linkedin" },
  { name: "Instagram", href: "#", iconName: "instagram" },
  { name: "Dribbble", href: "#", iconName: "dribbble" },
];

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  isLightSection?: boolean;
}

function NavLink({
  name,
  href,
  onClick,
  isHovered,
  isDimmed,
  onMouseEnter,
  isDark,
}: {
  name: string;
  href: string;
  onClick: () => void;
  isHovered: boolean;
  isDimmed: boolean;
  onMouseEnter: () => void;
  isDark?: boolean;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const animationRefs = useMemo(() => ({ link: linkRef, text: textRef }), []);
  useNavLinkAnimation(animationRefs, isHovered, isDimmed);

  const fromColorClass = isDark ? "from-dark" : "from-white";
  const toColorClass = isDark ? "to-zinc-500/50" : "to-zinc-700";

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
        <DaText
          variant="headlineMd"
          color="inherit"
          className={cn(
            "whitespace-nowrap !text-transparent bg-clip-text bg-gradient-to-r from-50% to-50% bg-[length:200%_100%] [background-position:var(--wipe-pos)_0%]",
            fromColorClass,
            toColorClass
          )}
        >
          {name}
        </DaText>
      </div>
    </Link>
  );
}

export default function NavOverlay({ isOpen, onClose, isLightSection }: NavOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  // Overlay turns white on a dark section (isLightSection = false)
  const isWhiteOverlay = !isLightSection;
  const textColor = isWhiteOverlay ? "text-dark" : "text-white";
  const mutedTextColor = isWhiteOverlay ? "text-zinc-500" : "text-zinc-400";
  const circleBg = isWhiteOverlay ? "bg-white" : "bg-dark";

  const animationRefs = useMemo(() => ({
    overlay: overlayRef,
    circle: circleRef,
    links: linksRef,
    contact: contactRef,
    menu: menuRef,
  }), []);

  useNavOverlayAnimation(animationRefs, isOpen);

  // Animate theme changes with GSAP
  useLayoutEffect(() => {
    if (!isOpen) return;

    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        color: isWhiteOverlay ? "var(--color-dark)" : "var(--color-white)",
        duration: 0.5,
        ease: "power2.inOut"
      });
      gsap.to(circleRef.current, {
        backgroundColor: isWhiteOverlay ? "#ffffff" : "#1f1e1d",
        duration: 0.5,
        ease: "power2.inOut"
      });
    }, overlayRef);

    return () => ctx.revert();
  }, [isWhiteOverlay, isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] invisible flex items-center justify-center pointer-events-none"
    >
      {/* Background Circle */}
      <div
        ref={circleRef}
        className={`fixed top-10 right-12 w-4 h-4 rounded-full origin-center pointer-events-none scale-0 ${circleBg}`}
      />


      <div className="flex w-full max-w-[1450px] px-12 md:px-24 justify-between max-md:flex-col max-h-screen overflow-y-auto py-20 gap-20 pointer-events-none">

        <div className="flex gap-10 max-md:gap-0 pointer-events-none" >
          <div ref={menuRef} className="relative z-10 hidden md:block pt-11">
            <div className=" -rotate-90 origin-center whitespace-nowrap">
              <DaText 
                variant="overline"
                size="base"
                color="inherit"
                tracking="widest"
                weight="extrabold"
                className={`transition-colors duration-500 ${textColor}`}
              >
                  Menu
              </DaText>
            </div>
          </div>
                {/* Nav Links Container */}
          <div
            ref={linksRef}
            onMouseEnter={() => setIsMenuHovered(true)}
            onMouseLeave={() => {
              setIsMenuHovered(false);
              setHoveredIndex(null);
            }}
            className="relative z-10 flex flex-col pointer-events-auto"
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
                isDark={isWhiteOverlay}
              />
            ))}
          </div>
         </div>
        
        {/* Contact Details Container */}
        <div 
          ref={contactRef}
          className="flex justify-end items-end flex-col gap-4 relative z-10 pointer-events-auto mt-auto md:mt-0"
        >
          <div className="flex flex-col md:items-end gap-2">
            <DaText variant="titleSm" className={`transition-colors duration-500 ${textColor}`}>
              Get in touch
            </DaText>
            <a href="mailto:hello@omlivion.com" className={`transition-colors duration-500 hover:opacity-70 ${mutedTextColor}`}>
              hello@omlivion.com
            </a>
            <a href="tel:+1234567890" className={`transition-colors duration-500 hover:opacity-70 ${mutedTextColor}`}>
              +1 (234) 567-890
            </a>
            <div className="flex gap-3 pt-6">
              {socialIcons.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-500 hover:opacity-70 ${textColor}`}
                aria-label={social.name}
              >
                <DaIcon name={social.iconName as any} size="md" />
              </a>
            ))}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
