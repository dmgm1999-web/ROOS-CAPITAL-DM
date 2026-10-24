import React, { useState, useEffect } from 'react';
import { Heart, Globe, MessageCircle, Phone, Instagram, Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { Announcement } from '../App';
import { CountryFlag, getCountryInfo } from '../utils/countryUtils';
import { useLanguage } from '../context/LanguageContext';
import { getOptimizedImageUrl, isLikelyImageUrl } from '../utils/imageUtils';
import { FormattedPrice, formatDisplayPrice } from '../utils/priceUtils';
import { translateOutletDescription, translateOutletPromo } from '../utils/outletTranslations';
import { cn } from '../utils/cn';
import roosLogoAnuncios from '../assets/images/roos_logo_anuncios.png';
import roosCapitalLogo from '../assets/images/roos_capital_logo.png';
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
  isOutlet?: boolean;
}

export const AnnouncementCard = React.memo(function AnnouncementCard({ 
  ad, 
  isDiamonds = false, 
  isFavorite = false,
  onToggleFavorite,
  onViewFull,
  isOutlet = false
}: AnnouncementCardProps) {
  const { t, translateCategory, language } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setImgError(false);
    setLogoError(false);
  }, [ad.imagen, ad.logo, ad.id]);

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

  const isAlianzaAd = Boolean(
    ad.isAlianza || 
    isDiamonds || 
    ad.socio?.toLowerCase().includes('alianza') || 
    ad.socio?.toLowerCase().includes('diamante')
  );
  const webUrl = formatWebUrl(ad.web);

  // For Alianza ads, the website link is rendered as the dedicated "Comprar" button,
  // so we omit it from the small icon square list
  const activeSocials = socialsList
    .filter(s => Boolean(s.url && s.url.trim()))
    .filter(s => isAlianzaAd ? s.key !== 'web' : true);

  const countryInfo = getCountryInfo(ad.extractedCountry || ad.pais, ad.extractedState || ad.estado, ad.extractedMunicipio || ad.municipio, language);
  // An ad only has an image if an actual image URL was provided
  const hasImg = Boolean(ad.imagen && ad.imagen.trim() && isLikelyImageUrl(ad.imagen));

  return (
    <article 
      className={cn(
        "bg-white rounded-2xl sm:rounded-3xl border border-[#EFE8DF] group relative shadow-xs w-full h-full flex flex-col justify-between overflow-hidden transition-all duration-150 hover:shadow-md hover:border-[#E85B81]/40",
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
          className="relative overflow-hidden p-2 xs:p-2.5 sm:p-3 pb-0 cursor-pointer group/img select-none w-full"
          title={`Ver anuncio de ${ad.titulo}`}
        >
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl w-full aspect-[940/788] bg-white flex items-center justify-center border border-[#EFE8DF]/60 shadow-2xs">
            {imgError ? (
              <div 
                className="w-full h-full rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FAF8F5] via-[#F4EFEA] to-[#EFE8DF] border border-[#E8DFD5] flex flex-col items-center justify-center p-4 text-center select-none shadow-inner transition-colors"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-xs border border-[#EFE8DF] p-2.5 flex items-center justify-center mb-2">
                  <img 
                    src={roosLogoAnuncios} 
                    alt="ROOS Anuncios" 
                    className="w-full h-full object-contain opacity-90" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs sm:text-sm font-serif font-bold text-neutral-800 line-clamp-1 max-w-[90%]">
                  {ad.titulo}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mt-0.5">
                  {translateCategory(ad.categoria)}
                </span>
              </div>
            ) : (
              <img 
                src={getOptimizedImageUrl(ad.imagen)} 
                alt={ad.titulo}
                className="w-full h-full object-contain bg-white transition-transform duration-500 group-hover/img:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            )}
            {onViewFull && !imgError && (
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
        "flex p-2.5 xs:p-3 sm:p-4 pb-3 flex-col justify-between gap-1 w-full flex-1"
      )}>
        {/* Information */}
        <div className="flex flex-col min-w-0 overflow-hidden justify-start gap-1 flex-1">
          <div className="min-w-0 overflow-hidden">
            <div className="flex items-start justify-between mb-1 min-w-0 overflow-hidden">
              <div className="flex justify-between items-start gap-2.5 w-full min-w-0">
                {ad.logo && ad.logo.trim() && ad.logo !== ad.imagen && !logoError && (
                  <div 
                    onClick={() => onViewFull?.(ad)}
                    className="hidden md:flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden shadow-xs flex-shrink-0 bg-white border border-[#EFE8DF] cursor-pointer hover:opacity-90 transition-opacity p-0.5"
                    title={`Ver detalles de ${ad.titulo}`}
                  >
                    <img 
                      src={getOptimizedImageUrl(ad.logo)} 
                      alt="" 
                      className="w-full h-full object-contain" 
                      referrerPolicy="no-referrer" 
                      loading="lazy"
                      onError={() => setLogoError(true)}
                    />
                  </div>
                )}
                
                {/* Left side: Company name and category */}
                <div className="flex flex-col min-w-0 flex-1 overflow-hidden pr-0.5">
                  <div className="flex items-center justify-between gap-1 w-full min-h-[26px] sm:min-h-[28px]">
                    <h2 
                      onClick={() => onViewFull?.(ad)}
                      className="text-sm xs:text-base sm:text-lg font-serif font-bold leading-tight text-[#18181B] hover:text-[#E85B81] transition-colors block w-full truncate select-none cursor-pointer" 
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

                  {isOutlet ? (
                    <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap mt-1 select-none text-[10px] sm:text-xs font-sans min-w-0">
                      <span className="font-semibold text-neutral-600 shrink-0">
                        {translateCategory(ad.categoria)}
                      </span>
                      {ad.online && (
                        <span className="inline-flex items-center text-[8px] sm:text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-1.5 sm:px-2 py-0.5 rounded-full shadow-2xs shrink-0 whitespace-nowrap">
                          {ad.onlineLabel === 'Sólo online' ? t('card.onlineOnly') : (ad.onlineLabel === 'También online' ? t('card.onlineAlso') : t('card.online'))}
                        </span>
                      )}
                      {ad.internacional && (
                        <span className="inline-flex items-center text-[8px] sm:text-[9px] font-bold text-blue-800 bg-blue-50 border border-blue-200/80 px-1.5 sm:px-2 py-0.5 rounded-full shadow-2xs shrink-0 whitespace-nowrap">
                          {t('card.international')}
                        </span>
                      )}
                      {ad.proveedor && (
                        <span className="inline-flex items-center text-[8px] sm:text-[9px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-1.5 sm:px-2 py-0.5 rounded-full shadow-2xs shrink-0 whitespace-nowrap">
                          {t('card.supplier')}
                        </span>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Category and Country with Real SVG Flag (Strictly 1 line) */}
                      <div className="h-[20px] flex items-center gap-1.5 flex-nowrap mt-0.5 text-neutral-500 text-[10px] sm:text-xs font-sans font-medium w-full select-none truncate">
                        <span className="truncate">{translateCategory(ad.categoria)}</span>
                        <span className="text-neutral-300 shrink-0">·</span>
                        <span 
                          className="inline-flex items-center gap-1.5 cursor-default select-none font-semibold text-neutral-700 shrink-0" 
                          title={countryInfo.name}
                        >
                          <CountryFlag countryCode={countryInfo.code} className="w-4 h-3 sm:w-4.5 sm:h-3.5 shrink-0" title={countryInfo.name} />
                          <span className="text-[10px] sm:text-xs text-neutral-600 truncate">{countryInfo.name}</span>
                        </span>
                      </div>

                      {/* Badges row strictly in ONE single row matching reference image */}
                      <div className="h-[26px] flex items-center gap-1 sm:gap-1.5 flex-nowrap overflow-x-auto no-scrollbar mt-1.5 select-none">
                        {ad.online && (
                          <span className="inline-flex items-center text-[8px] sm:text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-1.5 sm:px-2 py-0.5 rounded-full shadow-2xs shrink-0 whitespace-nowrap">
                            {ad.onlineLabel === 'Sólo online' ? t('card.onlineOnly') : (ad.onlineLabel === 'También online' ? t('card.onlineAlso') : t('card.online'))}
                          </span>
                        )}
                        {ad.internacional && (
                          <span className="inline-flex items-center text-[8px] sm:text-[9px] font-bold text-blue-800 bg-blue-50 border border-blue-200/80 px-1.5 sm:px-2 py-0.5 rounded-full shadow-2xs shrink-0 whitespace-nowrap">
                            {t('card.international')}
                          </span>
                        )}
                        {ad.proveedor && (
                          <span className="inline-flex items-center text-[8px] sm:text-[9px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-1.5 sm:px-2 py-0.5 rounded-full shadow-2xs shrink-0 whitespace-nowrap">
                            {t('card.supplier')}
                          </span>
                        )}
                        {!isAlianzaAd && ad.precio && ad.precio.trim() && (
                          <span className="inline-flex items-center text-[8px] sm:text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300/80 px-1.5 sm:px-2 py-0.5 rounded-full shadow-2xs shrink-0 whitespace-nowrap">
                            {formatDisplayPrice(ad.precio, language)}
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  {/* For Alianza ads: Description right below badges, then price with superscript cents and static promo badge with exact sheet text */}
                  {isAlianzaAd ? (() => {
                    const displayDesc = translateOutletDescription(ad.descripcion, language);
                    const promoText = translateOutletPromo(ad.promo, language);
                    const priceRaw = (ad.precio || '').trim();

                    return (
                      <div className="flex flex-col mt-2 gap-1.5 w-full min-w-0">
                        {displayDesc && (
                          <p className="text-xs sm:text-[13px] font-medium text-neutral-800 leading-snug line-clamp-2 min-h-[2.8em] font-sans mt-0.5">
                            {displayDesc.replace(/^#+/, '').trim()}
                          </p>
                        )}

                        {(priceRaw || promoText) && (
                          <div className="flex items-center gap-2 flex-wrap w-full min-w-0 mt-1 select-none">
                            {priceRaw && (
                              <FormattedPrice 
                                price={priceRaw}
                                language={language}
                                className={cn(
                                  "font-black text-[#E85B81] font-sans tracking-tight whitespace-nowrap shrink-0 leading-none tabular-nums",
                                  isOutlet 
                                    ? "text-xl sm:text-2xl" 
                                    : "text-base sm:text-lg"
                                )}
                              />
                            )}
                            {promoText && (
                              <div 
                                className={cn(
                                  "bg-[#E85B81] text-white font-black tracking-tight shadow-2xs select-none whitespace-nowrap shrink-0 flex items-center justify-center leading-none",
                                  isOutlet
                                    ? "px-2.5 py-1 rounded-md text-xs sm:text-[13px]"
                                    : "px-2 py-0.5 rounded-md text-[10.5px] sm:text-xs"
                                )}
                                title={promoText}
                              >
                                <span>{promoText}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })() : (
                    <>
                      {/* Hashtags in fuchsia color with fixed height (36px for exactly 2 lines) */}
                      <div className="h-[36px] overflow-hidden flex flex-wrap content-start gap-x-1.5 gap-y-0.5 mt-1 text-[10.5px] xs:text-[11px] sm:text-[11.5px] font-semibold text-[#E85B81] select-none font-sans leading-tight">
                        {ad.hashtags && ad.hashtags.trim() && (
                          ad.hashtags.split(/\s+/).filter(Boolean).map((tag, i) => (
                            <span key={i} className="hover:underline cursor-default">
                              {tag.startsWith('#') ? tag : `#${tag}`}
                            </span>
                          ))
                        )}
                      </div>

                      {/* Promo info banner with scrolling news ticker text (accelerated 0.5x faster speed) */}
                      {ad.promo && ad.promo.trim() && (
                        <div 
                          className="mt-2 w-full h-[30px] overflow-hidden rounded-full bg-[#E85B81] text-white px-2.5 py-1 flex items-center gap-2 shadow-2xs select-none group/promo"
                          title={ad.promo.trim()}
                        >
                          <div className="shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#DE4B73] text-[8.5px] font-black uppercase tracking-wider shadow-2xs z-10">
                            <span className="text-[10px] leading-none">🏷️</span>
                            <span>PROMO</span>
                          </div>
                          <div className="overflow-hidden w-full relative flex items-center">
                            <div
                              className="animate-ticker-marquee flex items-center gap-6 whitespace-nowrap"
                              style={{
                                '--ticker-duration': `${Math.max(48, ad.promo.trim().length * 2.0)}s`,
                              } as React.CSSProperties}
                            >
                              {[ad.promo.trim(), ad.promo.trim(), ad.promo.trim(), ad.promo.trim()].map((promoItem, idx) => (
                                <div key={idx} className="flex items-center gap-6 shrink-0">
                                  <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-wide leading-none">
                                    {promoItem}
                                  </span>
                                  <span className="text-white/80 text-[9px] leading-none">✦</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact area and action buttons at bottom */}
          <div className="flex flex-col mt-auto pt-2 border-t border-[#EFE8DF] w-full" id="card-bottom-bar">
            {/* Dedicated "Comprar" button for Alianza ads */}
            {isAlianzaAd && webUrl && (
              <div className="w-full mb-2">
                <a
                  href={webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full py-2.5 sm:py-3 px-5 bg-[#E85B81] hover:bg-[#DE4B73] active:scale-95 text-white rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group select-none"
                  title={language === 'en' ? 'Buy' : 'Comprar'}
                  id={`buy-btn-${ad.id || ad.titulo}`}
                >
                  <span>{language === 'en' ? 'Buy' : 'Comprar'}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )}

            {(activeSocials.length > 0 || !isAlianzaAd) && (
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
              )}
            </div>
          </div>
        </div>
      </article>
    );
  });

export default AnnouncementCard;
