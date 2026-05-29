import { ProjectItem } from "@/components/sections/main/service-page/RecentWorkSection";

export interface ServiceHeroConfig {
  headline: string;
  imageSrc: string;
  subheadline: string;
  description: string;
}

export interface RelatedService {
  name: string;
  href: string;
}

export interface ServiceMainContentConfig {
  mainContent: string;
  deliverables: string[];
  related: RelatedService[];
}

export interface ServiceRecentWorkConfig {
  projects: ProjectItem[];
}

export interface ServiceConfig {
  hero: ServiceHeroConfig;
  content: ServiceMainContentConfig;
  recentWork: ServiceRecentWorkConfig;
}
