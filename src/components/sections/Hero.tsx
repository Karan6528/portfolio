import { motion, type Variants } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';
import cvFile from '@/assets/Karan_lodha_CV.pdf';

export function Hero() {
  const { t } = useLang();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 },
    },
  };

  const item: Variants = {
    hidden: { y: 100, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 pt-24 overflow-hidden">
      {/* Background architectural grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto w-full z-10"
      >
        <div className="overflow-hidden mb-4">
          <motion.div variants={item} className="font-mono text-sm md:text-base uppercase tracking-widest text-primary font-medium">
            {t('Data Scientist & AI Engineer · Berlin, Germany', 'Data Scientist & KI-Ingenieur · Berlin, Deutschland')}
          </motion.div>
        </div>

        <div className="overflow-hidden mb-2">
          <motion.h1 variants={item} className="text-5xl md:text-8xl lg:text-[10rem] font-bold leading-none tracking-tighter">
            KARAN
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-12">
          <motion.h1 variants={item} className="text-5xl md:text-8xl lg:text-[10rem] font-bold leading-none tracking-tighter text-muted-foreground">
            LODHA.
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="overflow-hidden">
            <motion.p variants={item} className="text-lg md:text-xl font-light leading-relaxed max-w-lg">
              {t(
                'M.Sc. student in Data Science, AI & Digital Business at Gisma University of Applied Sciences (Berlin), with a B.E. in Computer Engineering. Experienced in machine learning, time series forecasting, and LLM applications such as RAG systems and AI chatbots.',
                'M.Sc.-Student in Data Science, KI & Digital Business an der Gisma University of Applied Sciences (Berlin) mit einem B.E. in Computertechnik. Erfahrung in maschinellem Lernen, Zeitreihenprognosen und LLM-Anwendungen wie RAG-Systemen und KI-Chatbots.'
              )}
            </motion.p>
            <motion.div
              variants={item}
              className="mt-6 inline-flex items-center gap-3 border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              {t(
                'Open to working student roles & internships · Germany',
                'Offen für Werkstudentenstellen & Praktika · Deutschland'
              )}
            </motion.div>
          </div>
          <div className="flex flex-col justify-end items-start md:items-end overflow-hidden">
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-foreground text-background font-mono text-sm uppercase tracking-widest hover:bg-primary transition-colors"
              >
                {t('View Projects', 'Projekte ansehen')}
              </button>
              <a
                href={cvFile}
                download="Karan_Lodha_CV.pdf"
                className="px-8 py-4 border border-foreground font-mono text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
              >
                {t('Download CV', 'Lebenslauf herunterladen')}
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator (bottom centre, away from the text) */}
      <div className="hidden md:flex absolute bottom-6 inset-x-0 justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-14 bg-border relative overflow-hidden">
            <motion.div
              className="w-full h-1/2 bg-foreground absolute top-0"
              animate={{ top: ['-50%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
