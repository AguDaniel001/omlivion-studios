"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import DaSectionContainer from '@/components/layout/DaSectionContainer';
import DaText from '@/components/ui/typography/DaText';
import { DaInput } from '@/components/ui/input/DaInput';
import { DaTextarea } from '@/components/ui/input/DaTextarea';
import DaButton from '@/components/ui/buttons/DaButton';

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
                variant="filled"
                value={formData.companyName}
                onChange={handleChange}
              />
              <DaInput
                name="userName"
                placeholder="Your Name"
                variant="filled"
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
                variant="filled"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <DaInput
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                variant="filled"
                value={formData.emailAddress}
                onChange={handleChange}
                required
              />
              
            </div>

            <DaTextarea
              name="projectDetails"
              placeholder="Tell us about your project (Scope, timeline, budget, etc.)"
              variant="filled"
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
        <div className="relative hidden lg:block w-full max-w-[680px]  overflow-hidden ">
          <Image
            src="/assets/images/office-space.jpg" // Using an existing image from the context
            alt="Office culture"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </div>
      </div>
    </DaSectionContainer>
  );
}
