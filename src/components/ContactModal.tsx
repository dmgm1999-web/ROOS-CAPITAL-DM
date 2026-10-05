import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhatsappIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const TelegramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.119.098.152.228.166.321.015.093.032.308.017.481z" />
  </svg>
);

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" id="contact-modal-container">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative z-10 w-full max-w-[340px] sm:max-w-[360px] bg-gradient-to-b from-white via-white to-[#FCE8EF]/30 rounded-tr-2xl rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-bl-2xl p-5 sm:p-6 border-2 border-[#E85B81]/30 shadow-[0_20px_50px_rgba(232,91,129,0.18)] space-y-4 text-center overflow-hidden"
          >
            {/* Decorative background glows */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#E85B81]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#E85B81]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#E85B81]/10 hover:bg-[#E85B81]/20 text-[#E85B81] border border-[#E85B81]/25 flex items-center justify-center transition-all active:scale-95 cursor-pointer z-20"
              aria-label={t('contact.close')}
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Header */}
            <div className="space-y-1.5 pt-1 relative z-10">
              <h3 className="text-base sm:text-lg font-black text-[#E85B81] tracking-tight uppercase font-lux">
                {t('contact.title')}
              </h3>
              <p className="text-xs text-neutral-600 font-sans font-medium leading-relaxed">
                {t('contact.subtitle')}
              </p>
            </div>

            {/* Contact Options */}
            <div className="space-y-2.5 pt-1 relative z-10">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/5218123222533"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-[#FCE8EF]/40 border-2 border-[#E85B81]/20 hover:border-[#E85B81] transition-all transform hover:-translate-y-0.5 shadow-xs hover:shadow-md no-underline group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E85B81] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <WhatsappIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="font-extrabold text-sm text-[#E85B81] flex items-center gap-1.5 transition-colors">
                    WhatsApp
                    <span className="text-[9px] bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                      {t('contact.recommended')}
                    </span>
                  </div>
                  <div className="text-xs text-[#E85B81]/80 font-sans truncate font-medium">
                    @rooscapital
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#E85B81]/50 group-hover:text-[#E85B81] group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* Telegram Button */}
              <a
                href="https://t.me/rooscapital"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-[#FCE8EF]/40 border-2 border-[#E85B81]/20 hover:border-[#E85B81] transition-all transform hover:-translate-y-0.5 shadow-xs hover:shadow-md no-underline group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E85B81] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <TelegramIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="font-extrabold text-sm text-[#E85B81] transition-colors">
                    Telegram
                  </div>
                  <div className="text-xs text-[#E85B81]/80 font-sans truncate font-medium">
                    @rooscapital
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#E85B81]/50 group-hover:text-[#E85B81] group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* Correo Button */}
              <a
                href="mailto:central@rooscapital.com?subject=Contacto%20-%20Roos%20Capital"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-[#FCE8EF]/40 border-2 border-[#E85B81]/20 hover:border-[#E85B81] transition-all transform hover:-translate-y-0.5 shadow-xs hover:shadow-md no-underline group"
                id="contact-email-btn"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E85B81] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="font-extrabold text-sm text-[#E85B81] transition-colors">
                    {t('contact.email')}
                  </div>
                  <div className="text-xs text-[#E85B81]/80 font-sans truncate font-medium">
                    central@rooscapital.com
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#E85B81]/50 group-hover:text-[#E85B81] group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>

            {/* Footer note */}
            <div className="p-2.5 bg-[#FCE8EF]/60 rounded-xl border-l-3 border-[#E85B81] text-[11px] text-[#E85B81] font-sans font-medium leading-tight text-center relative z-10">
              {t('contact.footerNote')}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
