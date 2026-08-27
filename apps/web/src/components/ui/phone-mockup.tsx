import Image from 'next/image';

/**
 * Real app screenshot, framed as a phone.
 *
 * Reuses the site's existing motion primitives rather than inventing new
 * ones: `.scene`/`.tilt` (the 3D "feature imagery" tilt already defined in
 * globals.css, previously unused), `.orb`/`animate-drift` (the ambient-glow
 * pattern from AmbientOrbs), and `.animate-float` (the gentle bob used
 * elsewhere). All three already respect `prefers-reduced-motion` globally,
 * so this needs no accessibility handling of its own.
 *
 * Bezel and screen radii are hand-tuned (not design tokens) because nothing
 * else on the site draws a device frame — this is the one place a phone
 * silhouette needs to read as a phone rather than a rounded card.
 */
export function PhoneMockup({
  src,
  alt,
  priority,
  tiltDeg = 0,
  glowColor,
  floatDelay = '0s',
}: {
  src: string;
  alt: string;
  priority?: boolean;
  /** Resting z-rotation in degrees — gives a row of phones a fanned,
   *  physical-objects-on-a-table feel instead of a rigid grid. */
  tiltDeg?: number;
  /** CSS color for the soft ambient glow behind the phone. Omit for none. */
  glowColor?: string;
  /** Negative CSS animation-delay so several phones don't bob in sync. */
  floatDelay?: string;
}) {
  return (
    <div className="scene mx-auto w-full max-w-[220px]">
      <div className="animate-float" style={{ animationDelay: floatDelay }}>
        <div className="relative">
          {glowColor ? (
            <span
              aria-hidden
              className="orb animate-drift"
              style={{
                background: glowColor,
                opacity: 0.45,
                width: '150%',
                height: '150%',
                top: '-25%',
                left: '-25%',
                filter: 'blur(48px)',
              }}
            />
          ) : null}

          <div
            className="tilt relative rounded-[2.75rem]"
            style={{ '--tilt-z': `${tiltDeg}deg` } as React.CSSProperties}
          >
            <div className="rounded-[2.75rem] border-[10px] border-ink bg-ink shadow-lg">
              <div className="relative aspect-[1080/2340] w-full overflow-hidden rounded-[2rem] bg-surface-base">
                <span
                  aria-hidden
                  className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-ink/70"
                />
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 220px, 45vw"
                  priority={priority}
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
