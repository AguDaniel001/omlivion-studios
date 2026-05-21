"use client";

import React from "react";
import { cn } from "@/lib/utils";

type SparkVariant = "cloud" | "sparkAfrica" | "spark1" | "spark2";

interface SparkProps {
  variant?: SparkVariant;
  className?: string;
  accentColor?: string;
}

const SPARKAFRICA_POINTS = [
  // Top row
  { x: 40, y: 10 }, { x: 50, y: 10 }, { x: 60, y: 10 }, { x: 70, y: 10 },
  // 2nd row
  { x: 30, y: 20 }, { x: 40, y: 20 }, { x: 50, y: 20 }, { x: 60, y: 20 }, { x: 70, y: 20 }, { x: 80, y: 20 },
  // 3rd row
  { x: 20, y: 30 }, { x: 30, y: 30 }, { x: 40, y: 30 }, { x: 50, y: 30 }, { x: 60, y: 30 }, { x: 70, y: 30 }, { x: 80, y: 30 }, { x: 90, y: 30 },
  // 4th row
  { x: 10, y: 40 }, { x: 20, y: 40 }, { x: 30, y: 40 }, { x: 40, y: 40 }, { x: 50, y: 40 }, { x: 60, y: 40 }, { x: 70, y: 40 }, { x: 80, y: 40 },
  // 5th row
  { x: 30, y: 50 }, { x: 40, y: 50 }, { x: 50, y: 50 }, { x: 60, y: 50 }, { x: 70, y: 50 },
  // 6th row
  { x: 40, y: 60 }, { x: 50, y: 60 }, { x: 60, y: 60 }, { x: 70, y: 60 },
  // 7th row
  { x: 45, y: 70 }, { x: 55, y: 70 }, { x: 65, y: 70 },
  // 8th row
  { x: 50, y: 80 }, { x: 60, y: 80 },
  // 9th row
  { x: 55, y: 90 },
];

const CLOUD_POINTS = [
  { x: 20, y: 20 }, { x: 40, y: 15 }, { x: 60, y: 25 }, { x: 80, y: 10 },
  { x: 15, y: 45 }, { x: 35, y: 55 }, { x: 55, y: 40 }, { x: 75, y: 50 },
  { x: 25, y: 75 }, { x: 45, y: 85 }, { x: 65, y: 70 }, { x: 85, y: 80 },
  { x: 30, y: 35 }, { x: 50, y: 65 }, { x: 70, y: 35 },
];

// Corresponds to image_8d7db2.png (Strict 10-unit grid alignment)
const SPARK1_POINTS = [
  // Row 1
  { x: 40, y: 20 }, { x: 50, y: 20 },
  // Row 2 (with red accent at index 2)
  { x: 40, y: 30 }, { x: 50, y: 30 }, { x: 60, y: 30 },
  // Row 3
  { x: 50, y: 40 }, { x: 60, y: 40 }, { x: 70, y: 40 },
  // Row 4
  { x: 40, y: 50 }, { x: 60, y: 50 },
  // Row 5
  { x: 30, y: 60 },
  // Row 6
  { x: 30, y: 70 },
];

// Corresponds to image_8dd029.png (Strict 10-unit grid alignment)
const SPARK2_POINTS = [
  // Row 1
  { x: 50, y: 20 },
  // Row 2
  { x: 50, y: 30 }, { x: 60, y: 30 },
  // Row 3
  { x: 50, y: 40 }, { x: 70, y: 40 },
  // Row 4 (with red accent at index 6)
  { x: 40, y: 50 }, { x: 60, y: 50 }, { x: 70, y: 50 },
  // Row 5
  { x: 70, y: 60 },
];

export const Spark: React.FC<SparkProps> = ({
  variant = "cloud",
  className,
  accentColor = "#f84525", // Default from CSS --color-primary-red
}) => {
  const points = React.useMemo(() => {
    switch (variant) {
      case "sparkAfrica": return SPARKAFRICA_POINTS;
      case "spark1": return SPARK1_POINTS;
      case "spark2": return SPARK2_POINTS;
      default: return CLOUD_POINTS;
    }
  }, [variant]);

  const accentIndex = React.useMemo(() => {
    if (variant === "spark1") {
      return 2; // Matches { x: 40, y: 30 } (The red crosshair)
    }
    if (variant === "spark2") {
      return 6; // Matches { x: 60, y: 50 } (The red crosshair)
    }
    return Math.floor(points.length / 2);
  }, [variant, points.length]);

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("w-32 h-32 overflow-visible", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {points.map((point, index) => (
        <g 
          key={index} 
          className="spark-point"
          transform={`translate(${point.x - 2}, ${point.y - 2})`}
        >
          <path
            d="M2 0V4M0 2H4"
            stroke={index === accentIndex ? accentColor : "currentColor"}
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
};