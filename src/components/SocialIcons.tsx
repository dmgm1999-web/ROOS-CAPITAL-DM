import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

export interface SocialIconProps {
  className?: string;
}

/** WhatsApp Icon combining message circle + phone */
export const WhatsAppIcon: React.FC<SocialIconProps> = ({ className = "w-4 h-4" }) => (
  <div className={`relative flex-shrink-0 ${className}`}>
    <MessageCircle className="absolute inset-0 w-full h-full" />
    <Phone className="absolute w-[44%] h-[44%] text-current left-[28%] top-[25%] rotate-[10deg]" />
  </div>
);

/** TikTok Icon */
export const TikTokIcon: React.FC<SocialIconProps> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`flex-shrink-0 ${className}`}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-5.48 2.08 6.34 6.34 0 0 0 4.62 10.5c3.5 0 6.34-2.84 6.34-6.33V8.89a8.28 8.28 0 0 0 3.77.9V6.69z"/>
  </svg>
);

/** Sina Weibo Icon (China) */
export const WeiboIcon: React.FC<SocialIconProps> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`flex-shrink-0 ${className}`}
  >
    <path d="M10.1 19.8c-4.4 0-8-2.6-8-5.8 0-3.3 3.7-5.9 8.2-5.9 4.4 0 7.9 2.6 7.9 5.8.1 3.3-3.6 5.9-8.1 5.9zm5.7-6.9c-.2-.6-.8-.8-1.5-.6-.7.3-1.1.9-.9 1.5.2.6.8.8 1.5.6.7-.2 1.1-.9.9-1.5zm-5 4.3c-2.4 0-4.3-1.4-4.3-3.1 0-1.7 2-3.1 4.3-3.1s4.3 1.4 4.3 3.1c0 1.7-1.9 3.1-4.3 3.1zm1.2-4.7c-.3-.4-1-.5-1.5-.1-.5.3-.7.9-.4 1.4.3.4 1 .5 1.5.1.5-.4.7-1 .4-1.4zm9.3-5.2c-.3-.2-.7-.2-.9.1-.2.3-.2.7.1.9 1 1 1.3 2.4.9 3.6-.1.4.1.8.5.9.4.1.8-.1.9-.5.5-1.6.2-3.4-1.1-4.7l-.4-.3zm-2.4 1.3c-.3-.3-.8-.3-1.1 0-.3.3-.3.8 0 1.1.5.5.7 1.2.5 1.8-.1.4.2.8.6.9.4.1.8-.2.9-.6.2-.9 0-1.9-.7-2.6l-.2-.6z"/>
  </svg>
);

/** Xiaohongshu / RED Icon (China - 小红书) */
export const RedIcon: React.FC<SocialIconProps> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`flex-shrink-0 ${className}`}
  >
    <rect x="2" y="3" width="20" height="18" rx="5" fill="currentColor" fillOpacity="0.15" />
    <path d="M6 7.5h2.8c1.3 0 2.2.7 2.2 1.8 0 .8-.5 1.4-1.2 1.6.9.3 1.4 1 1.4 1.9 0 1.2-1 2.2-2.4 2.2H6V7.5zm1.5 3h1.2c.5 0 .9-.3.9-.8 0-.5-.4-.8-.9-.8H7.5v1.6zm0 3.1h1.3c.6 0 1-.3 1-.9 0-.6-.4-.9-1-.9H7.5v1.8z" />
    <path d="M12.8 7.5h3.8v1.4h-2.3v1.7h2v1.4h-2v1.6h2.4v1.4h-3.9V7.5z" />
    <path d="M17.8 7.5h2.2c1.7 0 2.8 1.4 2.8 3.8s-1.1 3.7-2.8 3.7h-2.2V7.5zm1.5 6.1h.6c1 0 1.5-.9 1.5-2.3s-.6-2.4-1.5-2.4h-.6v4.7z" />
  </svg>
);

/** Douyin Icon (China - 抖音) */
export const DouyinIcon: React.FC<SocialIconProps> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`flex-shrink-0 ${className}`}
  >
    <path d="M19 7.5a5.5 5.5 0 0 1-3.8-1.5v9.2a5.7 5.7 0 1 1-5.7-5.7c.3 0 .7 0 1 .1V12a3.3 3.3 0 1 0 2.3 3.2V2h2.4A5.5 5.5 0 0 0 19 6v1.5z"/>
  </svg>
);

