import DaSectionContainer from "../../../layout/DaSectionContainer"; // Adjust import path as necessary

export default function QuoteSection() {
  return (
    <main className="min-h-screen bg-bg-accent">
      <DaSectionContainer className="items-center justify-center">
        {/* Container max-width increased to better match the image's layout and line breaks */}
        <div className="w-full max-w-[900px] text-white flex flex-col gap-6 md:gap-10">
          
          {/* Small eyebrow text at the top */}
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase font-semibold text-white/90">
            A Digital Agency
          </p>

          {/* Main Hero Statement */}
          <h1 className="text-2xl md:text-5xl font-bold leading-snug md:leading-tight tracking-tight">
            We are a web design and development company, building websites 
            that drive traffic, engagement, and conversion for industry-leading 
            brands and startups in Silicon Valley.
            <span className="inline-block ml-1 align-middle text-xl md:text-4xl">↑</span>
          </h1>

          {/* Alternative approach using your DaTypography component if it supports custom colors/weights:
          <DaTypography variant="displayHero" className="text-white font-bold">
            We are a web design and development company...
          </DaTypography> 
          */}
          
        </div>
      </DaSectionContainer>
    </main>
  );
}