
"use client";

import React, { useState, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DaSectionContainer from '@/components/layout/DaSectionContainer';
import DaText from '@/components/ui/typography/DaText';
import { DaInput } from '@/components/ui/input/DaInput';
import { DaTextarea } from '@/components/ui/input/DaTextarea';
import DaButton from '@/components/ui/buttons/DaButton';
import '@/lib/gsap/animations'; // Ensure custom eases are registered
import { Spark } from '@/components/ui/Spark';
import { Circle } from '@/components/ui/Circle';

interface FormData {
  companyName: string;
  yourName: string;
  phoneNumber: string;
  emailAddress: string;
  projectDetails: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    yourName: '',
    phoneNumber: '',
    emailAddress: '',
    projectDetails: '',
  });

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const clipperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (clipperRef.current && imageRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          }
        });

        tl.fromTo(clipperRef.current, 
          { xPercent: -100 },
          { 
            xPercent: 0,
            duration: 1.8,
            ease: "custom-3",
          }
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
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <DaSectionContainer dataTheme="light" className="bg-white min-h-screen pt-50 pb-80 !px-0 !pl-10 justify-end ">
        {/* Background decoration */}
      <Circle className="absolute bottom-10 right-5" />
       <div className="absolute top-26 right-50 z-5 pointer-events-none text-white">
          <Spark variant="sparkAfrica" color='#dcdcdc' accentColor='#dcdcdc' className="w-40 h-40" />
        </div>
      <div className="max-w-[1420px] h-screen  w-full flex flex-col lg:flex-row gap-5 justify-between lg:gap-32 ">
        
        {/* Left Column: Form Section */}
        <div className="flex flex-col max-w-xl w-full ">
          <DaText variant="headlineSm" className="mb-6">
            Hi. Tell us about <br /> your project.
          </DaText>
          
          <DaText variant="bodyMd" color="secondary" className="mb-12">
            Fill out our form below or{' '}
            <a href="mailto:hello@omlivion.com" className="text-[#ff5a36] hover:underline font-semibold transition-colors">
              send us an email
            </a>
            .
          </DaText>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <DaInput
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
              />
              <DaInput
                name="yourName"
                placeholder="Your Name"
                value={formData.yourName}
                onChange={handleChange}
                required
              />
              
            </div>

            <div className="grid grid-cols-1 gap-6">
              <DaInput
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <DaInput
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                value={formData.emailAddress}
                onChange={handleChange}
                required
              />
              
            </div>

            <DaTextarea
              name="projectDetails"
              placeholder="Tell us about your project (Scope, timeline, budget, etc.)"
              rows={10}
              value={formData.projectDetails}
              onChange={handleChange}
              required
            />

            <div className="pt-6">
              <DaButton type="submit" variant="solid-black">
                Submit
              </DaButton>
            </div>
          </form>
        </div>

        {/* Right Column: Office Image Section */}
        <div 
          ref={imageContainerRef}
          className="relative hidden lg:block w-full max-w-[680px] overflow-hidden z-10"
        >
          {/* Clipper (reveals from left to right) */}
          <div ref={clipperRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Image Container (counter-slides and zooms out) */}
            <div ref={imageRef} className="relative h-full w-full">
              <Image
                src="/assets/images/office-space.jpg"
                alt="Office culture"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </DaSectionContainer>
  );
}
