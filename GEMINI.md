# Gemini CLI Quota Minimization Rules

You are working under a strict daily token and API request quota. You must adhere to the following execution constraints to preserve resources:

## 1. Loop and Execution Limits
* **No Autopilot Prototyping**: Never execute multi-step iterative loops or self-correction rounds without explicit permission.
* **Ask Before Action**: Propose exactly one tool execution or shell command at a time. Wait for a user `[Y/N]` approval confirmation before proceeding.

## 2. Context Windows & Reading Limits
* **Targeted File Access**: Do not view entire directories or perform large codebase text sweeps. Explicitly ask me for files or paths if needed.
* **Snippets Only**: When inspecting local project files, read only the target block or function line-range. Do not load the complete source text.

## 3. Dense Token Optimization
* **Terse Outputs**: Provide brief, direct technical responses. Omit conversational filler, long code explanations, and verbose pleasantries.
* **Drafting First**: Show code modifications as minimal unified diff blocks (`+` and `-` lines) instead of printing entire rewrites of complete files.







# GSAP Animation Cheatsheet for Next.js + Tailwind
> **For AI assistants:** This document is written so that even if a user describes animations in plain, non-technical language ("make it slide in from the left", "fade out slowly", "bounce when clicked"), you can map their intent to the correct GSAP pattern. Terminology aliases and intent signals are included throughout.

---

## 1. What is GSAP?

GSAP (GreenSock Animation Platform) is a JavaScript library for animating **anything on a webpage** — elements, CSS properties, SVG paths, scroll position, canvas, etc.

- It works with React/Next.js, but requires special handling because Next.js uses **server-side rendering (SSR)** — GSAP must only run in the browser.
- Tailwind handles **static styles**. GSAP handles **motion** — they don't conflict; use Tailwind for layout/appearance, GSAP for movement.

---

## 2. Installation

```bash
npm install gsap
```

For ScrollTrigger (scroll-based animations):
```bash
# Already included in gsap package — just import it
```

---

## 3. Next.js Setup Rules (Critical)

GSAP touches the DOM. Next.js renders on the server first where there is no DOM. **Always run GSAP inside `useEffect` or `useLayoutEffect`.**

### The Golden Rule
```tsx
"use client"; // Required in Next.js App Router — GSAP is client-only

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MyComponent() {
  const boxRef = useRef(null); // useRef = a way to grab a real DOM element

  useEffect(() => {
    // ✅ Safe: runs only in the browser, after the element exists
    gsap.to(boxRef.current, { x: 100, duration: 1 });
  }, []);

  return <div ref={boxRef} className="w-16 h-16 bg-blue-500" />;
}
```

### useEffect vs useLayoutEffect
| Hook | Use When |
|------|----------|
| `useEffect` | Most animations — fires after paint |
| `useLayoutEffect` | Animations that must run before the user sees the initial render (prevents flicker) |

> **AI intent signal:** If the user says "it flickers before animating" → switch to `useLayoutEffect`.

---

## 4. Core GSAP Methods

### `gsap.to()` — Animate TO a state
> Plain language: "Move it from where it is NOW to here."

```tsx
gsap.to(".box", {
  x: 200,       // move right 200px
  opacity: 0,   // fade out
  duration: 1,  // over 1 second
  ease: "power2.out",
});
```

### `gsap.from()` — Animate FROM a state
> Plain language: "Start it looking like THIS, then animate to its natural/normal state."

```tsx
gsap.from(".box", {
  y: -50,      // starts 50px above its natural position
  opacity: 0,  // starts invisible
  duration: 0.8,
});
```

### `gsap.fromTo()` — Define both start and end
> Plain language: "I want full control — start HERE, end THERE."

```tsx
gsap.fromTo(
  ".box",
  { x: -100, opacity: 0 },   // FROM
  { x: 0, opacity: 1, duration: 1 } // TO
);
```

### `gsap.set()` — Instant, no animation
> Plain language: "Just put it there immediately, no animation."

```tsx
gsap.set(".box", { x: 0, opacity: 1 });
```

