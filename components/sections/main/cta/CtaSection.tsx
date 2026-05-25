"use client";

import CtaSectionReusable from "@/components/composite/Cta";

export default function CtaSection() {
  return (
    <CtaSectionReusable 
      bgFill="dark"
      overline="We are omlivion"
      headline="Let’s work together to build something great."
      buttonText="Say Hello"
      buttonHref="/contact"
    />
  );
}

