import React from 'react';

/**
 * ROOS Capital - Country & Flag Utilities
 * Maps country names, abbreviations, and locations to their official SVG vector flag and display name.
 */

export interface CountryInfo {
  flag: string;
  name: string;
  code: string;
}

export function getCountryInfo(rawCountry?: string, rawState?: string, rawCity?: string): CountryInfo {
  const c = (rawCountry || '').toLowerCase().trim();
  const combined = `${rawCountry || ''} ${rawState || ''} ${rawCity || ''}`.toLowerCase().trim();

  // 1. Direct country matches have highest priority
  // Italia
  if (c === 'it' || c === 'italia' || c === 'italy' || c.startsWith('italia') || c.startsWith('italy')) {
    return { flag: '🇮🇹', name: 'Italia', code: 'IT' };
  }

  // Japón
  if (c === 'jp' || c === 'japon' || c === 'japón' || c === 'japan' || c.startsWith('japon') || c.startsWith('japón')) {
    return { flag: '🇯🇵', name: 'Japón', code: 'JP' };
  }

  // Francia
  if (c === 'fr' || c === 'francia' || c === 'france' || c.startsWith('francia') || c.startsWith('france')) {
    return { flag: '🇫🇷', name: 'Francia', code: 'FR' };
  }

  // Corea del Sur
  if (c === 'kr' || c === 'corea del sur' || c === 'core del sur' || c === 'corea' || c === 'korea' || c === 'south korea' || c.includes('corea') || c.includes('korea')) {
    return { flag: '🇰🇷', name: 'Corea del Sur', code: 'KR' };
  }

  // China
  if (c === 'cn' || c === 'china' || c.startsWith('china')) {
    return { flag: '🇨🇳', name: 'China', code: 'CN' };
  }

  // España
  if (c === 'es' || c === 'españa' || c === 'espana' || c === 'spain' || c.startsWith('españa') || c.startsWith('espana')) {
    return { flag: '🇪🇸', name: 'España', code: 'ES' };
  }

  // USA / Estados Unidos
  if (
    c === 'us' ||
    c === 'usa' || 
    c === 'u.s.a' || 
    c === 'ee.uu.' || 
    c === 'eeuu' || 
    c === 'estados unidos' || 
    c === 'united states'
  ) {
    return { flag: '🇺🇸', name: 'USA', code: 'US' };
  }

  // Colombia
  if (c === 'co' || c === 'colombia' || c.startsWith('colombia')) {
    return { flag: '🇨🇴', name: 'Colombia', code: 'CO' };
  }

  // Argentina
  if (c === 'ar' || c === 'argentina' || c.startsWith('argentina')) {
    return { flag: '🇦🇷', name: 'Argentina', code: 'AR' };
  }

  // Chile
  if (c === 'cl' || c === 'chile' || c.startsWith('chile')) {
    return { flag: '🇨🇱', name: 'Chile', code: 'CL' };
  }

  // Perú
  if (c === 'pe' || c === 'perú' || c === 'peru' || c.startsWith('perú') || c.startsWith('peru')) {
    return { flag: '🇵🇪', name: 'Perú', code: 'PE' };
  }

  // Venezuela
  if (c === 've' || c === 'venezuela' || c.startsWith('venezuela')) {
    return { flag: '🇻🇪', name: 'Venezuela', code: 'VE' };
  }

  // Ecuador
  if (c === 'ec' || c === 'ecuador' || c.startsWith('ecuador')) {
    return { flag: '🇪🇨', name: 'Ecuador', code: 'EC' };
  }

  // México
  if (c === 'mx' || c === 'méxico' || c === 'mexico' || c.startsWith('méxico') || c.startsWith('mexico')) {
    return { flag: '🇲🇽', name: 'México', code: 'MX' };
  }

  // 2. Fallback secondary detection on combined location string
  // Italia
  if (combined.includes('italia') || combined.includes('italy') || combined.includes('roma') || combined.includes('milan') || combined.includes('milán') || combined.includes('florencia') || combined.includes('firenze') || combined.includes('venecia') || combined.includes('venezia') || combined.includes('bolonia') || combined.includes('nápoles') || combined.includes('turín') || combined.includes('lombardía')) {
    return { flag: '🇮🇹', name: 'Italia', code: 'IT' };
  }

  // Japón
  if (combined.includes('japón') || combined.includes('japon') || combined.includes('japan') || combined.includes('tokyo') || combined.includes('tokio') || combined.includes('osaka') || combined.includes('kyoto') || combined.includes('shibuya') || combined.includes('ginza')) {
    return { flag: '🇯🇵', name: 'Japón', code: 'JP' };
  }

  // Francia
  if (combined.includes('francia') || combined.includes('france') || combined.includes('parís') || combined.includes('paris') || combined.includes('lyon') || combined.includes('marsella') || combined.includes('bordeaux') || combined.includes('île-de-france')) {
    return { flag: '🇫🇷', name: 'Francia', code: 'FR' };
  }

  // Corea del Sur
  if (combined.includes('corea') || combined.includes('korea') || combined.includes('seúl') || combined.includes('seoul') || combined.includes('busan') || combined.includes('gangnam') || combined.includes('hongdae')) {
    return { flag: '🇰🇷', name: 'Corea del Sur', code: 'KR' };
  }

  // China
  if (combined.includes('china') || combined.includes('shanghái') || combined.includes('shanghai') || combined.includes('beijing') || combined.includes('pekin') || combined.includes('pekín') || combined.includes('cantón') || combined.includes('guangzhou') || combined.includes('shenzhen') || combined.includes('guangdong') || combined.includes('hangzhou')) {
    return { flag: '🇨🇳', name: 'China', code: 'CN' };
  }

  // USA
  if (
    combined.includes('estados unidos') || 
    combined.includes('united states') || 
    combined.includes('california') || 
    combined.includes('texas') || 
    combined.includes('florida') || 
    combined.includes('miami') || 
    combined.includes('new york') ||
    combined.includes('austin') ||
    combined.includes('houston')
  ) {
    return { flag: '🇺🇸', name: 'USA', code: 'US' };
  }

  // Colombia
  if (combined.includes('colombia') || combined.includes('bogotá') || combined.includes('bogota') || combined.includes('medellín') || combined.includes('medellin') || combined.includes('cali')) {
    return { flag: '🇨🇴', name: 'Colombia', code: 'CO' };
  }

  // España
  if (combined.includes('españa') || combined.includes('spain') || combined.includes('madrid') || combined.includes('barcelona') || combined.includes('valencia') || combined.includes('sevilla') || combined.includes('bilbao')) {
    return { flag: '🇪🇸', name: 'España', code: 'ES' };
  }

  // Argentina
  if (combined.includes('argentina') || combined.includes('buenos aires') || combined.includes('córdoba') || combined.includes('rosario')) {
    return { flag: '🇦🇷', name: 'Argentina', code: 'AR' };
  }

  // Chile
  if (combined.includes('chile') || combined.includes('santiago') || combined.includes('valparaíso')) {
    return { flag: '🇨🇱', name: 'Chile', code: 'CL' };
  }

  // Perú
  if (combined.includes('perú') || combined.includes('peru') || combined.includes('lima')) {
    return { flag: '🇵🇪', name: 'Perú', code: 'PE' };
  }

  // Venezuela
  if (combined.includes('venezuela') || combined.includes('caracas')) {
    return { flag: '🇻🇪', name: 'Venezuela', code: 'VE' };
  }

  // Ecuador
  if (combined.includes('ecuador') || combined.includes('quito') || combined.includes('guayaquil')) {
    return { flag: '🇪🇨', name: 'Ecuador', code: 'EC' };
  }

  // Default: México
  return { flag: '🇲🇽', name: 'México', code: 'MX' };
}

