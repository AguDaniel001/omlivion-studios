import * as React from "react"

// ─── Enumerations ─────────────────────────────────────────────

/** Visual variant — controls border/fill treatment. */
export type InputVariant = "outlined" | "filled" | "underline"

/** Size variant — controls padding, height, and font size. */
export type InputSize = "sm" | "md" | "lg"

/** Status state — controls border colour and helper text colour. */
export type InputStatus = "default" | "error" | "success" | "warning"


// ─── Base Props (shared by DaInput + DaTextarea) ──────────────

export type BaseDaInputProps = {

  // ── Labelling ──────────────────────────────────────────────
  /** Visible label rendered above the field. */
  label?: string
  /** Renders a helper sentence below the field. */
  helperText?: string

  // ── Validation states ──────────────────────────────────────
  /** Error message. When set, puts the field into error state. */
  error?: string
  /** Success message. When set, puts the field into success state. */
  success?: string
  /** Warning message. When set, puts the field into warning state. */
  warning?: string

  // ── Icon slots ─────────────────────────────────────────────
  /** Leading icon — rendered inside the field, before the input. */
  prefixIcon?: React.ReactNode
  /** Trailing icon — rendered inside the field, after the input. */
  suffixIcon?: React.ReactNode

  // ── Visual configuration ───────────────────────────────────
  /** Visual style variant. Default: "outlined". */
  variant?: InputVariant
  /** Size variant. Default: "md". */
  size?: InputSize
  /** Controlled status override. Derived from error/success/warning when absent. */
  status?: InputStatus

  // ── Behaviour ──────────────────────────────────────────────
  /** Puts the field into a loading state — shows a spinner in the suffix slot. */
  loading?: boolean

  // ── Class overrides ────────────────────────────────────────
  /** Extra classes on the outermost wrapper div. */
  containerClassName?: string
  /** Extra classes applied directly to the native input / textarea element. */
  inputClassName?: string
}
