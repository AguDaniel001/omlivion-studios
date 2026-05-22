"use client";

import { useRef } from "react";
import DaText from "@/components/ui/typography/DaText";
import DaSectionContainer from "../../../layout/DaSectionContainer";
import InsightCard from "@/components/composite/InsightCard";
import DaButton from "@/components/ui/buttons/DaButton";
import { usePortfolioSectionAnimation } from "@/hooks/usePortfolioSectionAnimation";

// 1. Define the type structure for our portfolio items
interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

// 2. Centralized configuration data for your 4 projects
const   INSIGHTS: ProjectItem[] = [
  {
    id: "karat",
    title: "web & digital design",
    subtitle: "Building a Thriving Partnership with Your Digital Agency",
    imageSrc: "/assets/images/pattern1.png",
    imageAlt: "Karat Corporate Website Showcase",
  },
  {
    id: "apex",
    title: "web & digital design",
    subtitle: " The Modern Web Playbook: Launching a SaaS Site That Resonates, Delivers, & Sets Your Brand Apart",
    imageSrc: "/assets/images/pattern2.png",
    imageAlt: "Apex Corporate Website Showcase",
  },
    {
    id: "pulse",
    title: "seo & digital marketing",
    subtitle: " Designing High-Intent Journeys: Conversion Rate Optimization for Modern B2B Brands",
    imageSrc: "/assets/images/pattern3.png",
    imageAlt: "Pulse AI SaaS Landing Page Showcase",
  },
  {
    id: "nova",
    title: "web & digital design",
    subtitle: "Designing High-Intent Journeys: Conversion Rate Optimization for Modern B2B Brands",
    imageSrc: "/assets/images/pattern4.png",
    imageAlt: "Nova Labs Corporate Website Showcase",
  },

];

export default function InsightSection() {
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
    <section data-theme="light" ref={containerRef} className="w-full bg-white relative">
      <DaSectionContainer className="min-h-screen flex flex-col items-center w-full py-0">
        {/* Header Section */}

        <div ref={headerRef} className="flex flex-col w-full max-w-[1200px] pt-[200px] gap-3 mb-16">
          <div className="overflow-hidden">
            <div ref={titleRef}>
              <DaText variant="headlineSm">
                Latest Insight
              </DaText>
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={bodyRef}>
              <DaText variant="bodyMd">
                Our thoughts and perspectives on digital.
              </DaText>
            </div>
          </div>
        </div>

        {/* 3. Grid Container mapping the config data */}
        <div className="w-full max-w-[1200px] mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 space-y-30 lg:gap-12">
          { INSIGHTS.map((project, index) => (
            <InsightCard
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

        <div className="mb-50">
          <DaButton variant="circle-plus" className=" text-text-primary">
            View more insights
          </DaButton>
        </div>
        
        </DaSectionContainer>
      </section>
  );
}
