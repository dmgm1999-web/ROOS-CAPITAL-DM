import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Store, ArrowRight, Globe } from 'lucide-react';
import { Announcement } from '../App';
import AnnouncementCard from './AnnouncementCard';
import { useLanguage } from '../context/LanguageContext';
import { getCountryInfo, interleaveAnnouncementsByCountry, CountryFlag, translateCountryName } from '../utils/countryUtils';

interface DirectoryCarouselProps {
  ads: Announcement[];
  totalDirectoryCount?: number;
  onViewFull: (ad: Announcement) => void;
  onToggleFavorite?: (ad: Announcement) => void;
  isFavorite?: (ad: Announcement) => boolean;
  onNavigateToDirectory: () => void;
}

/**
 * Extracts 8 directory ads with mixed countries (not only Mexico),
 * prioritizing items with images and complete data.
 */
function getMixedCountryDirectoryAds(ads: Announcement[], targetCount = 8): Announcement[] {
  const directoryOnly = ads.filter(a => !a.isAlianza);
  if (directoryOnly.length === 0) return [];

  // Group by country code
  const countryGroups = new Map<string, Announcement[]>();
  for (const ad of directoryOnly) {
    const info = getCountryInfo(ad.extractedCountry || ad.pais, ad.estado, ad.municipio);
    const code = info.code || 'OTHER';
    if (!countryGroups.has(code)) {
      countryGroups.set(code, []);
    }
    countryGroups.get(code)!.push(ad);
  }

  // Sort each country's ads by whether they have an image
  for (const [code, items] of countryGroups.entries()) {
    items.sort((a, b) => {
      const aImg = Boolean(a.imagen || a.anuncio || a.logo);
      const bImg = Boolean(b.imagen || b.anuncio || b.logo);
      if (aImg && !bImg) return -1;
      if (!aImg && bImg) return 1;
      return 0;
    });
  }

  // Distinct country keys
  const countryKeys = Array.from(countryGroups.keys());
  
  // Sort country keys so countries other than Mexico appear early in rotation to guarantee mixed countries
  countryKeys.sort((a, b) => {
    if (a === 'MX' && b !== 'MX') return 1;
    if (a !== 'MX' && b === 'MX') return -1;
    return (countryGroups.get(b)?.length || 0) - (countryGroups.get(a)?.length || 0);
  });

  const selected: Announcement[] = [];
  const selectedIds = new Set<string>();

  // Round 1: Take 1 card from each distinct country
  for (const code of countryKeys) {
    if (selected.length >= targetCount) break;
    const items = countryGroups.get(code) || [];
    for (const item of items) {
      const idKey = item.id || item.titulo || '';
      if (!selectedIds.has(idKey)) {
        selectedIds.add(idKey);
        selected.push(item);
        break;
      }
    }
  }

  // Round 2: If we still have fewer than targetCount, round-robin again
  let round = 1;
  while (selected.length < targetCount && round < 10) {
    let addedInRound = false;
    for (const code of countryKeys) {
      if (selected.length >= targetCount) break;
      const items = countryGroups.get(code) || [];
      if (items[round]) {
        const item = items[round];
        const idKey = item.id || item.titulo || '';
        if (!selectedIds.has(idKey)) {
          selectedIds.add(idKey);
          selected.push(item);
          addedInRound = true;
        }
      }
    }
    if (!addedInRound) break;
    round++;
  }

  // Fallback: fill up to targetCount if needed
  if (selected.length < targetCount) {
    for (const item of directoryOnly) {
      if (selected.length >= targetCount) break;
      const idKey = item.id || item.titulo || '';
      if (!selectedIds.has(idKey)) {
        selectedIds.add(idKey);
        selected.push(item);
      }
    }
  }

  return selected.slice(0, targetCount);
}

