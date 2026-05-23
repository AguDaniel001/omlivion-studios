/**
 * DaInput.tsx
 * ─────────────────────────────────────────────────────────────
 * Single-line text input. Built on DaInputBase.
 */

import * as React from "react"
import clsx from "clsx"
import { DaInputBase } from "./DaInputBase"
// import type { DaInputProps as NativeProps } from "./DaInput.types" // Wait, I didn't export DaInputProps in types
import type { BaseDaInputProps } from "./DaInput.types"

// ─── Props ────────────────────────────────────────────────────

export type DaInputProps =
  BaseDaInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
    type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url"
  }

// ─── Component ────────────────────────────────────────────────

export const DaInput = React.forwardRef<HTMLInputElement, DaInputProps>(
  (
    {
      type = "text",
      prefixIcon,
      suffixIcon,
      variant  = "underline",
      size     = "lg",
      status,
      label,
      helperText,
      error,
      success,
      warning,
      loading,
      containerClassName,
      inputClassName,
      disabled,
      required,
      readOnly,
      id,
      ...props
    },
    ref
  ) => {
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
      >
        {prefixIcon && (
          <span aria-hidden="true" className="shrink-0 text-text-tertiary flex items-center">
            {prefixIcon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          aria-invalid={!!error}
          className={clsx(
            "flex-1 min-w-0 bg-transparent outline-none",
            "text-text-primary placeholder:text-text-tertiary placeholder:font-normal ",
            "disabled:cursor-not-allowed",
            size === "lg" ? "text-base" : "text-sm",
            inputClassName,
          )}
          {...props}
        />

        {suffixIcon && !loading && (
          <span aria-hidden="true" className="shrink-0 text-text-tertiary flex items-center">
            {suffixIcon}
          </span>
        )}
      </DaInputBase>
    )
  }
)

DaInput.displayName = "DaInput"
