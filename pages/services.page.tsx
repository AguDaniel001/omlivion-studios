import PageHeroSection from "@/components/sections/main/page-hero-section/PageHeroSection";
import PageImageSection from "@/components/sections/main/about/PageImageSection";
import ServiceListSection from "@/components/sections/main/service-list/ServiceListSection";
import BrandSection from "@/components/sections/main/brands/BrandSection";
import SplitScrollSection from "@/components/sections/content-step/SplitScrollSection";
import { PartnerSection } from "@/components/sections/Partner/PartnerSection";
import CtaSection from "@/components/sections/main/cta/CtaSection";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeroSection
        overline="What we do"
        headline="Driving brands forward online."
        description="A digital-first approach to strategy and creative."
      />
      <PageImageSection alt="Services" src="/assets/images/workers.webp" />
      <ServiceListSection />
      <BrandSection />
      <SplitScrollSection />
      <PartnerSection />
      <CtaSection />
    </div>
  );
}
