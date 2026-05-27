"use client";

import React, { useRef } from 'react';
import DaText from '@/components/ui/typography/DaText';
import DaSectionContainer from '@/components/layout/DaSectionContainer';
import DaSectionHeader from '@/components/composite/DaSectionHeader';
import { useServiceListAnimation } from '@/hooks/useServiceListAnimation';

const  ServiceListSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useServiceListAnimation({
    container: containerRef,
    header: headerRef,
    title: titleRef,
  });

  const headline = "Elevating your brand at every touchpoint.";

  const services = [
    { id: 1, name: 'Website Design' },
    { id: 2, name: 'Responsive Web Design' },
    { id: 3, name: 'UI/UX Design' },
    { id: 4, name: 'Website Development' },
    { id: 5, name: 'Corporate Identity' },
    { id: 6, name: 'Insights & Analytics' },
    { id: 7, name: 'Motion Graphics' },
    { id: 8, name: 'Research & Discovery' },
    { id: 9, name: 'SEO Services' },
  ];

  return (
    <section ref={containerRef} data-theme="light" className="w-full bg-white relative">
      <DaSectionContainer className="flex flex-col gap-y-16 lg:gap-y-30 w-full py-20 lg:py-40">
        
        {/* Header Section */}
        <DaSectionHeader 
          headline={headline}
          headerRef={headerRef}
          titleRef={titleRef}
        />

        {/* Mapped List Section */}
        <div className="w-full max-w-[1200px] mx-auto flex justify-end">
          <div className="w-full lg:max-w-[800px] grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 border-t border-gray-100">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="relative flex justify-between items-center py-6 px-4 group cursor-pointer border-b border-gray-100 overflow-hidden"
              >
                {/* Hover Background - Enters from right to left */}
                <div 
                  className="absolute inset-0 bg-[#F5F5F5] translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"
                />
                
                <div className="relative z-10 flex justify-between w-full items-center">
                  <DaText 
                    variant="bodyMd" 
                    tag="span" 
                    weight="medium" 
                    tracking='tight'
                  >
                    {service.name}
                  </DaText>
                  <span className="text-text-brand text-xl font-light ">
                    +
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DaSectionContainer>
    </section>
  );
};


export default ServiceListSection;