import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { Announcement } from '../App';
import AnnouncementCard from './AnnouncementCard';
import { useLanguage } from '../context/LanguageContext';

interface AlianzaCarouselProps {
  ads: Announcement[];
  onViewFull: (ad: Announcement) => void;
  onToggleFavorite?: (ad: Announcement) => void;
  isFavorite?: (ad: Announcement) => boolean;
  onNavigateToOutlet: () => void;
}

export function AlianzaCarousel({
  ads,
  onViewFull,
  onToggleFavorite,
  isFavorite,
  onNavigateToOutlet
}: AlianzaCarouselProps) {
  const { language } = useLanguage();
  // Display alliance ads featuring the latest Google Sheet listings first
  const allianceAds = ads;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const totalItems = allianceAds.length;

  const nextSlide = useCallback(() => {
    if (totalItems <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    if (totalItems <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Automatic auto-scroll/sliding every 3.8 seconds when not paused
  useEffect(() => {
    if (isPaused || totalItems <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
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

  if (allianceAds.length === 0) return null;

  return (
    <section 
      className="w-full my-4 sm:my-6 relative z-10"
      id="alianza-auto-carousel-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Carrusel de Anuncios Alianza"
    >
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
        {/* Carousel Header with Title and Link to Independent Outlet Section */}
        <div className="flex items-center justify-between gap-3 mb-2.5 sm:mb-3.5 px-1 sm:px-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FCE8EF] text-[#E85B81] flex items-center justify-center shrink-0 shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#E85B81]" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#E85B81] font-sans">
                  {language === 'en' ? 'Featured Brands' : 'Marcas • Destacadas'}
                </span>
                <span className="hidden xs:inline-block px-2 py-0.2 rounded-full bg-[#E85B81] text-white text-[9.5px] font-black uppercase tracking-wider">
                  Outlet
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#18181B] truncate">
                {language === 'en' ? 'Outlet Price Products' : 'Productos con precio de Outlet'}
              </h3>
            </div>
          </div>

          <button
            onClick={onNavigateToOutlet}
            className="group inline-flex items-center gap-2 bg-white hover:bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/40 hover:border-[#E85B81] transition-all duration-200 py-2 sm:py-2.5 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-bold shadow-xs hover:shadow-md shrink-0 cursor-pointer select-none self-start sm:self-auto"
            title={language === 'en' ? 'View all partner ads in Outlet' : 'Ver todos los anuncios en Outlet'}
            id="marketplace-to-full-outlet-btn"
          >
            <span>{language === 'en' ? 'Explore Outlet' : 'Ver todo en Outlet'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Carousel Frame */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFF5F8]/50 to-white/70 p-2 sm:p-4 border border-[#E85B81]/20 shadow-xs"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-neutral-800 hover:text-[#E85B81] shadow-md border border-[#EFE8DF] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
            title={language === 'en' ? 'Previous' : 'Anterior'}
            aria-label="Anuncio anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-neutral-800 hover:text-[#E85B81] shadow-md border border-[#EFE8DF] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
            title={language === 'en' ? 'Next' : 'Siguiente'}
            aria-label="Siguiente anuncio"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Track: Mobile shows 1 card, md shows 2 cards, lg shows 3 or 4 cards */}
          <div className="w-full">
            {/* Mobile View: 1 single centered card sliding smoothly with AnimatePresence */}
            <div className="block sm:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={allianceAds[currentIndex]?.id || currentIndex}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="w-full max-w-sm mx-auto"
                >
                  {allianceAds[currentIndex] && (
                    <AnnouncementCard
                      ad={allianceAds[currentIndex]}
                      onViewFull={onViewFull}
                      isFavorite={isFavorite ? isFavorite(allianceAds[currentIndex]) : false}
                      onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(allianceAds[currentIndex]) : undefined}
                      isDiamonds={true}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Tablet & Desktop View: 2 to 3 cards visible with smooth sliding */}
            <div className="hidden sm:block">
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full">
                {/* Dynamically slice window of cards starting at currentIndex */}
                {[0, 1, 2, 3].map((offset) => {
                  const itemIndex = (currentIndex + offset) % totalItems;
                  const ad = allianceAds[itemIndex];
                  if (!ad) return null;
                  return (
                    <div 
                      key={`${ad.id || ad.titulo}_${offset}`}
                      className={offset >= 2 ? (offset === 3 ? 'hidden xl:block' : 'hidden lg:block') : 'block'}
                    >
                      <AnnouncementCard
                        ad={ad}
                        onViewFull={onViewFull}
                        isFavorite={isFavorite ? isFavorite(ad) : false}
                        onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(ad) : undefined}
                        isDiamonds={true}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3 pt-1 max-w-xs sm:max-w-md mx-auto overflow-x-auto no-scrollbar py-0.5">
            {allianceAds.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none shrink-0 ${
                  currentIndex === idx 
                    ? 'w-6 h-2 bg-[#E85B81]' 
                    : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
                title={`Anuncio ${idx + 1}`}
                aria-label={`Ir al anuncio ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
