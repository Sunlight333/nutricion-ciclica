import { getPhases, phaseDays, type Phase } from '@nutricycle/shared';
import { getDictionary, localizePath, type Locale } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { PhoneMockup } from '@/components/ui/phone-mockup';

/**
 * Phase tints come from the app. They are background-only — each has a
 * darker ink sibling so labels stay readable (revised-direction.md §4).
 */
const STYLES: Record<string, { chip: string; ink: string }> = {
  menstrual: { chip: 'bg-menstrual-soft text-menstrual-ink', ink: 'text-menstrual-ink' },
  folicular: { chip: 'bg-follicular-soft text-follicular-ink', ink: 'text-follicular-ink' },
  ovulatoria: { chip: 'bg-ovulation-soft text-ovulation-ink', ink: 'text-ovulation-ink' },
  lutea: { chip: 'bg-luteal-soft text-luteal-ink', ink: 'text-luteal-ink' },
};

/** Real "Tu menú de hoy" screenshot per phase — client-supplied. */
const SCREENSHOTS: Record<string, string> = {
  menstrual: '/images/app/today-menstrual.jpg',
  folicular: '/images/app/today-folicular.jpg',
  ovulatoria: '/images/app/today-ovulatoria.jpg',
  lutea: '/images/app/today-lutea.jpg',
};

export function PhasesSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <Section surface="sunken">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t.home.phases.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">
            {t.home.phases.title}{' '}
            <span className="text-accent">{t.home.phases.accent}</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-9 sm:grid-cols-2 xl:grid-cols-4">
          {getPhases(locale).map((phase, i) => (
            <Reveal as="li" key={phase.slug} delay={i * 100} className="h-full">
              <PhaseCard phase={phase} locale={locale} priority={i === 0} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 text-center" delay={440}>
          <a
            href={localizePath('/ciclo', locale)}
            className="group inline-flex items-center gap-2.5 rounded-full border border-hairline-strong bg-white px-7 py-4 font-sans text-nav font-semibold text-ink shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {t.home.phases.cta}
            <ArrowRight
              strokeWidth={2.2}
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}

function PhaseCard({
  phase,
  locale,
  priority,
}: {
  phase: Phase;
  locale: Locale;
  priority?: boolean;
}) {
  const s = STYLES[phase.slug];

  return (
    <div className="flex h-full flex-col items-center text-center">
      <span
        className={`inline-flex w-fit rounded-full px-3.5 py-1.5 font-sans text-caption font-bold tracking-wide ${s.chip}`}
      >
        {phaseDays(phase, locale)}
      </span>

      <h3 className="mt-4 text-h3 text-ink">{phase.name}</h3>
      <p className={`mt-1 font-sans text-caption font-semibold ${s.ink}`}>{phase.tagline}</p>

      <div className="mt-6 w-full">
        <PhoneMockup
          src={SCREENSHOTS[phase.slug]}
          alt={`${phase.name}: ${phase.tagline}`}
          priority={priority}
        />
      </div>
    </div>
  );
}
