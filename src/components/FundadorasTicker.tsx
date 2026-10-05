import React, { useState, useEffect, useMemo } from 'react';
import { Building2, MapPin, Tag } from 'lucide-react';
import { getOptimizedImageUrl } from '../utils/imageUtils';
import { useLanguage } from '../context/LanguageContext';

export interface TickerAnnouncement {
  id?: string;
  titulo: string;
  categoria?: string;
  descripcion?: string;
  imagen?: string;
  anuncio?: string;
  logo?: string;
  pais?: string;
  ciudad?: string;
  estado?: string;
  municipio?: string;
  direccion?: string;
  promo?: string;
  [key: string]: any;
}

export function hasAnuncioImage(ad: TickerAnnouncement | any): boolean {
  if (!ad) return false;
  const rawAnuncio = (ad.anuncio || '').trim();
  if (rawAnuncio) {
    if (rawAnuncio.startsWith('http://') || rawAnuncio.startsWith('https://') || rawAnuncio.startsWith('/')) {
      return true;
    }
  }
  const rawImagen = (ad.imagen || '').trim();
  const rawLogo = (ad.logo || '').trim();
  if (rawImagen && rawImagen !== rawLogo) {
    if (rawImagen.startsWith('http://') || rawImagen.startsWith('https://') || rawImagen.startsWith('/')) {
      return true;
    }
  }
  return false;
}

interface FundadorasTickerProps {
  ads: TickerAnnouncement[];
  onSelectCompany?: (title: string) => void;
  onSelectAd?: (ad: any) => void;
}

const EIGHT_HOURS_MS = 8 * 60 * 60 * 1000;

// Seeded pseudo-random number generator for deterministic shuffling within 8-hour windows
function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const result = [...array];
  const rng = seededRandom(seed);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function cleanLocationPart(text: string): string {
  if (!text) return '';
  const cleaned = text.replace(/^[-–—\s]+/, '').trim();
  if (cleaned.includes(',')) {
    const parts = cleaned.split(',').map(p => p.trim()).filter(Boolean);
    const uniqueParts = parts.filter((part, idx, arr) => 
      idx === 0 || part.toLowerCase() !== arr[idx - 1].toLowerCase()
    );
    return uniqueParts.join(', ');
  }
  return cleaned;
}

export function getCountryName(ad: TickerAnnouncement): string {
  if (ad.pais && ad.pais.trim()) {
    const rawPais = ad.pais.trim().replace(/^[-–—\s]+/, '');
    const pLower = rawPais.toLowerCase();
    if (pLower.includes('mexico') || pLower.includes('méxico') || pLower === 'mx') return 'México';
    if (pLower.includes('colombia') || pLower === 'co') return 'Colombia';
    if (pLower.includes('españa') || pLower.includes('espana') || pLower === 'es') return 'España';
    if (pLower.includes('italia') || pLower === 'it') return 'Italia';
    if (pLower.includes('suiza') || pLower === 'ch') return 'Suiza';
    if (pLower.includes('rusia') || pLower === 'ru') return 'Rusia';
    if (pLower.includes('francia') || pLower === 'fr') return 'Francia';
    if (pLower.includes('alemania') || pLower === 'de') return 'Alemania';
    if (pLower.includes('brasil') || pLower === 'br') return 'Brasil';
    if (pLower.includes('eeuu') || pLower.includes('usa') || pLower.includes('estados unidos') || pLower === 'us') return 'EE. UU.';
    if (pLower.includes('chile') || pLower === 'cl') return 'Chile';
    if (pLower.includes('argentina') || pLower === 'ar') return 'Argentina';
    if (pLower.includes('peru') || pLower.includes('perú') || pLower === 'pe') return 'Perú';
    if (pLower.includes('guatemala') || pLower === 'gt') return 'Guatemala';
    if (pLower.includes('costa rica') || pLower === 'cr') return 'Costa Rica';
    if (pLower.includes('panama') || pLower.includes('panamá') || pLower === 'pa') return 'Panamá';
    if (pLower.includes('ecuador') || pLower === 'ec') return 'Ecuador';
    if (pLower.includes('venezuela') || pLower === 've') return 'Venezuela';
    if (pLower.includes('uruguay') || pLower === 'uy') return 'Uruguay';
    if (pLower.includes('bolivia') || pLower === 'bo') return 'Bolivia';
    if (pLower.includes('república dominicana') || pLower.includes('dominicana')) return 'R. Dominicana';
    if (pLower.includes('puerto rico')) return 'Puerto Rico';
    if (rawPais.length >= 3 && rawPais.length <= 30) return rawPais;
    return '';
  }

  // Fallback to checking combined location fields
  const combinedText = `${ad.direccion || ''} ${ad.ciudad || ''} ${ad.estado || ''} ${ad.municipio || ''} ${ad.descripcion || ''}`.toLowerCase();

  if (combinedText.includes('colombia') || combinedText.includes('bogotá') || combinedText.includes('medellín') || combinedText.includes('cali')) return 'Colombia';
  if (combinedText.includes('españa') || combinedText.includes('espana') || combinedText.includes('madrid') || combinedText.includes('barcelona') || combinedText.includes('valencia') || combinedText.includes('málaga') || combinedText.includes('alicante')) return 'España';
  if (combinedText.includes('eeuu') || combinedText.includes('usa') || combinedText.includes('estados unidos') || combinedText.includes('miami') || combinedText.includes('florida') || combinedText.includes('nueva york') || combinedText.includes('los angeles') || combinedText.includes('texas') || combinedText.includes('seattle')) return 'EE. UU.';
  if (combinedText.includes('chile') || combinedText.includes('santiago')) return 'Chile';
  if (combinedText.includes('argentina') || combinedText.includes('buenos aires') || combinedText.includes('mar de plata')) return 'Argentina';
  if (combinedText.includes('perú') || combinedText.includes('peru') || combinedText.includes('lima')) return 'Perú';
  if (combinedText.includes('guatemala')) return 'Guatemala';
  if (combinedText.includes('costa rica') || combinedText.includes('san josé')) return 'Costa Rica';
  if (combinedText.includes('panamá') || combinedText.includes('panama')) return 'Panamá';
  if (combinedText.includes('ecuador') || combinedText.includes('quito')) return 'Ecuador';
  if (combinedText.includes('méxico') || combinedText.includes('mexico') || combinedText.includes('cdmx') || combinedText.includes('mty') || combinedText.includes('gdl') || combinedText.includes('monterrey') || combinedText.includes('puebla') || combinedText.includes('guadalajara') || combinedText.includes('querétaro') || combinedText.includes('cancún') || combinedText.includes('san pedro') || combinedText.includes('apodaca') || combinedText.includes('guadalupe') || combinedText.includes('san nicolás') || combinedText.includes('linares')) return 'México';

  if (ad.estado && ad.estado !== 'Todos' && ad.estado !== 'Otro' && ad.estado !== 'Internacional') {
    return 'México';
  }

  return 'México';
}

