import { ServiceConfig } from "./types";

export const websiteDesignConfig: ServiceConfig = {
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
      { name: 'UI/UX Design', href: '/ui-ux-design' },
      { name: 'Responsive Web Design', href: '/responsive-web-design' },
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
    ]
  }
};
