import type { ReactNode } from "react";

type DaSectionContainerProps = {
  id?: string
  dataTheme?: "light" | "dark";
  children: ReactNode;
  className?: string;
};

const DaSectionContainer = ({ id, dataTheme, children, className = "" }: DaSectionContainerProps) => {
  return (
    <section
      id={id}
      data-theme={dataTheme}
      className={`flex justify-center smooth-transition section-w-padding section-h-padding px-4 ${className}`}
    >
      {children}
    </section>
  );
};

export default DaSectionContainer;