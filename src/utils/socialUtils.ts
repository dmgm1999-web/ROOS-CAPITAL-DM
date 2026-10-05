/**
 * Utility to parse, sanitize, and build bulletproof social media URLs.
 * Handles usernames with/without @, partial domains, wa.me/wa.link, raw phone numbers, Linktree, etc.
 * Filters out empty cells, single dots ("."), commas, dashes, and other placeholders from Google Sheets.
 */

/**
 * Validates whether a raw string from Google Sheets represents a real social network handle or link,
 * filtering out empty cells, single dots (".", ".."), dashes, "N/A", etc.
 */
export function isValidSocialRaw(val?: any): boolean {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (!trimmed) return false;

  // Exact single dot or only dots like ".", "..", "..."
  if (/^\.+$/.test(trimmed)) return false;

  // Only punctuation, whitespace, commas, dashes, slashes, quotes, asterisks: e.g. ",", "-", "--", "/", "*", ".,", `","`
  if (/^[.,\-_/\\#'"*~`\s]+$/.test(trimmed)) return false;

  // Lowercase check for common "empty / no link" placeholder indicators
  const lower = trimmed.toLowerCase();
  if (
    lower === 'n/a' || 
    lower === 'na' || 
    lower === 'none' || 
    lower === 'null' || 
    lower === 'undefined' || 
    lower === 'no' || 
    lower === 'sin' || 
    lower === 's/n' || 
    lower === 'vacio' || 
    lower === 'vacío' || 
    lower === 'no tiene' || 
    lower === 'no aplica' || 
    lower === 'x' ||
    lower === 'online' ||
    lower === 'también online' ||
    lower === 'tambien online' ||
    lower === 'solo online' ||
    lower === 'sólo online' ||
    lower === 'remoto' ||
    lower === 'presencial' ||
    lower === 'híbrido' ||
    lower === 'hibrido' ||
    lower === 'si' ||
    lower === 'sí' ||
    lower === 'yes' ||
    lower === 'internacional' ||
    lower === 'nacional' ||
    lower === 'proveedor'
  ) {
    return false;
  }

  // Must have at least one alphanumeric character
  if (!/[a-zA-Z0-9]/.test(trimmed)) {
    return false;
  }

  return true;
}

export function formatWhatsAppUrl(val?: string): string {
  if (!isValidSocialRaw(val)) return '';
  const trimmed = val!.trim();

  // Already a full WhatsApp URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    if (!trimmed.includes('wa.me') && !trimmed.includes('whatsapp.com') && !trimmed.includes('api.whatsapp.com')) {
      try {
        const u = new URL(trimmed);
        if (!u.hostname || !u.hostname.includes('.') || u.hostname.length < 4) return '';
      } catch {
        return '';
      }
    }
    return trimmed;
  }

  // Short link formats like wa.me/... or wa.link/... or api.whatsapp.com/...
  if (trimmed.startsWith('wa.me/') || trimmed.startsWith('wa.link/') || trimmed.startsWith('api.whatsapp.com/')) {
    const after = trimmed.split('/')[1] || '';
    if (!after || !/[a-zA-Z0-9]/.test(after)) return '';
    return `https://${trimmed}`;
  }

  // Raw phone number: must have at least 7 digits to be a legitimate phone number
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 7) return '';

  // If 10 digits (Standard Mexican phone number without country code), prepend Mexico code 52
  if (digitsOnly.length === 10) {
    return `https://wa.me/52${digitsOnly}`;
  }

  // If already includes international code (e.g., 52..., 1..., 34..., etc.)
  return `https://wa.me/${digitsOnly}`;
}

