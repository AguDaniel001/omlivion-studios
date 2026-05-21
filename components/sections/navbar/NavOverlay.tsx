"use client";

import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import DaText from "@/components/ui/typography/DaText";
import { useNavOverlayAnimation } from "@/hooks/useNavOverlayAnimation";
import { useNavLinkAnimation } from "@/hooks/useNavLinkAnimation";

const navItems = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];

const socialIcons = [
  { name: "Twitter", href: "#", icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
  )},
  { name: "LinkedIn", href: "#", icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  )},
  { name: "Instagram", href: "#", icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.282.975.95 1.246 2.217 1.308 3.584.058 1.266.069 1.646.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.333 2.633-1.283 3.608-.95.975-2.217 1.246-3.584 1.308-1.267.058-1.646.07-4.849.07-3.204 0-3.584-.012-4.849-.07-1.367-.062-2.633-.333-3.608-1.283-.95-.975-1.246-2.217-1.308-3.584-.059-1.267-.07-1.647-.07-4.849 0-3.204.011-3.584.07-4.849.062-1.367.333-2.633 1.283-3.608.95-.975 2.217-1.247 3.584-1.308 1.266-.059 1.645-.07 4.849-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.363-2.615-6.784-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  )},
  { name: "Dribbble", href: "#", icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.522-1.453 4.218-4.053 4.392-6.87zm-1.104-1.39a10.59 10.59 0 00-3.32-.43c-3.414 0-6.7.935-9.303 2.557.182.4.455.935.785 1.545 2.463-1.026 5.95-1.533 9.247-1.1.55.072.935.143 1.24.22-.054-.233-.274-.783-.55-1.542zm-1.807 7.829c-.12-.63-.77-3.726-2.215-7.555-3.12.393-5.71.262-6.517.21a11.34 11.34 0 01 2.14 3.446c.197.436.383.867.558 1.287a10.05 10.05 0 006.034 2.612zm-8.348-1.12c-.15-.36-.33-.747-.525-1.157a11.533 11.533 0 00-2.483-3.693 9.95 9.95 0 00-1.847 7.23 10.15 10.15 0 004.855-2.38zm-5.732-3.708a8.93 8.93 0 01 1.64-5.642A9.914 9.914 0 001.12 12a10.06 10.06 0 00.012 2.225zM12 1.125c-2.42 0-4.64.867-6.39 2.302 2.49 2.103 4.208 5.47 5.03 9.073 2.063-.855 4.757-1.362 7.268-1.362.43 0 .844.015 1.24.045A9.94 9.94 0 0012 1.125z"/></svg>
  )},
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

  const animationRefs = useMemo(() => ({ link: linkRef, text: textRef }), []);
  useNavLinkAnimation(animationRefs, isHovered, isDimmed);

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
          className="whitespace-nowrap !text-transparent bg-clip-text bg-gradient-to-r from-white from-50% to-zinc-700 to-50% bg-[length:200%_100%] [background-position:var(--wipe-pos)_0%]"
        >
          {name}
        </DaText>
      </div>
    </Link>
  );
}

export default function NavOverlay({ isOpen, onClose }: NavOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  const animationRefs = useMemo(() => ({
    overlay: overlayRef,
    circle: circleRef,
    links: linksRef,
    contact: contactRef,
  }), []);

  useNavOverlayAnimation(animationRefs, isOpen);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] invisible flex items-center px-12 md:px-24 pointer-events-none"
    >
      {/* Background Circle */}
      <div
        ref={circleRef}
        className="fixed top-10 right-12 w-4 h-4 rounded-full bg-dark origin-center pointer-events-none scale-0"
      />
      

      <div className="flex w-full justify-between max-md:flex-col max-h-screen overflow-y-auto py-20 gap-20 pointer-events-none">

        <div className=" flex gap-20 max-md:gap-0 pointer-events-none" >
          <div className="relative z-10 hidden md:block">
            <DaText variant="overline" color="white" className=" rotate-90 w-5 pt-16 "  >
                Menu
            </DaText>
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
            <DaText variant="titleLg" className="text-white">
              Get in touch
            </DaText>
            <a href="mailto:hello@omlivion.com" className="text-zinc-400 hover:text-white transition-colors">
              hello@omlivion.com
            </a>
            <a href="tel:+1234567890" className="text-zinc-400 hover:text-white transition-colors">
              +1 (234) 567-890
            </a>
            <div className="flex gap-3 pt-6">
              {socialIcons.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
