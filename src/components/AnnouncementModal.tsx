import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  MapPin, 
  Globe, 
  Laptop,
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Sparkles,
  Building2,
  Tag
} from 'lucide-react';
import { Announcement } from '../App';
import { getOptimizedImageUrl } from '../utils/imageUtils';
import { useLanguage } from '../context/LanguageContext';
import { CountryFlag, getCountryInfo, translateCountryName } from '../utils/countryUtils';
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
  WhatsAppIcon, 
  TikTokIcon, 
  WeiboIcon, 
  RedIcon, 
  DouyinIcon, 
  LineIcon, 
  KakaoIcon, 
  WeChatIcon 
} from './SocialIcons';

interface AnnouncementModalProps {
  ad: Announcement | null;
  onClose: () => void;
}

export default function AnnouncementModal({ ad, onClose }: AnnouncementModalProps) {
  const { t, translateCategory, language } = useLanguage();
  const [imgError, setImgError] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (ad) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [ad]);

  if (!ad) return null;

  const isTopSocio = ad.socio?.toLowerCase().includes('top') || ad.socio?.toLowerCase().includes('vip');
  const isTrending = ad.socio?.toLowerCase().includes('tendencia') || ad.categoria?.toLowerCase().includes('tendencia');

  const rawImg = ad.imagen && ad.imagen.trim() ? ad.imagen : (ad.logo && ad.logo.trim() ? ad.logo : '');
  const optimizedImgUrl = getOptimizedImageUrl(rawImg);

  const whatsappUrl = formatWhatsAppUrl(ad.whatsapp);
  const instagramUrl = formatInstagramUrl(ad.instagram);
  const facebookUrl = formatFacebookUrl(ad.facebook);
  const tiktokUrl = formatTikTokUrl(ad.tiktok);
  const twitterUrl = formatTwitterUrl(ad.twitter);
  const linkedinUrl = formatLinkedInUrl(ad.linkedin);
  const weiboUrl = formatWeiboUrl(ad.weibo);
  const xiaohongshuUrl = formatXiaohongshuUrl(ad.xiaohongshu);
  const douyinUrl = formatDouyinUrl(ad.douyin);
  const lineUrl = formatLineUrl(ad.line);
  const kakaoUrl = formatKakaoUrl(ad.kakao);
  const wechatUrl = formatWeChatUrl(ad.wechat);
  const webUrl = formatWebUrl(ad.web);

  const socials = [
    { key: 'whatsapp', label: 'WhatsApp', icon: WhatsAppIcon, url: whatsappUrl, color: 'hover:bg-emerald-500 hover:text-white' },
    { key: 'instagram', label: 'Instagram', icon: Instagram, url: instagramUrl, color: 'hover:bg-gradient-to-tr hover:from-amber-500 hover:to-fuchsia-600 hover:text-white' },
    { key: 'facebook', label: 'Facebook', icon: Facebook, url: facebookUrl, color: 'hover:bg-blue-600 hover:text-white' },
    { key: 'tiktok', label: 'TikTok', icon: TikTokIcon, url: tiktokUrl, color: 'hover:bg-black hover:text-white' },
    { key: 'twitter', label: 'Twitter / X', icon: Twitter, url: twitterUrl, color: 'hover:bg-neutral-900 hover:text-white' },
    { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, url: linkedinUrl, color: 'hover:bg-blue-700 hover:text-white' },
    { key: 'weibo', label: 'Weibo', icon: WeiboIcon, url: weiboUrl, color: 'hover:bg-[#E6162D] hover:text-white' },
    { key: 'xiaohongshu', label: 'RED (小红书)', icon: RedIcon, url: xiaohongshuUrl, color: 'hover:bg-[#FF2442] hover:text-white' },
    { key: 'douyin', label: 'Douyin', icon: DouyinIcon, url: douyinUrl, color: 'hover:bg-black hover:text-white' },
    { key: 'line', label: 'LINE', icon: LineIcon, url: lineUrl, color: 'hover:bg-[#00B900] hover:text-white' },
    { key: 'kakao', label: 'KakaoTalk', icon: KakaoIcon, url: kakaoUrl, color: 'hover:bg-[#FEE500] hover:text-black' },
    { key: 'wechat', label: ad.wechat && !ad.wechat.startsWith('http') ? `WeChat: ${ad.wechat}` : 'WeChat', icon: WeChatIcon, url: wechatUrl, color: 'hover:bg-[#07C160] hover:text-white' },
    { key: 'web', label: 'Sitio Web', icon: Globe, url: webUrl, color: 'hover:bg-brand-orange hover:text-white' },
  ].filter(s => Boolean(s.url && s.url.trim()));

  const countryInfo = getCountryInfo(ad.extractedCountry || ad.pais, ad.extractedState || ad.estado, ad.extractedMunicipio || ad.municipio, language);

  const locationParts = [
    ad.ciudad || ad.municipio, 
    ad.estado, 
    ad.pais ? translateCountryName(ad.pais, language) : ''
  ]
    .filter(Boolean)
    .map(s => String(s).replace(/^[-–—\s]+/, '').trim())
    .map(part => translateCountryName(part, language))
    .filter(s => {
      const lower = s.toLowerCase();
      return (
        lower !== 'si' && 
        lower !== 'sí' && 
        lower !== 'yes' && 
        lower !== 'no' && 
        lower !== 'internacional' && 
        lower !== 'online' && 
        lower !== 'remoto' && 
        lower !== '-' &&
        !lower.includes('también online') &&
        !lower.includes('tambien online') &&
        !lower.includes('sólo online') &&
        !lower.includes('solo online')
      );
    })
    .filter((part, idx, arr) => 
      part.length > 0 && 
      arr.findIndex(p => p.toLowerCase() === part.toLowerCase()) === idx
    );
  const locationText = locationParts.join(', ');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 select-none overflow-y-auto"
      onClick={onClose}
      id="announcement-modal-backdrop"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative bg-white text-neutral-900 rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-brand-orange/20 max-w-4xl w-full max-h-[94vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
        id="announcement-modal-card"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-brand-wine/10 bg-white/95 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 pr-2">
            {ad.logo && (
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-brand-orange/30 shadow-xs bg-white flex-shrink-0">
                <img 
                  src={getOptimizedImageUrl(ad.logo)} 
                  alt={ad.titulo} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm sm:text-lg md:text-xl font-extrabold text-brand-wine uppercase tracking-tight truncate max-w-[200px] xs:max-w-[280px] sm:max-w-md">
                  {ad.titulo}
                </h2>
                {isTopSocio && (
                  <span className="bg-brand-orange text-white text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> {t('card.topSocio')}
                  </span>
                )}
                {isTrending && !isTopSocio && (
                  <span className="bg-amber-500 text-white text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                    🔥 {t('card.trending')}
                  </span>
                )}
              </div>
              <div className="flex items-center flex-wrap gap-2 text-xs text-brand-wine/65 mt-0.5">
                <span className="font-semibold uppercase tracking-wider text-[9px] sm:text-xs">
                  {translateCategory(ad.categoria)}
                </span>
                {ad.proveedor && (
                  <span className="inline-flex items-center text-[7.5px] sm:text-[8.5px] font-bold text-orange-700 bg-orange-50 border border-orange-200/60 px-1.5 py-0.5 rounded uppercase">
                    {t('card.supplier')}
                  </span>
                )}
                {ad.online && (
                  <span 
                    title={ad.onlineLabel === 'Sólo online' ? t('card.onlineOnly') : t('card.onlineAlso')}
                    aria-label={ad.onlineLabel === 'Sólo online' ? t('card.onlineOnly') : t('card.onlineAlso')}
                    className="inline-flex items-center text-[7.5px] sm:text-[8.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded"
                    id="modal-header-icon-online"
                  >
                    <Laptop className="w-3 h-3 mr-1 shrink-0" />
                    {ad.onlineLabel === 'Sólo online' ? t('card.onlineOnly') : t('card.onlineAlso')}
                  </span>
                )}
                {ad.internacional && (
                  <span 
                    title={t('card.international')}
                    aria-label={t('card.international')}
                    className="inline-flex items-center text-[7.5px] sm:text-[8.5px] font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-1.5 py-0.5 rounded"
                    id="modal-header-icon-internacional"
                  >
                    <Globe className="w-3 h-3 mr-1 shrink-0" />
                    {t('card.international')}
                  </span>
                )}
                {locationText && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-[9px] sm:text-xs truncate">
                      <CountryFlag countryCode={countryInfo.code} className="w-3.5 h-2.5 sm:w-4 sm:h-3 shrink-0" title={countryInfo.name} />
                      <MapPin className="w-3 h-3 text-brand-orange shrink-0" />
                      {locationText}
                    </span>
                  </>
                )}
              </div>
              {ad.promo && ad.promo.trim() && (
                <div className="mt-1.5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-[#943D4E] bg-brand-orange/20 border border-[#E2A7B5]/60 px-2.5 py-0.5 rounded-full shadow-2xs">
                    <Tag className="w-3 h-3 text-[#943D4E] shrink-0" />
                    <span>{ad.promo.trim()}</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Top Actions: Close Button */}
          <div className="flex items-center shrink-0">
            <button
              onClick={onClose}
              title="Cerrar (Esc)"
              className="p-2 sm:p-2.5 rounded-full bg-neutral-100 hover:bg-rose-100 text-brand-wine hover:text-rose-700 transition-all duration-200"
              id="announcement-modal-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content (Image + Description) */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-neutral-900/5 flex flex-col items-center justify-center min-h-[220px]">
          {optimizedImgUrl && !imgError ? (
            <div className="relative w-full flex items-center justify-center">
              <img
                src={optimizedImgUrl}
                alt={ad.titulo}
                className="max-h-[60vh] sm:max-h-[68vh] md:max-h-[72vh] w-auto max-w-full object-contain rounded-2xl shadow-xl transition-all duration-300 select-none"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div className="p-8 text-center flex flex-col items-center justify-center max-w-md">
              <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-3">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-brand-wine mb-1">{ad.titulo}</h3>
              <p className="text-xs text-brand-wine/60 uppercase font-semibold tracking-wider mb-4">{translateCategory(ad.categoria)}</p>
              {ad.descripcion && (
                <p className="text-sm italic text-neutral-700 bg-white p-4 rounded-2xl border border-brand-wine/10 shadow-xs">
                  "{ad.descripcion}"
                </p>
              )}
            </div>
          )}

          {/* Description banner if present below image */}
          {optimizedImgUrl && !imgError && ad.descripcion && (
            <div className="mt-4 w-full max-w-2xl bg-white/90 backdrop-blur-sm border border-brand-wine/10 p-4 rounded-2xl shadow-xs text-center">
              <span className="block text-[9px] font-black uppercase tracking-widest text-brand-orange mb-1">
                {t('modal.announcementInfo')}
              </span>
              <p className="text-xs sm:text-sm italic text-neutral-700 font-serif leading-relaxed">
                "{ad.descripcion}"
              </p>
            </div>
          )}
        </div>

        {/* Bottom Social Bar */}
        {socials.length > 0 && (
          <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-white border-t border-brand-wine/10 flex items-center justify-center gap-3 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 justify-center flex-wrap">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-brand-wine/50 hidden xs:inline">
                {t('modal.contact')}
              </span>
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-100 text-brand-wine border border-neutral-200 transition-all duration-200 hover:scale-105 shadow-xs ${s.color}`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
