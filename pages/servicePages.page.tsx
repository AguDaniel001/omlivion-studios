
import CtaSection from "@/components/composite/Cta";
import RecentWorkSection, { ProjectItem } from "@/components/sections/main/service-page/RecentWorkSection";
import ServiceContentSection from "@/components/sections/main/service-page/ServiceContentSection";
import ServiceHeroSection from "@/components/sections/main/service-page/ServiceHeroSection";

// Configuration for services
const SERVICES_CONFIG = {
  webDesign: {
    hero: {
      headline: "Website Design",
      imageSrc: "/assets/images/woman-thinking.webp",
      subheadline: "We design high-end marketing websites for ambitious brands.",
      description: "Our dedicated team of graphic designers and digital designers hone in on your brand vision to develop an impactful visual language for your online presence."
    },
    content: {
      mainContent: `We align our web design agency with industry-leading global brands and forward-thinking startups to design great digital experiences on the web. Our purpose is to create impactful marketing websites, with web designs optimized to drive traffic, engagement, and conversion for businesses across various industries. With a design-driven, strategy-led approach, our creative team hones in on your brand vision in order to guide the overall look and feel of your website.

In the design execution phase of a website project, our goal is to leverage elevated visuals with clear purpose and intent. We do this by developing an improved user flow and navigation system, followed by a round of visual explorations in order to determine a clear design direction. We ensure that your redesigned website translates seamlessly across desktop, tablet, and mobile devices by creating a flexible visual language.`,
      deliverables: [
        'Moodboards',
        'Site Architecture',
        'Wireframes',
        'Visual Concepts',
        'User Interface',
        'User Experience',
      ],
      related: [
        { name: 'UI/UX Design', href: '#' },
        { name: 'Responsive Web Design', href: '#' },
        { name: 'Content Strategy', href: '#' },
      ]
    },
    recentWork: {
      projects: [
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
      ] as ProjectItem[]
    }
  }
};

export default function servicePages() {
  const config = SERVICES_CONFIG.webDesign;

  return (
    <div className="flex flex-col min-h-screen  ">
      <ServiceHeroSection 
        headline={config.hero.headline}
        imageSrc={config.hero.imageSrc}
        subheadline={config.hero.subheadline}
        description={config.hero.description}
      />
      <ServiceContentSection 
        content={config.content.mainContent}
        servicesList={config.content.deliverables}
        relatedServices={config.content.related}
      />
      <RecentWorkSection 
        projects={config.recentWork.projects}
      />
      <CtaSection />
    </div>
  );
}
