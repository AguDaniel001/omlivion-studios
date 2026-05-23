
import PageHeroSection from "@/components/sections/main/page-hero-section/PageHeroSection";
import InsightSection from "@/components/sections/main/insight/InsightSection";
import ContactInfoSection from "@/components/sections/main/contact/ContactInfoSection";

export default function InsightsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeroSection 
        overline="Our Thoughts"
        headline="Insights into the digital landscape."
        description="A collection of articles, industry trends, and team stories about design, technology, and the future of the web."
      />
      <InsightSection />
    </div>
  );
}
