import DaText from "@/components/ui/typography/DaText";
import DaSectionContainer from "../../../layout/DaSectionContainer";

export default function QuoteSection() {
  return (
    <main className="min-h-screen bg-bg-accent flex items-center justify-center">
      <DaSectionContainer className=" w-full max-w-[1100px] flex flex-col ">

        <DaText variant="overline" color="white" className="pb-10">
          A Digital Agency
        </DaText>
        <DaText variant="bodyLg" color="white" className=" pl-8">
          We are a web design and development company, building websites 
          that drive traffic, engagement, and conversion for industry-leading 
          brands and startups in Africa.
        </DaText> 
         
      </DaSectionContainer>
    </main>
  );
}