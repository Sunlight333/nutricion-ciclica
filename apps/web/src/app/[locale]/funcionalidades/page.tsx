import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getDictionary, alternatesFor, type Locale } from '@/lib/i18n';
import {
  Wand2,
  CalendarDays,
  Calculator,
  Activity,
  UtensilsCrossed,
  CalendarCheck,
  Leaf,
  ShoppingBasket,
  Bookmark,
  Sparkles,
  Camera,
  NotebookPen,
  Droplets,
  Flower2,
  BookOpen,
  PlayCircle,
  Bell,
  UserCircle,
  Languages,
  Crown,
  type LucideIcon,
} from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { PhoneMockup } from '@/components/ui/phone-mockup';
import { getFeatureGroups, type Feature } from '@/data/features';
import { cn } from '@/lib/cn';

/**
 * "Inteligencia del ciclo" group only: features[1..3] (Calendario del
 * ciclo, Calculadora de período, Gráfico hormonal) become real app
 * screenshots, index-matched since group.features keeps the same order in
 * both locales. features[0] (Configuración en 2 minutos) stays an icon card.
 */
const CICLO_PHONE_SCREENSHOTS = [
  '/images/app/feature-tracker.jpg',
  '/images/app/ciclo-calculadora.jpg',
  '/images/app/feature-chart.jpg',
];
const CICLO_PHONE_GLOW = ['#f2b8ba', '#f9dfa8', '#b8d8bc'];
const CICLO_PHONE_TILT_DEG = [-4, 3, -3];
const CICLO_PHONE_FLOAT_DELAY = ['0s', '-2.3s', '-4.6s'];

/**
 * "Nutrición y recetas" group only: features[0..3] (Recetas por fase, Plan
 * semanal de comidas, Guía de alimentos clave, Lista de compras) become
 * real app screenshots; features[4] (Recetas guardadas) stays an icon card.
 */
const NUTRICION_PHONE_SCREENSHOTS = [
  '/images/app/recipes-menstrual.jpg',
  '/images/app/nutricion-plan.jpg',
  '/images/app/nutricion-guia.jpg',
  '/images/app/feature-shopping.jpg',
];
const NUTRICION_PHONE_GLOW = ['#f2b8ba', '#b8d8bc', '#f9dfa8', '#cdc0e6'];
const NUTRICION_PHONE_TILT_DEG = [-4, 3, -3, 4];
const NUTRICION_PHONE_FLOAT_DELAY = ['0s', '-1.8s', '-3.4s', '-5.1s'];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  return {
    title: t.meta.funcionalidades.title,
    description: t.meta.funcionalidades.description,
    alternates: { canonical: '/funcionalidades', languages: alternatesFor('/funcionalidades') },
  };
}

const ICONS: Record<string, LucideIcon> = {
  Wand2,
  CalendarDays,
  Calculator,
  Activity,
  UtensilsCrossed,
  CalendarCheck,
  Leaf,
  ShoppingBasket,
  Bookmark,
  Sparkles,
  Camera,
  NotebookPen,
  Droplets,
  Flower2,
  BookOpen,
  PlayCircle,
  Bell,
  UserCircle,
  Languages,
};

