/**
 * Utility to extract and format promotional discounts / percentages.
 * Designed for alliance ads and compact badge rendering.
 */
export function extractPromoPercentage(promo: string | undefined | null): string {
  if (!promo || typeof promo !== 'string') return '';
  const trimmed = promo.trim();
  if (!trimmed) return '';

  // 1. Match percentage formats: e.g. "33%", "-33%", "+15%", "%54", "33.5%", "33 %"
  const suffixMatch = trimmed.match(/([+-]?\d+(?:[.,]\d+)?)\s*%/);
  if (suffixMatch && suffixMatch[1]) {
    return `${suffixMatch[1].trim()}%`;
  }

  const prefixMatch = trimmed.match(/%\s*([+-]?\d+(?:[.,]\d+)?)/);
  if (prefixMatch && prefixMatch[1]) {
    return `${prefixMatch[1].trim()}%`;
  }

  // 2. Short deals like "2x1", "3x2"
  if (/^\d+\s*x\s*\d+$/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  // 3. If no percentage or short promo deal, remove emojis, icons and the word "promo"
  const clean = trimmed
    .replace(/[🏷️✨🔥🎉✦]/g, '')
    .replace(/\bpromo(?:ci[oó]n)?\b/gi, '')
    .trim();

  // If after cleaning it is short enough to be a discount code/tag (<= 12 chars), return it
  if (clean.length <= 12) {
    return clean;
  }

  return '';
}
