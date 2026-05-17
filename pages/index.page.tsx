
import DaSectionContainer from "@/components/layout/DaSectionContainer";
import HeroSection from "@/components/sections/main/hero/HeroSection";
import QuoteSection from "@/components/sections/main/quote/QuoteSection";
import DaTypography from "@/components/ui/typography/DaTypography";

export default function Hero() {
  return (
    <div className="flex flex-col min-h-screen  ">
        <HeroSection />
        <QuoteSection />
    </div>
  );
}
