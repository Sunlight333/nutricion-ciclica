import { Sparkles, Flower2 } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { getDictionary, localizePath, type Locale } from '@/lib/i18n';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { PhoneMockup } from '@/components/ui/phone-mockup';
import { getFeatures } from '@/data/home';
import { cn } from '@/lib/cn';

const ICONS = { Sparkles, Flower2 };

/**
 * getFeatures(locale) always returns FEATURE_BASE's fixed order:
 * [ai, tracker, chart, meals, shopping, wellness]. `ai` and `wellness`
 * (indices 0 and 5) stay as icon cards; the middle four become real app
 * screenshots — client-supplied, one per feature.
 */
const PHONE_SCREENSHOTS = [
  '/images/app/feature-tracker.jpg',
  '/images/app/feature-chart.jpg',
  '/images/app/feature-meals.jpg',
  '/images/app/feature-shopping.jpg',
];

/** Same brand hues as tokens.css `--color-{phase}`, matching each card's
 *  existing tint (menstrual/ovulation/follicular/luteal, in that order). */
const PHONE_GLOW = ['#f2b8ba', '#f9dfa8', '#b8d8bc', '#cdc0e6'];
const PHONE_TILT_DEG = [-4, 3, -3, 4];
const PHONE_FLOAT_DELAY = ['0s', '-1.8s', '-3.4s', '-5.1s'];

export function FeaturesSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const features = getFeatures(locale);
  const [ai, , , , , wellness] = features;
  const phoneFeatures = features.slice(1, 5);

  return (
    <Section surface="base">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t.home.features.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">
            {t.home.features.title}{' '}
            <span className="text-accent">{t.home.features.accent}</span>
          </h2>
        </Reveal>

        <ul className="mx-auto mt-14 grid max-w-3xl gap-7 sm:grid-cols-2">
          {[ai, wellness].map((feature, i) => {
            const Icon = ICONS[feature.icon as 'Sparkles' | 'Flower2'];
            return (
              <Reveal as="li" key={feature.title} delay={i * 90} className="h-full">
                <article
                  className={cn(
                    'card card-hover h-full p-8 lg:p-9',
                    feature.highlight && 'ring-2 ring-luteal',
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className={`icon-chip ${feature.tint}`}>
                      <Icon strokeWidth={1.9} className="h-9 w-9" />
                    </span>

                    {feature.highlight && (
                      <span className="rounded-full bg-luteal px-3.5 py-1.5 font-sans text-caption font-bold text-luteal-ink">
                        {t.home.features.aiBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-6 text-h3 text-ink">{feature.title}</h3>
                  <p className="mt-3 text-small text-muted">{feature.body}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <ul className="mt-9 grid gap-9 sm:grid-cols-2 xl:grid-cols-4">
          {phoneFeatures.map((feature, i) => (
            <Reveal as="li" key={feature.title} delay={(i + 2) * 90} className="h-full">
              <div className="flex h-full flex-col items-center text-center">
                <div className="w-full">
                  <PhoneMockup
                    src={PHONE_SCREENSHOTS[i]}
                    alt={feature.title}
                    tiltDeg={PHONE_TILT_DEG[i]}
                    glowColor={PHONE_GLOW[i]}
                    floatDelay={PHONE_FLOAT_DELAY[i]}
                  />
                </div>
                <h3 className="mt-6 text-h4 text-ink">{feature.title}</h3>
                <p className="mt-2 text-small text-muted">{feature.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 text-center" delay={560}>
          <a
            href={localizePath('/funcionalidades', locale)}
            className="group inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
          >
            {t.home.features.seeAll}
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
