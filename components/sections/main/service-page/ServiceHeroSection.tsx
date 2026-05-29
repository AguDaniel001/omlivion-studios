"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import DaSectionContainer from '@/components/layout/DaSectionContainer';
import DaText from '@/components/ui/typography/DaText';
import '@/lib/gsap/animations'; // Ensure custom eases are registered
import { Spark } from '@/components/ui/Spark';
import { Circle } from '@/components/ui/Circle';

interface ServiceHeroSectionProps {
  headline: string;
  imageSrc: string;
  subheadline?: string;
  description?: string;
}

export default function ServiceHeroSection({
  headline,
  imageSrc,
  subheadline = "We design high-end marketing websites for ambitious brands.",
  description = "Our dedicated team of graphic designers and digital designers hone in on your brand vision to develop an impactful visual language for your online presence."
}: ServiceHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const overlineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const clipperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        }
      });

      // 1. Text animations - Using custom-3 for consistency with ContactSection image
      if (overlineRef.current) {
        tl.fromTo(overlineRef.current, 
          { y: 30, opacity: 0 },
          { 
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "custom-3",
          }, 0.2);
      }

      if (headlineRef.current) {
        tl.fromTo(headlineRef.current, 
          { y: 50, opacity: 0 },
          { 
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "custom-3",
          }, 0.4);
      }

      // 2. Image animations (reused logic from ContactSection)
      if (clipperRef.current && imageRef.current) {
        tl.fromTo(clipperRef.current, 
          { xPercent: -100 },
          { 
            xPercent: 0,
            duration: 1.8,
            ease: "custom-3",
          },
          0.1 // Overlap with text
        );

        tl.fromTo(imageRef.current,
          { xPercent: 100, scale: 1.2 },
          { 
            xPercent: 0,
            scale: 1,
            duration: 1.8,
            ease: "custom-3",
          },
          "<"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <DaSectionContainer ref={sectionRef} dataTheme="light" className="bg-bg-canvas pt-32 lg:pt-50 !px-0 lg:!pl-10 2xl:justify-end 3xl:justify-center overflow-hidden">
        {/* Background decoration */}
      <Circle className="absolute bottom-10 right-5" />
      <Spark variant="sparkAfrica" color='#dcdcdc' accentColor='#dcdcdc' className="w-40 h-40 absolute top-26 right-50 z-5 pointer-events-none text-white" />
      <div className="w-full flex flex-col lg:flex-row justify-between gap-0 lg:gap-10">
        
        {/* Left Column: Content Section */}
        <div className="flex flex-col w-full items-start lg:items-end pt-10 px-6 lg:px-0 lg:border-t lg:border-b-0 border-none">
          <div className='flex flex-col items-start '>
            <div ref={overlineRef} style={{ opacity: 0 }}>
              <DaText variant="overline" size="base" className="pb-8 lg:pb-14">
                Services
              </DaText>
            </div>
            <div ref={headlineRef} style={{ opacity: 0 }}>
              <DaText 
                align="left" 
                className="lg:text-right lg:pl-10 " 
                size="5xl2" 
                variant="headlineLg" 
                color="primary"
              >
                {headline}
              </DaText>
            </div>
          </div>
        </div>

        {/* Right Column: Image Section */}
        <div className='flex flex-col w-full'>
          <div 
            ref={imageContainerRef}
            className="relative w-full lg:max-w-[50vw] h-[400px] lg:h-[720px] overflow-hidden z-10"
          >
            {/* Clipper (reveals from left to right) */}
            <div ref={clipperRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              {/* Image Container (counter-slides and zooms out) */}
              <div ref={imageRef} className="relative h-full w-full">
                <Image
                  src={imageSrc}
                  alt={headline}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
          <div className='w-full px-6 lg:px-0 py-20 lg:py-[180px]'>
            <DaText className="flex flex-wrap max-w-xl pb-6 lg:pb-10" variant="titleMd" color="primary">
              {subheadline}
            </DaText>
            <DaText className="flex flex-wrap max-w-2xl" variant="bodyMd" color="primary">
              {description}
            </DaText>
          </div>
        </div>
      </div>
    </DaSectionContainer>
  );
}
