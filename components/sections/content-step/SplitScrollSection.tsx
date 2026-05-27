"use client";

import React, { useRef } from 'react';
import { Circle } from '@/components/ui/Circle';
import { Spark } from '@/components/ui/Spark';
import DaSectionContainer from '@/components/layout/DaSectionContainer';
import DaSectionHeader from '@/components/composite/DaSectionHeader';
import DaText from '@/components/ui/typography/DaText';
import { useSplitScrollAnimation } from '@/hooks/useSplitScrollAnimation';

// Define the structure for our content blocks
interface ContentStep {
  number: string;
  title: string;
  text: string;
}

const stepsData: ContentStep[] = [
  {
    number: "01",
    title: "Discover",
    text: "Our goal is to fully understand each client's business and the environment in which it operates. We look to completely understand the target audience and how they will interact with the digital products we deliver."
  },
  {
    number: "02",
    title: "Strategize",
    text: "Our planning process turns research into a clear set of action items to meet business goals. We take this information to build the blueprint to drive more traffic and convert web visitors into web leads."
  },
  {
    number: "03",
    title: "Execute",
    text: "With a clear blueprint in hand, we shift into production. We design immersive digital experiences and back them with clean, scalable code to ensure peak performance across all devices."
  },
  {
    number: "04",
    title: "Launch",
    text: "During the Implementation, our job is to translate creative into a full program that goes live. Implementation often includes an array of services, which can include design, development and search marketing."
  },
  {
    number: "05",
    title: "Evolve",
    text: "Last but not least, our task is to use scientific metrics to track and analyze campaign performance. This helps us easily identify what worked and what did not, we then initiate new strategies to maximize your business goals."
  },
];

export const SplitScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<SVGSVGElement>(null);

  useSplitScrollAnimation({
    container: containerRef as React.RefObject<HTMLDivElement | null>,
    header: headerRef,
    title: titleRef,
    spark: sparkRef as React.RefObject<HTMLDivElement | null>,
    sparkSpeed: 400, // Faster parallel scroll
  });

  return (
    <DaSectionContainer 
      ref={containerRef}
      dataTheme="dark" 
      className="relative min-h-screen w-full overflow-clip bg-bg-dark"
    >
      <Circle size="120vh" className="absolute -left-1/6 top-0" />
      <Spark 
        ref={sparkRef}
        variant="spark1" 
        className="w-28 h-28 absolute left-1/3 top-1/3 z-10 pointer-events-none text-white" 
      />
      
      <div className="max-w-6xl mx-auto py-30 flex flex-col md:flex-row md:items-start relative gap-12 md:gap-8 w-full">
        
        {/* Left Column - Fixed/Sticky Header (Anchors Global Context) */}
        <div className="md:w-1/2 md:sticky md:top-24 h-fit pr-0 md:pr-8 ">
          <DaSectionHeader 
            headline="Design-driven. Strategy-led."
            headerRef={headerRef}
            titleRef={titleRef}
            variant="headlineSm"
            color="white"
            align="left"
            maxW="100%"
            className="mx-0 mt-30"
          />
        </div>

        {/* Right Column - Scrollable Content (Progressive Details) */}
        <div className="md:w-1/2 flex flex-col gap-32 pl-0 md:pl-8 py-10 md:py-20">
          {stepsData.map((step) => (
            <article key={step.number} className="max-w-md">
              <DaText variant="titleMd" color="white" className="mb-4">
                {step.number} {step.title}
              </DaText>
              <DaText variant="bodyMd" color="muted">
                {step.text}
              </DaText>
            </article>
          ))}
        </div>

      </div>
    </DaSectionContainer>
  );
};

export default SplitScrollSection;
