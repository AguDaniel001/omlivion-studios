import React from 'react';
import Image from 'next/image';
import DaText from '@/components/ui/typography/DaText';

export interface TestimonialData {
  id: string | number;
  logoUrl: string;
  logoAlt: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { logoUrl, logoAlt, quote, author, role, company } = testimonial;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 max-md:gap-3 py-10 max-md:py-5">
      {/* Company Logo Section */}
      <div className="flex w-full pt-2 relative h-12 max-w-[120px] md:max-w-32">
        <Image 
          src={logoUrl} 
          alt={logoAlt} 
          fill
          className="object-contain grayscale lg:-translate-x-5 opacity-90 contrast-125"
        />
      </div>

      {/* Quote and Author Section */}
      <div className="space-y-6 w-full max-w-md max-md:space-y-3">
        <DaText variant="bodyMd" color="primary" leading="relaxed">
          {quote}
        </DaText>
        
        <div className="flex gap-3 items-center lg:-translate-x-9">
          <span className="w-6 h-[1px] bg-gray-300 inline-block " aria-hidden="true" />
          <DaText variant="bodySm" color="tertiary">
            {author}, {role}, at {company}
          </DaText>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
