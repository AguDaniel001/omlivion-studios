
import DaSectionContainer from "@/components/layout/DaSectionContainer";
import DaButton from "@/components/ui/buttons/DaButton";
import DaTypography from "@/components/ui/typography/DaTypography";

export default function HeroSection() {
  return (
    <div className=" items-center  justify-center">
      <DaSectionContainer className="flex min-h-screen flex-col items-center justify-center bg-dark">
        {/* Container max-width increased to better match the image's layout and line breaks */}
        <div className="w-full max-w-2xl">
            <DaTypography variant="overline" color="brand" className="pb-8"  >
                We are omlivion
            </DaTypography>
            <DaTypography className="pl-8 pb-6 " variant="displayHero" color="white" >
                A digital agency focused on web.
            </DaTypography>
            <DaTypography className="pl-8 pb-8 mt-0 w-full max-w-md" variant="bodyMd" color="white"  >
            We are a creative team of designers, developers, strategists, and producers building elevated websites in the heart of Africa.
            </DaTypography>
            
            <DaButton variant="circle-plus" className="pl-12"  >Get to know us</DaButton>
        </div>
      </DaSectionContainer>
    </div>
  );
}
