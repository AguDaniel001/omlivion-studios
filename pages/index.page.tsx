
import HeroSection from "@/components/sections/main/hero/HeroSection";
import InsightSection from "@/components/sections/main/insight/InsightSection";
import PortfolioSection from "@/components/sections/main/porfolio/PortfolioSection";
import QuoteSection from "@/components/sections/main/quote/QuoteSection";

export default function Hero() {
  return (
    <div className="flex flex-col min-h-screen  ">
        <HeroSection />
        <PortfolioSection />
        <QuoteSection />
        <InsightSection />
    </div>
  );
}
