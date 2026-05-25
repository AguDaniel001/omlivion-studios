"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import DaSectionContainer from '@/components/layout/DaSectionContainer';
import DaSectionHeader from '@/components/layout/DaSectionHeader';
import DaText from '@/components/ui/typography/DaText';
import { usePartnerSectionAnimation } from '@/hooks/usePartnerSectionAnimation';

/**
 * PartnerSection refactored to follow the design system and ensure responsiveness.
 * Uses a grid layout for desktop and stacks on mobile.
 */
export const PartnerSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Initialize scroll-triggered animations
  usePartnerSectionAnimation({
    container: containerRef,
    header: headerRef,
    title: titleRef,
    image: imageRef,
    options: optionsRef,
  });

  return (
    <DaSectionContainer 
      ref={containerRef}
      dataTheme="light" 
      className="w-full"
    >
      <div className="w-full max-w-[1200px] flex flex-col gap-12 lg:gap-16 pb-20 !pt-20 lg:py-40">
        
        {/* Header Section */}
        <DaSectionHeader 
          headline="Here's how we can partner together"
          variant="headlineSm"
          maxW="500px"
          className='z-5 translate-y-20  max-lg:translate-y-0 '
          headerRef={headerRef}
          titleRef={titleRef}
        />

        {/* Content Layout: Grid for responsiveness */}
        <div className="grid grid-cols-1 lg:grid-cols-12 !pl-12 max-lg:!pl-0 gap-12 lg:gap-8 items-start  ">
          
          {/* Left: Image Container */}
          <div 
            ref={imageRef}
            className="lg:col-span-7 relative aspect-[4/3] w-full h-115 max-lg:h-auto overflow-hidden rounded-sm bg-white shadow-subtle"
          >
            <Image
              src="/assets/images/woman-thinking.webp"
              alt="Team collaborating in an office space"
              fill
              className="object-cover  "
              sizes="(max-width: 1044px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right: Service Options */}
          <div 
            ref={optionsRef}
            className="lg:col-span-5 flex flex-col gap-y-12 lg:gap-y-16 w-full lg:max-w-[400px] lg:ml-auto"
          >
            
            {/* Option 1: Project-Based */}
            <div className="partner-option space-y-2 lg:space-y-2">
              <DaText variant="titleMd" tag="h3" tracking="tight">
                Project-Based
              </DaText>
              <DaText variant="bodyMd" weight="light" color="tertiary" leading="relaxed">
                For one-time needs that require a more agile approach—we work with your 
                team on projects that have a clearly defined brief, budget, and timeline.
              </DaText>
            </div>

            {/* Option 2: Agency of Record */}
            <div className="partner-option space-y-2 lg:space-y-2">
              <DaText variant="titleMd" tag="h3" tracking="tight">
                Agency of Record
              </DaText>
              <DaText variant="bodyMd" weight="light" color="tertiary" leading="relaxed">
                An ideal fit for companies that have ongoing design needs—we work with 
                you to build out the deliverables needed to drive your marketing efforts.
              </DaText>
            </div>

          </div>
        </div>

      </div>
    </DaSectionContainer>
  );
};

export default PartnerSection;
