import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { getOptimizedImageUrl } from '../utils/imageUtils';
import { formatWebUrl } from '../utils/socialUtils';

export interface OutletBannerItem {
  id: string;
  empresa: string;
  imagen: string;
  precio: string;
  descripcion: string;
  promo: string;
  web: string;
  categoria: string;
  gradientTheme?: 'pink' | 'peach' | 'rose' | 'amber';
}

export interface OutletBrandItem {
  id: string;
  empresa: string;
  logo: string;
  categoria: string;
  web: string;
}

const DIRECT_P5_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQLlSffly1PqvNBGZxo9rqEa-W8v2-dXqZ7waoAVZRbRSgLWaIPQNbYfSah1cvi8tlPoxnypO6VBC8l/pub?output=csv';
const DIRECT_P6_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZEBFs8mlYmtm2l3MLTdhs1LlCBmZCrRXAlT843yaRFDImhkq9tbXexZobYGwKT27meKbGqtcL_QfK/pub?output=csv';

async function fetchCsvWithFallback(apiEndpoint: string, directUrl: string): Promise<string> {
  const cb = Date.now();
  try {
    const res = await fetch(`${apiEndpoint}?_t=${cb}`);
    if (res.ok) {
      const text = await res.text();
      if (text && text.length > 30 && !text.includes('<!DOCTYPE') && !text.includes('<html')) {
        return text;
      }
    }
  } catch (e) {}

  try {
    const res = await fetch(`${directUrl}&_t=${cb}`);
    if (res.ok) {
      const text = await res.text();
      if (text && text.length > 30 && !text.includes('<!DOCTYPE') && !text.includes('<html')) {
        return text;
      }
    }
  } catch (e) {}

  return '';
}

function parseP5Banners(csvText: string): OutletBannerItem[] {
  if (!csvText) return [];
  try {
    const parsed = Papa.parse(csvText, { skipEmptyLines: 'greedy' });
    const rows = parsed.data as string[][];
    if (rows.length < 5) return [];

    let headerIdx = -1;
    for (let r = 0; r < Math.min(rows.length, 10); r++) {
      const line = (rows[r] || []).map(c => String(c).toLowerCase().trim());
      if (line.includes('anuncio') || line.includes('empresa') || line.includes('nombre de la empresa')) {
        headerIdx = r;
        break;
      }
    }
    if (headerIdx === -1) headerIdx = 4;

    const headers = (rows[headerIdx] || []).map(h => String(h).toLowerCase().trim());
    const empIdx = headers.findIndex(h => h.includes('empresa') || h.includes('marca') || h.includes('nombre'));
    const imgIdx = headers.findIndex(h => h.includes('anuncio') || h.includes('imagen') || h.includes('foto') || h.includes('banner'));
    const precioIdx = headers.findIndex(h => h.includes('precio') || h.includes('costo'));
    const descIdx = headers.findIndex(h => h.includes('descripcion') || h.includes('descripción'));
    const promoIdx = headers.findIndex(h => h.includes('promo') || h.includes('descuento'));
    const webIdx = headers.findIndex(h => h.includes('sitio') || h.includes('web') || h.includes('url') || h.includes('link'));
    const catIdx = headers.findIndex(h => h.includes('categoria') || h.includes('categoría'));
    const idIdx = headers.findIndex(h => h === 'id' || h.includes('id'));

    const items: OutletBannerItem[] = [];
    const themes: ('pink' | 'peach' | 'rose' | 'amber')[] = ['pink', 'peach', 'rose', 'amber'];

    for (let r = headerIdx + 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || row.length === 0) continue;
      const empresa = (empIdx !== -1 ? row[empIdx] : '').trim();
      const imagen = (imgIdx !== -1 ? row[imgIdx] : '').trim();
      const web = (webIdx !== -1 ? row[webIdx] : '').trim();

      if (!empresa || empresa.toLowerCase() === 'nombre de la empresa' || (!imagen && !web)) continue;

      items.push({
        id: (idIdx !== -1 && row[idIdx] ? row[idIdx] : `p5_${r}`).trim(),
        empresa,
        imagen: imagen.startsWith('http') ? imagen : '',
        precio: (precioIdx !== -1 ? row[precioIdx] : '').trim(),
        descripcion: (descIdx !== -1 ? row[descIdx] : '').trim(),
        promo: (promoIdx !== -1 ? row[promoIdx] : '').trim(),
        web: formatWebUrl(web),
        categoria: (catIdx !== -1 ? row[catIdx] : '').trim() || 'Turismo',
        gradientTheme: themes[items.length % themes.length]
      });
    }

    return items;
  } catch (e) {
    console.warn('[OutletFeaturedSection] Error parsing P5 banners:', e);
    return [];
  }
}

