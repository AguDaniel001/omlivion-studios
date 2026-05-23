import React from 'react';
import DaSectionContainer from '@/components/layout/DaSectionContainer';
import DaText from '@/components/ui/typography/DaText';

// 1. Define the type structure for our contact items
interface ContactItem {
  id: string;
  title: string;
  // Using an array of strings makes multi-line descriptions (like office addresses) 
  // clean and infinitely scalable without breaking the UI layout.
  description: string[]; 
  linkText: string;
  linkHref: string;
}

// 2. Centralized configuration data matching your reference style
const CONTACT_INFOS: ContactItem[] = [
  {
    id: "lets-talk",
    title: "Let's Talk",
    description: ["Tell us about your next project."],
    linkText: "hello@omlivion.com",
    linkHref: "mailto:hello@omlivion.com",
  },
  {
    id: "say-hello",
    title: "Say Hello",
    description: ["Drop us a line or give us a call."],
    linkText: "hello@omlivion.com",
    linkHref: "mailto:hello@omlivion.com",
  },
  {
    id: "our-office",
    title: "Our Office",
    description: [
      "75 E Santa Clara St, Ste 1425",
      "San Jose, California 95113"
    ],
    linkText: "(408) 899-8998",
    linkHref: "tel:+2347012891057",
  },
];

export default function ContactInfoSection() {
  return (
    <DaSectionContainer dataTheme="light" className="bg-[#f5f5f5] py-40">
      <div className="max-w-7xl mx-auto w-full relative">
        
        {/* 3. Clean Grid Container mapping the config data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-4">
          {CONTACT_INFOS.map((item) => (
            <ContactInfoCard 
              key={item.id} 
              item={item} 
            />
          ))}
        </div>

      </div>
    </DaSectionContainer>
  );
}

{/* 4. Small, focused sub-component keeping the main loop readable */}
function ContactInfoCard({ item }: { item: ContactItem }) {
  return (
    <div className="flex flex-col w-full max-w-[300px] h-full gap-5 justify-between ">
      <div>
        <DaText variant="titleMd" className='!text-[30px]' color="primary">
          {item.title}
        </DaText>
        
        <div>
          {item.description.map((line, index) => (
            <DaText key={index} variant="bodyMd" color="secondary">
              {line}
            </DaText>
          ))}
        </div>
      </div>

      <div>
        <a 
          href={item.linkHref} 
          className="text-[#ff5a36] hover:text-[#e04e2e] transition-colors inline-block pb-1 border-b border-[#ff5a36] font-bold text-sm tracking-widest uppercase font-neueplak"
        >
          {item.linkText}
        </a>
      </div>
    </div>
  );
}