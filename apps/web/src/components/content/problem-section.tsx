import Image from 'next/image';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { getProblems } from '@/data/home';
import { getDictionary, type Locale } from '@/lib/i18n';

/** One portrait per card, client-supplied. Index-matched to PROBLEM_BASE in
 *  data/home.ts — swap the file, not the mapping, if a photo changes. */
const AVATAR_IMAGES = [
  '/images/problem/avatar-1.png',
  '/images/problem/avatar-2.png',
  '/images/problem/avatar-3.png',
];

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
            return (
              <Reveal as="li" key={problem.pain} delay={i * 110}>
                <article className="card card-hover h-full p-8 lg:p-9">
                  <span className={`icon-chip overflow-hidden ${problem.tint}`}>
                    <Image
                      src={AVATAR_IMAGES[i % AVATAR_IMAGES.length]}
                      alt=""
                      width={72}
                      height={72}
                      className="h-full w-full object-cover"
                    />
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
