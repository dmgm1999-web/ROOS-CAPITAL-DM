/**
 * ROOS Capital - Favorites & Personal Key System
 * Standard format: ROOS-XXXX-FAVS (4 random alphanumeric characters)
 * 100% free, zero external databases or paid APIs needed.
 */

const STORAGE_KEY = 'roos_favorites';
const DEVICE_CODE_KEY = 'roos_personal_code';
const CODE_PREFIX_KEY = 'roos_favs_';

export function getCardKey(ad: { id?: string; titulo?: string }): string {
  if (ad.id && ad.id.trim()) {
    return ad.id.trim();
  }
  return (ad.titulo || '').trim().toLowerCase();
}

/**
 * Generate random alphanumeric characters from all 36 possibilities (0-9 and A-Z).
 * Supports length 4 (1.67M combinations: 36^4) and length 8 (2.82 Trillion combinations: 36^8).
 */
export function generateRandomCodeSegment(length: 4 | 8 = 4): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let res = '';
  for (let i = 0; i < length; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

export function generateRandom4Code(): string {
  return generateRandomCodeSegment(4);
}

export function generateRandom8Code(): string {
  return generateRandomCodeSegment(8);
}

/**
 * Validates strict format requirement: ROOS-XXXX-FAVS (4 chars) or ROOS-XXXXXXXX-FAVS (8 chars)
 */
export function isValidStrictRoosCode(raw: string): boolean {
  if (!raw) return false;
  return /^ROOS-([A-Za-z0-9]{4}|[A-Za-z0-9]{8})-FAVS$/.test(raw.trim());
}

/**
 * Normalizes user input into ROOS-XXXX-FAVS or ROOS-XXXXXXXX-FAVS only if it strictly matches.
 */
export function normalizeRoosCode(raw: string): string {
  if (!raw) return '';
  const clean = raw.trim().toUpperCase();
  if (/^ROOS-([A-Z0-9]{4}|[A-Z0-9]{8})-FAVS$/.test(clean)) {
    return clean;
  }
  return '';
}

/**
 * Gets or initializes the unique personal code for this device.
 * Defaults to 4 characters (1.67M combinations) and can scale to 8 characters (2.82 Billions).
 */
export function getDevicePersonalCode(prefer8Chars = false): string {
  try {
    const existing = localStorage.getItem(DEVICE_CODE_KEY);
    if (existing) {
      const normalized = normalizeRoosCode(existing);
      if (normalized) {
        return normalized;
      }
    }
    const newCode = `ROOS-${prefer8Chars ? generateRandom8Code() : generateRandom4Code()}-FAVS`;
    localStorage.setItem(DEVICE_CODE_KEY, newCode);
    return newCode;
  } catch (e) {
    return 'ROOS-8K2P-FAVS';
  }
}

/**
 * Set current active personal code on device
 */
export function setDevicePersonalCode(code: string): void {
  try {
    const normalized = normalizeRoosCode(code);
    if (normalized) {
      localStorage.setItem(DEVICE_CODE_KEY, normalized);
    }
  } catch (e) {}
}

export function loadStoredFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save favorites to local storage and sync to local express server
 */
export function saveStoredFavorites(favorites: string[], code?: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));

    const activeCode = normalizeRoosCode(code || getDevicePersonalCode());
    if (activeCode) {
      localStorage.setItem(`${CODE_PREFIX_KEY}${activeCode}`, JSON.stringify(favorites));

      // Asynchronously sync to local Express server so it works across devices
      fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: activeCode, favorites })
      }).catch(() => {});
    }
  } catch (e) {
    console.error('Error saving favorites:', e);
  }
}

/**
 * Loads favorites associated with a code from local cache or server
 */
export async function fetchFavoritesByCode(rawCode: string): Promise<string[] | null> {
  if (!rawCode || !rawCode.trim()) return null;
  const normalized = normalizeRoosCode(rawCode);

  // 1. Check local storage cache for this code
  try {
    const localRaw = localStorage.getItem(`${CODE_PREFIX_KEY}${normalized}`);
    if (localRaw) {
      const parsed = JSON.parse(localRaw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {}

  // 2. Query local server /api/favorites
  try {
    const res = await fetch(`/api/favorites?code=${encodeURIComponent(normalized)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.favorites) && data.favorites.length > 0) {
        // Cache locally
        try {
          localStorage.setItem(`${CODE_PREFIX_KEY}${normalized}`, JSON.stringify(data.favorites));
        } catch (e) {}
        return data.favorites;
      }
    }
  } catch (e) {}

  // 3. Fallback: if user entered legacy base64 format or comma-separated list
  const decodedLegacy = decodeLegacyCode(rawCode);
  if (decodedLegacy && decodedLegacy.length > 0) {
    return decodedLegacy;
  }

  return null;
}

/**
 * Legacy decode fallback in case any previous base64 link was saved
 */
function decodeLegacyCode(rawInput: string): string[] | null {
  try {
    const clean = rawInput.trim().replace(/^ROOS-?/i, '');
    const decodedStr = decodeURIComponent(
      Array.prototype.map.call(atob(clean), (c: string) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );
    const parsed = JSON.parse(decodedStr);
    if (parsed && Array.isArray(parsed.f)) {
      return parsed.f;
    }
  } catch (e) {}
  return null;
}

export function decodeBackupKey(rawInput: string): { email?: string; favorites: string[] } | null {
  const norm = normalizeRoosCode(rawInput);
  try {
    const localRaw = localStorage.getItem(`${CODE_PREFIX_KEY}${norm}`);
    if (localRaw) {
      const parsed = JSON.parse(localRaw);
      if (Array.isArray(parsed)) return { favorites: parsed };
    }
  } catch (e) {}

  const leg = decodeLegacyCode(rawInput);
  if (leg) return { favorites: leg };

  return null;
}

export function encodeBackupKey(favorites: string[]): string {
  // Always return the standard ROOS-XXXX-FAVS structure requested by the user
  const code = getDevicePersonalCode();
  // Ensure current favorites are synced under this code
  try {
    localStorage.setItem(`${CODE_PREFIX_KEY}${code}`, JSON.stringify(favorites));
    fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, favorites })
    }).catch(() => {});
  } catch (e) {}
  return code;
}

export function getWhatsAppBackupLink(code: string): string {
  const cleanCode = normalizeRoosCode(code) || getDevicePersonalCode();
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://rooscapital.mx';
  const text = `Hola! Aquí tienes tu Clave Personal de Favoritas en ROOS: ${cleanCode}\nAccede desde cualquier dispositivo con tu clave en: ${origin}/?code=${cleanCode} ♥`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