function parseP6Brands(csvText: string): OutletBrandItem[] {
  if (!csvText) return [];
  try {
    const parsed = Papa.parse(csvText, { skipEmptyLines: 'greedy' });
    const rows = parsed.data as string[][];
    if (rows.length < 5) return [];

    let headerIdx = -1;
    for (let r = 0; r < Math.min(rows.length, 10); r++) {
      const line = (rows[r] || []).map(c => String(c).toLowerCase().trim());
      if (line.includes('empresa') || line.includes('nombre de la empresa')) {
        headerIdx = r;
        break;
      }
    }
    if (headerIdx === -1) headerIdx = 4;

    const headers = (rows[headerIdx] || []).map(h => String(h).toLowerCase().trim());
    const empIdx = headers.findIndex(h => h.includes('empresa') || h.includes('marca') || h.includes('nombre'));
    const logoIdx = headers.findIndex(h => h.includes('logo'));
    const webIdx = headers.findIndex(h => h.includes('sitio') || h.includes('web') || h.includes('url') || h.includes('link'));
    const catIdx = headers.findIndex(h => h.includes('categoria') || h.includes('categoría'));
    const idIdx = headers.findIndex(h => h === 'id' || h.includes('id'));

    const items: OutletBrandItem[] = [];
    for (let r = headerIdx + 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || row.length === 0) continue;
      const empresa = (empIdx !== -1 ? row[empIdx] : '').trim();
      const web = (webIdx !== -1 ? row[webIdx] : '').trim();
      const logo = (logoIdx !== -1 ? row[logoIdx] : '').trim();

      if (!empresa || empresa.toLowerCase() === 'nombre de la empresa' || !web) continue;

      items.push({
        id: (idIdx !== -1 && row[idIdx] ? row[idIdx] : `p6_${r}`).trim(),
        empresa,
        logo: logo.startsWith('http') ? logo : '',
        categoria: (catIdx !== -1 ? row[catIdx] : '').trim() || 'Moda',
        web: formatWebUrl(web)
      });
    }

    return items;
  } catch (e) {
    console.warn('[OutletFeaturedSection] Error parsing P6 brands:', e);
    return [];
  }
}

/**
 * Authentic brand logo reproduction - pure logos only without VIP badges,
 * exactly matching the reference style in image_fcea4136.png
 */
