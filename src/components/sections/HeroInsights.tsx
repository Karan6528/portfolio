import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';

// Real results from my projects. Numbers come from the project READMEs,
// so if I rerun an analysis I only need to update them here.
type Bar = { label: string; value: number; display: string; highlight?: boolean };

type Insight = {
  source: string;
  question: { en: string; de: string };
  query: string;
  bars: Bar[];
  max: number;
  takeaway: { en: string; de: string };
};

const INSIGHTS: Insight[] = [
  {
    source: 'sales-funnel / solar',
    question: {
      en: 'Does it matter how fast we call a lead?',
      de: 'Macht es einen Unterschied, wie schnell wir anrufen?',
    },
    query: `SELECT call_delay, AVG(booked) AS booking_rate
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
    source: 'sales-funnel / solar',
    question: {
      en: 'Which channel brings the cheapest customers?',
      de: 'Welcher Kanal bringt die günstigsten Kunden?',
    },
    query: `SELECT channel, spend / contracts AS cost_per_contract
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
    source: 'sales-funnel / olist',
    question: {
      en: 'Which lead sources actually turn into sellers?',
      de: 'Welche Lead-Quellen werden wirklich zu Verkäufern?',
    },
    query: `SELECT origin, COUNT(deal_id) * 1.0 / COUNT(*) AS conv
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
];

const CYCLE_MS = 7000;

export function HeroInsights() {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [typed, setTyped] = useState(0);

  const insight = INSIGHTS[index];

  // move to the next finding every few seconds (stops while hovered)
  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % INSIGHTS.length), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduceMotion]);

  // type the query out character by character
  useEffect(() => {
    if (reduceMotion) {
      setTyped(insight.query.length);
      return;
    }
    setTyped(0);
    const id = window.setInterval(() => {
      setTyped((n) => {
        if (n >= insight.query.length) {
          window.clearInterval(id);
          return n;
        }
        return n + 2;
      });
    }, 18);
    return () => window.clearInterval(id);
  }, [index, insight.query.length, reduceMotion]);

  const queryDone = typed >= insight.query.length;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="w-full border border-foreground bg-background/90 backdrop-blur-sm shadow-[8px_8px_0_0_hsl(var(--foreground))]"
      aria-label={t('Findings from my projects', 'Ergebnisse aus meinen Projekten')}
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-foreground px-5 py-3 font-mono text-[11px] uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 bg-primary" />
          {t('From my projects', 'Aus meinen Projekten')}
        </span>
        <span className="text-muted-foreground">~/{insight.source}</span>
      </div>

      <div className="px-5 pt-5 pb-4 min-h-[340px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-2">
              Q{index + 1}.
            </p>
            <h4 className="font-display text-xl font-semibold leading-snug mb-4">
              {insight.question[lang]}
            </h4>

            <pre className="font-mono text-[11px] leading-relaxed text-muted-foreground bg-muted/60 px-3 py-2 mb-5 whitespace-pre-wrap min-h-[3.4rem]">
              {insight.query.slice(0, typed)}
              {!queryDone && <span className="inline-block w-[6px] h-3 bg-foreground align-middle animate-pulse" />}
            </pre>

            <div className="space-y-2.5 mb-5">
              {insight.bars.map((bar, i) => (
                <div key={bar.label} className="grid grid-cols-[84px_1fr_48px] items-center gap-3">
                  <span className="font-mono text-[11px] text-muted-foreground truncate">{bar.label}</span>
                  <div className="h-3 bg-muted relative overflow-hidden">
                    <motion.div
                      className={`absolute inset-y-0 left-0 ${bar.highlight ? 'bg-primary' : 'bg-foreground/40'}`}
                      initial={{ width: 0 }}
                      animate={{ width: queryDone ? `${(bar.value / insight.max) * 100}%` : 0 }}
                      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <span className="font-mono text-xs font-medium text-right">{bar.display}</span>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: queryDone ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-auto text-sm leading-relaxed border-l-2 border-primary pl-3"
            >
              {insight.takeaway[lang]}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* footer: switch between findings */}
      <div className="flex items-center justify-between border-t border-foreground px-5 py-3">
        <div className="flex gap-2">
          {INSIGHTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`${t('Show finding', 'Ergebnis anzeigen')} ${i + 1}`}
              className="relative h-1 w-8 bg-muted overflow-hidden"
            >
              {i === index && (
                <motion.span
                  key={`${index}-${paused}`}
                  className="absolute inset-y-0 left-0 bg-foreground"
                  initial={{ width: paused || reduceMotion ? '100%' : 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: paused || reduceMotion ? 0 : CYCLE_MS / 1000, ease: 'linear' }}
                />
              )}
              {i < index && <span className="absolute inset-0 bg-foreground/40" />}
            </button>
          ))}
        </div>
        <button
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          className="font-mono text-[11px] uppercase tracking-widest text-primary hover:underline"
        >
          {t('See the project', 'Zum Projekt')} →
        </button>
      </div>
    </motion.aside>
  );
}
