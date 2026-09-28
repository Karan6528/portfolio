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
  'Python', 'JavaScript', 'Java', 'C', 'SQL', 'HTML', 'MATLAB',
  'ReactJS', 'Next.js', 'Node.js', 'FastAPI', 'Bootstrap',
  'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Streamlit',
  'Docker', 'Git', 'Postman', 'OpenCV', 'Arduino', 'Raspberry Pi',
  'VS Code', 'Weka', 'XAMPP',
];

export function Skills() {
  const { lang, t } = useLang();
  const skills = lang === 'en' ? SKILLS_EN : SKILLS_DE;

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
      </div>
    </section>
  );
}