export function DirectoryCarousel({
  ads,
  totalDirectoryCount = 0,
  onViewFull,
  onToggleFavorite,
  isFavorite,
  onNavigateToDirectory
}: DirectoryCarouselProps) {
  const { language } = useLanguage();

  // Strictly 8 ads from mixed countries
  const directoryAds = useMemo(() => {
    return getMixedCountryDirectoryAds(ads, 8);
  }, [ads]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const totalItems = directoryAds.length;

  const nextSlide = useCallback(() => {
    if (totalItems <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    if (totalItems <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Automatic auto-scroll/sliding every 3.8 seconds when not paused and tab is visible
  useEffect(() => {
    if (isPaused || totalItems <= 1) return;
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        nextSlide();
      }
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, totalItems, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX || !touchEndX) return;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
  };

  if (directoryAds.length === 0) return null;

  return (
    <section 
      className="w-full my-6 sm:my-8 relative z-10"
      id="directory-single-row-carousel-section"
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
                {language === 'en' ? 'International Directory • National Directory' : 'Directorio Internacional • Directorio Nacional'}
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#18181B] tracking-tight">
              {language === 'en' ? 'Women-Led Businesses Directory' : 'Directorio de Empresas Lideradas por Mujeres'}
            </h2>
          </div>

          <button
            onClick={onNavigateToDirectory}
            className="group inline-flex items-center gap-2 bg-white hover:bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/40 hover:border-[#E85B81] transition-all duration-200 py-2 sm:py-2.5 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-bold shadow-xs hover:shadow-md shrink-0 cursor-pointer select-none self-start sm:self-auto"
            title={language === 'en' ? 'Explore full directory' : 'Explorar directorio completo'}
            id="marketplace-to-full-directory-btn"
          >
            <span>
              {language === 'en' ? 'Explore Full Directory' : 'Explorar Directorio Completo'}
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Single-Row Carousel Container */}
        <div 
          className="relative bg-gradient-to-b from-[#FAF8F5] via-white/80 to-[#FAF8F5] p-3 sm:p-5 rounded-3xl border border-[#EFE8DF] shadow-xs overflow-visible"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Header Controls for Carousel */}
          <div className="flex items-center justify-end mb-3 px-1">
            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 text-neutral-700 hover:text-[#E85B81] border border-[#EFE8DF] flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Anterior"
                aria-label="Tarjeta anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 text-neutral-700 hover:text-[#E85B81] border border-[#EFE8DF] flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Siguiente"
                aria-label="Tarjeta siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Cards Viewport */}
          <div className="w-full overflow-visible py-3 sm:py-4 px-1 sm:px-2">
            {/* Mobile View: 1 card active with slide animation */}
            <div className="block sm:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={directoryAds[currentIndex]?.id || currentIndex}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="w-full max-w-sm mx-auto py-2 px-1"
                >
                  {directoryAds[currentIndex] && (
                    <AnnouncementCard
                      ad={directoryAds[currentIndex]}
                      index={currentIndex}
                      onViewFull={onViewFull}
                      isFavorite={isFavorite ? isFavorite(directoryAds[currentIndex]) : false}
                      onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(directoryAds[currentIndex]) : undefined}
                      isDiamonds={false}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop & Tablet View: 4-card sliding window (or 2-3 on tablet) */}
            <div className="hidden sm:block">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full items-stretch py-2 px-1">
                {[0, 1, 2, 3].map((offset) => {
                  const idx = (currentIndex + offset) % totalItems;
                  const ad = directoryAds[idx];
                  if (!ad) return null;
                  return (
                    <div 
                      key={`dir_${ad.id || ad.titulo}_${offset}`}
                      className={`h-full flex flex-col relative py-1 px-0.5 ${offset === 3 ? 'hidden lg:block' : offset === 2 ? 'hidden md:block' : 'block'}`}
                    >
                      <AnnouncementCard
                        ad={ad}
                        index={offset}
                        onViewFull={onViewFull}
                        isFavorite={isFavorite ? isFavorite(ad) : false}
                        onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(ad) : undefined}
                        isDiamonds={false}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {directoryAds.map((ad, idx) => (
              <button
                key={`dot_${ad.id || idx}`}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx 
                    ? 'w-6 bg-[#E85B81]' 
                    : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Ir a tarjeta ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default DirectoryCarousel;
