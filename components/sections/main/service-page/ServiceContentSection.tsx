"use client";

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import DaSectionContainer from '@/components/layout/DaSectionContainer';
import DaText from '@/components/ui/typography/DaText';
import DaButton from '@/components/ui/buttons/DaButton';
import { Spark } from '@/components/ui/Spark';
import { revealFromUnder } from '@/lib/gsap/animations';
import { cn } from '@/lib/utils';

// Define types for component data
interface RelatedService {
  name: string;
  href: string;
}

interface ServiceContentSectionProps {
  content?: string;
}

const servicesList: string[] = [
  'Moodboards',
  'Site Architecture',
  'Wireframes',
  'Visual Concepts',
  'User Interface',
  'User Experience',
];

const relatedServices: RelatedService[] = [
  { name: 'UI/UX Design', href: '#' },
  { name: 'Responsive Web Design', href: '#' },
  { name: 'Content Strategy', href: '#' },
];

const defaultContent = `We align our web design agency with industry-leading global brands and forward-thinking startups to design great digital experiences on the web. Our purpose is to create impactful marketing websites, with web designs optimized to drive traffic, engagement, and conversion for businesses across various industries. With a design-driven, strategy-led approach, our creative team hones in on your brand vision in order to guide the overall look and feel of your website.

In the design execution phase of a website project, our goal is to leverage elevated visuals with clear purpose and intent. We do this by developing an improved user flow and navigation system, followed by a round of visual explorations in order to determine a clear design direction. We ensure that your redesigned website translates seamlessly across desktop, tablet, and mobile devices by creating a flexible visual language.`;

export const ServiceContentSection: React.FC<ServiceContentSectionProps> = ({ 
  content = defaultContent 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphs = content.split('\n\n');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal list items
      const listItems = containerRef.current?.querySelectorAll('.list-item');
      if (listItems && listItems.length > 0) {
        revealFromUnder(listItems, containerRef.current!);
      }

      // Reveal main content paragraphs
      const paragraphsElements = containerRef.current?.querySelectorAll('.content-paragraph');
      if (paragraphsElements && paragraphsElements.length > 0) {
        revealFromUnder(paragraphsElements, containerRef.current!, { delay: 0.2, stagger: 0.2 });
      }

      // Reveal button
      const button = containerRef.current?.querySelector('.cta-button');
      if (button) {
        revealFromUnder(button, containerRef.current!, { delay: 0.6 });
      }

      // Reveal related services section
      const related = containerRef.current?.querySelector('.related-section');
      if (related) {
        revealFromUnder(related, containerRef.current!, { delay: 0.4 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <DaSectionContainer
      ref={containerRef}
      dataTheme="light"
      className="relative overflow-hidden py-[180px]"
    >
      {/* Decorative Spark */}
      <Spark
        variant="sparkAfrica"
        color="#dcdcdc"
        accentColor="#dcdcdc"
        className="w-40 h-40 absolute top-[25%] right-[15%] z-0 pointer-events-none opacity-40 lg:opacity-60"
      />

      <div className="max-w-[1200px]  grid grid-cols-1 lg:grid-cols-12 gap-30 w-full relative z-10 ">
        
        {/* Left Column: Core List & Related Services */}
        <div className="lg:col-span-3 flex flex-col justify-between h-full">
          
          {/* Core Design Deliverables List */}
          <ul className="space-y-4">
            {servicesList.map((service, index) => (
              <li key={index} className="list-item list-disc marker:text-text-brand marker:text-sm flex items-center space-x-4">
                <DaText >
                  {service}
                </DaText>
              </li>
            ))}
          </ul>

          {/* Related Services Links */}
          <div className="related-section pt-12 lg:pt-0 mb-[100px]">
            <DaText variant="overlineSm" className="mb-6">
              Related Services
            </DaText>
            <ul className="space-y-4">
              {relatedServices.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="group flex flex-col items-start"
                  >
                    <DaText 
                      variant="bodyMd" 
                      color="secondary"
                      size="base"
                      className="underline decoration-text-muted underline-offset-3 decoration-1"
                    >
                      {service.name}
                    </DaText>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Main Body Paragraphs */}
        <div className="lg:col-span-9 flex flex-col space-y-12 max-w-[860px] ">
          {paragraphs.map((para, index) => (
            <div 
              key={index} 
              className={cn(
                "content-paragraph overflow-hidden",
                index === 0 && "mt-[180px]"
              )}
            >
              <DaText variant="bodyMd" leading='loose'>
                {para}
              </DaText>
            </div>
          ))}

          <div className="cta-button pt-12">
            <DaButton variant="circle-plus" href='/contact'>
              Let's Talk
            </DaButton>
          </div>
        </div>

      </div>
    </DaSectionContainer>
  );
};


export default ServiceContentSection;
