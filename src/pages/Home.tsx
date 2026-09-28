import { useState, useEffect } from 'react';
import { PageLoader } from '@/components/layout/PageLoader';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : 'auto';
  }, [loading]);

  return (
    <LanguageProvider>
      <div className="bg-noise relative min-h-screen selection:bg-primary selection:text-primary-foreground">
        <AnimatePresence>
          {loading && <PageLoader onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        <Navbar />

        <main className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000 delay-300'}>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
