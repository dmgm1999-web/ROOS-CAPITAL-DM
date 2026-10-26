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

// Halloween Cute Ghost SVG for Spotlight Banner Corner (replaces witch hat with same size)
export function SpotlightGhost({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Ghost Body Gradient - Celeste / Sky Blue */}
        <linearGradient id="ghostBodyGrad" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#7DD3FC" />
        </linearGradient>
        {/* Soft Celeste Ethereal Glow */}
        <filter id="ghostSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0284C7" floodOpacity="0.3" />
        </filter>
        <radialGradient id="ghostCheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F472B6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Floating Magic Stars/Sparkles in Celeste and Gold */}
      <circle cx="165" cy="45" r="2.5" fill="#FFE066" className="animate-pulse" />
      <circle cx="40" cy="55" r="2" fill="#38BDF8" />
      <polygon points="172,32 174,37 179,38 174,39 172,44 170,39 165,38 170,37" fill="#FFE066" />
      <polygon points="32,70 33.5,74 38,75 33.5,76 32,80 30.5,76 26,75 30.5,74" fill="#38BDF8" />

      {/* Floating Shadow Under Ghost */}
      <ellipse cx="102" cy="182" rx="42" ry="9" fill="rgba(14, 165, 233, 0.18)" filter="blur(4px)" />

      {/* Ghost Silhouette with Waving Arms and Ruffled Skirt Tail */}
      <g filter="url(#ghostSoftGlow)">
        <path
          d="M 100 24
             C 65 24, 48 52, 48 85
             C 48 95, 36 100, 24 106
             C 18 109, 17 117, 24 122
             C 34 128, 48 122, 53 114
             C 54 124, 52 142, 54 156
             C 55 166, 62 172, 72 165
             C 80 159, 86 161, 92 167
             C 100 175, 108 173, 114 165
             C 120 159, 126 160, 134 167
             C 142 173, 150 166, 150 156
             C 152 140, 150 124, 152 110
             C 160 118, 172 124, 180 118
             C 186 113, 184 104, 176 100
             C 164 94, 152 92, 152 82
             C 152 50, 135 24, 100 24
             Z"
          fill="url(#ghostBodyGrad)"
          stroke="#7DD3FC"
          strokeWidth="2"
        />

        {/* Rosy Pink Cheeks */}
        <ellipse cx="76" cy="98" rx="8" ry="4.5" fill="url(#ghostCheek)" />
        <ellipse cx="126" cy="98" rx="8" ry="4.5" fill="url(#ghostCheek)" />

        {/* Cute Big Spooky Eyes */}
        <ellipse cx="80" cy="84" rx="7.5" ry="10.5" fill="#18181B" transform="rotate(-3 80 84)" />
        <ellipse cx="122" cy="84" rx="7.5" ry="10.5" fill="#18181B" transform="rotate(3 122 84)" />
        {/* Eye Catchlights */}
        <circle cx="82.5" cy="80.5" r="3" fill="#FFFFFF" />
        <circle cx="78" cy="88" r="1.5" fill="#FFFFFF" />
        <circle cx="124.5" cy="80.5" r="3" fill="#FFFFFF" />
        <circle cx="120" cy="88" r="1.5" fill="#FFFFFF" />

        {/* Happy Spooky Open Mouth */}
        <ellipse cx="101" cy="102" rx="6.5" ry="9" fill="#18181B" />
        {/* Cute Pink Tongue */}
        <path
          d="M 97 105 Q 101 110 105 105 Q 105 109 101 110 Q 97 109 97 105 Z"
          fill="#E85B81"
        />
      </g>
    </svg>
  );
}