---

## 5. Targeting Elements in React

### Method 1: `useRef` (Recommended for single elements)
```tsx
const cardRef = useRef(null);
gsap.to(cardRef.current, { scale: 1.1 });
```

### Method 2: `useRef` on a container + querySelectorAll (for multiple children)
```tsx
const containerRef = useRef(null);

useEffect(() => {
  const items = containerRef.current.querySelectorAll(".item");
  gsap.from(items, { opacity: 0, y: 30, stagger: 0.1 });
}, []);

return (
  <div ref={containerRef}>
    <div className="item">One</div>
    <div className="item">Two</div>
    <div className="item">Three</div>
  </div>
);
```

### Method 3: gsap.utils.selector (Scoped to a container)
```tsx
const el = gsap.utils.selector(containerRef);
gsap.to(el(".card"), { x: 100 }); // only targets .card inside containerRef
```

> **AI intent signal:** If the user says "animate all the cards" or "each item one by one" → use querySelectorAll + stagger.

---

## 6. Common Animation Properties

### Position / Transform
| Property | What it does | Plain language equivalent |
|----------|-------------|--------------------------|
| `x` | Move horizontally (px) | "slide left/right" |
| `y` | Move vertically (px) | "slide up/down" |
| `rotation` | Rotate in degrees | "spin it", "rotate" |
| `scale` | Scale uniformly | "grow/shrink" |
| `scaleX` / `scaleY` | Scale one axis | "stretch wide", "squish tall" |
| `skewX` / `skewY` | Skew/shear | "lean it" |
| `xPercent` / `yPercent` | Move by % of element size | "slide out of view" |

### Appearance
| Property | What it does |
|----------|-------------|
| `opacity` | 0 = invisible, 1 = fully visible |
| `backgroundColor` | Animate color changes |
| `color` | Text color |
| `borderRadius` | Round the corners |
| `width` / `height` | Size changes |
| `clipPath` | Reveal/hide with a clipping mask |

### GSAP-specific
| Property | What it does |
|----------|-------------|
| `duration` | How long (seconds) |
| `delay` | Wait before starting (seconds) |
| `ease` | The feel of the motion (see section 7) |
| `stagger` | Delay between each item in a group |
| `repeat` | How many times (-1 = forever) |
| `yoyo` | Reverse on repeat (ping-pong) |
| `paused` | Start paused, trigger manually |
| `onComplete` | Callback when done |
| `onStart` | Callback when starts |
| `onUpdate` | Callback every frame |

---

## 7. Easing — The "Feel" of Motion

> Plain language → ease mapping for AI:

| User says... | GSAP ease to use |
|-------------|-----------------|
| "smooth", "natural" | `"power2.out"` |
| "snappy", "quick stop" | `"power3.out"` |
| "slow start, fast end" | `"power2.in"` |
| "slow at both ends" | `"power2.inOut"` |
| "bouncy", "springy" | `"back.out(1.7)"` or `"elastic.out(1, 0.3)"` |
| "bounce at the end" | `"bounce.out"` |
| "like a rubber band" | `"elastic.out(1, 0.3)"` |
| "linear", "robotic", "constant speed" | `"none"` or `"linear"` |
| "ease in" / "starts slow" | `"power2.in"` |
| "ease out" / "ends slow" | `"power2.out"` |
| "cinematic" | `"expo.out"` |
| "mechanical click" | `"steps(5)"` |

```tsx
gsap.to(".card", { y: 0, ease: "back.out(1.7)", duration: 0.6 });
```

Visualize all eases: https://gsap.com/docs/v3/Eases

---

## 8. Timelines — Sequencing Multiple Animations

> Plain language: "I want things to happen one after another" or "play these in order."

```tsx
const tl = gsap.timeline();

tl.from(".title", { y: -30, opacity: 0, duration: 0.5 })
  .from(".subtitle", { y: 20, opacity: 0, duration: 0.4 }) // starts after title
  .from(".button", { scale: 0, duration: 0.3, ease: "back.out(2)" }); // then this
```

