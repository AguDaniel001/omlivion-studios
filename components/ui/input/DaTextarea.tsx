/**
 * DaTextarea.tsx
 * ─────────────────────────────────────────────────────────────
 * Multi-line text input. Built on DaInputBase.
 */

import * as React from "react"
import clsx from "clsx"
import { DaInputBase } from "./DaInputBase"
import type { BaseDaInputProps } from "./DaInput.types"

// ─── Props ────────────────────────────────────────────────────

export type DaTextareaProps =
  BaseDaInputProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> & {
    autoResize?: boolean
  }

// ─── Component ────────────────────────────────────────────────

export const DaTextarea = React.forwardRef<HTMLTextAreaElement, DaTextareaProps>(
  (
    {
      prefixIcon,
      suffixIcon,
      variant      = "underline",
      size         = "lg",
      status,
      label,
      helperText,
      error,
      success,
      warning,
      loading,
      containerClassName,
      autoResize   = false,
      rows         = 4,
      inputClassName,
      disabled,
      required,
      readOnly,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null)
    const resolvedRef = (ref as React.RefObject<HTMLTextAreaElement>) ?? internalRef

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize && resolvedRef.current) {
        const el = resolvedRef.current
        el.style.height = "auto"
        el.style.height = `${el.scrollHeight}px`
      }
      onChange?.(e)
    }

    React.useEffect(() => {
      if (autoResize && resolvedRef.current) {
        const el = resolvedRef.current
        el.style.height = "auto"
        el.style.height = `${el.scrollHeight}px`
      }
    }, [autoResize])

    return (
      <DaInputBase
        label={label}
        helperText={helperText}
        error={error}
        success={success}
        warning={warning}
        variant={variant}
        size={size}
        status={status}
        loading={loading}
        containerClassName={containerClassName}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        id={id}
        multiline
      >
        {prefixIcon && (
          <span aria-hidden="true" className="shrink-0 text-text-tertiary flex items-center mt-0.5">
            {prefixIcon}
          </span>
        )}

        <textarea
          ref={resolvedRef}
          id={id}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          rows={rows}
          onChange={handleChange}
          aria-invalid={!!error}
          className={clsx(
            "flex-1 min-w-0 w-full bg-transparent outline-none",
            "text-text-primary placeholder:text-text-tertiary placeholder:font-normal ",
            size === "lg" ? "text-base" : "text-sm",
            "leading-normal",
            autoResize ? "resize-none" : "resize-y",
            "disabled:cursor-not-allowed",
            inputClassName,
          )}
          {...props}
        />

        {suffixIcon && !loading && (
          <span aria-hidden="true" className="shrink-0 text-text-tertiary flex items-center mt-0.5">
            {suffixIcon}
          </span>
        )}
      </DaInputBase>
    )
  }
)

DaTextarea.displayName = "DaTextarea"
