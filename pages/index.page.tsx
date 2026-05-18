
import HeroSection from "@/components/sections/main/hero/HeroSection";
import QuoteSection from "@/components/sections/main/quote/QuoteSection";

export default function Hero() {
  return (
    <div className="flex flex-col min-h-screen  ">
        <HeroSection />
        <QuoteSection />
    </div>
  );
}
