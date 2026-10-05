import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Store, 
  Users, 
  Globe, 
  Heart, 
  Sparkles,
  Search,
  User,
  Menu,
  X
} from 'lucide-react';
import { SpotlightBanner } from './SpotlightBanner';
import { LanguageToggle } from './LanguageToggle';
import { ContactModal } from './ContactModal';
import RoosLogo from './RoosLogo';
import { useLanguage } from '../context/LanguageContext';
import { playDiamondSound } from '../App';

interface HeroSectionProps {
  spotlightImages: string[];
  isRegisterOpen?: boolean;
  onRegisterOpenChange?: (open: boolean) => void;
  onExploreMarketplace: () => void;
  onNavigateToView: (view: any) => void;
  onOpenLogin: () => void;
  onOpenFavorites?: () => void;
  onOpenSearch?: () => void;
  currentView?: string;
  favoritesCount?: number;
}

export function HeroSection({
  spotlightImages,
  isRegisterOpen,
  onRegisterOpenChange,
  onExploreMarketplace,
  onNavigateToView,
  onOpenLogin,
  onOpenFavorites,
  onOpenSearch,
  currentView = 'main',
  favoritesCount = 0
}: HeroSectionProps) {
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="w-full bg-[#FAF8F5] text-[#18181B] selection:bg-[#E85B81] selection:text-white" id="hero-section-root">
      
      {/* ============================================================ */}
      {/* TOP NAVIGATION BAR (Exact match to reference image) */}
      {/* ============================================================ */}
      <header className="w-full border-b border-[#EFE8DF] sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md transition-all">
        <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <button 
            onClick={() => onNavigateToView('main')}
            className="flex flex-col items-center cursor-pointer group text-center focus:outline-none"
            title="ROOS Capital - Inicio"
          >
            <RoosLogo 
              align="center"
              className="text-[#18181B] group-hover:text-[#E85B81] transition-colors" 
            />
          </button>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-neutral-700">
            <button
              onClick={() => {
                if (currentView !== 'main') onNavigateToView('main');
                setTimeout(() => onExploreMarketplace(), 100);
              }}
              className={`hover:text-[#E85B81] transition-colors cursor-pointer ${
                currentView === 'main' ? 'text-[#E85B81]' : ''
              }`}
            >
              {t('nav.marketplace')}
            </button>
            <button
              onClick={() => onNavigateToView('ugc_program')}
              className={`hover:text-[#E85B81] transition-colors cursor-pointer ${
                currentView === 'ugc_program' ? 'text-[#E85B81]' : ''
              }`}
            >
              {t('nav.creators')}
            </button>
            <button
              onClick={() => onNavigateToView('publicate')}
              className={`hover:text-[#E85B81] transition-colors cursor-pointer ${
                currentView === 'publicate' ? 'text-[#E85B81]' : ''
              }`}
            >
              {t('nav.forBrands')}
            </button>
            <button
              onClick={() => onNavigateToView('somos_roos')}
              className={`hover:text-[#E85B81] transition-colors cursor-pointer ${
                currentView === 'somos_roos' ? 'text-[#E85B81]' : ''
              }`}
            >
              {t('nav.community')}
            </button>
            <button
              onClick={() => onNavigateToView('educacion')}
              className={`hover:text-[#E85B81] transition-colors cursor-pointer ${
                currentView === 'educacion' ? 'text-[#E85B81]' : ''
              }`}
            >
              {t('nav.education')}
            </button>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Language Toggle (Desktop) */}
            <LanguageToggle className="hidden sm:inline-flex" />

            {/* Search Icon */}
            <button 
              onClick={() => {
                if (currentView !== 'main') onNavigateToView('main');
                onOpenSearch?.();
              }}
              className="w-9 h-9 flex items-center justify-center rounded-full text-neutral-700 hover:text-[#E85B81] hover:bg-neutral-200/50 transition-colors cursor-pointer"
              title={t('nav.searchTitle')}
              aria-label={t('nav.searchTitle')}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Log In Link */}
            <button
              onClick={onOpenLogin}
              className="hidden sm:inline-block text-sm font-semibold text-neutral-700 hover:text-[#E85B81] transition-colors cursor-pointer px-2 py-1"
            >
              {t('nav.login')}
            </button>

            {/* Pink Button next to Log In: Mis Favoritas */}
            <button
              onClick={onOpenFavorites || onOpenLogin}
              className="bg-[#E85B81] hover:bg-[#DE4B73] active:scale-95 text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <span>{t('nav.favorites')}</span>
              <span className="text-white/95 text-sm leading-none">♥</span>
              {favoritesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-white/25 rounded-full font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-neutral-700 hover:text-[#E85B81] focus:outline-none"
              aria-label={t('nav.menu')}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#EFE8DF] bg-[#FAF8F5] px-6 py-5 flex flex-col gap-3.5 text-base font-semibold text-neutral-800 shadow-xl">
            {/* Language Switcher in Mobile Drawer */}
            <div className="flex items-center justify-between pb-2 border-b border-[#EFE8DF]">
              <span className="text-xs uppercase font-bold text-neutral-500">Idioma / Language</span>
              <LanguageToggle />
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView !== 'main') onNavigateToView('main');
                setTimeout(() => onExploreMarketplace(), 100);
              }}
              className="text-left py-1 hover:text-[#E85B81] transition-colors"
            >
              {t('nav.marketplace')}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToView('ugc_program');
              }}
              className="text-left py-1 hover:text-[#E85B81] transition-colors"
            >
              {t('nav.creators')} (UGC)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToView('publicate');
              }}
              className="text-left py-1 hover:text-[#E85B81] transition-colors"
            >
              {t('nav.forBrands')}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToView('somos_roos');
              }}
              className="text-left py-1 hover:text-[#E85B81] transition-colors"
            >
              {t('nav.community')}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToView('educacion');
              }}
              className="text-left py-1 hover:text-[#E85B81] transition-colors"
            >
              {t('nav.education')}
            </button>
            <div className="pt-2 border-t border-[#EFE8DF] flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="text-left text-sm font-bold text-neutral-700 hover:text-[#E85B81]"
              >
                {t('nav.login')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFavorites?.();
                }}
                className="bg-[#E85B81] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
              >
                <span>{t('nav.favorites')}</span>
                <span>♥</span>
                {favoritesCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 text-[9px] bg-white/25 rounded-full font-bold">
                    {favoritesCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================ */}
      {/* HERO SECTION: Discover. Connect. Grow. + Spotlight Collage   */}
      {/* (Rendered when on main view)                                  */}
      {/* ============================================================ */}
      {currentView === 'main' && (
        <>
          <section className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative">
          
          {/* Centered Hand-Drawn Crayon Heart between Text and Spotlight Banner (Desktop) */}
          <div className="hidden lg:flex absolute left-[39.5%] xl:left-[40%] top-[40%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none">
            <motion.div
              initial={{ scale: 0.95, rotate: -2 }}
              animate={{ 
                scale: [1, 1.04, 1], 
                rotate: [-2, 2, -2],
                y: [0, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            >
              <svg 
                className="w-28 h-28 xl:w-36 xl:h-36 text-[#E85B81] drop-shadow-[0_4px_16px_rgba(232,91,129,0.22)]" 
                viewBox="0 0 300 300" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="crayon-roughness-desktop" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                {/* Hand-drawn open crayon heart outline matching user's uploaded drawing */}
                <path 
                  d="M136 112 
                     C 126 82, 102 42, 72 20 
                     C 50 4, 24 16, 14 44 
                     C 3 70, 7 104, 18 142 
                     C 32 186, 62 230, 96 262 
                     C 112 278, 126 292, 134 296 
                     C 142 284, 170 252, 202 212 
                     C 240 162, 276 110, 280 74 
                     C 285 42, 270 18, 242 12 
                     C 212 6, 184 20, 162 48 
                     C 148 68, 140 92, 136 112 Z" 
                  stroke="#E85B81" 
                  strokeWidth="16" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  filter="url(#crayon-roughness-desktop)"
                />
              </svg>
            </motion.div>
          </div>

          {/* Left Column: Editorial Typography & CTAs */}
          <div className="lg:col-span-5 flex flex-col items-start z-10">
            {/* Kicker */}
            <span className="text-[#E85B81] font-bold text-xs sm:text-[13px] tracking-[0.16em] uppercase mb-4 sm:mb-6 font-sans leading-relaxed">
              {language === 'en' ? (
                <>
                  DISCOVER WHAT WOMEN ARE{' '}
                  <span className="inline-block whitespace-nowrap">CREATING WORLDWIDE</span>
                </>
              ) : (
                <>
                  DESCUBRE LO QUE LAS MUJERES ESTAMOS<br className="hidden sm:inline" />{' '}
                  <span className="inline-block whitespace-nowrap">CREANDO EN TODO EL MUNDO</span>
                </>
              )}
            </span>

            {/* Massive Serif Title */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-[#18181B] leading-[1.02] tracking-tight mb-6 sm:mb-8">
              {t('hero.titleLine1')}<br />
              {t('hero.titleLine2')}<br />
              <span>{t('hero.titleLine3')}</span>
            </h1>

            {/* Centered Hand-Drawn Heart on Mobile/Tablet between text and banner */}
            <div className="lg:hidden flex justify-center w-full my-2 select-none pointer-events-none">
              <svg 
                className="w-20 h-20 sm:w-24 sm:h-24 text-[#E85B81] drop-shadow-[0_4px_12px_rgba(232,91,129,0.2)]" 
                viewBox="0 0 300 300" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="crayon-roughness-mobile" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                <path 
                  d="M136 112 
                     C 126 82, 102 42, 72 20 
                     C 50 4, 24 16, 14 44 
                     C 3 70, 7 104, 18 142 
                     C 32 186, 62 230, 96 262 
                     C 112 278, 126 292, 134 296 
                     C 142 284, 170 252, 202 212 
                     C 240 162, 276 110, 280 74 
                     C 285 42, 270 18, 242 12 
                     C 212 6, 184 20, 162 48 
                     C 148 68, 140 92, 136 112 Z" 
                  stroke="#E85B81" 
                  strokeWidth="16" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  filter="url(#crayon-roughness-mobile)"
                />
              </svg>
            </div>

            {/* Subheading / Mission */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-lg mb-8 sm:mb-10 font-sans font-normal">
              {t('hero.subtitle')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              {/* Primary: Explore Marketplace */}
              <button
                onClick={onExploreMarketplace}
                className="px-7 sm:px-8 py-3.5 sm:py-4 bg-[#E85B81] hover:bg-[#DE4B73] active:scale-95 text-white rounded-full font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>{t('hero.explore')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary: Get featured */}
              <button
                onClick={() => setShowContactModal(true)}
                className="px-7 sm:px-8 py-3.5 sm:py-4 bg-transparent hover:bg-white active:scale-95 text-[#18181B] border border-neutral-300 hover:border-neutral-400 rounded-full font-bold text-sm sm:text-base transition-all cursor-pointer shadow-xs"
              >
                {t('hero.getFeatured')}
              </button>
            </div>
          </div>

          {/* Right Column: Photography Collage with Spotlight Banner Embedded */}
          <div className="lg:col-span-7 relative w-full flex items-center justify-center">
            
            {/* Background Blush Pink Organic Watercolor / Brush Accents */}
            <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#FCE8EF] rounded-[40%_60%_70%_30%/40%_50%_60%_55%] blur-2xl pointer-events-none -z-10 opacity-75" />
            <div className="absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-12 w-80 sm:w-[28rem] h-80 sm:h-[28rem] bg-[#FCE8EF] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl pointer-events-none -z-10 opacity-80" />
            
            {/* Decorative Pink Paper Brush Accent Behind Cards */}
            <div className="absolute -top-4 left-6 sm:left-12 w-32 sm:w-44 h-44 sm:h-60 bg-[#FCE8EF] -rotate-12 rounded-2xl pointer-events-none -z-10" />
            <div className="absolute -top-3 right-8 sm:right-16 w-36 sm:w-48 h-48 sm:h-64 bg-[#FCE8EF] rotate-6 rounded-2xl pointer-events-none -z-10" />

            {/* Spotlight Banner Container */}
            <div className="relative w-full max-w-[880px] lg:max-w-[960px] xl:max-w-[1040px] px-0 sm:px-1 py-4 sm:py-6">
              
              {/* Central Featured Element: SPOTLIGHT BANNER EMBEDDED */}
              <div className="relative z-10 w-full max-w-[860px] lg:max-w-[940px] xl:max-w-[1020px] mx-auto rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.14)] border-4 sm:border-8 border-white bg-white">
                <SpotlightBanner
                  images={spotlightImages}
                  isRegisterOpen={isRegisterOpen}
                  onRegisterOpenChange={onRegisterOpenChange}
                  containerClassName="w-full relative"
                  className="relative w-full overflow-hidden bg-neutral-950 aspect-[16/9] select-none group isolate"
                />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* PROOF / STATS STRIP BAR (Exact match to reference image)     */}
      {/* ============================================================ */}
      <section className="w-full bg-[#FAF8F5] border-y border-[#EFE8DF] py-7 sm:py-9">
        <div className="max-w-[84rem] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Left: Handwritten Note shifted to match right margin */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left shrink-0 lg:ml-8 xl:ml-12">
              <div className="font-handwriting text-2xl sm:text-3xl lg:text-4xl text-neutral-800 leading-tight relative">
                <p className="inline-flex items-center gap-1.5 justify-center lg:justify-start">
                  <span>{t('stats.moreThan')}</span>
                  <span className="text-[#E85B81] text-xl sm:text-2xl lg:text-3xl leading-none select-none -translate-y-0.5">♡</span>
                </p>
                <p>{t('stats.justPlatform')}</p>
                {/* Pink Doodle Underline */}
                <svg className="w-24 sm:w-28 h-3 text-[#E85B81] -mt-1" viewBox="0 0 100 12" fill="none">
                  <path d="M2 9C25 3 65 3 98 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Right: 4 Stat Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 lg:gap-14 w-full lg:w-auto items-start justify-center">
              
              {/* Stat 1: Women-owned businesses */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#FCE8EF] flex items-center justify-center mb-2.5">
                  <Store className="w-5 h-5 text-[#E85B81]" />
                </div>
                <span className="font-serif font-bold text-xl sm:text-2xl text-[#18181B] leading-none">
                  {t('stats.businesses')}
                </span>
                <span className="text-xs sm:text-sm text-neutral-600 font-sans mt-1">
                  {t('stats.businessesLabel')}
                </span>
              </div>

              {/* Stat 2: Creators */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#FCE8EF] flex items-center justify-center mb-2.5">
                  <Users className="w-5 h-5 text-[#E85B81]" />
                </div>
                <span className="font-serif font-bold text-xl sm:text-2xl text-[#18181B] leading-none">
                  {t('stats.creators')}
                </span>
                <span className="text-xs sm:text-sm text-neutral-600 font-sans mt-1">
                  {t('stats.creatorsLabel')}
                </span>
              </div>

              {/* Stat 3: Countries */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#FCE8EF] flex items-center justify-center mb-2.5">
                  <Globe className="w-5 h-5 text-[#E85B81]" />
                </div>
                <span className="font-serif font-bold text-xl sm:text-2xl text-[#18181B] leading-none">
                  {t('stats.countries')}
                </span>
                <span className="text-xs sm:text-sm text-neutral-600 font-sans mt-1">
                  {t('stats.countriesLabel')}
                </span>
              </div>

              {/* Stat 4: Collaborations */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#FCE8EF] flex items-center justify-center mb-2.5">
                  <Heart className="w-5 h-5 text-[#E85B81]" />
                </div>
                <span className="font-serif font-bold text-xl sm:text-2xl text-[#18181B] leading-none">
                  {t('stats.collaborations')}
                </span>
                <span className="text-xs sm:text-sm text-neutral-600 font-sans mt-1 leading-snug max-w-[13rem]">
                  {t('stats.collaborationsLabel')}
                </span>
              </div>

            </div>

          </div>
        </div>
          </section>
        </>
      )}

      {/* Community / Contact Modal triggered by 'Join ROOS' button */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />

    </div>
  );
}
