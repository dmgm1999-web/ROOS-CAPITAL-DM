import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Heart, 
  Copy, 
  Check, 
  Sparkles, 
  LogIn, 
  ExternalLink, 
  Trash2, 
  Instagram, 
  Facebook, 
  Globe, 
  Phone,
  Search,
  ArrowUpDown,
  ArrowDownAZ,
  ArrowUpZA
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { encodeBackupKey } from '../utils/favorites';
import { 
  formatWhatsAppUrl, 
  formatInstagramUrl, 
  formatFacebookUrl, 
  formatTikTokUrl, 
  formatWebUrl, 
  formatPhoneUrl 
} from '../utils/socialUtils';

// SVG Icons for WhatsApp and TikTok
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 2C6.511 2 2.025 6.486 2.025 12.006c0 1.838.498 3.636 1.444 5.215L2.002 22l4.928-1.428a9.98 9.98 0 0 0 5.101 1.434h.004c5.518 0 10.005-4.486 10.005-10.006A9.972 9.972 0 0 0 12.031 2zm0 18.23a8.27 8.27 0 0 1-4.218-1.151l-.302-.18-3.136.909.914-3.056-.197-.315a8.278 8.278 0 0 1-1.272-4.432c0-4.568 3.718-8.286 8.286-8.286 2.213 0 4.294.862 5.86 2.428a8.232 8.232 0 0 1 2.424 5.859c0 4.569-3.718 8.284-8.357 8.284zm4.544-6.208c-.249-.125-1.474-.728-1.703-.811-.228-.083-.395-.125-.561.125-.166.249-.644.811-.79 1-.145.187-.291.208-.54.083-.249-.125-1.053-.388-2.006-1.238-.741-.661-1.242-1.478-1.387-1.727-.145-.249-.015-.384.109-.508.112-.112.249-.291.374-.436.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.436-.062-.125-.561-1.351-.769-1.85-.202-.486-.407-.42-.561-.428l-.478-.008c-.166 0-.436.062-.664.312-.228.249-.873.853-.873 2.08s.894 2.412 1.018 2.578c.125.166 1.758 2.685 4.26 3.766.595.257 1.06.411 1.423.527.598.19 1.143.163 1.574.099.48-.072 1.474-.603 1.682-1.185.208-.582.208-1.081.145-1.185-.062-.104-.228-.166-.477-.291z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  allAnnouncements: Array<{
    id?: string;
    titulo: string;
    categoria: string;
    descripcion?: string;
    keywords?: string;
    hashtags?: string;
    direccion?: string;
    pais?: string;
    imagen?: string;
    logo?: string;
    municipio?: string;
    estado?: string;
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    web?: string;
    telefono?: string;
    proveedor?: boolean;
    online?: boolean;
    internacional?: boolean;
  }>;
  onRemoveFavorite: (key: string) => void;
  onSelectBusiness?: (title: string) => void;
  onOpenLogin: () => void;
  onFilterDirectoryToFavorites?: () => void;
}