### Timeline Position Parameter (Overlap / Offset)
```tsx
tl.from(".a", { x: -100, duration: 1 })
  .from(".b", { x: 100, duration: 1 }, "-=0.5")  // starts 0.5s BEFORE .a ends
  .from(".c", { y: 50, duration: 1 }, "+=0.2")   // starts 0.2s AFTER .b ends
  .from(".d", { opacity: 0 }, "<")               // starts AT THE SAME TIME as .c
  .from(".e", { opacity: 0 }, "<0.2")            // starts 0.2s after .c started
  .from(".f", { opacity: 0 }, "myLabel")         // starts at a named label
```

> **AI intent signal:**
> - "at the same time" → `"<"`
> - "a little before it finishes" → `"-=0.3"`
> - "right after" → default (no position param)

### Labels in Timelines
```tsx
tl.addLabel("intro")
  .from(".title", { opacity: 0 })
  .addLabel("content")
  .from(".body", { y: 20, opacity: 0 });

// Jump to a label:
tl.play("content");
```

---

## 9. ScrollTrigger — Animate on Scroll

> Plain language: "animate when the user scrolls to it", "reveal on scroll", "pin while scrolling", "parallax effect."

### Setup (register once, globally)
```tsx
// In a layout or _app component, or at top of useEffect:
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

### Basic Scroll-Triggered Animation
```tsx
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".card", {
    opacity: 0,
    y: 60,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".card",   // what element triggers it
      start: "top 80%",   // when top of .card hits 80% from top of viewport
      end: "bottom 20%",  // when does it end
      toggleActions: "play none none none", // play once
    },
  });
}, []);
```

### `start` and `end` values
Format: `"[element edge] [viewport edge]"`
- `"top 80%"` = when the top of the trigger hits 80% down the viewport
- `"top center"` = when top of trigger hits the center
- `"bottom top"` = when bottom of trigger reaches the top of viewport

### `toggleActions` — What happens on scroll events
Format: `"onEnter onLeave onEnterBack onLeaveBack"`
```
"play none none none"     → play once, never reverse
"play reverse play reverse" → animate in and out as you scroll
"play pause resume reset"   → complex scroll interactivity
```

> **AI intent signal → toggleActions mapping:**
> - "play once" → `"play none none none"`
> - "animate in AND out as I scroll" → `"play reverse play reverse"`
> - "restart every time I scroll past it" → `"restart none none none"`

### Scrub — Tie animation to scroll position
```tsx
scrollTrigger: {
  trigger: ".hero",
  start: "top top",
  end: "bottom top",
  scrub: true,      // animation progress = scroll progress (1:1)
  scrub: 1,         // scrub with 1s lag/smoothing
}
```

> Plain language: "scrub" = the animation moves exactly as you scroll, like dragging it.

### Pin — Stick an element while scrolling
```tsx
scrollTrigger: {
  trigger: ".section",
  start: "top top",
  end: "+=500",    // pin for 500px of scroll
  pin: true,
}
```

> Plain language: "keep it on screen while I scroll past it."

### Parallax Effect
```tsx
gsap.to(".bg-image", {
  yPercent: -30, // moves up 30% of its height
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});
```

---

## 10. Stagger — Animating Groups

> Plain language: "animate each one after the other", "cascade", "wave effect."

```tsx
// Simple stagger
gsap.from(".item", {
  opacity: 0,
  y: 20,
  stagger: 0.1, // 0.1s delay between each
});

// Advanced stagger
gsap.from(".grid-item", {
  opacity: 0,
  scale: 0.8,
  stagger: {
    amount: 1,          // total time for all staggers
    from: "center",     // start from center ("start", "end", "center", "edges", "random", index number)
    grid: "auto",       // for grid layouts — staggers in 2D
    ease: "power2.inOut",
  },
});
```

> **AI intent signal → stagger `from` mapping:**
> - "start from the middle" → `from: "center"`
> - "random order" → `from: "random"`
> - "from the edges in" → `from: "edges"`

---

## 11. Hover / Click Animations (Event-Based)

### Hover with React
```tsx
const cardRef = useRef(null);

