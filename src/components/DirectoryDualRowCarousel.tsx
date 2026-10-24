import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Store, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { Announcement } from '../App';
import AnnouncementCard from './AnnouncementCard';
import { useLanguage } from '../context/LanguageContext';

interface DirectoryDualRowCarouselProps {
  ads: Announcement[];
  totalDirectoryCount?: number;
  onViewFull: (ad: Announcement) => void;
  onToggleFavorite?: (ad: Announcement) => void;
  isFavorite?: (ad: Announcement) => boolean;
  onNavigateToDirectory: () => void;
}

export function DirectoryDualRowCarousel({
  ads,
  totalDirectoryCount = 0,
  onViewFull,
  onToggleFavorite,
  isFavorite,
  onNavigateToDirectory
}: DirectoryDualRowCarouselProps) {
  const { language } = useLanguage();

  // Strictly take 8 cards from the directory as requested
  const directoryAds = React.useMemo(() => {
    const regular = ads.filter(a => !a.isAlianza);
    return regular.length >= 8 ? regular.slice(0, 8) : ads.slice(0, 8);
  }, [ads]);

  // Split strictly into 2 rows of 4 cards each: 4 + 4 = 8 cards total
  const row1Ads = React.useMemo(() => directoryAds.slice(0, 4), [directoryAds]);
  const row2Ads = React.useMemo(() => directoryAds.slice(4, 8), [directoryAds]);

  const [row1Index, setRow1Index] = useState(0);
  const [row2Index, setRow2Index] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeMovingRow, setActiveMovingRow] = useState<1 | 2>(1);

  const nextRow1 = useCallback(() => {
    if (row1Ads.length <= 1) return;
    setRow1Index((prev) => (prev + 1) % row1Ads.length);
  }, [row1Ads.length]);

  const prevRow1 = useCallback(() => {
    if (row1Ads.length <= 1) return;
    setRow1Index((prev) => (prev - 1 + row1Ads.length) % row1Ads.length);
  }, [row1Ads.length]);

  const nextRow2 = useCallback(() => {
    if (row2Ads.length <= 1) return;
    setRow2Index((prev) => (prev + 1) % row2Ads.length);
  }, [row2Ads.length]);

  const prevRow2 = useCallback(() => {
    if (row2Ads.length <= 1) return;
    setRow2Index((prev) => (prev - 1 + row2Ads.length) % row2Ads.length);
  }, [row2Ads.length]);

  // Staggered alternating timer:
  // "pero que se mueva primero una fila y luego la de abajo"
  // Every 3 seconds: Row 1 moves -> then next tick Row 2 moves -> alternating sequence
  useEffect(() => {
    if (isPaused || directoryAds.length === 0) return;

    const interval = setInterval(() => {
      setActiveMovingRow((prev) => {
        if (prev === 1) {
          nextRow1();
          return 2;
        } else {
          nextRow2();
          return 1;
        }
      });
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused, directoryAds.length, nextRow1, nextRow2]);

  if (directoryAds.length === 0) return null;

  return (
    <section 
      className="w-full my-6 sm:my-8 relative z-10"
      id="directory-dual-row-carousel-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Carrusel del Directorio en Marketplace"
    >
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-6 px-1 sm:px-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E85B81]/10 text-[#E85B81] flex items-center justify-center shrink-0 shadow-2xs">
                <Store className="w-4 h-4 text-[#E85B81]" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#E85B81] font-sans">
                {language === 'en' ? 'Home • Featured Directory' : 'Home • Directorio Destacado'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-neutral-200/80 text-neutral-700 text-[10px] font-bold">
                8 Marcas
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#18181B] tracking-tight">
              {language === 'en' ? 'Women-Led Businesses Directory' : 'Directorio de Empresas Lideradas por Mujeres'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl font-sans">
              {language === 'en' 
                ? 'Sample of 8 businesses from our official directory. Move between rows or explore the complete directory.'
                : 'Muestra de 8 negocios de nuestro directorio oficial. Desliza entre filas o explora el directorio completo.'}
            </p>
          </div>

          <button
            onClick={onNavigateToDirectory}
            className="group inline-flex items-center gap-2 bg-white hover:bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/40 hover:border-[#E85B81] transition-all duration-200 py-2 sm:py-2.5 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-bold shadow-xs hover:shadow-md shrink-0 cursor-pointer select-none self-start sm:self-auto"
            title={language === 'en' ? 'Explore full directory' : 'Explorar directorio completo'}
            id="marketplace-to-full-directory-btn"
          >
            <Compass className="w-4 h-4 text-[#E85B81]" />
            <span>
              {language === 'en' ? 'Explore Full Directory' : 'Explorar Directorio Completo'}
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Dual-Row Carousel Container */}
        <div className="flex flex-col gap-4 sm:gap-6 bg-gradient-to-b from-[#FAF8F5] via-white/80 to-[#FAF8F5] p-2.5 sm:p-5 rounded-3xl border border-[#EFE8DF] shadow-xs">
          
          {/* ========================================================= */}
          {/* FILA 1 (Se mueve primero)                                  */}
          {/* ========================================================= */}
          <div className="w-full relative" id="directory-carousel-row-1">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeMovingRow === 1 ? 'bg-[#E85B81] scale-125' : 'bg-neutral-300'
                }`} />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-sans">
                  {language === 'en' ? 'Row 1 • Top Brands' : 'Fila 1 • Marcas Principales'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevRow1}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-neutral-100 text-neutral-700 hover:text-[#E85B81] border border-[#EFE8DF] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="Anterior"
                  aria-label="Fila 1 anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextRow1}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-neutral-100 text-neutral-700 hover:text-[#E85B81] border border-[#EFE8DF] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="Siguiente"
                  aria-label="Fila 1 siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Row 1 Content */}
            <div className="w-full overflow-hidden">
              {/* Mobile: Smooth transform slider (zero unmounting/blinking) */}
              <div className="block sm:hidden overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${row1Index * 100}%)` }}
                >
                  {row1Ads.map((ad, idx) => (
                    <div key={`r1_m_${ad.id || ad.titulo}_${idx}`} className="w-full shrink-0 px-1">
                      <AnnouncementCard
                        ad={ad}
                        onViewFull={onViewFull}
                        isFavorite={isFavorite ? isFavorite(ad) : false}
                        onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(ad) : undefined}
                        isDiamonds={false}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tablet & Desktop: Stable 4-card grid */}
              <div className="hidden sm:block">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
                  {row1Ads.map((ad, idx) => (
                    <div key={`r1_d_${ad.id || ad.titulo}_${idx}`} className="w-full">
                      <AnnouncementCard
                        ad={ad}
                        onViewFull={onViewFull}
                        isFavorite={isFavorite ? isFavorite(ad) : false}
                        onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(ad) : undefined}
                        isDiamonds={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Subtle Separator */}
          <div className="w-full border-t border-[#EFE8DF]/80 my-0.5" />

          {/* ========================================================= */}
          {/* FILA 2 (Se mueve después de la fila 1)                     */}
          {/* ========================================================= */}
          <div className="w-full relative" id="directory-carousel-row-2">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeMovingRow === 2 ? 'bg-[#E85B81] scale-125' : 'bg-neutral-300'
                }`} />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-sans">
                  {language === 'en' ? 'Row 2 • Emerging Businesses' : 'Fila 2 • Emprendimientos'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevRow2}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-neutral-100 text-neutral-700 hover:text-[#E85B81] border border-[#EFE8DF] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="Anterior"
                  aria-label="Fila 2 anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextRow2}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-neutral-100 text-neutral-700 hover:text-[#E85B81] border border-[#EFE8DF] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="Siguiente"
                  aria-label="Fila 2 siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Row 2 Content */}
            <div className="w-full overflow-hidden">
              {/* Mobile: Smooth transform slider (zero unmounting/blinking) */}
              <div className="block sm:hidden overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${row2Index * 100}%)` }}
                >
                  {row2Ads.map((ad, idx) => (
                    <div key={`r2_m_${ad.id || ad.titulo}_${idx}`} className="w-full shrink-0 px-1">
                      <AnnouncementCard
                        ad={ad}
                        onViewFull={onViewFull}
                        isFavorite={isFavorite ? isFavorite(ad) : false}
                        onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(ad) : undefined}
                        isDiamonds={false}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tablet & Desktop: Stable 4-card grid */}
              <div className="hidden sm:block">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
                  {row2Ads.map((ad, idx) => (
                    <div key={`r2_d_${ad.id || ad.titulo}_${idx}`} className="w-full">
                      <AnnouncementCard
                        ad={ad}
                        onViewFull={onViewFull}
                        isFavorite={isFavorite ? isFavorite(ad) : false}
                        onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(ad) : undefined}
                        isDiamonds={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Banner inside carousel container leading to the independent Directorio section */}
          <div className="mt-2 pt-3 border-t border-[#EFE8DF] flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
            <span className="text-xs text-neutral-500 font-sans text-center sm:text-left">
              {language === 'en'
                ? `Showing a preview of 8 businesses. Visit Directorio for full search, country filters, and complete catalog.`
                : `Mostrando 8 tarjetas de muestra en Home. Visita la pestaña Directorio para ver el catálogo completo con filtros.`}
            </span>
            <button
              onClick={onNavigateToDirectory}
              className="px-4 py-2 bg-[#E85B81] hover:bg-[#DE4B73] active:scale-95 text-white rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer select-none"
            >
              <span>{language === 'en' ? 'Go to Directorio' : 'Ir a Directorio Completo'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
