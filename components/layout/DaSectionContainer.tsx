import React, { forwardRef, type ReactNode } from "react";

type DaSectionContainerProps = {
  id?: string
  dataTheme?: "light" | "dark";
  children: ReactNode;
  className?: string;
};

const DaSectionContainer = forwardRef<HTMLElement, DaSectionContainerProps>(
  ({ id, dataTheme, children, className = "" }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        data-theme={dataTheme}
        className={`flex justify-center smooth-transition section-w-padding section-h-padding px-4 ${className}`}
      >
        {children}
      </section>
    );
  }
);

DaSectionContainer.displayName = "DaSectionContainer";

export default DaSectionContainer;