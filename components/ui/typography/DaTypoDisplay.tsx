
import type { TypoVariantDef } from "./DaTypoVariants";

export const DaTypoDisplayVariants = {

// ── DISPLAY (montserrat) ─────────────────────────────────────

displayHero: {
  tag:     "h1",
  size:    "6xl",
  weight:  "bold",
  leading: "snug",
  color:   "primary",
  font:    "ancola",
},

displaySub: {
  tag:     "h2",
  size:    "4xl",
  weight:  "bold",
  leading: "relaxed",
  color:   "primary",
  font:    "montserrat",
},

displaySm: {
  tag:     "h2",
  size:    "3xl",
  weight:  "bold",
  leading: "snug",
  color:   "primary",
  font:    "montserrat",
},

// ── HEADLINES (montserrat) ──────────────────────────────────

headlineLg: {
  tag:     "h2",
  size:    "3xl",
  weight:  "bold",
  leading: "snug",
  color:   "primary",
  font:    "montserrat",
},

headlineMd: {
  tag:     "h3",
  size:    "2xl",
  weight:  "semibold",
  leading: "snug",
  color:   "primary",
  font:    "montserrat",
},

headlineSm: {
  tag:     "h4",
  size:    "xl",
  weight:  "semibold",
  leading: "snug",
  color:   "primary",
  font:    "montserrat",
},

// ── TITLE (UI LEVEL - MIXED SYSTEM) ─────────────────────────

titleLg: {
  tag:     "h5",
  size:    "lg",
  weight:  "semibold",
  leading: "normal",
  color:   "primary",
  font:    "neueplak",
},

titleMd: {
  tag:     "h6",
  size:    "base",
  weight:  "semibold",
  leading: "normal",
  color:   "primary",
  font:    "neueplak",
},

titleSm: {
  tag:     "h6",
  size:    "sm",
  weight:  "semibold",
  leading: "normal",
  color:   "secondary",
  font:    "neueplak",
},

// ── BODY (READABILITY CORE - neueplak Light) ───────────────

bodyLg: {
  tag:     "p",
  size:    "lg",   // 20px
  weight:  "light",
  leading: "relaxed",
  color:   "primary",
  font:    "neueplak",
},

bodyMd: {
  tag:     "p",
  size:    "base",
  weight:  "normal",
  leading: "normal",
  color:   "secondary",
  font:    "neueplak",
},

// ── NAV / MICRO LABELS (neueplak Narrow) ───────────────────

navLabel: {
  tag:     "p",
  size:    "xs",
  weight:  "semibold",
  leading: "normal",
  color:   "secondary",
  font:    "neueplak",
},

// ── CAPTIONS ────────────────────────────────────────────────

captionMd: {
  tag:     "p",
  size:    "sm",
  weight:  "light",
  leading: "normal",
  color:   "tertiary",
  font:    "neueplak",
},

captionSm: {
  tag:     "p",
  size:    "xs",
  weight:  "light",
  leading: "tight",
  color:   "tertiary",
  font:    "neueplak",
},

// ── OVERLINE ────────────────────────────────────────────────

overlineSm: {
  tag:     "p",
  size:    "xs",
  weight:  "semibold",
  leading: "tight",
  color:   "tertiary",
  font:    "neueplak",
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