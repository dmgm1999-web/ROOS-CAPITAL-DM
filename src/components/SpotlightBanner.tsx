import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getOptimizedImageUrl } from '../utils/imageUtils';

// Helper to extract YouTube video ID from various formats
const getYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  if (url.includes('/shorts/')) {
    const parts = url.split('/shorts/');
    if (parts[1]) {
      const id = parts[1].split(/[?#&]/)[0];
      if (id.length === 11) {
        return id;
      }
    }
  }
  return null;
};

interface SpotlightBannerProps {
  images: string[];
  isRegisterOpen?: boolean;
  onRegisterOpenChange?: (open: boolean) => void;
  className?: string;
  containerClassName?: string;
}

export function SpotlightBanner({ 
  images, 
  isRegisterOpen: controlledIsRegisterOpen,
  onRegisterOpenChange,
  className,
  containerClassName
}: SpotlightBannerProps) {
  if (!images || images.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const [localIsRegisterOpen, setLocalIsRegisterOpen] = useState(false);

  const isRegisterOpen = controlledIsRegisterOpen !== undefined ? controlledIsRegisterOpen : localIsRegisterOpen;
  const setIsRegisterOpen = (val: boolean | ((prev: boolean) => boolean)) => {
    const nextVal = typeof val === 'function' ? val(isRegisterOpen) : val;
    if (onRegisterOpenChange) {
      onRegisterOpenChange(nextVal);
    } else {
      setLocalIsRegisterOpen(nextVal);
    }
  };

  // Preload all banner images into browser cache so slide transitions are instant
  useEffect(() => {
    if (!images || images.length === 0) return;
    images.forEach((url) => {
      if (!url || !url.trim() || getYouTubeId(url) !== null) return;
      const finalSrc = getOptimizedImageUrl(url);
      const img = new Image();
      img.src = finalSrc;
    });
  }, [images]);

  useEffect(() => {
    if (isHovered) return; // Pause auto-play on hover
    
    // Also pause if the current slide is a YouTube video
    const currentUrl = images[currentIndex];
    if (currentUrl && getYouTubeId(currentUrl) !== null) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // Cycle every 5 seconds
    
    return () => clearInterval(timer);
  }, [currentIndex, images.length, isHovered]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Push to the right transition variants
  const pushRightVariants = {
    enter: {
      x: '-100%',
    },
    center: {
      x: '0%',
      transition: {
        x: { type: 'tween' as const, duration: 0.5, ease: 'easeOut' as const },
      }
    },
    exit: {
      x: '100%',
      transition: {
        x: { type: 'tween' as const, duration: 0.5, ease: 'easeIn' as const },
      }
    }
  };

  return (
    <div className={containerClassName !== undefined ? containerClassName : "max-w-[70rem] 2xl:max-w-[80rem] 3xl:max-w-[95rem] w-full mx-auto px-4 md:px-6 lg:px-8 mt-4 md:mt-6 relative"}>
      <div 
        id="spotlight-banner-root"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={className || "relative w-full overflow-hidden bg-white select-none aspect-video shadow-lg rounded-[32px] sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] xl:rounded-[4rem] border-2 sm:border-4 border-[#E2A7B5] group isolate transform-gpu"}
      >
        {/* Slide with Push to the Right transition */}
        <div className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false}>
            {(() => {
              const currentUrl = images[currentIndex] || '';
              if (!currentUrl || !currentUrl.trim()) {
                return null;
              }
              const ytId = getYouTubeId(currentUrl);

              if (ytId) {
                return (
                  <motion.div
                    key={`yt-${currentIndex}`}
                    variants={pushRightVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full"
                  >
                    <iframe
                      className="w-full h-full object-cover pointer-events-auto"
                      src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=1&modestbranding=1&rel=0`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={`slide-${currentIndex}`}
                  variants={pushRightVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full flex items-center justify-center bg-white"
                >
                  <img
                    src={getOptimizedImageUrl(currentUrl)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain pointer-events-none select-none bg-white"
                    alt={`Spotlight Banner ${currentIndex + 1}`}
                    loading={currentIndex === 0 ? "eager" : "lazy"}
                  />
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>



        {/* Left Navigation Arrow */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#A85967] shadow-xl hidden md:flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 active:scale-95 duration-200 z-10"
            aria-label="Anuncio Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Navigation Arrow */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#A85967] shadow-xl hidden md:flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 active:scale-95 duration-200 z-10"
            aria-label="Anuncio Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Carousel Navigation Indicator Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1.5 z-10 bg-black/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-white w-4 sm:w-5 shadow-[0_1px_4px_rgba(0,0,0,0.35)]'
                    : 'bg-white/45 hover:bg-white/80'
                }`}
                aria-label={`Ir al anuncio ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
