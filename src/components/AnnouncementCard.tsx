import React, { useState, useEffect } from 'react';
import { Heart, Globe, MessageCircle, Phone, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Announcement } from '../App';
import { CountryFlag, getCountryInfo } from '../utils/countryUtils';
import { useLanguage } from '../context/LanguageContext';
import { getOptimizedImageUrl } from '../utils/imageUtils';
import { cn } from '../utils/cn';
import { 
  formatWhatsAppUrl, 
  formatInstagramUrl, 
  formatFacebookUrl, 
  formatTikTokUrl, 
  formatTwitterUrl, 
  formatLinkedInUrl, 
  formatWebUrl,
  formatWeiboUrl,
  formatXiaohongshuUrl,
  formatDouyinUrl,
  formatLineUrl,
  formatKakaoUrl,
  formatWeChatUrl
} from '../utils/socialUtils';
import { 
  WeiboIcon, 
  RedIcon, 
  DouyinIcon, 
  LineIcon, 
  KakaoIcon, 
  WeChatIcon 
} from './SocialIcons';

export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <div className={cn("relative flex-shrink-0", className)}>
    <MessageCircle className="absolute inset-0 w-full h-full" />
    <Phone className="absolute w-[44%] h-[44%] text-current left-[28%] top-[25%] rotate-[10deg]" />
  </div>
);

