import { ServiceConfig } from "./types";

export const uiUxDesignConfig: ServiceConfig = {
  hero: {
    headline: "UI/UX Design",
    imageSrc: "/assets/images/man-working.webp",
    subheadline: "We build elevated websites, optimized for engagement and conversion.",
    description: "We pride ourselves on pushing the boundaries of digital design and development. We combine relevant trends and best practices to build platforms with longevity."
  },
  content: {
    mainContent: ` UI refers to user interface design, which includes all visual design elements in the series of web pages or screens. UX refers to user experience, which is the internal experience that a user participates in as they interact with a brand's website, product, or service. An impactful website brings together content architecture, typography, color, photos, videos, and interactive elements in order to create a meaningful user journey that ultimately aims to convert customers.

      We work as an extension of your company’s marketing team to build a website driven by intuitive UI and engaging UX. We combine best-in-class web design, sophisticated UI elements, and an intuitive path to purchase to drive user engagement and conversion. Our dedicated team of user interface designers, user experience strategists, and creative developers collaborate with you to create a website tailored to your brand’s goals and initiatives.`,

    deliverables: [
      'Interface Design',
      'Usability',
      'Interactions',
      'User Experience',
      'Accessibility',
      'Animations',
    ],
    related: [
      { name: 'Responsive Web Design', href: '/responsive-web-design' },
      { name: 'Website Development', href: '/website-development' },
      { name: 'Content Management', href: '#' },
    ]
  },
  recentWork: {
    projects: [
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
    ]
  }
};
