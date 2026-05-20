import DaText from "@/components/ui/typography/DaText";
import DaSectionContainer from "../../../layout/DaSectionContainer";
import PortfolioCard from "@/components/composite/PortfolioCard";

// 1. Define the type structure for our portfolio items
interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

// 2. Centralized configuration data for your 4 projects
const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: "karat",
    title: "Karat",
    subtitle: "Corporate Website",
    imageSrc: "/assets/images/woman-smiling.webp",
    imageAlt: "Karat Corporate Website Showcase",
  },
  {
    id: "apex",
    title: "Apex",
    subtitle: "Corporate Website",
    imageSrc: "/assets/images/fuel-pump.webp",
    imageAlt: "Apex Corporate Website Showcase",
  },
    {
    id: "pulse",
    title: "Pulse AI",
    subtitle: "SaaS Landing Page",
    imageSrc: "/assets/images/camera.webp",
    imageAlt: "Pulse AI SaaS Landing Page Showcase",
  },
  {
    id: "nova",
    title: "Nova Labs",
    subtitle: "Corporate Website",
    imageSrc: "/assets/images/robotics.webp",
    imageAlt: "Nova Labs Corporate Website Showcase",
  },

];

export default function PortfolioSection() {
  return (
    <DaSectionContainer className="min-h-screen flex flex-col items-center w-full">
      {/* Header Section */}
      <div className="flex flex-col w-full max-w-[1200px] pt-[200px] gap-3 mb-16">
        <DaText variant="headlineSm">
          Featured Work
        </DaText>
        <DaText variant="bodyMd">
          Explore some of our latest website projects.
        </DaText>
      </div>

      {/* 3. Grid Container mapping the config data */}
      <div className="w-full max-w-[1200px] mb-[215px] grid grid-cols-1 md:grid-cols-2 gap-8 space-y-30 lg:gap-12">
        {PORTFOLIO_PROJECTS.map((project, index) => (
          <PortfolioCard
            key={project.id}
            title={project.title}
            subtitle={project.subtitle}
            imageSrc={project.imageSrc}
            imageAlt={project.imageAlt}
            parallax={index % 2 !== 0}
          />
        ))}
      </div>
    </DaSectionContainer>
  );
}
