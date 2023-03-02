import type { ReactNode } from 'react';

export const Section = ({
  children,
  alignment,
}: {
  children: ReactNode;
  alignment: string;
}) => {
  return (
    <section className={`py-8 bg-slate-50 lg:bg-inherit ${alignment}`}>
      {children}
    </section>
  );
};
