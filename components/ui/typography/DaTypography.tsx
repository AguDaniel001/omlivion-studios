import { DaTypoVariants, type TypoVariant } from "./DaTypoVariants";
import DaText, { type Tag, type TextColor } from "./DaText";

// ─── Props ────────────────────────────────────────────────────

type DaTypographyProps = {
  /** Named variant from the design system. Default: bodyMd. */
  variant?:   TypoVariant;

  /** Override the HTML element without changing visual style. */
  tag?:       Tag;

  /** Override the variant's default color role. */
  color?:     TextColor;

  /** Additional Tailwind classes (layout, spacing, etc.). */
  className?: string;

  children:   React.ReactNode;
} & Omit<
  React.ComponentPropsWithoutRef<typeof DaText>,
  "size" | "weight" | "leading" | "font" | "tag"
>;

// ─── Component ────────────────────────────────────────────────

export default function DaTypography({
  variant   = "bodyMd",
  tag,
  color,
  className,
  children,
  ...props
}: DaTypographyProps) {
  // Safe extraction fallback to prevent 'Cannot read properties of undefined'
  const v = DaTypoVariants[variant] ?? DaTypoVariants["bodyMd"];

  // Absolute safety check just in case "bodyMd" itself is missing in DaTypoVariants
  if (!v) {
    console.error(`DaTypography: The variant "${variant}" (and fallback "bodyMd") was not found.`);
    return null;
  }

  return (
    <DaText
      tag={tag ?? v.tag}
      size={v.size}
      weight={v.weight}
      leading={v.leading}
      font={v.font}
      color={color ?? v.color}
      className={className}
      {...props}
    >
      {children}
    </DaText>
  );
}