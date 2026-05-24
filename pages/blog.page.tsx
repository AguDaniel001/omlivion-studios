
import BlogInsightsHeroSection from "@/components/sections/blog/BlogInsightsHero";
import BlogListSection from "@/components/sections/blog/BlogList";
import { Circle } from "@/components/ui/Circle";

export default function BlogPage() {
  return (
    <div className="flex relative flex-col min-h-screen">
      <Circle size="120vh" className="absolute z-10 -top-46  right-0" />
      <BlogInsightsHeroSection />
      <BlogListSection />
    </div>
  );
}
