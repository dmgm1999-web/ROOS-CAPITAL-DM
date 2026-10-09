import React, { createContext, useContext, useState, useEffect } from 'react';
import { translateCountryName } from '../utils/countryUtils';

export type Language = 'es' | 'en';

export const categoryTranslations: Record<string, { es: string; en: string }> = {
  // Canonical first-word categories
  'Joyería': { es: 'Joyería', en: 'Jewelry' },
  'Moda': { es: 'Moda', en: 'Fashion' },
  'Accesorios': { es: 'Accesorios', en: 'Accessories' },
  'Calzado': { es: 'Calzado', en: 'Footwear' },
  'Bolsos': { es: 'Bolsos', en: 'Handbags' },
  'Cuidado Personal': { es: 'Cuidado Personal', en: 'Personal Care' },
  'Decoración': { es: 'Decoración', en: 'Home & Decor' },
  'Cosmética': { es: 'Cosmética', en: 'Cosmetics' },
  'Lencería': { es: 'Lencería', en: 'Lingerie' },
  'Ropa': { es: 'Ropa', en: 'Apparel' },
  'Marroquinería': { es: 'Marroquinería', en: 'Leather Goods' },
  'Alta Costura': { es: 'Alta Costura', en: 'Haute Couture' },
  'Trajes de Baño': { es: 'Trajes de Baño', en: 'Swimwear' },
  'Velas': { es: 'Velas', en: 'Candles' },
  'Maquillaje': { es: 'Maquillaje', en: 'Makeup' },
  'Bañadores': { es: 'Bañadores', en: 'Swimwear' },
  'Fragancias': { es: 'Fragancias', en: 'Fragrances' },
  'Perfumería': { es: 'Perfumería', en: 'Perfumery' },
  'Papelería': { es: 'Papelería', en: 'Stationery' },
  'Tocados': { es: 'Tocados', en: 'Headpieces' },
  'Bikinis': { es: 'Bikinis', en: 'Bikinis' },
  'Trajes': { es: 'Trajes', en: 'Suits' },
  'Holística': { es: 'Holística', en: 'Holistic Wellness' },
  'Labiales': { es: 'Labiales', en: 'Lipsticks' },
  'Gafas': { es: 'Gafas', en: 'Eyewear' },
  'Prendas': { es: 'Prendas', en: 'Garments' },
  'Flores': { es: 'Flores', en: 'Flowers' },
  'Alimentos': { es: 'Alimentos', en: 'Food & Beverages' },
  'Bienestar': { es: 'Bienestar', en: 'Wellness' },
  'Salud': { es: 'Salud', en: 'Health' },
  'Belleza': { es: 'Belleza', en: 'Beauty' },
  'Servicios': { es: 'Servicios', en: 'Professional Services' },
  'Educación': { es: 'Educación', en: 'Education' },
  'Tecnología': { es: 'Tecnología', en: 'Tech & Innovation' },
  'Arte': { es: 'Arte', en: 'Art' },
  'Diseño': { es: 'Diseño', en: 'Design' },
  'Mascotas': { es: 'Mascotas', en: 'Pets' },
  'Eventos': { es: 'Eventos', en: 'Events' },
  'Proveedores': { es: 'Proveedores', en: 'Suppliers' },
  'Creadoras UGC': { es: 'Creadoras UGC', en: 'UGC Creators' },
  'General': { es: 'General', en: 'General' },
};

