"use client";

import React, { useRef } from 'react';
import { Spark } from '@/components/ui/Spark';
import DaSectionContainer from '@/components/layout/DaSectionContainer';
import DaSectionHeader from '@/components/layout/DaSectionHeader';
import DaText from '@/components/ui/typography/DaText';
import { useSplitScrollAnimation } from '@/hooks/useSplitScrollAnimation';
import { useCenterCircleAnimation } from '@/hooks/useCenterCircleAnimation';

// Define the structure for our content blocks
interface ContentStep {
  id: string;
  title: string;
  text: string;
}

const stepsData: ContentStep[] = [
  {
    id: "1",
    title: "Forward-Thinking",
    text: "We pride ourselves on pushing the boundaries of digital design and development. We combine relevant trends and best practices to build platforms with longevity."
  },
  {
    id: "2",
    title: "Constant Growth",
    text: "Our team is composed of ambitious creatives and strategists; each member is dedicated to perfecting their craft and taking brands to the next level."
  },
  {
    id: "3",
    title: "Well-Deserved Benefits",
    text: "Medical, dental, and vision coverage. Paid vacation, sick days, and a 401(k) plan. Sweeping views in the heart of Downtown San Jose. Dim sum and boba runs. Our team deserves it all."
  },
  {
    id: "4",
    title: "Detail-Oriented",
    text: "We sweat the small stuff, because we believe that the details make the design. A time-tested and true platform values quality over quantity."
  },
  {
    id: "5",
    title: "Great Character",
    text: "More than skill, drive, or experience, great work is rooted in character; hiring the right people and investing in personal development is essential to our growth."
  },
  {
    id: "6",
    title: "Self-Starting",
    text: "Having an entrepreneurial mindset ensures that every member of our team proudly takes ownership of each project, from concept to execution."
  },
  {
    id: "7",
    title: "Stay Humble",
    text: "We stand up for what we believe in, but never let ego get in the way. The key to growth is to embrace feedback and from team members and clients."
  },
  {
    id: "8",
    title: "Work Hard, Play Hard",
    text: "Sometimes the late nights, early mornings, and long design sprints call for strong drinks with good company. We value hard work and celebrate accordingly."
  },
];

export const CultureSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useSplitScrollAnimation({
    container: containerRef as React.RefObject<HTMLDivElement | null>,
    header: headerRef,
    title: titleRef,
    spark: sparkRef as React.RefObject<HTMLDivElement | null>,
    sparkSpeed: 400, // Faster parallel scroll
  });

  useCenterCircleAnimation({
    circle: circleRef,
    container: containerRef,
  });

  return (
    <DaSectionContainer 
      ref={containerRef}
      dataTheme="light" 
      className="relative min-h-[200vh] w-full overflow-clip bg-bg-canvas"
    >
      {/* Background Scaling Circle */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          ref={circleRef}
          className="sticky top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-sub-gray-4 rounded-full"
        />
      </div>

      <Spark 
        ref={sparkRef}
        variant="sparkAfrica" 
        className="w-28 h-28 absolute left-1/3 top-1/3 z-20 pointer-events-none " 
      />
      
      <div className="max-w-[1200px] mx-auto py-30 flex flex-col md:flex-row md:items-start relative z-10 gap-14 md:gap-8 w-full">
        
        {/* Left Column - Fixed/Sticky Header (Anchors Global Context) */}
        <div className="md:w-1/2 md:sticky md:top-24 h-fit pr-0 md:pr-8 lg:pb-18 ">
          <DaSectionHeader 
            headline="Our culture, values, and beliefs."
            headerRef={headerRef}
            titleRef={titleRef}
            variant="headlineSm"
            color="primary"
            align="left"
            maxW="100%"
            className="mx-0 mt-30"
          />
        </div>

        {/* Right Column - Scrollable Content (Progressive Details) */}
        <div className="md:w-1/2 flex flex-col gap-13 pl-0 md:pl-0  md:py-20">
          {stepsData.map((step) => (
            <article key={step.id} >
              <DaText variant="titleMd" size="2xl" color="primary" className="mb-3">
                {step.title}
              </DaText>
              <DaText variant="bodyMd" color="primary"  >
                {step.text}
              </DaText>
            </article>
          ))}
        </div>

      </div>
    </DaSectionContainer>
  );
};

export default CultureSection;
