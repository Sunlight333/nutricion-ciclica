import { ArrowRight } from 'lucide-react';
import { getDictionary, localizePath, type Locale } from '@/lib/i18n';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { PhoneMockup } from '@/components/ui/phone-mockup';
import { getFeatures } from '@/data/home';

/**
 * getFeatures(locale) always returns FEATURE_BASE's fixed order:
 * [ai, tracker, chart, meals, shopping, wellness]. Only the middle four
 * (tracker/chart/meals/shopping) render here as real app screenshots;
 * `ai` and `wellness` are dropped from this section per client request.
 */
const PHONE_SCREENSHOTS = [
  '/images/app/feature-tracker.jpg',
  '/images/app/feature-chart.jpg',
  '/images/app/feature-meals.jpg',
  '/images/app/feature-shopping.jpg',
];

/** Same brand hues as tokens.css `--color-{phase}`, matching each card's
 *  original tint (menstrual/ovulation/follicular/luteal, in that order). */
const PHONE_GLOW = ['#f2b8ba', '#f9dfa8', '#b8d8bc', '#cdc0e6'];
const PHONE_TILT_DEG = [-4, 3, -3, 4];
const PHONE_FLOAT_DELAY = ['0s', '-1.8s', '-3.4s', '-5.1s'];

export function FeaturesSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const phoneFeatures = getFeatures(locale).slice(1, 5);

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

        <ul className="mt-14 grid gap-9 sm:grid-cols-2 xl:grid-cols-4">
          {phoneFeatures.map((feature, i) => (
            <Reveal as="li" key={feature.title} delay={i * 90} className="h-full">
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

        <Reveal className="mt-12 text-center" delay={440}>
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
