import Image from 'next/image';

/**
 * Real app screenshot, framed as a phone. Bezel and screen radii are hand
 * -tuned (not design tokens) because nothing else on the site draws a
 * device frame — this is the one place a phone silhouette needs to read
 * as a phone rather than a rounded card.
 */
export function PhoneMockup({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-[220px] rounded-[2.75rem] border-[10px] border-ink bg-ink p-0 shadow-lg">
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
  );
}
