"use client";

import { useRef } from "react";
import Image from "next/image";
import { usePageImageAnimation } from "@/hooks/usePageImageAnimation";

interface PageImageSectionProps {
  src: string;
  alt: string;
}

export default function PageImageSection({ src, alt }: PageImageSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  usePageImageAnimation({
    container: containerRef,
    mask: maskRef,
    image: imageRef,
  });

  return (
    <section data-theme="light" ref={containerRef} className="relative h-screen w-full overflow-hidden bg-white">
      <div 
        ref={maskRef} 
        className="relative h-full w-full overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent calc(var(--mask-percent, 0) * 1%), black calc(var(--mask-percent, 0) * 1%))',
          maskImage: 'linear-gradient(to right, transparent calc(var(--mask-percent, 0) * 1%), black calc(var(--mask-percent, 0) * 1%))',
        } as React.CSSProperties}
      >
        <div className="relative h-[115%] w-full">
          <Image
            ref={imageRef}
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </section>
  );
}