export const translations = {
  es: {
    // Navigation
    'nav.marketplace': 'Marketplace',
    'nav.creators': 'Creadoras',
    'nav.forBrands': 'Para Marcas',
    'nav.community': 'Comunidad',
    'nav.education': 'Educación',
    'nav.educationTop': 'Educación',
    'education': 'Educación',
    'nav.login': 'Log in',
    'nav.joinRoos': 'Mis favoritas',
    'nav.favorites': 'Mis favoritas',
    'nav.searchTitle': 'Buscar en el directorio',
    'nav.menu': 'Menú',

    // Hero
    'hero.kicker': 'DESCUBRE LO QUE LAS MUJERES ESTAMOS CREANDO EN TODO EL MUNDO',
    'hero.titleLine1': 'Descubre.',
    'hero.titleLine2': 'Conecta.',
    'hero.titleLine3': 'Crece.',
    'hero.subtitle': 'Marcas, Productos, Servicios, Experiencias y Proveedores, reunidos en un solo lugar para ti, ¡Guarda tus favoritos!',
    'hero.explore': 'Explorar directorio',
    'hero.join': 'Publícate',
    'hero.getFeatured': 'Publícate',
    'hero.realBrands': 'Marcas reales,',
    'hero.realPeople': 'gente real,',
    'hero.realOpportunities': '¡oportunidades reales!',

    // Hero Polaroid Cards
    'hero.card1.title': 'Luna Beauty',
    'hero.card1.category': 'Belleza · Ciudad de México',
    'hero.card2.title': 'Creadora UGC',
    'hero.card2.category': 'Contenido · Estilo de Vida',
    'hero.card3.title': 'Casa Rosa',
    'hero.card3.category': 'Moda · México',

    // Stats
    'stats.moreThan': 'Más que',
    'stats.justPlatform': 'solo una plataforma',
    'stats.businesses': '1,200+',
    'stats.businessesLabel': 'Negocios de mujeres',
    'stats.creators': '350+',
    'stats.creatorsLabel': 'Promociones',
    'stats.countries': '26',
    'stats.countriesLabel': 'Países y regiones',
    'stats.collaborations': '500+',
    'stats.collaborationsLabel': 'Empresas de beneficiencia por y para mujeres',
    'stats.togetherQuote': 'Juntas creamos un futuro más fuerte e inclusivo.',

    // Directory
    'directory.kicker': 'Directorio / Marketplace Oficial',
    'directory.title': 'Explora & Encuentra',
    'directory.subtitle': 'Toca el corazón de cualquier tarjeta para guardar una marca en tu lista de favoritos y encontrarla fácilmente',
    'directory.mobileTitle': 'Explora & Encuentra',
    'directory.searchPlaceholder': 'Buscar marcas, productos, categorías...',
    'directory.filterTitle': 'Filtros',
    'directory.activeFilters': 'Filtros activos:',
    'directory.clearFilters': 'Limpiar filtros',
    'directory.clearAll': 'Limpiar todos',
    'directory.all': 'Todas',
    'directory.noResults': 'No encontramos coincidencias para tu búsqueda',
    'directory.tryOther': 'Intenta buscar con otros términos o limpia los filtros activos.',
    'directory.viewAll': 'Ver todos los anuncios',
    'directory.showing': 'Mostrando',
    'directory.of': 'de',
    'directory.results': 'resultados',
    'directory.page': 'Página',
    'directory.previous': 'Anterior',
    'directory.next': 'Siguiente',

    // Filters
    'filter.allOptions': 'Todas las opciones',
    'filter.categories': 'Categorías',
    'filter.modality': 'Modalidad',
    'filter.countries': 'Países',
    'filter.states': 'Estados',
    'filter.municipalities': 'Municipios',
    'filter.remote': 'Remoto',
    'filter.international': 'Internacional',
    'filter.supplier': 'Proveedor',
    'filter.clear': 'limpiar',
    'filter.apply': 'Aplicar filtros',
    'filter.close': 'Cerrar',

    // Card
    'card.viewFull': 'Ver completo',
    'card.contact': 'Contacto',
    'card.noSocials': 'Sin redes',
    'card.support': 'Apoyar',
    'card.topSocio': 'SOCIO TOP',
    'card.trending': 'TENDENCIA',
    'card.supplier': 'Proveedor',
    'card.online': 'Online',
    'card.onlineAlso': 'También online',
    'card.onlineOnly': 'Sólo online',
    'card.international': 'Internacional',
    'card.purpose': 'Propósito del Emprendimiento',

    // Modal
    'modal.announcementInfo': 'Información del Anuncio',
    'modal.founder': 'Fundadora',
    'modal.category': 'Categoría',
    'modal.location': 'Ubicación',
    'modal.contact': 'Contacto:',
    'modal.close': 'Cerrar',
    'modal.support': 'Apoyar Emprendimiento',

    // Login
    'login.welcomeBack': '¡Bienvenida de vuelta!',
    'login.joinRoos': 'Únete a ROOS',
    'login.loginTab': 'Iniciar Sesión',
    'login.registerTab': 'Registrarse',
    'login.email': 'Correo electrónico',
    'login.password': 'Contraseña',
    'login.name': 'Nombre completo',
    'login.continueGoogle': 'Continuar con Google',
    'login.forgotPassword': '¿Olvidaste tu contraseña?',
    'login.submitLogin': 'Iniciar Sesión',
    'login.submitRegister': 'Crear Cuenta',

    // Favorites & Backup Code
    'favorites.title': 'Mis Favoritas',
    'favorites.subtitle': 'Tus marcas y emprendimientos guardados con amor.',
    'favorites.empty': 'Aún no tienes marcas favoritas guardadas. ¡Explora el directorio y dale clic al corazón ♡!',
    'favorites.keyTitle': 'Tu Clave Personal ROOS',
    'favorites.keyDesc': 'Esta clave contiene todas tus marcas favoritas guardadas. Úsala para acceder desde cualquier teléfono o computadora sin crear contraseñas.',
    'favorites.copyKey': 'Copiar Clave',
    'favorites.copied': '¡Copiado!',
    'favorites.whatsappSave': 'Guardar en mi WhatsApp',
    'favorites.filterOnly': 'Ver solo mis favoritas en el directorio',
    'favorites.showAll': 'Ver todo el directorio',
    'login.keyPlaceholder': 'Ejemplo: ROOS-A849-FAVS',
    'login.keyHelp': 'Ingresa tu Clave Personal ROOS para cargar tus marcas favoritas en este dispositivo.',
    'login.restoreBtn': 'Iniciar Sesión',
    'login.success': '¡Bienvenida! Se han restaurado tus marcas favoritas.',

    // Education
    'education.title': 'Educación y Capacitación Empresarial',
    'education.subtitle': 'Módulos diseñados para transformar ideas en empresas escalables, rentables e independientes.',
    'education.back': 'Volver al Inicio',
    'education.modulesCount': 'Módulos de Formación',
    'education.startModule': 'Comenzar Lección',
    'education.completed': 'Completado',

    // Footer
    'footer.quote': 'Juntas creamos un futuro más fuerte e inclusivo.',
    'footer.rights': 'Directorio Internacional Líder del Emprendimiento Femenino | Impulsando a mujeres empresarias y pymes',
    'footer.faq': 'Preguntas Frecuentes (FAQ)',
    'footer.terms': 'Términos y Condiciones',
    'footer.privacy': 'Aviso de Privacidad',
    'footer.somosRoos': 'Somos Roos',
    'footer.publicate': 'Publícate',
    'footer.ugcProgram': 'UGC Program',
    'footer.ambassadors': 'Embajadoras',
    'footer.education': 'Educación',

    // General / Views
    'common.backHome': 'Volver al Inicio',
    'common.close': 'Cerrar',
    'common.loading': 'Cargando...',
    'common.language': 'Idioma',

    // Contact Modal
    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Elige tu medio de contacto preferido:',
    'contact.recommended': 'Recomendado',
    'contact.email': 'Correo',
    'contact.footerNote': 'Servicio al cliente, atención personalizada',
    'contact.close': 'Cerrar',
  },
  en: {
    // Navigation
    'nav.marketplace': 'Marketplace',
    'nav.creators': 'Creators',
    'nav.forBrands': 'For Brands',
    'nav.community': 'Community',
    'nav.education': 'Education',
    'nav.educationTop': 'Education',
    'education': 'Education',
    'nav.login': 'Log in',
    'nav.joinRoos': 'My Favorites',
    'nav.favorites': 'My Favorites',
    'nav.searchTitle': 'Search directory',
    'nav.menu': 'Menu',

    // Hero
    'hero.kicker': 'DISCOVER WHAT WOMEN ARE CREATING WORLDWIDE',
    'hero.titleLine1': 'Discover.',
    'hero.titleLine2': 'Connect.',
    'hero.titleLine3': 'Grow.',
    'hero.subtitle': 'Brands, Products, Services, Experiences and Providers, gathered in one place for you, Save your favorites!',
    'hero.explore': 'Explore marketplace',
    'hero.join': 'Get featured',
    'hero.getFeatured': 'Get featured',
    'hero.realBrands': 'Real brands,',
    'hero.realPeople': 'real people,',
    'hero.realOpportunities': 'real opportunities!',

    // Hero Polaroid Cards
    'hero.card1.title': 'Luna Beauty',
    'hero.card1.category': 'Beauty · Mexico City',
    'hero.card2.title': 'UGC Creator',
    'hero.card2.category': 'Content · Lifestyle',
    'hero.card3.title': 'Casa Rosa',
    'hero.card3.category': 'Fashion · Mexico',

    // Stats
    'stats.moreThan': 'More than',
    'stats.justPlatform': 'just a platform',
    'stats.businesses': '1,200+',
    'stats.businessesLabel': 'Women-owned businesses',
    'stats.creators': '350+',
    'stats.creatorsLabel': 'Promotions',
    'stats.countries': '26',
    'stats.countriesLabel': 'Countries & regions',
    'stats.collaborations': '500+',
    'stats.collaborationsLabel': 'Charitable organizations for and by women',
    'stats.togetherQuote': 'Together we create a stronger, more inclusive future.',

    // Directory
    'directory.kicker': 'Official Directory / Marketplace',
    'directory.title': 'Explore & Discover',
    'directory.subtitle': 'Tap the heart on any card to save a brand to your favorites list and easily find\u00a0it\u00a0later',
    'directory.mobileTitle': 'Explore & Discover',
    'directory.searchPlaceholder': 'Search brands, products, categories...',
    'directory.filterTitle': 'Filters',
    'directory.activeFilters': 'Active filters:',
    'directory.clearFilters': 'Clear filters',
    'directory.clearAll': 'Clear all',
    'directory.all': 'All',
    'directory.noResults': 'No matches found for your search',
    'directory.tryOther': 'Try searching with different terms or clear active filters.',
    'directory.viewAll': 'View all listings',
    'directory.showing': 'Showing',
    'directory.of': 'of',
    'directory.results': 'results',
    'directory.page': 'Page',
    'directory.previous': 'Previous',
    'directory.next': 'Next',

    // Filters
    'filter.allOptions': 'All options',
    'filter.categories': 'Categories',
    'filter.modality': 'Modality',
    'filter.countries': 'Countries',
    'filter.states': 'States',
    'filter.municipalities': 'Cities',
    'filter.remote': 'Remote',
    'filter.international': 'International',
    'filter.supplier': 'Supplier',
    'filter.clear': 'clear',
    'filter.apply': 'Apply filters',
    'filter.close': 'Close',

    // Card
    'card.viewFull': 'View full',
    'card.contact': 'Contact',
    'card.noSocials': 'No links',
    'card.support': 'Support',
    'card.topSocio': 'TOP PARTNER',
    'card.trending': 'TRENDING',
    'card.supplier': 'Supplier',
    'card.online': 'Online',
    'card.onlineAlso': 'Also online',
    'card.onlineOnly': 'Online only',
    'card.international': 'International',
    'card.purpose': 'Brand Purpose & Mission',

    // Modal
    'modal.announcementInfo': 'Listing Details',
    'modal.founder': 'Founder',
    'modal.category': 'Category',
    'modal.location': 'Location',
    'modal.contact': 'Contact:',
    'modal.close': 'Close',
    'modal.support': 'Support Business',

    // Login
    'login.welcomeBack': 'Welcome back!',
    'login.joinRoos': 'Join ROOS',
    'login.loginTab': 'Log In',
    'login.registerTab': 'Sign Up',
    'login.email': 'Email address',
    'login.password': 'Password',
    'login.name': 'Full name',
    'login.continueGoogle': 'Continue with Google',
    'login.forgotPassword': 'Forgot password?',
    'login.submitLogin': 'Log In',
    'login.submitRegister': 'Create Account',

    // Favorites & Backup Code
    'favorites.title': 'My Favorites',
    'favorites.subtitle': 'Your saved brands and businesses loved by you.',
    'favorites.empty': 'You have not saved any favorite brands yet. Explore the marketplace and tap the heart ♡!',
    'favorites.keyTitle': 'Your Personal ROOS Key',
    'favorites.keyDesc': 'This key safely holds all your saved favorites. Use it to load them on any phone, tablet, or computer with no passwords needed.',
    'favorites.copyKey': 'Copy Key',
    'favorites.copied': 'Copied!',
    'favorites.whatsappSave': 'Save to my WhatsApp',
    'favorites.filterOnly': 'Show only my favorites in directory',
    'favorites.showAll': 'View all directory',
    'login.keyPlaceholder': 'Example: ROOS-A849-FAVS',
    'login.keyHelp': 'Enter your Personal ROOS Key to load your favorite brands onto this device.',
    'login.restoreBtn': 'Log In',
    'login.success': 'Welcome! Your favorite brands have been loaded.',

    // Education
    'education.title': 'Education & Business Academy',
    'education.subtitle': 'Modules crafted to transform ideas into scalable, profitable, and independent businesses.',
    'education.back': 'Back to Home',
    'education.modulesCount': 'Learning Modules',
    'education.startLesson': 'Start Lesson',
    'education.completed': 'Completed',

    // Footer
    'footer.quote': 'Together we create a stronger, more inclusive future.',
    'footer.rights': 'Leading International Directory of Female Entrepreneurship | Empowering women entrepreneurs and SMEs',
    'footer.faq': 'Frequently Asked Questions (FAQ)',
    'footer.terms': 'Terms and Conditions',
    'footer.privacy': 'Privacy Policy',
    'footer.somosRoos': 'About ROOS',
    'footer.publicate': 'Get Featured',
    'footer.ugcProgram': 'UGC Program',
    'footer.ambassadors': 'Ambassadors',
    'footer.education': 'Education',

    // General / Views
    'common.backHome': 'Back to Home',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.language': 'Language',

    // Contact Modal
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Choose your preferred contact method:',
    'contact.recommended': 'Recommended',
    'contact.email': 'Email',
    'contact.footerNote': 'Customer service, personalized attention',
    'contact.close': 'Close',
  }
} as const;

