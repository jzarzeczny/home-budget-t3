import { useRef, useState } from 'react';

import { ArrowDown } from '@components/icons/ArrowDown';

import { SectionHeading } from './Heading';
import { Section } from './Section';

export const Instruction = () => {
  const [open, setOpen] = useState<boolean>(false);
  const para = useRef<HTMLParagraphElement>(null);

  const toggleInstructions = () => {
    if (!open) {
      para?.current?.classList.remove('h-0');
      para?.current?.classList.add('h-auto');
      const height = para.current?.clientHeight;
      para?.current?.classList.remove('h-auto');

      para?.current?.classList.add(`h-[${height}]`);
    } else {
      para?.current?.classList.add(`h-0`);
    }
    setOpen((prev) => !prev);
  };

  return (
    <Section alignment="lg:col-start-1 lg:col-end-12 lg:row-start-1 lg:row-end-2 lg:justify-self-center">
      <SectionHeading>Wydatki</SectionHeading>
      <p
        className={`mx-5 max-w-prose  
        h-0
         overflow-hidden md:mx-auto transition-[height]`}
        ref={para}
      >
        Tworzenie kategorii ma za zadanie pogrupować koszty. Dzięki temu
        będziesz w stanie pogrupować swoje wydatki według własnego uznania.
        Będziesz miał kontrolę nad tym na co i ile wydajesz w danym miesiącu.
        <br />
        <br />
        Kategorie mogą być bardzo szczegółowe np. Zakupy. Mogą również zawierać
        wiele różnych produktów, które grupujesz według własnego uznania np.
        zakupy lub chemia.
        <br />
        <br />
        To ty jesteś najlepszy w segregowaniu własnych kosztów. Eksperymentuj,
        znajdź sposób który w najlepszy sposób pozwoli Ci zbadać swoje koszta!
      </p>
      <ArrowDown
        styles={`flex mx-auto transition-all ${
          open ? 'rotate-180 mt-8' : 'rotate-0'
        }`}
        onClick={toggleInstructions}
      />
    </Section>
  );
};
