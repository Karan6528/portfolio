import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';
import project1Img from '@/assets/project-1.jpg';
import project2Img from '@/assets/project-2.jpg';
import project3Img from '@/assets/project-3.jpg';
import project4Img from '@/assets/project-4.jpg';
import project5Img from '@/assets/project-5-dashboard.jpg';


// To use a new image: put it in src/assets/, import it here, and use it below.
// import project4Img from '@/assets/project-4.jpg';

interface Project {
  title: string;
  category: string;
  tech: string;
  image: string;
  year: string;
  description: string;
  link?: string; // optional: GitHub URL
  demo?: string; // optional: live demo URL
}

const PROJECTS: Record<'en' | 'de', Project[]> = {
  en: [
    {
      title: 'Sales Funnel Analytics',
      category: 'Data Analytics / BI',
      tech: 'SQL · Excel · Python · Pandas · SQLite · Streamlit',
      image: project5Img,
      year: '2026',
      description:
        "I wanted to practise what a sales analyst does every week: take a messy CRM export, find where leads drop out, and turn it into a report a manager can use. I did this on real Olist data (8,000 B2B leads) and on a solar sales funnel I simulated myself. A few things stood out: leads called within an hour booked twice as often, and the channel with the cheapest leads gave the most expensive customers. Both Excel reports are built with formulas only, and tests check that they match the SQL.",
      link: 'https://github.com/Karan6528/sales-funnel-analytics',
      demo: 'https://sales-funnel-analytics-karan.streamlit.app',
    },
    {
      title: 'Ask Documentor',
      category: 'AI / Full-Stack',
      tech: 'Next.js · JavaScript · Redux · Docker · Python · FastAPI',
      image: project1Img,
      year: '2024',
      description:
        'Upload PDFs and interact with their content via questions and summaries. Built a scalable solution using Next.js for the frontend, FastAPI for the backend, and LLM-powered document intelligence.',
    },
    {
      title: 'Time Series Forecasting',
      category: 'Machine Learning',
      tech: 'Python · Scikit-learn · Pandas · Matplotlib',
      image: project1Img,
      year: '2024',
      description:
        'Financial market forecasting system that analyzes historical stock data and predicts future price trends. Includes data preprocessing, model training, and result visualization to support informed decision-making.',
    },
    {
      title: 'Credit Card Fraud Detection',
      category: 'Data Science',
      tech: 'Python · ML · Scikit-learn · Pandas',
      image: project3Img,
      year: '2023',
      description:
        'Fraud detection system for credit card transactions using machine learning algorithms. Analyzes transaction behavior patterns to detect fraudulent activity with high accuracy.',
    },
    {
      title: 'Credit Risk Scoring System',
      category: 'Machine Learning / MLOps',
      tech: 'Python · XGBoost · SHAP · MLflow · FastAPI · Docker',
      image: project4Img, // change to project4Img after adding your own image
      year: '2026',
      description:
        'End-to-end credit default prediction system covering the full ML lifecycle. Uses cost-sensitive thresholding instead of a default cutoff, calibrated probabilities, SHAP explainability, drift monitoring, and a Dockerized FastAPI service with CI.',
      link: 'https://github.com/Karan6528/credit-risk-project',
    },
  ],
  de: [
    {
      title: 'Sales-Funnel-Analyse',
      category: 'Datenanalyse / BI',
      tech: 'SQL · Excel · Python · Pandas · SQLite · Streamlit',
      image: project5Img,
      year: '2026',
      description:
        'Ich wollte üben, was ein Sales-Analyst jede Woche macht: einen unordentlichen CRM-Export bereinigen, herausfinden, wo Leads abspringen, und daraus einen Bericht machen, mit dem ein Manager arbeiten kann. Dafür habe ich echte Olist-Daten (8.000 B2B-Leads) und einen selbst simulierten Solar-Vertriebsfunnel genutzt. Ein paar Ergebnisse: Leads, die innerhalb einer Stunde angerufen wurden, buchten doppelt so oft einen Termin, und der Kanal mit den günstigsten Leads brachte die teuersten Kunden. Beide Excel-Berichte laufen nur über Formeln, und Tests prüfen, dass sie mit dem SQL übereinstimmen.',
      link: 'https://github.com/Karan6528/sales-funnel-analytics',
      demo: 'https://sales-funnel-analytics-karan.streamlit.app',
    },
    {
      title: 'Ask Documentor',
      category: 'KI / Full-Stack',
      tech: 'Next.js · JavaScript · Redux · Docker · Python · FastAPI',
      image: project2Img,
      year: '2024',
      description:
        'PDFs hochladen und mit ihrem Inhalt interagieren — über Fragen und Zusammenfassungen. Skalierbare Lösung mit Next.js für das Frontend, FastAPI für das Backend und LLM-gestützter Dokumentenintelligenz.',
    },
    {
      title: 'Zeitreihenprognose für Finanzmärkte',
      category: 'Maschinelles Lernen',
      tech: 'Python · Scikit-learn · Pandas · Matplotlib',
      image: project2Img,
      year: '2024',
      description:
        'System zur Finanzmarktprognose, das historische Aktiendaten analysiert und zukünftige Preistrends vorhersagt. Beinhaltet Datenvorverarbeitung, Modelltraining und Visualisierung.',
    },
    {
      title: 'Kreditkartenbetrug-Erkennung',
      category: 'Data Science',
      tech: 'Python · ML · Scikit-learn · Pandas',
      image: project3Img,
      year: '2023',
      description:
        'Betrugserkennung für Kreditkartentransaktionen mit maschinellen Lernalgorithmen. Analysiert Transaktionsmuster, um betrügerische Aktivitäten mit hoher Genauigkeit zu erkennen.',
    },
    {
      title: 'Kreditrisiko-Scoring-System',
      category: 'Maschinelles Lernen / MLOps',
      tech: 'Python · XGBoost · SHAP · MLflow · FastAPI · Docker',
      image: project3Img, // nach dem Hinzufügen eines eigenen Bildes zu project4Img ändern
      year: '2026',
      description:
        'End-to-End-System zur Vorhersage von Kreditausfällen über den gesamten ML-Lebenszyklus. Nutzt kostensensitive Schwellenwerte statt eines Standard-Cutoffs, kalibrierte Wahrscheinlichkeiten, SHAP-Erklärbarkeit, Drift-Monitoring sowie einen Docker-basierten FastAPI-Service mit CI.',
      link: 'https://github.com/Karan6528/credit-risk-project',
    },
  ],
};

