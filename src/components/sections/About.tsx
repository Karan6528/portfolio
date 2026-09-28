import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';
import avatarImg from '@/assets/avatar.jpg';

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="aspect-[4/5] bg-muted relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10 transition-opacity group-hover:opacity-0" />
              <img
                src={avatarImg}
                alt="Karan Lodha"
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-0 right-0 w-32 h-32 border-l border-b border-background/20 z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 border-r border-t border-background/20 z-20 pointer-events-none" />
            </motion.div>
          </div>

          <div className="lg:col-span-7 lg:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-mono text-sm text-primary uppercase tracking-widest mb-6">
                {t('01 // About', '01 // Profil')}
              </h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-8">
                {t('Data Science. AI/ML. Web Development.', 'Data Science. KI/ML. Webentwicklung.')}
              </h3>

              <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
                <p>
                  {t(
                    'I am a Computer Engineering graduate from Vishwakarma Government Engineering College (CGPA 8.59), passionate about building intelligent systems — from machine learning models to full-stack web applications.',
                    'Ich bin Absolvent der Computertechnik vom Vishwakarma Government Engineering College (CGPA 8,59) und begeistere mich für den Aufbau intelligenter Systeme — von Machine-Learning-Modellen bis hin zu Full-Stack-Webanwendungen.'
                  )}
                </p>
                <p>
                  {t(
                    'With hands-on experience in LLMs, RAG systems, data pipelines, and React-based frontends, I bridge the gap between data intelligence and user-facing products. Currently interning at ScikIQ Data Pvt. Ltd., working on enterprise AI solutions.',
                    'Mit praktischer Erfahrung in LLMs, RAG-Systemen, Datenpipelines und React-Frontends verbinde ich Datenintelligenz mit nutzerorientierter Produktentwicklung. Derzeit Praktikant bei ScikIQ Data Pvt. Ltd. mit Fokus auf KI-Lösungen für Unternehmen.'
                  )}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-border pt-12">
                <div>
                  <div className="text-4xl font-display font-bold text-foreground mb-2">9+</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {t('Major Projects', 'Hauptprojekte')}
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-foreground mb-2">3</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {t('Internships', 'Praktika')}
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-foreground mb-2">8.59</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {t('CGPA', 'CGPA')}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
