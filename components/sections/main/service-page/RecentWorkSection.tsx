"use client";

import { useRef } from "react";
import DaText from "@/components/ui/typography/DaText";
import DaSectionContainer from "../../../layout/DaSectionContainer";
import PortfolioCard from "@/components/composite/PortfolioCard";
import { usePortfolioSectionAnimation } from "@/hooks/usePortfolioSectionAnimation";


// 1. Define the type structure for our portfolio items
export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

interface RecentWorkSectionProps {
  projects?: ProjectItem[];
  title?: string;
  description?: string;
  backgroundImage?: string;
}

// 2. Centralized configuration data for your 4 projects
const DEFAULT_PROJECTS: ProjectItem[] = [
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

export default function RecentWorkSection({
  projects = DEFAULT_PROJECTS,
}: RecentWorkSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  usePortfolioSectionAnimation({
    container: containerRef,
    header: headerRef,
    title: titleRef,
    body: bodyRef,
  });

  return (
    <section data-theme="light" ref={containerRef} className="w-full bg-bg-canvas relative overflow-hidden">

      <DaSectionContainer className="min-h-screen flex flex-col items-center w-full py-0 relative z-10">
        {/* Header Section */}
        <div ref={headerRef} className="flex flex-col w-full max-w-[1200px] pt-[200px] gap-6 mb-16">
          <div className="overflow-hidden">
            <div ref={titleRef}>
                <DaText variant="headlineSm" className="mb-4">
                  Recent Work
                </DaText>
            </div>
          </div>
        </div>

        {/* 3. Grid Container mapping the projects */}
        <div className="w-full max-w-[1200px] mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 space-y-30 lg:gap-12">
          {projects.map((project, index) => (
            <PortfolioCard
              key={project.id}
              index={index}
              title={project.title}
              subtitle={project.subtitle}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
              parallax={index % 2 !== 0}
            />
          ))}
        </div>
        </DaSectionContainer>
      </section>
  );
}
