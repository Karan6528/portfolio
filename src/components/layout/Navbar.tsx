import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { useLang } from '@/contexts/LanguageContext';

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { lang, setLang, t } = useLang();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-colors duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="font-display text-xl font-bold tracking-tight">K. LODHA</div>

      <nav className="hidden md:flex items-center gap-8 font-mono text-sm tracking-wider uppercase">
        <button onClick={() => scrollTo('about')} className="hover:text-primary transition-colors">
          {t('About', 'Profil')}
        </button>
        <button onClick={() => scrollTo('skills')} className="hover:text-primary transition-colors">
          {t('Skills', 'Kenntnisse')}
        </button>
        <button onClick={() => scrollTo('experience')} className="hover:text-primary transition-colors">
          {t('Experience', 'Erfahrung')}
        </button>
        <button onClick={() => scrollTo('projects')} className="hover:text-primary transition-colors">
          {t('Projects', 'Projekte')}
        </button>
        <button onClick={() => scrollTo('contact')} className="hover:text-primary transition-colors">
          {t('Contact', 'Kontakt')}
        </button>

        {/* Language Toggle */}
        <div className="flex items-center gap-1 border border-border rounded-sm overflow-hidden ml-4">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1 text-xs transition-colors ${
              lang === 'en' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('de')}
            className={`px-3 py-1 text-xs transition-colors ${
              lang === 'de' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            DE
          </button>
        </div>
      </nav>

      {/* Mobile: language toggle + menu hint */}
      <div className="md:hidden flex items-center gap-3">
        <div className="flex items-center gap-1 border border-border rounded-sm overflow-hidden">
          <button
            onClick={() => setLang('en')}
            className={`px-2 py-1 text-xs transition-colors ${
              lang === 'en' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('de')}
            className={`px-2 py-1 text-xs transition-colors ${
              lang === 'de' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            DE
          </button>
        </div>
        <button onClick={() => scrollTo('contact')} className="font-mono text-sm uppercase tracking-wider">
          Menu
        </button>
      </div>
    </motion.header>
  );
}
