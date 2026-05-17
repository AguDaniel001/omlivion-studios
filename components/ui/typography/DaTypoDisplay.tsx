
import type { TypoVariantDef } from "./DaTypoVariants";

export const DaTypoDisplayVariants = {

// ── DISPLAY (montserrat) ─────────────────────────────────────

displayHero: {
  tag:       "h1",
  size:      "6xl",
  weight:    "bold",
  leading:   "snug",
  color:     "primary",
  font:      "montserrat",
  tracking:  "inherit",
  uppercase: false,
},

displaySub: {
  tag:       "h2",
  size:      "4xl",
  weight:    "bold",
  leading:   "relaxed",
  color:     "primary",
  font:      "montserrat",
  tracking:  "inherit",
  uppercase: false,
},

displaySm: {
  tag:       "h2",
  size:      "3xl",
  weight:    "bold",
  leading:   "snug",
  color:     "primary",
  font:      "montserrat",
  tracking:  "inherit",
  uppercase: false,
},

// ── HEADLINES (montserrat) ──────────────────────────────────

headlineLg: {
  tag:       "h2",
  size:      "3xl",
  weight:    "bold",
  leading:   "snug",
  color:     "primary",
  font:      "montserrat",
  tracking:  "inherit",
  uppercase: false,
},

headlineMd: {
  tag:       "h3",
  size:      "2xl",
  weight:    "semibold",
  leading:   "snug",
  color:     "primary",
  font:      "montserrat",
  tracking:  "inherit",
  uppercase: false,
},

headlineSm: {
  tag:       "h4",
  size:      "xl",
  weight:    "semibold",
  leading:   "snug",
  color:     "primary",
  font:      "montserrat",
  tracking:  "inherit",
  uppercase: false,
},

// ── TITLE (UI LEVEL - MIXED SYSTEM) ─────────────────────────

titleLg: {
  tag:       "h5",
  size:      "lg",
  weight:    "semibold",
  leading:   "normal",
  color:     "primary",
  font:      "neueplak",
  tracking:  "inherit",
  uppercase: false,
},

titleMd: {
  tag:       "h6",
  size:      "base",
  weight:    "semibold",
  leading:   "normal",
  color:     "primary",
  font:      "neueplak",
  tracking:  "inherit",
  uppercase: false,
},

titleSm: {
  tag:       "h6",
  size:      "sm",
  weight:    "semibold",
  leading:   "normal",
  color:     "secondary",
  font:      "neueplak",
  tracking:  "inherit",
  uppercase: false,
},

// ── BODY (READABILITY CORE - neueplak Light) ───────────────

bodyLg: {
  tag:       "p",
  size:      "lg",   // 20px
  weight:    "light",
  leading:   "relaxed",
  color:     "primary",
  font:      "neueplak",
  tracking:  "inherit",
  uppercase: false,
},

bodyMd: {
  tag:       "p",
  size:      "base",
  weight:    "normal",
  leading:   "normal",
  color:     "secondary",
  font:      "neueplak",
  tracking:  "inherit",
  uppercase: false,
},

// ── NAV / MICRO LABELS (neueplak Narrow) ───────────────────

navLabel: {
  tag:       "p",
  size:      "xs",
  weight:    "semibold",
  leading:   "normal",
  color:     "secondary",
  font:      "neueplak",
  tracking:  "inherit",
  uppercase: false,
},

// ── CAPTIONS ────────────────────────────────────────────────

captionMd: {
  tag:       "p",
  size:      "sm",
  weight:    "light",
  leading:   "normal",
  color:     "tertiary",
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
  font:      "neueplak",
  tracking:  "inherit",
  uppercase: false,
},

// ── OVERLINE ────────────────────────────────────────────────

  overline: {
    tag:       "p",
    size:      "xs",        // 12px fixed
    weight:    "semibold",
    leading:   "none",      // 1.0 — decorative single line
    color:     "brand",     // brand colour draws the eye upward
    font:      "sans",
    tracking:  "megaWide",  // 0.25em — for dramatic display text
    uppercase: true,
  },

overlineSm: {
  tag:       "p",
  size:      "xs",
  weight:    "semibold",
  leading:   "tight",
  color:     "tertiary",
  font:      "neueplak",
  tracking:  "inherit",
  uppercase: false,
},

// ── LEGACY / EDITORIAL OPTION ───────────────────────────────

// serifQuote: {
//   tag:     "p",
//   size:    "lg",
//   weight:  "normal",
//   leading: "relaxed",
//   color:   "primary",
//   font:    "Times New Roman, serif",
// },

} as const satisfies Record<string, TypoVariantDef>;