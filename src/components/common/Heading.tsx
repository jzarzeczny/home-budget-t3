import type { ReactNode } from 'react';

export function Heading({ text }: { text: string }) {
  return <h3 className="py-8 text-center text-l">{text}</h3>;
}
export const SectionHeading = ({ children }: { children: ReactNode }) => {
  return <h2 className="mb-8 text-center text-xl">{children}</h2>;
};
