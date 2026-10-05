/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Newspaper, 
  Search, 
  Instagram, 
  Facebook, 
  Globe, 
  Laptop, 
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Check,
  Filter,
  RefreshCw,
  Image as ImageIcon,
  Menu,
  X,
  MessageCircle,
  Linkedin,
  Twitter,
  Music,
  Music2,
  Phone,
  MapPin,
  Mail,
  ShoppingBag,
  Heart,
  User,
  Eye,
  EyeOff,
  Lock,
  CreditCard,
  Building2,
  Landmark,
  Package
} from 'lucide-react';
import Papa from 'papaparse';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import roseGoldPattern from './assets/images/rose_gold_organic_pattern_1779358688635.png';
import roosCapitalLogo from './assets/images/roos_capital_logo.png';
import SomosRoos from './components/SomosRoos';
import EducacionCurso from './components/EducacionCurso';
import RoosCapitalQuotes from './components/RoosCapitalQuotes';
import Emprendedoras from './components/Emprendedoras';
import FavoritesModal from './components/FavoritesModal';
import { loadStoredFavorites, saveStoredFavorites, getCardKey, fetchFavoritesByCode } from './utils/favorites';
import FAQ from './components/FAQ';
import UgcProgram from './components/UgcProgram';
import Publicate from './components/Publicate';
import Ambassadors from './components/Ambassadors';
import { SpotlightBanner } from './components/SpotlightBanner';
import { HeroSection } from './components/HeroSection';
import { AutocroppedLogo } from './components/AutocroppedLogo';
import LoginModal from './components/LoginModal';
import CursorAura from './components/CursorAura';
import { getCountryInfo, interleaveAnnouncementsByCountry, CountryFlag } from './utils/countryUtils';
import { getCanonicalCategory } from './utils/categoryUtils';
import FundadorasTicker, { hasAnuncioImage } from './components/FundadorasTicker';
import NoticiasTicker from './components/NoticiasTicker';
import CategoryEmojiBar from './components/CategoryEmojiBar';
import ScratchAndDiscover from './components/ScratchAndDiscover';
import RoosLogo from './components/RoosLogo';
import { AnnouncementCard } from './components/AnnouncementCard';
import AnnouncementModal from './components/AnnouncementModal';
import { LocationCheckboxFilter } from './components/LocationCheckboxFilter';
import { initGlobalButtonSounds } from './utils/sound';
import { getOptimizedImageUrl } from './utils/imageUtils';
import { useLanguage } from './context/LanguageContext';
import { LanguageToggle } from './components/LanguageToggle';
import { 
  formatWhatsAppUrl, 
  formatInstagramUrl, 
  formatFacebookUrl, 
  formatTikTokUrl, 
  formatTwitterUrl, 
  formatLinkedInUrl, 
  formatWebUrl,
  isValidSocialRaw
} from './utils/socialUtils';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to play diamond sound effect using Web Audio API
export function playDiamondSound(isChime: boolean = true) {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    if (isChime) {
      // 💎 Twin sparkling crystal "bling" (highly resonant jewel chime)
      const now = ctx.currentTime;
      
      // Tone 1: The initial crisp strike (Plink)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1800, now);
      osc1.frequency.exponentialRampToValueAtTime(3200, now + 0.08);
      
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      
      // Tone 2: The high-resonance chime (The second "bling" strike)
      // Delayed slightly by 0.04s to create a double-surface reflection effect
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(2400, now + 0.04);
      osc2.frequency.exponentialRampToValueAtTime(3800, now + 0.12);
      
      gain2.gain.setValueAtTime(0.0, now);
      gain2.gain.setValueAtTime(0.10, now + 0.04);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      // Tone 3: Ultra high sparkle overtone for diamond shine
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(4500, now + 0.02);
      
      gain3.gain.setValueAtTime(0.0, now);
      gain3.gain.setValueAtTime(0.04, now + 0.02);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      
      osc3.connect(gain3);
      gain3.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.04);
      osc3.start(now + 0.02);
      
      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);
      osc3.stop(now + 0.5);
    } else {
      // 💎 Soft crystalline plop/downward untuning
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1200, now);
      osc1.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      
      gain1.gain.setValueAtTime(0.06, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      
      osc1.start(now);
      osc1.stop(now + 0.25);
    }
  } catch (e) {
    console.debug('AudioContext not allowed or not supported yet', e);
  }
}

// Interfaces
export interface Announcement {
  id?: string;
  titulo: string;
  categoria: string;
  subcategoria?: string;
  descripcion: string;
  imagen: string;
  anuncio?: string;
  logo?: string;
  socio?: string;
  keywords?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
  linkedin?: string;
  web?: string;
  weibo?: string;
  xiaohongshu?: string;
  douyin?: string;
  line?: string;
  kakao?: string;
  wechat?: string;
  fecha?: string;
  direccion?: string;
  estado?: string;
  municipio?: string;
  ciudad?: string;
  pais?: string;
  promo?: string;
  hashtags?: string;
  internacional?: boolean;
  online?: boolean;
  onlineLabel?: 'También online' | 'Sólo online';
  proveedor?: boolean;
  extractedCountry?: string;
  extractedState?: string;
  extractedMunicipio?: string;
}

