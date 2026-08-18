import { type Locale, type Localized, type PhaseSlug, pick } from '@nutricycle/shared';

/**
 * Educational copy for /ciclo/[fase].
 *
 * Kept out of `packages/shared` on purpose. The day ranges there are
 * blocked pending the app's algorithm (revised-direction.md §6); this
 * copy is not. Separating them means the blocker can be resolved by
 * editing one small file without touching prose, and vice versa.
 *
 * Source: app-content-strategy.md § "Nutrition & Cycle Science" and
 * § "Menstrual Cycle Trivia" — client-supplied. Nothing here is
 * clinical guidance invented for this build; every claim traces to that
 * document or to the phase data already in shared.
 *
 * Every page carries a link to /aviso-medico. This is a nutrition site,
 * not a medical one, and the disclaimer is one clause of the Terms that
 * now has its own route precisely so it can be linked from here.
 */

export interface PhaseDetail {
  /** One-line answer to "what is actually happening" */
  summary: string;
  /** How it commonly feels — framed as tendencies, never as diagnosis */
  feels: string[];
  /** What supports the body now */
  eat: { label: string; why: string }[];
  /** Movement that tends to suit the phase */
  movement: string;
  /** A practical note women often find useful */
  tip: string;
}

const PHASE_DETAIL_TEXT: Localized<Record<PhaseSlug, PhaseDetail>> = {
  es: {
  menstrual: {
    summary:
      'El cuerpo en modo renovación. Elimina, descansa y se prepara para empezar de cero — y tiene razones muy concretas para pedirte calma.',
    feels: [
      'Menos energía y ganas de hacer menos',
      'Cólicos o pesadez en la parte baja del abdomen',
      'Necesidad de dormir más',
      'Menos tolerancia al esfuerzo intenso',
    ],
    eat: [
      {
        label: 'Hierro',
        why: 'Se pierden entre 30 y 80 ml de sangre. Lentejas, espinaca y carnes rojas ayudan a reponerlo.',
      },
      {
        label: 'Magnesio',
        why: 'Asociado a menos intensidad en los cólicos. Chocolate amargo, almendras, aguacate.',
      },
      {
        label: 'Omega-3',
        why: 'Reduce la inflamación y ayuda a calmar el dolor típico de estos días.',
      },
      {
        label: 'Comida caliente y cocida',
        why: 'Más fácil de digerir cuando el sistema está pidiendo descanso.',
      },
    ],
    movement:
      'Caminar, estirar, yoga suave. Es la peor semana del mes para exigirte fuerza máxima y la mejor para no hacerlo.',
    tip: 'Si puedes elegir, dejá las reuniones y decisiones exigentes para la semana que viene. Tu claridad vuelve sola.',
  },
  folicular: {
    summary:
      'La energía vuelve y el cuerpo empieza a construir. Es la fase donde todo se produce — y la alimentación puede potenciar ese proceso desde adentro.',
    feels: [
      'Más energía y mejor ánimo',
      'Más claridad para pensar y decidir',
      'Más ganas de socializar',
      'Mejor tolerancia al ejercicio exigente',
    ],
    eat: [
      {
        label: 'Alimentos frescos y ligeros',
        why: 'Acompañan al estrógeno en ascenso sin cargar la digestión.',
      },
      {
        label: 'Fermentados',
        why: 'Yogur, kimchi y chucrut ayudan al metabolismo del estrógeno a través de la microbiota.',
      },
      {
        label: 'Crucíferas',
        why: 'Brócoli, coliflor y coles apoyan la vía hepática que procesa el estrógeno.',
      },
      {
        label: 'Semillas de linaza',
        why: 'Consumirlas en esta primera mitad del ciclo apoya la producción natural de estrógeno.',
      },
    ],
    movement:
      'La mejor ventana para fuerza, intervalos o empezar una rutina nueva. Tu cuerpo aguanta más de lo que aguantará en dos semanas.',
    tip: 'Aprovechá esta fase para lo que requiere iniciativa: proyectos nuevos, conversaciones difíciles, aprender algo.',
  },
  ovulatoria: {
    summary:
      'Con el estrógeno en su punto más alto, también sube la testosterona, lo que potencia la confianza, la libido y la toma de decisiones. Es el momento en que cuerpo y mente funcionan más en sincronía.',
    feels: [
      'Pico de energía y de ánimo',
      'Te sientes más sociable y comunicativa',
      'Cambios en el flujo cervical',
      'Algunas mujeres notan una punzada breve en un costado',
    ],
    eat: [
      {
        label: 'Antioxidantes',
        why: 'Frutos rojos y hojas verdes acompañan la salud del óvulo.',
      },
      {
        label: 'Verduras crudas',
        why: 'Se toleran mejor ahora que en cualquier otro momento del ciclo.',
      },
      {
        label: 'Zinc',
        why: 'Semillas de calabaza y mariscos, que ayudan a sostener el pico hormonal de esta fase.',
      },
      {
        label: 'Fibra',
        why: 'Ayuda a eliminar el exceso de estrógeno tras el pico.',
      },
    ],
    movement:
      'Tu techo de rendimiento del mes. Buen momento para una clase exigente, una carrera o levantar más peso.',
    tip: 'Es la fase más corta y la más fácil de desaprovechar. Si tenías algo que requiere presencia y energía, esta es tu semana.',
  },
  lutea: {
    summary:
      'La progesterona actúa como sedante natural, lo que baja la energía y puede afectar el estado de ánimo hacia el final de la fase. Al mismo tiempo, el cuerpo demanda más glucosa y serotonina — de ahí los antojos por dulce y carbohidratos.',
    feels: [
      'Más hambre, sobre todo por carbohidratos',
      'Hinchazón y sensibilidad en el pecho',
      'Ánimo más variable en los últimos días',
      'Sueño de peor calidad al final de la fase',
    ],
    eat: [
      {
        label: 'Carbohidratos complejos',
        why: 'Avena, batata y quinoa estabilizan la glucosa y bajan la intensidad de los antojos.',
      },
      {
        label: 'Vitamina B6',
        why: 'Plátano y garbanzos, que apoyan la producción de progesterona y la síntesis de serotonina.',
      },
      {
        label: 'Magnesio',
        why: 'Chocolate amargo, semillas de calabaza y verduras de hoja verde son buenas fuentes para esta fase.',
      },
      {
        label: 'Menos cafeína',
        why: 'Puede agravar la sensibilidad mamaria y los síntomas premenstruales en esta fase.',
      },
    ],
    movement:
      'Pilates, fuerza moderada, caminatas largas. Bajá la intensidad conforme se acerca el período en vez de pelear con el cansancio.',
    tip: 'El hambre de esta fase es real y tiene una causa metabólica. Comer más ahora no es un fallo de disciplina.',
  },
  },
  en: {
    menstrual: {
      summary:
        'The body in renewal mode. It clears out, rests and gets ready to start from zero — and it has very concrete reasons for asking you to slow down.',
      feels: [
        'Less energy and less drive to do much',
        'Cramps or heaviness low in the abdomen',
        'A need for more sleep',
        'Less tolerance for hard effort',
      ],
      eat: [
        { label: 'Iron', why: 'Between 30 and 80 ml of blood is lost. Lentils, spinach and red meat help replace it.' },
        { label: 'Magnesium', why: 'Associated with milder cramps. Dark chocolate, almonds, avocado.' },
        { label: 'Omega-3', why: 'Reduces inflammation and helps ease the pain typical of these days.' },
        { label: 'Warm, cooked food', why: 'Easier to digest when your system is asking for rest.' },
      ],
      movement:
        'Walking, stretching, gentle yoga. It is the worst week of the month to demand maximum strength of yourself, and the best one not to.',
      tip: 'If you can choose, leave demanding meetings and decisions for next week. Your clarity comes back on its own.',
    },
    folicular: {
      summary:
        'Energy comes back and the body starts to build. This is the phase where everything gets produced — and food can power that process from within.',
      feels: [
        'More energy and a better mood',
        'More clarity for thinking and deciding',
        'More appetite for socialising',
        'Better tolerance for demanding exercise',
      ],
      eat: [
        { label: 'Fresh, light foods', why: 'They keep pace with rising oestrogen without weighing digestion down.' },
        { label: 'Fermented foods', why: 'Yoghurt, kimchi and sauerkraut support oestrogen metabolism through the microbiome.' },
        { label: 'Cruciferous vegetables', why: 'Broccoli, cauliflower and cabbage support the liver pathway that processes oestrogen.' },
        { label: 'Flaxseed', why: 'Eating it in this first half of the cycle supports natural oestrogen production.' },
      ],
      movement:
        'The best window for strength, intervals or starting a new routine. Your body will take more now than it will in two weeks.',
      tip: 'Use this phase for whatever needs initiative: new projects, difficult conversations, learning something.',
    },
    ovulatoria: {
      summary:
        'With oestrogen at its highest point, testosterone also rises, boosting confidence, libido and decision-making. This is when body and mind are most in sync.',
      feels: [
        'A peak in energy and mood',
        'Feeling more sociable and talkative',
        'Changes in cervical fluid',
        'Some women notice a brief twinge on one side',
      ],
      eat: [
        { label: 'Antioxidants', why: 'Berries and leafy greens support egg health.' },
        { label: 'Raw vegetables', why: 'They are better tolerated now than at any other point in the cycle.' },
        { label: 'Zinc', why: 'Pumpkin seeds and shellfish, which help sustain this phase’s hormonal peak.' },
        { label: 'Fibre', why: 'Helps clear excess oestrogen after the peak.' },
      ],
      movement:
        'Your performance ceiling for the month. A good moment for a demanding class, a race or lifting heavier.',
      tip: 'It is the shortest phase and the easiest to waste. If you had something that needs presence and energy, this is your week.',
    },
    lutea: {
      summary:
        'Progesterone acts as a natural sedative, which lowers energy and can affect mood towards the end of the phase. At the same time, the body demands more glucose and serotonin — hence the cravings for sweets and carbohydrates.',
      feels: [
        'More hunger, especially for carbohydrates',
        'Bloating and breast tenderness',
        'A more changeable mood in the last few days',
        'Poorer quality sleep towards the end of the phase',
      ],
      eat: [
        { label: 'Complex carbohydrates', why: 'Oats, sweet potato and quinoa steady your blood sugar and take the edge off cravings.' },
        { label: 'Vitamin B6', why: 'Banana and chickpeas, which support progesterone production and serotonin synthesis.' },
        { label: 'Magnesium', why: 'Dark chocolate, pumpkin seeds and leafy greens are good sources for this phase.' },
        { label: 'Less caffeine', why: 'It can worsen breast tenderness and premenstrual symptoms in this phase.' },
      ],
      movement:
        'Pilates, moderate strength work, long walks. Ease the intensity down as your period approaches instead of fighting the tiredness.',
      tip: 'The hunger of this phase is real and has a metabolic cause. Eating more now is not a failure of discipline.',
    },
  },
};

export function getPhaseDetail(locale: Locale): Record<PhaseSlug, PhaseDetail> {
  return pick(PHASE_DETAIL_TEXT, locale);
}

/** @deprecated Spanish-only. Use getPhaseDetail(locale). */
export const PHASE_DETAIL = getPhaseDetail('es');