export function getTickerLocation(ad: TickerAnnouncement): string {
  // Support ciudad directly from Google Sheet 'fundadoras'
  const rawCity = cleanLocationPart(
    ad.ciudad || 
    ad.municipio || 
    (ad.direccion && !ad.direccion.includes('http') ? ad.direccion : '')
  );
  const rawEstado = (ad.estado && ad.estado !== 'Todos' && ad.estado !== 'Otro' && ad.estado !== 'Internacional') 
    ? cleanLocationPart(ad.estado) 
    : '';
  const country = getCountryName(ad);

  // If city/municipio is present, display it with country (e.g. "Monterrey, México" or "Nueva York, EE. UU.")
  if (rawCity) {
    if (
      country && 
      country !== 'Global' && 
      country.toLowerCase() !== rawCity.toLowerCase() &&
      !rawCity.toLowerCase().includes(country.toLowerCase())
    ) {
      return `${rawCity}, ${country}`;
    }
    return rawCity;
  }

  if (rawEstado) {
    if (
      country && 
      country !== 'Global' && 
      country.toLowerCase() !== rawEstado.toLowerCase() &&
      !rawEstado.toLowerCase().includes(country.toLowerCase())
    ) {
      return `${rawEstado}, ${country}`;
    }
    return rawEstado;
  }

  return country || 'México';
}

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-full h-full bg-[#E2A7B5]/20 text-brand-wine flex items-center justify-center font-bold text-xs uppercase select-none">
        {alt ? alt.charAt(0) : <Building2 className="w-3.5 h-3.5 text-brand-wine/70" />}
      </div>
    );
  }

  const logoUrl = getOptimizedImageUrl(src);

  return (
    <img
      src={logoUrl}
      alt={alt}
      className="w-full h-full object-cover"
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}

