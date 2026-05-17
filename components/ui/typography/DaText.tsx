/**
 * DaText.tsx
 * ─────────────────────────────────────────────────────────────
 * Primitive text renderer. Owns the raw style maps for size,
 * weight, color, font-family, and line-height.
 *
 *     Use DaTypography for all named variants (headings, body,
 *     labels, etc.). Use DaText only when you need one-off
 *     overrides outside the variant system.
 *
 * Naming conventions
 * ──────────────────
 * Size keys   → numeric scale, matches CSS token names
 * Weight keys → CSS font-weight names (Flutter: w100–w900)
 * Color keys  → semantic roles, mirrors CSS token roles
 * Font keys   → family name, no duplication (inter ≠ default)
 * Leading keys→ descriptive scale (none → loose)
 * ─────────────────────────────────────────────────────────────
 */

import clsx from "clsx";

// ─── Style Maps ──────────────────────────────────────────────

export const textStyles = {

  /**
   * SIZE
   * Responsive fluid scale. Each step maps to a design token
   * size. Breakpoints follow mobile-first: default → md → lg → xl.
   *
   * Rules:
   *  - xs / sm / base are fixed — they are UI chrome sizes, not
   *    headings. Never scale these; they should always read at
   *    exactly one size regardless of viewport.
   *  - Every fluid step must have a unique ceiling. No two keys
   *    may resolve to the same px value at the same breakpoint.
   *  - Each breakpoint step should increase by ≥ 2px to be
   *    visually distinguishable.
   *
   *  xs   →  12px        (fixed)
   *  sm   →  14px        (fixed)
   *  base →  16px        (fixed)
   *  md   →  16 → 18px
   *  lg   →  16 → 20px
   *  xl   →  18 → 22px   ← unique ceiling, distinct from lg
   *  2xl  →  20 → 24px
   *  3xl  →  22 → 32px
   *  4xl  →  28 → 48px   ← xl step added (was missing)
   *  5xl  →  36 → 56px
   *  6xl  →  36 → 64px   ← lg/xl separated (was stalling at 46px)
   */
  size: {
    inherit: "text-inherit",
    xs:      "text-xs",                                                            //  12px (fixed)
    sm:      "text-sm",                                                            //  14px (fixed)
    base:    "text-base",                                                          //  16px (fixed)
    md:      "text-base lg:text-[18px]",                                           //  16 → 18px
    lg:      "text-base lg:text-[20px]",                                           //  16 → 20px
    xl:      "text-[18px] md:text-[20px] lg:text-[22px]",                         //  18 → 22px
    "2xl":   "text-xl md:text-[22px] lg:text-[24px]",                             //  20 → 24px
    "3xl":   "text-[22px] md:text-[26px] lg:text-[28px] xl:text-[32px]",         //  22 → 32px
    "4xl":   "text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px]",         //  28 → 48px
    "5xl":   "text-[36px] md:text-[44px] lg:text-[56px]",                         //  36 → 56px
    "6xl":   "text-[36px] md:text-[46px] lg:text-[54px] xl:text-[64px]",         //  36 → 64px
  },

  /**
   * WEIGHT
   * Maps directly to CSS font-weight values.
   * Flutter equivalent: FontWeight.w100–w900.
   */
  weight: {
    inherit:    "font-inherit",
    thin:       "font-thin",        // w100
    extralight: "font-extralight",  // w200
    light:      "font-light",       // w300
    normal:     "font-normal",      // w400
    medium:     "font-medium",      // w500
    semibold:   "font-semibold",    // w600
    bold:       "font-bold",        // w700
    extrabold:  "font-extrabold",   // w800
    black:      "font-black",       // w900
  },

  /**
   * COLOR
   * Semantic roles — mirrors the CSS token names in main.css.
   * Never use raw grey steps here; use role names so dark mode
   * overrides work automatically via CSS variables.
   *
   * Role mapping:
   *   primary    → --color-text-primary    (headings, body)
   *   secondary  → --color-text-secondary  (labels, captions)
   *   tertiary   → --color-text-tertiary   (hints, metadata)
   *   disabled   → --color-text-disabled
   *   inverse    → --color-text-inverse    (text on dark fills)
   *   brand      → --color-text-brand      (brand-coloured copy)
   *   accent     → --color-text-accent     (accent-coloured copy)
   *   onBrand    → --color-text-on-brand   (text on brand fill)
   *   onAccent   → --color-text-on-accent  (text on accent bg)
   *   link       → --color-text-link
   *   white      → always white (use sparingly)
   *   inherit    → falls through to parent
   */
  color: {
    inherit:   "",
    primary:   "text-text-primary",
    secondary: "text-text-secondary",
    tertiary:  "text-text-tertiary",
    disabled:  "text-text-disabled",
    inverse:   "text-text-inverse",
    brand:     "text-text-brand",
    accent:    "text-text-accent",
    onBrand:   "text-text-on-brand",
    onAccent:  "text-text-on-accent",
    link:      "text-text-link hover:text-text-link-hover",
    white:     "text-white",
  },

  /**
   * FONT FAMILY
   * Each key maps to a single font. Italic is a separate
   * boolean prop on DaText, not baked into the font key.
   */
  font: {
    inherit: "",
    sans:    "font-sans",     // Inter — default brand font
    roboto:  "font-roboto",
    ancola:  "font-ancola",
    manrope: "font-manrope",
    neueplak: "font-neueplak",
    montserrat: "font-montserrat",
  },

  /**
   * LINE HEIGHT
   * Named scale. Values match design tokens & CSS leading-*.
   *
   *  none    → 1.0  (single-line display text)
   *  tight   → 1.2  (large headings)
   *  snug    → 1.4  (card headers, subheadings)
   *  normal  → 1.5  (body copy — browser default)
   *  relaxed → 1.625
   *  loose   → 2.0
   */
  leading: {
    inherit:  "leading-inherit",
    none:     "leading-none",      // 1.0
    tight:    "leading-[1.2]",     // 1.2
    snug:     "leading-[1.4]",     // 1.4
    normal:   "leading-normal",    // 1.5
    relaxed:  "leading-relaxed",   // 1.625
    loose:    "leading-loose",     // 2.0
  },

  /**
   * TRACKING (Letter Spacing)
   * Named scale for letter-spacing / tracking.
   */
  tracking: {
    inherit:   "",
    tight:     "tracking-tight",
    normal:    "tracking-normal",
    wide:      "tracking-wide",
    wider:     "tracking-wider",
    widest:    "tracking-widest",
  },

} as const;

