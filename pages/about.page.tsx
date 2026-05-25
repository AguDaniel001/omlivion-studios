"use client";

import CtaSectionReusable from "@/components/composite/Cta";
import PageHeroSection from "@/components/sections/main/page-hero-section/PageHeroSection";
import PageImageSection from "@/components/sections/main/about/PageImageSection";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeroSection 
        overline="who we are"
        headline="A passionate team, rooted in digital."
        description="Building great things in the heart of Africa."
      />
      <PageImageSection 
        src="/assets/images/glass-office.webp" 
        alt="Workers in an office"
      />
      <CtaSectionReusable
        bgFill="white"
        overline="A DIGITAL AGENCY"
        headline="Building great websites for industry-leading brands."
        buttonText="Our Work"
        buttonHref="/portfolio"
        className=" h-[120px] "
      />
      
    </div>
  );
}