const handleMouseEnter = () => {
  gsap.to(cardRef.current, { scale: 1.05, duration: 0.3, ease: "power2.out" });
};

const handleMouseLeave = () => {
  gsap.to(cardRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
};

return (
  <div
    ref={cardRef}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    className="cursor-pointer p-6 bg-white rounded-xl shadow"
  >
    Hover me
  </div>
);
```

### Click to Toggle
```tsx
const isOpen = useRef(false);
const panelRef = useRef(null);

const toggle = () => {
  if (isOpen.current) {
    gsap.to(panelRef.current, { height: 0, opacity: 0, duration: 0.4 });
  } else {
    gsap.to(panelRef.current, { height: "auto", opacity: 1, duration: 0.4 });
  }
  isOpen.current = !isOpen.current;
};
```

---

## 12. Page Transitions in Next.js

### App Router (Next.js 13+)
```tsx
// components/PageTransition.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.from(pageRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  return <div ref={pageRef}>{children}</div>;
}
```

Wrap your `layout.tsx` children with it:
```tsx
// app/layout.tsx
<PageTransition>{children}</PageTransition>
```

---

## 13. Cleanup — Preventing Memory Leaks

> In React, always clean up GSAP animations and ScrollTriggers when a component unmounts.

### Kill a specific animation
```tsx
useEffect(() => {
  const anim = gsap.to(".box", { x: 100, duration: 1 });
  return () => anim.kill(); // cleanup
}, []);
```

### Kill all ScrollTriggers
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".item", { opacity: 0, y: 30 });
    // all animations created inside ctx are auto-cleaned
  }, containerRef);

  return () => ctx.revert(); // ✅ cleans everything up
}, []);
```

> **Best practice:** Always use `gsap.context()` in React — it scopes and auto-cleans all animations.

### Full Pattern with gsap.context
```tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".title", { opacity: 0, y: 40, duration: 0.6 });
      gsap.from(".card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef); // scope to this ref

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <section ref={sectionRef} className="py-20">
      <h2 className="title text-4xl font-bold">Hello</h2>
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
    </section>
  );
}
```

---

## 14. GSAP + Tailwind: How They Work Together

Tailwind = static styles applied at build time.
GSAP = dynamic transforms applied at runtime via JavaScript.

### ✅ Do: Use Tailwind for layout/appearance, GSAP for motion
```tsx
<div
  ref={boxRef}
  className="w-20 h-20 bg-blue-500 rounded-lg" // Tailwind: appearance
  // GSAP handles: x, y, opacity, scale, rotation
/>
```

### ⚠️ Conflict Warning: opacity / transform
Tailwind classes like `opacity-0`, `translate-x-4` set inline styles on elements. If GSAP also animates `opacity` or `x`, they may conflict.

**Rule:** Don't use Tailwind transition/animation classes on elements GSAP is controlling. Let GSAP own the motion.

```tsx
// ❌ Bad — Tailwind transition conflicts with GSAP
<div className="transition-all duration-300 opacity-0" ref={ref} />

// ✅ Good — GSAP controls motion, Tailwind controls appearance
<div className="bg-blue-500 rounded-xl p-4" ref={ref} />
```

### Using Tailwind for initial hidden state
Instead of `opacity-0` (which Tailwind makes with a class), use `gsap.set()`:
```tsx
useEffect(() => {
  gsap.set(ref.current, { opacity: 0, y: 30 }); // set initial state
  gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
}, []);
```

---

## 15. Plugin Reference

| Plugin | What it does | Register call |
|--------|-------------|--------------|
| `ScrollTrigger` | Animate on scroll, pin, scrub | `gsap.registerPlugin(ScrollTrigger)` |
| `ScrollToPlugin` | Smooth scroll to element/position | `gsap.registerPlugin(ScrollToPlugin)` |
| `TextPlugin` | Animate text content character by character | `gsap.registerPlugin(TextPlugin)` |
| `Draggable` | Make elements draggable | `gsap.registerPlugin(Draggable)` |
| `Flip` | Animate layout changes smoothly (FLIP technique) | `gsap.registerPlugin(Flip)` |
| `MotionPathPlugin` | Animate along an SVG path | `gsap.registerPlugin(MotionPathPlugin)` |
| `Observer` | Advanced scroll/touch/pointer tracking | `gsap.registerPlugin(Observer)` |

