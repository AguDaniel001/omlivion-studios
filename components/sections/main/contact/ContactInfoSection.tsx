import React from 'react';
import DaSectionContainer from '@/components/layout/DaSectionContainer';
import DaText from '@/components/ui/typography/DaText';

export default function ContactInfoSection() {
  return (
    <DaSectionContainer dataTheme="light" className="bg-[#f5f5f5] py-20">
      <div className="max-w-7xl mx-auto w-full relative">
        {/* Decorative element */}
        <div className="absolute -top-12 left-0">
          <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff5a36]"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-4">
          {/* Column 1: Let's Talk */}
          <div className="flex flex-col space-y-4">
            <DaText variant="titleSm" color="primary">
              Let's Talk
            </DaText>
            <DaText variant="bodyMd" color="secondary" className="max-w-[240px]">
              Tell us about your next project.
            </DaText>
            <div className="pt-2">
              <a 
                href="mailto:hello@omlivion.com" 
                className="text-[#ff5a36] hover:text-[#e04e2e] transition-colors inline-block pb-1 border-b border-[#ff5a36] font-semibold text-sm tracking-widest uppercase font-neueplak"
              >
                hello@omlivion.com
              </a>
            </div>
          </div>

          {/* Column 2: Say Hello */}
          <div className="flex flex-col space-y-4">
            <DaText variant="titleSm" color="primary">
              Say Hello
            </DaText>
            <DaText variant="bodyMd" color="secondary" className="max-w-[240px]">
              Drop us a line or give us a call.
            </DaText>
            <div className="pt-2">
              <a 
                href="mailto:hello@omlivion.com" 
                className="text-[#ff5a36] hover:text-[#e04e2e] transition-colors inline-block pb-1 border-b border-[#ff5a36] font-semibold text-sm tracking-widest uppercase font-neueplak"
              >
                hello@omlivion.com
              </a>
            </div>
          </div>

          {/* Column 3: Our Office */}
          <div className="flex flex-col space-y-4">
            <DaText variant="titleSm" color="primary">
              Our Office
            </DaText>
            <div>
              <DaText variant="bodyMd" color="secondary">
                75 E Santa Clara St, Ste 1425
              </DaText>
              <DaText variant="bodyMd" color="secondary">
                San Jose, California 95113
              </DaText>
            </div>
            <div className="pt-2">
              <a 
                href="tel:4088998998" 
                className="text-[#ff5a36] hover:text-[#e04e2e] transition-colors inline-block pb-1 border-b border-[#ff5a36] font-semibold text-sm tracking-widest uppercase font-neueplak"
              >
                (408) 899-8998
              </a>
            </div>
          </div>
        </div>
      </div>
    </DaSectionContainer>
  );
}
