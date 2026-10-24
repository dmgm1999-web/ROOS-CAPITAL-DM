/**
 * Translation helpers for Outlet & Alliance announcements:
 * - Translates descriptions into English when language is 'en'
 * - Translates promo badges (e.g. "Envío Gratis" -> "Free Shipping", "%55 OFF" -> "55% OFF")
 */

export const OUTLET_DESCRIPTION_TRANSLATIONS: Record<string, string> = {
  // Amazon items
  "Suéteres tipo cárdigan, con botones, cuello redondo": "Cardigan sweaters, button-down, crew neck",
  "6 pares de calcetines de algodón para mujer": "6 pairs of women's cotton socks",
  "Cliganic Toallas limpias para la cara XL, desechables, ultraabsorbentes, hipoalergénicas y suaves": "Cliganic XL clean face towels, disposable, ultra-absorbent, hypoallergenic and soft",
  "Poncho de surf con capucha, bata cambiadora absorbente de microfibra de secado rápido": "Hooded surf poncho, quick-dry absorbent microfiber changing robe",
  "Organizador de maquillaje giratorio, 8 capas ajustables": "Rotating makeup organizer, 8 adjustable layers",
  "Dispositivo facial de microcorriente 8 en 1": "8-in-1 microcurrent facial toning device",
  "Dispositivo facial de microcorriente 8 en 1 ": "8-in-1 microcurrent facial toning device",
  "Botas altas hasta la rodilla, botas plegables con tacón grueso (varios colores)": "Knee-high slouch boots with chunky block heel (assorted colors)",

  // L'Oréal, Hinata, Garnier, Maybelline, Mercado Libre
  "Aceite Capilar L'Oréal Paris Elvive de Óleo Extraordinario 100ml": "L'Oréal Paris Elvive Extraordinary Oil hair serum 100ml",
  "Estante Esquinero 4 Niveles Para Baño Cocina Con Drenaje": "4-tier corner shelving unit for bathroom and kitchen with drainage",
  "Pimple Patch Invisible Anti Imperfecciones Garnier 22 unidades": "Garnier invisible anti-blemish pimple patches 22 count",
  "Maybelline Superlock Gel Para Cejas Clear": "Maybelline Superlock Clear Brow Gel",
  "3pcs Panty Faja Body Calzón Reductora Moldeadora Sexy Mujer": "3-pack women's slimming body shaper panty briefs",
  "Mesa Escritorio Lateral Ajustable Con Ruedas Laptop Portátil Selectshop": "Selectshop adjustable rolling side laptop desk",

  // Temu items
  "Juego de 2 toallas de cocina Navidad": "Set of 2 Christmas kitchen towels",
  "Porta Servilletas Navidad": "Christmas napkin holder",
  "Mantel Navideño": "Christmas holiday tablecloth",
  "Bolso de Mano Moderno con Colgante de Bola (varios colores)": "Modern handbag with ball charm pendant (assorted colors)",
  "Bolso bandolera para mujer (varios colores)": "Women's crossbody shoulder bag (assorted colors)",
  "Bolso bandolera de un solo hombro multicapa, nuevo, de moda y versátil (varios colores)": "Multi-layer single shoulder crossbody bag, fashionable and versatile (assorted colors)",
  "Zapatillas planas Mary Jane de estilo francés vintage #balerinas #punta cuadrada": "Vintage French style Mary Jane flats #ballerinas #square toe",
  "Nuevos zapatos planos de mujer estilo ballet #ballerinas #punta cuadrada": "New women's ballet style flats #ballerinas #square toe",
  "Zapatos planos Mary Jane de bailarina con lazo de encaje #ballerina": "Lace bow Mary Jane ballerina flats #ballerina",
  "Ballets planos de color liso (varios colores) #ballerinas": "Solid color flat ballerinas (assorted colors) #ballerinas",
  "Organizador de artículos esenciales de viaje": "Travel essentials organizer bag",
  "Fregona para polvo del hogar con mango telescópico, plumero para ventilador de techo": "Household dust mop with telescopic handle, ceiling fan duster",
  "Contenedores de Vidrio Hermético con Tapa 8piezas": "Airtight glass food containers with lids 8-piece set",
  "Prensa de ajo, jengibre y más duradera de acero inoxidable": "Durable stainless steel garlic and ginger press",
  "Peine de cola puntiaguda de tres filas con cerdas sintéticas, ideal para masajes del cuero cabelludo y peinados": "Three-row pointed tail comb with synthetic bristles, scalp massage and styling",
  "Bolsa portabotellas de neopreno de 1 pieza con bolsillo para teléfono para vaso térmico de 40/30 oz, funda para botella de agua, accesorios para vaso, total de 3 bolsillos": "1-piece neoprene bottle holder bag with phone pocket for 40/30 oz tumbler, 3 total pockets",
  "Sostenimiento fuerte, sin residuo, diseño de bajo visibilidad para ropa interior, sujetadores, ajustes de ropa y reparaciones de moda": "Strong hold, no-residue, low-visibility fashion tape for lingerie, bras, and clothing adjustments",
  "1 Paquete de 30 Protectores de Talón de Gel": "1 pack of 30 gel heel protectors",
  "Cepillo Térmico Eléctrico Rosa para Cabello, Cepillo Moldeador con 2 Temperaturas 160°C/180°C, Diseño Ovalado con Cerdas para Alisar, Crear Volumen y Dar Forma al Cabello": "Pink electric thermal hair brush, 2 temperature settings 160°C/180°C, oval design for straightening, volumizing, and styling",
  "Barra de Rubor 2-en-1 Doble Uso para Labios y Mejillas": "2-in-1 dual-use blush stick for lips and cheeks",
  "Juego de 10piezas de brillo de labios - Fácil de aplicar con brillo de espejo de purpurina fina, brillo de labios hidratante y no pegajoso, paleta de colores mixtos para todos los tipos de piel": "10-piece lip gloss set - Easy to apply with fine glitter mirror shine, moisturizing non-sticky formula, mixed color palette",
  "Estrellita para el pelo 1 pieza, accesorio de pelo arcoíris con pinza de 60.96 cm, kit de estrellita de hada para mujer, extensiones de purpurina para fiesta": "Hair tinsel fairy extensions 1-piece, rainbow hair clip accessory 24-inch glitter sparkle party kit",
};