export function formatInstagramUrl(val?: string): string {
  if (!isValidSocialRaw(val)) return '';
  const trimmed = val!.trim();

  // If full URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const u = new URL(trimmed);
      if (!u.hostname.includes('instagram.com')) return '';
      const path = u.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
      if (!path || !/[a-zA-Z0-9_]/.test(path) || path === '.' || (path === 'p' && !u.search)) return '';
      return trimmed;
    } catch {
      return '';
    }
  }

  // If starts with domain
  if (trimmed.startsWith('instagram.com/') || trimmed.startsWith('www.instagram.com/')) {
    const full = `https://${trimmed.startsWith('www.') ? trimmed : 'www.' + trimmed}`;
    try {
      const u = new URL(full);
      const path = u.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
      if (!path || !/[a-zA-Z0-9_]/.test(path) || path === '.') return '';
      return full;
    } catch {
      return '';
    }
  }

  // Remove leading @ or /
  const cleaned = trimmed.replace(/^[@/]+/, '').trim();
  if (!cleaned || !/[a-zA-Z0-9]/.test(cleaned) || cleaned === '.' || cleaned === ',') return '';

  return `https://www.instagram.com/${cleaned}`;
}

export function formatFacebookUrl(val?: string): string {
  if (!isValidSocialRaw(val)) return '';
  const trimmed = val!.trim();

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const u = new URL(trimmed);
      if (!u.hostname.includes('facebook.com') && !u.hostname.includes('fb.com') && !u.hostname.includes('fb.me')) return '';
      const path = u.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
      if (!path || !/[a-zA-Z0-9]/.test(path) || path === '.') return '';
      return trimmed;
    } catch {
      return '';
    }
  }

  if (trimmed.startsWith('facebook.com/') || trimmed.startsWith('www.facebook.com/') || trimmed.startsWith('fb.com/') || trimmed.startsWith('fb.me/')) {
    const full = `https://${trimmed.startsWith('www.') || trimmed.startsWith('fb.') ? trimmed : 'www.' + trimmed}`;
    try {
      const u = new URL(full);
      const path = u.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
      if (!path || !/[a-zA-Z0-9]/.test(path) || path === '.') return '';
      return full;
    } catch {
      return '';
    }
  }

  const cleaned = trimmed.replace(/^[@/]+/, '').trim();
  if (!cleaned || !/[a-zA-Z0-9]/.test(cleaned) || cleaned === '.' || cleaned === ',') return '';

  return `https://www.facebook.com/${cleaned}`;
}

export function formatTikTokUrl(val?: string): string {
  if (!isValidSocialRaw(val)) return '';
  const trimmed = val!.trim();

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const u = new URL(trimmed);
      if (!u.hostname.includes('tiktok.com')) return '';
      const path = u.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
      if (!path || !/[a-zA-Z0-9]/.test(path) || path === '.') return '';
      return trimmed;
    } catch {
      return '';
    }
  }

  if (trimmed.startsWith('tiktok.com/') || trimmed.startsWith('www.tiktok.com/')) {
    const full = `https://${trimmed.startsWith('www.') ? trimmed : 'www.' + trimmed}`;
    try {
      const u = new URL(full);
      const path = u.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
      if (!path || !/[a-zA-Z0-9]/.test(path) || path === '.') return '';
      return full;
    } catch {
      return '';
    }
  }

  const cleaned = trimmed.replace(/^[@/]+/, '').trim();
  if (!cleaned || !/[a-zA-Z0-9]/.test(cleaned) || cleaned === '.' || cleaned === ',') return '';

  return `https://www.tiktok.com/@${cleaned}`;
}

export function formatTwitterUrl(val?: string): string {
  if (!isValidSocialRaw(val)) return '';
  const trimmed = val!.trim();

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const u = new URL(trimmed);
      if (!u.hostname.includes('x.com') && !u.hostname.includes('twitter.com')) return '';
      const path = u.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
      if (!path || !/[a-zA-Z0-9]/.test(path) || path === '.') return '';
      return trimmed;
    } catch {
      return '';
    }
  }

  if (trimmed.startsWith('x.com/') || trimmed.startsWith('twitter.com/')) {
    return `https://${trimmed}`;
  }

  const cleaned = trimmed.replace(/^[@/]+/, '').trim();
  if (!cleaned || !/[a-zA-Z0-9]/.test(cleaned) || cleaned === '.' || cleaned === ',') return '';

  return `https://x.com/${cleaned}`;
}

