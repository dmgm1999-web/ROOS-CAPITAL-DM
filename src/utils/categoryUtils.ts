/**
 * Canonical category utility for ROOS Capital.
 * Automatically normalizes raw multi-word categories into concise, clean canonical categories
 * based on the first word rule (e.g. "Joyería y Accesorios" -> "Joyería", "Calzado Femenino" -> "Calzado").
 */

export function getCanonicalCategory(raw?: string): string {
  if (!raw || !raw.trim()) return 'General';
  const s = raw.trim();
  const lower = s.toLowerCase();

  // High-priority canonical categorizations based on the first word / core concept
  if (lower.startsWith('joyer') || lower.includes('alta joyer') || lower.includes('joyería') || lower.includes('joyeria')) {
    return 'Joyería';
  }
  if (lower.startsWith('fashion') || lower.startsWith('moda') || lower.includes('boutique') || lower.includes('prêt-à-porter') || lower.includes('pret-a-porter')) {
    return 'Moda';
  }
  if (lower.startsWith('calzado') || lower.startsWith('zapater') || lower.startsWith('zapato')) {
    return 'Calzado';
  }
  if (lower.startsWith('cuidado') || lower.includes('cuidado personal') || lower.includes('cuidado de la piel') || lower.includes('skincare')) {
    return 'Cuidado Personal';
  }
  if (lower.startsWith('cosm') || lower.includes('cosmética') || lower.includes('cosmetica')) {
    return 'Cosmética';
  }
  if (lower.startsWith('decor') || lower.includes('decoración') || lower.includes('decoracion del hogar')) {
    return 'Decoración';
  }
  if (lower.startsWith('marroquin')) {
    return 'Marroquinería';
  }
  if (lower.startsWith('bolso')) {
    return 'Bolsos';
  }
  if (lower.startsWith('lencer')) {
    return 'Lencería';
  }
  if (lower.startsWith('maquill')) {
    return 'Maquillaje';
  }
  if (lower.startsWith('vela')) {
    return 'Velas';
  }
  if (lower.startsWith('perfum')) {
    return 'Perfumería';
  }
  if (lower.startsWith('fragan')) {
    return 'Fragancias';
  }
  if (lower.startsWith('bañador') || lower.startsWith('banador') || lower.startsWith('bikini') || (lower.includes('traje') && (lower.includes('baño') || lower.includes('bano')))) {
    return 'Trajes de Baño';
  }
  if (lower.startsWith('alta costura') || lower.includes('alta costura')) {
    return 'Alta Costura';
  }
  if (lower.startsWith('papel')) {
    return 'Papelería';
  }
  if (lower.startsWith('gafa') || lower.startsWith('lente')) {
    return 'Gafas';
  }
  if (lower.startsWith('flor')) {
    return 'Flores';
  }
  if (lower.startsWith('ropa') || lower.startsWith('prenda')) {
    return 'Ropa';
  }
  if (lower.startsWith('accesorio')) {
    return 'Accesorios';
  }

  // Extract first word rule
  // Strip leading punctuation/symbols/hashtags
  const cleaned = s.replace(/^[^\wáéíóúñÁÉÍÓÚÑ]+/i, '');
  const parts = cleaned.split(/[\s,/;|\-]+/);
  let first = (parts[0] || '').trim();

  if (!first) return 'General';

  // Capitalize first letter properly
  first = first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();

  // Accent and spelling canonicalization
  const accentMap: Record<string, string> = {
    'Joyeria': 'Joyería',
    'Cosmetica': 'Cosmética',
    'Decoracion': 'Decoración',
    'Lenceria': 'Lencería',
    'Papeleria': 'Papelería',
    'Peluqueria': 'Peluquería',
    'Perfumeria': 'Perfumería',
    'Banadores': 'Trajes de Baño',
    'Bañadores': 'Trajes de Baño',
    'Bikinis': 'Trajes de Baño',
    'Holistica': 'Holística',
    'Marroquineria': 'Marroquinería',
    'Fashion': 'Moda',
  };

  return accentMap[first] || first;
}
