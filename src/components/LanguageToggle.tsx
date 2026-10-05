import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
  showIcon?: boolean;
}

export function LanguageToggle({ className = '', showIcon = true }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div 
      className={`inline-flex items-center gap-1 bg-white/80 border border-[#EFE8DF] rounded-full p-1 shadow-xs text-xs font-bold ${className}`}
      role="group"
      aria-label="Seleccionar idioma / Select language"
    >
      {showIcon && (
        <Globe className="w-3.5 h-3.5 text-neutral-400 ml-1.5 mr-0.5 shrink-0" aria-hidden="true" />
      )}
      <button
        onClick={() => setLanguage('es')}
        className={`px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer text-[11px] ${
          language === 'es'
            ? 'bg-[#E85B81] text-white shadow-2xs'
            : 'text-neutral-600 hover:text-[#18181B] hover:bg-neutral-100/60'
        }`}
        aria-pressed={language === 'es'}
        title="Cambiar a Español"
      >
        ES
      </button>
      <span className="text-neutral-300 text-[10px] select-none">|</span>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer text-[11px] ${
          language === 'en'
            ? 'bg-[#E85B81] text-white shadow-2xs'
            : 'text-neutral-600 hover:text-[#18181B] hover:bg-neutral-100/60'
        }`}
        aria-pressed={language === 'en'}
        title="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
