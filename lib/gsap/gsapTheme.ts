"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  useEffect(() => {
    const navbar = document.querySelector(".navbar");

    ScrollTrigger.create({
      trigger: ".light-section",
      start: "top top",
      end: "bottom top",

    //   onEnter: () => {
    //     navbar.classList.remove("dark");
    //     navbar.classList.add("light");
    //   },

    //   onLeaveBack: () => {
    //     navbar.classList.remove("light");
    //     navbar.classList.add("dark");
    //   },
    });
  }, []);

  return null;
}