export type TranslationKey = keyof typeof translations['es'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey, fallback?: string) => string;
  translateCategory: (categoryName: string) => string;
  translateCountry: (countryName: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('roos_lang');
      if (saved === 'es' || saved === 'en') return saved;
      if (typeof navigator !== 'undefined' && navigator.language && navigator.language.startsWith('en')) {
        return 'en';
      }
    } catch {
      // fallback
    }
    return 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('roos_lang', lang);
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: TranslationKey, fallback?: string): string => {
    const langDict = translations[language];
    if (langDict && key in langDict) {
      return (langDict as any)[key];
    }
    if (translations.es && key in translations.es) {
      return (translations.es as any)[key];
    }
    return fallback || key;
  };

  const translateCategory = (catName: string): string => {
    if (!catName) return '';
    const trimmed = catName.trim();
    if (language === 'es') {
      const lower = trimmed.toLowerCase();
      if (lower === 'education') return 'Educación';
      if (lower === 'education & coaching' || lower.includes('education')) return 'Educación & Coaching';
      for (const val of Object.values(categoryTranslations)) {
        if (val.en.toLowerCase() === lower) {
          return val.es;
        }
      }
      return trimmed;
    }

    // Direct match in categoryTranslations
    if (categoryTranslations[trimmed]) {
      return categoryTranslations[trimmed].en;
    }

    // Case-insensitive / normalized match
    const lower = trimmed.toLowerCase();
    for (const [key, val] of Object.entries(categoryTranslations)) {
      if (key.toLowerCase() === lower) {
        return val.en;
      }
    }

    // Distinct category translations (ensuring NO two categories map to the same generic phrase)
    if (lower.includes('joyer')) return 'Jewelry';
    if (lower.includes('calzado') || lower.includes('zapato')) return 'Footwear';
    if (lower.includes('bolso')) return 'Handbags';
    if (lower.includes('marroquiner')) return 'Leather Goods';
    if (lower.includes('maquillaje')) return 'Makeup';
    if (lower.includes('cosmética') || lower.includes('cosmetica')) return 'Cosmetics';
    if (lower.includes('lencer')) return 'Lingerie';
    if (lower.includes('bañador') || lower.includes('bikini') || (lower.includes('traje') && lower.includes('baño'))) return 'Swimwear';
    if (lower.includes('vela')) return 'Candles';
    if (lower.includes('fragancia') || lower.includes('perfum')) return 'Fragrances';
    if (lower.includes('papeler')) return 'Stationery';
    if (lower.includes('gafa') || lower.includes('lente')) return 'Eyewear';
    if (lower.includes('alta costura')) return 'Haute Couture';
    if (lower.includes('cuidado') || lower.includes('skincare')) return 'Personal Care';
    if (lower.includes('flor')) return 'Flowers';
    if (lower.includes('accesorio')) return 'Accessories';
    if (lower.includes('ropa') || lower.includes('prenda')) return 'Apparel';
    if (lower.includes('moda') || lower.includes('boutique')) return 'Fashion';
    if (lower.includes('belleza')) return 'Beauty';
    if (lower.includes('salud')) return 'Health';
    if (lower.includes('bienestar')) return 'Wellness';
    if (lower.includes('alimento') || lower.includes('bebida') || lower.includes('café') || lower.includes('cafe') || lower.includes('comida') || lower.includes('snack')) return 'Food & Beverages';
    if (lower.includes('servicio') || lower.includes('profesional') || lower.includes('consultor') || lower.includes('legal')) return 'Professional Services';
    if (lower.includes('educaci') || lower.includes('curso') || lower.includes('coach')) return 'Education & Coaching';
    if (lower.includes('hogar') || lower.includes('decoraci') || lower.includes('mueble')) return 'Home & Decor';
    if (lower.includes('tecnolog') || lower.includes('digital') || lower.includes('software')) return 'Tech & Innovation';
    if (lower.includes('arte') || lower.includes('diseño') || lower.includes('diseno')) return 'Art & Design';
    if (lower.includes('ugc') || lower.includes('creador')) return 'UGC Creators';
    if (lower.includes('proveedor')) return 'Suppliers';
    if (lower.includes('social') || lower.includes('ong') || lower.includes('fundaci')) return 'Social Impact';
    if (lower.includes('infantil') || lower.includes('materni') || lower.includes('bebé') || lower.includes('niño')) return 'Kids & Maternity';
    if (lower.includes('mascota')) return 'Pets';
    if (lower.includes('evento')) return 'Events';

    return trimmed;
  };

  const translateCountry = (countryName: string): string => {
    return translateCountryName(countryName, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, translateCategory, translateCountry }}>
      {children}
    </LanguageContext.Provider>
  );
}

const defaultContext: LanguageContextType = {
  language: 'es',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: TranslationKey, fallback?: string) => (translations.es as any)[key] || fallback || key,
  translateCategory: (c: string) => c,
  translateCountry: (c: string) => c,
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return defaultContext;
  }
  return context;
}
