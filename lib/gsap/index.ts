"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export * from "./animations";

export const useGsapInit = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);
};
