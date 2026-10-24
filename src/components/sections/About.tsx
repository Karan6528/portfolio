import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';
import avatarImg from '@/assets/avatar.jpg';


const PROFILE: [string, string][] = [
  ['role', '"Data Scientist & AI Engineer"'],
  ['studying', '"M.Sc. Data Science, AI & Digital Business @ Gisma"'],
  ['based_in', '"Berlin, Germany"'],
  ['worked_at', '["ScikIQ", "PRP Technologies", "Spectrics Solutions"]'],
  ['builds', '["RAG systems", "AI chatbots", "ML models", "funnel analytics", "dashboards"]'],
  ['stack', '["Python", "SQL", "Excel", "Scikit-learn", "FastAPI", "Docker", "React"]'],
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
                {t('Data Science. AI/ML. Business Analytics.', 'Data Science. KI/ML. Business Analytics.')}
              </h3>

              <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
                <p>
                  {t(
                    "I'm doing my M.Sc. in Data Science, AI & Digital Business at Gisma in Berlin. Before that I studied Computer Engineering in Ahmedabad: first a diploma at R.C. Technical Institute (CGPA 9.41), then a B.E. at Vishwakarma Government Engineering College (CGPA 8.59).",
                    'Ich mache meinen M.Sc. in Data Science, KI & Digital Business an der Gisma in Berlin. Davor habe ich in Ahmedabad Computertechnik studiert: zuerst ein Diplom am R.C. Technical Institute (CGPA 9,41), dann den B.E. am Vishwakarma Government Engineering College (CGPA 8,59).'
                  )}
                </p>
                <p>
                  {t(
                    'In three internships I built RAG systems and AI chatbots at ScikIQ, predictive models and Streamlit dashboards at PRP Technologies, and React frontends at Spectrics. So I know both sides: the model, and the screen someone actually uses it on.',
                    'In drei Praktika habe ich RAG-Systeme und KI-Chatbots bei ScikIQ gebaut, Vorhersagemodelle und Streamlit-Dashboards bei PRP Technologies und React-Frontends bei Spectrics. Ich kenne also beide Seiten: das Modell und die Oberfläche, mit der jemand wirklich arbeitet.'
                  )}
                </p>
                <p>
                  {t(
                    "Lately I've been doing more analytics with SQL and Excel, and building ML projects the way they would run in a company, with tests, Docker and monitoring. I'm looking for a working student job or an internship in data science or analytics in Germany.",
                    'Zuletzt habe ich mehr Analytics mit SQL und Excel gemacht und ML-Projekte so gebaut, wie sie in einer Firma laufen würden, mit Tests, Docker und Monitoring. Ich suche eine Werkstudentenstelle oder ein Praktikum in Data Science oder Analytics in Deutschland.'
                  )}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
                {[
                  { value: '3', label: t('Internships', 'Praktika') },
                  { value: '6', label: t('Projects', 'Projekte') },
                  { value: '8.59', label: t('B.E. CGPA', 'B.E. CGPA') },
                  { value: '9.41', label: t('Diploma CGPA', 'Diplom CGPA') },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl font-display font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
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
