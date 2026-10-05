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