export const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("flex-shrink-0", className)}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// Renders brand titles with a clean, neutral sans-serif ampersand
export function renderCleanBrandTitle(title: string) {
  if (!title) return '';
  if (!title.includes('&')) return title;
  const parts = title.split('&');
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="font-sans font-normal text-neutral-800 tracking-normal mx-0.5">&</span>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export interface AnnouncementCardProps { 
  ad: Announcement; 
  isDiamonds?: boolean; 
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onViewFull?: (ad: Announcement) => void;
}

export function AnnouncementCard({ 
  ad, 
  isDiamonds = false, 
  isFavorite = false,
  onToggleFavorite,
  onViewFull
}: AnnouncementCardProps) {
  const { t, translateCategory, language } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const isTopSocio = ad.socio?.toLowerCase().includes('top') || ad.socio?.toLowerCase().includes('vip');
  const isTrending = ad.socio?.toLowerCase().includes('tendencia') || ad.categoria?.toLowerCase().includes('tendencia');

  // Compute social networks links
  const socialsList = [
    { key: 'whatsapp', icon: WhatsAppIcon, url: formatWhatsAppUrl(ad.whatsapp), color: 'text-brand-orange bg-brand-orange/5 border border-brand-orange/15 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-[0_4px_14px_rgba(194,115,135,0.35)]', label: 'WhatsApp' },
    { key: 'instagram', icon: Instagram, url: formatInstagramUrl(ad.instagram), color: 'text-brand-orange bg-brand-orange/5 border border-brand-orange/15 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-[0_4px_14px_rgba(194,115,135,0.35)]', label: 'Instagram' },
    { key: 'facebook', icon: Facebook, url: formatFacebookUrl(ad.facebook), color: 'text-brand-orange bg-brand-orange/5 border border-brand-orange/15 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-[0_4px_14px_rgba(194,115,135,0.35)]', label: 'Facebook' },
    { key: 'tiktok', icon: TikTokIcon, url: formatTikTokUrl(ad.tiktok), color: 'text-brand-orange bg-brand-orange/5 border border-brand-orange/15 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-[0_4px_14px_rgba(194,115,135,0.35)]', label: 'TikTok' },
    { key: 'twitter', icon: Twitter, url: formatTwitterUrl(ad.twitter), color: 'text-brand-orange bg-brand-orange/5 border border-brand-orange/15 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-[0_4px_14px_rgba(194,115,135,0.35)]', label: 'Twitter / X' },
    { key: 'linkedin', icon: Linkedin, url: formatLinkedInUrl(ad.linkedin), color: 'text-brand-orange bg-brand-orange/5 border border-brand-orange/15 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-[0_4px_14px_rgba(194,115,135,0.35)]', label: 'LinkedIn' },
    { key: 'wechat', icon: WeChatIcon, url: formatWeChatUrl(ad.wechat), color: 'text-brand-orange bg-brand-orange/5 border border-brand-orange/15 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-[0_4px_14px_rgba(194,115,135,0.35)]', label: ad.wechat && !ad.wechat.startsWith('http') ? `WeChat: ${ad.wechat}` : 'WeChat' },
    { key: 'weibo', icon: WeiboIcon, url: formatWeiboUrl(ad.weibo), color: 'text-brand-orange bg-brand-orange/5 border border-brand-orange/15 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-[0_4px_14px_rgba(194,115,135,0.35)]', label: 'Weibo' },
    { key: 'xiaohongshu', icon: RedIcon, url: formatXiaohongshuUrl(ad.xiaohongshu), color: 'text-brand-orange bg-brand-orange/5 border border-brand-orange/15 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-[0_4px_14px_rgba(194,115,135,0.35)]', label: 'RED (小红书)' },
    { key: 'douyin', icon: DouyinIcon, url: formatDouyinUrl(ad.douyin), color: 'text-brand-orange bg-brand-orange/5 border border-brand-orange/15 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-[0_4px_14px_rgba(194,115,135,0.35)]', label: 'Douyin' },
    { key: 'line', icon: LineIcon, url: formatLineUrl(ad.line), color: 'text-brand-orange bg-brand-orange/5 border border-brand-orange/15 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-[0_4px_14px_rgba(194,115,135,0.35)]', label: 'LINE' },
    { key: 'kakao', icon: KakaoIcon, url: formatKakaoUrl(ad.kakao), color: 'text-brand-orange bg-brand-orange/5 border border-brand-orange/15 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-[0_4px_14px_rgba(194,115,135,0.35)]', label: 'KakaoTalk' },
    { key: 'web', icon: Globe, url: formatWebUrl(ad.web), color: 'text-brand-orange bg-brand-orange/5 border border-brand-orange/15 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:shadow-[0_4px_14px_rgba(194,115,135,0.35)]', label: 'Sitio Web' }
  ];

  const activeSocials = socialsList.filter(s => Boolean(s.url && s.url.trim()));
  const countryInfo = getCountryInfo(ad.extractedCountry || ad.pais, ad.extractedState || ad.estado, ad.extractedMunicipio || ad.municipio, language);
  const hasImg = Boolean(ad.imagen && ad.imagen.trim() && !imgError);

  return (
    <article 
      className={cn(
        "bg-white rounded-2xl sm:rounded-3xl border border-[#EFE8DF] group relative shadow-[0_4px_20px_rgba(0,0,0,0.03)] w-full overflow-hidden transition-all duration-300 hover:shadow-[0_16px_36px_rgba(232,91,129,0.12)] hover:-translate-y-1",
        isDiamonds 
          ? "md:flex md:flex-row md:items-stretch md:min-h-[250px]" 
          : (!hasImg ? "min-h-[240px] sm:min-h-[252px] flex flex-col justify-between" : "w-full h-fit"),
        isTopSocio 
          ? "ring-2 ring-[#E85B81]/30 border-[#E85B81]/40" 
          : "border-[#EFE8DF]"
      )}
    >
      {/* Top accent border in exact fuchsia #E85B81 */}
      <div className="w-full h-1.5 bg-[#E85B81] shrink-0" />

      {/* Badge for Top Socio */}
      {isTopSocio && (
        <div className="absolute top-2.5 left-2 xs:top-3.5 xs:left-3.5 z-10 bg-[#E85B81] text-white px-3 py-1 rounded-full text-[8px] xs:text-[9.5px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 pointer-events-none">
          <span>⭐</span> {t('card.topSocio')}
        </div>
      )}

      {/* Badge for Trending */}
      {isTrending && !isTopSocio && (
        <div className="absolute top-2.5 left-2 xs:top-3.5 xs:left-3.5 z-10 bg-[#18181B] text-white px-2.5 py-0.5 rounded-full text-[7.5px] xs:text-[8.5px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 pointer-events-none">
          <span>🔥</span> {t('card.trending')}
        </div>
      )}

      {hasImg && (
        <div 
          onClick={() => onViewFull?.(ad)}
          className={cn(
            "relative overflow-hidden p-2 xs:p-2.5 sm:p-3 cursor-pointer group/img select-none",
            isDiamonds ? "md:w-5/12 md:max-w-[360px] md:p-4 flex justify-center items-center flex-shrink-0" : "pb-0"
          )}
          title={`Ver anuncio de ${ad.titulo}`}
        >
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl w-full">
            <img 
              src={getOptimizedImageUrl(ad.imagen)} 
              alt={ad.titulo}
              className={cn(
                "w-full object-cover transition-transform duration-500 group-hover/img:scale-105",
                isDiamonds ? "h-48 md:h-full max-h-[220px] md:max-h-full" : "h-auto"
              )}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgError(true)}
            />
            {onViewFull && (
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="bg-white/95 text-[#18181B] text-[9px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-xs transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                  <span>🔍</span> {t('card.viewFull')}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={cn(
        "flex",
        isDiamonds 
          ? "flex-grow p-4 md:p-5 flex-row justify-between gap-4 md:w-7/12" 
          : (!hasImg 
              ? "p-2.5 xs:p-3 sm:p-4 pb-3 flex-col justify-between flex-1 w-full h-full" 
              : "p-2.5 xs:p-3 sm:p-4 pb-3 flex-col justify-start gap-1 w-full")
      )}>
        {/* Left Side: Information */}
        <div className={cn(
          "flex flex-col min-w-0 overflow-hidden",
          isDiamonds ? "flex-grow justify-between" : "justify-start gap-1"
        )}>
          <div className="min-w-0 overflow-hidden">
            <div className="flex items-start justify-between mb-1 min-w-0 overflow-hidden">
              <div className="flex justify-between items-start gap-2.5 w-full min-w-0">
                {ad.logo && ad.logo.trim() && (
                  <div 
                    onClick={() => onViewFull?.(ad)}
                    className="hidden md:block w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden shadow-xs flex-shrink-0 bg-white border border-[#EFE8DF] cursor-pointer hover:opacity-90 transition-opacity"
                    title={`Ver detalles de ${ad.titulo}`}
                  >
                    <img 
                      src={getOptimizedImageUrl(ad.logo)} 
                      alt="" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer" 
                      loading="lazy"
                    />
                  </div>
                )}
                
                {/* Left side: Company name and category */}
                <div className="flex flex-col min-w-0 flex-1 overflow-hidden pr-0.5">
                  <div className="flex items-start justify-between gap-1 w-full">
                    <h2 
                      onClick={() => onViewFull?.(ad)}
                      className="text-sm xs:text-base sm:text-lg font-serif font-bold leading-snug text-[#18181B] hover:text-[#E85B81] transition-colors block w-full break-words select-none cursor-pointer" 
                      title={`Clic para abrir: ${ad.titulo}`}
                    >
                      {renderCleanBrandTitle(ad.titulo)}
                    </h2>
                    {onToggleFavorite && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite();
                        }}
                        className="p-1 text-neutral-400 hover:text-[#E85B81] transition-colors shrink-0 group/heart cursor-pointer"
                        title={language === 'en' ? (isFavorite ? `Remove from favorites: ${ad.titulo}` : `Save to favorites: ${ad.titulo}`) : (isFavorite ? `Quitar de favoritas: ${ad.titulo}` : `Guardar en favoritas: ${ad.titulo}`)}
                        aria-label="Guardar"
                      >
                        <Heart className={cn("w-4 h-4 transition-transform group-hover/heart:scale-125", isFavorite ? "fill-[#E85B81] text-[#E85B81]" : "text-neutral-400 hover:text-[#E85B81]")} />
                      </button>
                    )}
                  </div>

                  {/* Category and Country with Real SVG Flag */}
                  <div className="flex items-center gap-1.5 flex-wrap mt-0.5 text-neutral-500 text-[10px] sm:text-xs font-sans font-medium w-full select-none">
                    <span>{translateCategory(ad.categoria)}</span>
                    <span className="text-neutral-300">·</span>
                    <span 
                      className="inline-flex items-center gap-1.5 cursor-default select-none font-semibold text-neutral-700" 
                      title={countryInfo.name}
                    >
                      <CountryFlag countryCode={countryInfo.code} className="w-4 h-3 sm:w-4.5 sm:h-3.5" title={countryInfo.name} />
                      <span className="text-[10px] sm:text-xs text-neutral-600">{countryInfo.name}</span>
                    </span>
                  </div>

                  {/* Badges row with reserved height (28px) */}
                  <div className="min-h-[28px] flex items-center gap-1.5 flex-wrap mt-1.5 select-none">
                    {ad.online && (
                      <span className="inline-flex items-center text-[8px] sm:text-[9.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full shadow-2xs">
                        {ad.onlineLabel === 'Sólo online' ? t('card.onlineOnly') : (ad.onlineLabel === 'También online' ? t('card.onlineAlso') : t('card.online'))}
                      </span>
                    )}
                    {ad.internacional && (
                      <span className="inline-flex items-center text-[8px] sm:text-[9.5px] font-bold text-blue-800 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full shadow-2xs">
                        {t('card.international')}
                      </span>
                    )}
                    {ad.proveedor && (
                      <span className="inline-flex items-center text-[8px] sm:text-[9.5px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full shadow-2xs">
                        {t('card.supplier')}
                      </span>
                    )}
                  </div>

                  {/* Hashtags in fuchsia color with reserved height (20px) */}
                  <div className="min-h-[20px] flex items-center gap-1.5 flex-wrap mt-1 text-[10.5px] xs:text-[11px] sm:text-[11.5px] font-semibold text-[#E85B81] select-none font-sans leading-tight">
                    {ad.hashtags && ad.hashtags.trim() && (
                      ad.hashtags.split(/\s+/).filter(Boolean).map((tag, i) => (
                        <span key={i} className="hover:underline cursor-default">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Propósito / Descripción del Emprendimiento (for Diamantes en Bruto) */}
            {isDiamonds && ad.descripcion && (
              <div className="mt-4 pt-3 border-t border-[#E85B81]/15" id="diamond-card-description">
                <span className="block text-[8px] font-black uppercase tracking-widest text-[#E85B81] mb-1 font-sans">
                  {t('card.purpose')}
                </span>
                <p className="text-xs font-medium text-neutral-700 italic leading-relaxed font-lora">
                  "{ad.descripcion}"
                </p>
              </div>
            )}
          </div>

          {/* Contact area at bottom */}
          {!isDiamonds && (
            <div className="flex flex-col mt-2 pt-1.5 border-t border-[#EFE8DF] w-full" id="card-bottom-bar">
              <div className="flex flex-col gap-1 w-full min-w-0">
                <span className="block text-[8px] xs:text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-500 font-sans">
                  {t('card.contact')}
                </span>
                <div className="flex items-center gap-1.5 w-full pt-0.5 justify-start flex-wrap">
                  {activeSocials.length > 0 ? (
                    activeSocials.map((soc) => {
                      const Icon = soc.icon;
                      return (
                        <a
                          key={soc.key}
                          href={soc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title={soc.label}
                          className="w-8 sm:w-8.5 h-8 sm:h-8.5 rounded-xl bg-[#FFF9FB] hover:bg-[#FCE8EF] text-[#E85B81] border border-[#FCE8EF] hover:border-[#E85B81]/40 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-2xs hover:shadow-xs shrink-0 cursor-pointer"
                          id={`social-link-${soc.key}`}
                        >
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85B81]" />
                        </a>
                      );
                    })
                  ) : (
                    <span className="text-[8px] xs:text-[10px] italic text-neutral-400">
                      {t('card.noSocials')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right column: social icons aligned vertically (Only for Diamonds view) */}
        {isDiamonds && activeSocials.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-2.5 pl-3.5 md:pl-4 border-l border-brand-wine/10 flex-shrink-0 self-stretch" id="card-socials-vertical">
            {activeSocials.map((soc) => {
              const Icon = soc.icon;
              return (
                <a
                  key={soc.key}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title={soc.label}
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md",
                    soc.color
                  )}
                  id={`social-link-vert-${soc.key}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
export default AnnouncementCard;
