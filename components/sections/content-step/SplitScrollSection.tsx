import { Circle } from '@/components/ui/Circle';
import { Spark } from '@/components/ui/Spark';
import React from 'react';

// Define the structure for our content blocks
interface ContentStep {
  number: string;
  title: string;
  text: string;
}

const stepsData: ContentStep[] = [
  {
    number: "01",
    title: "Discover",
    text: "Our goal is to fully understand each client's business and the environment in which it operates. We look to completely understand the target audience and how they will interact with the digital products we deliver."
  },
  {
    number: "02",
    title: "Strategize",
    text: "Our planning process turns research into a clear set of action items to meet business goals. We take this information to build the blueprint to drive more traffic and convert web visitors into web leads."
  },
  {
    number: "03",
    title: "Execute",
    text: "With a clear blueprint in hand, we shift into production. We design immersive digital experiences and back them with clean, scalable code to ensure peak performance across all devices."
  },
  {
    number: "04",
    title: "Launch",
    text: "During the Implementation, our job is to translate creative into a full program that goes live. Implementation often includes an array of services, which can include design, development and search marketing."
  },
  {
    number: "05",
    title: "Evolve",
    text: "Last but not least, our task is to use scientific metrics to track and analyze campaign performance. This helps us easily identify what worked and what did not, we then initiate new strategies to maximize your business goals."
  },
];

export const SplitScrollSection: React.FC = () => {
  return (
    <section className=" relative bg-bg-dark text-white min-h-screen w-full px-4 py-16 md:py-24">
       <Circle size="120vh" className="absolute  -left-1/6" />
      <Spark variant="spark1" className="w-28 h-28 absolute left-1/3 top-1/3 z-10 pointer-events-none" />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row relative gap-12 md:gap-8">
        
        {/* Left Column - Fixed/Sticky Header */}
        {/*   USE DASECTIONHEADER HERE */}
        <div className="md:w-1/2 md:sticky md:top-24 h-fit pr-0 md:pr-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Design-driven.<br />Strategy-led.
          </h1>
        </div>

        {/* Right Column - Scrollable Content */}
        <div className="md:w-1/2 flex flex-col gap-24 md:gap-32 pl-0 md:pl-8">
          {stepsData.map((step) => (
            <article key={step.number} className="max-w-md">
              <h2 className="text-3xl font-bold mb-4 tracking-tight">
                {step.number} {step.title}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {step.text}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SplitScrollSection;