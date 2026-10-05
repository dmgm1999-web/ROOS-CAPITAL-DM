import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Crown, 
  Sparkles, 
  TrendingUp, 
  Heart, 
  Users, 
  DollarSign, 
  Zap, 
  Smile, 
  Clock, 
  Coffee, 
  ShieldCheck, 
  Send, 
  ChevronRight, 
  Flame, 
  Star 
} from 'lucide-react';
import roseGoldPattern from '../assets/images/rose_gold_organic_pattern_1779358688635.png';
import { useLanguage } from '../context/LanguageContext';

interface AmbassadorsProps {
  onBack: () => void;
  onOpenForm?: () => void;
}

export default function Ambassadors({ onBack, onOpenForm }: AmbassadorsProps) {
  const { t, language } = useLanguage();
  const handleApply = () => {
    if (onOpenForm) {
      onOpenForm();
    } else {
      window.open('https://forms.gle/G3sfbu56EtpxZUvn9', '_blank');
    }
  };

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

  const incomeTiers = [
    { 
      count: '50', 
      label: language === 'en' ? 'active members' : 'emprendedoras activas', 
      amount: '85 USD', 
      suffix: language === 'en' ? 'deposited automatically.' : 'llegando solos.', 
      highlight: true 
    },
    { 
      count: '100', 
      label: language === 'en' ? 'active members' : 'emprendedoras activas', 
      amount: '170 USD', 
      suffix: language === 'en' ? 'as steady recurring income.' : 'como un ingreso fijo.', 
      highlight: true 
    },
    { 
      count: '200', 
      label: language === 'en' ? 'active members' : 'emprendedoras activas', 
      amount: '340 USD', 
      suffix: language === 'en' ? 'and compounding monthly.' : 'y sigue subiendo.', 
      highlight: true 
    },
    { 
      count: '800', 
      label: language === 'en' ? 'active members' : 'emprendedoras activas', 
      amount: '$1,360 USD', 
      suffix: language === 'en' ? 'straight into your account.' : 'directo a tu cuenta.', 
      highlight: true 
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-20 sm:pb-28 pt-4 sm:pt-6 font-sans relative overflow-hidden">
      {/* Background organic glow shapes matching UgcProgram / Publicate / SomosRoos */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-[var(--color-brand-border)]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-4 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-[var(--color-brand-border)]/25 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header with Back button and Status Badge */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <a 
          href="/"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault();
              onBack();
            }
          }}
          className="flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-5 sm:py-2.5 bg-white/90 backdrop-blur-md border border-[var(--color-brand-border)] hover:bg-[var(--color-brand-border)]/15 text-[var(--color-brand-wine)] rounded-full font-medium text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-xs hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          id="ambassadors-back-btn"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-brand-wine)]" />
          <span>{t('common.backHome')}</span>
        </a>

        <span className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-1.5 bg-white/80 backdrop-blur-md border border-[var(--color-brand-border)]/50 text-[var(--color-brand-wine)] rounded-full text-[10px] sm:text-xs font-bold shadow-xs whitespace-nowrap">
          <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-orange shrink-0" />
          {language === 'en' ? 'Ambassadors Program' : 'Programa de embajadoras'}
        </span>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 sm:space-y-10"
      >
        {/* HERO TITLE & SUBTITLE */}
        <motion.section variants={itemVariants} className="text-center max-w-4xl mx-auto space-y-3 sm:space-y-4 px-2">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-lux font-black text-[var(--color-brand-wine)] tracking-tight leading-tight uppercase">
            {language === 'en' ? (
              <>Ambassadors <span className="text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-8">Program</span></>
            ) : (
              <>Programa de <span className="text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-8">Embajadoras</span></>
            )}
          </h1>
        </motion.section>

        {/* ORGANIC HERO CARD WITH ROSE GOLD BACKGROUND PATTERN */}
        <motion.section 
          variants={itemVariants} 
          className="relative bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-tl-[3rem] sm:rounded-tr-2xl sm:rounded-bl-2xl sm:rounded-br-[3rem] p-4 sm:p-10 border border-[var(--color-brand-border)]/40 shadow-xs space-y-4 sm:space-y-6 text-[var(--color-brand-wine)]"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(250, 240, 243, 0.85) 100%), url(${roseGoldPattern})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '1100px 800px',
          }}
        >
          <div className="space-y-3 sm:space-y-4 text-xs sm:text-[17.5px] leading-relaxed text-[var(--color-brand-wine)] font-medium" style={{ fontFamily: 'Verdana, sans-serif' }}>
            <p>
              {language === 'en' ? (
                <>Can you imagine waking up every morning without an alarm dictating when to start? Generating income while caring for your family, exercising, or enjoying coffee at your own pace? That’s not a dream; it’s the reality that <strong className="font-extrabold text-[var(--color-brand-wine)]">The Roos Capital Ambassadors Program</strong> provides from day one.</>
              ) : (
                <>¿Te imaginas despertar cada mañana sin una alarma que te dicte cuándo empezar? ¿Generar ingresos mientras atiendes a tus hijos, haces ejercicio o disfrutas tu café sin prisas? Eso no es un sueño; es la realidad que <strong className="font-extrabold text-[var(--color-brand-wine)]">El Programa de Embajadoras de Roos Capital</strong> te ofrece desde el primer día.</>
              )}
            </p>
            <p>
              {language === 'en' ? (
                <>This is not just another job. It is an opportunity to build your own recurring salary from home, with zero bosses, rigid schedules, or income ceilings. You don’t sell physical goods, deal with shipping, or manage inventory. Your mission is to connect, invite, and grow a vibrant network of women entrepreneurs, in person or digitally. And for every entrepreneur who joins Roos Capital through you, you earn <strong className="text-brand-orange font-black text-base sm:text-xl">a 6.54% recurring commission</strong> on membership fees, month after month or year after year.</>
              ) : (
                <>Esto no es un trabajo más. Es una oportunidad de construir tu propio salario fijo desde casa, sin jefes, sin horarios rígidos y sin un tope de ganancias. Aquí no vendes productos físicos, no haces entregas ni lidias con inventarios. Tu misión es conectar, invitar y crecer una comunidad de mujeres emprendedoras, ya sea en persona o de forma digital. Y por cada una que se une a Roos Capital gracias a ti, recibes <strong className="text-brand-orange font-black text-base sm:text-xl">el 6.54% de comisión</strong> del valor de nuestras suscripciones, ya sea mensual o anual.</>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
            <div className="p-3 sm:p-3.5 bg-white/90 rounded-xl sm:rounded-2xl border border-[var(--color-brand-border)]/40 flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#FAEDF0] flex items-center justify-center text-[var(--color-brand-wine)] shrink-0">
                <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-[var(--color-brand-wine)]">
                {language === 'en' ? 'No bosses or fixed hours' : 'Sin jefes ni horarios'}
              </span>
            </div>
            <div className="p-3 sm:p-3.5 bg-white/90 rounded-xl sm:rounded-2xl border border-[var(--color-brand-border)]/40 flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#FAEDF0] flex items-center justify-center text-[var(--color-brand-wine)] shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-[var(--color-brand-wine)]">
                {language === 'en' ? 'No inventory or shipping' : 'Sin inventarios ni envíos'}
              </span>
            </div>
            <div className="p-3 sm:p-3.5 bg-white/90 rounded-xl sm:rounded-2xl border border-[var(--color-brand-border)]/40 flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#FAEDF0] flex items-center justify-center text-[var(--color-brand-wine)] shrink-0">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-[var(--color-brand-wine)]">
                {language === 'en' ? 'Uncapped earning potential' : 'Sin tope de ganancias'}
              </span>
            </div>
          </div>
        </motion.section>

        {/* THE GAME-CHANGER COMPARISON SECTION */}
        <motion.section 
          variants={itemVariants}
          className="bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-9 border border-[var(--color-brand-border)]/40 shadow-xs space-y-4 sm:space-y-6"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 border-b border-[var(--color-brand-border)]/30 pb-3 sm:pb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-brand-orange/15 flex items-center justify-center text-brand-orange font-black">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h2 className="text-sm sm:text-lg md:text-xl font-lux font-extrabold text-[var(--color-brand-wine)] uppercase tracking-tight">
              {language === 'en' ? 'Now, pay close attention because this changes everything:' : 'Ahora, presta mucha atención porque esto es lo que cambia todo:'}
            </h2>
          </div>

          <div className="flex flex-col gap-3.5 sm:gap-5 pt-1">
            {/* Traditional sales */}
            <div className="p-4 sm:p-6 bg-[#FAF5F7] rounded-xl sm:rounded-2xl border border-gray-200/80 space-y-2 sm:space-y-3">
              <div className="text-[11px] sm:text-xs font-lux font-extrabold uppercase tracking-wider text-gray-500 flex items-center gap-1.5 sm:gap-2">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {language === 'en' ? 'Traditional Sales' : 'Venta Tradicional'}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                {language === 'en'
                  ? 'Imagine you sell a $1.70 USD product today. You get paid once, and that’s it. To earn again, you must sell another item, starting from zero each month, restocking inventory, and chasing new customers non-stop.'
                  : 'Imagina que hoy vendes un producto de 1.7 USD, recibes tu pago y ya; Fin. Para volver a ganar, tendrías que vender otro, y el mes siguiente deberás comenzar de cero otra vez, hacer inventario de nuevo y buscar nuevas clientas constantemente.'}
              </p>
            </div>

            {/* Roos Model */}
            <div className="pt-5 pb-4 px-4 sm:p-6 bg-gradient-to-br from-[#FFF0F4] via-white to-[#FAEDF0] rounded-xl sm:rounded-2xl border-2 border-[var(--color-brand-border)] shadow-2xs space-y-2 sm:space-y-3 relative overflow-visible sm:overflow-hidden">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-2 sm:right-2 sm:left-auto sm:translate-x-0 sm:translate-y-0 px-2.5 py-0.5 bg-[#FAEDF0] border border-[var(--color-brand-border)] text-[var(--color-brand-wine)] text-[8px] sm:text-[9px] font-lux font-black uppercase rounded-full tracking-wider shadow-2xs whitespace-nowrap z-10">
                {language === 'en' ? 'The Roos Model' : 'El Modelo Roos'}
              </span>
              <div className="text-[11px] sm:text-xs font-lux font-extrabold uppercase tracking-wider text-[var(--color-brand-wine)] flex items-center gap-1.5 sm:gap-2 pt-0.5 sm:pt-0">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange shrink-0" /> 
                {language === 'en' ? 'Automated Recurring Revenue' : 'Ingresos Recurrentes Automáticos'}
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-brand-wine)] leading-relaxed font-sans font-medium">
                {language === 'en' ? (
                  <>At Roos Capital it is completely different: when an entrepreneur subscribes with your recommendation, <strong className="font-extrabold text-[var(--color-brand-wine)]" style={{ fontFamily: 'Verdana, sans-serif' }}>it is like selling a $1.70 USD product that automatically sells itself month after month, with earnings arriving straight to your pocket.</strong></>
                ) : (
                  <>En Roos Capital es diferente: cuando una emprendedora se incorpora por tu recomendación, <strong className="font-extrabold text-[var(--color-brand-wine)]" style={{ fontFamily: 'Verdana, sans-serif' }}>es como si vendieras un producto de 1.7 USD, que se sigue vendiendo en automático mes tras mes, y esa ganancia llega directo a tu bolsillo.</strong></>
                )}
              </p>
              <p className="text-xs sm:text-[17px] text-[var(--color-brand-wine)]/90 leading-relaxed font-sans">
                {language === 'en'
                  ? 'Because as long as that member you introduced keeps her listing active with us, you keep receiving your commission. No awkward follow-ups, no continuous re-selling. A single connection yields ongoing income.'
                  : 'Porque mientras esa emprendedora que tu inscribiste mantenga su membresía activa con nosotros, tú sigues recibiendo tu comisión. Sin volver a convencerla, sin seguimientos forzosos; Una sola conexión, ingresos recurrentes.'}
              </p>
            </div>
          </div>
        </motion.section>

        {/* INCOME PROJECTION TABLE / CARDS */}
        <motion.section 
          variants={itemVariants}
          className="bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-9 border border-[var(--color-brand-border)]/40 shadow-xs space-y-4 sm:space-y-6"
        >
          <div className="text-center space-y-1.5 sm:space-y-2 max-w-xl mx-auto">
            <span className="text-[11px] sm:text-xs font-lux font-black uppercase tracking-widest text-brand-orange">
              {language === 'en' ? 'Financial Projection' : 'Proyección Financiera'}
            </span>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-lux font-black text-[var(--color-brand-wine)] uppercase tracking-tight">
              {language === 'en' ? 'See how your earnings grow:' : 'Veamos cómo crece esto:'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {incomeTiers.map((tier, idx) => (
              <div 
                key={idx}
                className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border transition-all flex flex-col justify-between ${
                  tier.highlight 
                    ? 'bg-gradient-to-b from-white to-[#FFF0F4] border-[var(--color-brand-border)] shadow-xs' 
                    : 'bg-white/90 border-[var(--color-brand-border)]/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-[#FAEDF0] text-brand-orange flex items-center justify-center shrink-0">
                    <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-lux font-bold text-[var(--color-brand-wine)] uppercase" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {tier.count} {tier.label}
                  </span>
                </div>

                <div className="mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
                  <div 
                    className="text-2xl sm:text-[44px] font-lux font-black text-[var(--color-brand-wine)] tracking-tight text-center"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {tier.amount} <span className="text-[11px] sm:text-xs font-bold text-[var(--color-brand-wine)]/70">/{language === 'en' ? 'mo' : 'mes'}</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[var(--color-brand-wine)]/80 font-sans italic text-center">
                    {tier.suffix}
                  </p>
                </div>
              </div>
            ))}

            {/* Unlimited tier highlight card */}
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FAEDF0] via-[#FFF5F7] to-[#FAEDF0] text-[var(--color-brand-wine)] border-2 border-[var(--color-brand-border)]/80 flex flex-col justify-between sm:col-span-2 lg:col-span-2 shadow-2xs">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange" />
                <span className="text-xs sm:text-[17px] font-lux font-black uppercase tracking-wider text-brand-orange text-center">
                  {language === 'en' ? 'No Upper Limit!' : '¡Sin Límite!'}
                </span>
              </div>
              <div className="text-base sm:text-[24.5px] font-lux font-black text-[var(--color-brand-wine)] leading-snug text-center">
                {language === 'en' ? 'The larger your community, the higher your income.' : 'Más grande tu comunidad, más alto tu ingreso.'}
              </div>
              <p className="text-[11px] sm:text-[13px] text-[var(--color-brand-wine)]/90 font-sans mt-1.5 sm:mt-2 font-medium text-center">
                {language === 'en' ? 'You never start from scratch. Your momentum builds month over month.' : 'Nunca empiezas de cero. Tu esfuerzo se acumula mes con mes.'}
              </p>
            </div>
          </div>
        </motion.section>

        {/* URGENCY & FINAL CALL TO ACTION */}
        <motion.section 
          variants={itemVariants} 
          className="bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-9 border border-[var(--color-brand-border)]/40 shadow-xs text-center space-y-4 sm:space-y-6"
        >
          <div className="max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-full text-[10px] sm:text-xs font-lux font-extrabold uppercase">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" /> {language === 'en' ? 'Limited Openings' : 'Plazas Limitadas'}
            </div>
            <p className="text-xs sm:text-sm md:text-base text-[var(--color-brand-wine)]/85 font-sans font-medium">
              {language === 'en'
                ? 'No prior sales experience, follower minimum, or upfront financial investment required.'
                : 'No necesitas experiencia previa, ni seguidores, ni inversión inicial.'}
            </p>
            <h3 className="text-sm sm:text-lg md:text-xl font-lux font-extrabold text-[var(--color-brand-wine)] uppercase tracking-tight">
              {language === 'en'
                ? 'Are you ready to work from home on your own schedule and build uncapped recurring income?'
                : '¿Estás lista para trabajar desde casa, a tu ritmo, y construir un ingreso sin límites?'}
            </h3>
          </div>

          <div className="pt-1 sm:pt-2">
            <button
              onClick={handleApply}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-[var(--color-brand-wine)] hover:bg-[#8E4755] text-white rounded-full font-lux font-bold text-[11px] sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
              id="ambassadors-apply-btn"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="sm:hidden">{language === 'en' ? 'Become an Ambassador' : 'Quiero ser embajadora'}</span>
              <span className="hidden sm:inline">{language === 'en' ? 'I WANT TO BE A ROOS AMBASSADOR' : 'QUIERO SER EMBAJADORA ROOS'}</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </button>
          </div>
        </motion.section>

      </motion.div>
    </div>
  );
}
