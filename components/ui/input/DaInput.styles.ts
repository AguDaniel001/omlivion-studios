import type { InputSize, InputStatus, InputVariant } from "./DaInput.types"

// ─── Size ─────────────────────────────────────────────────────

export const sizeStyles: Record<
  InputSize,
  { wrapper: string; fontSize: string }
> = {
  sm: {
    wrapper:  "h-9 px-3",
    fontSize: "text-sm",
  },
  md: {
    wrapper:  "h-12 px-4",
    fontSize: "text-sm",
  },
  lg: {
    wrapper:  "h-14 px-5",
    fontSize: "text-base",
  },
}

export const textareaSizeStyles: Record<InputSize, string> = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-5 py-4",
}

export const iconSizeMap: Record<InputSize, number> = {
  sm: 14,
  md: 18,
  lg: 20,
}

// ─── Variant ──────────────────────────────────────────────────

export const variantStyles: Record<InputVariant, string[]> = {
  outlined: [
    "border border-input",
    "bg-transparent",
    "focus-within:border-ring",
  ],
  filled: [
    "border border-transparent",
    "bg-[#f5f5f5]",
    "focus-within:border-gray-400",
  ],
}

// ─── Status ───────────────────────────────────────────────────

export const statusStyles: Record<
  InputStatus,
  { border: string; textColor: string; iconName: string | null }
> = {
  default: {
    border:    "",
    textColor: "text-text-tertiary",
    iconName:  null,
  },
  error: {
    border:    "border-red-500 focus-within:border-red-500",
    textColor: "text-red-500",
    iconName:  "alert-circle",
  },
  success: {
    border:    "border-green-500 focus-within:border-green-500",
    textColor: "text-green-600",
    iconName:  "check-circle",
  },
  warning: {
    border:    "border-yellow-500 focus-within:border-yellow-500",
    textColor: "text-yellow-500",
    iconName:  "alert-triangle",
  },
}
