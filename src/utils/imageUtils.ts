/**
 * Utility to optimize and safely format image URLs.
 * Supports direct web URLs, raw GitHub content, Google Drive preview links, Dropbox links, and local assets.
 * Automatically cleans special characters and encodes spaces/plus symbols.
 */
export function getOptimizedImageUrl(rawUrl?: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  let url = rawUrl.trim();
  if (!url) return '';

  // Remove wrapping quotes if present
  url = url.replace(/^["']|["']$/g, '').trim();

  // If it's already a data: or blob: URL, return as-is
  if (url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  // If it's a relative path (e.g. /assets/...), return as-is
  if (url.startsWith('/') && !url.startsWith('//')) {
    return url;
  }

  // Convert Google Drive view/share/open links to direct high-speed CDN image URLs
  if (url.includes('drive.google.com') || url.includes('docs.google.com')) {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
                  url.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
                  url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }

  // Convert Dropbox share links to raw direct link
  if (url.includes('dropbox.com')) {
    return url.replace(/[?&]dl=0/, '?raw=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com');
  }

  // Clean URL spaces and plus signs to %20
  url = url.replace(/ /g, '%20').replace(/\+/g, '%20');

  return url;
}

/**
 * Checks if a string is a valid image URL (accepting any external image URL while strictly
 * rejecting social network profiles, whatsapp links, phone numbers, and non-image domains).
 */
export function isLikelyImageUrl(rawUrl?: string): boolean {
  if (!rawUrl || typeof rawUrl !== 'string') return false;
  const url = rawUrl.trim().replace(/^["']|["']$/g, '');
  if (!url || url.length < 5) return false;

  if (url.startsWith('data:image/') || url.startsWith('blob:')) return true;

  const lower = url.toLowerCase();

  // Exclude social networks, messaging apps, and generic document/form links
  if (
    lower.includes('wa.me') ||
    lower.includes('whatsapp.com') ||
    lower.includes('facebook.com') ||
    lower.includes('fb.me') ||
    lower.includes('fb.com') ||
    lower.includes('instagram.com') ||
    lower.includes('tiktok.com') ||
    lower.includes('twitter.com') ||
    lower.includes('x.com/') ||
    lower.includes('linkedin.com') ||
    lower.includes('weibo.com') ||
    lower.includes('xiaohongshu.com') ||
    lower.includes('xhslink') ||
    lower.includes('douyin.com') ||
    lower.includes('lin.ee') ||
    lower.includes('line.me') ||
    lower.includes('kakao.com') ||
    lower.includes('weixin') ||
    lower.includes('wechat') ||
    lower.includes('forms.gle') ||
    lower.includes('docs.google.com/forms') ||
    lower.includes('google.com/maps')
  ) {
    return false;
  }

  // Must be a valid web URL or asset path
  if (!lower.startsWith('http://') && !lower.startsWith('https://') && !lower.startsWith('//') && !lower.startsWith('/')) {
    return false;
  }

  return true;
}

/**
 * Checks if an unlabelled/generic cell value clearly represents an image (contains image extensions or is hosted on known image storage).
 * Used when scanning general columns so that website links like "https://example.com" are not mistaken for images.
 */
export function isExplicitImageUrl(rawUrl?: string): boolean {
  if (!isLikelyImageUrl(rawUrl)) return false;
  const lower = (rawUrl || '').toLowerCase();

  return (
    Boolean(lower.match(/\.(png|jpg|jpeg|webp|gif|svg|avif|bmp|ico)(\?.*)?$/)) ||
    lower.includes('drive.google.com') ||
    lower.includes('googleusercontent.com') ||
    lower.includes('dropbox.com') ||
    lower.includes('raw.githubusercontent.com') ||
    lower.includes('cloudinary.com') ||
    lower.includes('images.unsplash.com') ||
    lower.includes('/assets/images/') ||
    lower.includes('/images/') ||
    lower.includes('/img/')
  );
}
