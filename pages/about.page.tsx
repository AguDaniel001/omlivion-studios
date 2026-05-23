
import ContactInfoSection from "@/components/sections/main/contact/ContactInfoSection";
import PageHeroSection from "@/components/sections/main/page-hero-section/PageHeroSection";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeroSection 
        overline="who we are"
        headline="A passionate team, rooted in digital."
        description="Building great things in the heart of Africa."
      />
      <ContactInfoSection />
    </div>
  );
}
