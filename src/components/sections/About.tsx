import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';
import avatarImg from '@/assets/avatar.jpg';


const PROFILE: [string, string][] = [
  ['role', '"Data Scientist & AI Engineer"'],
  ['studying', '"M.Sc. Data Science, AI & Digital Business @ Gisma"'],
  ['based_in', '"Berlin, Germany"'],
  ['builds', '["RAG systems", "AI chatbots", "forecasting models", "risk scoring"]'],
  ['stack', '["Python", "SQL", "Scikit-learn", "FastAPI", "Docker", "React"]'],
  ['languages', '["English", "German", "Hindi", "Gujarati"]'],
];

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
                    'I am currently pursuing an M.Sc. in Data Science, AI and Digital Business at Gisma University of Applied Sciences in Berlin. I hold a B.E. in Computer Engineering from Vishwakarma Government Engineering College (CGPA 8.59) and enjoy building intelligent systems — from machine learning models to full-stack web applications.',
                    'Derzeit absolviere ich den M.Sc. Data Science, KI und Digital Business an der Gisma University of Applied Sciences in Berlin. Zuvor habe ich den B.E. in Computertechnik am Vishwakarma Government Engineering College abgeschlossen (CGPA 8,59) und begeistere mich für den Aufbau intelligenter Systeme — von Machine-Learning-Modellen bis hin zu Full-Stack-Webanwendungen.'
                  )}
                </p>
                <p>
                  {t(
                    'Three internships gave me hands-on experience with LLMs, RAG systems, data pipelines, and React-based frontends, so I can bridge data intelligence and user-facing products. I am looking for a data science internship or working student position in Germany.',
                    'Drei Praktika haben mir praktische Erfahrung mit LLMs, RAG-Systemen, Datenpipelines und React-Frontends gegeben, sodass ich Datenintelligenz mit nutzerorientierter Produktentwicklung verbinden kann. Ich suche ein Praktikum oder eine Werkstudentenstelle im Bereich Data Science in Deutschland.'
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

              {/* profile.py card */}
              <div className="mt-12 bg-foreground text-background font-mono text-xs md:text-sm p-6 overflow-x-auto">
                <div className="text-background/50 mb-4"># profile.py</div>
                <div className="leading-relaxed whitespace-pre">
{PROFILE.map(([key, value]) => (
  <div key={key}>
    {'    '}
    <span className="text-sky-300">{`"${key}"`}</span>
    {': '}
    <span className="text-emerald-300">{value}</span>
    {','}
  </div>
))}
                </div>
                <div className="mt-4">
                  <span className="text-background/50">{'>>> '}</span>
                  {'karan["open_to"]'}
                </div>
                <div className="text-emerald-300">
                  {t('"working student / internship in Germany"', '"Werkstudent / Praktikum in Deutschland"')}
                  <span className="inline-block w-2 h-4 bg-background ml-1 align-middle animate-pulse" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