export default function FundadorasTicker({ ads, onSelectAd, onSelectCompany }: FundadorasTickerProps) {
  const { language } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);

  // Current 8-hour time block index
  const [timeBlock, setTimeBlock] = useState(() => Math.floor(Date.now() / EIGHT_HOURS_MS));

  useEffect(() => {
    // Check periodically if the 8-hour window has updated to re-shuffle
    const interval = setInterval(() => {
      const currentBlock = Math.floor(Date.now() / EIGHT_HOURS_MS);
      if (currentBlock !== timeBlock) {
        setTimeBlock(currentBlock);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [timeBlock]);

  // Filter valid ads and shuffle them based on the 8-hour seed block
  const randomizedAds = useMemo(() => {
    const valid = ads.filter(ad => ad && ad.titulo && ad.titulo.trim().length > 0);
    if (valid.length === 0) return [];
    return shuffleWithSeed(valid, timeBlock + 98765);
  }, [ads, timeBlock]);

  if (randomizedAds.length === 0) {
    return (
      <div 
        className="w-full relative overflow-hidden bg-[#E2A7B5]/15 backdrop-blur-md border-2 border-[#E2A7B5]/40 rounded-2xl py-2 px-3 select-none min-h-[64px] sm:min-h-[72px] flex items-center justify-center"
        id="fundadoras-linear-banner-loading"
      >
        <div className="flex items-center gap-2 text-brand-wine/50 text-xs sm:text-sm font-semibold animate-pulse">
          <Building2 className="w-4 h-4 text-brand-wine/40" />
          <span>{language === 'en' ? 'Loading Founder Businesses...' : 'Cargando Empresas Fundadoras...'}</span>
        </div>
      </div>
    );
  }

  // Duplicate list to guarantee endless seamless loop (4 sets)
  const items = [...randomizedAds, ...randomizedAds, ...randomizedAds, ...randomizedAds];
  // Calmer, slower reading speed: ~5.5 seconds per item
  const scrollDurationSeconds = Math.max(60, randomizedAds.length * 11);

  return (
    <div 
      className="ticker-banner-container w-full relative overflow-hidden bg-[#FCE8EF]/75 backdrop-blur-md border-2 border-[#E85B81]/40 rounded-2xl shadow-sm py-2 px-3 sm:px-4 select-none min-h-[64px] sm:min-h-[72px] flex items-center group transition-all"
      id="fundadoras-linear-banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onTouchCancel={() => setIsPaused(false)}
    >
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-r from-[#FAF8F5]/80 via-[#FAF8F5]/30 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-[#FAF8F5]/80 via-[#FAF8F5]/30 to-transparent z-10 pointer-events-none" />

      <div className="overflow-hidden w-full relative flex items-center">
        <div
          className="ticker-banner-track animate-ticker-marquee flex items-center gap-5 sm:gap-7 whitespace-nowrap cursor-pointer"
          data-paused={isPaused}
          style={{
            '--ticker-duration': `${scrollDurationSeconds}s`,
            animationPlayState: isPaused ? 'paused' : 'running',
          } as React.CSSProperties}
        >
          {items.map((ad, i) => {
            const location = getTickerLocation(ad);
            const logoSrc = ad.logo && ad.logo.trim() ? ad.logo : (ad.imagen && ad.imagen.trim() ? ad.imagen : '');
            const hasPromo = Boolean(ad.promo && ad.promo.trim());
            const hasImageLink = hasAnuncioImage(ad);
            const isClickable = Boolean(hasImageLink && (onSelectAd || onSelectCompany));

            return (
              <div
                key={`${ad.id || ad.titulo}-${i}`}
                onClick={() => {
                  if (hasImageLink) {
                    if (onSelectAd) onSelectAd(ad);
                    else if (onSelectCompany) onSelectCompany(ad.titulo);
                  }
                }}
                className={`flex items-center gap-2.5 sm:gap-3.5 px-2.5 sm:px-3 py-1.5 rounded-xl transition-all shrink-0 select-none ${
                  isClickable 
                    ? 'cursor-pointer hover:bg-white/70 active:scale-95' 
                    : 'cursor-default pointer-events-auto'
                }`}
                title={
                  ad.titulo 
                    ? `${ad.titulo}${hasPromo ? ` • Promo: ${ad.promo}` : ''}${hasImageLink ? (language === 'en' ? ' - Click to view ad' : ' - Clic para ver anuncio') : ''}` 
                    : undefined
                }
              >
                {/* Logo circular con borde rosa de marca */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#E85B81]/50 bg-white shadow-xs shrink-0 ring-2 ring-[#FCE8EF] flex items-center justify-center">
                  <LogoImage src={logoSrc} alt={ad.titulo} />
                </div>

                {/* Info: Nombre de empresa, Ubicación y Promo debajo */}
                <div className="flex flex-col text-left justify-center min-w-0">
                  {/* 1. Nombre de la empresa */}
                  <span className="text-xs sm:text-sm font-bold text-[#18181B] group-hover:text-[#E85B81] transition-colors truncate max-w-[160px] sm:max-w-[240px] leading-tight">
                    {ad.titulo}
                  </span>

                  {/* 2. Ubicación de la empresa */}
                  <span className="text-[10px] sm:text-[11px] font-medium text-neutral-500 truncate max-w-[160px] sm:max-w-[240px] flex items-center gap-1 leading-tight mt-0.5">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#E85B81]/60 shrink-0" />
                    <span>{location}</span>
                  </span>

                  {/* 3. Promo debajo de la ubicación */}
                  {hasPromo && (
                    <span 
                      className="text-[9.5px] sm:text-[10.5px] font-extrabold text-[#E85B81] bg-white/95 border border-[#E85B81]/40 px-2 py-0.5 rounded-md inline-flex items-center gap-1 w-fit mt-1 shadow-2xs leading-none whitespace-nowrap"
                    >
                      <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#E85B81] shrink-0" />
                      <span className="truncate max-w-[150px] sm:max-w-[220px]">{ad.promo?.trim()}</span>
                    </span>
                  )}
                </div>

                {/* Separador elegante entre empresas */}
                <span className="ml-3 sm:ml-4 text-[#E85B81]/50 font-light text-xs sm:text-sm select-none">•</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
