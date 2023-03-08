import { SectionHeading } from './Heading';
import { Section } from './Section';

export const Instruction = () => {
  return (
    <Section alignment="lg:col-start-1 lg:col-end-12 lg:row-start-1 lg:row-end-2 lg:justify-self-center">
      <SectionHeading>Kategorie kosztów</SectionHeading>
      <p className="mx-5 max-w-prose md:mx-auto">
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
    </Section>
  );
};
