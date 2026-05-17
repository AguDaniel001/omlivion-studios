import type { ReactNode } from "react";

type DaSectionContainerProps = {
  id?: string
  children: ReactNode;
  className?: string;
};

const DaSectionContainer = ({ id, children, className = "" }: DaSectionContainerProps) => {
  return (
    <section
    id={id}
      className={`flex justify-center smooth-transition section-w-padding section-h-padding px-4 ${className}`}
    >
      {children}
    </section>
  );
};

export default DaSectionContainer;