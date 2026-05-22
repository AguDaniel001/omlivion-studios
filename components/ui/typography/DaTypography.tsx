import clsx from "clsx";

export const textStyles = {

  size: {
    inherit: "text-inherit",
    xs:      "text-xs",                                                       //  12px (fixed)
    sm:      "text-sm",                                                       //  14px (fixed)
    base:    "text-base",                                                     //  16px (fixed)
    md:      "text-base lg:text-[18px]",                                      //  16 → 18px
    lg:      "text-base lg:text-[20px]",                                      //  16 → 20px
    xl:      "text-[18px] md:text-[20px] lg:text-[22px]",                     //  18 → 22px
    "2xl":   "text-xl md:text-[22px] lg:text-[26px]",                         //  20 → 26px
    "3xl":   "text-[22px] md:text-[26px] lg:text-[28px] xl:text-[36px]",      //  22 → 36px
    "4xl":   "text-[28px] md:text-[36px] lg:text-[42px] xl:text-[54px]",      //  28 → 54px
    "5xl":   "text-[36px] md:text-[44px] lg:text-[75px]",                     //  36 → 67px
    "6xl":   "text-[36px] md:text-[46px] lg:text-[54px] xl:text-[80px]",      //  36 → 80px
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
    megaWide:  "tracking-mega-wide", // 0.25em — for dramatic display text
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

export type DaTypographyProps<T extends Tag = "p"> = {
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

export default function DaTypography<T extends Tag = "p">({
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
}: DaTypographyProps<T>) {
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
