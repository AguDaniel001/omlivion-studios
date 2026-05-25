import { DaTypoVariants, type TypoVariant } from "./DaTypoVariants";
import DaTypography, { type Tag, type TextColor, type TextTracking } from "./DaTypography";

// ─── Props ────────────────────────────────────────────────────

type DaTextProps = {
  /** Named variant from the design system. Default: bodyMd. */
  variant?:   TypoVariant;

  /** Override the HTML element without changing visual style. */
  tag?:       Tag;

  /** Override the variant's default color role. */
  color?:     TextColor;

  /** Override the variant's default font weight. */
  // weight?:    TextWeight;

  /** Override letter spacing. */
  tracking?:  TextTracking;

  /** Force uppercase text. */
  uppercase?: boolean;

  /** Additional Tailwind classes (layout, spacing, etc.). */
  className?: string;

  children:   React.ReactNode;
} & Omit<
  React.ComponentPropsWithoutRef<typeof DaTypography>,
  "size" | "weight" | "leading" | "font" | "tag" | "tracking" | "uppercase"
>;

// ─── Component ────────────────────────────────────────────────

export default function DaText({
  variant   = "bodyMd",
  tag,
  color,
  weight,
  tracking,
  uppercase,
  leading,
  className,
  children,
  ...props
}: DaTextProps) {
  // Safe extraction fallback to prevent 'Cannot read properties of undefined'
  const v = DaTypoVariants[variant] ?? DaTypoVariants["bodyMd"];

  // Absolute safety check just in case "bodyMd" itself is missing in DaTypoVariants
  if (!v) {
    console.error(`DaText: The variant "${variant}" (and fallback "bodyMd") was not found.`);
    return null;
  }

  return (
    <DaTypography
      tag={tag ?? v.tag}
      size={v.size}
      weight={weight ?? v.weight}
      leading={v.leading}
      font={v.font}
      color={color ?? v.color}
      tracking={tracking ?? v.tracking ?? "inherit"}
      uppercase={uppercase ?? v.uppercase ?? false}
      className={className}
      {...props}
    >
      {children}
    </DaTypography>
  );
}
