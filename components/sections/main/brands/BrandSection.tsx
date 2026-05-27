"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import DaSectionContainer from '@/components/layout/DaSectionContainer';
import DaSectionHeader from '@/components/composite/DaSectionHeader';
import { useBrandSectionAnimation } from '@/hooks/useBrandSectionAnimation';

interface BrandLogo {
  name: string;
  src: string;
}

const BRAND_LOGOS: BrandLogo[] = [
  { name: 'Google', src: '/assets/images/brands/Baunfire_Client_Google_v1.webp' },
  { name: 'Nike', src: '/assets/images/brands/service_logo_nike__1_.webp' },
  { name: 'Arlo', src: '/assets/images/brands/service_logo_arlo.webp' },
  { name: 'Disney', src: '/assets/images/brands/service_logo_disney.webp' },
  { name: 'FX', src: '/assets/images/brands/service_logo_fx.webp' },
  { name: 'Brand 1', src: '/assets/images/brands/logo_01_2x.webp' },
  { name: 'Brand 3', src: '/assets/images/brands/logo_03_2x.webp' },
  { name: 'Brand 5', src: '/assets/images/brands/logo_05_2x.webp' },
  { name: 'Brand 6', src: '/assets/images/brands/logo_06_2x.webp' },
  { name: 'Brand 7', src: '/assets/images/brands/logo_07_2x.webp' },
  { name: 'Brand 8', src: '/assets/images/brands/logo_08_2x.webp' },
  { name: 'Brand 9', src: '/assets/images/brands/logo_09_2x.webp' },
  { name: 'Brand 11', src: '/assets/images/brands/logo_11_2x.webp' },
  { name: 'Brand 12', src: '/assets/images/brands/logo_12_2x.webp' },
  { name: 'Brand 14', src: '/assets/images/brands/logo_14_2x.webp' },
  { name: 'Brand 16', src: '/assets/images/brands/logo_16_2x.webp' },
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
    <div data-theme="light" ref={containerRef} className="w-full bg-bg-canvas ">
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
              className="logo-item w-full flex items-center justify-center h-20 filter grayscale contrast-200 opacity-100 select-none cursor-pointer"
              aria-label={`${brand.name} logo`}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { 
                  filter: 'grayscale(0%) contrast(100%)', 
                  duration: 0.3, 
                  ease: "power2.out" 
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { 
                  filter: 'grayscale(100%) contrast(200%)', 
                  duration: 0.3, 
                  ease: "power2.out" 
                });
              }}
            >
              <div className="relative w-full h-full max-w-[140px] max-h-[50px]">
                <Image
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </DaSectionContainer>
    </div>
  );
}