function TopCarousel({ ads }: { ads: Announcement[] }) {
  if (ads.length === 0) return null;
  
  // Duplicate for smooth infinite scroll
  const duplicatedAds = [...ads, ...ads, ...ads, ...ads];

  return (
    <div 
      className="w-full text-brand-wine overflow-hidden border-b-4 border-brand-orange sticky top-0 z-[100] shadow-2xl flex items-center h-16"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url(${roseGoldPattern})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '1100px 800px',
        backgroundColor: '#FFFFFF',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white/90 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white/90 via-white/70 to-transparent z-10" />
        
        <motion.div 
          className="flex items-center gap-16 whitespace-nowrap px-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {duplicatedAds.map((ad, i) => (
            <div key={i} className="flex items-center gap-6 group cursor-default">
              <div className="flex items-center gap-3">
                {ad.logo && ad.logo.trim() && (
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-orange/30 bg-white shadow-sm ring-2 ring-white">
                    <img 
                      src={getOptimizedImageUrl(ad.logo)} 
                      alt="" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer" 
                      loading="lazy"
                    />
                  </div>
                )}
                <span className="text-lg font-lora font-normal italic tracking-wide text-brand-wine">
                  {ad.titulo}
                </span>
              </div>
              <span className="text-brand-wine/20 text-2xl font-light">|</span>
              <span className="text-xs font-bold uppercase opacity-60 tracking-widest leading-none border-b border-brand-wine/20 pb-0.5">
                {ad.categoria}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Helper to parse address/direction into state and municipality for Mexico
function getMexicoStateAndMunicipio(direccion: string): { state: string; municipality: string } {
  if (!direccion || direccion.trim() === '') {
    return { state: 'Otro', municipality: 'Centro/General' };
  }
  
  const cleanDir = direccion.trim();
  const parts = cleanDir.split(',').map(p => p.trim());
  
  // Mexican states dictionary to normalize capitalization and names
  const statesList = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Coahuila", "Colima", 
    "Ciudad de México", "CDMX", "Distrito Federal", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", 
    "México", "Edomex", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", 
    "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", 
    "Yucatán", "Zacatecas"
  ];
  
  const abbreviations: Record<string, string> = {
    'nl': 'Nuevo León',
    'n.l.': 'Nuevo León',
    'yuc': 'Yucatán',
    'jal': 'Jalisco',
    'coah': 'Coahuila',
    'mty': 'Nuevo León', 
    'df': 'CDMX',
    'mx': 'Estado de México',
    'edomex': 'Estado de México',
    'edo mx': 'Estado de México'
  };

  let detectedState = '';
  let detectedMunicipality = '';
  
  // First, check if any abbreviation matches exactly as a standalone part
  for (const part of [...parts].reverse()) {
    const lowerPart = part.toLowerCase();
    if (abbreviations[lowerPart]) {
      detectedState = abbreviations[lowerPart];
      const otherParts = parts.filter(p => p !== part);
      detectedMunicipality = otherParts.length > 0 ? otherParts.join(', ') : '';
      break;
    }
  }

  // If no state detected by abbreviation, search known states List
  if (!detectedState) {
    for (const part of [...parts].reverse()) {
      const matchedState = statesList.find(s => 
        part.toLowerCase() === s.toLowerCase() || 
        part.toLowerCase().includes(s.toLowerCase() + " ") ||
        part.toLowerCase().endsWith(" " + s.toLowerCase())
      );
      if (matchedState) {
        detectedState = matchedState;
        const otherParts = parts.filter(p => p !== part);
        detectedMunicipality = otherParts.length > 0 ? otherParts.join(', ') : '';
        break;
      }
    }
  }
  
  if (!detectedState) {
    // Scan whole direction string for any state name matching
    const matchedState = statesList.find(s => cleanDir.toLowerCase().includes(s.toLowerCase()));
    if (matchedState) {
      detectedState = matchedState;
      detectedMunicipality = cleanDir.replace(new RegExp(matchedState, 'gi'), '').replace(/^[,\s]+|[,\s]+$/g, '').trim();
    }
  }
  
  // standard normalizations
  if (detectedState) {
    const dsLower = detectedState.toLowerCase();
    if (['cdmx', 'distrito federal', 'ciudad de méxico'].includes(dsLower)) {
      detectedState = 'CDMX';
    } else if (dsLower === 'edomex' || dsLower === 'méxico') {
      detectedState = 'Estado de México';
    }
  } else {
    detectedState = 'Otro';
    detectedMunicipality = cleanDir;
  }
  
  if (!detectedMunicipality || detectedMunicipality.trim() === '') {
    detectedMunicipality = 'Centro/General';
  }
  
  return {
    state: detectedState,
    municipality: detectedMunicipality
  };
}

const DIRECT_PRIMARY_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTyC2jBz4JtAra4VtCNQSbCyDf28VB7Her9WpYdfuOS1eTBY9lY5ygYT9wDHUIbG4PvGlYEgDvpu6OT/pub?gid=0&single=true&output=csv';
const DIRECT_DIAMONDS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTyC2jBz4JtAra4VtCNQSbCyDf28VB7Her9WpYdfuOS1eTBY9lY5ygYT9wDHUIbG4PvGlYEgDvpu6OT/pub?gid=2129723216&single=true&output=csv';
const DIRECT_CONFIG_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTyC2jBz4JtAra4VtCNQSbCyDf28VB7Her9WpYdfuOS1eTBY9lY5ygYT9wDHUIbG4PvGlYEgDvpu6OT/pub?gid=859336638&single=true&output=csv';

async function fetchCsvWithFallback(apiEndpoint: string, directUrl: string): Promise<string> {
  const cacheBuster = Date.now();
  const directFullUrl = `${directUrl}&_t=${cacheBuster}&_cb=${cacheBuster}`;

  // 1. Try local Express API route first (fastest, served from in-memory cache primed with live data)
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(`${apiEndpoint}?_t=${cacheBuster}`, {
      signal: controller.signal,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
    clearTimeout(timer);
    if (res.ok) {
      const text = await res.text();
      if (text && !text.trim().startsWith('<!DOCTYPE') && !text.includes('<html') && text.length > 50) {
        return text;
      }
    }
  } catch (e) {}

  // 2. Direct fetch fallback to Google Sheets with 12s timeout
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(directFullUrl, {
      signal: controller.signal,
      headers: {
        'Accept': 'text/csv, text/plain, */*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
    clearTimeout(timer);
    if (res.ok) {
      const text = await res.text();
      if (text && !text.trim().startsWith('<!DOCTYPE') && !text.includes('<html') && text.length > 50) {
        return text;
      }
    }
  } catch (e) {}

  return '';
}

function parseCSVAnuncios(csvText: string, isDiamonds: boolean = false): Announcement[] {
  try {
    const trimmed = (csvText || '').trim();
    if (!trimmed || trimmed.startsWith('<!DOCTYPE') || trimmed.includes('<html') || trimmed.includes('head {') || trimmed.includes('body {') || trimmed.includes('color:')) {
      console.warn("Parsed text matches HTML/CSS instead of valid CSV. Aborting parsing.");
      return [];
    }

    const results = Papa.parse(csvText, {
      header: false,
      skipEmptyLines: 'greedy',
    });

    if (!results.data || results.data.length === 0) {
      return [];
    }

    const rawRows = results.data as string[][];
    
    // Find the best header row scanning the first 40 rows
    let headerRowIndex = -1;
    let maxKeywordScore = 0;
    const headerKeywords = [
      'empresa', 'marca', 'negocio', 'nombre', 'anuncio', 'categoria', 
      'categoría', 'titulo', 'título', 'socio', 'whatsapp', 'instagram', 
      'facebook', 'tiktok', 'telefono', 'teléfono', 'logo', 'redes', 
      'ubicacion', 'ubicación', 'estado', 'municipio', 'pais', 'país', 
      'link', 'web', 'sitio', 'internacional', 'online', 'remoto',
      'proveedor', 'proveedores'
    ];

    for (let i = 0; i < Math.min(rawRows.length, 40); i++) {
      if (!rawRows[i]) continue;
      const rowStr = rawRows[i].join(' ').toLowerCase();
      let score = 0;
      for (const kw of headerKeywords) {
        if (rowStr.includes(kw)) score++;
      }
      if (score > maxKeywordScore) {
        maxKeywordScore = score;
        headerRowIndex = i;
      }
    }

    if (headerRowIndex === -1 || maxKeywordScore === 0) {
      headerRowIndex = 0;
    }

    const headers = rawRows[headerRowIndex].map(h => (h || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '_'));
    const dataRows = rawRows.slice(headerRowIndex + 1);

    const data = dataRows
      .map((row) => {
        const normalizedRow: Record<string, string> = {};
        headers.forEach((header, index) => {
          if (header) {
            const value = row[index] ? String(row[index]).trim() : '';
            normalizedRow[header] = value;
          }
        });

        // 1. Extract Empresa / Marca / Título
        let empresa = '';
        for (const key of Object.keys(normalizedRow)) {
          if (
            (key.includes('empresa') || key.includes('marca') || key.includes('negocio') || 
             key.includes('proyecto') || key.includes('emprendedora') || key.includes('titulo') || 
             key.includes('t_tulo') || key.includes('nombre') || key.includes('comercio') || key.includes('tienda')) && 
            !key.includes('logo') && !key.includes('anuncio') && !key.includes('foto') && !key.includes('imagen')
          ) {
            if (normalizedRow[key] && normalizedRow[key].trim()) {
              empresa = normalizedRow[key].trim();
              break;
            }
          }
        }

        // Positional fallback for company name
        if (!empresa) {
          for (let c = 0; c < row.length; c++) {
            const val = (row[c] || '').trim();
            if (val && !val.startsWith('http') && !val.startsWith('@') && !val.match(/^\+?[0-9\s-]{7,}$/) && val.length >= 2 && val.length <= 65) {
              empresa = val;
              break;
            }
          }
        }

        if (!empresa || empresa.length === 0) return null;

        // 2. Extract Category
        let rawCategoria = '';
        for (const key of Object.keys(normalizedRow)) {
          if (key.includes('categoria') || key.includes('categor_a') || key.includes('rubro') || key.includes('giro') || key.includes('sector') || key.includes('tipo_de_evento')) {
            if (normalizedRow[key] && normalizedRow[key].trim()) {
              rawCategoria = normalizedRow[key].trim();
              break;
            }
          }
        }
        if (!rawCategoria) rawCategoria = 'General';
        const categoria = getCanonicalCategory(rawCategoria);

        // 3. Extract Images & Logo
        let imagen = '';
        let logo = '';
        let anuncioVal = '';

        for (const key of Object.keys(normalizedRow)) {
          const val = normalizedRow[key];
          if (!val) continue;
          if (key.includes('anuncio') || key.includes('imagen') || key.includes('foto') || key.includes('banner') || key.includes('flyer') || key.includes('portada') || key.includes('arte')) {
            if (val.startsWith('http') || val.includes('.png') || val.includes('.jpg') || val.includes('.jpeg') || val.includes('.webp') || val.includes('drive.google.com') || val.includes('dropbox.com')) {
              imagen = val;
              anuncioVal = val;
            }
          }
          if (key.includes('logo') || key.includes('logotipo') || key.includes('icono')) {
            if (val.startsWith('http') || val.includes('.png') || val.includes('.jpg') || val.includes('.jpeg') || val.includes('.webp') || val.includes('drive.google.com') || val.includes('dropbox.com')) {
              logo = val;
            }
          }
        }

        // Cell scan fallback for images
        if (!imagen || !logo) {
          for (let c = 0; c < row.length; c++) {
            const val = (row[c] || '').trim();
            if (val.startsWith('http') || val.includes('drive.google.com') || val.includes('dropbox.com') || val.includes('raw.githubusercontent.com')) {
              const isImg = val.toLowerCase().match(/\.(png|jpg|jpeg|webp|gif|svg)/) || val.includes('drive.google.com') || val.includes('dropbox.com') || val.includes('assets') || val.includes('images');
              if (isImg && !imagen && !isDiamonds) {
                imagen = val;
              } else if (isImg && !logo && val !== imagen) {
                logo = val;
              }
            }
          }
        }

        if (isDiamonds) {
          // For diamonds / fundadoras, do NOT copy logo into imagen if anuncio is empty,
          // so that the modal only activates when there is an actual advertisement image link in the sheet
          if (!logo && imagen) logo = imagen;
        } else {
          if (!imagen && logo) imagen = logo;
          if (!logo && imagen) logo = imagen;
        }

        // 4. Extract Social Links across all columns & cell contents
        let rawWhatsapp = '';
        let rawInstagram = '';
        let rawFacebook = '';
        let rawTiktok = '';
        let rawTwitter = '';
        let rawLinkedin = '';
        let rawWeb = '';
        let rawWeibo = '';
        let rawXiaohongshu = '';
        let rawDouyin = '';
        let rawLine = '';
        let rawKakao = '';
        let rawWechat = '';

        for (const key of Object.keys(normalizedRow)) {
          const val = normalizedRow[key];
          if (!val || !isValidSocialRaw(val)) continue;
          const lowerVal = val.toLowerCase();

          // Dedicated detection for Asian platforms anywhere in row
          if (lowerVal.includes('weibo.com') || key.includes('weibo')) {
            if (!rawWeibo) rawWeibo = val;
            continue;
          }
          if (lowerVal.includes('xiaohongshu.com') || lowerVal.includes('xhslink') || key === 'red' || key.includes('xiaohongshu') || key.startsWith('red_') || key.endsWith('_red')) {
            if (!rawXiaohongshu) rawXiaohongshu = val;
            continue;
          }
          if (lowerVal.includes('douyin.com') || key.includes('douyin')) {
            if (!rawDouyin) rawDouyin = val;
            continue;
          }
          if ((lowerVal.includes('lin.ee') || lowerVal.includes('line.me') || key === 'line' || key.startsWith('line_') || key.endsWith('_line')) && !key.includes('online')) {
            if (!rawLine) rawLine = val;
            continue;
          }
          if (lowerVal.includes('kakao.com') || lowerVal.includes('kakaotalk') || key.includes('kakao')) {
            if (!rawKakao) rawKakao = val;
            continue;
          }
          if (lowerVal.includes('wechat') || lowerVal.includes('weixin') || key.includes('wechat')) {
            if (!rawWechat) rawWechat = val;
            continue;
          }

          if (key.includes('whatsapp') || key.includes('telefono') || key.includes('celular') || key.includes('tel_fono') || key.includes('movil') || key.includes('wsp') || key.includes('numero')) {
            if (!rawWhatsapp && !lowerVal.includes('kakao') && !lowerVal.includes('lin.ee') && !key.includes('wechat')) rawWhatsapp = val;
          }
          if (key.includes('instagram') || key.includes('instargram') || key.includes('ig') || key.includes('insta')) {
            if (!rawInstagram && !lowerVal.includes('xiaohongshu') && !lowerVal.includes('weibo')) rawInstagram = val;
          }
          if (key.includes('facebook') || key.includes('fb') || key.includes('face')) {
            if (!rawFacebook && !lowerVal.includes('weibo')) rawFacebook = val;
          }
          if (key.includes('tiktok') || key.includes('tik_tok') || key.includes('tk')) {
            if (!rawTiktok && !lowerVal.includes('douyin') && !lowerVal.includes('x.com')) rawTiktok = val;
          }
          if (key.includes('twitter') || key.includes('tw') || key === 'x' || key.includes('_x')) {
            if (!rawTwitter) rawTwitter = val;
          }
          if (key.includes('linkedin') || key.includes('linkdin') || key === 'in') {
            if (!rawLinkedin) rawLinkedin = val;
          }
          if (key.includes('web') || key.includes('sitio') || key.includes('pagina') || key.includes('p_gina') || key.includes('url') || key.includes('link') || key.includes('tienda') || key.includes('catalogo') || key.includes('linktree') || key.includes('beacons')) {
            if (!rawWeb && !key.includes('instagram') && !key.includes('facebook') && !key.includes('tiktok') && !key.includes('whatsapp') && !key.includes('logo') && !key.includes('imagen') && !key.includes('anuncio') && !lowerVal.includes('weibo') && !lowerVal.includes('xiaohongshu') && !lowerVal.includes('douyin') && !lowerVal.includes('lin.ee') && !lowerVal.includes('kakao') && !key.includes('wechat') && key !== 'red') {
              rawWeb = val;
            }
          }
        }

        // Cell-by-cell fallback for unmapped social links
        for (let c = 0; c < row.length; c++) {
          const val = (row[c] || '').trim();
          if (!val || !isValidSocialRaw(val)) continue;
          const lower = val.toLowerCase();
          if (!rawWeibo && lower.includes('weibo.com')) {
            rawWeibo = val;
          } else if (!rawXiaohongshu && (lower.includes('xiaohongshu.com') || lower.includes('xhslink'))) {
            rawXiaohongshu = val;
          } else if (!rawDouyin && lower.includes('douyin.com')) {
            rawDouyin = val;
          } else if (!rawWechat && (lower.includes('weixin.qq.com') || lower.includes('weixin://') || lower.includes('wechat:'))) {
            rawWechat = val;
          } else if (!rawLine && (lower.includes('lin.ee') || lower.includes('line.me'))) {
            rawLine = val;
          } else if (!rawKakao && lower.includes('kakao.com')) {
            rawKakao = val;
          } else if (!rawTwitter && (lower.includes('x.com/') || lower.includes('twitter.com/'))) {
            rawTwitter = val;
          } else if (!rawInstagram && (lower.includes('instagram.com') || (val.startsWith('@') && !lower.includes('tiktok')))) {
            rawInstagram = val;
          } else if (!rawFacebook && (lower.includes('facebook.com') || lower.includes('fb.me') || lower.includes('fb.com'))) {
            rawFacebook = val;
          } else if (!rawTiktok && (lower.includes('tiktok.com') || lower.includes('tiktok:'))) {
            rawTiktok = val;
          } else if (!rawWhatsapp && (lower.includes('wa.me') || lower.includes('wa.link') || (val.match(/^\+?[0-9\s-]{8,15}$/) && !val.includes('.')))) {
            rawWhatsapp = val;
          } else if (!rawWeb && (lower.includes('linktr.ee') || lower.includes('beacons.ai') || lower.includes('canva.site') || (lower.startsWith('http') && !lower.includes('google.com') && !lower.includes('github') && !lower.includes('dropbox') && !lower.includes('instagram') && !lower.includes('facebook') && !lower.includes('tiktok') && !lower.includes('weibo') && !lower.includes('xiaohongshu') && !lower.includes('douyin') && !lower.includes('lin.ee') && !lower.includes('kakao')))) {
            rawWeb = val;
          }
        }

        // 5. Extract Socio status, Description, Keywords, Location
        const socioVal = normalizedRow.tipo_de_socio || normalizedRow.socio || normalizedRow.tipo || normalizedRow.distincion || '';
        const keywordsVal = normalizedRow.palabras_clave || normalizedRow.keywords || normalizedRow.tags || '';

        const descVal = (() => {
          const desc = normalizedRow.descripcion || 
            normalizedRow.proposito || 
            normalizedRow.prop_sito || 
            (imagen.startsWith('http') ? '' : (normalizedRow.anuncio || ''));
          return desc.includes('Haz clic abajo para contactar') ? '' : desc;
        })();

        const estadoVal = normalizedRow.estado || normalizedRow.state || '';
        const rawCiudad = normalizedRow.ciudad || normalizedRow.city || '';
        const rawMun = normalizedRow.municipio || normalizedRow.municipality || rawCiudad || '';
        const municipioVal = String(rawMun).replace(/^[-–—\s]+/, '').trim();
        const ciudadVal = String(rawCiudad || rawMun).replace(/^[-–—\s]+/, '').trim();
        const direccionVal = normalizedRow.direccion || normalizedRow.ubicacion || '';

        const paisVal = (() => {
          const direct = normalizedRow.pais || normalizedRow.pa_s || normalizedRow.country || normalizedRow.origen || normalizedRow.nacion || normalizedRow.naci_n || normalizedRow.ubicacion_pais;
          let candidate = '';
          if (direct && String(direct).trim()) {
            candidate = String(direct).trim();
          } else {
            for (const key of Object.keys(normalizedRow)) {
              if ((key.includes('pais') || key.includes('pa_s') || key.includes('country') || key.includes('nacion') || key.includes('naci_n') || key.includes('origen')) && normalizedRow[key]) {
                const val = String(normalizedRow[key]).trim();
                if (val) {
                  candidate = val;
                  break;
                }
              }
            }
          }
          if (!candidate && headers[0] && (headers[0].includes('pais') || headers[0].includes('pa_s')) && row[0]) {
            candidate = String(row[0]).trim();
          }
          if (candidate) {
            const cClean = candidate.replace(/^[-–—\s]+/, '').trim();
            const cCleanLower = cClean.toLowerCase();
            if (cCleanLower === 'si' || cCleanLower === 'sí' || cCleanLower === 'yes' || cCleanLower === 'no' || cCleanLower === 'internacional' || cCleanLower === 'online' || cCleanLower === 'remoto' || cCleanLower === '-') {
              return '';
            }
            return cClean;
          }
          return '';
        })();

        // Keep the true country value
        const finalPaisVal = paisVal;

        // Extract hashtags from column "HASHTAGS"
        const hashtagsVal = (() => {
          if (normalizedRow.hashtags && String(normalizedRow.hashtags).trim()) {
            return String(normalizedRow.hashtags).trim();
          }
          if (normalizedRow.hashtag && String(normalizedRow.hashtag).trim()) {
            return String(normalizedRow.hashtag).trim();
          }
          for (const key of Object.keys(normalizedRow)) {
            if (key.includes('hashtag')) {
              const val = String(normalizedRow[key] || '').trim();
              if (val) return val;
            }
          }
          return '';
        })();

        // Extract promo information from sheet
        const promoVal = (() => {
          if (normalizedRow.promo && String(normalizedRow.promo).trim()) {
            return String(normalizedRow.promo).trim();
          }
          for (const key of Object.keys(normalizedRow)) {
            if (
              key.includes('promo') || 
              key.includes('promocion') || 
              key.includes('promoci_n') || 
              key.includes('oferta') || 
              key.includes('descuento') ||
              key.includes('beneficio')
            ) {
              const val = String(normalizedRow[key] || '').trim();
              if (val) return val;
            }
          }
          return '';
        })();

        // Helper to check for "SI" affirmative values (including "-SI", "SÍ", "yes", etc.)
        const isYes = (val: any) => {
          if (!val) return false;
          const cleaned = String(val).replace(/^[-–—\s]+/, '').trim().toUpperCase();
          return cleaned === 'SI' || cleaned === 'SÍ' || cleaned === 'YES' || cleaned === 'TRUE' || cleaned === '1';
        };

        // Extract proveedor flag from column "proveedores" when selection is "SI"
        const proveedorVal = (() => {
          if (isYes(normalizedRow.proveedores) || isYes(normalizedRow.proveedor)) return true;
          for (const key of Object.keys(normalizedRow)) {
            if (key.includes('proveedor') || key.includes('supplier')) {
              if (isYes(normalizedRow[key])) return true;
            }
          }
          return false;
        })();

        // Extract internacional flag
        const internacionalVal = (() => {
          if (isYes(normalizedRow.internacional)) return true;
          for (const key of Object.keys(normalizedRow)) {
            if (key.includes('internacional') || key.includes('international') || key.includes('intl')) {
              if (isYes(normalizedRow[key])) return true;
            }
          }
          return false;
        })();

        // Extract online / remoto classification: "También online" | "Sólo online"
        const { online: onlineVal, onlineLabel: onlineLabelVal } = (() => {
          let raw = '';
          if (normalizedRow.online !== undefined && normalizedRow.online !== null && String(normalizedRow.online).trim() !== '') {
            raw = String(normalizedRow.online).trim();
          } else if (normalizedRow.remoto !== undefined && normalizedRow.remoto !== null && String(normalizedRow.remoto).trim() !== '') {
            raw = String(normalizedRow.remoto).trim();
          } else if (normalizedRow.virtual !== undefined && normalizedRow.virtual !== null && String(normalizedRow.virtual).trim() !== '') {
            raw = String(normalizedRow.virtual).trim();
          } else {
            for (const key of Object.keys(normalizedRow)) {
              if (
                key.includes('online') || 
                key.includes('remoto') || 
                key.includes('en_linea') || 
                key.includes('en_l_nea') || 
                key.includes('virtual')
              ) {
                const v = String(normalizedRow[key] || '').trim();
                if (v) {
                  raw = v;
                  break;
                }
              }
            }
          }

          if (!raw) return { online: false, onlineLabel: undefined };

          const rawClean = raw.replace(/^[-–—\s]+/, '').trim();
          const rawLower = rawClean.toLowerCase();

          // Explicit negatives
          if (rawLower === 'no' || rawLower === 'false' || rawLower === '0' || rawLower === 'ninguno' || rawLower === '-') {
            return { online: false, onlineLabel: undefined };
          }

          // Exact or partial match for "Sólo online" / "Solo online"
          if (rawLower.includes('solo') || rawLower.includes('sólo')) {
            return { online: true, onlineLabel: 'Sólo online' as const };
          }

          // Exact or partial match for "También online" / "Tambien online"
          if (rawLower.includes('tambi') || rawLower.includes('también') || rawLower.includes('tambien')) {
            return { online: true, onlineLabel: 'También online' as const };
          }

          // Affirmative values or legacy "SI" / "YES" / "ONLINE":
          // If the company has a physical state or location, it's "También online", otherwise "Sólo online"
          if (isYes(rawClean) || rawLower === 'online' || rawLower === 'remoto' || rawLower.length > 0) {
            const hasPhysicalLocation = Boolean(
              (estadoVal && estadoVal !== 'Todos' && estadoVal !== 'Remoto' && estadoVal !== 'Otro') ||
              (municipioVal && municipioVal !== 'Todos' && municipioVal !== 'Centro/General') ||
              (direccionVal && direccionVal.length > 3)
            );
            return { 
              online: true, 
              onlineLabel: (hasPhysicalLocation ? 'También online' : 'Sólo online') as 'También online' | 'Sólo online' 
            };
          }

          return { online: false, onlineLabel: undefined };
        })();

        return {
          id: normalizedRow.id || empresa,
          titulo: empresa,
          categoria: categoria,
          subcategoria: rawCategoria,
          descripcion: descVal,
          imagen: imagen,
          anuncio: anuncioVal,
          logo: logo,
          socio: socioVal,
          keywords: keywordsVal,
          whatsapp: rawWhatsapp,
          instagram: rawInstagram,
          facebook: rawFacebook,
          tiktok: rawTiktok,
          twitter: rawTwitter,
          linkedin: rawLinkedin,
          web: rawWeb,
          weibo: rawWeibo,
          xiaohongshu: rawXiaohongshu,
          douyin: rawDouyin,
          line: rawLine,
          kakao: rawKakao,
          wechat: rawWechat,
          fecha: normalizedRow.fecha || new Date().toLocaleDateString('es-ES'),
          direccion: direccionVal || ciudadVal,
          estado: estadoVal,
          municipio: municipioVal,
          ciudad: ciudadVal,
          pais: finalPaisVal,
          promo: promoVal,
          hashtags: hashtagsVal,
          internacional: internacionalVal,
          online: onlineVal,
          onlineLabel: onlineLabelVal,
          proveedor: proveedorVal
        };
      })
      .filter(ad => ad !== null) as Announcement[];

    return data.sort((a, b) => {
      const weightA = a.socio?.toLowerCase().includes('top') ? 2 : (a.socio?.toLowerCase().includes('vip') ? 1 : 0);
      const weightB = b.socio?.toLowerCase().includes('top') ? 2 : (b.socio?.toLowerCase().includes('vip') ? 1 : 0);
      return weightB - weightA;
    });
  } catch (err) {
    console.error("Error parsing CSV:", err);
    return [];
  }
}

async function safeFetchJson<T = any>(res: Response | null | undefined, fallback: any = null): Promise<T> {
  if (!res) return fallback;
  try {
    const text = await res.text();
    if (!text || text.trim().startsWith("<") || text.includes("<!DOCTYPE") || text.includes("<html")) {
      return fallback;
    }
    return JSON.parse(text) as T;
  } catch (err) {
    console.warn("safeFetchJson parsing failed:", err);
    return fallback;
  }
}

export type AppView = 'main' | 'somos_roos' | 'educacion' | 'diamonds' | 'roos_capital' | 'emprendedoras' | 'faq' | 'ugc_program' | 'publicate' | 'ambassadors';

export const VIEW_TO_PATH: Record<AppView, string> = {
  main: '/',
  somos_roos: '/somos-roos',
  publicate: '/publicate',
  ugc_program: '/ugcprogram',
  ambassadors: '/embajadoras',
  educacion: '/educacion',
  diamonds: '/diamonds',
  faq: '/faq',
  roos_capital: '/roos-capital',
  emprendedoras: '/emprendedoras'
};

export const PAGE_TITLES: Record<AppView, string> = {
  main: 'ROOS Capital | Directorio Internacional Líder del Emprendimiento Femenino',
  somos_roos: 'Somos Roos | ROOS Capital',
  publicate: 'Publícate | Directorio de Emprendimientos de Mujeres | ROOS Capital',
  ugc_program: 'UGC Program | Programa de Creadoras de Contenido UGC | ROOS Capital',
  ambassadors: 'Embajadoras | Programa de Embajadoras | ROOS Capital',
  educacion: 'Educación y Capacitación | ROOS Capital',
  diamonds: 'Socias Diamante | Beneficios Exclusivos | ROOS Capital',
  faq: 'Preguntas Frecuentes (FAQ) | ROOS Capital',
  roos_capital: 'Roos Capital | Nuestra Visión',
  emprendedoras: 'Emprendedoras | Comunidad de Mujeres'
};

export function getViewFromLocation(): AppView {
  if (typeof window === 'undefined') return 'main';

  const rawPath = window.location.pathname.toLowerCase();
  const pathname = rawPath.replace(/\/+$/, '').trim();
  const searchParams = new URLSearchParams(window.location.search);
  const sectionParam = (searchParams.get('section') || searchParams.get('view') || searchParams.get('page'))?.toLowerCase().trim();

  const candidate = pathname || (sectionParam ? `/${sectionParam}` : '');

  if (candidate === '/ugcprogram' || candidate === '/ugc-program' || candidate === '/ugc' || candidate === '/ugc_program') return 'ugc_program';
  if (candidate === '/somos-roos' || candidate === '/somosroos' || candidate === '/somos_roos') return 'somos_roos';
  if (candidate === '/publicate' || candidate === '/publicar') return 'publicate';
  if (candidate === '/embajadoras' || candidate === '/ambassadors' || candidate === '/embajadora') return 'ambassadors';
  if (candidate === '/educacion' || candidate === '/educacion-curso' || candidate === '/cursos') return 'educacion';
  if (candidate === '/diamonds' || candidate === '/socias-diamante' || candidate === '/diamantes') return 'diamonds';
  if (candidate === '/faq' || candidate === '/preguntas-frecuentes' || candidate === '/ayuda') return 'faq';
  if (candidate === '/roos-capital' || candidate === '/rooscapital' || candidate === '/roos_capital') return 'roos_capital';
  if (candidate === '/emprendedoras') return 'emprendedoras';

  return 'main';
}

export default function App() {
  const { language, setLanguage, t, translateCategory } = useLanguage();
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const cached = localStorage.getItem('roos_announcements_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Detect and purge old mock or tiny data
          if (parsed.length <= 6 || parsed.some((a: any) => a.titulo === 'Ellas Boutique' && (!a.socio && !a.pais && !a.whatsapp))) {
            localStorage.removeItem('roos_announcements_cache');
            return [];
          }
          return parsed;
        }
      }
    } catch (e) {}
    return [];
  });
  const [diamondsAnnouncements, setDiamondsAnnouncements] = useState<Announcement[]>(() => {
    try {
      const cached = localStorage.getItem('roos_fundadoras_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Detect and purge old mock data
          if (parsed.length <= 6 && parsed.some((a: any) => a.titulo === 'Ellas Boutique' && !a.id)) {
            localStorage.removeItem('roos_fundadoras_cache');
            return [];
          }
          return parsed;
        }
      }
    } catch (e) {}
    return [];
  });
  const [loading, setLoading] = useState<boolean>(() => {
    try {
      const cached = localStorage.getItem('roos_announcements_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 6) return false;
      }
    } catch (e) {}
    return true;
  });
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [diamondsSearchTerm, setDiamondsSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Todas');
  const [diamondsSelectedLocation, setDiamondsSelectedLocation] = useState('Todas');
  const [selectedState, setSelectedState] = useState('Todos');
  const [selectedMunicipio, setSelectedMunicipio] = useState('Todos');
  const [diamondsSelectedState, setDiamondsSelectedState] = useState('Todos');
  const [diamondsSelectedMunicipio, setDiamondsSelectedMunicipio] = useState('Todos');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedMunicipios, setSelectedMunicipios] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filterRemoto, setFilterRemoto] = useState<boolean>(false);
  const [filterInternacional, setFilterInternacional] = useState<boolean>(false);
  const [filterProveedor, setFilterProveedor] = useState<boolean>(false);
  const [selectedAdForModal, setSelectedAdForModal] = useState<Announcement | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isRegisterPillOpen, setIsRegisterPillOpen] = useState(false);

  useEffect(() => {
    initGlobalButtonSounds();
  }, []);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      document.body.classList.add('is-scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const [logoUrl, setLogoUrl] = useState<string>(roosCapitalLogo);
  const [spotlightImagesEs, setSpotlightImagesEs] = useState<string[]>(() => {
    try {
      const cached = localStorage.getItem('roos_spotlight_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      'https://raw.githubusercontent.com/dmgm1999-web/Roos-Capital-MX-Assets/main/RCBANNER%20(1).png',
      'https://raw.githubusercontent.com/dmgm1999-web/Roos-Capital-MX-Assets/main/RCBANNER%20(5).png',
      'https://raw.githubusercontent.com/dmgm1999-web/Roos-Capital-MX-Assets/main/RCBANNER%20(6).png',
      'https://raw.githubusercontent.com/dmgm1999-web/Roos-Capital-MX-Assets/main/RCBANNER%20(8).png'
    ];
  });
  const [spotlightImagesEn, setSpotlightImagesEn] = useState<string[]>(() => {
    try {
      const cached = localStorage.getItem('roos_spotlight_en_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      'https://raw.githubusercontent.com/dmgm1999-web/Roos-Capital-MX-Assets/main/RCBANNER%20(10).png',
      'https://raw.githubusercontent.com/dmgm1999-web/Roos-Capital-MX-Assets/main/RCBANNER%20(11).png',
      'https://raw.githubusercontent.com/dmgm1999-web/Roos-Capital-MX-Assets/main/RCBANNER%20(12).png',
      'https://raw.githubusercontent.com/dmgm1999-web/Roos-Capital-MX-Assets/main/RCBANNER%20(13).png',
      'https://raw.githubusercontent.com/dmgm1999-web/Roos-Capital-MX-Assets/main/RCBANNER%20(14).png',
      'https://raw.githubusercontent.com/dmgm1999-web/Roos-Capital-MX-Assets/main/RCBANNER%20(15).png'
    ];
  });
  const [currentView, setCurrentView] = useState<AppView>(() => getViewFromLocation());

  const navigateToView = useCallback((view: AppView, replace = false) => {
    const effectiveView = view;
    const targetPath = VIEW_TO_PATH[effectiveView] || '/';
    const currentPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
    const cleanTargetPath = targetPath.toLowerCase().replace(/\/+$/, '') || '/';

    if (currentPath !== cleanTargetPath) {
      if (replace) {
        window.history.replaceState({ view: effectiveView }, '', targetPath);
      } else {
        window.history.pushState({ view: effectiveView }, '', targetPath);
      }
    }

    if (PAGE_TITLES[effectiveView]) {
      document.title = PAGE_TITLES[effectiveView];
    }

    setCurrentView(effectiveView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to browser Back / Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const view = getViewFromLocation();
      setCurrentView(view);
      if (PAGE_TITLES[view]) {
        document.title = PAGE_TITLES[view];
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronize document title with active view
  useEffect(() => {
    if (PAGE_TITLES[currentView]) {
      document.title = PAGE_TITLES[currentView];
    }
  }, [currentView]);
  const [isLocDropdownOpen, setIsLocDropdownOpen] = useState(false);
  const [mobileFilterSection, setMobileFilterSection] = useState<'categorias' | 'modalidad' | 'paises' | 'estados' | 'municipios'>('categorias');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => loadStoredFavorites());
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState(false);
  const [noticiasList, setNoticiasList] = useState<string[]>(() => {
    try {
      const cached = localStorage.getItem('roos_noticias_cache');
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return [
      'DECISIÓN ClAVE: HASTA EL 85% DE TODAS LAS COMPRAS DE CONSUMO EN EL PLANETA SON DECIDIDAS POR MUJERES.',
      'UN Women Entrepreneurship Expo: Un ciclo integral de bootcamps, mentoría, aceleración y preparación de pitch de inversión para empresas lideradas por mujeres.',
      'MÁS QUE POTENCIAS: EL PODER DE COMPRA FEMENINO SUPERA A LAS ECONOMÍAS DE CHINA E INDIA JUNTAS.',
      'Pave Her Way Grant Program: Fondos de financiamiento de capital semilla a fondo perdido para mujeres emprendedoras.',
      'EFECTO MULTIPLICADOR: LAS MUJERES REINVIERTEN EL 90% DE SUS INGRESOS EN EDUCACIÓN, SALUD Y COMUNIDAD.',
      'Women Founders Grant: Fondo mensual de apoyo no reembolsable para negocios liderados por mujeres.'
    ];
  });
  const [favoriteToast, setFavoriteToast] = useState<{ message: string; showCode?: boolean } | null>(null);

  // Restore favorites automatically if opened with ?code= or ?key=
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlCode = params.get('code') || params.get('key');
      if (urlCode) {
        fetchFavoritesByCode(urlCode).then((favs) => {
          if (favs && favs.length > 0) {
            handleFavoritesLoaded(favs);
            setFavoriteToast({
              message: language === 'en' 
                ? `Loaded ${favs.length} favorites from your key!` 
                : `¡Se cargaron ${favs.length} favoritas desde tu clave!`,
              showCode: false
            });
            setTimeout(() => setFavoriteToast(null), 4000);
          }
        });
      }
    } catch (e) {}
  }, []);

  const handleToggleFavorite = (ad: Announcement) => {
    const key = getCardKey(ad);
    let added = false;
    setFavorites(prev => {
      const exists = prev.includes(key) || prev.includes((ad.titulo || '').trim().toLowerCase());
      added = !exists;
      const updated = exists 
        ? prev.filter(k => k !== key && k !== (ad.titulo || '').trim().toLowerCase()) 
        : [...prev, key];
      saveStoredFavorites(updated);
      return updated;
    });
    playDiamondSound(true);
    if (added) {
      setFavoriteToast({
        message: language === 'en' 
          ? `Saved to 'My Favorites': ${ad.titulo}` 
          : `Guardado en 'Mis favoritas': ${ad.titulo}`,
        showCode: true
      });
      setTimeout(() => {
        setFavoriteToast(null);
      }, 4000);
    }
  };

  const handleToggleFavoriteByKey = (key: string) => {
    setFavorites(prev => {
      const updated = prev.filter(k => k !== key && k !== key.toLowerCase());
      saveStoredFavorites(updated);
      return updated;
    });
  };

  const isFavorite = (ad: Announcement) => {
    const key = getCardKey(ad);
    return favorites.includes(key) || favorites.includes((ad.titulo || '').trim().toLowerCase());
  };

  const handleFavoritesLoaded = (newFavorites: string[], email?: string) => {
    setFavorites(prev => {
      const merged = Array.from(new Set([...prev, ...newFavorites]));
      saveStoredFavorites(merged);
      return merged;
    });
    setFilterFavoritesOnly(true);
    playDiamondSound(true);
  };

  const fetchWithRetry = async (url: string, options?: RequestInit, retries = 3, delay = 1000): Promise<Response> => {
    try {
      const response = await fetch(url, options);
      if (!response.ok && retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 1.5);
      }
      return response;
    } catch (err) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 1.5);
      }
      throw err;
    }
  };

  const fetchData = async (isInitial = false) => {
    // Only set loading to true if we don't have any cached announcements yet
    if (isInitial && announcements.length === 0) setLoading(true);

    try {
      // Execute all network calls in PARALLEL simultaneously
      const [configCsv, sheetCsv, diamondsCsv] = await Promise.all([
        fetchCsvWithFallback('/api/config', DIRECT_CONFIG_SHEET_URL),
        fetchCsvWithFallback('/api/sheet-data', DIRECT_PRIMARY_SHEET_URL),
        fetchCsvWithFallback('/api/diamonds-data', DIRECT_DIAMONDS_SHEET_URL)
      ]);

      // 1. Process Config (Spotlight & Logo)
      if (configCsv) {
        Papa.parse(configCsv, {
          complete: (results) => {
            const rows = results.data as string[][];
            let bestUrl = '';
            
            let spotlightColIndex = -1;
            let engSpotlightColIndex = -1;
            let spotlightHeaderRow = -1;
            let engSpotlightHeaderRow = -1;
            for (let r = 0; r < rows.length; r++) {
              if (!rows[r]) continue;
              for (let c = 0; c < rows[r].length; c++) {
                const cellText = String(rows[r][c]).toLowerCase().trim();
                if (cellText === 'eng spotlight' || (cellText.includes('eng') && cellText.includes('spotlight'))) {
                  engSpotlightColIndex = c;
                  engSpotlightHeaderRow = r;
                } else if (cellText === 'spotlight') {
                  spotlightColIndex = c;
                  spotlightHeaderRow = r;
                }
              }
              if (spotlightColIndex !== -1 && engSpotlightColIndex !== -1) break;
            }

            const parsedSpotlightsEs: string[] = [];
            if (spotlightColIndex !== -1) {
              for (let r = spotlightHeaderRow + 1; r < rows.length; r++) {
                if (rows[r] && rows[r][spotlightColIndex]) {
                  const val = String(rows[r][spotlightColIndex]).trim();
                  if (val && val.startsWith('http')) {
                    parsedSpotlightsEs.push(val.replace(/\+/g, '%20'));
                  }
                }
              }
            }

            const parsedSpotlightsEn: string[] = [];
            if (engSpotlightColIndex !== -1) {
              for (let r = engSpotlightHeaderRow + 1; r < rows.length; r++) {
                if (rows[r] && rows[r][engSpotlightColIndex]) {
                  const val = String(rows[r][engSpotlightColIndex]).trim();
                  if (val && val.startsWith('http')) {
                    parsedSpotlightsEn.push(val.replace(/\+/g, '%20'));
                  }
                }
              }
            }

            if (parsedSpotlightsEs.length > 0) {
              const uniqueEs = Array.from(new Set(parsedSpotlightsEs));
              setSpotlightImagesEs(uniqueEs);
              try {
                localStorage.setItem('roos_spotlight_cache', JSON.stringify(uniqueEs));
              } catch (e) {}
            }

            if (parsedSpotlightsEn.length > 0) {
              const uniqueEn = Array.from(new Set(parsedSpotlightsEn));
              setSpotlightImagesEn(uniqueEn);
              try {
                localStorage.setItem('roos_spotlight_en_cache', JSON.stringify(uniqueEn));
              } catch (e) {}
            }

            // Parse NOTICIAS column from ELEMENTOS sheet
            let noticiasColIndex = -1;
            let noticiasHeaderRow = -1;
            for (let r = 0; r < rows.length; r++) {
              if (!rows[r]) continue;
              for (let c = 0; c < rows[r].length; c++) {
                const cellText = String(rows[r][c]).toLowerCase().trim();
                if (cellText === 'noticias' || cellText.includes('noticia')) {
                  noticiasColIndex = c;
                  noticiasHeaderRow = r;
                  break;
                }
              }
              if (noticiasColIndex !== -1) break;
            }

            const parsedNoticias: string[] = [];
            if (noticiasColIndex !== -1) {
              for (let r = noticiasHeaderRow + 1; r < rows.length; r++) {
                if (rows[r] && rows[r][noticiasColIndex]) {
                  const val = String(rows[r][noticiasColIndex]).trim();
                  const cleaned = val.replace(/^["'\s]+|["'\s,*]+$/g, '').trim();
                  if (cleaned && cleaned.length > 5) {
                    parsedNoticias.push(cleaned);
                  }
                }
              }
            }

            if (parsedNoticias.length > 0) {
              setNoticiasList(parsedNoticias);
              try {
                localStorage.setItem('roos_noticias_cache', JSON.stringify(parsedNoticias));
              } catch (e) {}
            }
            
            let headerFound = false;
            for (let r = 0; r < rows.length; r++) {
              for (let c = 0; c < rows[r].length; c++) {
                const cellText = String(rows[r][c]).toLowerCase().trim();
                if (cellText === 'logo sitio' || cellText === 'logo_sitio') {
                  for (let scanR = r + 1; scanR < rows.length; scanR++) {
                    if (rows[scanR] && rows[scanR][c]) {
                      const val = String(rows[scanR][c]).trim();
                      if (val.startsWith('http')) {
                        bestUrl = val;
                        headerFound = true;
                        break;
                      }
                    }
                  }
                }
                if (headerFound) break;
              }
              if (headerFound) break;
            }

            if (!bestUrl) {
              for (const row of rows) {
                if (!row) continue;
                for (const cell of row) {
                  const val = String(cell).trim();
                  if (val.startsWith('http')) {
                    const lowerVal = val.toLowerCase();
                    if (!lowerVal.includes('banner')) {
                      if (!bestUrl || lowerVal.includes('logo') || lowerVal.includes('capital')) {
                        bestUrl = val;
                      }
                    }
                  }
                }
              }
            }

            if (bestUrl) {
              const cleanUrl = bestUrl.replace(/\+/g, '%20');
              setLogoUrl(getOptimizedImageUrl(cleanUrl));
            }
          }
        });
      }

      // 2. Process Primary Sheet (Anuncios)
      if (sheetCsv && !sheetCsv.trim().startsWith("<!DOCTYPE") && !sheetCsv.includes("<html")) {
        const parsedAnnouncements = parseCSVAnuncios(sheetCsv, false);
        if (parsedAnnouncements.length > 0) {
          setAnnouncements(parsedAnnouncements);
          setError(null);
          // Only save real live sheet data (> 6 items) to localStorage
          if (parsedAnnouncements.length > 6) {
            try {
              localStorage.setItem('roos_announcements_cache', JSON.stringify(parsedAnnouncements));
            } catch (e) {}
          }

          // Preload image assets for the first batch of cards for immediate rendering
          parsedAnnouncements.slice(0, 15).forEach(ad => {
            if (ad.imagen) {
              const url = getOptimizedImageUrl(ad.imagen);
              const img = new Image();
              img.src = url;
            }
          });
        } else if (announcements.length === 0) {
          setError('La base de datos parece estar vacía.');
        }
      } else if (announcements.length === 0) {
        setError('No se pudo conectar con la base de datos de anuncios.');
      }

      // 3. Process Diamonds Sheet
      if (diamondsCsv && !diamondsCsv.trim().startsWith("<!DOCTYPE") && !diamondsCsv.includes("<html")) {
        const parsedDiamonds = parseCSVAnuncios(diamondsCsv, true);
        if (parsedDiamonds.length > 0) {
          setDiamondsAnnouncements(parsedDiamonds);
          if (parsedDiamonds.length > 6) {
            try {
              localStorage.setItem('roos_fundadoras_cache', JSON.stringify(parsedDiamonds));
            } catch (e) {}
          }
        }
      }

      setLoading(false);
      setLastUpdate(new Date());
    } catch (err: any) {
      console.error(err);
      if (announcements.length === 0) {
        setError(err.message || 'Error al conectar con la base de datos.');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true);
    // Refresh every 30 seconds for faster, automatic updates
    const interval = setInterval(() => {
      fetchData(false);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const isDiamondsView = false;
  const activeAnnouncements = announcements;
  const activeSearchTerm = searchTerm;
  const activeSelectedLocation = selectedLocation;

  const setActiveSearchTerm = (val: string) => {
    if (isDiamondsView) {
      setDiamondsSearchTerm(val);
    } else {
      setSearchTerm(val);
    }
  };

  const setActiveSelectedLocation = (val: string) => {
    if (isDiamondsView) {
      setDiamondsSelectedLocation(val);
      setDiamondsSelectedState('Todos');
      setDiamondsSelectedMunicipio('Todos');
    } else {
      setSelectedLocation(val);
      setSelectedState('Todos');
      setSelectedMunicipio('Todos');
    }
  };

  const categories = React.useMemo(() => {
    const cats = activeAnnouncements
      .map(a => a.categoria)
      .filter(c => c && c.trim() !== '');
    return ['Todas', ...Array.from(new Set(cats))];
  }, [activeAnnouncements]);

  // --- TYPEWRITER PLACEHOLDER ANIMATION ---
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingText, setTypingText] = useState('');

  const registeredCategories = React.useMemo(() => {
    const catsOnly = categories.filter(c => c !== 'Todas');
    return catsOnly.length > 0 
      ? catsOnly 
      : ['Música', 'Alimentos', 'Decoración', 'Espacios', 'Fotografía', 'Maquillaje'];
  }, [categories]);

  useEffect(() => {
    if (registeredCategories.length === 0) return;
    
    let timer: NodeJS.Timeout;
    const currentWord = registeredCategories[currentCategoryIndex % registeredCategories.length];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypingText(prev => prev.slice(0, -1));
      }, 50); // fast erase
    } else {
      timer = setTimeout(() => {
        setTypingText(currentWord.slice(0, typingText.length + 1));
      }, 90); // typing speed
    }

    if (!isDeleting && typingText === currentWord) {
      // Done writing! Wait 3.3 seconds before starting deletion
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 3300);
    } else if (isDeleting && typingText === '') {
      // Finished deleting! Move to next word immediately
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentCategoryIndex(prev => prev + 1);
      }, 150);
    }

    return () => clearTimeout(timer);
  }, [typingText, isDeleting, currentCategoryIndex, registeredCategories]);

  const animatedPlaceholder = `Busca ${typingText}...`;

  // Parse active announcements through location helper or direct Google Sheet fields
  const parsedLocations = React.useMemo(() => {
    return activeAnnouncements.map(a => {
      let state = a.estado ? a.estado.trim() : '';
      let municipality = a.municipio ? a.municipio.trim() : '';
      let country = a.pais ? a.pais.trim() : '';
      
      // Fallback to parsing address string if NOT explicitly provided in the Google Sheet columns
      if (!state || !municipality) {
        const parsed = getMexicoStateAndMunicipio(a.direccion || '');
        if (!state) state = parsed.state;
        if (!municipality) municipality = parsed.municipality;
      }

      if (!country || country === 'Todos' || country === '-') {
        if (state && state !== 'Otro' && state !== 'Internacional' && state !== 'Remoto') {
          country = 'México';
        } else if (a.internacional) {
          country = 'Internacional';
        } else {
          country = 'México';
        }
      }

      return {
        ...a,
        extractedCountry: country,
        extractedState: state,
        extractedMunicipio: municipality
      };
    });
  }, [activeAnnouncements]);

  // Dynamically assemble available countries, states and municipalities
  const availableCountries = React.useMemo(() => {
    const set = new Set<string>();
    parsedLocations.forEach(a => {
      if (a.extractedCountry && a.extractedCountry !== 'Internacional' && a.extractedCountry !== 'Remoto' && a.extractedCountry !== 'Todos') {
        set.add(a.extractedCountry);
      }
    });
    if (set.size === 0) set.add('México');
    return Array.from(set).sort();
  }, [parsedLocations]);

  const availableStates = React.useMemo(() => {
    const set = new Set<string>();
    const activeCountry = selectedCountries[0];
    if (!activeCountry) return [];
    parsedLocations.forEach(a => {
      if (a.extractedCountry !== activeCountry) return;
      if (a.extractedState && a.extractedState !== 'Todos' && a.extractedState !== 'Remoto' && a.extractedState !== 'Internacional' && a.extractedState !== 'Otro') {
        set.add(a.extractedState);
      }
    });
    return Array.from(set).sort();
  }, [parsedLocations, selectedCountries]);

  const availableMunicipios = React.useMemo(() => {
    const set = new Set<string>();
    const activeCountry = selectedCountries[0];
    if (!activeCountry) return [];
    if (selectedStates.length === 0) return [];
    parsedLocations.forEach(a => {
      if (a.extractedCountry !== activeCountry) return;
      if (!selectedStates.includes(a.extractedState)) {
        return;
      }
      if (a.extractedMunicipio && a.extractedMunicipio !== 'Todos' && a.extractedMunicipio !== 'Centro/General') {
        set.add(a.extractedMunicipio);
      }
    });
    return Array.from(set).sort();
  }, [parsedLocations, selectedCountries, selectedStates]);

  const handleCountrySelection = useCallback((countries: string[]) => {
    const nextCountry = countries.length > 0 ? [countries[countries.length - 1]] : [];
    setSelectedCountries(nextCountry);
    setSelectedStates([]);
    setSelectedMunicipios([]);
    setSelectedState('Todos');
    setSelectedMunicipio('Todos');
  }, []);

  const handleStateSelection = useCallback((states: string[]) => {
    const nextState = states.length > 0 ? [states[states.length - 1]] : [];
    setSelectedStates(nextState);
    setSelectedMunicipios([]);
    setSelectedState(nextState[0] || 'Todos');
    setSelectedMunicipio('Todos');
  }, []);

  const countRemoto = React.useMemo(() => 
    parsedLocations.filter(a => Boolean(a.online || a.extractedState === 'Remoto')).length,
    [parsedLocations]
  );
  const countInternacional = React.useMemo(() => 
    parsedLocations.filter(a => Boolean(a.internacional || a.extractedState === 'Internacional' || a.pais === 'Internacional' || (a.extractedCountry && a.extractedCountry !== 'México'))).length,
    [parsedLocations]
  );
  const countProveedor = React.useMemo(() => 
    parsedLocations.filter(a => Boolean(a.proveedor)).length,
    [parsedLocations]
  );

  const availableCategories = React.useMemo(() => {
    const set = new Set<string>();
    activeAnnouncements.forEach(a => {
      const cat = (a.categoria || '').trim();
      if (cat) {
        set.add(cat);
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
  }, [activeAnnouncements]);

  const getCategoryCount = useCallback((cat: string) => {
    return parsedLocations.filter(a => a.categoria?.toLowerCase() === cat.toLowerCase()).length;
  }, [parsedLocations]);

  const activeLocationFilterCount = 
    selectedCategories.length +
    selectedCountries.length + 
    selectedStates.length + 
    selectedMunicipios.length + 
    (filterRemoto ? 1 : 0) + 
    (filterInternacional ? 1 : 0) + 
    (filterProveedor ? 1 : 0);

  const clearAllLocationFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedCountries([]);
    setSelectedStates([]);
    setSelectedMunicipios([]);
    setFilterRemoto(false);
    setFilterInternacional(false);
    setFilterProveedor(false);
    setSelectedState('Todos');
    setSelectedMunicipio('Todos');
    setMobilePage(1);
    setDesktopPage(1);
  }, []);

  const getCountryCount = useCallback((c: string) => {
    return parsedLocations.filter(a => a.extractedCountry === c).length;
  }, [parsedLocations]);

  const getStateCount = useCallback((s: string) => {
    return parsedLocations.filter(a => a.extractedState === s).length;
  }, [parsedLocations]);

  const getMunicipioCount = useCallback((m: string) => {
    return parsedLocations.filter(a => a.extractedMunicipio === m).length;
  }, [parsedLocations]);

  // Dynamically assemble registered states
  const registeredStates = React.useMemo(() => {
    const states = parsedLocations
      .map(x => x.extractedState)
      .filter(s => s && s.trim() !== '' && s !== 'Otro' && s !== 'Internacional' && s !== 'Remoto');
    const unique = Array.from(new Set(states)).sort();
    
    // Check if any company is flagged as online / remote or internacional
    const hasRemoto = parsedLocations.some(x => Boolean(x.online || x.extractedState === 'Remoto'));
    const hasInternacional = parsedLocations.some(x => Boolean(x.internacional || x.extractedState === 'Internacional' || x.pais === 'Internacional'));
    const hasOtro = parsedLocations.some(x => x.extractedState === 'Otro');

    const list: string[] = ['Todos'];
    if (hasRemoto) list.push('Remoto');
    if (hasInternacional) list.push('Internacional');
    list.push(...unique);
    if (hasOtro) list.push('Otro');
    return list;
  }, [parsedLocations]);

  const activeSelectedState = isDiamondsView ? diamondsSelectedState : selectedState;

  // Dynamically assemble registered municipalities within selected state
  const registeredMunicipios = React.useMemo(() => {
    if (activeSelectedState === 'Remoto') {
      return ['Todos'];
    }
    if (activeSelectedState === 'Internacional') {
      const intlLocs = parsedLocations
        .filter(x => Boolean(x.internacional || x.extractedState === 'Internacional'))
        .map(x => (x.pais && x.pais !== 'México' && x.pais !== 'Global' ? x.pais : x.extractedMunicipio))
        .filter(m => m && m.trim() !== '' && m !== 'Centro/General' && m !== 'Todos');
      const unique = Array.from(new Set(intlLocs)).sort();
      return ['Todos', ...unique];
    }

    let items = parsedLocations;
    if (activeSelectedState !== 'Todos') {
      items = items.filter(x => x.extractedState === activeSelectedState);
    }
    const muns = items
      .map(x => x.extractedMunicipio)
      .filter(m => m && m.trim() !== '' && m !== 'Centro/General');
    const unique = Array.from(new Set(muns)).sort();
    return ['Todos', ...unique];
  }, [parsedLocations, activeSelectedState]);

  const activeSelectedMunicipio = isDiamondsView ? diamondsSelectedMunicipio : selectedMunicipio;

  const isMexicanState = Boolean(
    activeSelectedState && 
    activeSelectedState !== 'Todos' && 
    activeSelectedState !== 'Remoto' && 
    activeSelectedState !== 'Internacional' && 
    activeSelectedState !== 'Otro'
  );

  // Final filtered list utilizing both search text and checkbox filters
  const filteredAnnouncements = React.useMemo(() => {
    const rawFiltered = parsedLocations.filter(a => {
      const searchLower = activeSearchTerm.toLowerCase().trim();
      const isBrandSearch = [
        'rooscapital', 
        'roos capital', 
        'roos', 
        'capital', 
        'rooscapital.com',
        'rooscapital mx',
        'roos capital mx'
      ].includes(searchLower);

      const matchesSearch = 
        !activeSearchTerm ||
        isBrandSearch ||
        a.titulo.toLowerCase().includes(searchLower) || 
        a.descripcion.toLowerCase().includes(searchLower) ||
        (a.keywords && a.keywords.toLowerCase().includes(searchLower)) ||
        (a.hashtags && a.hashtags.toLowerCase().includes(searchLower)) ||
        a.categoria.toLowerCase().includes(searchLower) ||
        (a.direccion && a.direccion.toLowerCase().includes(searchLower)) ||
        (Boolean(a.proveedor) && (searchLower.includes('proveedor') || 'proveedor'.includes(searchLower) || 'proveedores'.includes(searchLower))) ||
        (Boolean(a.online) && 'remoto'.includes(searchLower)) ||
        (Boolean(a.online) && 'online'.includes(searchLower)) ||
        (a.onlineLabel && a.onlineLabel.toLowerCase().includes(searchLower)) ||
        (Boolean(a.internacional) && 'internacional'.includes(searchLower));

      if (!matchesSearch) return false;

      // Filter for favorites if active
      if (filterFavoritesOnly) {
        const key = getCardKey(a);
        const isFav = favorites.includes(key) || favorites.includes(a.titulo.trim().toLowerCase());
        if (!isFav) return false;
      }

      // If no checkbox location filters selected, match all
      if (activeLocationFilterCount === 0) {
        return true;
      }

      // Checkbox for Categoría
      if (selectedCategories.length > 0) {
        const adCat = (a.categoria || '').trim().toLowerCase();
        const adSub = (a.subcategoria || '').trim().toLowerCase();
        const matchesCategory = selectedCategories.some(c => {
          const cleanC = c.trim().toLowerCase();
          return cleanC === adCat || 
                 adCat.includes(cleanC) || 
                 cleanC.includes(adCat) ||
                 (adSub && (adSub.includes(cleanC) || cleanC.includes(adSub)));
        });
        if (!matchesCategory) return false;
      }

      // Checkbox for Proveedor
      if (filterProveedor && !a.proveedor) {
        return false;
      }

      // Checkbox for Geographic / Mode options
      const hasModalities = filterRemoto || filterInternacional;
      const hasGeographic = selectedCountries.length > 0 || selectedStates.length > 0 || selectedMunicipios.length > 0;

      if (!hasModalities && !hasGeographic) {
        return true;
      }

      const isRemotoAd = Boolean(a.online || a.extractedState === 'Remoto');
      const isInternacionalAd = Boolean(
        a.internacional || 
        a.extractedState === 'Internacional' || 
        a.pais === 'Internacional' || 
        (a.extractedCountry && a.extractedCountry !== 'México')
      );

      const matchesModalidad = 
        (filterRemoto && isRemotoAd) ||
        (filterInternacional && isInternacionalAd);

      const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(a.extractedCountry);
      const matchesState = selectedStates.length === 0 || selectedStates.includes(a.extractedState);
      const matchesMunicipio = selectedMunicipios.length === 0 || selectedMunicipios.includes(a.extractedMunicipio);

      const matchesGeographic = hasGeographic && matchesCountry && matchesState && matchesMunicipio;

      if (hasModalities && hasGeographic) {
        if (!(matchesModalidad || matchesGeographic)) {
          return false;
        }
      } else if (hasModalities) {
        if (!matchesModalidad) {
          return false;
        }
      } else if (hasGeographic) {
        if (!matchesGeographic) {
          return false;
        }
      }

      return true;
    });

    // Interleave countries so announcements don't appear in bulk blocks as in Google Sheets
    return interleaveAnnouncementsByCountry(rawFiltered);
  }, [
    parsedLocations, 
    activeSearchTerm, 
    activeLocationFilterCount, 
    filterProveedor, 
    filterRemoto, 
    filterInternacional, 
    selectedCountries, 
    selectedStates, 
    selectedMunicipios,
    selectedCategories,
    favorites,
    filterFavoritesOnly
  ]);

  const [mobilePage, setMobilePage] = useState(1);
  const [desktopPage, setDesktopPage] = useState(1);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Reset pagination to page 1 whenever ANY filter (categories, text, modalities, locations) changes
  useEffect(() => {
    setMobilePage(1);
    setDesktopPage(1);
  }, [
    activeSearchTerm, 
    selectedCategories,
    selectedCountries, 
    selectedStates, 
    selectedMunicipios, 
    filterRemoto, 
    filterInternacional, 
    filterProveedor, 
    currentView
  ]);

  useEffect(() => {
    // Dynamic rose gold backdrop pattern on the body itself to avoid blank/white spaces anywhere
    document.body.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url(${roseGoldPattern})`;
    document.body.style.backgroundRepeat = 'repeat';
    document.body.style.backgroundSize = '1100px 800px';
    document.body.style.backgroundColor = '#FFFFFF';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, [roseGoldPattern]);

  const totalPagesMobile = Math.ceil(filteredAnnouncements.length / 17);
  const totalPagesDesktop = Math.ceil(filteredAnnouncements.length / 28);
  const totalPages = isMobile ? totalPagesMobile : totalPagesDesktop;

  // Auto-clamp mobilePage and desktopPage if results shrink below current page
  useEffect(() => {
    if (totalPagesMobile > 0 && mobilePage > totalPagesMobile) {
      setMobilePage(1);
    }
  }, [mobilePage, totalPagesMobile]);

  useEffect(() => {
    if (totalPagesDesktop > 0 && desktopPage > totalPagesDesktop) {
      setDesktopPage(1);
    }
  }, [desktopPage, totalPagesDesktop]);

  const displayedAnnouncements = React.useMemo(() => {
    if (isMobile) {
      const validMobilePage = totalPagesMobile > 0 ? Math.min(Math.max(1, mobilePage), totalPagesMobile) : 1;
      const startIndex = (validMobilePage - 1) * 17;
      return filteredAnnouncements.slice(startIndex, startIndex + 17);
    } else {
      const validDesktopPage = totalPagesDesktop > 0 ? Math.min(Math.max(1, desktopPage), totalPagesDesktop) : 1;
      const startIndex = (validDesktopPage - 1) * 28;
      return filteredAnnouncements.slice(startIndex, startIndex + 28);
    }
  }, [filteredAnnouncements, isMobile, mobilePage, desktopPage, totalPagesMobile, totalPagesDesktop]);

  const [columnCount, setColumnCount] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      return 2;
    }
    return 2;
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) setColumnCount(4);
      else if (w >= 768) setColumnCount(3);
      else setColumnCount(2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const masonryColumns = React.useMemo(() => {
    if (isDiamondsView) return [];
    const count = columnCount;
    const cols: Announcement[][] = Array.from({ length: count }, () => []);
    const heights: number[] = Array(count).fill(0);

    displayedAnnouncements.forEach((ad) => {
      // Find the column with minimum cumulative estimated height
      let minColIndex = 0;
      for (let i = 1; i < count; i++) {
        if (heights[i] < heights[minColIndex]) {
          minColIndex = i;
        }
      }
      cols[minColIndex].push(ad);

      // Estimate card height: cards with image are ~420px, without image are ~185px
      const hasImg = Boolean(ad.imagen && ad.imagen.trim());
      heights[minColIndex] += hasImg ? 420 : 185;
    });

    return cols;
  }, [displayedAnnouncements, columnCount, isDiamondsView]);

  const getPageNumbers = React.useMemo(() => {
    const pages = [];
    if (totalPagesDesktop <= 7) {
      for (let i = 1; i <= totalPagesDesktop; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      const start = Math.max(2, desktopPage - 1);
      const end = Math.min(totalPagesDesktop - 1, desktopPage + 1);
      
      if (start > 2) {
        pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPagesDesktop - 1) {
        pages.push('...');
      }
      
      pages.push(totalPagesDesktop);
    }
    return pages;
  }, [totalPagesDesktop, desktopPage]);

  const topAnnouncements = React.useMemo(() => {
    return activeAnnouncements
      .filter(a => a.socio?.toLowerCase().includes('top') || a.socio?.toLowerCase().includes('vip'))
      .slice(0, 5);
  }, [activeAnnouncements]);

  const renderStyledTitleWithAmpersand = (text: string) => {
    if (text.includes('&')) {
      const parts = text.split('&');
      return (
        <>
          {parts[0]}
          <span className="font-serif italic font-normal text-[#E85B81] mx-1 sm:mx-1.5 select-none">&</span>
          {parts[1]}
        </>
      );
    }
    if (/\s+y\s+/i.test(text)) {
      const parts = text.split(/\s+y\s+/i);
      return (
        <>
          {parts[0]}
          <span className="font-serif italic font-normal text-[#E85B81] mx-1 sm:mx-1.5 select-none">&</span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  const activeSpotlightImages = language === 'en' && spotlightImagesEn.length > 0
    ? spotlightImagesEn
    : spotlightImagesEs;

  return (
    <div 
      className="min-h-screen bg-[#FAF8F5] text-[#18181B] selection:bg-[#E85B81] selection:text-white font-sans pb-0 relative"
    >
      {/* Pink Aura Light at Cursor Tip */}
      <CursorAura />
      {/* Top Navigation & Hero Section matching the new aesthetic */}
      <HeroSection
        spotlightImages={activeSpotlightImages}
        isRegisterOpen={isRegisterPillOpen}
        onRegisterOpenChange={setIsRegisterPillOpen}
        onExploreMarketplace={() => {
          const el = document.getElementById('marketplace-directory');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigateToView={(view) => navigateToView(view)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenFavorites={() => setIsFavoritesModalOpen(true)}
        favoritesCount={favorites.length}
        onOpenSearch={() => {
          const input = (document.getElementById('desktop-search-input') || document.getElementById('mobile-search-input')) as HTMLInputElement;
          if (input) input.focus();
        }}
        currentView={currentView}
      />

      {/* Subtle Top Marquee Strip */}
      <div className="relative z-30">
        {(currentView === 'main' || currentView === 'diamonds') && (
          <TopCarousel ads={activeAnnouncements.filter(a => a.socio?.toLowerCase().includes('top'))} />
        )}
      </div>





        {/* Somos Roos View */}
        {currentView === 'somos_roos' && (
          <SomosRoos 
            onBack={() => navigateToView('main')}
            onNavigateToPublicate={() => {
              navigateToView('publicate');
            }}
            onSelectRole={(role) => {
              if (role === 'emprendedora') {
                navigateToView('publicate');
              } else if (role === 'votante') {
                navigateToView('main');
              } else if (role === 'socia_diamante') {
                navigateToView('diamonds');
              } else {
                navigateToView('main');
              }
            }}
          />
        )}

        {/* Educación View */}
        {currentView === 'educacion' && (
          <EducacionCurso 
            onBack={() => navigateToView('main')}
          />
        )}

        {/* Roos Capital View */}
        {currentView === 'roos_capital' && (
          <RoosCapitalQuotes 
            onBack={() => navigateToView('main')}
          />
        )}

        {/* Emprendedoras View */}
        {currentView === 'emprendedoras' && (
          <Emprendedoras 
            onBack={() => navigateToView('main')}
            onNavigateToView={(view) => {
              navigateToView(view);
            }}
          />
        )}

        {/* FAQ View */}
        {currentView === 'faq' && (
          <FAQ 
            onBack={() => navigateToView('main')}
          />
        )}

        {/* UGC Program View */}
        {currentView === 'ugc_program' && (
          <UgcProgram 
            onBack={() => navigateToView('main')}
          />
        )}

        {/* Publicate View */}
        {currentView === 'publicate' && (
          <Publicate 
            onBack={() => navigateToView('main')}
            onOpenForm={() => {
              window.open('https://forms.gle/izRobrUsjQrWJFAP9', '_blank');
            }}
          />
        )}

        {/* Ambassadors View */}
        {currentView === 'ambassadors' && (
          <Ambassadors 
            onBack={() => navigateToView('main')}
            onOpenForm={() => {
              window.open('https://forms.gle/G3sfbu56EtpxZUvn9', '_blank');
            }}
          />
        )}



      {/* Main View */}
      {(currentView === 'main' || currentView === 'diamonds') && (
        <div className="max-w-[100rem] 2xl:max-w-[115rem] 3xl:max-w-[135rem] w-full mx-auto px-4 pt-0" id="main-view-wrapped-container">
          <header className="flex flex-col items-center mb-0 relative w-full" id="main-view-header">
            
            {/* DESKTOP DIRECTORY HEADER */}
            <div className="hidden md:block w-full mt-4" id="desktop-header-wrapper">
              <div className="text-center w-full py-8 px-4 flex flex-col justify-center items-center" id="marketplace-directory">
                <span className="text-[#E85B81] font-bold text-xs uppercase tracking-[0.2em] font-sans">
                  {t('directory.kicker')}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18181B] mt-1.5 mb-2.5 tracking-tight">
                  {renderStyledTitleWithAmpersand(t('directory.title'))}
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto font-sans">
                  {t('directory.subtitle')}
                </p>
              </div>

              {/* Filter Bar Styling */}
              <div className="w-full mt-2 flex flex-col items-center gap-6" id="desktop-filter-bar">
                <div className="w-full flex flex-row items-center gap-3 h-14 max-w-3xl mx-auto">
                  {/* Search Bar */}
                  <div className="relative flex-1 h-full flex items-center" id="desktop-search-container">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input 
                      type="text" 
                      placeholder={language === 'en' ? 'Search brands, products, services...' : animatedPlaceholder}
                      value={activeSearchTerm}
                      onChange={(e) => setActiveSearchTerm(e.target.value)}
                      className="w-full h-full bg-white border border-[#EFE8DF] hover:border-[#E85B81] rounded-full pl-16 pr-8 text-sm font-medium text-neutral-800 focus:outline-none focus:border-[#E85B81] focus:ring-4 focus:ring-[#E85B81]/10 transition-all shadow-sm placeholder:text-neutral-400"
                      id="desktop-search-input"
                    />
                  </div>

                  {/* Unified Filter Button */}
                  <div className="relative h-full flex items-center z-30 shrink-0" id="desktop-filter-container">
                    <button
                      onClick={() => {
                        setIsLocDropdownOpen(!isLocDropdownOpen);
                      }}
                      className={`group relative h-14 w-14 rounded-full flex items-center justify-center focus:outline-none hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm border cursor-pointer ${
                        activeLocationFilterCount > 0 
                          ? 'border-[#E85B81] bg-[#FCE8EF] text-[#E85B81]' 
                          : 'bg-white border-[#E85B81]/40 hover:border-[#E85B81] text-[#E85B81] hover:bg-[#FCE8EF]/30'
                      }`}
                      id="desktop-location-toggle-btn"
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
                      {isLocDropdownOpen && !isMobile && (
                        <>
                          {/* Clear click-away detector */}
                          <div 
                            className="fixed inset-0 z-10 bg-transparent" 
                            onClick={() => setIsLocDropdownOpen(false)} 
                            id="desktop-location-overlay"
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full right-0 mt-2 bg-white border-2 border-brand-wine/10 rounded-2xl shadow-2xl z-20 overflow-hidden w-80 sm:w-96"
                            id="desktop-location-dropdown"
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
                              onChangeCountries={handleCountrySelection}
                              selectedStates={selectedStates}
                              onChangeStates={handleStateSelection}
                              selectedMunicipios={selectedMunicipios}
                              onChangeMunicipios={setSelectedMunicipios}
                              filterRemoto={filterRemoto}
                              onChangeRemoto={setFilterRemoto}
                              filterInternacional={filterInternacional}
                              onChangeInternacional={setFilterInternacional}
                              filterProveedor={filterProveedor}
                              onChangeProveedor={setFilterProveedor}
                              onClearAll={clearAllLocationFilters}
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

                {/* Horizontal Category Emoji Bar right below search bar matching reference image */}
                <div className="w-full max-w-4xl mx-auto px-1 -mt-3 mb-1" id="desktop-category-emoji-bar-container">
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
                      setDesktopPage(1);
                      setMobilePage(1);
                    }}
                    translateCategory={translateCategory}
                    language={language}
                  />
                </div>

                {/* Active Filter Chips on Desktop */}
                {activeLocationFilterCount > 0 && (
                  <div className="w-full flex items-center gap-1.5 flex-wrap px-2" id="desktop-active-filter-chips">
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
                          className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors"
                          title={language === 'en' ? `Remove ${translateCategory(cat)}` : `Quitar ${cat}`}
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
                          className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors"
                          title={language === 'en' ? 'Remove supplier filter' : 'Quitar filtro de proveedor'}
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
                          className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors"
                          title={language === 'en' ? 'Remove remote filter' : 'Quitar filtro remoto'}
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
                          className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors"
                          title={language === 'en' ? 'Remove international filter' : 'Quitar filtro internacional'}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedCountries.map(c => (
                      <span key={c} className="inline-flex items-center gap-1.5 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs">
                        <CountryFlag countryCode={getCountryInfo(c).code} className="w-4 h-3 shrink-0" title={c} />
                        <span>{c}</span>
                        <button 
                          onClick={() => handleCountrySelection([])} 
                          className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors"
                          title={language === 'en' ? `Remove ${c}` : `Quitar ${c}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {selectedStates.map(s => (
                      <span key={s} className="inline-flex items-center gap-1.5 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs">
                        <Building2 className="w-3 h-3 text-[#E85B81]" />
                        <span>{s}</span>
                        <button 
                          onClick={() => {
                            setSelectedStates(prev => prev.filter(x => x !== s));
                            setSelectedMunicipios([]);
                          }} 
                          className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors"
                          title={language === 'en' ? `Remove ${s}` : `Quitar ${s}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {selectedMunicipios.map(m => (
                      <span key={m} className="inline-flex items-center gap-1.5 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs">
                        <Landmark className="w-3 h-3 text-[#E85B81]" />
                        <span>{m}</span>
                        <button 
                          onClick={() => setSelectedMunicipios(prev => prev.filter(x => x !== m))} 
                          className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors"
                          title={language === 'en' ? `Remove ${m}` : `Quitar ${m}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={clearAllLocationFilters}
                      className="text-xs font-extrabold text-[#E85B81] hover:text-[#DE4B73] underline ml-1 cursor-pointer transition-colors"
                    >
                      {language === 'en' ? 'Clear all' : 'Limpiar todos'}
                    </button>
                  </div>
                )}

                {/* Noticias Linear Banner Line below search bar (from ELEMENTOS -> NOTICIAS) */}
                <div className="w-full mt-3 mb-1" id="desktop-noticias-ticker-container">
                  <NoticiasTicker noticias={noticiasList} />
                </div>
              </div>
            </div>

            {/* MOBILE DIRECTORY HEADER & CONTROLS */}
            <div className="block md:hidden w-full px-2 pt-3 pb-3" id="mobile-header-wrapper">
              <div className="text-center w-full pb-3" id="mobile-marketplace-directory">
                <span className="text-[#E85B81] font-bold text-[10px] uppercase tracking-[0.2em] font-sans">
                  {t('directory.kicker')}
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#18181B] mt-0.5 mb-1 tracking-tight">
                  {renderStyledTitleWithAmpersand(t('directory.mobileTitle'))}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto font-sans mt-0.5">
                  {t('directory.subtitle')}
                </p>
              </div>

              {/* Search Bar + Single Filter Button below on Mobile */}
              <div className="w-full flex flex-row items-center gap-2 h-11" id="mobile-search-filter-row">
                {/* Search Bar */}
                <div className="relative flex-1 h-full flex items-center" id="mobile-search-container">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input 
                    type="text" 
                    placeholder={language === 'en' ? 'Search brands, categories...' : animatedPlaceholder}
                    value={activeSearchTerm}
                    onChange={(e) => setActiveSearchTerm(e.target.value)}
                    className="w-full h-full bg-white border border-[#EFE8DF] hover:border-[#E85B81] rounded-full pl-11 pr-4 text-xs font-medium text-neutral-800 focus:outline-none focus:border-[#E85B81] focus:ring-4 focus:ring-[#E85B81]/10 transition-all shadow-sm placeholder:text-neutral-400"
                    id="mobile-search-input"
                  />
                </div>

                {/* Single Filter Button on Mobile (MapPin icon) */}
                <div className="relative h-full w-11 flex items-center z-40 shrink-0" id="mobile-filter-btn-container">
                  <button
                    onClick={() => {
                      setMobileFilterSection('categorias');
                      setIsLocDropdownOpen(true);
                    }}
                    className={`group relative w-full h-full rounded-full flex items-center justify-center focus:outline-none transition-all shadow-sm border ${
                      activeLocationFilterCount > 0 
                        ? 'border-[#E85B81] bg-[#FCE8EF] text-[#E85B81]' 
                        : 'bg-white border-[#E85B81]/40 hover:border-[#E85B81] text-[#E85B81] hover:bg-[#FCE8EF]/30'
                    }`}
                    title={language === 'en' ? 'Filters' : 'Filtros'}
                    aria-label={language === 'en' ? 'Filters' : 'Filtros'}
                    id="mobile-filter-toggle-btn"
                  >
                    <MapPin className="w-4 h-4 text-[#E85B81]" />
                    {activeLocationFilterCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E85B81] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                        {activeLocationFilterCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Horizontal Category Emoji Bar right below search bar on mobile matching reference image */}
              <div className="w-full mt-2" id="mobile-category-emoji-bar-container">
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
                    setDesktopPage(1);
                    setMobilePage(1);
                  }}
                  translateCategory={translateCategory}
                  language={language}
                />
              </div>

              {/* Mobile Location Modal / Bottom Sheet */}
              <AnimatePresence>
                {isLocDropdownOpen && isMobile && (
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
                        defaultSection={mobileFilterSection}
                        availableCategories={availableCategories}
                        selectedCategories={selectedCategories}
                        onChangeCategories={setSelectedCategories}
                        getCategoryCount={getCategoryCount}
                        availableCountries={availableCountries}
                        availableStates={availableStates}
                        availableMunicipios={availableMunicipios}
                        selectedCountries={selectedCountries}
                        onChangeCountries={handleCountrySelection}
                        selectedStates={selectedStates}
                        onChangeStates={handleStateSelection}
                        selectedMunicipios={selectedMunicipios}
                        onChangeMunicipios={setSelectedMunicipios}
                        filterRemoto={filterRemoto}
                        onChangeRemoto={setFilterRemoto}
                        filterInternacional={filterInternacional}
                        onChangeInternacional={setFilterInternacional}
                        filterProveedor={filterProveedor}
                        onChangeProveedor={setFilterProveedor}
                        onClearAll={clearAllLocationFilters}
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

              {/* Active Location Filter Chips on Mobile */}
              {activeLocationFilterCount > 0 && (
                <div className="w-full flex items-center gap-1.5 flex-wrap px-1 pt-1.5 pb-0.5" id="mobile-active-filter-chips">
                  <span className="text-[9.5px] uppercase font-bold text-[#E85B81] tracking-wider flex items-center gap-1 mr-0.5">
                    <Filter className="w-2.5 h-2.5 text-[#E85B81]" />
                    {language === 'en' ? 'Filters:' : 'Filtros:'}
                  </span>
                  {selectedCategories.map(cat => (
                    <span key={cat} className="inline-flex items-center gap-1 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2 py-0.5 rounded-full text-[10.5px] font-bold shadow-2xs">
                      <ShoppingBag className="w-2.5 h-2.5 text-[#E85B81]" />
                      <span>{translateCategory(cat)}</span>
                      <button 
                        onClick={() => setSelectedCategories(prev => prev.filter(c => c !== cat))} 
                        className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors"
                        title={language === 'en' ? `Remove ${translateCategory(cat)}` : `Quitar ${cat}`}
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                  {filterProveedor && (
                    <span className="inline-flex items-center gap-1 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2 py-0.5 rounded-full text-[10.5px] font-bold shadow-2xs">
                      <Package className="w-2.5 h-2.5 text-[#E85B81]" />
                      <span>{language === 'en' ? 'Supplier' : 'Proveedor'}</span>
                      <button 
                        onClick={() => setFilterProveedor(false)} 
                        className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors"
                        title={language === 'en' ? 'Remove supplier filter' : 'Quitar proveedor'}
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  )}
                  {filterRemoto && (
                    <span className="inline-flex items-center gap-1 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2 py-0.5 rounded-full text-[10.5px] font-bold shadow-2xs">
                      <Laptop className="w-2.5 h-2.5 text-[#E85B81]" />
                      <span>{language === 'en' ? 'Remote' : 'Remoto'}</span>
                      <button 
                        onClick={() => setFilterRemoto(false)} 
                        className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors"
                        title={language === 'en' ? 'Remove remote filter' : 'Quitar remoto'}
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  )}
                  {filterInternacional && (
                    <span className="inline-flex items-center gap-1 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2 py-0.5 rounded-full text-[10.5px] font-bold shadow-2xs">
                      <Globe className="w-2.5 h-2.5 text-[#E85B81]" />
                      <span>{language === 'en' ? 'International' : 'Internacional'}</span>
                      <button 
                        onClick={() => setFilterInternacional(false)} 
                        className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors"
                        title={language === 'en' ? 'Remove international filter' : 'Quitar internacional'}
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  )}
                  {selectedCountries.map(c => (
                    <span key={c} className="inline-flex items-center gap-1 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2 py-0.5 rounded-full text-[10.5px] font-bold shadow-2xs">
                      <CountryFlag countryCode={getCountryInfo(c).code} className="w-3.5 h-2.5 shrink-0" title={c} />
                      <span>{c}</span>
                      <button 
                        onClick={() => handleCountrySelection([])} 
                        className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors"
                        title={language === 'en' ? `Remove ${c}` : `Quitar ${c}`}
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                  {selectedStates.map(s => (
                    <span key={s} className="inline-flex items-center gap-1 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2 py-0.5 rounded-full text-[10.5px] font-bold shadow-2xs">
                      <Building2 className="w-2.5 h-2.5 text-[#E85B81]" />
                      <span>{s}</span>
                      <button 
                        onClick={() => {
                          setSelectedStates(prev => prev.filter(x => x !== s));
                          setSelectedMunicipios([]);
                        }} 
                        className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors"
                        title={language === 'en' ? `Remove ${s}` : `Quitar ${s}`}
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                  {selectedMunicipios.map(m => (
                    <span key={m} className="inline-flex items-center gap-1 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 px-2 py-0.5 rounded-full text-[10.5px] font-bold shadow-2xs">
                      <Landmark className="w-2.5 h-2.5 text-[#E85B81]" />
                      <span>{m}</span>
                      <button 
                        onClick={() => setSelectedMunicipios(prev => prev.filter(x => x !== m))} 
                        className="hover:text-[#DE4B73] p-0.5 rounded-full hover:bg-[#E85B81]/15 transition-colors"
                        title={language === 'en' ? `Remove ${m}` : `Quitar ${m}`}
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearAllLocationFilters}
                    className="text-[10.5px] font-extrabold text-[#E85B81] hover:text-[#DE4B73] underline ml-1 cursor-pointer transition-colors"
                  >
                    {language === 'en' ? 'Clear' : 'Limpiar'}
                  </button>
                </div>
              )}

              {/* Noticias Linear Banner Line on Mobile below search bar */}
              <div className="w-full mt-2 mb-0" id="mobile-noticias-ticker-container">
                <NoticiasTicker noticias={noticiasList} />
              </div>
            </div>

          </header>

        <main className="max-w-[100rem] 2xl:max-w-[115rem] 3xl:max-w-[135rem] w-full mx-auto px-2 md:px-4 mt-2.5 sm:mt-8">
          {/* Active Favorites Filter Banner */}
          {filterFavoritesOnly && (
            <div className="mb-6 p-4 rounded-2xl bg-[#FCE8EF] border border-[#E85B81]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5 text-center sm:text-left">
                <div className="w-8 h-8 rounded-full bg-[#E85B81] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Heart className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <span className="font-serif font-bold text-sm sm:text-base text-[#18181B] block">
                    {language === 'en'
                      ? `Showing only your favorite brands (${filteredAnnouncements.length})`
                      : `Mostrando solo tus marcas favoritas (${filteredAnnouncements.length})`}
                  </span>
                  <span className="text-xs text-neutral-600 font-sans block">
                    {language === 'en' 
                      ? 'You can add more brands by tapping the heart icon on any card.'
                      : 'Puedes agregar más marcas dando clic en el corazón de cualquier tarjeta.'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFavoritesModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-full bg-white text-[#E85B81] border border-[#E85B81]/40 text-xs font-bold hover:bg-white/80 transition-all cursor-pointer shadow-2xs"
                >
                  {language === 'en' ? 'Manage Key' : 'Ver mi Clave'}
                </button>
                <button
                  onClick={() => setFilterFavoritesOnly(false)}
                  className="px-3.5 py-1.5 rounded-full bg-[#E85B81] text-white text-xs font-bold hover:bg-[#DE4B73] transition-all cursor-pointer shadow-2xs"
                >
                  {t('favorites.showAll')}
                </button>
              </div>
            </div>
          )}

          {loading || error ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="relative">
                <RefreshCw className="w-16 h-16 text-brand-orange animate-spin" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-brand-orange/20 rounded-full animate-ping" />
              </div>
            </div>
          ) : isDiamondsView ? (
            <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto w-full">
              <AnimatePresence mode="popLayout">
                {displayedAnnouncements.map((ad, idx) => (
                  <AnnouncementCard 
                    key={`${ad.id || ad.titulo}-${idx}`} 
                    ad={ad} 
                    isDiamonds={true} 
                    isFavorite={isFavorite(ad)}
                    onToggleFavorite={() => handleToggleFavorite(ad)}
                    onViewFull={(selected) => setSelectedAdForModal(selected)}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div 
              className={cn(
                "grid gap-2 xs:gap-3.5 sm:gap-6 xl:gap-8 w-full items-start",
                columnCount === 2 ? "grid-cols-2" : columnCount === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              )}
              style={{
                gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`
              }}
            >
              {masonryColumns.map((colAds, colIdx) => (
                <div key={`masonry-col-${colIdx}`} className="flex flex-col gap-2 xs:gap-3.5 sm:gap-6 xl:gap-8 w-full">
                  <AnimatePresence mode="popLayout">
                    {colAds.map((ad, idx) => (
                      <AnnouncementCard 
                        key={`${ad.id || ad.titulo}-${colIdx}-${idx}`} 
                        ad={ad} 
                        isDiamonds={false} 
                        isFavorite={isFavorite(ad)}
                        onToggleFavorite={() => handleToggleFavorite(ad)}
                        onViewFull={(selected) => setSelectedAdForModal(selected)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

          {/* Pagination for DESKTOP and all non-mobile views, displaying 28 ads per page */}
          {!isMobile && totalPagesDesktop > 1 && (
            <div className="hidden md:flex flex-col items-center justify-center gap-4 mt-12 pb-2 animate-fade-in" id="desktop-pagination-controls">
              <div className="flex items-center justify-between w-fit min-w-[340px] bg-white/95 border border-brand-pink/30 px-6 py-2.5 rounded-full shadow-[0_8px_30px_rgba(168,89,103,0.06)] select-none">
                {/* Previous Page Button */}
                <button
                  onClick={() => {
                    if (desktopPage > 1) {
                      setDesktopPage(prev => prev - 1);
                      const el = document.getElementById('desktop-header-wrapper');
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 40;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }
                  }}
                  disabled={desktopPage === 1}
                  className={cn(
                    "px-4 py-1.5 text-[11px] font-sans font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 focus:outline-none shrink-0",
                    desktopPage === 1 
                      ? "text-neutral-300 pointer-events-none select-none" 
                      : "text-brand-wine hover:text-brand-pink bg-brand-wine/5 hover:bg-brand-pink/10 cursor-pointer active:scale-95"
                  )}
                  id="btn-desktop-prev-page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>

                {/* Current Page Number Middle Display */}
                <div 
                  className="text-sm font-sans font-black text-brand-wine px-4 shrink-0 select-none" 
                  id="desktop-current-page-num"
                >
                  {desktopPage}
                </div>

                {/* Next Page Button */}
                <button
                  onClick={() => {
                    if (desktopPage < totalPagesDesktop) {
                      setDesktopPage(prev => prev + 1);
                      const el = document.getElementById('desktop-header-wrapper');
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 40;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }
                  }}
                  disabled={desktopPage === totalPagesDesktop}
                  className={cn(
                    "px-4 py-1.5 text-[11px] font-sans font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 focus:outline-none shrink-0",
                    desktopPage === totalPagesDesktop 
                      ? "text-neutral-300 pointer-events-none select-none" 
                      : "text-brand-wine hover:text-brand-pink bg-brand-wine/5 hover:bg-brand-pink/10 cursor-pointer active:scale-95"
                  )}
                  id="btn-desktop-next-page"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Pagination for MOBILE only, displaying 17 ads per page */}
          {isMobile && totalPages > 1 && (
            <div className="flex flex-col items-center justify-center gap-3 mt-10 md:hidden" id="mobile-pagination-controls">
              <div className="flex items-center justify-between w-[270px] bg-white/95 border border-brand-pink/30 px-3 py-2 rounded-full shadow-[0_6px_20px_rgba(168,89,103,0.08)]">
                <button
                  onClick={() => {
                    if (mobilePage > 1) {
                      setMobilePage(prev => prev - 1);
                      const el = document.getElementById('mobile-search-filter-row');
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 90;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }
                  }}
                  disabled={mobilePage === 1}
                  className={cn(
                    "px-3 py-1.5 text-xs font-sans font-bold rounded-full transition-all flex items-center gap-1 focus:outline-none shrink-0",
                    mobilePage === 1 
                      ? "text-neutral-300 pointer-events-none select-none" 
                      : "text-brand-wine bg-brand-wine/5 active:scale-95 hover:bg-brand-wine/10"
                  )}
                  id="btn-mobile-prev-page"
                >
                  <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
                  <span>Ant.</span>
                </button>

                <div className="flex items-center justify-center font-sans text-xs font-black text-brand-wine shrink-0 select-none" id="mobile-current-page-num">
                  <span>{mobilePage}</span>
                </div>

                <button
                  onClick={() => {
                    if (mobilePage < totalPages) {
                      setMobilePage(prev => prev + 1);
                      const el = document.getElementById('mobile-search-filter-row');
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 90;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }
                  }}
                  disabled={mobilePage === totalPages}
                  className={cn(
                    "px-3 py-1.5 text-xs font-sans font-bold rounded-full transition-all flex items-center gap-1 focus:outline-none shrink-0",
                    mobilePage === totalPages 
                      ? "text-neutral-300 pointer-events-none select-none" 
                      : "text-brand-wine bg-brand-wine/5 active:scale-95 hover:bg-brand-wine/10"
                  )}
                  id="btn-mobile-next-page"
                >
                  <span>Sig.</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            </div>
          )}

          {/* Subtle separator line separating pagination from Scratch & Discover */}
          <div className="w-full max-w-5xl mx-auto my-8 border-t border-[#EFE8DF]" />

          {/* Scratch & Discover Mini-Game Section (Placed at the end of the page selector) */}
          <div className="w-full mt-4 mb-6" id="end-of-pagination-scratch-discover">
            <ScratchAndDiscover
              announcements={activeAnnouncements}
              availableCountries={availableCountries}
              onToggleFavorite={(ad) => handleToggleFavorite(ad)}
              favorites={favorites}
            />
          </div>

          {!loading && !error && filteredAnnouncements.length === 0 && (
            <div className="text-center py-20 sm:py-28 bg-white/40 rounded-3xl border-2 border-dashed border-brand-wine/20 px-4">
              <Search className="w-14 h-14 text-brand-wine/25 mx-auto mb-4" />
              <p className="text-xl sm:text-2xl font-serif text-brand-wine italic font-medium max-w-lg mx-auto">
                {activeSearchTerm 
                  ? (language === 'en' ? `No matches found for "${activeSearchTerm}"` : `No hay coincidencias para "${activeSearchTerm}"`) 
                  : (activeLocationFilterCount > 0 
                      ? (language === 'en' ? 'No matches for selected filters' : 'No hay coincidencias para los filtros seleccionados') 
                      : t('directory.noResults'))}
              </p>
              <button 
                onClick={() => { 
                  setActiveSearchTerm(''); 
                  setActiveSelectedLocation('Todas');
                  clearAllLocationFilters();
                }}
                className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-[#E85B81] hover:bg-[#DE4B73] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {t('directory.viewAll')}
              </button>
            </div>
          )}
        </main>

        <footer className="mt-12 sm:mt-16 border-t border-[#EFE8DF] bg-[#FAF8F5] text-neutral-800 py-10 sm:py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-5 sm:gap-6 text-center">
            
            {/* Elegant Brand Logo with interlocking Os */}
            <RoosLogo 
              align="center" 
              className="text-[#18181B]" 
            />

            {/* Handwritten script quote from reference */}
            <p className="font-handwriting text-2xl sm:text-3xl text-neutral-800">
              {t('footer.quote')} <span className="text-[#E85B81]">♡</span>
            </p>

            <p className="text-[10px] uppercase font-bold text-neutral-400 leading-relaxed tracking-wider">
              © {new Date().getFullYear()} ROOS CAPITAL · <a href="/" className="hover:underline">rooscapital.com</a>
              <span className="hidden md:inline">
                <br />
                {t('footer.rights')}
              </span>
            </p>
            <div className="flex flex-nowrap md:flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 text-xs font-medium text-neutral-500 w-full overflow-x-hidden" id="footer-links-container">
              <a 
                href="/faq"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    navigateToView('faq');
                  }
                }}
                className="hover:text-brand-orange transition-colors duration-200 underline cursor-pointer hover:opacity-100 whitespace-nowrap"
                id="footer-faq-link"
              >
                <span className="md:hidden">FAQ</span>
                <span className="hidden md:inline">{t('footer.faq')}</span>
              </a>
              <span className="opacity-30 select-none text-[7px] min-[375px]:text-[8px] md:text-xs">•</span>
              <button 
                onClick={() => setIsTermsOpen(true)}
                className="hover:text-brand-orange transition-colors duration-200 underline cursor-pointer hover:opacity-100 whitespace-nowrap"
                id="footer-terms-link"
              >
                {t('footer.terms')}
              </button>
              <span className="opacity-30 select-none text-[7px] min-[375px]:text-[8px] md:text-xs">•</span>
              <button 
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-brand-orange transition-colors duration-200 underline cursor-pointer hover:opacity-100 whitespace-nowrap"
                id="footer-privacy-link"
              >
                {t('footer.privacy')}
              </button>
            </div>

            {/* Secciones del menú hamburguesa trasladadas aquí */}
            <nav 
              aria-label="Navegación principal del sitio"
              className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 md:gap-x-6 gap-y-2 text-[11px] sm:text-xs md:text-sm font-extrabold text-[#E85B81] pt-3 border-t border-[#E85B81]/20 w-full max-w-2xl mx-auto"
              id="footer-menu-sections"
            >
              <a
                href="/somos-roos"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    navigateToView('somos_roos');
                  }
                }}
                className={`hover:text-[#DE4B73] transition-colors duration-200 cursor-pointer ${
                  (currentView as string) === 'somos_roos' ? 'text-[#DE4B73] underline underline-offset-4' : 'text-[#E85B81]'
                }`}
                id="footer-menu-somos-roos"
              >
                {t('footer.somosRoos')}
              </a>
              <span className="opacity-50 select-none text-[9px] sm:text-xs text-[#E85B81]">•</span>
              <a
                href="/publicate"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    navigateToView('publicate');
                  }
                }}
                className={`hover:text-[#DE4B73] transition-colors duration-200 cursor-pointer ${
                  (currentView as string) === 'publicate' ? 'text-[#DE4B73] underline underline-offset-4' : 'text-[#E85B81]'
                }`}
                id="footer-menu-publicate"
              >
                {t('footer.publicate')}
              </a>
              <span className="opacity-50 select-none text-[9px] sm:text-xs text-[#E85B81]">•</span>
              <a
                href="/ugcprogram"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    navigateToView('ugc_program');
                  }
                }}
                className={`hover:text-[#DE4B73] transition-colors duration-200 cursor-pointer ${
                  (currentView as string) === 'ugc_program' ? 'text-[#DE4B73] underline underline-offset-4' : 'text-[#E85B81]'
                }`}
                id="footer-menu-ugc-program"
              >
                {t('footer.ugcProgram')}
              </a>
              <span className="opacity-50 select-none text-[9px] sm:text-xs text-[#E85B81]">•</span>
              <a
                href="/embajadoras"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    navigateToView('ambassadors');
                  }
                }}
                className={`hover:text-[#DE4B73] transition-colors duration-200 cursor-pointer ${
                  (currentView as string) === 'ambassadors' ? 'text-[#DE4B73] underline underline-offset-4' : 'text-[#E85B81]'
                }`}
                id="footer-menu-embajadoras"
              >
                {t('footer.ambassadors')}
              </a>
              <span className="opacity-50 select-none text-[9px] sm:text-xs text-[#E85B81]">•</span>
              <a
                href="/educacion"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    navigateToView('educacion');
                  }
                }}
                className={`hover:text-[#DE4B73] transition-colors duration-200 cursor-pointer ${
                  (currentView as string) === 'educacion' ? 'text-[#DE4B73] underline underline-offset-4' : 'text-[#E85B81]'
                }`}
                id="footer-menu-educacion"
              >
                {language === 'en' ? 'Education' : 'Educación'}
              </a>
            </nav>
          </div>
        </footer>
        </div>
      )}

      {/* Login Modal (Disguised backup key loader) */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <LoginModal 
            onClose={() => setIsLoginModalOpen(false)} 
            currentFavorites={favorites}
            onFavoritesLoaded={handleFavoritesLoaded}
          />
        )}
      </AnimatePresence>

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        favorites={favorites}
        allAnnouncements={activeAnnouncements}
        onRemoveFavorite={handleToggleFavoriteByKey}
        onSelectBusiness={(title) => {
          const found = activeAnnouncements.find(a => a.titulo.toLowerCase() === title.toLowerCase());
          if (found) setSelectedAdForModal(found);
        }}
        onOpenLogin={() => {
          setIsFavoritesModalOpen(false);
          setIsLoginModalOpen(true);
        }}
        onFilterDirectoryToFavorites={() => {
          setFilterFavoritesOnly(true);
          const el = document.getElementById('marketplace-directory');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Favorite Toast Notification */}
      <AnimatePresence>
        {favoriteToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] bg-neutral-900/95 text-white px-4 sm:px-5 py-3 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md flex items-center gap-3 text-xs sm:text-sm font-medium"
          >
            <span className="text-[#E85B81] text-base font-bold">♥</span>
            <span className="truncate max-w-[220px] sm:max-w-xs">{favoriteToast.message}</span>
            <button
              onClick={() => {
                setFavoriteToast(null);
                setIsFavoritesModalOpen(true);
              }}
              className="ml-1 px-3 py-1 bg-[#E85B81] hover:bg-[#DE4B73] text-white rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
            >
              {language === 'en' ? 'View' : 'Ver'}
            </button>
            <button
              onClick={() => setFavoriteToast(null)}
              className="text-white/60 hover:text-white p-1 text-xs cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terms and Conditions Modal */}
      <AnimatePresence>
        {isTermsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center bg-neutral-900/80 backdrop-blur-sm p-4"
            id="terms-overlay"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white border-2 border-brand-orange/20 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] shadow-2xl flex flex-col"
              id="terms-modal"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100" id="terms-header">
                <h3 className="text-lg md:text-xl font-serif font-black text-brand-wine uppercase tracking-wider">
                  Términos y Condiciones
                </h3>
                <button 
                  onClick={() => setIsTermsOpen(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-brand-wine transition-colors"
                  id="close-terms-button"
                  aria-label="Cerrar términos y condiciones"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 mt-4 space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans text-justify" id="terms-content">
                <p className="font-extrabold text-neutral-800 text-sm">TÉRMINOS Y CONDICIONES DE USO – Roos Capital</p>
                
                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">IDENTIDAD DEL RESPONSABLE</h4>
                  <p>
                    El presente documento regula el acceso y uso del sitio web de Roos Capital (en adelante, la “Plataforma”), operado por Roos Capital (en adelante, “Roos Capital”, “nosotros” o “la Plataforma”), con domicilio en México.
                  </p>
                  <p className="mt-2">
                    Para cualquier duda, aclaración o contacto, el Usuario podrá comunicarse al correo electrónico: <span className="font-semibold text-brand-orange">rooscapital.mx@gmail.com</span>
                  </p>
                  <p className="mt-2">
                    El uso de la Plataforma implica la aceptación plena y sin reservas de los presentes Términos y Condiciones, así como del Aviso de Privacidad.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">OBJETO DE LA PLATAFORMA</h4>
                  <p>
                    Roos Capital es una plataforma digital de intermediación y difusión que conecta a:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>Proveedores de servicios para eventos (salones, banquetes, decoración, música, fotografía, etc.)</li>
                    <li>Usuarios interesados en contratar dichos servicios</li>
                  </ul>
                  <p className="mt-2">
                    Roos Capital no es proveedor directo de los servicios anunciados, ni participa en su ejecución, calidad, cumplimiento o resultados.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">ACEPTACIÓN DEL USUARIO</h4>
                  <p>
                    Al acceder, navegar o utilizar la Plataforma, el Usuario declara:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>Ser mayor de edad conforme a la legislación mexicana</li>
                    <li>Tener capacidad legal para obligarse</li>
                    <li>Aceptar expresamente estos Términos y Condiciones</li>
                  </ul>
                  <p className="mt-2">
                    En caso de no estar de acuerdo, deberá abstenerse de utilizar la Plataforma.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">TIPOS DE USUARIOS</h4>
                  <p>
                    <strong>a) Usuarios visitantes:</strong> Navegan sin registrarse<br />
                    <strong>b) Usuarios proveedores:</strong> Publican u ofrecen servicios<br />
                    <strong>c) Usuarios clientes:</strong> Buscan o contratan servicios<br />
                    Cada Usuario es responsable del uso que haga de la Plataforma.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">OBLIGACIONES DEL USUARIO</h4>
                  <p>
                    El Usuario se obliga a:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>Proporcionar información veraz y actualizada</li>
                    <li>Utilizar la Plataforma para fines lícitos</li>
                    <li>Respetar derechos de terceros y de la Plataforma</li>
                    <li>No dañar, saturar o vulnerar el sistema</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">USOS PROHIBIDOS</h4>
                  <p>
                    Queda estrictamente prohibido:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>Publicar información falsa o engañosa</li>
                    <li>Suplantar identidades</li>
                    <li>Realizar fraudes o estafas</li>
                    <li>Usar bots, scraping o automatización sin autorización</li>
                    <li>Publicar contenido ilegal, ofensivo o que infrinja derechos</li>
                    <li>Utilizar la Plataforma con fines distintos a la contratación de eventos</li>
                  </ul>
                  <p className="mt-2">
                    Roos Capital podrá suspender o eliminar cuentas sin previo aviso.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">PUBLICACIÓN DE CONTENIDO Y RESPONSABILIDAD</h4>
                  <p>
                    Los proveedores son los únicos responsables de:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>La veracidad de su información</li>
                    <li>Precios, condiciones y cumplimiento del servicio</li>
                    <li>Permisos, licencias y obligaciones fiscales</li>
                  </ul>
                  <p className="mt-2">
                    Roos Capital no garantiza:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>La calidad de los servicios</li>
                    <li>Disponibilidad real</li>
                    <li>Resultados de contratación</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">DIRECTORIO Y ANUNCIOS DE DESCUBRIMIENTO</h4>
                  <p>
                    Roos Capital Marketplace presenta una selección de negocios y emprendimientos con el propósito de facilitar su descubrimiento y brindar a los usuarios acceso a nuevas marcas, productos y servicios.
                  </p>
                  <p className="mt-2">
                    La aparición de un negocio en el sitio web no implica necesariamente que dicho negocio sea socio, afiliado, patrocinador, cliente o colaborador de Roos Capital Marketplace, ni que exista una relación comercial entre ambas partes.
                  </p>
                  <p className="mt-2">
                    Algunos negocios pueden haber sido identificados a través de las Embajadoras Roos, la comunidad o procesos de descubrimiento realizados por Roos Capital Marketplace. La inclusión de estos negocios tiene únicamente fines informativos y de descubrimiento para los usuarios.
                  </p>
                  <p className="mt-2">
                    Cuando un negocio mantiene una relación oficial con Roos Capital Marketplace, dicha relación estará sujeta a los términos y condiciones correspondientes.
                  </p>
                  <p className="mt-2">
                    Roos Capital Marketplace no pretende representar, hablar en nombre de ni actuar como agente de los negocios que aparecen en el directorio y que no mantienen una relación oficial con la plataforma.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">PAGOS, COMISIONES Y FACTURACIÓN</h4>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>Todos los precios se expresan en pesos mexicanos (MXN)</li>
                    <li>Pueden modificarse sin previo aviso</li>
                    <li><strong>No se realizan devoluciones ni reembolsos bajo ninguna circunstancia</strong></li>
                    <li>La facturación se realizará conforme a la legislación fiscal mexicana vigente</li>
                  </ul>
                  <p className="mt-2 font-bold text-neutral-800">
                    Al realizar cualquier pago, el Usuario acepta esta política de no reembolso de manera expresa.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">PROPIEDAD INTELECTUAL</h4>
                  <p>
                    Todo el contenido de la Plataforma (marca, diseño, textos, software, estructura) es propiedad de Roos Capital o cuenta con licencia.
                  </p>
                  <p className="mt-2">
                    Queda prohibida su reproducción sin autorización previa por escrito.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">ENLACES A TERCEROS</h4>
                  <p>
                    La Plataforma puede contener enlaces externos. Roos Capital no es responsable del contenido, políticas o prácticas de dichos sitios.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">LIMITACIÓN DE RESPONSABILIDAD</h4>
                  <p>
                    La Plataforma se ofrece “tal cual” y “según disponibilidad”.
                  </p>
                  <p className="mt-2">
                    Roos Capital no será responsable por:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>Incumplimientos entre usuarios</li>
                    <li>Daños directos o indirectos</li>
                    <li>Pérdida de ingresos, datos o reputación</li>
                    <li>Fallas técnicas o interrupciones</li>
                  </ul>
                  <p className="mt-2">
                    El uso de la Plataforma es bajo responsabilidad del Usuario.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">INDEMNIZACIÓN</h4>
                  <p>
                    El Usuario acepta indemnizar a Roos Capital por cualquier reclamación, daño, gasto o responsabilidad derivada del uso indebido de la Plataforma, conforme a estos Términos.
                  </p>
                  <p className="mt-2">
                    Cualquier actividad ilegal entre usuarios será completamente ajena a Roos Capital.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">RELACIÓN ENTRE LAS PARTES</h4>
                  <p>
                    Roos Capital actúa únicamente como intermediario digital.
                  </p>
                  <p className="mt-2">
                    No existe relación laboral, sociedad, representación o asociación entre Roos Capital y los proveedores o usuarios.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">PROTECCIÓN DE DATOS PERSONALES</h4>
                  <p>
                    El tratamiento de datos personales se rige por el Aviso de Privacidad de la Plataforma, elaborado conforme a la legislación mexicana aplicable.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">USO DE COOKIES</h4>
                  <p>
                    La Plataforma puede utilizar cookies y tecnologías similares para mejorar la experiencia del usuario, analizar comportamiento y optimizar el servicio.
                  </p>
                  <p className="mt-2">
                    El Usuario puede configurar su navegador para rechazarlas.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">SUSPENSIÓN Y TERMINACIÓN</h4>
                  <p>
                    Roos Capital podrá suspender o cancelar cuentas sin previo aviso en caso de:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>Incumplimiento de estos Términos</li>
                    <li>Actividad fraudulenta</li>
                    <li>Riesgos para la seguridad o reputación</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">MODIFICACIONES</h4>
                  <p>
                    Roos Capital podrá modificar estos Términos en cualquier momento. El uso continuo de la Plataforma implica aceptación de los cambios.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">LEGISLACIÓN Y JURISDICCIÓN</h4>
                  <p>
                    Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos.
                  </p>
                  <p className="mt-2 font-semibold">
                    Para cualquier controversia, las partes se someten a los tribunales competentes de Monterrey, Nuevo León, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-end" id="terms-footer">
                <button 
                  onClick={() => setIsTermsOpen(false)}
                  className="px-6 py-2 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-200"
                  id="terms-accept-button"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center bg-neutral-900/80 backdrop-blur-sm p-4"
            id="privacy-overlay"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white border-2 border-brand-orange/20 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] shadow-2xl flex flex-col"
              id="privacy-modal"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100" id="privacy-header">
                <h3 className="text-lg md:text-xl font-serif font-black text-brand-wine uppercase tracking-wider">
                  Aviso de Privacidad
                </h3>
                <button 
                  onClick={() => setIsPrivacyOpen(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-brand-wine transition-colors"
                  id="close-privacy-button"
                  aria-label="Cerrar aviso de privacidad"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 mt-4 space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans text-justify" id="privacy-content">
                <p className="font-extrabold text-neutral-800 text-sm">AVISO DE PRIVACIDAD – Roos Capital</p>
                
                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">IDENTIDAD Y DOMICILIO DEL RESPONSABLE</h4>
                  <p>
                    Roos Capital (en adelante, “la Plataforma”), con registro digital en la Unión Europea, sin domicilio físico, es responsable del tratamiento de los datos personales que recaba de sus usuarios.
                  </p>
                  <p className="mt-2">
                    Para cualquier duda, comentario o solicitud relacionada con este Aviso de Privacidad, el usuario podrá contactar al correo electrónico:<br />
                    <span className="font-semibold text-brand-orange">rooscapital.mx@gmail.com</span>
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">DATOS PERSONALES QUE SE RECABAN</h4>
                  <p>
                    La Plataforma podrá recabar los siguientes datos personales:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>Nombre completo</li>
                    <li>Identificación fiscal</li>
                    <li>Correo electrónico</li>
                    <li>Número telefónico</li>
                    <li>Información de contacto</li>
                    <li>Datos relacionados con servicios ofrecidos (en el caso de proveedores)</li>
                    <li>Información de navegación (cookies, IP, comportamiento en la plataforma)</li>
                  </ul>
                  <p className="mt-2">
                    Roos Capital no recaba datos personales sensibles.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">FINALIDADES DEL TRATAMIENTO DE DATOS</h4>
                  <p className="font-semibold text-neutral-700 text-xs">Finalidades primarias (necesarias)</p>
                  <p className="mt-1">Los datos personales serán utilizados para:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>Permitir el acceso y uso de la Plataforma</li>
                    <li>Conectar usuarios con proveedores de servicios</li>
                    <li>Facilitar la comunicación entre usuarios</li>
                    <li>Gestionar cuentas y perfiles</li>
                    <li>Brindar soporte y atención al cliente</li>
                  </ul>
                  
                  <p className="font-semibold text-neutral-700 text-xs mt-3">Finalidades secundarias (opcionales)</p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>Envío de información promocional</li>
                    <li>Mejora de la experiencia del usuario</li>
                    <li>Análisis interno y estadístico</li>
                  </ul>
                  <p className="mt-2">
                    El usuario puede oponerse al uso de sus datos para finalidades secundarias enviando un correo electrónico.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">TRANSFERENCIA DE DATOS</h4>
                  <p>
                    Roos Capital podrá compartir datos personales:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>Entre usuarios (cuando sea necesario para la contratación de servicios)</li>
                    <li>Con proveedores de servicios tecnológicos (hosting, analítica, etc.)</li>
                  </ul>
                  <p className="mt-2 font-semibold text-neutral-800">
                    En ningún caso se venderán datos personales a terceros.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">DERECHOS ARCO</h4>
                  <p>
                    El usuario tiene derecho a:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>Acceder a sus datos personales</li>
                    <li>Rectificarlos si son incorrectos</li>
                    <li>Cancelarlos cuando considere que no son necesarios</li>
                    <li>Oponerse a su uso</li>
                  </ul>
                  <p className="mt-2">
                    Para ejercer estos derechos (ARCO), el usuario deberá enviar una solicitud al correo:<br />
                    <span className="font-semibold text-brand-orange">rooscapital.mx@gmail.com</span>
                  </p>
                  <p className="mt-2">
                    La solicitud deberá incluir:
                  </p>
                  <ul className="list-decimal pl-5 mt-1 space-y-0.5">
                    <li>Nombre completo</li>
                    <li>Descripción clara del derecho que desea ejercer</li>
                    <li>Medio de contacto</li>
                  </ul>
                  <p className="mt-2">
                    La Plataforma responderá en un plazo razonable conforme a la legislación aplicable.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">USO DE COOKIES Y TECNOLOGÍAS SIMILARES</h4>
                  <p>
                    La Plataforma utiliza cookies para:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>Mejorar la experiencia del usuario</li>
                    <li>Análisis del comportamiento dentro del sitio</li>
                    <li>Optimizar el funcionamiento</li>
                  </ul>
                  <p className="mt-2">
                    El usuario puede deshabilitar las cookies desde su navegador.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">SEGURIDAD DE LOS DATOS</h4>
                  <p>
                    Roos Capital implementa medidas de seguridad administrativas, técnicas y físicas para proteger los datos personales contra daño, pérdida, alteración o acceso no autorizado.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">CONSERVACIÓN DE LOS DATOS</h4>
                  <p>
                    Los datos personales serán conservados únicamente durante el tiempo necesario para cumplir con las finalidades descritas y conforme a las disposiciones legales aplicables.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">CAMBIOS AL AVISO DE PRIVACIDAD</h4>
                  <p>
                    Roos Capital se reserva el derecho de modificar el presente Aviso de Privacidad en cualquier momento.
                  </p>
                  <p className="mt-2 font-semibold text-neutral-800">
                    Cualquier cambio será publicado en la Plataforma.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-800 uppercase text-xs mb-1">ACEPTACIÓN DEL AVISO DE PRIVACIDAD</h4>
                  <p className="font-bold text-neutral-800">
                    El uso de la Plataforma implica que el usuario ha leído, entendido y aceptado el presente Aviso de Privacidad.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-end" id="privacy-footer">
                <button 
                  onClick={() => setIsPrivacyOpen(false)}
                  className="px-6 py-2 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-200"
                  id="privacy-accept-button"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Announcement Modal */}
      <AnimatePresence>
        {selectedAdForModal && (
          <AnnouncementModal
            ad={selectedAdForModal}
            onClose={() => setSelectedAdForModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

