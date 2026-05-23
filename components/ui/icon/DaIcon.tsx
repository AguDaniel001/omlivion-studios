/**
 * DaIcon.tsx
 * ─────────────────────────────────────────────────────────────
 * Design-system icon component.
 * Uses custom SVG icons and text-based icons defined in 
 * DaIcon.registry.tsx.
 * ─────────────────────────────────────────────────────────────
 */

import React from "react"
import { ICON_MAP, type DaIconName } from "./DaIcon.registry"
import { ICON_SIZE_MAP, } from "./DaIcon.config"
import type { DaIconProps } from "./DaIcon.types"

// ─── Helpers ──────────────────────────────────────────────────

function resolveSize(size: DaIconProps["size"]): number {
  if (size === undefined)         return ICON_SIZE_MAP.md
  if (typeof size === "number")   return size
  return ICON_SIZE_MAP[size] ?? ICON_SIZE_MAP.md
}

// ─── Component ────────────────────────────────────────────────

export function DaIcon({
  name,
  size    = "md",
  className,
  color,
  label,
  title,
  ...props
}: DaIconProps & React.SVGProps<SVGSVGElement>) {
  const IconComponent = ICON_MAP[name as DaIconName]

  if (!IconComponent) return null

  const px = resolveSize(size)

  // ── Accessibility ──────────────────────────────────────────
  const a11y = label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true as const }

  return (
    <IconComponent
      size={px}
      className={className}
      color={color}
      // title={title}
      {...a11y}
      {...props}
    />
  )
}

export type { DaIconName } from "./DaIcon.registry"
export default DaIcon
