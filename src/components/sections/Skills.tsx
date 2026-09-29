import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';

const SKILLS_EN = [
  { name: 'Python & Machine Learning', level: 92 },
  { name: 'React.js & JavaScript', level: 88 },
  { name: 'Data Science & Analytics', level: 90 },
  { name: 'SQL & Database Design', level: 82 },
  { name: 'LLMs & Generative AI', level: 85 },
  { name: 'Next.js & Node.js', level: 78 },
  { name: 'Docker & FastAPI', level: 75 },
  { name: 'IoT & Arduino', level: 70 },
];

const SKILLS_DE = [
  { name: 'Python & Machine Learning', level: 92 },
  { name: 'React.js & JavaScript', level: 88 },
  { name: 'Data Science & Analytik', level: 90 },
  { name: 'SQL & Datenbankdesign', level: 82 },
  { name: 'LLMs & Generative KI', level: 85 },
  { name: 'Next.js & Node.js', level: 78 },
  { name: 'Docker & FastAPI', level: 75 },
  { name: 'IoT & Arduino', level: 70 },
];

const TECH_TAGS = [
  'Python', 'JavaScript', 'Java', 'C', 'SQL', 'MySQL', 'HTML', 'CSS', 'MATLAB',
  'ReactJS', 'Next.js', 'Node.js', 'Redux', 'FastAPI', 'Bootstrap',
  'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Streamlit', 'OpenCV', 'Weka',
  'LLMs', 'RAG', 'NLP', 'Generative AI',
  'Docker', 'Git', 'GitHub', 'Postman', 'Wireshark', 'VS Code',
  'Arduino', 'Raspberry Pi', 'XAMPP',
];

const CERTIFICATIONS = [
  'Postman Fundamentals Student Expert',
  'Python for Data Science – Simplilearn',
  'Build Your Own ChatGPT with Open-Source LLMs – LetsUpgrade',
  'Cyber Security and Ethical Hacking Bootcamp',
  'JavaScript Zero to Hero',
  'Graphic Design Course – LetsUpgrade',
];

export function Skills() {
  const { lang, t } = useLang();
  const skills = lang === 'en' ? SKILLS_EN : SKILLS_DE;

  const languages = [
    { name: t('Gujarati', 'Gujarati'), level: t('Native', 'Muttersprache'), dots: 5 },
    { name: t('Hindi', 'Hindi'), level: t('Native', 'Muttersprache'), dots: 5 },
    { name: t('English', 'Englisch'), level: t('Advanced', 'Fortgeschritten'), dots: 4 },
    { name: t('German', 'Deutsch'), level: t('Elementary', 'Grundkenntnisse'), dots: 2 },
  ];

  return (
    <section id="skills" className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <h2 className="font-mono text-sm text-primary uppercase tracking-widest mb-6">
            {t('02 // Expertise', '02 // Kenntnisse')}
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold">
            {t('Technical Skills', 'Technische Fähigkeiten')}
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 mb-24">
          {skills.map((skill, i) => (
            <div key={skill.name}>
              <div className="flex justify-between items-end mb-4">
                <span className="font-display text-lg font-medium">{skill.name}</span>
                <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-[2px] w-full bg-border relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
                  className="absolute top-0 left-0 h-full bg-primary"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tech tag cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-border pt-16"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">
            {t('Technologies & Tools', 'Technologien & Werkzeuge')}
          </p>
          <div className="flex flex-wrap gap-3">
            {TECH_TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="font-mono text-xs uppercase tracking-widest px-4 py-2 border border-border hover:border-primary hover:text-primary transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Certifications & Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">
              {t('Certifications', 'Zertifikate')}
            </p>
            <ul className="space-y-3 font-light">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert} className="flex gap-4">
                  <span className="text-primary font-mono">—</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">
              {t('Languages', 'Sprachen')}
            </p>
            <ul className="space-y-3">
              {languages.map((l) => (
                <li key={l.name} className="flex items-center justify-between border-b border-border pb-3">
                  <span className="font-display font-medium">{l.name}</span>
                  <span className="flex items-center gap-4">
                    <span className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((d) => (
                        <span
                          key={d}
                          className={`w-2 h-2 rounded-full ${d < l.dots ? 'bg-primary' : 'bg-border'}`}
                        />
                      ))}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground w-28 text-right">
                      {l.level}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
