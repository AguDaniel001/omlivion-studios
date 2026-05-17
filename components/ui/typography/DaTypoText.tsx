/**
 * DaTypoText.tsx
 * ─────────────────────────────────────────────────────────────
 * Content-scale variants: Body, Label, Caption, Overline, Inline.
 * These handle all readable copy and UI chrome text.
 *
 * Weight rules
 * ────────────
 * Body    → normal       reading weight, never bold
 * Label   → medium       UI chrome needs a touch more weight
 *                        than body to read at small sizes
 * Caption → normal       small and quiet, weight would make it
 *                        visually compete with body copy
 * Overline→ semibold     needs weight to compensate for tiny size
 *
 * Leading rules
 * ─────────────
 * relaxed (1.625) → bodyLg    long-form reading, maximum comfort
 * normal  (1.5)   → bodyMd/Sm standard reading rhythm
 * tight   (1.2)   → labels    single-line UI elements need tight
 *                             leading — extra space looks broken
 * normal  (1.5)   → caption   short runs, normal is fine
 * none    (1.0)   → overline  single decorative line, flush
 * ─────────────────────────────────────────────────────────────
 */

import type { TypoVariantDef } from "./DaTypoVariants";

export const DaTypoTextVariants = {

  // ── Body ─────────────────────────────────────────────────────
  // Readable paragraph text. Optimised for sustained reading.
  // Never bold — weight variations belong in Label, not Body.

  bodyLg: {
    tag:       "p",
    size:      "md",        // 16→18px fluid
    weight:    "normal",
    leading:   "relaxed",   // 1.625 — most comfortable for long reads
    color:     "primary",
    font:      "sans",
    tracking:  "inherit",
    uppercase: false,
  },

  bodyMd: {
    tag:       "p",
    size:      "base",      // 16px fixed
    weight:    "normal",
    leading:   "normal",    // 1.5
    color:     "primary",
    font:      "sans",
    tracking:  "inherit",
    uppercase: false,
  },

  bodySm: {
    tag:       "p",
    size:      "sm",        // 14px fixed
    weight:    "normal",
    leading:   "normal",
    color:     "secondary", // quieter than primary — supporting copy
    font:      "sans",
    tracking:  "inherit",
    uppercase: false,
  },


  // ── Label ────────────────────────────────────────────────────
  // Short single-line UI text. Buttons, form field labels,
  // badge text, tab labels, menu items.
  // Medium weight — heavier than body so it reads at small sizes.
  // Tight leading — labels live in constrained UI spaces.

  labelLg: {
    tag:       "p",
    size:      "base",      // 16px fixed
    weight:    "medium",
    leading:   "tight",     // 1.2 — single-line UI elements
    color:     "primary",
    font:      "sans",
    tracking:  "inherit",
    uppercase: false,
  },

  labelMd: {
    tag:       "p",
    size:      "sm",        // 14px fixed
    weight:    "medium",
    leading:   "tight",
    color:     "secondary",
    font:      "sans",
    tracking:  "inherit",
    uppercase: false,
  },

  labelSm: {
    tag:       "p",
    size:      "xs",        // 12px fixed
    weight:    "medium",
    leading:   "tight",
    color:     "secondary",
    font:      "sans",
    tracking:  "inherit",
    uppercase: false,
  },


  // ── Caption ──────────────────────────────────────────────────
  // Micro UI text. Timestamps, image captions, footnotes,
  // helper text below form fields.

  caption: {
    tag:       "p",
    size:      "xs",        // 12px fixed
    weight:    "normal",
    leading:   "normal",    // 1.5 — may wrap to 2 lines
    color:     "tertiary",  // quietest text in the system
    font:      "sans",
    tracking:  "inherit",
    uppercase: false,
  },


  // ── Overline ─────────────────────────────────────────────────
  // Tiny all-caps category label, always sitting above a heading.
  // Semibold to compensate for its tiny size.
  // Apply `uppercase tracking-widest` via className.

  overline: {
    tag:       "p",
    size:      "xs",        // 12px fixed
    weight:    "semibold",
    leading:   "none",      // 1.0 — decorative single line
    color:     "brand",     // brand colour draws the eye upward
    font:      "sans",
    tracking:  "widest",
    uppercase: true,
  },


  // ── Inline ───────────────────────────────────────────────────
  // Pass-through span. Inherits all parent styles.
  // Used only to apply a colour to a run of text inside a
  // paragraph without changing size, weight, or leading.

  inline: {
    tag:       "span",
    size:      "inherit",
    weight:    "inherit",
    leading:   "inherit",
    color:     "brand",
    font:      "inherit",
    tracking:  "inherit",
    uppercase: false,
  },

  inlineAccent: {
    tag:       "span",
    size:      "inherit",
    weight:    "inherit",
    leading:   "inherit",
    color:     "accent",
    font:      "inherit",
    tracking:  "inherit",
    uppercase: false,
  },

} as const satisfies Record<string, TypoVariantDef>;