export function Projects() {
  const { lang, t } = useLang();
  const projects = [...PROJECTS[lang]].sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <section id="projects" className="py-32 px-6 md:px-12 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-mono text-sm text-primary uppercase tracking-widest mb-6">
              {t('04 // Selected Work', '04 // Ausgewählte Projekte')}
            </h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">
              {t('Projects', 'Projekte')}
            </h3>
          </motion.div>
        </div>

        <div className="space-y-32">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="group relative"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className={`w-full md:w-3/5 overflow-hidden ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="aspect-[16/10] bg-muted relative overflow-hidden"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </motion.div>
                </div>

                <div className={`w-full md:w-2/5 ${i % 2 !== 0 ? 'md:order-1 md:pr-16 text-left' : 'md:pl-16'}`}>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    {project.category} // {project.year}
                  </div>
                  <h4 className="text-3xl md:text-4xl font-display font-bold mb-4">{project.title}</h4>
                  <p className="text-muted-foreground font-light mb-4 leading-relaxed">{project.description}</p>
                  <p className="font-mono text-xs text-primary/80 mb-8">{project.tech}</p>
                  <div className="flex flex-wrap gap-6">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-mono text-xs uppercase tracking-widest text-primary hover:underline"
                      >
                        {t('View code', 'Code ansehen')} →
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-mono text-xs uppercase tracking-widest text-primary hover:underline"
                      >
                        {t('Live dashboard', 'Live-Dashboard')} →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