export function BrandLogoBadge({ brand }: { brand: OutletBrandItem }) {
  const [imgError, setImgError] = useState(false);
  const nameLower = (brand.empresa || '').toLowerCase().trim();

  if (brand.logo && !imgError) {
    return (
      <img
        src={getOptimizedImageUrl(brand.logo)}
        alt={brand.empresa}
        className="max-h-8 max-w-[120px] object-contain transition-transform group-hover:scale-105"
        onError={() => setImgError(true)}
      />
    );
  }

  // Authentic typographic marks
  if (nameLower.includes('adidas')) {
    return (
      <div className="flex items-center gap-1.5 font-sans font-black text-neutral-900 tracking-tight text-base sm:text-lg select-none">
        <div className="flex items-end gap-0.5 h-4 mb-0.5">
          <div className="w-1 h-2 bg-neutral-900 rounded-2xs transform -skew-x-12" />
          <div className="w-1 h-3 bg-neutral-900 rounded-2xs transform -skew-x-12" />
          <div className="w-1 h-4 bg-neutral-900 rounded-2xs transform -skew-x-12" />
        </div>
        <span className="lowercase font-bold tracking-tighter">adidas</span>
      </div>
    );
  }

  if (nameLower.includes('nike')) {
    return (
      <div className="font-sans italic font-black text-neutral-900 text-lg sm:text-xl tracking-tighter select-none">
        NIKE
      </div>
    );
  }

  if (nameLower === 'alo' || nameLower.includes('alo yoga')) {
    return (
      <div className="font-sans font-normal text-neutral-900 text-xl tracking-widest lowercase select-none">
        <span className="font-light border-b border-neutral-900 pb-0.5">alo</span>
      </div>
    );
  }

  if (nameLower.includes('mac') && !nameLower.includes('bath')) {
    return (
      <div className="font-sans font-bold text-neutral-900 text-base sm:text-lg tracking-[0.25em] uppercase select-none">
        M·A·C
      </div>
    );
  }

  if (nameLower.includes('nars')) {
    return (
      <div className="font-serif font-black text-neutral-900 text-base sm:text-lg tracking-[0.2em] uppercase select-none">
        NARS
      </div>
    );
  }

  if (nameLower.includes('glossier')) {
    return (
      <div className="font-serif italic font-medium text-neutral-900 text-base sm:text-lg tracking-wide lowercase select-none">
        Glossier.
      </div>
    );
  }

  if (nameLower.includes('under armour')) {
    return (
      <div className="flex items-center gap-1.5 font-sans font-black text-neutral-900 text-xs sm:text-sm tracking-tight uppercase select-none">
        <span className="text-base font-black">X</span>
        <span>UNDER ARMOUR</span>
      </div>
    );
  }

  if (nameLower.includes('dkny')) {
    return (
      <div className="font-sans font-black text-neutral-900 text-base sm:text-lg tracking-wider uppercase select-none">
        DKNY
      </div>
    );
  }

  if (nameLower.includes('ugg')) {
    return (
      <div className="font-serif font-black text-neutral-900 text-base sm:text-lg tracking-tight uppercase select-none">
        U<span className="text-lg sm:text-xl">G</span>G
      </div>
    );
  }

  if (nameLower.includes('bath and body') || nameLower.includes('bath & body')) {
    return (
      <div className="font-serif text-center font-bold text-neutral-900 text-[11px] sm:text-xs leading-tight tracking-tight uppercase select-none">
        Bath & Body Works
      </div>
    );
  }

  if (nameLower.includes('sol de janeiro')) {
    return (
      <div className="font-sans text-center font-black text-[#DE7A22] text-[10px] sm:text-[11px] tracking-widest uppercase select-none">
        SOL DE JANEIRO
      </div>
    );
  }

  if (nameLower.includes('sheglam')) {
    return (
      <div className="font-sans font-extrabold text-[#E85B81] text-xs sm:text-sm tracking-wider uppercase select-none">
        SHEGLAM
      </div>
    );
  }

  if (nameLower.includes('savage x fenty')) {
    return (
      <div className="font-sans font-black text-neutral-900 text-[10px] sm:text-xs tracking-widest uppercase select-none">
        SAVAGE <span className="text-[#E85B81]">X</span> FENTY
      </div>
    );
  }

  if (nameLower.includes('old navy')) {
    return (
      <div className="font-sans font-extrabold text-[#0B2545] text-xs sm:text-sm tracking-wide uppercase px-2.5 py-0.5 rounded-full border border-[#0B2545]/20 bg-[#0B2545]/5 select-none">
        OLD NAVY
      </div>
    );
  }

  if (nameLower.includes('babor')) {
    return (
      <div className="font-serif font-bold text-neutral-900 text-sm sm:text-base tracking-[0.2em] uppercase select-none">
        BABOR
      </div>
    );
  }

  return (
    <span className="font-serif font-bold text-neutral-800 text-xs sm:text-sm tracking-tight truncate max-w-[130px] select-none">
      {brand.empresa}
    </span>
  );
}

const INITIAL_SEEDED_BANNERS: OutletBannerItem[] = [
  {
    id: '0B000',
    empresa: 'Expedia',
    imagen: 'https://images.unsplash.com/photo-1771658340868-af8f307d5b0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    precio: 'Desde $950 MXN',
    descripcion: 'Hotel, Vuelo o Ambos',
    promo: '%20 OFF',
    web: 'https://expedia.stay22.com/rooscapital/Lr8Z-tm0w4',
    categoria: 'Turismo',
    gradientTheme: 'pink'
  },
  {
    id: '0B001',
    empresa: 'Booking .com',
    imagen: 'https://images.unsplash.com/photo-1664391962122-34e56b77e859?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    precio: 'Desde $349 MXN',
    descripcion: 'Precio por noche',
    promo: '%15 OFF',
    web: 'https://booking.stay22.com/rooscapital/5BHIGD14Hi',
    categoria: 'Turismo',
    gradientTheme: 'peach'
  },
  {
    id: '0B002',
    empresa: 'Hoteles .com',
    imagen: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    precio: 'Desde $981 MXN',
    descripcion: 'Hoteles',
    promo: '%20 OFF',
    web: 'https://hotelscom.stay22.com/rooscapital/4MyfdgkkMY',
    categoria: 'Turismo',
    gradientTheme: 'rose'
  }
];

