"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import DaSectionContainer from '@/components/layout/DaSectionContainer';
import DaSectionHeader from '@/components/composite/DaSectionHeader';
import { usePartnerSectionAnimation } from '@/hooks/usePartnerSectionAnimation';
import { TestimonialCard } from './TestimonialCard';
import { testimonialsData } from './testimonialList';

/**
 * TestimonialSection refactored to follow the PartnerSection structure.
 */
export const TestimonialSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Initialize scroll-triggered animations using the PartnerSection logic
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
    >
      <div className="w-full max-w-[1200px] flex flex-col items-center lg:items-start gap-12 lg:gap-16 pb-40 pt-30 lg:py-40">

        {/* Left: Image Container */}
        <div 
          ref={imageRef}
          className="relative aspect-[5/3] w-full max-w-3xl h-auto overflow-hidden rounded-sm bg-white shadow-subtle "
        >
          <Image
            src="/assets/images/man-working.webp"
            alt="Satisfied client smiling"
            fill
            className="object-cover"
            priority
          />
        </div>
          
        <div className="w-full max-w-[600px] self-center lg:ml-50 lg:-translate-y-26">
          {/* Header Section */}
          <DaSectionHeader 
            headline="Making each of our clients happy, one project at a time."
            variant="headlineSm"
            headerRef={headerRef}
            titleRef={titleRef}
          />
          <div 
            ref={optionsRef}
            className="flex flex-col w-full pt-30 "
          >
            {testimonialsData.map((testimonial) => (
              <div key={testimonial.id} className="partner-option">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </DaSectionContainer>
  );
};

export default TestimonialSection;
