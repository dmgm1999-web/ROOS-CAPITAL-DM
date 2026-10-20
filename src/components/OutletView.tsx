import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, Sparkles, Tag, X, Filter } from 'lucide-react';
import { Announcement } from '../App';
import AnnouncementCard from './AnnouncementCard';
import CategoryEmojiBar from './CategoryEmojiBar';
import { useLanguage } from '../context/LanguageContext';

interface OutletViewProps {
  ads: Announcement[];
  onBack: () => void;
  onViewFull: (ad: Announcement) => void;
  onToggleFavorite?: (ad: Announcement) => void;
  isFavorite?: (ad: Announcement) => boolean;
}

export default function OutletView({
  ads,
  onBack,
  onViewFull,
  onToggleFavorite,
  isFavorite
}: OutletViewProps) {
  const { language, translateCategory } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // All alliance ads from Google Sheet hoja "anuncios alianza"
  const allAlianzaAds = useMemo(() => {
    return ads.filter(Boolean);
  }, [ads]);

  // Extract unique categories present in the alliance ads
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    allAlianzaAds.forEach(a => {
      if (a.categoria && a.categoria.trim()) {
        cats.add(a.categoria.trim());
      }
    });
    return Array.from(cats).sort();
  }, [allAlianzaAds]);

  // Typewriter placeholder animation matching Marketplace
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingText, setTypingText] = useState('');

  const registeredCategories = useMemo(() => {
    return availableCategories.length > 0 
      ? availableCategories 
      : ['Accesorios', 'Alta Costura', 'Bolsos', 'Calzado', 'Cosmética', 'Joyería'];
  }, [availableCategories]);

  useEffect(() => {
    if (registeredCategories.length === 0) return;
    
    let timer: NodeJS.Timeout;
    const currentWord = registeredCategories[currentCategoryIndex % registeredCategories.length];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypingText(prev => prev.slice(0, -1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypingText(currentWord.slice(0, typingText.length + 1));
      }, 90);
    }

    if (!isDeleting && typingText === currentWord) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 3300);
    } else if (isDeleting && typingText === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentCategoryIndex(prev => prev + 1);
      }, 150);
    }

    return () => clearTimeout(timer);
  }, [typingText, isDeleting, currentCategoryIndex, registeredCategories]);

  const animatedPlaceholder = `Busca en Outlet ${typingText}...`;

  // Filtered ads
  const filteredAds = useMemo(() => {
    let result = allAlianzaAds;

    if (selectedCategories.length > 0) {
      result = result.filter(a => {
        const cat = (a.categoria || '').trim().toLowerCase();
        return selectedCategories.some(c => c.trim().toLowerCase() === cat);
      });
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(a => {
        return (
          (a.titulo || '').toLowerCase().includes(term) ||
          (a.descripcion || '').toLowerCase().includes(term) ||
          (a.categoria || '').toLowerCase().includes(term) ||
          (a.id || '').toLowerCase().includes(term) ||
          (a.promo || '').toLowerCase().includes(term) ||
          (a.precio || '').toLowerCase().includes(term) ||
          (a.pais || '').toLowerCase().includes(term)
        );
      });
    }

    return result;
  }, [allAlianzaAds, selectedCategories, searchTerm]);

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#18181B] pb-20 selection:bg-[#E85B81] selection:text-white" id="outlet-view-root">
      
      {/* Top Header Section (Solid background matching Marketplace, no gradient) */}
      <div className="w-full bg-[#FAF8F5] border-b border-[#EFE8DF] pt-4 sm:pt-6 pb-6 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-600 hover:text-[#E85B81] transition-colors py-1.5 px-3.5 rounded-full hover:bg-white/80 border border-transparent hover:border-[#EFE8DF] cursor-pointer mb-4 select-none"
            id="outlet-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'en' ? 'Back to Marketplace' : 'Volver al Marketplace'}</span>
          </button>

          {/* Hero Titles */}
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center mb-6">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#18181B] tracking-tight leading-tight">
              {language === 'en' ? 'Outlets & Promotions' : 'Outlets & Promociones'}
            </h1>

            <p className="text-xs sm:text-base text-neutral-600 mt-2 max-w-2xl font-sans">
              {language === 'en'
                ? 'The outlet of leading platforms: your favorite brands at liquidation prices'
                : 'El outlet de las plataformas líderes: tus marcas favoritas a precios de liquidación'}
            </p>
          </div>

          {/* ========================================================================= */}
          {/* SEARCH BAR: EXACTLY MATCHING MARKETPLACE DESIGN                           */}
          {/* ========================================================================= */}
          
          {/* Desktop Search */}
          <div className="hidden sm:flex w-full max-w-4xl mx-auto items-center justify-center gap-3.5 mb-6 h-14" id="outlet-desktop-search-filter-row">
            <div className="relative flex-1 h-full" id="outlet-desktop-search-container">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 z-10 pointer-events-none" />
              <input 
                type="text" 
                placeholder={language === 'en' ? 'Search partner brands, products, promo...' : animatedPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full bg-white border border-[#EFE8DF] hover:border-[#E85B81] rounded-full pl-16 pr-8 text-sm font-medium text-neutral-800 focus:outline-none focus:border-[#E85B81] focus:ring-4 focus:ring-[#E85B81]/10 transition-all shadow-sm placeholder:text-neutral-400"
                id="outlet-desktop-search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 flex items-center justify-center transition-colors cursor-pointer"
                  title="Borrar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          <div className="flex sm:hidden w-full items-center gap-2 mb-2" id="outlet-mobile-search-filter-row">
            <div className="relative flex-1 h-11">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 z-10 pointer-events-none" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search in Outlet...' : animatedPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full bg-white border border-[#EFE8DF] rounded-full pl-10 pr-4 text-xs font-medium text-neutral-800 focus:outline-none focus:border-[#E85B81] shadow-xs placeholder:text-neutral-400"
                id="outlet-mobile-search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CATEGORY EMOJI BAR: EXACTLY MATCHING MARKETPLACE DESIGN                   */}
          {/* ========================================================================= */}
          <div className="w-full max-w-4xl mx-auto px-1 -mt-3 mb-1" id="outlet-category-emoji-bar-container">
            <CategoryEmojiBar
              categories={availableCategories}
              selectedCategories={selectedCategories}
              onSelectCategory={(cat) => {
                if (!cat) {
                  setSelectedCategories([]);
                } else {
                  if (selectedCategories.includes(cat) && selectedCategories.length === 1) {
                    setSelectedCategories([]);
                  } else {
                    setSelectedCategories([cat]);
                  }
                }
              }}
              translateCategory={translateCategory}
              language={language}
            />
          </div>

          {/* Active Category Chips */}
          {selectedCategories.length > 0 && (
            <div className="max-w-4xl mx-auto mt-3 flex items-center gap-1.5 flex-wrap px-1" id="outlet-active-filter-chips">
              <span className="text-[10px] uppercase font-bold text-[#E85B81] tracking-wider flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3 text-[#E85B81]" />
                {language === 'en' ? 'Category:' : 'Categoría:'}
              </span>
              {selectedCategories.map(cat => (
                <span key={cat} className="inline-flex items-center gap-1.5 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs">
                  <span>{translateCategory(cat)}</span>
                  <button 
                    onClick={() => setSelectedCategories(prev => prev.filter(c => c !== cat))} 
                    className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors cursor-pointer"
                    title={language === 'en' ? `Remove ${translateCategory(cat)}` : `Quitar ${cat}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={() => setSelectedCategories([])}
                className="text-[11px] font-extrabold text-[#E85B81] hover:text-[#DE4B73] underline ml-1 cursor-pointer transition-colors"
              >
                {language === 'en' ? 'Clear' : 'Limpiar'}
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Main Grid with ALL Alliance Ads */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-6 sm:pt-8">
        {filteredAds.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-[#EFE8DF] p-6 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FCE8EF] text-[#E85B81] flex items-center justify-center mb-4">
              <Tag className="w-8 h-8 text-[#E85B81]" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#18181B]">
              {language === 'en' ? 'No partner ads found' : 'No se encontraron anuncios alianza'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mt-1 mb-5">
              {language === 'en'
                ? 'Try adjusting your search criteria or category filter.'
                : 'Intenta ajustar tus términos de búsqueda o limpiar la categoría seleccionada.'}
            </p>
            {(selectedCategories.length > 0 || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSearchTerm('');
                }}
                className="px-5 py-2 rounded-full bg-[#E85B81] hover:bg-[#DE4B73] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                {language === 'en' ? 'Clear filters' : 'Limpiar filtros'}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 w-full items-start">
            <AnimatePresence mode="popLayout">
              {filteredAds.map((ad, idx) => (
                <motion.div
                  key={`${ad.id || ad.titulo}-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <AnnouncementCard
                    ad={ad}
                    isDiamonds={true}
                    isFavorite={isFavorite ? isFavorite(ad) : false}
                    onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(ad) : undefined}
                    onViewFull={onViewFull}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

    </div>
  );
}
