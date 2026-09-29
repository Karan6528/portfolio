import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';

const EMAIL = 'lodhak376@gmail.com';

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/karanlodha', text: 'linkedin.com/in/karanlodha' },
  { label: 'GitHub', href: 'https://github.com/Karan6528', text: 'github.com/Karan6528' },
];

export function Contact() {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

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
                "Looking for a data science internship or working student position in Germany. Also open to AI/ML and web development projects. Let's build something meaningful.",
                'Ich suche ein Praktikum oder eine Werkstudentenstelle im Bereich Data Science in Deutschland und bin offen für Projekte in KI/ML und Webentwicklung. Lassen Sie uns etwas Sinnvolles aufbauen.'
              )}
            </p>

            <div className="space-y-4 font-mono text-sm">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-4 group hover:text-primary-foreground transition-colors"
              >
                <span className="text-primary-foreground/50 uppercase tracking-widest text-xs w-20">
                  {t('Email', 'E-Mail')}
                </span>
                <span className="group-hover:underline">{EMAIL}</span>
              </a>
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group hover:text-primary-foreground transition-colors"
                >
                  <span className="text-primary-foreground/50 uppercase tracking-widest text-xs w-20">
                    {link.label}
                  </span>
                  <span className="group-hover:underline">{link.text}</span>
                </a>
              ))}
              <div className="flex items-center gap-4">
                <span className="text-primary-foreground/50 uppercase tracking-widest text-xs w-20">
                  {t('Location', 'Standort')}
                </span>
                <span>{t('Berlin, Germany', 'Berlin, Deutschland')}</span>
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
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-2 border-b border-primary-foreground/30 pb-2">
                <label className="font-mono text-xs uppercase tracking-widest text-primary-foreground/70">
                  {t('Name', 'Name')}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
