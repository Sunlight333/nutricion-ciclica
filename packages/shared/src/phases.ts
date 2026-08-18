import { type Locale, type Localized, pick } from './locale';

/**
 * The four cycle phases — single source of truth.
 *
 * ⚠️ BLOCKER: these day ranges are PROVISIONAL.
 * Three contradictory definitions exist across the live site and the app
 * strategy doc (see doc/00-overview/revised-direction.md §6). The website
 * must display the same phase the app computes for the same cycle day —
 * a mismatch breaks trust at the exact moment a reader is converting.
 *
 * Resolve against the app's phase-calculation code, then update here only.
 *
 * Structure: the numbers and colour tokens are language-independent and live
 * in PHASE_BASE; everything a reader sees lives in PHASE_TEXT keyed by
 * locale. Splitting them this way means adding a language cannot accidentally
 * move a day range or change a tint.
 */

export type PhaseSlug = 'menstrual' | 'folicular' | 'ovulatoria' | 'lutea';

export interface Phase {
  slug: PhaseSlug;
  /** Display name in the requested locale */
  name: string;
  /** Two-word mood, as used on the app landing page */
  tagline: string;
  dayStart: number;
  dayEnd: number;
  /** Short line describing the hormonal state */
  hormone: string;
  /** What to eat, one sentence */
  nutrition: string;
  /** Sample foods — kept short, these are chips not prose */
  foods: string[];
  /** Tailwind token names from tokens.css */
  tint: string;
  ink: string;
}

const PHASE_BASE: readonly {
  slug: PhaseSlug;
  dayStart: number;
  dayEnd: number;
  tint: string;
  ink: string;
}[] = [
  { slug: 'menstrual', dayStart: 1, dayEnd: 5, tint: 'menstrual', ink: 'menstrual-ink' },
  { slug: 'folicular', dayStart: 6, dayEnd: 13, tint: 'follicular', ink: 'follicular-ink' },
  { slug: 'ovulatoria', dayStart: 14, dayEnd: 16, tint: 'ovulation', ink: 'ovulation-ink' },
  { slug: 'lutea', dayStart: 17, dayEnd: 28, tint: 'luteal', ink: 'luteal-ink' },
] as const;

interface PhaseText {
  name: string;
  tagline: string;
  hormone: string;
  nutrition: string;
  foods: string[];
}

const PHASE_TEXT: Localized<Record<PhaseSlug, PhaseText>> = {
  es: {
    menstrual: {
      name: 'Menstrual',
      tagline: 'Eliminar y restaurar',
      hormone: 'Hormonas en su punto más bajo. El cuerpo pide calma.',
      nutrition: 'Estos días el cuerpo elimina y se renueva — los alimentos ayudan a suavizar ese proceso.',
      foods: ['Crema de zapallo', 'Risotto de Garbanzos', 'Bowl Invierno Hormonal'],
    },
    folicular: {
      name: 'Folicular',
      tagline: 'Construir y producir',
      hormone: 'El estrógeno sube. Vuelve la claridad y la fuerza.',
      nutrition: 'Crucíferas, semillas de linaza y proteínas ligeras.',
      foods: ['Pasta de Brócoli', 'Pizza de Coliflor', 'Galletas de Tahini'],
    },
    ovulatoria: {
      name: 'Ovulatoria',
      tagline: 'Pico de producción',
      hormone: 'Máxima energía. El estrógeno alcanza su pico.',
      nutrition: 'Frutas antioxidantes, zinc y vegetales de hoja verde.',
      foods: ['Ensalada antioxidante Crush', 'Pad Thai de Atún', 'Pizza de Pollo'],
    },
    lutea: {
      name: 'Lútea',
      tagline: 'Metabolizar y preparar',
      hormone: 'La progesterona se activa. Aparecen los antojos y el SPM.',
      nutrition: 'Chocolate, frutos secos y carbohidratos complejos.',
      foods: ['Brownies Secreto', 'Tortilla de Batata', 'Granola de Tiramisú'],
    },
  },
  en: {
    menstrual: {
      name: 'Menstrual',
      tagline: 'Clear out and restore',
      hormone: 'Hormones at their lowest. Your body is asking for calm.',
      nutrition: 'These days your body is clearing out and renewing — food helps ease that process.',
      foods: ['Pumpkin Cream Soup', 'Chickpea Risotto', 'Hormonal Winter Bowl'],
    },
    folicular: {
      name: 'Follicular',
      tagline: 'Build and produce',
      hormone: 'Oestrogen rises. Clarity and strength come back.',
      nutrition: 'Cruciferous vegetables, flaxseed and light proteins.',
      foods: ['Broccoli Pasta', 'Cauliflower Pizza', 'Tahini Cookies'],
    },
    ovulatoria: {
      name: 'Ovulatory',
      tagline: 'Peak production',
      hormone: 'Peak energy. Oestrogen reaches its highest point.',
      nutrition: 'Antioxidant fruit, zinc and leafy green vegetables.',
      foods: ['Antioxidant Crush Salad', 'Tuna Pad Thai', 'Chicken Pizza'],
    },
    lutea: {
      name: 'Luteal',
      tagline: 'Metabolize and prepare',
      hormone: 'Progesterone kicks in. Cravings and PMS show up.',
      nutrition: 'Chocolate, nuts and complex carbohydrates.',
      foods: ['Secret Brownies', 'Sweet Potato Omelette', 'Tiramisu Granola'],
    },
  },
};

/** All four phases, resolved for a locale, in cycle order. */
export function getPhases(locale: Locale): readonly Phase[] {
  const text = pick(PHASE_TEXT, locale);
  return PHASE_BASE.map((base) => ({ ...base, ...text[base.slug] }));
}

/**
 * `locale` defaults to Spanish so the existing call sites keep compiling
 * during the migration. New code should always pass it explicitly — an
 * omitted locale renders Spanish, which is exactly what the leak detector
 * is there to catch.
 */
export function getPhase(slug: PhaseSlug, locale: Locale): Phase | undefined {
  return getPhases(locale).find((p) => p.slug === slug);
}

/** Day range as a display string, e.g. "Días 6–13" / "Days 6–13" */
export function phaseDays(phase: Phase, locale: Locale): string {
  return `${locale === 'en' ? 'Days' : 'Días'} ${phase.dayStart}–${phase.dayEnd}`;
}

/** Type guard for a URL segment. */
export function isPhaseSlug(value: string): value is PhaseSlug {
  return PHASE_BASE.some((p) => p.slug === value);
}

/**
 * @deprecated Spanish-only. Use `getPhases(locale)`.
 *
 * Kept so the ~29 existing call sites keep compiling while they are migrated
 * one at a time. A half-migrated build that does not compile is worse than a
 * deprecated export, and the leak detector catches anything still rendering
 * Spanish on an English page. Delete once no call sites remain.
 */
export const PHASES: readonly Phase[] = getPhases('es');