All free plugins are included in the `gsap` npm package.

---

## 16. Intent → Pattern Reference (AI Quick Map)

| User says... | Pattern to use |
|-------------|---------------|
| "fade in when page loads" | `gsap.from(ref, { opacity: 0 })` in useEffect |
| "slide in from left/right/top/bottom" | `gsap.from(ref, { x: -100 })` / `y: -100` etc. |
| "animate one after the other" | Timeline `.from().from().from()` |
| "at the same time" | Timeline with `"<"` position |
| "reveal on scroll" | `scrollTrigger: { trigger, start, toggleActions }` |
| "stays on screen while scrolling" | `scrollTrigger: { pin: true }` |
| "moves with scroll" | `scrollTrigger: { scrub: true }` |
| "parallax" | `gsap.to(bg, { yPercent: -30, scrollTrigger: { scrub: true } })` |
| "hover effect" | `onMouseEnter/Leave` → `gsap.to()` |
| "bounce when it appears" | `ease: "back.out(1.7)"` or `"elastic.out"` |
| "loop forever" | `repeat: -1` |
| "ping-pong / back and forth" | `repeat: -1, yoyo: true` |
| "wave/cascade through items" | `stagger: 0.1` |
| "flip/card turn" | `rotationY: 180` |
| "text types itself out" | `TextPlugin` + `gsap.to(el, { text: "..." })` |
| "page enter animation" | Wrap page in component, `gsap.from` in `useEffect` |
| "something flickers on load" | Switch to `useLayoutEffect` |

---

## 17. Best Practices Summary

1. **Always use `"use client"`** — GSAP is browser-only, not server-renderable.
2. **Always run GSAP in `useEffect` or `useLayoutEffect`** — never at module level.
3. **Always clean up with `gsap.context().revert()`** — prevents memory leaks.
4. **Use `useRef` to target DOM elements** — not `document.querySelector` in React.
5. **Register plugins once** — at the top of the file or in a shared `gsap-config.ts`.
6. **Don't mix Tailwind transitions with GSAP** on the same element.
7. **Use timelines for sequences** — not multiple `gsap.to()` calls with manual delays.
8. **Use `gsap.set()` for instant initial states** — not CSS/Tailwind hidden classes.
9. **For scroll animations, always kill ScrollTriggers on unmount** via `ctx.revert()`.
10. **Test on mobile** — `ScrollTrigger` behaves differently with touch scrolling.

---

## 18. Starter File Template

```tsx
// components/AnimatedHero.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-title", { y: 40, opacity: 0, duration: 0.7, ease: "power3.out" })
        .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-cta", { scale: 0.8, opacity: 0, duration: 0.4, ease: "back.out(2)" }, "-=0.2");

      gsap.from(".feature-card", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 75%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="hero-title text-6xl font-bold">Hello World</h1>
        <p className="hero-subtitle text-xl text-gray-500 mt-4">Something great.</p>
        <button className="hero-cta mt-8 px-6 py-3 bg-blue-600 text-white rounded-full">
          Get Started
        </button>
      </section>

      <section className="features-section py-20 grid grid-cols-3 gap-6 px-12">
        <div className="feature-card p-6 bg-white rounded-2xl shadow">Feature 1</div>
        <div className="feature-card p-6 bg-white rounded-2xl shadow">Feature 2</div>
        <div className="feature-card p-6 bg-white rounded-2xl shadow">Feature 3</div>
      </section>
    </div>
  );
}
```

---

*Generated for AI assistant consumption. Covers Next.js App Router (13+), GSAP 3.x, and Tailwind CSS v3/v4.*

