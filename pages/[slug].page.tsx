import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import CtaSection from "@/components/composite/Cta";
import RecentWorkSection from "@/components/sections/main/service-page/RecentWorkSection";
import ServiceContentSection from "@/components/sections/main/service-page/ServiceContentSection";
import ServiceHeroSection from "@/components/sections/main/service-page/ServiceHeroSection";
import { SERVICES_CONFIG, ServiceConfig } from "@/content/services";

export default function ServicePage({ serviceData }: { serviceData: ServiceConfig }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!serviceData) {
    return <div className="min-h-screen flex items-center justify-center">Service not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ServiceHeroSection 
        headline={serviceData.hero.headline}
        imageSrc={serviceData.hero.imageSrc}
        subheadline={serviceData.hero.subheadline}
        description={serviceData.hero.description}
      />
      <ServiceContentSection 
        content={serviceData.content.mainContent}
        servicesList={serviceData.content.deliverables}
        relatedServices={serviceData.content.related}
      />
      <RecentWorkSection 
        projects={serviceData.recentWork.projects}
      />
      <CtaSection />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(SERVICES_CONFIG).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const serviceData = SERVICES_CONFIG[slug];

  if (!serviceData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      serviceData,
    },
  };
}
