"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const isPointerTarget = (element: HTMLElement | null) => {
  while (element && element !== document.documentElement) {
    const cursor = window.getComputedStyle(element).cursor;
    if (cursor === "pointer") return true;
    element = element.parentElement;
  }
  return false;
};

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      width: 43,
      height: 43,
      backgroundColor: "transparent",
      borderColor: "rgba(148, 163, 184, 0.23)",
      borderWidth: 1,
      borderStyle: "solid",
      transform: "translate3d(0, 0, 0)",
    });

    // FOLLOW MOVEMENTS WITH SMOOTH EASING //

    const moveX = gsap.quickTo(cursor, "x", {
      duration: 0.56,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(cursor, "y", {
      duration: 0.56,
      ease: "power3.out",
    });

    const onMouseMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const magneticTarget = target?.closest("[data-magnetic]");

      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;

        // Magnetically snap towards center with a small offset for feel
        moveX(centerX + dx * 0.1);
        moveY(centerY + dy * 0.1);
      } else {
        moveX(event.clientX);
        moveY(event.clientY);
      }
    };

    const animateHoverIn = () => {
      gsap.to(cursor, {
        duration: 0.28,
        ease: "power3.out",
        width: 80,
        height: 80,
        backgroundColor: "rgba(148, 163, 184, 0.09)",
        borderWidth: 0,
        borderColor: "transparent",
      });
    };

    const animateHoverOut = () => {
      gsap.to(cursor, {
        duration: 0.28,
        ease: "power3.out",
        width: 43,
        height: 43,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "rgba(148, 163, 184, 0.23)",
      });
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (isPointerTarget(target)) {
        animateHoverIn();
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (isPointerTarget(target)) {
        animateHoverOut();
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, true);
    window.addEventListener("pointerout", onPointerOut, true);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointerover", onPointerOver, true);
      window.removeEventListener("pointerout", onPointerOut, true);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none select-none"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 43,
        height: 43,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        willChange: "transform, width, height, background-color, border-color",
      }}
    >
      <span
        className="block rounded-full"
        style={{
          width: 4,
          height: 4,
          backgroundColor: "#fb7185",
        }}
      />
    </div>
  );
}
