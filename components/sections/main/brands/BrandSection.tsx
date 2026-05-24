"use client";

import React, { useRef } from 'react';
import DaSectionContainer from '@/components/layout/DaSectionContainer';
import DaSectionHeader from '@/components/layout/DaSectionHeader';
import { useBrandSectionAnimation } from '@/hooks/useBrandSectionAnimation';

interface BrandLogo {
  name: string;
  renderLogo: () => React.ReactNode;
}

const BRAND_LOGOS: BrandLogo[] = [
  { name: 'Google', renderLogo: () => <span className="font-sans font-medium text-2xl tracking-tight text-neutral-800">Google</span> },
  { 
    name: 'Nike', 
    renderLogo: () => (
      <svg className="w-16 h-8 text-neutral-800 fill-current" viewBox="0 0 24 24">
        <path d="M21 6.5c-2.3 2.3-6.5 5.1-11.5 6.7-2.7.9-5.1 1.2-6.5 1.1-.3 0-.5-.2-.3-.5.9-1.4 3.9-4.8 8.8-7.9 3.8-2.4 7.6-3.2 9.1-2.9.4.1.4.9.4.5z"/>
      </svg>
    ) 
  },
  { name: 'snowflake', renderLogo: () => <span className="font-light text-xl text-neutral-800">❄ snowflake</span> },
  { name: 'NETGEAR', renderLogo: () => <span className="font-black tracking-widest text-lg text-neutral-800">NETGEAR</span> },
  { 
    name: 'Vans / V-Logo', 
    renderLogo: () => (
      <svg className="w-14 h-8 text-neutral-800 fill-current" viewBox="0 0 100 40">
        <path d="M10 10 H45 L30 30 H10 Z M50 10 L60 30 L70 10 Z" />
      </svg>
    ) 
  },
  { name: 'CISCO', renderLogo: () => <span className="font-bold tracking-widest text-sm text-neutral-800 text-center">╎╎ Mathews ╎╎<br/><span className="text-xs">CISCO</span></span> },
  { name: 'orbi', renderLogo: () => <span className="font-light text-2xl text-neutral-800 tracking-wide">orbi<span className="text-[8px] align-super">TM</span></span> },
  { name: 'KEEP TAHOE BLUE', renderLogo: () => <span className="font-bold text-xs leading-none text-neutral-800 text-left block border-l-2 border-neutral-800 pl-1">KEEP<br/>TAHOE<br/>BLUE</span> },
  { name: 'HITACHI', renderLogo: () => <span className="font-bold tracking-widest text-base text-neutral-800">HITACHI</span> },
  { name: 'arlo', renderLogo: () => <span className="font-light text-2xl text-neutral-800">arlo</span> },
  { name: 'NOKIA', renderLogo: () => <span className="font-black tracking-wider text-xl text-neutral-800 font-mono">NOKIA</span> },
  { name: 'SAN JOSE', renderLogo: () => <span className="font-serif text-xs uppercase tracking-wider text-neutral-800">City of<br/><span className="text-sm font-bold">San José</span></span> },
  { name: 'FX', renderLogo: () => <span className="font-black text-3xl tracking-tighter text-neutral-800">FX</span> },
  { name: 'veracyte', renderLogo: () => <span className="font-normal text-lg text-neutral-800">▼ veracyte_</span> },
  { name: 'maxim integrated', renderLogo: () => <span className="font-sans text-xs font-bold text-neutral-800">M maxim<br/><span className="font-light">integrated™</span></span> },
  { name: 'The Walt Disney Company', renderLogo: () => <span className="font-serif italic text-sm font-bold text-neutral-800">The Walt Disney Company</span> },
];

export default function BrandSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useBrandSectionAnimation({
    container: containerRef,
    header: headerRef,
    title: titleRef,
    logos: logosRef,
  });

  const headline = "Some friends we’ve made in the process.";

  return (
    <div ref={containerRef} className="w-full bg-bg-canvas">
      <DaSectionContainer className="flex flex-col gap-y-16 lg:gap-y-30 w-full py-20 lg:py-40">
        
        {/* Header Section */}
        <DaSectionHeader 
          headline={headline}
          headerRef={headerRef}
          titleRef={titleRef}
          align="center"
          maxW="800px"
        />

        {/* Grid Architecture */}
        <div 
          ref={logosRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 sm:gap-y-16 lg:gap-y-20 items-center justify-items-center max-w-[1200px] mx-auto w-full"
        >
          {BRAND_LOGOS.map((brand) => (
            <div 
              key={brand.name} 
              className="logo-item w-full flex items-center justify-center h-20 hover:opacity-100 filter grayscale contrast-200 hover:grayscale-0 transform hover:scale-105 select-none"
              aria-label={`${brand.name} logo`}
            >
              {brand.renderLogo()}
            </div>
          ))}
        </div>
      </DaSectionContainer>
    </div>
  );
}
