import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { getProblems } from '@/data/home';
import { getDictionary, type Locale } from '@/lib/i18n';

/**
 * Illustrated avatars, standing in for a photo. Fully drawn (not sourced
 * from a photo or stock service), so no real person's likeness is ever
 * attached to an invented "pain point" quote. Same visual language as the
 * lucide icons elsewhere (24x24, 1.9 stroke, currentColor), with a filled
 * hair silhouette per variant so the three cards read as distinct people
 * rather than one repeated icon.
 */
function AvatarShortHair({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M7.4 8.1a4.6 4.6 0 0 1 9.2 0c0 .5-.05 1-.16 1.4-1.3-.9-2.9-1.4-4.44-1.4s-3.14.5-4.44 1.4c-.11-.4-.16-.9-.16-1.4Z"
        fill="currentColor"
        stroke="none"
      />
      <circle cx="12" cy="9" r="4.2" fill="none" stroke="currentColor" strokeWidth={1.9} />
      <path
        d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
      />
    </svg>
  );
}

function AvatarWavyHair({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M7 15c-1.1-1-1.7-3-1.2-5.4C6.4 6.6 9 4.6 12 4.6s5.6 2 6.2 5c.5 2.4-.1 4.4-1.2 5.4.2-1.6-.1-3-.9-4-1 1.4-2.4 2.1-4.1 2.1s-3.1-.7-4.1-2.1c-.8 1-1.1 2.4-.9 4Z"
        fill="currentColor"
        stroke="none"
      />
      <circle cx="12" cy="9.6" r="4.2" fill="none" stroke="currentColor" strokeWidth={1.9} />
      <path
        d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
      />
    </svg>
  );
}

function AvatarBunHair({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="3.6" r="1.7" fill="currentColor" stroke="none" />
      <path
        d="M7.5 8a4.5 4.5 0 0 1 9 0c0 .5-.06 1-.18 1.4-1.28-.9-2.83-1.4-4.32-1.4s-3.04.5-4.32 1.4A5.3 5.3 0 0 1 7.5 8Z"
        fill="currentColor"
        stroke="none"
      />
      <circle cx="12" cy="9" r="4.2" fill="none" stroke="currentColor" strokeWidth={1.9} />
      <path
        d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
      />
    </svg>
  );
}

const AVATARS = [AvatarShortHair, AvatarWavyHair, AvatarBunHair];

export function ProblemSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <Section surface="raised">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t.home.problem.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">
            {t.home.problem.title}{' '}
            <span className="text-accent">{t.home.problem.accent}</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-7 md:grid-cols-3">
          {getProblems(locale).map((problem, i) => {
            const Avatar = AVATARS[i % AVATARS.length];
            return (
              <Reveal as="li" key={problem.pain} delay={i * 110}>
                <article className="card card-hover h-full p-8 lg:p-9">
                  <span className={`icon-chip ${problem.tint}`}>
                    <Avatar className="h-9 w-9" />
                  </span>

                  <h3 className="mt-6 text-h4 text-ink">“{problem.pain}”</h3>

                  <p className="mt-4 text-small text-muted">{problem.answer}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
