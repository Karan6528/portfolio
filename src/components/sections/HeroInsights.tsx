import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';

// A small "console" in the hero: one slide per project, one topic each.
// Numbers only appear where the project actually published them (READMEs),
// the rest is shown as a short "how it works" flow.

type T = { en: string; de: string };
type Bar = { label: string; value: number; display: string; highlight?: boolean };

type Slide = {
  short: string; // label in the progress bar at the bottom
  path: string; // project name shown top right, changes with every slide
  question: T;
  takeaway: T;
} & (
  | { kind: 'finding'; code: string; bars: Bar[]; max: number }
  | { kind: 'flow'; steps: T[] }
);

const SLIDES: Slide[] = [
  {
    short: 'Funnel',
    path: 'sales-funnel-analytics',
    kind: 'finding',
    question: {
      en: 'Does it matter how fast we call a lead?',
      de: 'Macht es einen Unterschied, wie schnell wir anrufen?',
    },
    code: `SELECT call_delay, AVG(booked) AS booking_rate
FROM leads GROUP BY call_delay;`,
    bars: [
      { label: '< 1 hour', value: 53, display: '53%', highlight: true },
      { label: '1–3 days', value: 25, display: '25%' },
    ],
    max: 60,
    takeaway: {
      en: 'Calling within the hour roughly doubles booked appointments.',
      de: 'Anruf innerhalb einer Stunde verdoppelt etwa die Terminbuchungen.',
    },
  },
  {
    short: 'Credit',
    path: 'credit-risk-scoring',
    kind: 'finding',
    question: {
      en: 'Why not just judge the model on accuracy?',
      de: 'Warum das Modell nicht einfach nach Genauigkeit bewerten?',
    },
    code: `# src/train.py
cost = fn * COST_FALSE_NEGATIVE + fp * COST_FALSE_POSITIVE`,
    bars: [
      { label: 'Missed default', value: 10, display: '10×', highlight: true },
      { label: 'Wrong decline', value: 1, display: '1×' },
    ],
    max: 10,
    takeaway: {
      en: 'With 3–6% defaults, "nobody defaults" already scores over 94% accuracy. So I pick the threshold that costs the least, not 0.5.',
      de: 'Bei 3–6 % Ausfällen erreicht „niemand fällt aus“ schon über 94 % Genauigkeit. Deshalb wähle ich den Schwellenwert mit den geringsten Kosten, nicht 0,5.',
    },
  },
  {
    short: 'Docs',
    path: 'ask-documentor',
    kind: 'flow',
    question: {
      en: 'How do you ask questions to a PDF?',
      de: 'Wie stellt man einem PDF Fragen?',
    },
    steps: [
      { en: 'Upload a PDF in the Next.js app', de: 'PDF in der Next.js-App hochladen' },
      { en: 'FastAPI backend reads and processes the document', de: 'FastAPI-Backend liest und verarbeitet das Dokument' },
      { en: 'An LLM answers questions about the content', de: 'Ein LLM beantwortet Fragen zum Inhalt' },
      { en: 'Get summaries without reading every page', de: 'Zusammenfassungen, ohne jede Seite zu lesen' },
    ],
    takeaway: {
      en: 'Full-stack: frontend, API and the LLM part, all running in Docker.',
      de: 'Full-Stack: Frontend, API und LLM-Teil, alles in Docker.',
    },
  },
  {
    short: 'Forecast',
    path: 'time-series-forecasting',
    kind: 'flow',
    question: {
      en: 'Where is this stock price heading?',
      de: 'Wohin entwickelt sich dieser Aktienkurs?',
    },
    steps: [
      { en: 'Load historical stock prices', de: 'Historische Aktienkurse laden' },
      { en: 'Clean the data and build time-based features', de: 'Daten bereinigen und zeitbasierte Features bauen' },
      { en: 'Train on past data, test on later data', de: 'Auf alten Daten trainieren, auf neueren testen' },
      { en: 'Plot the forecast against what really happened', de: 'Prognose gegen den echten Verlauf plotten' },
    ],
    takeaway: {
      en: 'Turns price history into a trend view you can actually read.',
      de: 'Macht aus Kursdaten einen Trend, den man wirklich lesen kann.',
    },
  },
  {
    short: 'Fraud',
    path: 'fraud-detection',
    kind: 'flow',
    question: {
      en: 'Is this card transaction fraud?',
      de: 'Ist diese Kartenzahlung Betrug?',
    },
    steps: [
      { en: 'Look at transaction behaviour patterns', de: 'Muster im Transaktionsverhalten ansehen' },
      { en: 'Handle the fact that fraud is very rare', de: 'Berücksichtigen, dass Betrug sehr selten ist' },
      { en: 'Train and compare ML classifiers', de: 'ML-Klassifikatoren trainieren und vergleichen' },
      { en: 'Flag suspicious transactions', de: 'Verdächtige Transaktionen markieren' },
    ],
    takeaway: {
      en: 'Same problem as credit risk: the rare case is the one that costs money.',
      de: 'Gleiches Problem wie beim Kreditrisiko: Der seltene Fall kostet das Geld.',
    },
  },
];

const CYCLE_MS = 7000;
const SWIPE_PX = 50;