// ─── Types ────────────────────────────────────────────────────

export type Tag        = React.ElementType;
export type TextSize   = keyof typeof textStyles.size;
export type TextWeight = keyof typeof textStyles.weight;
export type TextColor  = keyof typeof textStyles.color;
export type TextFont   = keyof typeof textStyles.font;
export type TextLeading = keyof typeof textStyles.leading;
export type TextTracking = keyof typeof textStyles.tracking;

type TextProps<T extends Tag = "p"> = {
  tag?:        T;
  size?:       TextSize;
  weight?:     TextWeight;
  color?:      TextColor;
  font?:       TextFont;
  leading?:    TextLeading;
  tracking?:   TextTracking;
  italic?:     boolean;
  uppercase?:  boolean;
  align?:      "left" | "center" | "right" | "justify";
  truncate?:   boolean;
  className?:  string;
  children:    React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

// ─── Component ────────────────────────────────────────────────

export default function DaText<T extends Tag = "p">({
  tag,
  size      = "base",
  weight    = "normal",
  color     = "primary",
  font      = "sans",
  leading   = "normal",
  tracking  = "inherit",
  italic    = false,
  uppercase = false,
  align     = "left",
  truncate  = false,
  className,
  children,
  ...props
}: TextProps<T>) {
  const Tag = tag ?? "p";

  return (
    <Tag
      className={clsx(
        textStyles.size[size],
        textStyles.weight[weight],
        textStyles.color[color],
        textStyles.font[font],
        textStyles.leading[leading],
        textStyles.tracking[tracking],
        italic   && "italic",
        uppercase && "uppercase",
        truncate && "truncate",
        align === "left"    && "text-left",
        align === "center"  && "text-center",
        align === "right"   && "text-right",
        align === "justify" && "text-justify",
        "smooth-transition [&>div]:smooth-transition",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}