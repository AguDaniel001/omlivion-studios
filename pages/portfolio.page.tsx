
import PageHeroSection from "@/components/sections/main/page-hero-section/PageHeroSection";
import PortfolioSection from "@/components/sections/main/porfolio/PortfolioSection";
import ContactInfoSection from "@/components/sections/main/contact/ContactInfoSection";

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeroSection 
        overline="Selected Work"
        headline="Showcasing digital excellence."
        description="Explore our latest projects where strategy meets creativity to deliver impactful results for our clients across the globe."
      />
      <PortfolioSection />
    </div>
  );
}