// Halloween Super Kawaii Cute Pumpkin SVG for Spotlight Banner Corner (matches SpotlightGhost)
export function SpotlightPumpkin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="kawaiiSpotlightPumpGrad" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FFA63D" />
          <stop offset="60%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#EA580C" />
        </radialGradient>
        <radialGradient id="kawaiiSpotlightPumpCheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E85B81" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#E85B81" stopOpacity="0" />
        </radialGradient>
        <filter id="kawaiiSpotlightPumpSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#EA580C" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Floating Magic Stars/Sparkles matching SpotlightGhost */}
      <circle cx="35" cy="45" r="2.5" fill="#FFE066" className="animate-pulse" />
      <circle cx="165" cy="65" r="2" fill="#E85B81" />
      <polygon points="30,68 31.5,72 36,73 31.5,74 30,78 28.5,74 24,73 28.5,72" fill="#FFE066" />
      <polygon points="168,48 169.5,52 174,53 169.5,54 168,58 166.5,54 162,53 166.5,52" fill="#F472B6" />

      {/* Floating Soft Shadow */}
      <ellipse cx="100" cy="184" rx="46" ry="10" fill="rgba(234, 88, 12, 0.16)" filter="blur(4px)" />

      {/* Cute Twisted Green Stem and Little Leaf */}
      <path
        d="M 98 48 
           C 96 28, 108 14, 126 10 
           C 122 18, 116 26, 110 46 
           Z"
        fill="#2E7D32"
        stroke="#1B5E20"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Cute little green leaf */}
      <path
        d="M 112 40 C 124 30, 138 34, 140 44 C 132 46, 120 45, 112 40 Z"
        fill="#4CAF50"
        stroke="#2E7D32"
        strokeWidth="1.2"
      />
      {/* Curling green tendril */}
      <path
        d="M 108 44 Q 120 38 126 46 Q 130 52 122 55 Q 116 56 119 50"
        stroke="#4CAF50"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Plump Chubby Pumpkin Body */}
      <g filter="url(#kawaiiSpotlightPumpSoftGlow)">
        {/* Outer Left Lobe */}
        <ellipse cx="58" cy="118" rx="36" ry="50" fill="url(#kawaiiSpotlightPumpGrad)" stroke="#C2410C" strokeWidth="2" />
        {/* Outer Right Lobe */}
        <ellipse cx="142" cy="118" rx="36" ry="50" fill="url(#kawaiiSpotlightPumpGrad)" stroke="#C2410C" strokeWidth="2" />
        {/* Mid Left Lobe */}
        <ellipse cx="78" cy="120" rx="35" ry="54" fill="url(#kawaiiSpotlightPumpGrad)" stroke="#C2410C" strokeWidth="2" />
        {/* Mid Right Lobe */}
        <ellipse cx="122" cy="120" rx="35" ry="54" fill="url(#kawaiiSpotlightPumpGrad)" stroke="#C2410C" strokeWidth="2" />
        {/* Central Lobe */}
        <ellipse cx="100" cy="122" rx="36" ry="56" fill="url(#kawaiiSpotlightPumpGrad)" stroke="#C2410C" strokeWidth="2.5" />

        {/* Rosy Kawaii Pink Blushing Cheeks with Anime Blush Lines */}
        <ellipse cx="68" cy="130" rx="10" ry="5.5" fill="url(#kawaiiSpotlightPumpCheek)" />
        <ellipse cx="132" cy="130" rx="10" ry="5.5" fill="url(#kawaiiSpotlightPumpCheek)" />
        <line x1="64" y1="128" x2="67" y2="132" stroke="#E85B81" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="68" y1="128" x2="71" y2="132" stroke="#E85B81" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="129" y1="128" x2="132" y2="132" stroke="#E85B81" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="133" y1="128" x2="136" y2="132" stroke="#E85B81" strokeWidth="1.6" strokeLinecap="round" />

        {/* Playful Eyebrows */}
        <path d="M 66 104 Q 75 99 84 103" stroke="#7C2D12" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M 116 104 Q 125 99 134 103" stroke="#7C2D12" strokeWidth="2.2" strokeLinecap="round" fill="none" />

        {/* Left Eye: Big Radiant Anime Eye with Star & Highlights */}
        <ellipse cx="75" cy="115" rx="8.5" ry="11.5" fill="#18181B" transform="rotate(-2 75 115)" />
        <path d="M 65 109 Q 75 103 85 108" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 83 108 L 87 105" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
        {/* Main catchlight */}
        <circle cx="78" cy="111" r="3.4" fill="#FFFFFF" />
        {/* Secondary light */}
        <circle cx="72.5" cy="119" r="1.8" fill="#FFFFFF" />
        {/* Cute star shine sparkle */}
        <polygon points="78,114.5 79,116 80.5,117 79,118 78,119.5 77,118 75.5,117 77,116" fill="#FFFFFF" opacity="0.9" />

        {/* Right Eye: Playful Cheerful Wink with Cute Eyelashes */}
        <path d="M 115 118 Q 125 108 135 118" stroke="#18181B" strokeWidth="3.6" strokeLinecap="round" fill="none" />
        <path d="M 133 116 L 139 112" stroke="#18181B" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M 129 111 L 134 106" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" />

        {/* Tiny Sweet Rounded Jack-o'-Lantern Nose */}
        <path d="M 97.5 121 L 102.5 121 L 100 125 Z" fill="#18181B" stroke="#18181B" strokeWidth="0.8" strokeLinejoin="round" />

        {/* Cheerful Kawaii Open Mouth with Baby Fangs & Pink Tongue */}
        <path
          d="M 88 128 Q 100 146 112 128 Z"
          fill="#18181B"
        />
        <path
          d="M 88 128 Q 100 146 112 128"
          stroke="#18181B"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Dimple accents at smile corners */}
        <path d="M 87 127 C 86 125, 87 124, 89 125" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 113 127 C 114 125, 113 124, 111 125" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Two Tiny Cute White Baby Jack-o'-Lantern Fangs */}
        <polygon points="91.5,128 94,133.5 96.5,128" fill="#FFFFFF" />
        <polygon points="103.5,128 106,133.5 108.5,128" fill="#FFFFFF" />

        {/* Adorable Pink Tongue */}
        <path
          d="M 94 137 Q 100 144 106 137 Q 106 142 100 144 Q 94 142 94 137 Z"
          fill="#FF5E8E"
        />
      </g>
    </svg>
  );
}

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
      <header className="w-full border-b border-[#EFE8DF] sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md">
        <div className="max-w-[88rem] mx-auto px-3 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <button 
            onClick={() => onNavigateToView('main')}
            className="flex flex-col items-center cursor-pointer group text-center focus:outline-none shrink-0"
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
              onClick={() => onNavigateToView('outlet')}
              className={`hover:text-[#E85B81] transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'outlet' ? 'text-[#E85B81]' : ''
              }`}
            >
              <span>Outlet</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#E85B81] text-white text-[9.5px] font-black uppercase tracking-wider shadow-2xs">
                Sale
              </span>
            </button>
            <button
              onClick={() => onNavigateToView('directorio')}
              className={`hover:text-[#E85B81] transition-colors cursor-pointer ${
                currentView === 'directorio' ? 'text-[#E85B81]' : ''
              }`}
            >
              {language === 'en' ? 'Directory' : 'Directorio'}
            </button>
            <button
              onClick={() => onNavigateToView('ugc_program')}
              className={`hover:text-[#E85B81] transition-colors cursor-pointer ${
                currentView === 'ugc_program' ? 'text-[#E85B81]' : ''
              }`}
            >
              {t('nav.creators')}
            </button>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-3 shrink-0">
            
            {/* Desktop Language Switcher (strictly hidden on mobile, placed exclusively inside hamburger menu on mobile) */}
            <div className="hidden md:flex items-center">
              <LanguageToggle className="scale-100 origin-right" />
            </div>

            {/* Search Icon */}
            <button 
              onClick={() => {
                if (currentView !== 'main') onNavigateToView('main');
                onOpenSearch?.();
              }}
              className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-neutral-700 hover:text-[#E85B81] hover:bg-neutral-200/50 transition-colors cursor-pointer shrink-0"
              title={t('nav.searchTitle')}
              aria-label={t('nav.searchTitle')}
            >
              <Search className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
            </button>

            {/* Log In Link positioned between search icon and favorites button */}
            <button
              onClick={onOpenLogin}
              className="text-[11px] xs:text-xs sm:text-sm font-semibold text-neutral-700 hover:text-[#E85B81] transition-colors cursor-pointer px-1 xs:px-1.5 sm:px-2 py-1 whitespace-nowrap shrink-0"
            >
              {t('nav.login')}
            </button>

            {/* Pink Button next to Log In: Mis Favoritas (on mobile only, counter is hidden to prevent margin overflow) */}
            <button
              onClick={onOpenFavorites || onOpenLogin}
              className="bg-[#E85B81] hover:bg-[#DE4B73] active:scale-95 text-white font-bold text-[10.5px] xs:text-xs sm:text-sm px-2 xs:px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 shrink-0"
            >
              <span>{t('nav.favorites')}</span>
              <span className="text-white/95 text-xs sm:text-sm leading-none">♥</span>
              {favoritesCount > 0 && (
                <span className="hidden sm:inline-flex ml-1 px-1.5 py-0.2 text-[10px] bg-white/25 rounded-full font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 flex items-center justify-center text-neutral-700 hover:text-[#E85B81] focus:outline-none shrink-0"
              aria-label={t('nav.menu')}
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5 xs:w-5 xs:h-5" /> : <Menu className="w-4.5 h-4.5 xs:w-5 xs:h-5" />}
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
                onNavigateToView('outlet');
              }}
              className={`text-left py-1 hover:text-[#E85B81] transition-colors flex items-center justify-between ${
                currentView === 'outlet' ? 'text-[#E85B81]' : ''
              }`}
            >
              <span>Outlet</span>
              <span className="px-2 py-0.5 rounded-full bg-[#E85B81] text-white text-[10px] font-bold">
                Ofertas
              </span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToView('directorio');
              }}
              className={`text-left py-1 hover:text-[#E85B81] transition-colors ${
                currentView === 'directorio' ? 'text-[#E85B81]' : ''
              }`}
            >
              <span>{language === 'en' ? 'Directory' : 'Directorio'}</span>
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
          
          {/* Left Column: Editorial Typography & CTAs */}
          <div className="lg:col-span-5 flex flex-col items-start z-10">
            {/* Kicker */}
            <span className="text-[#E85B81] font-bold text-base sm:text-lg tracking-normal mb-3 sm:mb-5 font-sans leading-relaxed block">
              {language === 'en' ? (
                <>
                  Discover the power of a platform{' '}
                  <span className="inline-block whitespace-nowrap">made by and for women</span>
                </>
              ) : (
                <>
                  Descubre el poder de una plataforma<br className="hidden sm:inline" />{' '}
                  <span className="inline-block whitespace-nowrap">hecha por y para mujeres</span>
                </>
              )}
            </span>

            {/* Massive Serif Title + Centered Hand-Drawn Heart (Tilted Left & Centered to Discover, Save, Travel) */}
            <div className="flex items-center justify-between lg:inline-flex lg:items-center relative w-full lg:w-auto mb-6 sm:mb-8">
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-tight shrink-0 flex flex-col justify-start">
                <span className="block leading-[1.08] text-[#18181B]">{t('hero.titleLine1')}</span>
                <span className="block leading-[1.08] text-[#18181B]">{t('hero.titleLine2')}</span>
                <span className="block leading-[1.08] text-[#F482A0]">{t('hero.titleLine3')}</span>
              </h1>

              {/* Hand-Drawn Crayon Heart: Inclinado a la izquierda (-15°) y centrado verticalmente a las 3 palabras */}
              <div className="flex items-center justify-center pl-3 sm:pl-4 lg:pl-6 xl:pl-8 shrink-0 select-none pointer-events-none self-center">
                <motion.div
                  initial={{ scale: 0.95, rotate: -15 }}
                  animate={{ 
                    scale: [1, 1.04, 1], 
                    rotate: [-17, -13, -17],
                    y: [0, -4, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                >
                  <svg 
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-34 xl:h-34 text-[#E85B81] drop-shadow-[0_4px_16px_rgba(232,91,129,0.22)]" 
                    viewBox="0 0 300 300" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <filter id="crayon-roughness-heart" x="-10%" y="-10%" width="120%" height="120%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
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
                      filter="url(#crayon-roughness-heart)"
                    />
                  </svg>
                </motion.div>
              </div>
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
              
              <div className="relative w-full max-w-[860px] lg:max-w-[940px] xl:max-w-[1020px] mx-auto">
                {/* Halloween Cute Ghost: Esquina superior derecha del banner spotlight (mismo tamaño) */}
                <div className="absolute -top-6 sm:-top-8 md:-top-10 lg:-top-12 -right-3 sm:-right-5 md:-right-7 lg:-right-9 z-20 pointer-events-none select-none">
                  <motion.div
                    initial={{ scale: 0.95, rotate: 6 }}
                    animate={{ 
                      scale: [1, 1.05, 1], 
                      rotate: [4, 9, 4],
                      y: [0, -4, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
                  >
                    <SpotlightGhost className="w-18 h-18 sm:w-22 sm:h-22 md:w-26 md:h-26 lg:w-30 lg:h-30 drop-shadow-[0_12px_24px_rgba(14,165,233,0.38)]" />
                  </motion.div>
                </div>

                {/* Halloween Jack-o'-Lantern: Esquina inferior izquierda del banner spotlight (del mismo tamaño exacto del corazón flotante) */}
                <div className="absolute -bottom-6 sm:-bottom-8 lg:-bottom-10 -left-4 sm:-left-6 lg:-left-8 xl:-left-10 z-20 pointer-events-none select-none">
                  <motion.div
                    initial={{ scale: 0.95, rotate: -10 }}
                    animate={{ 
                      scale: [1, 1.04, 1], 
                      rotate: [-12, -7, -12],
                      y: [0, -4, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  >
                    <SpotlightPumpkin className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-34 xl:h-34 drop-shadow-[0_10px_26px_rgba(234,88,12,0.42)]" />
                  </motion.div>
                </div>

                {/* Central Featured Element: SPOTLIGHT BANNER EMBEDDED */}
                <div className="relative z-10 w-full rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.14)] border-4 sm:border-8 border-white bg-white">
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
                <span className="text-xs sm:text-sm text-neutral-600 font-sans mt-1 leading-snug max-w-[13rem]">
                  {t('stats.businessesLabel')}
                </span>
              </div>

              {/* Stat 2: Creators / Promociones */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#FCE8EF] flex items-center justify-center mb-2.5">
                  <Users className="w-5 h-5 text-[#E85B81]" />
                </div>
                <span className="font-serif font-bold text-xl sm:text-2xl text-[#18181B] leading-none">
                  {t('stats.creators')}
                </span>
                <span className="text-xs sm:text-sm text-neutral-600 font-sans mt-1 leading-snug max-w-[13rem]">
                  {t('stats.creatorsLabel')}
                </span>
              </div>

              {/* Stat 3: Countries / Ofertas en Viajes y Hoteles */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#FCE8EF] flex items-center justify-center mb-2.5">
                  <Globe className="w-5 h-5 text-[#E85B81]" />
                </div>
                <span className="font-serif font-bold text-xl sm:text-2xl text-[#18181B] leading-none">
                  {t('stats.countries')}
                </span>
                <span className="text-xs sm:text-sm text-neutral-600 font-sans mt-1 leading-snug max-w-[13rem]">
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