const INITIAL_SEEDED_BRANDS: OutletBrandItem[] = [
  { id: '0B000', empresa: 'Adidas', logo: '', categoria: 'Moda', web: 'https://mavely.app.link/wlyOoBdvs7b' },
  { id: '0B001', empresa: 'Babor', logo: '', categoria: 'Cuidado Personal', web: 'https://mavely.app.link/9ns8kRTeu7b' },
  { id: '0B002', empresa: 'Alo', logo: '', categoria: 'Moda', web: 'https://mavely.app.link/N1uUWZReu7b' },
  { id: '0B003', empresa: 'Bath and Body Works', logo: '', categoria: 'Cuidado Personal', web: 'https://mavely.app.link/wRp9HsVeu7b' },
  { id: '0B004', empresa: 'DKNY', logo: '', categoria: 'Moda', web: 'https://mavely.app.link/z8rAq3Weu7b' },
  { id: '0B005', empresa: 'Under Armour', logo: '', categoria: 'Moda', web: 'https://mavely.app.link/X4Qkh8Yeu7b' },
  { id: '0B006', empresa: 'UGG', logo: '', categoria: 'Moda', web: 'https://mavely.app.link/RMYiJ10eu7b' },
  { id: '0B007', empresa: 'Sol de Janeiro', logo: '', categoria: 'Cuidado Personal', web: 'https://mavely.app.link/PbmEDv2eu7b' },
  { id: '0B008', empresa: 'SHEGLAM', logo: '', categoria: 'Maquillaje', web: 'https://mavely.app.link/MmcHUp4eu7b' },
  { id: '0B009', empresa: 'SAVAGE X FENTY', logo: '', categoria: 'Moda', web: 'https://mavely.app.link/nvNVuL6eu7b' },
  { id: '0B010', empresa: 'Old Navy', logo: '', categoria: 'Moda', web: 'https://mavely.app.link/xztPug8eu7b' },
  { id: '0B011', empresa: 'Nike', logo: '', categoria: 'Moda', web: 'https://mavely.app.link/3ocSO49eu7b' },
  { id: '0B012', empresa: 'NARS', logo: '', categoria: 'Maquillaje', web: 'https://mavely.app.link/q27MiDbfu7b' },
  { id: '0B013', empresa: 'MAC', logo: '', categoria: 'Maquillaje', web: 'https://mavely.app.link/CRQjEhdfu7b' },
  { id: '0B014', empresa: 'Glossier', logo: '', categoria: 'Maquillaje', web: 'https://mavely.app.link/E7Oaclffu7b' }
];

let memoryBannersCache: OutletBannerItem[] = INITIAL_SEEDED_BANNERS;
let memoryBrandsCache: OutletBrandItem[] = INITIAL_SEEDED_BRANDS;

interface OutletFeaturedSectionProps {
  language?: 'es' | 'en';
}

