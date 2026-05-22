/**
 * DaTypoVariants.tsx
 * ─────────────────────────────────────────────────────────────
 * Master index for all typography variants.
 * Merges display/heading scale and content/text scale into one
 * map consumed by DaText.
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
  TextTracking,
} from "./DaTypography";


// ─── Variant Shape ────────────────────────────────────────────

export type TypoVariantDef = {
  tag:       Tag;
  size:      TextSize;
  weight:    TextWeight;
  leading:   TextLeading;
  color:     TextColor;
  font:      TextFont;
  tracking?: TextTracking;
  uppercase?: boolean;
};

// ─── Master Map ───────────────────────────────────────────────

export const DaTypoVariants = {
  headlineLg: {
    tag:       "h1",
    size:      "6xl",
    weight:    "bold",
    leading:   "snug",
    color:     "primary",
    font:      "montserrat",
    tracking:  "inherit",
    uppercase: false,
  },

  headlineMd: {
    tag:       "h1",
    size:      "5xl",
    weight:    "bold",
    leading:   "tight",
    color:     "primary",
    font:      "montserrat",
    tracking:  "inherit",
    uppercase: false,
  },
  headlineSm: {
    tag:       "h1",
    size:      "4xl",
    weight:    "bold",
    leading:   "snug",
    color:     "primary",
    font:      "montserrat",
    tracking:  "inherit",
    uppercase: false,
  },

  titleSm: {
    tag:       "h5",
    size:      "base",
    weight:    "semibold",
    leading:   "normal",
    color:     "primary",
    font:      "neueplak",
    tracking:  "inherit",
    uppercase: true,
  },

  subTitle: {
    tag:       "h5",
    size:      "lg",
    weight:    "semibold",
    leading:   "normal",
    color:     "primary",
    font:      "montserrat",
    tracking:  "inherit",
    uppercase: false,
  },

  bodyXl: {
    tag:       "p",
    size:      "3xl",
    weight:    "bold",
    leading:   "loose",
    color:     "primary",
    font:      "montserrat",
    tracking:  "inherit",
    uppercase: false,
  },

  bodyLg: {
    tag:       "h5",
    size:      "2xl",
    weight:    "light",
    leading:   "relaxed",
    color:     "primary",
    font:      "montserrat",
    tracking:  "inherit",
    uppercase: false,
  },

  bodyMd: {
    tag:       "p",
    size:      "lg",
    weight:    "light",
    leading:   "normal",
    color:     "primary",
    font:      "neueplak",
    tracking:  "inherit",
    uppercase: false,
  },

  bodySm: {
    tag:       "p",
    size:      "base",
    weight:    "semibold",
    leading:   "normal",
    color:     "primary",
    font:      "neueplak",
    tracking:  "inherit",
    uppercase: false,
  },

  captionSm: {
    tag:       "p",
    size:      "xs",
    weight:    "light",
    leading:   "tight",
    color:     "tertiary",
    font:      "sans",
    tracking:  "inherit",
    uppercase: false,
  },

  overline: {
    tag:       "p",
    size:      "sm",
    weight:    "semibold",
    leading:   "none",
    color:     "brand",
    font:      "neueplak",
    tracking:  "megaWide",
    uppercase: true,
  },
} as const satisfies Record<string, TypoVariantDef>;

// ─── Types ────────────────────────────────────────────────────

export type TypoVariant = keyof typeof DaTypoVariants;
