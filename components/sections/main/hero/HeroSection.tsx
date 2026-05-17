
import DaSectionContainer from "@/components/layout/DaSectionContainer";
import DaTypography from "@/components/ui/typography/DaTypography";

export default function HeroSection() {
  return (
    <div className=" items-center  justify-center">
      <DaSectionContainer className="flex min-h-screen flex-col items-center justify-center bg-dark">
        {/* Container max-width increased to better match the image's layout and line breaks */}
        <div className="w-full max-w-2xl space-y-8">
            <DaTypography variant="displayHero" color="white" >
                A digital agency focused on web.
            </DaTypography>
            <DaTypography variant="bodyLg" color="white">
            We are a creative team of designers, developers, strategists, and producers building elevated websites in the heart of Silicon Valley.
            </DaTypography>
        </div>
      </DaSectionContainer>
    </div>
  );
}
