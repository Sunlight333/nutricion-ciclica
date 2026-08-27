import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getDictionary, localizePath, alternatesFor, type Locale } from '@/lib/i18n';
import Image from 'next/image';
import {
  UserPlus,
  CalendarHeart,
  LayoutDashboard,
  NotebookPen,
  LineChart,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { getPhases, phaseDays } from '@nutricycle/shared';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { PhoneMockup } from '@/components/ui/phone-mockup';
import { getJourney } from '@/data/journey';

/** Matches the tint styling used on the homepage phases section. */
const PHASE_STYLES: Record<string, { chip: string; ink: string }> = {
  menstrual: { chip: 'bg-menstrual-soft text-menstrual-ink', ink: 'text-menstrual-ink' },
  folicular: { chip: 'bg-follicular-soft text-follicular-ink', ink: 'text-follicular-ink' },
  ovulatoria: { chip: 'bg-ovulation-soft text-ovulation-ink', ink: 'text-ovulation-ink' },
  lutea: { chip: 'bg-luteal-soft text-luteal-ink', ink: 'text-luteal-ink' },
};

/** Real "Tu menú de hoy" screenshot per phase — client-supplied. */
const PHASE_SCREENSHOTS: Record<string, string> = {
  menstrual: '/images/app/today-menstrual.jpg',
  folicular: '/images/app/today-folicular.jpg',
  ovulatoria: '/images/app/today-ovulatoria.jpg',
  lutea: '/images/app/today-lutea.jpg',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  return {
    title: t.meta.comoFunciona.title,
    description: t.meta.comoFunciona.description,
    alternates: { canonical: '/como-funciona', languages: alternatesFor('/como-funciona') },
  };
}

/** Icons stay here; the copy lives in data/journey.ts. */
const STEP_ICONS: Record<string, LucideIcon> = {
  UserPlus,
  CalendarHeart,
  LayoutDashboard,
  NotebookPen,
  LineChart,
};

export default async function ComoFuncionaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  return (
    <>
      <PageHero
        eyebrow={t.pages.comoFunciona.eyebrow}
        title={t.pages.comoFunciona.title}
        accent={t.pages.comoFunciona.accent}
        lead={t.pages.comoFunciona.lead}
        image="/images/heroes/metodo.avif"
        focal="center 50%"
        veil={0.5}
      />

      {/* The journey */}
      <Section surface="raised">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t.method.stepsEyebrow}</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              {t.method.stepsTitle} <span className="text-accent">{t.method.stepsAccent}</span>
            </h2>
          </Reveal>

          <ol className="mt-16 flex flex-col gap-6">
            {getJourney(locale).map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 110}>
                <article className="card card-hover flex flex-col gap-6 p-8 sm:flex-row sm:items-start lg:p-10">
                  <span className={`icon-chip shrink-0 ${step.tint}`}>
                    {(() => { const Icon = STEP_ICONS[step.icon]; return <Icon strokeWidth={1.9} className="h-9 w-9" />; })()}
                  </span>

                  <div className="flex-1">
                    <span className="font-sans text-caption font-bold tracking-[0.16em] text-accent-display uppercase">
                      {t.home.steps.stepLabel} {step.n}
                    </span>
                    <h3 className="mt-2 text-h3 text-ink">{step.title}</h3>
                    <p className="mt-3 text-body text-muted">{step.body}</p>
                    <p className="mt-2 text-small text-accent">{step.detail}</p>
                  </div>

                  <span
                    aria-hidden
                    className="hidden font-display text-h1 leading-none font-semibold text-hairline-strong lg:block"
                  >
                    {step.n}
                  </span>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* What the phases actually are */}
      <Section surface="base">
        <SectionTexture src="/images/textures/counter.avif" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t.method.whyEyebrow}</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">
              {t.method.whyTitle}{' '}
              <span className="text-accent">{t.method.whyAccent}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-body text-muted">
              {t.method.whyLead}
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-9 sm:grid-cols-2 xl:grid-cols-4">
            {getPhases(locale).map((phase, i) => {
              const s = PHASE_STYLES[phase.slug];
              return (
                <Reveal as="li" key={phase.slug} delay={i * 90} className="h-full">
                  <div className="flex h-full flex-col items-center text-center">
                    <span
                      className={`inline-flex w-fit rounded-full px-3.5 py-1.5 font-sans text-caption font-bold tracking-wide ${s.chip}`}
                    >
                      {phaseDays(phase, locale)}
                    </span>
                    <h3 className="mt-4 text-h3 text-ink">{phase.name}</h3>
                    <p className={`mt-1 font-sans text-caption font-semibold ${s.ink}`}>
                      {phase.tagline}
                    </p>
                    <div className="mt-6 w-full">
                      <PhoneMockup
                        src={PHASE_SCREENSHOTS[phase.slug]}
                        alt={`${phase.name}: ${phase.tagline}`}
                      />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="mt-12 text-center" delay={420}>
            <a
              href={localizePath('/ciclo', locale)}
              className="group inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
            >
              {t.method.phasesCta}
              <ArrowRight
                strokeWidth={2.2}
                className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </a>
          </Reveal>
        </Container>
      </Section>

      {/* The method behind it */}
      <Section surface="lilac" className="overflow-hidden">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>{t.method.originEyebrow}</Eyebrow>
              <h2 className="mt-5 text-h2 text-ink">
                {t.method.originTitle} <span className="text-accent">{t.method.originAccent}</span>
              </h2>
              <div className="mt-7 space-y-5 text-body text-muted">
                <p>{t.method.originBody1}</p>
                <p>{t.method.originBody2}</p>
              </div>
              <a
                href={localizePath('/sobre', locale)}
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 font-sans text-nav font-semibold text-ink shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {t.method.originCta}
                <ArrowRight
                  strokeWidth={2.2}
                  className="h-5.5 w-5.5 transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </a>
            </Reveal>

            <Reveal delay={140}>
              <div className="relative mx-auto max-w-md lg:ml-auto">
                <div
                  aria-hidden
                  className="absolute -top-6 -right-6 h-full w-full rounded-[2rem] bg-luteal/45"
                />
                <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-xl">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src="/images/alicia/kitchen-chopping.jpg"
                      alt={t.home.founder.alt.chopping}
                      fill
                      sizes="(min-width: 1024px) 440px, 90vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand source="como-funciona" locale={locale} />
    </>
  );
}
