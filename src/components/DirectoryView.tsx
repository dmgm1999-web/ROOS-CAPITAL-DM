import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Search, Store, Sparkles, Filter, X, Heart, 
  MapPin, Globe, Laptop, Package, ChevronLeft, ChevronRight,
  ShoppingBag, Building2, Landmark, ArrowRight
} from 'lucide-react';
import { Announcement } from '../App';
import AnnouncementCard from './AnnouncementCard';
import CategoryEmojiBar from './CategoryEmojiBar';
import { LocationCheckboxFilter } from './LocationCheckboxFilter';
import { useLanguage } from '../context/LanguageContext';
import { getCountryInfo, CountryFlag, translateCountryName } from '../utils/countryUtils';

interface DirectoryViewProps {
  ads: Announcement[];
  availableCategories?: string[];
  availableCountries?: string[];
  availableStates?: string[];
  availableMunicipios?: string[];
  onBack: () => void;
  onViewFull: (ad: Announcement) => void;
  onToggleFavorite?: (ad: Announcement) => void;
  isFavorite?: (ad: Announcement) => boolean;
  onNavigateToOutlet?: () => void;
}

const ITEMS_PER_PAGE = 24;

export default function DirectoryView({
  ads,
  availableCategories: initialCategories,
  availableCountries: initialCountries,
  availableStates: initialStates,
  availableMunicipios: initialMunicipios,
  onBack,
  onViewFull,
  onToggleFavorite,
  isFavorite,
  onNavigateToOutlet
}: DirectoryViewProps) {
  const { language, translateCategory } = useLanguage();

  // Filter out any alianza ads to ensure strictly directory ads from sheet "elementos" columna "directorio"
  const directoryAds = useMemo(() => {
    return ads.filter(a => !a.isAlianza);
  }, [ads]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedMunicipios, setSelectedMunicipios] = useState<string[]>([]);
  const [filterRemoto, setFilterRemoto] = useState(false);
  const [filterInternacional, setFilterInternacional] = useState(false);
  const [filterProveedor, setFilterProveedor] = useState(false);
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLocDropdownOpen, setIsLocDropdownOpen] = useState(false);

  // Extract categories present in directoryAds
  const availableCategories = useMemo(() => {
    if (initialCategories && initialCategories.length > 0) return initialCategories;
    const cats = new Set<string>();
    directoryAds.forEach(a => {
      const c = (a.categoria || '').trim();
      if (c) cats.add(c);
    });
    return Array.from(cats).sort();
  }, [initialCategories, directoryAds]);

  // Extract countries present in directoryAds
  const availableCountries = useMemo(() => {
    if (initialCountries && initialCountries.length > 0) return initialCountries;
    const countries = new Set<string>();
    directoryAds.forEach(a => {
      const c = (a.extractedCountry || a.pais || '').trim();
      if (c) countries.add(c);
    });
    return Array.from(countries).sort();
  }, [initialCountries, directoryAds]);

  const availableStates = useMemo(() => {
    if (initialStates && initialStates.length > 0) return initialStates;
    const states = new Set<string>();
    directoryAds.forEach(a => {
      const s = (a.estado || '').trim();
      if (s) states.add(s);
    });
    return Array.from(states).sort();
  }, [initialStates, directoryAds]);

  const availableMunicipios = useMemo(() => {
    if (initialMunicipios && initialMunicipios.length > 0) return initialMunicipios;
    const munis = new Set<string>();
    directoryAds.forEach(a => {
      const m = (a.municipio || '').trim();
      if (m) munis.add(m);
    });
    return Array.from(munis).sort();
  }, [initialMunicipios, directoryAds]);

  // Typewriter placeholder animation exactly matching Marketplace
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingText, setTypingText] = useState('');

  const registeredCategories = useMemo(() => {
    return availableCategories.length > 0 
      ? availableCategories 
      : ['Cuidado Personal', 'Accesorios', 'Alta Costura', 'Bolsos', 'Calzado', 'Cosmética', 'Joyería'];
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

  const animatedPlaceholder = `Busca ${typingText}...`;

  // Count functions for LocationCheckboxFilter
  const getCategoryCount = (cat: string) => {
    return directoryAds.filter(a => (a.categoria || '').trim().toLowerCase() === cat.trim().toLowerCase()).length;
  };
  const getCountryCount = (c: string) => {
    return directoryAds.filter(a => (a.extractedCountry || a.pais || '').trim().toLowerCase() === c.trim().toLowerCase()).length;
  };
  const getStateCount = (s: string) => {
    return directoryAds.filter(a => (a.estado || '').trim().toLowerCase() === s.trim().toLowerCase()).length;
  };
  const getMunicipioCount = (m: string) => {
    return directoryAds.filter(a => (a.municipio || '').trim().toLowerCase() === m.trim().toLowerCase()).length;
  };

  const countRemoto = useMemo(() => {
    return directoryAds.filter(a => {
      if (typeof a.online === 'boolean') return a.online;
      const val = String(a.online || '').toLowerCase();
      return val.includes('si') || val.includes('online') || val.includes('web');
    }).length;
  }, [directoryAds]);

  const countInternacional = useMemo(() => {
    return directoryAds.filter(a => {
      if (typeof a.internacional === 'boolean') return a.internacional;
      const val = String(a.internacional || '').toLowerCase();
      return val.includes('si') || val.includes('internacional');
    }).length;
  }, [directoryAds]);

  const countProveedor = useMemo(() => {
    return directoryAds.filter(a => {
      if (typeof a.proveedor === 'boolean') return a.proveedor;
      const val = String(a.proveedor || '').toLowerCase();
      return val.includes('si') || val.includes('proveedor');
    }).length;
  }, [directoryAds]);

  // Filtered ads
  const filteredAds = useMemo(() => {
    let result = directoryAds;

    if (filterFavoritesOnly && isFavorite) {
      result = result.filter(a => isFavorite(a));
    }

    if (selectedCategories.length > 0) {
      result = result.filter(a => {
        const cat = (a.categoria || '').trim().toLowerCase();
        return selectedCategories.some(c => c.trim().toLowerCase() === cat);
      });
    }

    if (selectedCountries.length > 0) {
      result = result.filter(a => {
        const c = (a.extractedCountry || a.pais || '').trim().toLowerCase();
        return selectedCountries.some(sc => sc.trim().toLowerCase() === c);
      });
    }

    if (selectedStates.length > 0) {
      result = result.filter(a => {
        const s = (a.estado || '').trim().toLowerCase();
        return selectedStates.some(st => st.trim().toLowerCase() === s);
      });
    }

    if (selectedMunicipios.length > 0) {
      result = result.filter(a => {
        const m = (a.municipio || '').trim().toLowerCase();
        return selectedMunicipios.some(sm => sm.trim().toLowerCase() === m);
      });
    }

    if (filterRemoto) {
      result = result.filter(a => {
        if (typeof a.online === 'boolean') return a.online;
        const val = String(a.online || '').toLowerCase();
        return val.includes('si') || val.includes('online') || val.includes('web');
      });
    }

    if (filterProveedor) {
      result = result.filter(a => {
        if (typeof a.proveedor === 'boolean') return a.proveedor;
        const val = String(a.proveedor || '').toLowerCase();
        return val.includes('si') || val.includes('proveedor') || val.includes('mayorista');
      });
    }

    if (filterInternacional) {
      result = result.filter(a => {
        if (typeof a.internacional === 'boolean') return a.internacional;
        const val = String(a.internacional || '').toLowerCase();
        return val.includes('si') || val.includes('internacional') || val.includes('exporta');
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
          (a.pais || '').toLowerCase().includes(term) ||
          (a.estado || '').toLowerCase().includes(term) ||
          (a.municipio || '').toLowerCase().includes(term) ||
          (a.hashtags || '').toLowerCase().includes(term) ||
          (a.promo || '').toLowerCase().includes(term)
        );
      });
    }

    return result;
  }, [
    directoryAds,
    selectedCategories,
    selectedCountries,
    selectedStates,
    selectedMunicipios,
    filterFavoritesOnly,
    filterRemoto,
    filterProveedor,
    filterInternacional,
    searchTerm,
    isFavorite
  ]);

  // Reset to page 1 on filter or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedCountries, selectedStates, selectedMunicipios, filterFavoritesOnly, filterRemoto, filterProveedor, filterInternacional, searchTerm]);

  const totalPages = Math.ceil(filteredAds.length / ITEMS_PER_PAGE) || 1;
  const paginatedAds = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAds.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAds, currentPage]);

  const activeLocationFilterCount = 
    selectedCategories.length +
    selectedCountries.length +
    selectedStates.length +
    selectedMunicipios.length +
    (filterRemoto ? 1 : 0) +
    (filterProveedor ? 1 : 0) +
    (filterInternacional ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedCountries([]);
    setSelectedStates([]);
    setSelectedMunicipios([]);
    setFilterRemoto(false);
    setFilterProveedor(false);
    setFilterInternacional(false);
    setFilterFavoritesOnly(false);
    setSearchTerm('');
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#18181B] pb-24 selection:bg-[#E85B81] selection:text-white" id="directory-view-root">
      
      {/* Top Header Section */}
      <div className="w-full bg-[#FAF8F5] border-b border-[#EFE8DF] pt-4 sm:pt-6 pb-6 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Back Button & Outlet Link */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-600 hover:text-[#E85B81] transition-colors py-1.5 px-3.5 rounded-full hover:bg-white/80 border border-transparent hover:border-[#EFE8DF] cursor-pointer select-none"
              id="directory-back-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'en' ? 'Back to Marketplace' : 'Volver a Marketplace'}</span>
            </button>

            {onNavigateToOutlet && (
              <button
                onClick={onNavigateToOutlet}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#E85B81] hover:text-[#DE4B73] bg-[#FCE8EF] hover:bg-[#F9D5E2] px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-2xs"
              >
                <span>{language === 'en' ? 'Visit Partner Outlet' : 'Ver Outlet Oficial'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Hero Titles */}
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center mb-6">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#18181B] tracking-tight leading-tight">
              {language === 'en' ? 'International Directory' : 'Directorio Internacional'}
            </h1>

            <p className="text-xs sm:text-base text-neutral-600 mt-2 max-w-2xl font-sans">
              {language === 'en' ? (
                <>Brands, Products, Services, Experiences and Suppliers, all gathered in one place <span className="whitespace-nowrap">for you,</span> save your favorites!</>
              ) : (
                <>Marcas, Productos, Servicios, Experiencias y Proveedores, reunidos en un solo lugar <span className="whitespace-nowrap">para ti,</span> ¡Guarda tus favoritos!</>
              )}
            </p>
          </div>

          {/* ========================================================================= */}
          {/* SEARCH BAR & FILTER BUTTON: EXACTLY MATCHING MARKETPLACE DESIGN          */}
          {/* ========================================================================= */}
          
          {/* Desktop Search & Filter Row */}
          <div className="hidden sm:flex w-full max-w-4xl mx-auto items-center justify-center gap-3.5 mb-6 h-14" id="directory-desktop-search-filter-row">
            <div className="relative flex-1 h-full" id="directory-desktop-search-container">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 z-10 pointer-events-none" />
              <input 
                type="text" 
                placeholder={language === 'en' ? 'Search brands, products, services...' : animatedPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full bg-white border border-[#EFE8DF] hover:border-[#E85B81] rounded-full pl-16 pr-8 text-sm font-medium text-neutral-800 focus:outline-none focus:border-[#E85B81] focus:ring-4 focus:ring-[#E85B81]/10 transition-all shadow-sm placeholder:text-neutral-400"
                id="directory-desktop-search-input"
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

            {/* Circular Filter Pin Button */}
            <div className="relative h-full flex items-center z-30 shrink-0" id="directory-desktop-filter-container">
              <button
                onClick={() => setIsLocDropdownOpen(!isLocDropdownOpen)}
                className={`group relative h-14 w-14 rounded-full flex items-center justify-center focus:outline-none hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm border cursor-pointer ${
                  activeLocationFilterCount > 0 
                    ? 'border-[#E85B81] bg-[#FCE8EF] text-[#E85B81]' 
                    : 'bg-white border-[#EFE8DF] hover:border-[#E85B81] text-[#E85B81] hover:bg-[#FFF9FB]'
                }`}
                id="directory-desktop-location-toggle-btn"
                title={language === 'en' ? 'Filters' : 'Filtros'}
                aria-label={language === 'en' ? 'Filters' : 'Filtros'}
              >
                <MapPin className="w-5 h-5 text-[#E85B81]" />
                {activeLocationFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E85B81] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                    {activeLocationFilterCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isLocDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10 bg-transparent" 
                      onClick={() => setIsLocDropdownOpen(false)} 
                      id="directory-desktop-location-overlay"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 bg-white border-2 border-brand-wine/10 rounded-2xl shadow-2xl z-20 overflow-hidden w-80 sm:w-96"
                      id="directory-desktop-location-dropdown"
                    >
                      <LocationCheckboxFilter
                        defaultSection="categorias"
                        availableCategories={availableCategories}
                        selectedCategories={selectedCategories}
                        onChangeCategories={setSelectedCategories}
                        getCategoryCount={getCategoryCount}
                        availableCountries={availableCountries}
                        availableStates={availableStates}
                        availableMunicipios={availableMunicipios}
                        selectedCountries={selectedCountries}
                        onChangeCountries={setSelectedCountries}
                        selectedStates={selectedStates}
                        onChangeStates={setSelectedStates}
                        selectedMunicipios={selectedMunicipios}
                        onChangeMunicipios={setSelectedMunicipios}
                        filterRemoto={filterRemoto}
                        onChangeRemoto={setFilterRemoto}
                        filterInternacional={filterInternacional}
                        onChangeInternacional={setFilterInternacional}
                        filterProveedor={filterProveedor}
                        onChangeProveedor={setFilterProveedor}
                        onClearAll={clearAllFilters}
                        countRemoto={countRemoto}
                        countInternacional={countInternacional}
                        countProveedor={countProveedor}
                        getCountryCount={getCountryCount}
                        getStateCount={getStateCount}
                        getMunicipioCount={getMunicipioCount}
                        onClose={() => setIsLocDropdownOpen(false)}
                      />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Search & Filter Row */}
          <div className="flex sm:hidden w-full items-center gap-2 mb-2" id="directory-mobile-search-filter-row">
            <div className="relative flex-1 h-11">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 z-10 pointer-events-none" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search brands...' : animatedPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full bg-white border border-[#EFE8DF] rounded-full pl-10 pr-4 text-xs font-medium text-neutral-800 focus:outline-none focus:border-[#E85B81] shadow-xs placeholder:text-neutral-400"
                id="directory-mobile-search-input"
              />
            </div>
            <button
              onClick={() => setIsLocDropdownOpen(true)}
              className={`relative h-11 w-11 rounded-full flex items-center justify-center border shrink-0 ${
                activeLocationFilterCount > 0 ? 'bg-[#FCE8EF] border-[#E85B81] text-[#E85B81]' : 'bg-white border-[#EFE8DF] text-[#E85B81]'
              }`}
              id="directory-mobile-location-toggle-btn"
            >
              <MapPin className="w-4 h-4 text-[#E85B81]" />
              {activeLocationFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E85B81] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {activeLocationFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Modal Bottom Sheet for Filters */}
          <AnimatePresence>
            {isLocDropdownOpen && typeof window !== 'undefined' && window.innerWidth < 640 && (
              <>
                <div 
                  className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-xs" 
                  onClick={() => setIsLocDropdownOpen(false)} 
                />
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-x-2 bottom-2 top-auto z-[130] bg-white rounded-2xl shadow-2xl border-2 border-brand-wine/10 max-h-[85vh] overflow-hidden flex flex-col"
                >
                  <LocationCheckboxFilter
                    defaultSection="categorias"
                    availableCategories={availableCategories}
                    selectedCategories={selectedCategories}
                    onChangeCategories={setSelectedCategories}
                    getCategoryCount={getCategoryCount}
                    availableCountries={availableCountries}
                    availableStates={availableStates}
                    availableMunicipios={availableMunicipios}
                    selectedCountries={selectedCountries}
                    onChangeCountries={setSelectedCountries}
                    selectedStates={selectedStates}
                    onChangeStates={setSelectedStates}
                    selectedMunicipios={selectedMunicipios}
                    onChangeMunicipios={setSelectedMunicipios}
                    filterRemoto={filterRemoto}
                    onChangeRemoto={setFilterRemoto}
                    filterInternacional={filterInternacional}
                    onChangeInternacional={setFilterInternacional}
                    filterProveedor={filterProveedor}
                    onChangeProveedor={setFilterProveedor}
                    onClearAll={clearAllFilters}
                    countRemoto={countRemoto}
                    countInternacional={countInternacional}
                    countProveedor={countProveedor}
                    getCountryCount={getCountryCount}
                    getStateCount={getStateCount}
                    getMunicipioCount={getMunicipioCount}
                    isMobileCompact={true}
                    onClose={() => setIsLocDropdownOpen(false)}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ========================================================================= */}
          {/* CATEGORY EMOJI BAR: EXACTLY MATCHING MARKETPLACE (image.png)              */}
          {/* ========================================================================= */}
          <div className="w-full max-w-4xl mx-auto px-1 -mt-3 mb-1" id="directory-category-emoji-bar-container">
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

          {/* Active Filter Chips */}
          {activeLocationFilterCount > 0 && (
            <div className="max-w-4xl mx-auto mt-3 flex items-center gap-1.5 flex-wrap px-1" id="directory-active-filter-chips">
              <span className="text-[10px] uppercase font-bold text-[#E85B81] tracking-wider flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3 text-[#E85B81]" />
                {language === 'en' ? 'Active filters:' : 'Filtros activos:'}
              </span>
              {selectedCategories.map(cat => (
                <span key={cat} className="inline-flex items-center gap-1.5 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs">
                  <ShoppingBag className="w-3 h-3 text-[#E85B81]" />
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
              {selectedCountries.map(c => {
                const cName = translateCountryName(c, language);
                return (
                  <span key={c} className="inline-flex items-center gap-1 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs">
                    <CountryFlag countryCode={getCountryInfo(c).code} className="w-3.5 h-2.5 shrink-0" title={cName} />
                    <span>{cName}</span>
                    <button 
                      onClick={() => setSelectedCountries(prev => prev.filter(x => x !== c))} 
                      className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
              {selectedStates.map(s => (
                <span key={s} className="inline-flex items-center gap-1 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs">
                  <Building2 className="w-3 h-3 text-[#E85B81]" />
                  <span>{s}</span>
                  <button 
                    onClick={() => setSelectedStates(prev => prev.filter(x => x !== s))} 
                    className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedMunicipios.map(m => (
                <span key={m} className="inline-flex items-center gap-1 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs">
                  <Landmark className="w-3 h-3 text-[#E85B81]" />
                  <span>{m}</span>
                  <button 
                    onClick={() => setSelectedMunicipios(prev => prev.filter(x => x !== m))} 
                    className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filterProveedor && (
                <span className="inline-flex items-center gap-1.5 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs">
                  <Package className="w-3 h-3 text-[#E85B81]" />
                  <span>{language === 'en' ? 'Supplier' : 'Proveedor'}</span>
                  <button 
                    onClick={() => setFilterProveedor(false)} 
                    className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterRemoto && (
                <span className="inline-flex items-center gap-1.5 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs">
                  <Laptop className="w-3 h-3 text-[#E85B81]" />
                  <span>{language === 'en' ? 'Remote' : 'Remoto'}</span>
                  <button 
                    onClick={() => setFilterRemoto(false)} 
                    className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterInternacional && (
                <span className="inline-flex items-center gap-1.5 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs">
                  <Globe className="w-3 h-3 text-[#E85B81]" />
                  <span>{language === 'en' ? 'International' : 'Internacional'}</span>
                  <button 
                    onClick={() => setFilterInternacional(false)} 
                    className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-extrabold text-[#E85B81] hover:text-[#DE4B73] underline ml-1 cursor-pointer transition-colors"
              >
                {language === 'en' ? 'Clear all' : 'Limpiar todo'}
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-6">

        {/* Empty State */}
        {filteredAds.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-[#EFE8DF] p-6 shadow-xs my-4">
            <div className="w-16 h-16 rounded-full bg-[#FCE8EF] text-[#E85B81] flex items-center justify-center mb-4 shadow-inner">
              <Store className="w-8 h-8 text-[#E85B81]" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#18181B]">
              {language === 'en' ? 'No businesses found' : 'No se encontraron negocios'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mt-1 mb-5">
              {language === 'en'
                ? 'Try adjusting your search criteria, category or location filters to see more results.'
                : 'Intenta cambiar tus términos de búsqueda o limpiar los filtros seleccionados.'}
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 rounded-full bg-[#E85B81] hover:bg-[#DE4B73] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              {language === 'en' ? 'Clear all filters' : 'Limpiar todos los filtros'}
            </button>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 w-full items-stretch" id="directory-cards-grid">
            <AnimatePresence mode="popLayout">
              {paginatedAds.map((ad, idx) => (
                <motion.div
                  key={`${ad.id || ad.titulo}-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  <AnnouncementCard
                    ad={ad}
                    isDiamonds={false}
                    isFavorite={isFavorite ? isFavorite(ad) : false}
                    onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(ad) : undefined}
                    onViewFull={onViewFull}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10 pb-4 select-none" id="directory-pagination-controls">
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(p => p - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              disabled={currentPage === 1}
              className={`p-2 sm:px-4 sm:py-2 rounded-full border text-xs font-bold transition-all flex items-center gap-1 ${
                currentPage === 1
                  ? 'border-neutral-200 text-neutral-300 pointer-events-none'
                  : 'border-[#EFE8DF] bg-white hover:bg-[#FCE8EF] text-[#E85B81] cursor-pointer shadow-2xs'
              }`}
              title="Página anterior"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'Previous' : 'Anterior'}</span>
            </button>

            {/* Page number buttons */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 2 + i;
                  if (pageNum > totalPages) pageNum = totalPages - 4 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                      currentPage === pageNum
                        ? 'bg-[#E85B81] text-white shadow-xs'
                        : 'bg-white hover:bg-[#FCE8EF] text-neutral-700 hover:text-[#E85B81] border border-[#EFE8DF]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage(p => p + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              disabled={currentPage === totalPages}
              className={`p-2 sm:px-4 sm:py-2 rounded-full border text-xs font-bold transition-all flex items-center gap-1 ${
                currentPage === totalPages
                  ? 'border-neutral-200 text-neutral-300 pointer-events-none'
                  : 'border-[#EFE8DF] bg-white hover:bg-[#FCE8EF] text-[#E85B81] cursor-pointer shadow-2xs'
              }`}
              title="Página siguiente"
            >
              <span className="hidden sm:inline">{language === 'en' ? 'Next' : 'Siguiente'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
