import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, Sparkles, Tag, X, Filter, ArrowUpDown, Check, RotateCcw } from 'lucide-react';
import { Announcement } from '../App';
import AnnouncementCard from './AnnouncementCard';
import CategoryEmojiBar from './CategoryEmojiBar';
import { OutletFeaturedSection } from './OutletFeaturedSection';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils/cn';

interface OutletViewProps {
  ads: Announcement[];
  onBack: () => void;
  onViewFull: (ad: Announcement) => void;
  onToggleFavorite?: (ad: Announcement) => void;
  isFavorite?: (ad: Announcement) => boolean;
}

const PRICE_SORT_OPTIONS = [
  {
    id: 'price_desc',
    labelEs: 'Precio de mayor a menor',
    labelEn: 'Price: High to Low'
  },
  {
    id: 'price_asc',
    labelEs: 'Precio de menor a mayor',
    labelEn: 'Price: Low to High'
  },
  {
    id: 'discount_desc',
    labelEs: 'Descuentos más grandes primero',
    labelEn: 'Biggest discounts first'
  }
];

function parseNumericPrice(val?: string): number | null {
  if (!val) return null;
  const cleaned = val.replace(/,/g, '');
  const match = cleaned.match(/(\d+(?:\.\d+)?)/);
  if (match) {
    const num = parseFloat(match[1]);
    return isNaN(num) ? null : num;
  }
  return null;
}