export function formatLinkedInUrl(val?: string): string {
  if (!isValidSocialRaw(val)) return '';
  const trimmed = val!.trim();

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const u = new URL(trimmed);
      if (!u.hostname.includes('linkedin.com')) return '';
      const path = u.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
      if (!path || !/[a-zA-Z0-9]/.test(path) || path === '.') return '';
      return trimmed;
    } catch {
      return '';
    }
  }

  if (trimmed.startsWith('linkedin.com/') || trimmed.startsWith('www.linkedin.com/')) {
    return `https://${trimmed}`;
  }

  const cleaned = trimmed.replace(/^[@/]+/, '').trim();
  if (!cleaned || !/[a-zA-Z0-9]/.test(cleaned) || cleaned === '.' || cleaned === ',') return '';

  return `https://www.linkedin.com/in/${cleaned}`;
}

export function formatWebUrl(val?: string): string {
  if (!isValidSocialRaw(val)) return '';
  const trimmed = val!.trim();

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const u = new URL(trimmed);
      // Hostname must exist, have at least one dot, and not be just "."
      if (!u.hostname || !u.hostname.includes('.') || u.hostname.length < 4 || !/[a-zA-Z0-9]/.test(u.hostname)) {
        return '';
      }
      return trimmed;
    } catch {
      return '';
    }
  }

  // Prepend https:// for domains (e.g. mitienda.com, linktr.ee/..., etc.)
  // Must contain a dot between alphanumeric characters (e.g. "paar.mx" or "motionalmuse.com")
  if (!/[a-zA-Z0-9-]+\.[a-zA-Z0-9]{2,}/.test(trimmed)) {
    return '';
  }

  try {
    const full = `https://${trimmed}`;
    const u = new URL(full);
    if (!u.hostname || !u.hostname.includes('.') || u.hostname.length < 4) return '';
    return full;
  } catch {
    return '';
  }
}

export function formatPhoneUrl(val?: string): string {
  if (!isValidSocialRaw(val)) return '';
  const digitsOnly = val!.replace(/\D/g, '');
  if (digitsOnly.length < 7) return '';
  return `tel:${digitsOnly}`;
}

export function formatWeiboUrl(val?: string): string {
  if (!isValidSocialRaw(val)) return '';
  const trimmed = val!.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://weibo.com/n/${trimmed.replace(/^[@/]+/, '')}`;
}

export function formatXiaohongshuUrl(val?: string): string {
  if (!isValidSocialRaw(val)) return '';
  const trimmed = val!.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://www.xiaohongshu.com/user/profile/${trimmed.replace(/^[@/]+/, '')}`;
}

export function formatDouyinUrl(val?: string): string {
  if (!isValidSocialRaw(val)) return '';
  const trimmed = val!.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://www.douyin.com/user/${trimmed.replace(/^[@/]+/, '')}`;
}

export function formatLineUrl(val?: string): string {
  if (!isValidSocialRaw(val)) return '';
  const trimmed = val!.trim();

  // If full URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    if (trimmed.includes('line.me') || trimmed.includes('lin.ee')) {
      return trimmed;
    }
    return '';
  }

  if (trimmed.startsWith('line.me/') || trimmed.startsWith('lin.ee/')) {
    return `https://${trimmed}`;
  }

  // A Line ID cannot have spaces or be non-ID text (e.g. "También Online")
  if (trimmed.includes(' ')) return '';

  const clean = trimmed.replace(/^[@/]+/, '');
  if (!clean || !/^[a-zA-Z0-9_.-]{3,50}$/.test(clean)) return '';

  return `https://line.me/R/ti/p/@${clean}`;
}

export function formatKakaoUrl(val?: string): string {
  if (!isValidSocialRaw(val)) return '';
  const trimmed = val!.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://pf.kakao.com/${trimmed.replace(/^[@/]+/, '')}`;
}

export function formatWeChatUrl(val?: string): string {
  if (!isValidSocialRaw(val)) return '';
  const trimmed = val!.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('weixin://')) {
    return trimmed;
  }
  if (trimmed.includes(' ')) return '';
  const clean = trimmed.replace(/^[@/]+/, '');
  if (!clean || !/^[a-zA-Z0-9_.-]{2,50}$/.test(clean)) return '';
  return `weixin://dl/chat?${clean}`;
}