export default async function FuncionalidadesPage({
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
        eyebrow={t.pages.funcionalidades.eyebrow}
        title={t.pages.funcionalidades.title}
        accent={t.pages.funcionalidades.accent}
        lead={t.pages.funcionalidades.lead}
        image="/images/heroes/funciones.avif"
        focal="center 55%"
        veil={0.66}
      >
        <ul className="flex flex-wrap justify-center gap-3">
          {getFeatureGroups(locale).map((g) => (
            <li key={g.id}>
              <a
                href={`#${g.id}`}
                className="inline-flex rounded-full border border-hairline bg-white/70 px-5 py-2.5 font-sans text-caption font-semibold text-ink shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                {g.eyebrow}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {getFeatureGroups(locale).map((group) => (
        <Section
          key={group.id}
          id={group.id}
          surface={group.surface}
        >
          {/* Photographic texture on alternating sections. Held well behind
              a cream scrim: it should register as material, not imagery —
              the page has no room for a second subject competing with the
              cards. Contrast over the scrim is measured, not assumed. */}
          {group.bgImage && (
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${group.bgImage}')` }}
              />
              <div className="absolute inset-0 bg-surface-raised/[0.84]" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-surface-raised to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-raised to-transparent" />
            </div>
          )}

          <Container className="relative">
            <Reveal className="mx-auto max-w-2xl text-center">
              <Eyebrow>{group.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-h2 text-ink">
                {group.title} <span className="text-accent">{group.accent}</span>
              </h2>
              {group.lead && (
                <p className="mx-auto mt-6 max-w-xl text-body text-muted">
                  {group.lead}
                </p>
              )}
            </Reveal>

            {group.id === 'ciclo' ? (
              <>
                <ul className="mx-auto mt-14 grid max-w-md gap-7">
                  <Reveal as="li" className="h-full">
                    <FeatureCard feature={group.features[0]} premiumNote={t.content.premiumNote} />
                  </Reveal>
                </ul>

                <ul className="mt-9 grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
                  {group.features.slice(1).map((feature, i) => (
                    <Reveal as="li" key={feature.title} delay={(i + 1) * 90} className="h-full">
                      <div className="flex h-full flex-col items-center text-center">
                        <div className="w-full">
                          <PhoneMockup
                            src={CICLO_PHONE_SCREENSHOTS[i]}
                            alt={feature.title}
                            tiltDeg={CICLO_PHONE_TILT_DEG[i]}
                            glowColor={CICLO_PHONE_GLOW[i]}
                            floatDelay={CICLO_PHONE_FLOAT_DELAY[i]}
                          />
                        </div>
                        <h3 className="mt-6 text-h4 text-ink">{feature.title}</h3>
                        <p className="mt-2 text-small text-muted">{feature.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </>
            ) : group.id === 'nutricion' ? (
              <>
                <ul className="mt-14 grid gap-9 sm:grid-cols-2 xl:grid-cols-4">
                  {group.features.slice(0, 4).map((feature, i) => (
                    <Reveal as="li" key={feature.title} delay={i * 90} className="h-full">
                      <div className="flex h-full flex-col items-center text-center">
                        <div className="w-full">
                          <PhoneMockup
                            src={NUTRICION_PHONE_SCREENSHOTS[i]}
                            alt={feature.title}
                            tiltDeg={NUTRICION_PHONE_TILT_DEG[i]}
                            glowColor={NUTRICION_PHONE_GLOW[i]}
                            floatDelay={NUTRICION_PHONE_FLOAT_DELAY[i]}
                          />
                        </div>
                        <h3 className="mt-6 text-h4 text-ink">{feature.title}</h3>
                        <p className="mt-2 text-small text-muted">{feature.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </ul>

                <ul className="mx-auto mt-9 grid max-w-md gap-7">
                  <Reveal as="li" delay={360} className="h-full">
                    <FeatureCard feature={group.features[4]} premiumNote={t.content.premiumNote} />
                  </Reveal>
                </ul>
              </>
            ) : (
              <ul
                className={cn(
                  'mt-14 grid gap-7 sm:grid-cols-2',
                  group.columns === 3 && 'lg:grid-cols-3',
                )}
              >
                {group.features.map((feature, i) => (
                  <Reveal
                    as="li"
                    key={feature.title}
                    delay={i * 90}
                    className="h-full"
                  >
                    <FeatureCard feature={feature} premiumNote={t.content.premiumNote} />
                  </Reveal>
                ))}
              </ul>
            )}
          </Container>
        </Section>
      ))}

      <CtaBand source="funcionalidades" locale={locale} />
    </>
  );
}

function FeatureCard({ feature, premiumNote }: { feature: Feature; premiumNote: string }) {
  const Icon = ICONS[feature.icon];

  return (
    <article
      className={cn(
        'card card-hover flex h-full flex-col p-8 lg:p-9',
        feature.premium && 'ring-2 ring-ovulation',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className={`icon-chip ${feature.tint}`}>
          {Icon && <Icon strokeWidth={1.9} className="h-9 w-9" />}
        </span>

        {feature.premium && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ovulation px-3.5 py-1.5 font-sans text-caption font-bold whitespace-nowrap text-ovulation-ink">
            <Crown strokeWidth={2.2} className="h-4 w-4" />
            Premium
          </span>
        )}
      </div>

      <h3 className="mt-6 text-h3 text-ink">{feature.title}</h3>
      <p className="mt-3 flex-1 text-small text-muted">{feature.body}</p>

      {feature.note && (
        <p className="mt-5 font-sans text-caption font-semibold text-accent-display">
          {feature.note}
        </p>
      )}

      {feature.premium && (
        <p className="mt-5 text-caption text-muted">
          {premiumNote}
        </p>
      )}
    </article>
  );
}
