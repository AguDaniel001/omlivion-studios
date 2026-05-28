"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DaSectionContainer from '@/components/layout/DaSectionContainer';
import DaText from '@/components/ui/typography/DaText';
import '@/lib/gsap/animations'; // Ensure custom eases are registered
import { Spark } from '@/components/ui/Spark';
import { Circle } from '@/components/ui/Circle';

export default function ServiceHeroSection() {
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
    <DaSectionContainer ref={sectionRef} dataTheme="light" className="bg-bg-canvas  pt-50 !px-0 !pl-10 justify-end  ">
        {/* Background decoration */}
      <Circle className="absolute bottom-10 right-5" />
      <Spark variant="sparkAfrica" color='#dcdcdc' accentColor='#dcdcdc' className="w-40 h-40 absolute top-26 right-50 z-5 pointer-events-none text-white" />
      <div className="max-w-[1420px] w-full flex flex-col lg:flex-row  justify-between gap-10 ">
        
        {/* Left Column: Content Section */}
        <div className="flex flex-col max-w-lg w-full pt-20">
          <div ref={overlineRef} style={{ opacity: 0 }}>
            <DaText variant="overline" size="base" className="pb-14">
              Services
            </DaText>
          </div>
          <div ref={headlineRef} style={{ opacity: 0 }}>
            <DaText className="pl-10 flex flex-wrap max-w-3xl  " size="5xl2"  variant="headlineLg" color="primary">
              Website Design
            </DaText>
          </div>
        </div>

        {/* Right Column: Image Section */}
        <div className='flex flex-col w-full'>
          
        
        <div 
          ref={imageContainerRef}
          className="relative lg:block w-full h-[76vh] max-md:h-[30vh] overflow-hidden z-10 "
        >
          {/* Clipper (reveals from left to right) */}
          <div ref={clipperRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none  ">
            {/* Image Container (counter-slides and zooms out) */}
            <div ref={imageRef} className="relative h-full w-full">
              <Image
                src="/assets/images/woman-thinking.webp"
                alt="Website Design"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
        <div className='w-full py-[180px] '>
          <DaText className=" flex flex-wrap max-w-xl pb-10 "   variant="titleMd" color="primary">
            We design high-end marketing websites for ambitious brands.
          </DaText>
          <DaText className=" flex flex-wrap max-w-2xl  "   variant="bodyMd" color="primary">
            Our dedicated team of graphic designers and digital designers hone in on your brand vision to develop an impactful visual language for your online presence.
          </DaText>
        </div>
        
        </div>

      </div>
    </DaSectionContainer>
  );
}
