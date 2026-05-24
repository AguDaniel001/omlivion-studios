
import PageHeroSection from "@/components/sections/main/page-hero-section/PageHeroSection";
import PageImageSection from "@/components/sections/main/about/PageImageSection";
import ServiceList from "@/components/sections/main/service-list/ServiceList";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeroSection
        overline="What we do"
        headline="Driving brands forward online."
        description="A digital-first approach to strategy and creative."
      />
      {/* Additional sections can be added here */}
      <PageImageSection alt="Services" src="/assets/images/workers.webp" />
      <ServiceList />
    </div>
  );
}
