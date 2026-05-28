
import ServiceContentSection from "@/components/sections/main/service-page/ServiceContentSection";
import ServiceHeroSection from "@/components/sections/main/service-page/ServiceHeroSection";

export default function servicePages() {
  return (
    <div className="flex flex-col min-h-screen  ">
      <ServiceHeroSection />
      <ServiceContentSection />
    </div>
  );
}
