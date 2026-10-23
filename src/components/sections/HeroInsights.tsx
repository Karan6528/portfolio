import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';

// A small "console" in the hero that lets visitors flick through my projects.
// Numbers only appear where the project actually published them (READMEs),
// everything else is shown as a "how it works" flow.

type T = { en: string; de: string };
type Bar = { label: string; value: number; display: string; highlight?: boolean };

type Slide =
  | {
      kind: 'finding';
      question: T;
      code: string;
      bars: Bar[];
      max: number;
      takeaway: T;
    }
  | {
      kind: 'flow';
      question: T;
      steps: T[];
      takeaway: T;
    };

type ProjectEntry = {
  id: string;
  tab: string;
  name: string;
  stack: string;
  slides: Slide[];
};

const PROJECTS: ProjectEntry[] = [
  {
    id: 'funnel',
    tab: 'Funnel',
    name: 'Sales Funnel Analytics',
    stack: 'SQL · Excel · Python · Streamlit',
    slides: [
      {
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
        kind: 'finding',
        question: {
          en: 'Which channel brings the cheapest customers?',
          de: 'Welcher Kanal bringt die günstigsten Kunden?',
        },
        code: `SELECT channel, spend / contracts AS cost_per_contract
FROM channel_kpis ORDER BY 2;`,
        bars: [
          { label: 'Organic', value: 121, display: '€121', highlight: true },
          { label: 'Referral', value: 166, display: '€166', highlight: true },
          { label: 'Meta Ads', value: 616, display: '€616' },
        ],
        max: 650,
        takeaway: {
          en: 'Meta has the cheapest leads (€28) but the most expensive contracts.',
          de: 'Meta hat die günstigsten Leads (28 €), aber die teuersten Verträge.',
        },
      },
      {
        kind: 'finding',
        question: {
          en: 'Which lead sources actually turn into sellers?',
          de: 'Welche Lead-Quellen werden wirklich zu Verkäufern?',
        },
        code: `SELECT origin, COUNT(deal_id) * 1.0 / COUNT(*) AS conv
FROM leads LEFT JOIN deals USING (lead_id) GROUP BY 1;`,
        bars: [
          { label: 'Untracked', value: 21, display: '21%', highlight: true },
          { label: 'Search', value: 15, display: '15%' },
          { label: 'Social', value: 6.3, display: '6.3%' },
          { label: 'Email', value: 4, display: '4.0%' },
        ],
        max: 25,
        takeaway: {
          en: 'The best "channel" is untracked. Fix tracking before moving budget.',
          de: 'Der beste „Kanal“ ist unbekannt. Erst Tracking reparieren, dann Budget verschieben.',
        },
      },
    ],
  },
  {
    id: 'credit',
    tab: 'Credit risk',
    name: 'Credit Risk Scoring',
    stack: 'XGBoost · SHAP · MLflow · FastAPI · Docker',
    slides: [
      {
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
        kind: 'flow',
        question: {
          en: 'What happens after model.fit()?',
          de: 'Was passiert nach model.fit()?',
        },
        steps: [
          { en: 'Shared features for training and serving', de: 'Gleiche Features für Training und Serving' },
          { en: 'Logistic regression vs XGBoost, tracked in MLflow', de: 'Logistische Regression vs. XGBoost, getrackt in MLflow' },
          { en: 'Isotonic calibration so probabilities mean something', de: 'Isotone Kalibrierung, damit Wahrscheinlichkeiten stimmen' },
          { en: 'SHAP reasons for every decision', de: 'SHAP-Begründung für jede Entscheidung' },
          { en: 'FastAPI in Docker, drift check with PSI', de: 'FastAPI in Docker, Drift-Check mit PSI' },
        ],
        takeaway: {
          en: 'Built like a product, not a notebook. CI runs training and tests on every push.',
          de: 'Gebaut wie ein Produkt, nicht wie ein Notebook. CI trainiert und testet bei jedem Push.',
        },
      },
    ],
  },
  {
    id: 'documentor',
    tab: 'Documentor',
    name: 'Ask Documentor',
    stack: 'Next.js · Redux · FastAPI · Docker',
    slides: [
      {
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
    ],
  },
  {
    id: 'forecast',
    tab: 'Forecast',
    name: 'Time Series Forecasting',
    stack: 'Python · Scikit-learn · Pandas · Matplotlib',
    slides: [
      {
        kind: 'flow',
        question: {
          en: 'Where is this stock price heading?',
          de: 'Wohin entwickelt sich dieser Aktienkurs?',
        },
        steps: [
          { en: 'Load historical stock prices', de: 'Historische Aktienkurse laden' },
          { en: 'Clean the data and build time-based features', de: 'Daten bereinigen und zeitbasierte Features bauen' },
          { en: 'Train models on past data, test on later data', de: 'Modelle auf alten Daten trainieren, auf neueren testen' },
          { en: 'Plot the forecast against what really happened', de: 'Prognose gegen den echten Verlauf plotten' },
        ],
        takeaway: {
          en: 'Turns price history into a trend view you can actually read.',
          de: 'Macht aus Kursdaten einen Trend, den man wirklich lesen kann.',
        },
      },
    ],
  },
  {
    id: 'fraud',
    tab: 'Fraud',
    name: 'Credit Card Fraud Detection',
    stack: 'Python · Scikit-learn · Pandas',
    slides: [
      {
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
    ],
  },
];

// one flat list so the panel can auto-play through everything
const SLIDES = PROJECTS.flatMap((p, pi) =>
  p.slides.map((s, si) => ({ projectIndex: pi, slideIndex: si, slide: s })),
);

const CYCLE_MS = 7500;

export function HeroInsights() {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const [pos, setPos] = useState(0);
  const [paused, setPaused] = useState(false);
  const [typed, setTyped] = useState({ pos: 0, n: 0 });

  const { projectIndex, slideIndex, slide } = SLIDES[pos];
  const project = PROJECTS[projectIndex];
  const code = slide.kind === 'finding' ? slide.code : '';

  const firstSlideOf = useMemo(
    () => PROJECTS.map((_, pi) => SLIDES.findIndex((s) => s.projectIndex === pi)),
    [],
  );

  // auto-advance (stops while hovered, or if the visitor prefers less motion)
  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setTimeout(() => setPos((p) => (p + 1) % SLIDES.length), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [pos, paused, reduceMotion]);

  // type the code out (tagged with the slide position so an old count
  // from the previous slide never counts as "done" for the new one)
  useEffect(() => {
    if (reduceMotion || !code) {
      setTyped({ pos, n: code.length });
      return;
    }
    setTyped({ pos, n: 0 });
    const id = window.setInterval(() => {
      setTyped((cur) => {
        if (cur.n >= code.length) {
          window.clearInterval(id);
          return cur;
        }
        return { pos, n: cur.n + 2 };
      });
    }, 18);
    return () => window.clearInterval(id);
  }, [pos, code, reduceMotion]);

  const shown = typed.pos === pos ? typed.n : 0;
  const ready = shown >= code.length;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="w-full border border-foreground bg-background/90 backdrop-blur-sm shadow-[8px_8px_0_0_hsl(var(--foreground))]"
      aria-label={t('Look inside my projects', 'Ein Blick in meine Projekte')}
    >
      {/* project picker */}
      <div className="flex overflow-x-auto border-b border-foreground [scrollbar-width:none]" role="tablist">
        {PROJECTS.map((p, pi) => {
          const active = pi === projectIndex;
          return (
            <button
              key={p.id}
              role="tab"
              aria-selected={active}
              onClick={() => setPos(firstSlideOf[pi])}
              className={`flex-1 shrink-0 px-2.5 py-2.5 font-mono text-[10px] uppercase tracking-wider border-r border-foreground last:border-r-0 transition-colors ${
                active ? 'bg-foreground text-background' : 'hover:bg-muted'
              }`}
            >
              {p.tab}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between px-5 pt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>{project.name}</span>
        <span>
          {slideIndex + 1}/{project.slides.length}
        </span>
      </div>

      <div className="px-5 pt-3 pb-4 h-[330px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={pos}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1"
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

      {/* footer */}
      <div className="flex items-center justify-between gap-4 border-t border-foreground px-5 py-3">
        <div className="flex items-center gap-2">
          {project.slides.map((_, si) => {
            const target = firstSlideOf[projectIndex] + si;
            const isCurrent = target === pos;
            return (
              <button
                key={si}
                onClick={() => setPos(target)}
                aria-label={`${t('Show', 'Zeige')} ${si + 1}`}
                className="relative h-1 w-6 bg-muted overflow-hidden"
              >
                {isCurrent && (
                  <motion.span
                    key={`${pos}-${paused}`}
                    className="absolute inset-y-0 left-0 bg-foreground"
                    initial={{ width: paused || reduceMotion ? '100%' : 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: paused || reduceMotion ? 0 : CYCLE_MS / 1000, ease: 'linear' }}
                  />
                )}
                {si < slideIndex && <span className="absolute inset-0 bg-foreground/40" />}
              </button>
            );
          })}
          <span className="ml-2 font-mono text-[10px] text-muted-foreground truncate max-w-[170px]">
            {project.stack}
          </span>
        </div>
        <button
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-primary hover:underline"
        >
          {t('All projects', 'Alle Projekte')} →
        </button>
      </div>
    </motion.aside>
  );
}
