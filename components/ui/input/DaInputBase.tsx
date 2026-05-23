/**
 * DaInputBase.tsx
 * ─────────────────────────────────────────────────────────────
 * Layout shell shared by DaInput and DaTextarea.
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import type { BaseDaInputProps, InputStatus, InputSize } from "./DaInput.types"
import { variantStyles, statusStyles, sizeStyles, textareaSizeStyles, iconSizeMap } from "./DaInput.styles"
import DaText from "../typography/DaText"
import DaIcon from "../icon/DaIcon"
import clsx from "clsx"

// ─── Sub-components (Internal) ───────────────────────────────

function DaInputLabel({ inputId, label, required }: { inputId: string; label: string; required?: boolean }) {
  return (
    <div className="flex items-center gap-1 mb-2">
      <DaText tag="label" variant="bodySm" font="neueplak" htmlFor={inputId} color="primary" className="uppercase tracking-widest text-[10px] font-bold">
        {label}
      </DaText>
      {required && <span aria-hidden="true" className="text-red-500 text-sm leading-none">*</span>}
    </div>
  )
}

function DaInputTrailing({ size, status, loading }: { size: InputSize; status: InputStatus; loading?: boolean }) {
  const { iconName } = statusStyles[status]
  const iconSize = iconSizeMap[size]

  if (!loading && !iconName) return null

  return (
    <div className="flex items-center shrink-0 pr-3">
      {loading ? (
        <DaIcon name="loader" size={iconSize} className="text-text-tertiary animate-spin" />
      ) : (
        <DaIcon name={iconName!} size={iconSize} className={statusStyles[status].textColor} />
      )}
    </div>
  )
}

function DaInputFeedback({ inputId, status, feedbackMsg }: { inputId: string; status: InputStatus; feedbackMsg?: string }) {
  if (!feedbackMsg) return null
  const { textColor } = statusStyles[status]

  return (
    <DaText id={`${inputId}-desc`} tag="p" variant="captionSm" className={clsx("mt-1.5 flex items-center gap-1", textColor)}>
      {feedbackMsg}
    </DaText>
  )
}

// ─── Main Component ──────────────────────────────────────────

type Props = BaseDaInputProps & {
  id?:          string
  required?:    boolean
  disabled?:    boolean
  readOnly?:    boolean
  multiline?:   boolean
  children:     React.ReactNode
}

export function DaInputBase({
  label,
  helperText,
  error,
  success,
  warning,
  variant       = "outlined",
  size          = "md",
  status:       statusProp,
  loading,
  containerClassName,
  required,
  disabled,
  readOnly,
  multiline,
  children,
  id,
}: Props) {
  const inputId = id ?? React.useId()

  const status: InputStatus =
    statusProp ??
    (error   ? "error"   :
     success ? "success" :
     warning ? "warning" : "default")

  const feedbackMsg = error ?? success ?? warning ?? helperText

  return (
    <div className={cn("flex flex-col w-full", containerClassName)}>
      {label && <DaInputLabel inputId={inputId} label={label} required={required} />}

      <div
        className={cn(
          "relative flex items-stretch overflow-hidden transition-all duration-200",
          variantStyles[variant],
          status !== "default" && statusStyles[status].border,
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        )}
      >
        <div className={clsx("flex flex-1 items-center", multiline ? textareaSizeStyles[size] : sizeStyles[size].wrapper, "gap-3")}>
          {children}
        </div>

        <DaInputTrailing size={size} status={status} loading={loading} />
      </div>

      <DaInputFeedback inputId={inputId} status={status} feedbackMsg={feedbackMsg} />
    </div>
  )
}