/** WeChat Icon (China - 微信) */
export const WeChatIcon: React.FC<SocialIconProps> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`flex-shrink-0 ${className}`}
  >
    <path d="M8.5 3C4.4 3 1 6 1 9.8c0 2.2 1.1 4.1 3 5.4L3 18l3.1-1.5c.7.2 1.5.3 2.4.3.3 0 .6 0 .9-.1-.2-.6-.4-1.3-.4-2 0-3.6 3.4-6.5 7.5-6.5.6 0 1.2.1 1.8.2C17.3 5.3 13.3 3 8.5 3zm-2.2 4.5c.7 0 1.2.6 1.2 1.2 0 .7-.5 1.2-1.2 1.2s-1.2-.5-1.2-1.2c0-.7.5-1.2 1.2-1.2zm4.5 0c.7 0 1.2.6 1.2 1.2 0 .7-.5 1.2-1.2 1.2s-1.2-.5-1.2-1.2c0-.7.5-1.2 1.2-1.2zM16 10c-3.6 0-6.5 2.5-6.5 5.5 0 3.1 2.9 5.5 6.5 5.5.7 0 1.4-.1 2-.3L21 22l-.9-2.2c1.7-1 2.9-2.5 2.9-4.3 0-3-2.9-5.5-6.5-5.5zm-2 3.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm4 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"/>
  </svg>
);

/** LINE Icon (Japan / Asia) */
export const LineIcon: React.FC<SocialIconProps> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`flex-shrink-0 ${className}`}
  >
    <path d="M19.36 10.04C19.36 5.6 15.68 2 11.18 2 6.68 2 3 5.6 3 10.04c0 3.96 3.14 7.27 7.37 7.91.29.06.68.19.78.44.09.22.06.57.03.8-.05.34-.23 1.34-.26 1.53-.08.47-.28 1.46.64.8 1.08-.77 5.84-3.44 7.97-5.89 1.4-1.57 2.19-3.23 2.19-5.28l-.36-.31zm-11.45 2.5h-1.3v-3.7h1.3v3.7zm2.74 0h-2.35v-3.7h1.27v2.43h1.08v1.27zm3.17 0h-1.23l-1.39-1.92v1.92h-1.27v-3.7h1.22l1.41 1.95V8.84h1.26v3.7zm3.15-2.43h-1.12v1.16h1.12v1.27h-2.39v-3.7h2.39v1.27z"/>
  </svg>
);

/** KakaoTalk Icon (South Korea) */
export const KakaoIcon: React.FC<SocialIconProps> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`flex-shrink-0 ${className}`}
  >
    <path d="M12 3C6.48 3 2 6.58 2 11c0 2.82 1.84 5.3 4.64 6.72-.18.66-.66 2.4-.76 2.78-.12.48.17.47.37.34.15-.1 2.44-1.66 3.44-2.34.74.1 1.52.16 2.31.16 5.52 0 10-3.58 10-8s-4.48-8-10-8zm-4.7 9.3c-.45 0-.82-.37-.82-.82V8.92c0-.45.37-.82.82-.82s.82.37.82.82v1.74h1.2c.45 0 .82.37.82.82s-.37.82-.82.82H7.3zm4.2 0c-.45 0-.82-.37-.82-.82V8.92c0-.45.37-.82.82-.82s.82.37.82.82v2.56c0 .45-.37.82-.82.82zm3.88 0c-.3 0-.58-.17-.72-.44l-1.46-2.2v1.82c0 .45-.37.82-.82.82s-.82-.37-.82-.82V8.92c0-.45.37-.82.82-.82.3 0 .58.17.72.44l1.46 2.2V8.92c0-.45.37-.82.82-.82s.82.37.82.82v2.56c0 .45-.37.82-.82.82z"/>
  </svg>
);

/** X / Twitter Icon */
export const XTwitterIcon: React.FC<SocialIconProps> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`flex-shrink-0 ${className}`}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
