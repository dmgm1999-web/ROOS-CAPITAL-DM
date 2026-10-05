import React, { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NoticiasTickerProps {
  noticias: string[];
}

const NOTICIAS_TRANSLATIONS: Record<string, string> = {
  'decisión clave: hasta el 85% de todas las compras de consumo en el planeta son decididas por mujeres.':
    'KEY DECISION: UP TO 85% OF ALL CONSUMER PURCHASES WORLDWIDE ARE DECIDED BY WOMEN.',
  'un women entrepreneurship expo (2026/2027):un ciclo integral de bootcamps, mentoría, aceleración y preparación de pitch de inversión para empresas lideradas por mujeres que buscan levantar capital en etapas tempranas. [1]':
    'UN Women Entrepreneurship Expo (2026/2027): A comprehensive cycle of bootcamps, mentorship, acceleration, and pitch preparation for women-led startups seeking early-stage investment.',
  'más que potencias: el poder de compra femenino supera a las economías de china e india juntas.':
    'MORE THAN SUPERPOWERS: FEMALE PURCHASING POWER SURPASSES THE COMBINED ECONOMIES OF CHINA AND INDIA.',
  'pave her way grant program (2026/2027): mantiene abiertos tres ejes de financiamiento de capital semilla a fondo perdido: el change agent prize y disruptor award (de hasta 90,000 usd cada uno) y un fondo de asistencia de hasta 30,000 usd':
    'Pave Her Way Grant Program (2026/2027): Active seed grant axes including Change Agent Prize & Disruptor Award (up to $90,000 USD each) plus a $30,000 USD assistance fund.',
  'efecto multiplicador: las mujeres reinvierten el 90% de sus ingresos en educación, salud y comunidad.':
    'MULTIPLIER EFFECT: WOMEN REINVEST 90% OF THEIR INCOME IN EDUCATION, HEALTHCARE, AND THEIR COMMUNITIES.',
  'women founders grant (convocatoria mensual continua): otorga un fondo mensual de 5,000 usd no reembolsables para negocios liderados al menos en un 51% por mujeres, cerrando postulaciones el último día de cada mes de forma ininterrumpida':
    'Women Founders Grant (Monthly Continuous Call): Provides a monthly $5,000 USD non-repayable grant for businesses with at least 51% female leadership, accepting applications every month.'
};

function translateNoticia(text: string, language: 'es' | 'en'): string {
  if (language === 'es' || !text) return text;
  
  const normalized = text.toLowerCase().trim().replace(/^["'\s]+|["'\s,*]+$/g, '');
  
  if (NOTICIAS_TRANSLATIONS[normalized]) {
    return NOTICIAS_TRANSLATIONS[normalized];
  }
  
  for (const [esKey, enVal] of Object.entries(NOTICIAS_TRANSLATIONS)) {
    if (normalized.includes(esKey.slice(0, 30)) || esKey.includes(normalized.slice(0, 30))) {
      return enVal;
    }
  }

  return text;
}

export default function NoticiasTicker({ noticias }: NoticiasTickerProps) {
  const { language } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);

  const cleanNoticias = useMemo(() => {
    return (noticias || [])
      .map(n => (typeof n === 'string' ? n.trim() : ''))
      .filter(n => n.length > 5)
      .map(n => translateNoticia(n, language));
  }, [noticias, language]);

  if (cleanNoticias.length === 0) return null;

  // Duplicate for smooth infinite loop
  const tickerItems = [...cleanNoticias, ...cleanNoticias, ...cleanNoticias, ...cleanNoticias];
  
  // Much slower reading speed so users can comfortably read each piece of news
  const scrollDurationSeconds = Math.max(160, cleanNoticias.length * 34);

  return (
    <div
      className="w-full relative overflow-hidden bg-gradient-to-r from-[#FDF0F4] via-[#FFEAF0] to-[#FDF0F4] border border-[#E85B81]/35 rounded-2xl shadow-2xs py-2 px-3 sm:px-4 select-none flex items-center group transition-all"
      id="noticias-linear-bar"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Left Badge: NOTICIAS / NEWS */}
      <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E85B81] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-2xs mr-3 z-20">
        <Sparkles className="w-3 h-3 text-white fill-white" />
        <span>{language === 'en' ? 'News' : 'Noticias'}</span>
      </div>

      {/* Edge gradient masks matching the lighter pink background */}
      <div className="absolute left-20 sm:left-24 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-r from-[#FDF0F4] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-[#FDF0F4] to-transparent z-10 pointer-events-none" />

      {/* Scrolling Track */}
      <div className="overflow-hidden w-full relative flex items-center">
        <div
          className="animate-ticker-marquee flex items-center gap-6 sm:gap-8 whitespace-nowrap"
          style={{
            '--ticker-duration': `${scrollDurationSeconds}s`,
            animationPlayState: isPaused ? 'paused' : 'running',
          } as React.CSSProperties}
        >
          {tickerItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 sm:gap-8 shrink-0">
              <span className="text-xs sm:text-[13px] font-medium text-[#18181B] leading-none">
                {item}
              </span>
              <span className="text-[#E85B81] text-xs opacity-75">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
