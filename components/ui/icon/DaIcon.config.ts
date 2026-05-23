/**
 * DaIcon.config.ts
 * ─────────────────────────────────────────────────────────────
 * Static configuration for the DaIcon component.
 * No React imports — pure data.
 * ─────────────────────────────────────────────────────────────
 */

import type { IconSize } from "./DaIcon.types"

// ─── Named size → pixel map ───────────────────────────────────

/**
 * Resolves a named IconSize to its pixel equivalent.
 * Mirrors the DaText size scale and the input system's
 * iconSizeMap in DaInput.styles.ts.
 *
 * Keep in sync with DaInput.styles.ts → iconSizeMap if you
 * change values here.
 */
export const ICON_SIZE_MAP: Record<IconSize, number> = {
  xs:  12,
  sm:  14,
  md:  16,
  lg:  20,
  xl:  24,
  "2xl": 32,
}

// ─── Fallback behaviour ───────────────────────────────────────

/**
 * Controls what happens when an unknown icon name is requested.
 *
 * "warn"   → logs a console.warn in development, renders nothing
 * "error"  → throws an error in development, renders nothing
 * "silent" → renders nothing, no noise (use in production)
 *
 * Recommended: "warn" in dev, "silent" in prod.
 * Wire to your env flag in DaIcon.tsx if needed.
 */
export type IconFallbackMode = "warn" | "error" | "silent"

// export const ICON_FALLBACK_MODE: IconFallbackMode =
//   import.meta.env.PROD ? "silent" : "warn";
