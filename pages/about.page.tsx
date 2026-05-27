// "use client";

import CtaSectionReusable from "@/components/composite/Cta";
import PageHeroSection from "@/components/sections/main/page-hero-section/PageHeroSection";
import PageImageSection from "@/components/sections/main/about/PageImageSection";
import CultureSection from "@/components/sections/main/culture/CultureSection";
import TestimonialSection from "@/components/sections/testimonial/TestimonialSection";

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
        className=" h-[110vh] "
      />
      <CultureSection />
      <CtaSectionReusable
        bgFill="dark"
        overline="A DIGITAL AGENCY"
        headline="Making great things in the heart of Silicon Valley."
        showButton={false}
        sparkVariant="spark1"
        sparkAccentColor="var(--color-primary-red)"
        sparkColor="var(--color-primary-white)"
        sparkWidth="w-28"
        showCircle={false}
        className=" h-[110vh] "
      />
      <TestimonialSection />
      <CtaSectionReusable 
        bgFill="brand"
        overline="We are omlivion"
        headline="Let’s work together to build something great."
        buttonText="Say Hello"
        buttonHref="/contact"
      />
      
    </div>
  );
}