export function OutletFeaturedSection({ language = 'es' }: OutletFeaturedSectionProps) {
  const [banners, setBanners] = useState<OutletBannerItem[]>(() => {
    if (memoryBannersCache && memoryBannersCache.length > 0) return memoryBannersCache;
    try {
      const cached = localStorage.getItem('roos_outlet_banners_cache_v2');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryBannersCache = parsed;
          return parsed;
        }
      }
    } catch (e) {}
    return INITIAL_SEEDED_BANNERS;
  });

  const [brands, setBrands] = useState<OutletBrandItem[]>(() => {
    if (memoryBrandsCache && memoryBrandsCache.length > 0) return memoryBrandsCache;
    try {
      const cached = localStorage.getItem('roos_outlet_brands_cache_v2');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryBrandsCache = parsed;
          return parsed;
        }
      }
    } catch (e) {}
    return INITIAL_SEEDED_BRANDS;
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [isBrandsExpanded, setIsBrandsExpanded] = useState(false);
  const [isBrandsMarqueePaused, setIsBrandsMarqueePaused] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [p5Csv, p6Csv] = await Promise.all([
          fetchCsvWithFallback('/api/outlet-banners', DIRECT_P5_SHEET_URL),
          fetchCsvWithFallback('/api/outlet-brands', DIRECT_P6_SHEET_URL)
        ]);

        if (isMounted) {
          const parsedBanners = parseP5Banners(p5Csv);
          const parsedBrands = parseP6Brands(p6Csv);

          if (parsedBanners.length > 0) {
            memoryBannersCache = parsedBanners;
            try { localStorage.setItem('roos_outlet_banners_cache_v2', JSON.stringify(parsedBanners)); } catch (e) {}
            setBanners(parsedBanners);
          }
          if (parsedBrands.length > 0) {
            memoryBrandsCache = parsedBrands;
            try { localStorage.setItem('roos_outlet_brands_cache_v2', JSON.stringify(parsedBrands)); } catch (e) {}
            setBrands(parsedBrands);
          }
        }
      } catch (err) {}
    }

    loadData();
    return () => { isMounted = false; };
  }, []);

  // Autoplay for horizontal banners
  useEffect(() => {
    if (isCarouselPaused || banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isCarouselPaused, banners.length]);

  const handleOpenLink = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const nextSlide = () => {
    if (banners.length <= 1) return;
    setCurrentSlide(prev => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    if (banners.length <= 1) return;
    setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="w-full my-6 sm:my-8 space-y-8 sm:space-y-10 select-none" id="outlet-featured-section">
      
      {/* ============================================================ */}
      {/* 1. HORIZONTAL TOURISM BANNERS CAROUSEL (P5)                   */}
      {/* Matches reference image image_fcea4136.png                    */}
      {/* ============================================================ */}
      {banners.length > 0 && (
        <div className="relative w-full">
          <div 
            className="relative w-full"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            {/* Cards container: 2 side-by-side on desktop, 1 on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {[0, 1].map(offset => {
                const idx = (currentSlide + offset) % banners.length;
                const banner = banners[idx];
                if (!banner) return null;

                // Alternate pink and peach gradient themes as in reference image
                const isPink = offset === 0 ? (currentSlide % 2 === 0) : (currentSlide % 2 !== 0);

                return (
                  <div
                    key={`${banner.id}_${offset}`}
                    onClick={() => handleOpenLink(banner.web)}
                    className={`relative rounded-3xl p-6 sm:p-8 text-white overflow-hidden cursor-pointer shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 group min-h-[220px] sm:min-h-[250px] flex flex-col justify-between ${
                      offset === 1 ? 'hidden md:flex' : 'flex'
                    } ${
                      banner.imagen
                        ? 'bg-neutral-900'
                        : isPink 
                          ? 'bg-gradient-to-br from-[#E85B81] via-[#E24C74] to-[#C8345C]' 
                          : 'bg-gradient-to-br from-[#EE9B60] via-[#E68A4E] to-[#D37336]'
                    }`}
                  >
                    {/* Background photo without colored overlay */}
                    {banner.imagen && (
                      <>
                        <img 
                          src={getOptimizedImageUrl(banner.imagen)}
                          alt={banner.empresa}
                          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                      </>
                    )}

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-start max-w-md">
                      {/* Kicker */}
                      <span className="text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wider text-white/95 mb-1 drop-shadow-md">
                        {language === 'en' ? 'Exclusive Deals' : 'Solo rebajas'}
                      </span>

                      {/* Main Title */}
                      <h3 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.08] mb-1.5 drop-shadow-md">
                        {banner.empresa}
                      </h3>

                      {/* Subtitle / Description */}
                      {banner.descripcion && (
                        <p className="text-xs sm:text-sm text-white font-sans font-medium mb-1 drop-shadow-md">
                          {banner.descripcion}
                        </p>
                      )}

                      {/* Promo or Price highlight */}
                      {(banner.promo || banner.precio) && (
                        <p className="text-base sm:text-lg lg:text-xl font-sans font-extrabold text-white tracking-tight drop-shadow-md mb-4">
                          {banner.promo ? (
                            <span>{banner.promo.includes('hasta') ? banner.promo : `hasta ${banner.promo} menos`}</span>
                          ) : null}
                          {banner.precio && (
                            <span className={banner.promo ? 'ml-2 text-white/95 font-bold text-sm sm:text-base' : ''}>
                              {banner.precio}
                            </span>
                          )}
                        </p>
                      )}
                    </div>

                    {/* White Pill Button: "Ver Oferta" */}
                    <div className="relative z-10 pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenLink(banner.web);
                        }}
                        className="px-6 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2"
                      >
                        <span>{language === 'en' ? 'View' : 'Ver'}</span>
                        <span>{language === 'en' ? 'Offer' : 'Oferta'}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Circular Prev/Next Arrow Buttons (Matching reference image) */}
            {banners.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg border border-neutral-200 text-neutral-700 hover:text-[#E85B81] hover:scale-105 active:scale-95 flex items-center justify-center transition-all z-20 cursor-pointer"
                  aria-label="Oferta anterior"
                  title="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg border border-neutral-200 text-neutral-700 hover:text-[#E85B81] hover:scale-105 active:scale-95 flex items-center justify-center transition-all z-20 cursor-pointer"
                  aria-label="Siguiente oferta"
                  title="Siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* 2. BRANDS SECTION (P6)                                        */}
      {/* Tus marcas favoritas, rebajadas por poco tiempo               */}
      {/* White cards, no beige background, moving marquee -> grid      */}
      {/* ============================================================ */}
      {brands.length > 0 && (
        <div className="w-full space-y-3" id="outlet-brands-section">
          
          {/* Header Row: Title & "Ver todas las marcas →" */}
          <div className="flex items-center justify-between gap-3 px-1">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-[#18181B] tracking-tight">
              {language === 'en' 
                ? 'Your favorite brands with exceptional discounts' 
                : 'Tus marcas favoritas con descuentos excepcionales'}
            </h2>

            <button
              onClick={() => setIsBrandsExpanded(!isBrandsExpanded)}
              className="text-xs sm:text-sm font-bold text-[#E85B81] hover:text-[#DE4B73] transition-colors shrink-0 flex items-center gap-1 cursor-pointer select-none py-1 hover:underline underline-offset-4"
              id="outlet-toggle-all-brands-btn"
            >
              <span>
                {isBrandsExpanded
                  ? (language === 'en' ? '← View fewer brands' : '← Ocultar marcas')
                  : (language === 'en' ? 'View all brands →' : 'Ver todas las marcas →')}
              </span>
            </button>
          </div>

          {/* Marquee Animation Keyframes Style */}
          <style>{`
            @keyframes marqueeScroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee-infinite {
              display: flex;
              width: max-content;
              animation: marqueeScroll 34s linear infinite;
            }
            .pause-marquee {
              animation-play-state: paused !important;
            }
          `}</style>

          {/* Display Mode: Moving Line (Marquee) vs Static Grid (Expanded) */}
          {!isBrandsExpanded ? (
            /* Mode 1: Moving line from right to left, pauses on hover */
            <div 
              className="overflow-hidden w-full py-1.5 relative select-none"
              onMouseEnter={() => setIsBrandsMarqueePaused(true)}
              onMouseLeave={() => setIsBrandsMarqueePaused(false)}
            >
              <div className={`animate-marquee-infinite gap-3 sm:gap-4 ${isBrandsMarqueePaused ? 'pause-marquee' : ''}`}>
                {/* Duplicated items to create seamless loop */}
                {[...brands, ...brands].map((brand, idx) => (
                  <a
                    key={`marquee_${brand.id || brand.empresa}_${idx}`}
                    href={brand.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!brand.web) e.preventDefault();
                    }}
                    className="group bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 hover:border-[#E85B81] shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center min-w-[135px] sm:min-w-[165px] h-20 sm:h-24 px-4 py-3 hover:-translate-y-0.5 shrink-0"
                    title={`${brand.empresa} - ${language === 'en' ? 'Visit brand' : 'Ver ofertas de la marca'}`}
                  >
                    <BrandLogoBadge brand={brand} />
                  </a>
                ))}
              </div>
            </div>
          ) : (
            /* Mode 2: Static Grid of pure white cards directly on page (no beige background) */
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 w-full pt-1">
              {brands.map((brand, idx) => (
                <a
                  key={`grid_${brand.id || brand.empresa}_${idx}`}
                  href={brand.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!brand.web) e.preventDefault();
                  }}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 hover:border-[#E85B81] shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center h-20 sm:h-24 px-4 py-3 hover:-translate-y-0.5"
                  title={`${brand.empresa} - ${language === 'en' ? 'Visit brand' : 'Ver ofertas de la marca'}`}
                >
                  <BrandLogoBadge brand={brand} />
                </a>
              ))}
            </div>
          )}



        </div>
      )}

    </div>
  );
}
