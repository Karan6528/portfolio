import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';

// Company images: put files in src/assets/companies/ named after the "logo" key
// below (e.g. scikiq.png, prp.png, spectrics.png). png, jpg, jpeg, svg and webp
// all work. If a file is missing, that entry simply shows no image.
const logoFiles = import.meta.glob('../../assets/companies/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function getLogo(key: string): string | undefined {
  const match = Object.keys(logoFiles).find((path) => {
    const file = path.split('/').pop() ?? '';
    return file.replace(/\.[^.]+$/, '').toLowerCase() === key;
  });
  return match ? logoFiles[match] : undefined;
}

interface ExperienceItem {
  company: string;
  logo: string; // file name (without extension) in src/assets/companies/
  location: string;
  role: string;
  period: string;
  description: string;
  imageClass?: string; // optional Tailwind height class for the image, default max-h-40
  caption?: string; // optional caption shown under the image
}

const EXPERIENCE: Record<'en' | 'de', ExperienceItem[]> = {
  en: [
    {
      company: 'ScikIQ Data Private Limited',
      logo: 'scikiq',
      imageClass: 'max-h-96',
      caption: 'Award · Innovative Data Solution Provider — The Economic Times Enterprise AI Awards 2026',
      location: 'Gurugram',
      role: 'Data Science Intern',
      period: '02/2026 — 06/2026',
      description:
        'Working on Large Language Models (LLMs) and AI-powered applications. Developed Retrieval-Augmented Generation (RAG) systems for intelligent document retrieval and question answering. Built AI chatbot solutions and automated data processing pipelines.',
    },
    {
      company: 'PRP Technologies',
      logo: 'prp',
      location: 'Ahmedabad',
      role: 'Data Science Intern',
      period: '01/2025 — 04/2025',
      description:
        'Three-month internship focused on data pre-processing, exploratory analysis, and machine learning using Python. Worked with real-world datasets, developed predictive models, and gained hands-on experience with Pandas, NumPy, Scikit-learn, Matplotlib, and Streamlit.',
    },
    {
      company: 'Spectrics Solutions',
      logo: 'spectrics',
      location: 'Ahmedabad',
      role: 'ReactJS Intern',
      period: '06/2024 — 07/2024',
      description:
        '15-day intensive internship in front-end web development. Gained hands-on experience with HTML, CSS, JavaScript, and React.js. Designed and optimized user interfaces, implemented responsive design, and built interactive web applications.',
    },
  ],
  de: [
    {
      company: 'ScikIQ Data Private Limited',
      logo: 'scikiq',
      imageClass: 'max-h-96',
      caption: 'Auszeichnung · Innovative Data Solution Provider — The Economic Times Enterprise AI Awards 2026',
      location: 'Gurugram',
      role: 'Data-Science-Praktikant',
      period: '02/2026 — 06/2026',
      description:
        'Arbeit an Large Language Models (LLMs) und KI-gestützten Anwendungen. Entwicklung von Retrieval-Augmented Generation (RAG)-Systemen für intelligente Dokumentenabfrage und Fragebeantwortung. Aufbau von KI-Chatbot-Lösungen und automatisierten Datenpipelines.',
    },
    {
      company: 'PRP Technologies',
      logo: 'prp',
      location: 'Ahmedabad',
      role: 'Data-Science-Praktikant',
      period: '01/2025 — 04/2025',
      description:
        'Dreimonatiges Praktikum mit Fokus auf Datenvorverarbeitung, explorative Analyse und maschinelles Lernen mit Python. Entwicklung von Vorhersagemodellen und praktische Erfahrung mit Pandas, NumPy, Scikit-learn, Matplotlib und Streamlit.',
    },
    {
      company: 'Spectrics Solutions',
      logo: 'spectrics',
      location: 'Ahmedabad',
      role: 'ReactJS-Praktikant',
      period: '06/2024 — 07/2024',
      description:
        '15-tägiges intensives Praktikum in der Front-End-Webentwicklung. Praktische Erfahrung mit HTML, CSS, JavaScript und React.js. Design und Optimierung von Benutzeroberflächen sowie Erstellung interaktiver Webanwendungen.',
    },
  ],
};

export function Experience() {
  const { lang, t } = useLang();
  const items = EXPERIENCE[lang];

  return (
    <section id="experience" className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-24"
        >
          <h2 className="font-mono text-sm text-primary uppercase tracking-widest mb-6">
            {t('03 // Experience', '03 // Erfahrung')}
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold">
            {t('Internships', 'Praktika')}
          </h3>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[7.5px] md:left-1/2 top-0 bottom-0 w-[1px] bg-border" />

          <div className="space-y-24">
            {items.map((exp, i) => {
              const logo = getLogo(exp.logo);
              const textOnLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${
                    textOnLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-[7.5px] md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 mt-1.5 ring-4 ring-background" />

                  {/* Text side */}
                  <div
                    className={`pl-12 md:pl-0 md:w-1/2 ${
                      textOnLeft ? 'md:pr-20 text-left md:text-right' : 'md:pl-20 text-left'
                    }`}
                  >
                    <div className="font-mono text-xs text-primary mb-2 uppercase tracking-widest">{exp.period}</div>
                    <h4 className="text-2xl font-display font-bold mb-1">{exp.role}</h4>
                    <div className="text-lg font-medium text-foreground mb-1">{exp.company}</div>
                    <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">{exp.location}</div>
                    <p className="text-muted-foreground font-light leading-relaxed">{exp.description}</p>
                  </div>

                  {/* Image side (opposite half of the timeline) */}
                  {logo && (
                    <div
                      className={`pl-12 md:pl-0 md:w-1/2 flex ${
                        textOnLeft ? 'md:pl-20 md:justify-start' : 'md:pr-20 md:justify-end'
                      }`}
                    >
                      <div className="border border-border bg-background p-4 inline-flex flex-col items-center gap-4 max-w-full">
                        <img
                          src={logo}
                          alt={exp.company}
                          className={`${exp.imageClass ?? 'max-h-40'} w-auto max-w-full object-contain`}
                        />
                        {exp.caption && (
                          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground text-center max-w-xs">
                            {exp.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 pt-16 border-t border-border"
        >
          <h3 className="font-mono text-sm text-primary uppercase tracking-widest mb-12">
            {t('Education', 'Ausbildung')}
          </h3>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16">
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest whitespace-nowrap pt-1">2022 — 2025</div>
              <div>
                <div className="text-xl font-display font-bold mb-1">
                  {t('B.E. Computer Engineering', 'B.E. Computertechnik')}
                </div>
                <div className="text-muted-foreground font-light">
                  Vishwakarma Government Engineering College, Chandkheda — GTU
                </div>
                <div className="font-mono text-xs text-primary mt-1">CGPA: 8.59</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16">
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest whitespace-nowrap pt-1">2019 — 2022</div>
              <div>
                <div className="text-xl font-display font-bold mb-1">
                  {t('Diploma in Computer Engineering', 'Diplom in Computertechnik')}
                </div>
                <div className="text-muted-foreground font-light">
                  Ranchhodlal Chhotalal Technical Institute, Sola — GTU
                </div>
                <div className="font-mono text-xs text-primary mt-1">CGPA: 9.41</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
