"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CircleProps {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  strokeOpacity?: number;
  size?: string; // e.g. "130vh"
}

export const Circle = forwardRef<SVGCircleElement, CircleProps>(
  (
    {
      className,
      stroke = "#9ca3af",
      strokeWidth = 0.2,
      fill = "transparent",
      strokeOpacity = 0.1,
      size = "130vh",
    },
    ref
  ) => {
    return (
      <div 
        className={cn("pointer-events-none z-0 overflow-visible", className)}
        style={{ height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          className="h-full w-auto"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            ref={ref}
            cx="50"
            cy="50"
            r="45"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
            strokeOpacity={strokeOpacity}
          />
        </svg>
      </div>
    );
  }
);

Circle.displayName = "Circle";
