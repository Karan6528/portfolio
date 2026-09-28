import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';

export function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-mono text-sm text-primary-foreground/70 uppercase tracking-widest mb-6">
              {t('05 // Contact', '05 // Kontakt')}
            </h2>
            <h3 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              {t("Let's Work Together.", 'Lass uns zusammenarbeiten.')}
            </h3>
            <p className="text-lg font-light text-primary-foreground/80 max-w-md mb-10">
              {t(
                "Open to internships, full-time roles, and freelance projects in Data Science, AI/ML, or Web Development. Let's build something meaningful.",
                'Offen für Praktika, Festanstellungen und Freelance-Projekte in Data Science, KI/ML oder Webentwicklung. Lassen Sie uns etwas Sinnvolles aufbauen.'
              )}
            </p>

            <div className="space-y-4 font-mono text-sm">
              <a
                href="mailto:lodhak376@gmail.com"
                className="flex items-center gap-4 group hover:text-primary-foreground transition-colors"
              >
                <span className="text-primary-foreground/50 uppercase tracking-widest text-xs">
                  {t('Email', 'E-Mail')}
                </span>
                <span className="group-hover:underline">lodhak376@gmail.com</span>
              </a>
              <a
                href="tel:+919173995958"
                className="flex items-center gap-4 group hover:text-primary-foreground transition-colors"
              >
                <span className="text-primary-foreground/50 uppercase tracking-widest text-xs">
                  {t('Phone', 'Telefon')}
                </span>
                <span className="group-hover:underline">+91 9173995958</span>
              </a>
              <div className="flex items-center gap-4">
                <span className="text-primary-foreground/50 uppercase tracking-widest text-xs">
                  {t('Location', 'Standort')}
                </span>
                <span>{t('Ahmedabad, Gujarat, India', 'Ahmedabad, Gujarat, Indien')}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = 'mailto:lodhak376@gmail.com';
              }}
            >
              <div className="space-y-2 border-b border-primary-foreground/30 pb-2">
                <label className="font-mono text-xs uppercase tracking-widest text-primary-foreground/70">
                  {t('Name', 'Name')}
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-none outline-none text-xl font-light placeholder:text-primary-foreground/30"
                  placeholder={t('Your name', 'Ihr Name')}
                />
              </div>

              <div className="space-y-2 border-b border-primary-foreground/30 pb-2">
                <label className="font-mono text-xs uppercase tracking-widest text-primary-foreground/70">
                  {t('Email', 'E-Mail')}
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-transparent border-none outline-none text-xl font-light placeholder:text-primary-foreground/30"
                  placeholder={t('your@email.com', 'ihre@email.de')}
                />
              </div>

              <div className="space-y-2 border-b border-primary-foreground/30 pb-2">
                <label className="font-mono text-xs uppercase tracking-widest text-primary-foreground/70">
                  {t('Message', 'Nachricht')}
                </label>
                <textarea
                  rows={3}
                  required
                  className="w-full bg-transparent border-none outline-none text-xl font-light placeholder:text-primary-foreground/30 resize-none"
                  placeholder={t('How can I help?', 'Wie kann ich helfen?')}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-background text-foreground font-mono text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors mt-8"
              >
                {t('Send Message', 'Nachricht senden')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