export function HeroInsights() {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [typed, setTyped] = useState({ index: 0, n: 0 });

  const slide = SLIDES[index];
  const code = slide.kind === 'finding' ? slide.code : '';

  const goTo = (next: number) => {
    setDirection(next >= index ? 1 : -1);
    setIndex((next + SLIDES.length) % SLIDES.length);
  };

  // move on by itself (stops while hovered, or if the visitor prefers less motion)
  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setTimeout(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % SLIDES.length);
    }, CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduceMotion]);

  // type the code out; tagged with the slide index so an old count never
  // counts as "done" for the next slide
  useEffect(() => {
    if (reduceMotion || !code) {
      setTyped({ index, n: code.length });
      return;
    }
    setTyped({ index, n: 0 });
    const id = window.setInterval(() => {
      setTyped((cur) => {
        if (cur.n >= code.length) {
          window.clearInterval(id);
          return cur;
        }
        return { index, n: cur.n + 2 };
      });
    }, 18);
    return () => window.clearInterval(id);
  }, [index, code, reduceMotion]);

  const shown = typed.index === index ? typed.n : 0;
  const ready = shown >= code.length;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_PX) goTo(index + 1);
    else if (info.offset.x > SWIPE_PX) goTo(index - 1);
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="w-full border border-foreground bg-background/90 backdrop-blur-sm shadow-[8px_8px_0_0_hsl(var(--foreground))] select-none"
      aria-label={t('Findings from my projects', 'Ergebnisse aus meinen Projekten')}
      aria-roledescription="carousel"
    >
      {/* header: project name changes with the slide */}
      <div className="flex items-center justify-between gap-4 border-b border-foreground px-5 py-3 font-mono text-[11px] uppercase tracking-widest">
        <span className="flex items-center gap-2 shrink-0">
          <span className="h-2 w-2 bg-primary" />
          {t('From my projects', 'Aus meinen Projekten')}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={slide.path}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground truncate"
          >
            ~/{slide.path}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* slide: drag or swipe left/right to switch */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: reduceMotion ? 0 : direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : direction * -40 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={onDragEnd}
            className="px-5 pt-5 pb-4 h-[340px] flex flex-col cursor-grab active:cursor-grabbing"
          >
            <h4 className="font-display text-xl font-semibold leading-snug mb-4">{slide.question[lang]}</h4>

            {slide.kind === 'finding' ? (
              <>
                <pre className="font-mono text-[11px] leading-relaxed text-muted-foreground bg-muted/60 px-3 py-2 mb-5 whitespace-pre-wrap min-h-[3.4rem]">
                  {code.slice(0, shown)}
                  {!ready && <span className="inline-block w-[6px] h-3 bg-foreground align-middle animate-pulse" />}
                </pre>
                <div className="space-y-2.5 mb-4">
                  {slide.bars.map((bar, i) => (
                    <div key={bar.label} className="grid grid-cols-[96px_1fr_44px] items-center gap-3">
                      <span className="font-mono text-[11px] text-muted-foreground truncate">{bar.label}</span>
                      <div className="h-3 bg-muted relative overflow-hidden">
                        <motion.div
                          className={`absolute inset-y-0 left-0 ${bar.highlight ? 'bg-primary' : 'bg-foreground/40'}`}
                          initial={{ width: 0 }}
                          animate={{ width: ready ? `${(bar.value / slide.max) * 100}%` : 0 }}
                          transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                      <span className="font-mono text-xs font-medium text-right">{bar.display}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <ol className="space-y-2 mb-4">
                {slide.steps.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.15 + i * 0.12 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span className="font-mono text-[11px] text-primary mt-[3px] w-5 shrink-0">0{i + 1}</span>
                    <span>{step[lang]}</span>
                  </motion.li>
                ))}
              </ol>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0 }}
              transition={{ duration: 0.4, delay: slide.kind === 'flow' ? 0.7 : 0.5 }}
              className="mt-auto text-sm leading-relaxed border-l-2 border-primary pl-3"
            >
              {slide.takeaway[lang]}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* all projects as one progress bar; it moves by itself, click to jump */}
      <div className="grid grid-cols-5 gap-2 border-t border-foreground px-5 py-3">
        {SLIDES.map((s, i) => {
          const isCurrent = i === index;
          return (
            <button
              key={s.short}
              onClick={() => goTo(i)}
              aria-label={`${t('Show', 'Zeige')} ${s.short}`}
              aria-current={isCurrent}
              className="flex flex-col gap-1.5 text-left group"
            >
              <span className="relative block h-[3px] w-full bg-muted overflow-hidden">
                {isCurrent && (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="absolute inset-y-0 left-0 bg-foreground"
                    initial={{ width: paused || reduceMotion ? '100%' : 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: paused || reduceMotion ? 0 : CYCLE_MS / 1000, ease: 'linear' }}
                  />
                )}
                {i < index && <span className="absolute inset-0 bg-foreground/40" />}
              </span>
              <span
                className={`font-mono text-[10px] uppercase tracking-wider transition-colors ${
                  isCurrent ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                }`}
              >
                {s.short}
              </span>
            </button>
          );
        })}
      </div>
    </motion.aside>
  );
}
