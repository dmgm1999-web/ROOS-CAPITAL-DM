import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft,
  Sparkles,
  BookOpen,
  TrendingUp,
  Coins,
  MessageCircle,
  Megaphone,
  Heart,
  Users,
  ChevronRight,
  ChevronLeft,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface EmprendedorasProps {
  onBack: () => void;
  onNavigateToView?: (view: 'educacion') => void;
}

export default function Emprendedoras({ onBack, onNavigateToView }: EmprendedorasProps) {
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState<number>(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleNext = () => {
    setCurrentBenefitIndex((prev) => (prev + 1) % 6);
  };

  const handlePrev = () => {
    setCurrentBenefitIndex((prev) => (prev - 1 + 6) % 6);
  };

  const resetAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    autoplayTimerRef.current = setInterval(handleNext, 4500);
  };

  useEffect(() => {
    autoplayTimerRef.current = setInterval(handleNext, 4500);
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNext();
      resetAutoplay();
    } else if (isRightSwipe) {
      handlePrev();
      resetAutoplay();
    }
  };

  // Animations variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: 'easeOut' as const } 
    }
  } as const;

  const benefits = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#E85B81]" />,
      title: "Vitrina Premium Todo el Año",
      description: "Tu proyecto se mantendrá en nuestro escaparate interactivo, visible para miles de clientas y compradoras potenciales que aman y apoyan activamente el consumo local liderado por mujeres."
    },
    {
      icon: <Coins className="w-6 h-6 text-brand-orange" />,
      title: "Financiamiento Democrático y sin Deudas",
      description: "Participa con tu comunidad por el fondo colectivo mensual (70% primer lugar, 20% segundo, 10% tercero). Olvídate de los préstamos bancarios tradicionales con altos intereses o barreras de entrada."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#E85B81]" />,
      title: "Ventas y Sinergias Directas",
      description: "Las personas se contactan directamente contigo para comprar, agendar o cotizar tus servicios vía WhatsApp o redes sociales. No cobramos comisiones de venta para que retengas el 100% de tus ganancias."
    },
    {
      icon: <Users className="w-6 h-6 text-brand-orange" />,
      title: "Comunidad de Intercambio de Poder",
      description: "Conéctate con otras empresarias maravillosas, comparte tus experiencias, crea alianzas comerciales y encuentra proveedoras de confianza dentro de un ecosistema que camina a tu lado."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-[#E85B81]" />,
      title: "Educación y Consultoría Sin Costo",
      description: "Recibe acceso exclusivo y completo a nuestros cursos de Educación Financiera, Liderazgo Corporativo y Marketing Digital para aprender a dominar tus flujos, costos y bases de clientes."
    },
    {
      icon: <Zap className="w-6 h-6 text-brand-orange" />,
      title: "Inversión Súper Accesible",
      description: "Por solo $350 MXN mensuales, tu negocio obtendrá publicidad enfocada, presencia destacada en el directorio, mentorías y una red de crecimiento para impulsar tu marca."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16 sm:pb-24 pt-4 sm:pt-6 font-sans" id="emprendedoras-view-container">
      
      {/* Back Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-10" id="emprendedoras-header-bar">
        <a 
          href="/"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault();
              onBack();
            }
          }}
          className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white border-2 border-[#E85B81]/30 hover:bg-[#FCE8EF]/40 text-[#E85B81] hover:text-[#DE4B73] hover:border-[#E85B81] rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          id="emprendedoras-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </a>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12 sm:space-y-16"
      >
        {/* HERO SECTION - PERSUASIVE & INSPIRATIONAL */}
        <motion.section variants={itemVariants} className="text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto" id="emprendedoras-hero">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#A85967] tracking-tight leading-snug sm:leading-none uppercase">
            El Éxito No Se Espera, <br />
            <span className="text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-4 sm:underline-offset-8">Se Construye Juntas</span>
          </h1>
        </motion.section>

        {/* WHY REGISTER? PERSUASIVE BENEFITS GRID */}
        <motion.section variants={itemVariants} className="space-y-8" id="emprendedoras-benefits-section">

          {/* Vista Desktop y Móvil Unificada: Carrusel Automático de Beneficios */}
          <div 
            className="relative mt-4 select-none touch-pan-y max-w-4xl mx-auto" 
            id="unified-carousel-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Botón Flecha Izquierda (Solo Desktop - Absoluto Lateral) */}
            <button
              onClick={() => {
                handlePrev();
                resetAutoplay();
              }}
              className="absolute left-[-60px] top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#E85B81]/30 bg-white text-[#E85B81] hover:bg-[#FCE8EF]/40 hover:text-[#DE4B73] hover:border-[#E85B81] hover:scale-105 active:scale-95 transition-all shadow-md group z-10 focus:outline-none"
              aria-label="Beneficio anterior"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Tarjeta Principal del Carrusel con Altura Estable */}
            <div className="relative overflow-hidden bg-white/90 backdrop-blur-md rounded-[1.5rem] sm:rounded-[2.5rem] border border-[#FCE8EF] p-5 sm:p-8 md:p-12 shadow-xs flex flex-col justify-between min-h-[350px] xs:min-h-[290px] md:min-h-[220px] transition-all hover:border-[#E85B81]/40">
              
              {/* Área del Slide */}
              <div className="relative flex-grow">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentBenefitIndex}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="space-y-4 md:space-y-0 md:flex items-center gap-4 md:gap-8"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 flex items-center justify-center shrink-0 shadow-inner">
                      {benefits[currentBenefitIndex].icon}
                    </div>
                    <div className="space-y-1.5 sm:space-y-2 text-left">
                      <span className="text-[9px] sm:text-[10px] font-black uppercase text-brand-orange tracking-[0.2em] block">
                        Beneficio Exclusivo {currentBenefitIndex + 1} de 6
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base md:text-lg text-[#E85B81] uppercase tracking-tight font-sans">
                        {benefits[currentBenefitIndex].title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-sans font-medium">
                        {benefits[currentBenefitIndex].description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controles de Navegación y Viñetas */}
              <div className="flex items-center justify-between pt-6 border-t border-[#E85B81]/10 mt-8">
                
                {/* Botón Flecha Izquierda (Móvil) */}
                <button
                  onClick={() => {
                    handlePrev();
                    resetAutoplay();
                  }}
                  className="p-3 rounded-full bg-white border-2 border-[#E85B81]/30 hover:bg-[#FCE8EF]/40 text-[#E85B81] hover:text-[#DE4B73] hover:border-[#E85B81] lg:hidden active:scale-95 transition-all focus:outline-none shadow-sm"
                  aria-label="Beneficio anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Viñetas Indicadoras */}
                <div className="flex items-center gap-2 sm:gap-2.5 mx-auto lg:mx-0">
                  {benefits.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentBenefitIndex(idx);
                        resetAutoplay();
                      }}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentBenefitIndex === idx 
                          ? 'w-8 bg-brand-orange shadow-sm' 
                          : 'w-2.5 bg-[#E85B81]/20 hover:bg-[#E85B81]/40'
                      }`}
                      aria-label={`Ver beneficio ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Botón Flecha Derecha (Móvil) */}
                <button
                  onClick={() => {
                    handleNext();
                    resetAutoplay();
                  }}
                  className="p-3 rounded-full bg-white border-2 border-[#E85B81]/30 hover:bg-[#FCE8EF]/40 text-[#E85B81] hover:text-[#DE4B73] hover:border-[#E85B81] lg:hidden active:scale-95 transition-all focus:outline-none shadow-sm"
                  aria-label="Siguiente beneficio"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>

              {/* Mensaje de Ayuda Deslizar (Móvil) */}
              <div className="text-[9px] text-center text-[#E85B81]/60 uppercase tracking-widest font-black mt-3 pt-1 block md:hidden">
                Desliza para ver más beneficios
              </div>

            </div>

            {/* Botón Flecha Derecha (Solo Desktop - Absoluto Lateral) */}
            <button
              onClick={() => {
                handleNext();
                resetAutoplay();
              }}
              className="absolute right-[-60px] top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#E85B81]/30 bg-white text-[#E85B81] hover:bg-[#FCE8EF]/40 hover:text-[#DE4B73] hover:border-[#E85B81] hover:scale-105 active:scale-95 transition-all shadow-md group z-10 focus:outline-none"
              aria-label="Siguiente beneficio"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.section>

        {/* PERSUASIVE INSPIRATIONAL QUOTE SECTION */}
        <motion.section variants={itemVariants} className="bg-gradient-to-br from-[#E85B81] to-[#C93B63] text-white rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-xl relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 p-8 opacity-10 text-white pointer-events-none">
            <Heart className="w-32 h-32" />
          </div>
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <p className="text-xs sm:text-sm md:text-2xl font-lora italic leading-relaxed text-white">
              "No estamos solas en esto. Cada una es un eslabón de una gran cadena de poder. Cuando decides registrar tu negocio en Roos Capital, no solamente buscas dinero: estás declarando ante el mundo que crees en tu valor, y que el crecimiento comunitario es de verdad la fuerza más poderosa del planeta."
            </p>
            <div className="inline-flex flex-col items-center">
              <span className="w-12 h-1 bg-white/30 rounded-full mb-3" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-white/90">Liderazgo Femenino Latino</span>
            </div>
          </div>
        </motion.section>

        {/* CTA BARS: WHAT'S NEXT? */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8" id="emprendedoras-cta">
          <div className="bg-white/90 backdrop-blur-md border border-[#FCE8EF] p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] space-y-4 shadow-xs hover:border-[#E85B81]/40 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-[#FCE8EF] border border-[#E85B81]/30 text-[#E85B81] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-[#E85B81] uppercase font-sans tracking-tight">Capacítate Gratuitamente</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans font-medium">
              El conocimiento te da libertad. Conoce nuestro módulo interactivo de formación exclusivo, donde aprenderás marketing digital básico, gestión de costos reales y administración para tu negocio.
            </p>
            <button 
              onClick={() => onNavigateToView?.('educacion')}
              className="mt-2 sm:mt-4 px-4 py-2 sm:px-5 sm:py-2.5 bg-white border-2 border-[#E85B81]/30 hover:bg-[#FCE8EF]/40 text-[#E85B81] hover:text-[#DE4B73] hover:border-[#E85B81] rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-1.5 sm:gap-2 focus:outline-none w-fit cursor-pointer"
            >
              Comenzar a aprender curso <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="bg-white/90 backdrop-blur-md border border-[#FCE8EF] p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] space-y-4 shadow-xs hover:border-[#E85B81]/40 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-brand-orange uppercase font-sans tracking-tight">Registra tu Emprendimiento</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans font-medium">
              ¿Lista para unirte al escaparate, promocionar tu marca, conectar con aliadas y competir por el capital de trabajo? Comunícate directamente con nosotras para asegurar tu cupo en esta convocatoria.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a 
                href="https://wa.me/5218123222533"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#25D366] text-white hover:bg-[#20bd5a] rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center gap-1.5 sm:gap-2 focus:outline-none no-underline"
              >
                WhatsApp <ChevronRight className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://t.me/rooscapital"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#229ED9] text-white hover:bg-[#1d8bbd] rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center gap-1.5 sm:gap-2 focus:outline-none no-underline"
              >
                Telegram <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.section>

      </motion.div>
    </div>
  );
}
