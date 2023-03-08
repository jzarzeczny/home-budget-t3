import type { ReactNode } from 'react';

export const Section = ({
  children,
  alignment,
}: {
  children: ReactNode;
  alignment: string;
}) => {
  return (
    <section className={`py-8  lg:bg-inherit ${alignment}`}>{children}</section>
  );
};