export default function FavoritesModal({
  isOpen,
  onClose,
  favorites,
  allAnnouncements,
  onRemoveFavorite,
  onOpenLogin,
  onFilterDirectoryToFavorites
}: FavoritesModalProps) {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');

  // Clear search on close
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setSortOrder('default');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Match favorite keys to actual announcement items
  const allFavoriteItems = allAnnouncements.filter(ad => {
    const key = (ad.id && ad.id.trim()) || ad.titulo.trim().toLowerCase();
    return favorites.includes(key) || favorites.includes(ad.titulo.trim().toLowerCase());
  });

  // Filter by search term with the same logic as the marketplace
  const searchLower = searchTerm.toLowerCase().trim();
  const isBrandSearch = [
    'rooscapital', 
    'roos capital', 
    'roos', 
    'capital', 
    'rooscapital.com',
    'rooscapital mx',
    'roos capital mx'
  ].includes(searchLower);

  const searchedItems = allFavoriteItems.filter(ad => {
    if (!searchLower) return true;
    if (isBrandSearch) return true;

    return (
      ad.titulo.toLowerCase().includes(searchLower) ||
      (ad.descripcion && ad.descripcion.toLowerCase().includes(searchLower)) ||
      (ad.keywords && ad.keywords.toLowerCase().includes(searchLower)) ||
      (ad.hashtags && ad.hashtags.toLowerCase().includes(searchLower)) ||
      (ad.categoria && ad.categoria.toLowerCase().includes(searchLower)) ||
      (ad.direccion && ad.direccion.toLowerCase().includes(searchLower)) ||
      (ad.municipio && ad.municipio.toLowerCase().includes(searchLower)) ||
      (ad.estado && ad.estado.toLowerCase().includes(searchLower)) ||
      (ad.pais && ad.pais.toLowerCase().includes(searchLower)) ||
      (Boolean(ad.proveedor) && (searchLower.includes('proveedor') || 'proveedor'.includes(searchLower) || 'proveedores'.includes(searchLower))) ||
      (Boolean(ad.online) && ('remoto'.includes(searchLower) || 'online'.includes(searchLower))) ||
      (Boolean(ad.internacional) && 'internacional'.includes(searchLower))
    );
  });

  // Sort items
  const displayedItems = [...searchedItems].sort((a, b) => {
    if (sortOrder === 'default') return 0;
    const comparison = a.titulo.localeCompare(b.titulo, 'es', { sensitivity: 'base' });
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleToggleSort = () => {
    setSortOrder(prev => {
      if (prev === 'default') return 'asc';
      if (prev === 'asc') return 'desc';
      return 'default';
    });
  };

  const personalCode = encodeBackupKey(favorites);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(personalCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#351B25]/50 backdrop-blur-xs"
          id="favorites-modal-backdrop"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative z-10 w-full max-w-[500px] max-h-[85vh] bg-gradient-to-b from-white via-white to-[#FFF8F9] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 border-2 border-[#E85B81]/30 shadow-[0_25px_60px_rgba(232,91,129,0.22)] flex flex-col overflow-hidden text-neutral-800"
          id="favorites-modal-card"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-[#FCE8EF] hover:bg-[#F8D4E2] text-[#E85B81] flex items-center justify-center transition-all cursor-pointer z-20"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-[#EFE8DF] shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-[#FCE8EF] flex items-center justify-center text-[#E85B81]">
              <Heart className="w-5 h-5 text-[#E85B81] fill-[#E85B81]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#18181B] leading-none">
                  {t('favorites.title')}
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FCE8EF] text-[#E85B81]">
                  {favorites.length}
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-sans mt-0.5">
                {t('favorites.subtitle')}
              </p>
            </div>
          </div>

          {/* Search Bar & Alphabetical Sort at the very top of the list */}
          {allFavoriteItems.length > 0 && (
            <div className="flex items-center gap-2 pt-3 pb-1 shrink-0">
              {/* Search Bar (Identical functionality as marketplace search, without filter button) */}
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={language === 'en' ? 'Search in favorites...' : 'Buscar en favoritos...'}
                  className="w-full h-9 bg-white border border-[#EFE8DF] hover:border-[#E85B81] rounded-xl pl-9 pr-8 text-xs font-medium text-neutral-800 focus:outline-none focus:border-[#E85B81] focus:ring-2 focus:ring-[#E85B81]/15 transition-all shadow-2xs placeholder:text-neutral-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5 rounded-full hover:bg-neutral-100 cursor-pointer"
                    title={language === 'en' ? 'Clear search' : 'Limpiar búsqueda'}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Alphabetical Sort Button */}
              <button
                onClick={handleToggleSort}
                className={`h-9 px-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all shadow-2xs cursor-pointer shrink-0 select-none ${
                  sortOrder !== 'default'
                    ? 'bg-[#FCE8EF] border-[#E85B81]/40 text-[#E85B81]'
                    : 'bg-white border-[#EFE8DF] hover:border-[#E85B81]/40 text-neutral-600 hover:text-[#E85B81]'
                }`}
                title={
                  sortOrder === 'default'
                    ? (language === 'en' ? 'Sort alphabetically: Default (click for A-Z)' : 'Ordenar: Predeterminado (click para A-Z)')
                    : sortOrder === 'asc'
                    ? (language === 'en' ? 'Sorted A-Z (click for Z-A)' : 'Ordenado A-Z (click para Z-A)')
                    : (language === 'en' ? 'Sorted Z-A (click for Default)' : 'Ordenado Z-A (click para Predeterminado)')
                }
              >
                {sortOrder === 'asc' ? (
                  <ArrowDownAZ className="w-4 h-4 text-[#E85B81]" />
                ) : sortOrder === 'desc' ? (
                  <ArrowUpZA className="w-4 h-4 text-[#E85B81]" />
                ) : (
                  <ArrowUpDown className="w-4 h-4 text-neutral-400" />
                )}
                <span className="text-[11px] font-sans">
                  {sortOrder === 'asc' ? 'A-Z' : sortOrder === 'desc' ? 'Z-A' : 'A-Z'}
                </span>
              </button>
            </div>
          )}

          {/* Content Area - Scrollable */}
          <div className="overflow-y-auto flex-1 py-3 space-y-3 pr-1 scrollbar-thin">
            {/* List of saved businesses */}
            {allFavoriteItems.length === 0 ? (
              <div className="text-center py-8 px-4 bg-white/70 rounded-2xl border border-dashed border-[#E85B81]/30">
                <div className="w-12 h-12 rounded-full bg-[#FCE8EF] flex items-center justify-center mx-auto mb-3 text-2xl">
                  ♡
                </div>
                <p className="text-sm font-medium text-neutral-600 leading-relaxed max-w-xs mx-auto">
                  {t('favorites.empty')}
                </p>
              </div>
            ) : displayedItems.length === 0 ? (
              <div className="text-center py-7 px-4 bg-white/70 rounded-2xl border border-dashed border-[#E85B81]/30 space-y-2">
                <Search className="w-8 h-8 text-neutral-300 mx-auto" />
                <p className="text-xs font-medium text-neutral-600">
                  {language === 'en'
                    ? `No favorites match "${searchTerm}"`
                    : `No se encontraron favoritas que coincidan con "${searchTerm}"`}
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs font-bold text-[#E85B81] hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Clear search' : 'Limpiar búsqueda'}
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {displayedItems.map((ad) => {
                  const key = (ad.id && ad.id.trim()) || ad.titulo.trim().toLowerCase();
                  const whatsappUrl = formatWhatsAppUrl(ad.whatsapp);
                  const instagramUrl = formatInstagramUrl(ad.instagram);
                  const facebookUrl = formatFacebookUrl(ad.facebook);
                  const tiktokUrl = formatTikTokUrl(ad.tiktok);
                  const webUrl = formatWebUrl(ad.web);
                  const phoneUrl = formatPhoneUrl(ad.telefono);

                  return (
                    <div 
                      key={key}
                      className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#EFE8DF] hover:border-[#E85B81]/40 transition-all shadow-2xs group"
                    >
                      {/* Business Name and Location (Clean, NO square with initial) */}
                      <div className="min-w-0 flex-1 text-left">
                        <h4 className="text-xs sm:text-sm font-serif font-bold text-[#18181B] truncate group-hover:text-[#E85B81] transition-colors">
                          {ad.titulo}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-sans truncate mt-0.5">
                          {ad.categoria && <span className="truncate">{ad.categoria}</span>}
                          {ad.municipio && <span>· {ad.municipio}</span>}
                          {ad.estado && !ad.municipio && <span>· {ad.estado}</span>}
                        </div>
                      </div>

                      {/* Active Social Media Direct Action Buttons right beside the name */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {whatsappUrl && (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-xl bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-600 border border-emerald-200 flex items-center justify-center transition-all shadow-2xs"
                            title={`WhatsApp de ${ad.titulo}`}
                          >
                            <WhatsAppIcon className="w-4 h-4" />
                          </a>
                        )}

                        {instagramUrl && (
                          <a
                            href={instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-xl bg-rose-50 hover:bg-[#E85B81] hover:text-white text-[#E85B81] border border-rose-200 flex items-center justify-center transition-all shadow-2xs"
                            title={`Instagram de ${ad.titulo}`}
                          >
                            <Instagram className="w-4 h-4" />
                          </a>
                        )}

                        {facebookUrl && (
                          <a
                            href={facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-200 flex items-center justify-center transition-all shadow-2xs"
                            title={`Facebook de ${ad.titulo}`}
                          >
                            <Facebook className="w-4 h-4" />
                          </a>
                        )}

                        {tiktokUrl && (
                          <a
                            href={tiktokUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-black hover:text-white text-neutral-800 border border-neutral-300 flex items-center justify-center transition-all shadow-2xs"
                            title={`TikTok de ${ad.titulo}`}
                          >
                            <TikTokIcon className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {webUrl && (
                          <a
                            href={webUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-xl bg-[#FAF8F5] hover:bg-[#DE4B73] hover:text-white text-neutral-700 border border-neutral-200 flex items-center justify-center transition-all shadow-2xs"
                            title={`Web de ${ad.titulo}`}
                          >
                            <Globe className="w-4 h-4" />
                          </a>
                        )}

                        {phoneUrl && (
                          <a
                            href={phoneUrl}
                            className="w-8 h-8 rounded-xl bg-amber-50 hover:bg-amber-500 hover:text-white text-amber-700 border border-amber-200 flex items-center justify-center transition-all shadow-2xs"
                            title={`Llamar a ${ad.titulo}`}
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {/* Remove favorite button */}
                        <button
                          onClick={() => onRemoveFavorite(key)}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer ml-0.5"
                          title={language === 'en' ? 'Remove from favorites' : 'Quitar de favoritas'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Filter in Directory CTA if items exist */}
            {allFavoriteItems.length > 0 && onFilterDirectoryToFavorites && (
              <button
                onClick={() => {
                  onFilterDirectoryToFavorites();
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#FCE8EF]/50 text-[#E85B81] border border-[#E85B81]/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
              >
                <span>{t('favorites.filterOnly')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Clave Personal ROOS (Backup Box - WhatsApp Button REMOVED) */}
            <div className="bg-white rounded-2xl p-4 border border-[#E85B81]/30 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E85B81]" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#18181B]">
                  {t('favorites.keyTitle')}
                </h4>
              </div>
              <p className="text-[11px] text-neutral-600 font-sans leading-relaxed">
                {t('favorites.keyDesc')}
              </p>

              {/* Code field with copy button */}
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-neutral-800 truncate select-all tracking-wider text-center">
                  {personalCode}
                </div>
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-2 bg-[#E85B81] hover:bg-[#DE4B73] active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                  title="Copiar Clave"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t('favorites.copied') : t('favorites.copyKey')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer - Switch to Login / Load Another Key */}
          <div className="pt-3 border-t border-[#EFE8DF] shrink-0 text-center">
            <button
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className="text-xs font-semibold text-neutral-600 hover:text-[#E85B81] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>
                {language === 'en' 
                  ? 'Have a code from another device? Log in here' 
                  : '¿Tienes una clave de otro dispositivo? Inicia sesión aquí'}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