/**
 * Translates an Outlet ad description when language is 'en'.
 */
export function translateOutletDescription(desc: string | undefined | null, language: string = 'es'): string {
  if (!desc || typeof desc !== 'string') return '';
  const trimmed = desc.trim();
  if (!trimmed) return '';
  if (language === 'es') return trimmed;

  // Direct exact lookup
  if (OUTLET_DESCRIPTION_TRANSLATIONS[trimmed]) {
    return OUTLET_DESCRIPTION_TRANSLATIONS[trimmed];
  }

  // Normalized case-insensitive lookup
  const normKey = trimmed.toLowerCase();
  for (const [k, v] of Object.entries(OUTLET_DESCRIPTION_TRANSLATIONS)) {
    if (k.toLowerCase() === normKey) {
      return v;
    }
  }

  // Common pattern replacements
  let translated = trimmed;
  translated = translated.replace(/Juego de (\d+)\s*toallas de cocina Navidad/gi, 'Set of $1 Christmas kitchen towels');
  translated = translated.replace(/Porta Servilletas Navidad/gi, 'Christmas napkin holder');
  translated = translated.replace(/Mantel Navideño/gi, 'Christmas tablecloth');
  translated = translated.replace(/Navidad/gi, 'Christmas');
  translated = translated.replace(/\(varios colores\)/gi, '(assorted colors)');
  translated = translated.replace(/varios colores/gi, 'assorted colors');
  translated = translated.replace(/(\d+)\s*piezas/gi, '$1 pieces');
  translated = translated.replace(/(\d+)\s*unidades/gi, '$1 units');
  translated = translated.replace(/para mujer/gi, "for women");
  translated = translated.replace(/para hombre/gi, "for men");
  translated = translated.replace(/Envío gratis/gi, "Free Shipping");

  return translated;
}

/**
 * Translates an Outlet promo badge (e.g. "Envío Gratis" -> "Free Shipping", "%55 OFF" -> "55% OFF")
 */
export function translateOutletPromo(promo: string | undefined | null, language: string = 'es'): string {
  if (!promo || typeof promo !== 'string') return '';
  const trimmed = promo.trim();
  if (!trimmed) return '';

  const lower = trimmed.toLowerCase();

  // If in Spanish, still normalize %XX OFF to standard clean format if needed
  if (language === 'es') {
    // Standardize %55 OFF to 55% OFF or keep as-is
    const pctMatch = trimmed.match(/^%(\d+)\s*(OFF|off)?$/i);
    if (pctMatch) {
      return `${pctMatch[1]}% OFF`;
    }
    return trimmed;
  }

  // In English:
  // "Envío Gratis" / "Envio Gratis" -> "Free Shipping"
  if (lower.includes('envio gratis') || lower.includes('envío gratis')) {
    if (lower.includes('todo el pais') || lower.includes('todo el país') || lower.includes('nacional')) {
      return 'Free Shipping';
    }
    return 'Free Shipping';
  }

  // "POR TIEMPO LIMITADO" -> "Limited Time"
  if (lower.includes('tiempo limitado') || lower.includes('por tiempo limitado')) {
    return 'Limited Time';
  }

  // Percent discount: "%55 OFF" -> "55% OFF"
  const pctMatch = trimmed.match(/^%(\d+)\s*(OFF|off)?$/i);
  if (pctMatch) {
    return `${pctMatch[1]}% OFF`;
  }

  // "55% de descuento" -> "55% OFF"
  const descMatch = trimmed.match(/^(\d+)%\s*(de\s*descuento|desc)?$/i);
  if (descMatch) {
    return `${descMatch[1]}% OFF`;
  }

  if (lower.includes('descuento')) {
    return trimmed.replace(/descuento/gi, 'OFF').replace(/de/gi, '').trim();
  }

  return trimmed;
}
