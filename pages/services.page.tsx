
import PageHeroSection from "@/components/sections/main/page-hero-section/PageHeroSection";
import ContactInfoSection from "@/components/sections/main/contact/ContactInfoSection";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeroSection 
        overline="What we do"
        headline="Driving brands forward online."
        description="A digital-first approach to strategy and creative."
      />
      {/* Additional sections can be added here */}
      <ContactInfoSection />
    </div>
  );
}