/**
 * Universal SVG Vector Country Flag component.
 * Renders high-fidelity flags on ALL operating systems (eliminating broken Windows flag emojis).
 * Supports both 2-letter ISO codes (IT, JP, FR, KR, CN, MX, etc.) and full country names.
 */
export const CountryFlag: React.FC<{ countryCode?: string; className?: string; title?: string }> = ({ 
  countryCode = 'MX', 
  className = "w-4 h-3",
  title
}) => {
  // Normalize code: if full country name or lowercase is provided, resolve to official 2-letter code
  const raw = (countryCode || 'MX').trim();
  const code = (raw.length > 2 || !/^[A-Za-z]{2}$/.test(raw))
    ? getCountryInfo(raw).code
    : raw.toUpperCase();

  let flagSvg = null;

  if (code === 'MX') {
    // Mexico: Green, White with eagle crest, Red
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <path fill="#006847" d="M0 0h213.3v480H0z"/>
        <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
        <path fill="#ce1126" d="M426.7 0H640v480H426.7z"/>
        <circle cx="320" cy="240" r="46" fill="#8B5A2B" opacity="0.85"/>
        <path d="M300 230 c5 -15 20 -20 35 -15 c10 5 15 15 15 25 c0 15 -15 25 -30 25 c-15 0 -25 -10 -25 -25 c5 -5 10 -8 15 -5" fill="#DAA520"/>
        <path d="M295 248 c15 15 35 15 50 0" stroke="#006847" strokeWidth="6" fill="none"/>
      </svg>
    );
  } else if (code === 'US') {
    // USA: Red & White stripes with blue canton and stars
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <rect width="640" height="480" fill="#fff"/>
        <path fill="#b22234" d="M0 0h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0z"/>
        <rect width="256" height="259" fill="#3c3b6e"/>
        <g fill="#fff">
          <circle cx="40" cy="38" r="8"/>
          <circle cx="95" cy="38" r="8"/>
          <circle cx="150" cy="38" r="8"/>
          <circle cx="205" cy="38" r="8"/>
          <circle cx="68" cy="76" r="8"/>
          <circle cx="123" cy="76" r="8"/>
          <circle cx="178" cy="76" r="8"/>
          <circle cx="40" cy="114" r="8"/>
          <circle cx="95" cy="114" r="8"/>
          <circle cx="150" cy="114" r="8"/>
          <circle cx="205" cy="114" r="8"/>
          <circle cx="68" cy="152" r="8"/>
          <circle cx="123" cy="152" r="8"/>
          <circle cx="178" cy="152" r="8"/>
          <circle cx="40" cy="190" r="8"/>
          <circle cx="95" cy="190" r="8"/>
          <circle cx="150" cy="190" r="8"/>
          <circle cx="205" cy="190" r="8"/>
          <circle cx="68" cy="228" r="8"/>
          <circle cx="123" cy="228" r="8"/>
          <circle cx="178" cy="228" r="8"/>
        </g>
      </svg>
    );
  } else if (code === 'CO') {
    // Colombia: Yellow (50%), Blue (25%), Red (25%)
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <path fill="#fcd116" d="M0 0h640v240H0z"/>
        <path fill="#003893" d="M0 240h640v120H0z"/>
        <path fill="#ce1126" d="M0 360h640v120H0z"/>
      </svg>
    );
  } else if (code === 'ES') {
    // Spain: Red, Yellow (50%), Red
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <path fill="#c60b1e" d="M0 0h640v120H0z"/>
        <path fill="#ffc400" d="M0 120h640v240H0z"/>
        <path fill="#c60b1e" d="M0 360h640v120H0z"/>
        <circle cx="180" cy="240" r="35" fill="#c60b1e"/>
        <rect x="165" y="220" width="30" height="40" fill="#fff" rx="4"/>
      </svg>
    );
  } else if (code === 'AR') {
    // Argentina: Light blue, White, Light blue with sun
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <path fill="#75aadb" d="M0 0h640v160H0z"/>
        <path fill="#fff" d="M0 160h640v160H0z"/>
        <path fill="#75aadb" d="M0 320h640v160H0z"/>
        <circle cx="320" cy="240" r="28" fill="#f6b40e"/>
      </svg>
    );
  } else if (code === 'CL') {
    // Chile: Blue square with star, White top, Red bottom
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <path fill="#fff" d="M0 0h640v240H0z"/>
        <path fill="#d52b1e" d="M0 240h640v240H0z"/>
        <path fill="#0039a6" d="M0 0h240v240H0z"/>
        <polygon points="120,60 135,108 185,108 145,138 160,185 120,155 80,185 95,138 55,108 105,108" fill="#fff"/>
      </svg>
    );
  } else if (code === 'PE') {
    // Peru: Red, White, Red vertical
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <path fill="#d91023" d="M0 0h213.3v480H0z"/>
        <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
        <path fill="#d91023" d="M426.7 0H640v480H426.7z"/>
      </svg>
    );
  } else if (code === 'IT') {
    // Italia: Green, White, Red vertical
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <path fill="#009246" d="M0 0h213.3v480H0z"/>
        <path fill="#ffffff" d="M213.3 0h213.4v480H213.3z"/>
        <path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/>
      </svg>
    );
  } else if (code === 'FR') {
    // Francia: Blue, White, Red vertical
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <path fill="#002395" d="M0 0h213.3v480H0z"/>
        <path fill="#ffffff" d="M213.3 0h213.4v480H213.3z"/>
        <path fill="#ed2939" d="M426.7 0H640v480H426.7z"/>
      </svg>
    );
  } else if (code === 'JP') {
    // Japón: White background with red sun circle
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <rect width="640" height="480" fill="#ffffff"/>
        <circle cx="320" cy="240" r="144" fill="#bc002d"/>
      </svg>
    );
  } else if (code === 'CN') {
    // China: Red background with yellow stars
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <rect width="640" height="480" fill="#de2910"/>
        <polygon points="100,60 115,105 160,105 125,132 138,178 100,150 62,178 75,132 40,105 85,105" fill="#ffde00"/>
        <circle cx="195" cy="65" r="13" fill="#ffde00"/>
        <circle cx="230" cy="100" r="13" fill="#ffde00"/>
        <circle cx="230" cy="150" r="13" fill="#ffde00"/>
        <circle cx="195" cy="185" r="13" fill="#ffde00"/>
      </svg>
    );
  } else if (code === 'KR') {
    // Corea del Sur: White background with red/blue Taegeuk and 4 trigrams
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <rect width="640" height="480" fill="#ffffff"/>
        <g transform="translate(320, 240)">
          <path d="M-95,0 A95,95 0 0,1 95,0 A47.5,47.5 0 0,1 0,0 A47.5,47.5 0 0,0 -95,0" fill="#c60c30"/>
          <path d="M-95,0 A95,95 0 0,0 95,0 A47.5,47.5 0 0,0 0,0 A47.5,47.5 0 0,1 -95,0" fill="#003478"/>
        </g>
        <g fill="#111111">
          {/* Top-left trigram */}
          <rect x="75" y="80" width="55" height="9" transform="rotate(33 100 85)"/>
          <rect x="75" y="96" width="55" height="9" transform="rotate(33 100 101)"/>
          <rect x="75" y="112" width="55" height="9" transform="rotate(33 100 117)"/>
          {/* Bottom-right trigram */}
          <rect x="510" y="358" width="55" height="9" transform="rotate(33 535 363)"/>
          <rect x="510" y="374" width="55" height="9" transform="rotate(33 535 379)"/>
          <rect x="510" y="390" width="55" height="9" transform="rotate(33 535 395)"/>
          {/* Top-right trigram */}
          <rect x="510" y="80" width="55" height="9" transform="rotate(-33 535 85)"/>
          <rect x="510" y="96" width="55" height="9" transform="rotate(-33 535 101)"/>
          <rect x="510" y="112" width="55" height="9" transform="rotate(-33 535 117)"/>
          {/* Bottom-left trigram */}
          <rect x="75" y="358" width="55" height="9" transform="rotate(-33 100 363)"/>
          <rect x="75" y="374" width="55" height="9" transform="rotate(-33 100 379)"/>
          <rect x="75" y="390" width="55" height="9" transform="rotate(-33 100 395)"/>
        </g>
      </svg>
    );
  } else if (code === 'VE') {
    // Venezuela: Yellow, Blue, Red
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <path fill="#fcd116" d="M0 0h640v160H0z"/>
        <path fill="#003893" d="M0 160h640v160H0z"/>
        <path fill="#ce1126" d="M0 320h640v160H0z"/>
        <circle cx="320" cy="240" r="8" fill="#ffffff"/>
        <circle cx="280" cy="235" r="8" fill="#ffffff"/>
        <circle cx="360" cy="235" r="8" fill="#ffffff"/>
        <circle cx="245" cy="222" r="8" fill="#ffffff"/>
        <circle cx="395" cy="222" r="8" fill="#ffffff"/>
      </svg>
    );
  } else if (code === 'EC') {
    // Ecuador: Yellow (50%), Blue (25%), Red (25%)
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <path fill="#ffdd00" d="M0 0h640v240H0z"/>
        <path fill="#034ea2" d="M0 240h640v120H0z"/>
        <path fill="#ed1c24" d="M0 360h640v120H0z"/>
      </svg>
    );
  } else {
    // Default Mexico
    flagSvg = (
      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
        <path fill="#006847" d="M0 0h213.3v480H0z"/>
        <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
        <path fill="#ce1126" d="M426.7 0H640v480H426.7z"/>
      </svg>
    );
  }

  return (
    <span 
      className={`inline-block overflow-hidden rounded-[2.5px] border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.12)] shrink-0 align-middle ${className}`}
      title={title}
    >
      {flagSvg}
    </span>
  );
};

/**
 * Interleave announcements by country so that products and businesses
 * from different countries alternate on the homepage rather than appearing
 * in homogeneous clusters from Google Sheets.
 */
export function interleaveAnnouncementsByCountry<T extends { extractedCountry?: string; pais?: string; estado?: string; municipio?: string }>(items: T[]): T[] {
  if (!items || items.length <= 1) return items;

  // Group items by normalized country code
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const info = getCountryInfo(item.extractedCountry || item.pais, item.estado, item.municipio);
    const key = info.code;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(item);
  }

  // If only 1 country in the list, no need to interleave
  if (groups.size <= 1) return items;

  // Sort country groups by size descending
  const sortedQueues = Array.from(groups.values()).map(q => [...q]);
  const result: T[] = [];
  let addedAny = true;

  while (addedAny) {
    addedAny = false;
    for (const queue of sortedQueues) {
      if (queue.length > 0) {
        result.push(queue.shift()!);
        addedAny = true;
      }
    }
  }

  return result;
}
