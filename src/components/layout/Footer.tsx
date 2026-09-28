import { useLang } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-foreground text-background py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-display text-2xl font-bold tracking-tight">K. LODHA</div>
        <div className="font-mono text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Karan Bhartbhai Lodha.{' '}
          {t('All rights reserved.', 'Alle Rechte vorbehalten.')}
        </div>
        <div className="flex gap-6 font-mono text-xs uppercase tracking-widest">
          <a href="mailto:lodhak376@gmail.com" className="hover:text-primary transition-colors">
            {t('Email', 'E-Mail')}
          </a>
          <a href="tel:+919173995958" className="hover:text-primary transition-colors">
            {t('Phone', 'Telefon')}
          </a>
        </div>
      </div>
    </footer>
  );
}
