/**
 * DaTypoVariants.tsx
 * ─────────────────────────────────────────────────────────────
 * Master index for all typography variants.
 * Merges display/heading scale and content/text scale into one
 * map consumed by DaTypography.
 *
 * Files
 * ─────
 * DaTypoDisplay.tsx → Display, Headline, Title
 * DaTypoText.tsx    → Body, Label, Caption, Overline, Inline
 *
 * Navigation typography is intentionally excluded.
 * Nav items are layout concerns — apply titleMd / bodySm /
 * labelMd directly in your nav components instead.
 *
 * Naming convention (Material / Flutter inspired)
 * ───────────────────────────────────────────────
 * {family}{Scale}   e.g. displayLg, headlineMd, bodyMd, labelSm
 *
 * Scale   → Lg / Md / Sm  (large to small within each family)
 * Family  → Display / Headline / Title / Body / Label /
 *           Caption / Overline / Inline
 * ─────────────────────────────────────────────────────────────
 */

import type {
  Tag,
  TextSize,
  TextWeight,
  TextLeading,
  TextColor,
  TextFont,
} from "./DaText";

import { DaTypoDisplayVariants } from "./DaTypoDisplay";
import { DaTypoTextVariants    } from "./DaTypoText";

// ─── Variant Shape ────────────────────────────────────────────

export type TypoVariantDef = {
  tag:     Tag;
  size:    TextSize;
  weight:  TextWeight;
  leading: TextLeading;
  color:   TextColor;
  font:    TextFont;
};

// ─── Master Map ───────────────────────────────────────────────

export const DaTypoVariants = {
  ...DaTypoDisplayVariants,
  ...DaTypoTextVariants,
} as const satisfies Record<string, TypoVariantDef>;

// ─── Types ────────────────────────────────────────────────────

export type TypoVariant = keyof typeof DaTypoVariants;