/**
 * DaIcon.types.ts
 * ─────────────────────────────────────────────────────────────
 * Types for the DaIcon component.
 * ─────────────────────────────────────────────────────────────
 */

// ─── Named sizes ──────────────────────────────────────────────

/**
 * Named size scale — maps to pixel values in DaIcon.config.ts.
 * Mirrors the design-system spacing rhythm.
 *
 *  xs  →  12px   (inline text badges, breadcrumbs)
 *  sm  →  14px   (compact UI chrome — small buttons, dense tables)
 *  md  →  16px   (default — form fields, nav items)
 *  lg  →  20px   (card headers, section labels)
 *  xl  →  24px   (feature icons, empty states)
 *  2xl →  32px   (hero illustrations, large UI anchors)
 */
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

/** Accept either a named size or a raw pixel number. */
export type IconSizeValue = IconSize | number

// ─── Component props ──────────────────────────────────────────

export interface DaIconProps {
  /**
   * Key from the flat ICON_MAP (e.g. "search", "alert-circle").
   * TypeScript will autocomplete all registered keys.
   */
  name: string

  /**
   * Named size or raw pixel number.
   * Named sizes resolve via ICON_SIZE_MAP in DaIcon.config.ts.
   * Default: "md" (16px).
   */
  size?: IconSizeValue

  /**
   * Tailwind colour class or any className string.
   * Applied directly to the SVG element.
   */
  className?: string

  /**
   * Raw colour value passed as the `color` prop to the icon.
   * Prefer `className` with a CSS token class — use `color`
   * only when a raw value is unavoidable (e.g. canvas / charts).
   */
  color?: string

  /**
   * Accessible label for semantic icons.
   *
   * Provide this when the icon conveys meaning without
   * accompanying visible text (e.g. a standalone delete button).
   * When provided, aria-label is set and aria-hidden is omitted.
   *
   * Omit (or leave undefined) for decorative icons — those next
   * to visible text labels. When omitted, aria-hidden="true" is
   * automatically applied.
   */
  label?: string

  /**
   * SVG stroke width. Only affects outline-style icons.
   * Default: undefined (library default, usually 1.5–2).
   */
  strokeWidth?: number

  /**
   * Optional HTML title element inside the SVG.
   * Provides a tooltip in browsers and additional
   * context for screen readers when `label` is not set.
   */
  title?: string
}