function parseDiscountPercentage(val?: string): number {
  if (!val) return 0;
  const str = val.trim();
  if (/2\s*x\s*1/i.test(str)) return 50;
  if (/3\s*x\s*2/i.test(str)) return 33;
  const match = str.match(/(\d+)\s*%/);
  if (match) return parseInt(match[1], 10) || 0;
  const matchPrefix = str.match(/%\s*(\d+)/);
  if (matchPrefix) return parseInt(matchPrefix[1], 10) || 0;
  const numMatch = str.match(/(\d+)/);
  if (numMatch && (str.toLowerCase().includes('off') || str.toLowerCase().includes('descuento') || str.includes('-'))) {
    return parseInt(numMatch[1], 10) || 0;
  }
  return 0;
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
  const [priceSort, setPriceSort] = useState<string>('');
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

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

  // Price & Discount Sorting
  const sortedFilteredAds = useMemo(() => {
    if (!priceSort) return filteredAds;

    const copy = [...filteredAds];
    if (priceSort === 'price_desc') {
      return copy.sort((a, b) => {
        const priceA = parseNumericPrice(a.precio);
        const priceB = parseNumericPrice(b.precio);
        if (priceA === null && priceB === null) return 0;
        if (priceA === null) return 1;
        if (priceB === null) return -1;
        return priceB - priceA;
      });
    }
    if (priceSort === 'price_asc') {
      return copy.sort((a, b) => {
        const priceA = parseNumericPrice(a.precio);
        const priceB = parseNumericPrice(b.precio);
        if (priceA === null && priceB === null) return 0;
        if (priceA === null) return 1;
        if (priceB === null) return -1;
        return priceA - priceB;
      });
    }
    if (priceSort === 'discount_desc') {
      return copy.sort((a, b) => {
        const discA = parseDiscountPercentage(a.promo);
        const discB = parseDiscountPercentage(b.promo);
        if (discA === 0 && discB === 0) return 0;
        if (discA === 0) return 1;
        if (discB === 0) return -1;
        return discB - discA;
      });
    }
    return copy;
  }, [filteredAds, priceSort]);

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#18181B] pb-20 selection:bg-[#E85B81] selection:text-white" id="outlet-view-root">
      
      {/* Top Header Section (Solid background matching Marketplace, no bottom border here as it is moved below brand logos) */}
      <div className="w-full bg-[#FAF8F5] pt-4 sm:pt-6 pb-4 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-600 hover:text-[#E85B81] transition-colors py-1.5 px-3.5 rounded-full hover:bg-white/80 border border-transparent hover:border-[#EFE8DF] cursor-pointer mb-4 select-none"
            id="outlet-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'en' ? 'Back to Home' : 'Volver a Home'}</span>
          </button>

          {/* Hero Titles */}
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center mb-6">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#18181B] tracking-tight leading-tight">
              {language === 'en' ? (
                <>
                  Deals that take you <span className="text-[#F482A0]">further.</span>
                </>
              ) : (
                <>
                  Rebajas que te llevan <span className="text-[#F482A0]">lejos.</span>
                </>
              )}
            </h1>

            <p className="text-xs sm:text-base text-neutral-600 mt-2 max-w-2xl font-sans">
              {language === 'en' ? (
                <>
                  Recognized brands, outlets from leading platforms and getaway deals.{' '}
                  <span className="block mt-0.5">Everything discounted, for a limited time only.</span>
                </>
              ) : (
                <>
                  Marcas reconocidas, outlets de plataformas líderes y escapadas en oferta.{' '}
                  <span className="block mt-0.5">Todo con descuento, solo por tiempo limitado.</span>
                </>
              )}
            </p>
          </div>

          {/* Featured Horizontal Banners (P5) & Brand Logos (P6) */}
          <OutletFeaturedSection language={language} />

          {/* Separating line positioned strictly below the moving brand logos */}
          <div className="w-full border-b border-[#EFE8DF] my-8 sm:my-10" id="outlet-brands-divider" />

          {/* ========================================================================= */}
          {/* SEARCH BAR: EXACTLY MATCHING MARKETPLACE DESIGN                           */}
          {/* ========================================================================= */}
          
          {/* Desktop Search & Price Filter */}
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

            {/* Desktop Circular Price Filter Pin Button */}
            <div className="relative h-full flex items-center z-30 shrink-0" id="outlet-desktop-price-filter-container">
              <button
                type="button"
                onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
                className={`group relative h-14 w-14 rounded-full flex items-center justify-center focus:outline-none hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm border cursor-pointer ${
                  priceSort 
                    ? 'border-[#E85B81] bg-[#FCE8EF] text-[#E85B81]' 
                    : 'bg-white border-[#EFE8DF] hover:border-[#E85B81] text-[#E85B81] hover:bg-[#FFF9FB]'
                }`}
                id="outlet-desktop-price-toggle-btn"
                title={language === 'en' ? 'Sort by price' : 'Filtro por precio'}
                aria-label={language === 'en' ? 'Sort by price' : 'Filtro por precio'}
              >
                <ArrowUpDown className="w-5 h-5 text-[#E85B81]" />
                {priceSort && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E85B81] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                    1
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isPriceDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-20 bg-transparent" 
                      onClick={() => setIsPriceDropdownOpen(false)} 
                      id="outlet-desktop-price-overlay"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 bg-white border-2 border-brand-wine/10 rounded-2xl shadow-2xl z-30 overflow-hidden w-72 sm:w-80 select-none text-[#E85B81]"
                      id="outlet-desktop-price-dropdown"
                    >
                      {/* Header */}
                      <div className="px-3.5 pt-3 pb-2 flex items-center justify-between border-b border-[#E85B81]/10">
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#E85B81]">
                          <ArrowUpDown className="w-3.5 h-3.5 text-[#E85B81]" />
                          <span>{language === 'en' ? 'Sort by price' : 'Ordenar por precio'}</span>
                        </div>
                        {priceSort && (
                          <span className="w-2 h-2 rounded-full bg-[#E85B81]" />
                        )}
                      </div>

                      {/* Options */}
                      <div className="p-2 sm:p-2.5 space-y-1">
                        {PRICE_SORT_OPTIONS.map((opt) => {
                          const isChecked = priceSort === opt.id;
                          return (
                            <label
                              key={opt.id}
                              onClick={() => {
                                setPriceSort(prev => prev === opt.id ? '' : opt.id);
                              }}
                              className={cn(
                                "flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer group select-none",
                                isChecked ? "bg-[#E85B81]/15 text-[#E85B81] font-extrabold" : "hover:bg-[#E85B81]/5 text-[#E85B81]"
                              )}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={cn(
                                  "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                                  isChecked 
                                    ? "bg-[#E85B81] border-[#E85B81] text-white shadow-xs" 
                                    : "border-[#E85B81]/40 bg-white group-hover:border-[#E85B81]"
                                )}>
                                  {isChecked && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                                </div>
                                <span className="text-xs font-semibold truncate text-[#E85B81]">
                                  {language === 'en' ? opt.labelEn : opt.labelEs}
                                </span>
                              </div>
                            </label>
                          );
                        })}
                      </div>

                      {/* Footer bar */}
                      <div className="p-2 sm:p-2.5 border-t border-[#E85B81]/15 bg-[#FFF9FB] flex items-center justify-between gap-2 shrink-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[10px] sm:text-xs text-[#E85B81] font-bold px-1">
                            {!priceSort 
                              ? (language === 'en' ? '0 active filters' : '0 filtros activos') 
                              : (language === 'en' ? '1 active filter' : '1 filtro activo')}
                          </span>
                          {priceSort && (
                            <button
                              type="button"
                              onClick={() => setPriceSort('')}
                              className="flex items-center gap-1 text-[9.5px] sm:text-[10.5px] font-bold text-[#E85B81] hover:text-[#DE4B73] transition-colors cursor-pointer px-1.5 py-0.5 rounded-md hover:bg-[#E85B81]/10"
                              title={language === 'en' ? 'Clear filter' : 'Limpiar filtro'}
                            >
                              <RotateCcw className="w-2.5 h-2.5" />
                              <span>{language === 'en' ? 'Clear' : 'Limpiar'}</span>
                            </button>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsPriceDropdownOpen(false)}
                          className="px-5 py-2 bg-[#E85B81] hover:bg-[#DE4B73] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm hover:shadow active:scale-95 shrink-0"
                        >
                          {language === 'en' ? 'Done' : 'Listo'}
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Search & Price Filter */}
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

            {/* Mobile Circular Price Filter Pin Button */}
            <div className="relative shrink-0 z-30" id="outlet-mobile-price-filter-container">
              <button
                type="button"
                onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
                className={`relative h-11 w-11 rounded-full flex items-center justify-center border shrink-0 cursor-pointer ${
                  priceSort ? 'bg-[#FCE8EF] border-[#E85B81] text-[#E85B81]' : 'bg-white border-[#EFE8DF] text-[#E85B81]'
                }`}
                id="outlet-mobile-price-toggle-btn"
                title={language === 'en' ? 'Price filter' : 'Filtro por precio'}
                aria-label={language === 'en' ? 'Price filter' : 'Filtro por precio'}
              >
                <ArrowUpDown className="w-4 h-4 text-[#E85B81]" />
                {priceSort && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E85B81] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                    1
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isPriceDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-20 bg-transparent" 
                      onClick={() => setIsPriceDropdownOpen(false)} 
                      id="outlet-mobile-price-overlay"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 bg-white border-2 border-brand-wine/10 rounded-2xl shadow-2xl z-30 overflow-hidden w-72 select-none text-[#E85B81]"
                      id="outlet-mobile-price-dropdown"
                    >
                      {/* Header */}
                      <div className="px-3.5 pt-3 pb-2 flex items-center justify-between border-b border-[#E85B81]/10">
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#E85B81]">
                          <ArrowUpDown className="w-3.5 h-3.5 text-[#E85B81]" />
                          <span>{language === 'en' ? 'Sort by price' : 'Ordenar por precio'}</span>
                        </div>
                        {priceSort && (
                          <span className="w-2 h-2 rounded-full bg-[#E85B81]" />
                        )}
                      </div>

                      {/* Options */}
                      <div className="p-2 space-y-1">
                        {PRICE_SORT_OPTIONS.map((opt) => {
                          const isChecked = priceSort === opt.id;
                          return (
                            <label
                              key={opt.id}
                              onClick={() => {
                                setPriceSort(prev => prev === opt.id ? '' : opt.id);
                              }}
                              className={cn(
                                "flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer group select-none",
                                isChecked ? "bg-[#E85B81]/15 text-[#E85B81] font-extrabold" : "hover:bg-[#E85B81]/5 text-[#E85B81]"
                              )}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={cn(
                                  "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                                  isChecked 
                                    ? "bg-[#E85B81] border-[#E85B81] text-white shadow-xs" 
                                    : "border-[#E85B81]/40 bg-white group-hover:border-[#E85B81]"
                                )}>
                                  {isChecked && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                                </div>
                                <span className="text-xs font-semibold truncate text-[#E85B81]">
                                  {language === 'en' ? opt.labelEn : opt.labelEs}
                                </span>
                              </div>
                            </label>
                          );
                        })}
                      </div>

                      {/* Footer bar */}
                      <div className="p-2 border-t border-[#E85B81]/15 bg-[#FFF9FB] flex items-center justify-between gap-2 shrink-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[10px] text-[#E85B81] font-bold px-1">
                            {!priceSort 
                              ? (language === 'en' ? '0 active' : '0 activos') 
                              : (language === 'en' ? '1 active' : '1 activo')}
                          </span>
                          {priceSort && (
                            <button
                              type="button"
                              onClick={() => setPriceSort('')}
                              className="flex items-center gap-1 text-[9.5px] font-bold text-[#E85B81] hover:text-[#DE4B73] transition-colors cursor-pointer px-1.5 py-0.5 rounded-md hover:bg-[#E85B81]/10"
                            >
                              <RotateCcw className="w-2.5 h-2.5" />
                              <span>{language === 'en' ? 'Clear' : 'Limpiar'}</span>
                            </button>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsPriceDropdownOpen(false)}
                          className="px-4 py-1.5 bg-[#E85B81] hover:bg-[#DE4B73] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm hover:shadow active:scale-95 shrink-0"
                        >
                          {language === 'en' ? 'Done' : 'Listo'}
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
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

          {/* Active Category & Price Chips */}
          {(selectedCategories.length > 0 || priceSort) && (
            <div className="max-w-4xl mx-auto mt-3 flex items-center gap-1.5 flex-wrap px-1" id="outlet-active-filter-chips">
              <span className="text-[10px] uppercase font-bold text-[#E85B81] tracking-wider flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3 text-[#E85B81]" />
                {language === 'en' ? 'Filters:' : 'Filtros:'}
              </span>

              {/* Selected Categories */}
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

              {/* Selected Price Sort Chip */}
              {priceSort && (
                <span className="inline-flex items-center gap-1.5 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs">
                  <span>
                    {priceSort === 'price_desc' && (language === 'en' ? 'Price: High to Low' : 'Precio: Mayor a menor')}
                    {priceSort === 'price_asc' && (language === 'en' ? 'Price: Low to High' : 'Precio: Menor a mayor')}
                    {priceSort === 'discount_desc' && (language === 'en' ? 'Biggest discounts' : 'Descuentos más grandes')}
                  </span>
                  <button
                    onClick={() => setPriceSort('')}
                    className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors cursor-pointer"
                    title={language === 'en' ? 'Clear price sort' : 'Quitar filtro de precio'}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceSort('');
                }}
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
        {sortedFilteredAds.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-[#EFE8DF] p-6 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FCE8EF] text-[#E85B81] flex items-center justify-center mb-4">
              <Tag className="w-8 h-8 text-[#E85B81]" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#18181B]">
              {language === 'en' ? 'No partner ads found' : 'No se encontraron anuncios alianza'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mt-1 mb-5">
              {language === 'en'
                ? 'Try adjusting your search criteria, price sort or category filter.'
                : 'Intenta ajustar tus términos de búsqueda o limpiar los filtros seleccionados.'}
            </p>
            {(selectedCategories.length > 0 || searchTerm || priceSort) && (
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSearchTerm('');
                  setPriceSort('');
                }}
                className="px-5 py-2 rounded-full bg-[#E85B81] hover:bg-[#DE4B73] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                {language === 'en' ? 'Clear filters' : 'Limpiar filtros'}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 w-full items-stretch">
            {sortedFilteredAds.map((ad, idx) => (
              <motion.div
                key={ad.id || `${ad.titulo}-${ad.web || idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="h-full flex flex-col"
              >
                <AnnouncementCard
                  ad={ad}
                  index={idx}
                  isDiamonds={true}
                  isOutlet={true}
                  isFavorite={isFavorite ? isFavorite(ad) : false}
                  onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(ad) : undefined}
                  onViewFull={onViewFull}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
