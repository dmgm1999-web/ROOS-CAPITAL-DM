import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  Sparkles,
  Heart,
  Rocket,
  ShieldCheck,
  Users,
  Flame,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Star,
  Zap,
  Globe,
  Handshake,
  Target,
  DollarSign,
  Award,
  ArrowRight,
  BarChart3,
  XCircle
} from 'lucide-react';
import roseGoldPattern from '../assets/images/rose_gold_organic_pattern_1779358688635.png';
import { useLanguage } from '../context/LanguageContext';

interface SomosRoosProps {
  onBack: () => void;
  onSelectRole?: (role: 'emprendedora' | 'votante' | 'socia_diamante') => void;
  onNavigateToPublicate?: () => void;
}

export default function SomosRoos({ onBack, onSelectRole, onNavigateToPublicate }: SomosRoosProps) {
  const { t, language } = useLanguage();

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: 'easeOut' as const } 
    }
  } as const;

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-20 sm:pb-28 pt-4 sm:pt-6 font-sans relative overflow-hidden">
      {/* Background organic glow shapes */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-[#E2A7B5]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-4 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-[#E2A7B5]/25 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Back Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <a 
          href="/"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault();
              onBack();
            }
          }}
          className="flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-5 sm:py-2.5 bg-white/90 backdrop-blur-md border border-[#E85B81]/30 hover:bg-[#FCE8EF]/40 text-[#E85B81] rounded-full font-medium text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-xs hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          id="somosroos-back-btn"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          {t('common.backHome')}
        </a>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 sm:space-y-12"
      >
        {/* HERO HEADER */}
        <motion.section variants={itemVariants} className="text-center space-y-3 sm:space-y-4 max-w-4xl mx-auto px-2">
          <div className="inline-block mb-1">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3.5 py-1 rounded-full border border-brand-orange/20">
              {language === 'en' ? 'Community & Marketplace for Women Entrepreneurs' : 'Comunidad & Mercado de Mujeres Emprendedoras'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-lux font-black text-[#A85967] tracking-tight leading-tight sm:leading-none uppercase">
            {language === 'en' ? (
              <>We Are <span className="text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-8">Roos Capital</span></>
            ) : (
              <>Somos <span className="text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-8">Roos Capital</span></>
            )}
          </h1>
          <p className="mt-5 sm:mt-6 text-xs sm:text-sm font-semibold text-neutral-600 uppercase tracking-wider">
            {language === 'en'
              ? 'The gathering place for women-founded businesses, SMEs, and female-led enterprises'
              : 'El punto de encuentro para emprendimientos de mujeres, pymes de mujeres, empresas y negocios liderados por mujeres'}
          </p>
        </motion.section>

        {/* INTERNATIONAL VISION SECTION */}
        <motion.section 
          variants={itemVariants} 
          className="relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#FCE8EF] shadow-xs space-y-4 sm:space-y-6 text-[#A85967] overflow-hidden"
          id="somos-roos-vision-internacional"
        >
          <div className="space-y-3.5 sm:space-y-5 text-xs sm:text-sm md:text-base leading-relaxed text-neutral-600">
            <div className="text-center space-y-1.5 sm:space-y-2.5 pb-3 sm:pb-8 pt-1">
              <h2 className="text-lg sm:text-2xl md:text-[37.5px] md:leading-[45px] font-lux font-black text-[#A85967] uppercase tracking-[0.04em]">
                {language === 'en' ? 'ROOS WAS BORN WITH AN INTERNATIONAL VISION' : 'ROOS NACE CON UNA VISIÓN INTERNACIONAL'}
              </h2>
              <p className="text-[11px] sm:text-sm md:text-base font-lux font-extrabold text-[#E85B81] uppercase tracking-wider">
                {language === 'en' ? 'BECAUSE FEMALE TALENT KNOWS NO BORDERS' : 'PORQUE EL TALENTO FEMENINO NO ENTIENDE DE FRONTERAS'}
              </p>
            </div>

            <p style={{ fontFamily: 'Verdana, sans-serif' }} className="font-sans font-medium text-justify sm:text-left pt-1 text-neutral-600">
              {language === 'en' ? (
                <>A designer in Mexico City creates jewelry that a customer in Madrid wants to wear; a consultant in Miami advises a tech startup in Bogota; a skincare brand in Paris captivates buyers in Santiago. The internet erased borders, but few platforms have truly embraced this. <span className="font-bold text-brand-orange">We have.</span></>
              ) : (
                <>Una mujer en Cdmx puede diseñar joyería que una cliente en Madrid quiera usar; una consultora en Miami puede asesorar a una startup en Bogotá; una marca de skincare en Paris puede enamorar a compradoras en Santiago de Chile. El internet borró los mapas, pero no todas las plataformas lo han entendido. <span className="font-bold text-brand-orange">Nosotros sí.</span></>
              )}
            </p>

            <p style={{ fontFamily: 'Verdana, sans-serif' }} className="font-sans text-justify sm:text-left pb-2 sm:pb-6 text-neutral-600">
              {language === 'en' ? (
                <>We started in Mexico because we believe in strengthening our local ecosystem first, but our platform is built from the ground up to connect businesses across global frontiers. <strong className="text-neutral-600 font-bold">We are a global marketplace for women entrepreneurs; a gateway to limitless opportunities.</strong></>
              ) : (
                <>Comenzamos en México porque creemos en fortalecer primero nuestro propio ecosistema, pero nuestra plataforma está construida para conectar negocios más allá de cualquier frontera geográfica. <strong className="text-neutral-600 font-bold">Somos un marketplace de emprendimientos femeninos a nivel global; somos una puerta de entrada a un mercado sin límites.</strong></>
              )}
            </p>
          </div>

          {/* ¿QUÉ SIGNIFICA ESTO PARA TU NEGOCIO? */}
          <div className="p-4 sm:p-6 bg-white rounded-2xl border border-[#E85B81]/35 space-y-3 sm:space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[#E85B81] font-lux font-extrabold text-xs sm:text-base uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange shrink-0" />
              {language === 'en' ? 'What does this mean for your business?' : '¿Qué significa esto para tu negocio?'}
            </div>

            <div className="space-y-2.5 sm:space-y-3 py-1">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <p className="text-[11px] sm:text-sm font-normal font-sans leading-snug text-neutral-600">
                  {language === 'en' ? (
                    <>If your business already has or dreams of international reach, <strong className="font-bold text-neutral-600">Roos is your global showcase.</strong></>
                  ) : (
                    <>Si tu emprendimiento ya tiene o sueña con alcance internacional, <strong className="font-bold text-neutral-600">Roos es tu escaparate global.</strong></>
                  )}
                </p>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <p className="text-[11px] sm:text-sm font-sans leading-snug text-neutral-600">
                  {language === 'en' ? (
                    <>By joining Roos, your business has the opportunity to be discovered by people across states and borders looking for exactly what you create. <strong className="font-bold text-neutral-600">That is the magic of borderless visibility.</strong></>
                  ) : (
                    <>Al estar en Roos, tu negocio tendrá la oportunidad de ser visto por alguien que hoy no te conoce, en otro estado u otro país, buscando exactamente lo que ofreces. <strong className="font-bold text-neutral-600">Esa es la magia de la visibilidad sin fronteras.</strong></>
                  )}
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-[#FFF9FB] rounded-xl border-l-4 border-[#E85B81] text-[11px] sm:text-sm font-medium italic text-neutral-600 leading-relaxed border border-[#E85B81]/20">
              {language === 'en'
                ? '"Your business may begin in one city, but its reach should never stop there. At Roos, where you start is your launching pad, not your ceiling. Female talent is destined to cross borders, inspire markets, and make a lasting impact anywhere."'
                : '"Tu negocio puede nacer en una ciudad, pero su visibilidad no tiene por qué terminar ahí. En Roos, tu origen es tu punto de partida, no tu límite. Porque el talento femenino está hecho para viajar, cruzar fronteras y transformar mercados en cualquier latitud."'}
            </div>
          </div>
        </motion.section>

        {/* INTRO HERO CARD - Organic shape card */}
        <motion.section 
          variants={itemVariants} 
          className="relative bg-white/50 backdrop-blur-md rounded-2xl sm:rounded-tl-2xl sm:rounded-tr-[3rem] sm:rounded-bl-[3rem] sm:rounded-br-2xl p-4 sm:p-10 border border-[#FCE8EF] shadow-xs space-y-3 sm:space-y-4 text-neutral-600 font-sans font-normal text-xs sm:text-base leading-relaxed overflow-hidden"
        >
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url(${roseGoldPattern})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '1100px 800px',
            }}
          />
          <div className="relative z-10 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 text-[#A85967] font-lux font-extrabold text-xs sm:text-base uppercase tracking-widest">
              <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85B81]" />
              {language === 'en' ? 'The epicenter of women-founded brands' : 'El epicentro de las marcas creadas por mujeres'}
            </div>

            <div className="p-3 sm:p-4 bg-[#FFF9FB] rounded-xl sm:rounded-2xl border border-[#FCE8EF] flex items-center gap-2.5 sm:gap-3 text-neutral-600">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange shrink-0" />
              <p className="font-sans font-semibold text-xs sm:text-sm text-neutral-600">
                {language === 'en'
                  ? 'We firmly believe that when a woman builds a business, she doesn’t just create revenue: she elevates her family, empowers her community, and drives the economy forward.'
                  : 'Creemos firmemente que cuando una mujer emprende un negocio, no solo crea una fuente de ingresos: transforma el futuro de su familia, su comunidad y su país.'}
              </p>
            </div>
          </div>
        </motion.section>

        {/* SECTION 1: ¿POR QUÉ ROOS? */}
        <motion.section 
          variants={itemVariants}
          className="bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-10 border border-[#FCE8EF] shadow-xs space-y-5 sm:space-y-8"
        >
          <div className="border-b border-[#FCE8EF] pb-3 sm:pb-4 space-y-1.5 sm:space-y-2">
            <span className="text-[10px] sm:text-sm font-lux font-bold uppercase tracking-[0.2em] text-[#A85967]/80 block">
              {language === 'en' ? 'Strategy & Market Positioning' : 'Estrategia y Posicionamiento'}
            </span>
            <h2 className="text-lg sm:text-2xl md:text-[37.5px] md:leading-[45px] font-lux font-black text-[#A85967] uppercase tracking-[0.06em]">
              {language === 'en' ? (
                <>WHY <span className="text-[#E85B81]">ROOS</span>?</>
              ) : (
                <>¿POR QUÉ <span className="text-[#E85B81]">ROOS</span>?</>
              )}
            </h2>
            <p className="text-[10px] sm:text-sm md:text-base font-lux font-extrabold text-[#E85B81] uppercase tracking-[0.1em]">
              {language === 'en'
                ? 'GREATER REACH. ACCESSIBLE INVESTMENT. A COMMUNITY WITH CONSUMING POWER.'
                : 'MÁS ALCANCE. UNA INVERSIÓN ACCESIBLE. UN NICHO CON PODER DE CONSUMO.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Traditional publicity limitation */}
            <div className="p-4 sm:p-6 bg-white rounded-2xl border border-[#E85B81]/35 shadow-xs space-y-2 sm:space-y-3 text-[#A85967]">
              <div className="text-xs sm:text-sm font-lux font-black uppercase tracking-wider text-[#E85B81] flex items-center gap-1.5 sm:gap-2">
                <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85B81]" />
                {language === 'en' ? 'Traditional Advertising' : 'La Publicidad Tradicional'}
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                {language === 'en' ? 'Traditional advertising can be costly, localized, and fleeting.' : 'La publicidad tradicional puede ser costosa y limitada.'}
              </p>
              <div className="space-y-2 sm:space-y-2.5 pt-1">
                <div className="flex items-start gap-2 sm:gap-2.5">
                  <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500/80 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                    {language === 'en' ? 'Local print magazines reach only specific neighborhoods or postal codes.' : 'Una revista zonal llega solo a determinadas colonias o municipios.'}
                  </span>
                </div>
                <div className="flex items-start gap-2 sm:gap-2.5">
                  <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500/80 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                    {language === 'en' ? 'Newspapers disappear as soon as the next edition comes out.' : 'Un periódico desaparece con cada nueva edición.'}
                  </span>
                </div>
                <div className="flex items-start gap-2 sm:gap-2.5">
                  <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500/80 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                    {language === 'en' ? 'Billboards cost thousands of dollars and only reach drivers on one avenue.' : 'Un espectacular puede costar miles de pesos y solo ser visto por quienes pasan por una ubicación.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Roos Alternative */}
            <div className="p-4 sm:p-6 bg-white rounded-2xl border border-[#E85B81]/35 shadow-xs space-y-3 sm:space-y-4 text-[#A85967]">
              <div className="text-xs sm:text-sm font-lux font-black uppercase tracking-wider text-[#E85B81] flex items-center gap-1.5 sm:gap-2">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange" />
                {language === 'en' ? 'ROOS OFFERS A BETTER ALTERNATIVE' : 'ROOS TE OFRECE OTRA ALTERNATIVA'}
              </div>

              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span className="text-xl sm:text-3xl font-lux font-black text-[#E85B81]">26 USD</span>
                <span className="text-[11px] sm:text-xs font-bold text-neutral-600">/{language === 'en' ? 'mo' : 'mes'}</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 ml-auto">
                  {language === 'en' ? '$0.87 USD / day' : '$0.87 USD / día'}
                </span>
              </div>

              <div className="space-y-2 sm:space-y-2.5 pt-1">
                <div className="flex items-start gap-2 sm:gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed font-sans">
                    {language === 'en' ? 'Your business gains national and international online visibility.' : 'Tu negocio obtiene presencia a nivel nacional e internacional.'}
                  </span>
                </div>
                <div className="flex items-start gap-2 sm:gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed font-sans">
                    {language === 'en' ? 'Your listing features direct clickable links to your WhatsApp, social media, and shop.' : 'Tu anuncio tiene enlaces directos a tus redes sociales y sitio web.'}
                  </span>
                </div>
                <div className="flex items-start gap-2 sm:gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed font-sans">
                    {language === 'en' ? 'Access active networking opportunities to expand your reach, find partners, and grow.' : 'Tienes la oportunidad de hacer networking para hacer crecer tu empresa o cultivar nuevas ideas.'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Growth Banner (without enclosing box) */}
          <div className="pt-2 text-neutral-600 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-lux font-extrabold uppercase tracking-wider text-[#E85B81]">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange" />
              {language === 'en' ? 'AND WE CONSTANTLY WORK TO GROW THE PLATFORM.' : 'Y NOSOTROS TAMBIÉN TRABAJAMOS PARA HACER CRECER LA PLATAFORMA.'}
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
              {language === 'en'
                ? 'We run continuous promotional campaigns, events, and strategic outreach to bring new shoppers to the marketplace, maximizing visibility and customer discovery for our featured brands.'
                : 'Realizamos difusión constante en redes sociales, eventos y otros medios para atraer nuevas personas al marketplace y así aumentar las oportunidades de descubrimiento e impulsar las ventas de los negocios que forman parte de él.'}
            </p>
          </div>
        </motion.section>

        {/* SECTION 2: ¿POR QUÉ UN MARKETPLACE DE MUJERES? */}
        <motion.section 
          variants={itemVariants}
          className="bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-10 border border-[#FCE8EF] shadow-xs space-y-4 sm:space-y-6"
        >
          <div className="border-b border-[#FCE8EF] pb-3 sm:pb-4 space-y-1.5 sm:space-y-2">
            <span className="text-[10px] sm:text-sm font-lux font-bold uppercase tracking-[0.2em] text-[#A85967]/80 block">
              {language === 'en' ? 'High-Impact Market' : 'Nicho de Alto Impacto'}
            </span>
            <h2 className="text-lg sm:text-2xl md:text-[37.5px] md:leading-[45px] font-lux font-black text-[#A85967] uppercase tracking-[0.06em]">
              {language === 'en' ? (
                <>WHY A <span className="text-[#E85B81] inline-block whitespace-nowrap">WOMEN’S MARKETPLACE?</span></>
              ) : (
                <>¿POR QUÉ UN MARKETPLACE <span className="text-[#E85B81] inline-block whitespace-nowrap">DE&nbsp;MUJERES?</span></>
              )}
            </h2>
          </div>

          {/* Harvard Business Review Stat Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 items-center p-4 sm:p-6 bg-[#FFF9FB] rounded-2xl border border-[#FCE8EF] shadow-xs">
            <div className="text-center sm:text-left space-y-0.5 sm:space-y-1 sm:col-span-1">
              <span className="text-[9px] sm:text-xs font-lux font-bold uppercase tracking-[0.18em] text-neutral-600 block">
                Harvard Business Review
              </span>
              <div className="text-2xl sm:text-4xl font-lux font-black text-brand-orange tracking-tight">
                {language === 'en' ? '20 Trillion' : '20 Trillones'}
              </div>
              <span className="text-[10px] sm:text-[11px] font-lux font-bold text-neutral-600 uppercase tracking-wider block">
                {language === 'en' ? 'Dollars ($USD)' : 'de Dólares ($USD)'}
              </span>
            </div>

            <div className="sm:col-span-2 space-y-2 border-t sm:border-t-0 sm:border-l border-[#FCE8EF] pt-3 sm:pt-0 sm:pl-6 text-neutral-600">
              <p className="text-xs sm:text-sm leading-relaxed font-sans font-medium text-neutral-600">
                {language === 'en' ? (
                  <>Harvard Business Review reported that women control over <strong>$20 trillion in global consumer spending</strong>, representing the largest and fastest-growing economic market in the world.</>
                ) : (
                  <>Harvard Business Review señaló que las mujeres controlan alrededor de <strong>20 billones de dólares en gasto de consumo</strong>, describiéndolas como una fuerza fundamental de la economía mundial.</>
                )}
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FCE8EF] rounded-full border border-[#E85B81]/30 text-[11px] sm:text-xs font-lux font-extrabold text-[#E85B81] uppercase tracking-wider">
                <Target className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-orange" />
                {language === 'en' ? 'A STRATEGIC ADVANTAGE' : 'ES UNA DECISIÓN ESTRATÉGICA'}
              </div>
            </div>
          </div>

          <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-base text-neutral-600 leading-relaxed font-sans">
            <p style={{ fontFamily: 'Verdana, sans-serif' }}>
              {language === 'en'
                ? 'Belonging to this ecosystem is not just a badge of identity; it is a strategic business decision. On our marketplace, your brand stands alongside leading women-led enterprises and is discovered by conscious buyers, partners, and investors looking to support women founders.'
                : 'Pertenecer a este ecosistema no es solamente una cuestión de identidad. En nuestro marketplace, tu negocio comparte espacio con otras empresas lideradas por mujeres y puede ser descubierto por personas interesadas en comprar, colaborar, apoyar e invertir en este ecosistema.'}
            </p>
          </div>
        </motion.section>

        {/* SECTION 3: 🤝 UNA RED QUE PUEDE ABRIRTE PUERTAS */}
        <motion.section 
          variants={itemVariants}
          className="bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-10 border border-[#FCE8EF] shadow-xs space-y-4 sm:space-y-6"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 border-b border-[#FCE8EF] pb-3 sm:pb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#FCE8EF] border border-[#E85B81]/30 flex items-center justify-center text-[#E85B81]">
              <Handshake className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" />
            </div>
            <div>
              <span className="text-[10px] sm:text-sm font-lux font-bold uppercase tracking-[0.2em] text-[#A85967]/80 block">
                {language === 'en' ? 'Community & Networking' : 'Comunidad y Networking'}
              </span>
              <h2 className="text-base sm:text-2xl md:text-3xl font-lux font-black text-[#A85967] uppercase tracking-[0.06em]">
                {language === 'en' ? (
                  <>A NETWORK THAT <span className="text-[#E85B81]">OPENS DOORS</span></>
                ) : (
                  <>UNA RED QUE PUEDE <span className="text-[#E85B81]">ABRIRTE PUERTAS</span></>
                )}
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-base text-neutral-600 font-sans leading-relaxed">
            {language === 'en'
              ? 'Being part of Roos connects you with real opportunities and partners:'
              : 'Ser parte de Roos también significa formar parte de una comunidad donde surgen conexiones reales:'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-1">
            {(language === 'en'
              ? ['Clients', 'Collaborators', 'Strategic Partners', 'Suppliers', 'Allies']
              : ['Clientes', 'Colaboradoras', 'Socias estratégicas', 'Proveedores', 'Aliadas']
            ).map((role, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FFF9FB] border border-[#FCE8EF] text-[#E85B81] font-bold text-[11px] sm:text-sm rounded-full shadow-2xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                {role}
              </span>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            {language === 'en' ? (
              <>As our community expands, we facilitate <strong>networking spaces, live events, and commercial collaborations</strong> to connect founders with each other and introduce them to corporate clients, agencies, and investors.</>
            ) : (
              <>Y conforme nuestra comunidad crezca, desarrollaremos espacios de <strong>networking, eventos y colaboraciones</strong> para conectar a las emprendedoras entre sí y acercarlas a profesionales, empresas e inversionistas interesados en el emprendimiento femenino.</>
            )}
          </p>
        </motion.section>

        {/* SECTION 4: 🌎 TU CIUDAD NO TIENE QUE SER TU LÍMITE */}
        <motion.section 
          variants={itemVariants}
          className="bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-10 border border-[#FCE8EF] shadow-xs space-y-4 sm:space-y-6"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 border-b border-[#FCE8EF] pb-3 sm:pb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#FCE8EF] border border-[#E85B81]/30 flex items-center justify-center text-[#E85B81]">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" />
            </div>
            <div>
              <span className="text-[10px] sm:text-sm font-lux font-bold uppercase tracking-[0.2em] text-[#A85967]/80 block">
                {language === 'en' ? 'Limitless Growth' : 'Expansión Sin Fronteras'}
              </span>
              <h2 className="text-base sm:text-2xl md:text-3xl font-lux font-black text-[#A85967] uppercase tracking-[0.06em]">
                {language === 'en' ? (
                  <>YOUR CITY DOES NOT HAVE TO BE YOUR <span className="text-[#E85B81]">LIMIT</span></>
                ) : (
                  <>TU CIUDAD NO TIENE QUE SER TU <span className="text-[#E85B81]">LÍMITE</span></>
                )}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3.5 sm:p-5 bg-white rounded-2xl border border-[#E85B81]/35 space-y-1.5 sm:space-y-2 shadow-xs">
              <div className="text-xs sm:text-sm font-lux font-black uppercase tracking-wider text-[#E85B81]">
                {language === 'en' ? 'National Shipping' : 'Envíos Nacionales'}
              </div>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                {language === 'en'
                  ? 'If you ship products or deliver nationwide services, you can be found from your local district to the farthest corner of the country.'
                  : 'Si realizas envíos, o prestas servicios nacionales, puedes ser descubierta desde el principal perimetro de tu negocio hasta el último rincón del país.'}
              </p>
            </div>

            <div className="p-3.5 sm:p-5 bg-white rounded-2xl border border-[#E85B81]/35 space-y-1.5 sm:space-y-2 shadow-xs">
              <div className="text-xs sm:text-sm font-lux font-black uppercase tracking-wider text-[#E85B81]">
                {language === 'en' ? 'Digital Services' : 'Servicios Digitales'}
              </div>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                {language === 'en'
                  ? 'If you offer digital services, connect with clients wherever they are. Drive sales nationally or globally without friction.'
                  : 'Si ofreces servicios digitales, puedes conectar con personas sin importar dónde se encuentren. Realiza ventas de forma nacional o global.'}
              </p>
            </div>

            <div className="p-3.5 sm:p-5 bg-white rounded-2xl border border-[#E85B81]/35 space-y-1.5 sm:space-y-2 shadow-xs">
              <div className="text-xs sm:text-sm font-lux font-black uppercase tracking-wider text-[#E85B81]">
                {language === 'en' ? 'International Reach' : 'Alcance Internacional'}
              </div>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                {language === 'en'
                  ? 'And if your business has international potential, take the leap to get featured and receive purchases from anywhere in the world.'
                  : 'Y si tu negocio tiene potencial internacional, atrevete a publicarte para recibir compras desde cualquier parte del mundo.'}
              </p>
            </div>
          </div>

          {/* Limitless quote without enclosing box */}
          <div className="text-center space-y-1 sm:space-y-1.5 pt-2">
            <div className="text-[10px] sm:text-sm font-lux font-extrabold uppercase tracking-[0.18em] text-[#E85B81]">
              {language === 'en' ? 'YOUR BUSINESS MAY START LOCALLY.' : 'TU NEGOCIO PUEDE EMPEZAR LOCALMENTE.'}
            </div>
            <div className="text-sm sm:text-xl font-lux font-black uppercase tracking-wide text-[#E85B81]">
              {language === 'en' ? 'ITS VISIBILITY CAN GO INFINITELY FURTHER.' : 'SU VISIBILIDAD PUEDE IR MUCHO MÁS LEJOS.'}
            </div>
          </div>
        </motion.section>

        {/* SECTION 5: INVESTMENT SUMMARY & BENEFIT CHECKLIST */}
        <motion.section 
          variants={itemVariants}
          className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-10 border border-[#FCE8EF] shadow-xs space-y-5 sm:space-y-8"
        >
          <div className="text-center space-y-1.5 sm:space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-lux font-black text-[#E85B81] uppercase tracking-tight">
              {language === 'en' ? '26 USD PER MONTH' : '26 USD AL MES'}
            </h2>
            <p className="text-[11px] sm:text-sm font-lux font-black text-brand-orange uppercase tracking-wider">
              {language === 'en' ? '($0.87 USD PER DAY)' : '($0.87 USD AL DÍA)'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-2xl mx-auto">
            {(language === 'en' ? [
              'National and international online visibility for your brand.',
              'Zero percentage or commission fees taken from your sales.',
              'Presence in a dedicated marketplace curated for women founders.',
              'Direct clickable links so customers reach you on WhatsApp & social media.',
              'An active community of women entrepreneurs to connect and partner with.',
              'A platform that works continuously to attract new shoppers and buyers to the ecosystem.'
            ] : [
              'Tu negocio con presencia nacional e internacional.',
              'Sin entregar un porcentaje de tus ingresos.',
              'Con presencia en un marketplace especializado.',
              'Con enlaces directos para que tus clientes lleguen a ti.',
              'Con una comunidad de mujeres con las que puedes conectar.',
              'Con una plataforma que trabaja constantemente para atraer nuevas personas al ecosistema.'
            ]).map((benefit, idx) => (
              <div key={idx} className="p-2.5 sm:p-3.5 bg-white rounded-xl border border-[#E85B81]/35 flex items-start gap-2 sm:gap-2.5 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-[11px] sm:text-xs font-bold text-neutral-600 leading-tight font-sans">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CALL TO ACTION BUTTONS IF ONSELECTROLE OR ONNAVIGATETOPUBLICATE IS PROVIDED */}
        {(onSelectRole || onNavigateToPublicate) && (
          <motion.section variants={itemVariants} className="pt-1 sm:pt-2 text-center space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-2xl md:text-[26px] font-lux font-black text-[#E85B81] uppercase tracking-tight">
              {language === 'en' ? 'Ready to join Roos Capital?' : '¿Lista para formar parte de Roos Capital?'}
            </h3>
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
              <button
                onClick={() => {
                  if (onNavigateToPublicate) {
                     onNavigateToPublicate();
                  } else if (onSelectRole) {
                    onSelectRole('emprendedora');
                  }
                }}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-[#E85B81] hover:bg-[#DE4B73] text-white rounded-full font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer font-lux"
                id="somosroos-register-btn"
              >
                {language === 'en' ? 'Register My Business' : 'Registrar Mi Empresa'}
              </button>
              {onSelectRole && (
                <button
                  onClick={() => onSelectRole('votante')}
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#A85967] border border-[#E2A7B5] hover:bg-[#E2A7B5]/10 rounded-full font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer font-lux"
                  id="somosroos-explore-btn"
                >
                  {language === 'en' ? 'Explore Brands' : 'Explorar Marcas'}
                </button>
              )}
            </div>
          </motion.section>
        )}

      </motion.div>
    </div>
  );
}
