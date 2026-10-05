import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowLeft, 
  Video, 
  CheckCircle2, 
  Send, 
  Heart, 
  Zap, 
  Gift, 
  Share2
} from 'lucide-react';
import roseGoldPattern from '../assets/images/rose_gold_organic_pattern_1779358688635.png';
import { useLanguage } from '../context/LanguageContext';

interface UgcProgramProps {
  onBack: () => void;
}

export default function UgcProgram({ onBack }: UgcProgramProps) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    instagram: '',
    tiktok: '',
    ciudad: '',
    experiencia: 'Principiante / Apasionada',
    mensaje: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.whatsapp) return;

    // Build email links
    const emailSubject = language === 'en' ? 'UGC Creators Program Application' : 'UGC Program';
    const emailBody = language === 'en'
      ? `Hello Roos Capital! 🌟 I would like to join the UGC Creators Program.\n\nApplication Details:\n• Full Name: ${formData.nombre}\n• WhatsApp Contact: ${formData.whatsapp}\n• Instagram: ${formData.instagram || 'Not provided'}\n• TikTok: ${formData.tiktok || 'Not provided'}\n• City / State: ${formData.ciudad || 'Not provided'}\n• UGC Experience Level: ${formData.experiencia}\n• Notes / Portfolio: ${formData.mensaje || 'None'}`
      : `¡Hola Roos Capital! 🌟 Me gustaría unirme al Programa de Creadoras UGC.\n\nDatos de la postulación:\n• Nombre completo: ${formData.nombre}\n• WhatsApp de contacto: ${formData.whatsapp}\n• Instagram: ${formData.instagram || 'No proporcionado'}\n• TikTok: ${formData.tiktok || 'No proporcionado'}\n• Ciudad / Estado: ${formData.ciudad || 'No proporcionada'}\n• Nivel / Experiencia UGC: ${formData.experiencia}\n• Comentario / Portafolio: ${formData.mensaje || 'Sin comentario adicional'}`;

    const mailtoUrl = `mailto:rooscapital.mx@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rooscapital.mx@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Try opening via window.open to prevent iframe navigation block
    try {
      window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.open(mailtoUrl, '_blank');
    }

    setSubmitted(true);
  };

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
      {/* Background organic glow shapes matching SomosRoos */}
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
          className="flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-5 sm:py-2.5 bg-white/90 backdrop-blur-md border border-[var(--color-brand-border)] hover:bg-[var(--color-brand-border)]/15 text-[#A85967] rounded-full font-medium text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-xs hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          id="ugc-back-btn"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-[#A85967]" />
          <span>{t('common.backHome')}</span>
        </a>

        <span className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-1.5 bg-white/80 backdrop-blur-md border border-[var(--color-brand-border)]/50 text-[#A85967] rounded-full text-[10px] sm:text-xs font-bold shadow-xs whitespace-nowrap">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-orange animate-pulse shrink-0" />
          {language === 'en' ? 'Open Application' : 'Convocatoria Abierta'}
        </span>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10"
      >
        {/* HERO TITLE */}
        <motion.section variants={itemVariants} className="text-center max-w-4xl mx-auto px-2">
          <div className="inline-block mb-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3.5 py-1 rounded-full border border-brand-orange/20">
              {language === 'en' ? 'UGC Programs & Collaborations' : 'Programas UGC & Colaboraciones'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-lux font-black text-[#A85967] tracking-tight leading-tight uppercase">
            {language === 'en' ? 'UGC ' : 'Creadoras '}<span className="text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-8">{language === 'en' ? 'Creators' : 'UGC'}</span>
          </h1>
          <p className="mt-5 sm:mt-6 text-xs sm:text-sm font-semibold text-[#A85967]/80 uppercase tracking-wider">
            {language === 'en' 
              ? 'Calling all UGC creators! Opportunities and collaborations with women-owned businesses' 
              : '¡Buscamos chicas UGC! Trabajo para UGC y colaboraciones con empresas y negocios de mujeres'}
          </p>
        </motion.section>

        {/* HERO CARD */}
        <motion.section 
          variants={itemVariants} 
          className="relative bg-white/50 backdrop-blur-md rounded-tl-2xl rounded-tr-[3rem] rounded-bl-[3rem] rounded-br-2xl p-6 sm:p-10 border border-[var(--color-brand-border)]/40 shadow-xs space-y-6 text-[#A85967] text-center overflow-hidden"
        >
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url(${roseGoldPattern})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '1100px 800px',
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-lux font-bold text-[#A85967] leading-tight">
              {language === 'en' ? (
                <>Get featured for <span className="text-brand-orange underline decoration-[var(--color-brand-border)]">FREE</span> on our platform and connect your talent</>
              ) : (
                <>¡Te publicamos <span className="text-brand-orange underline decoration-[var(--color-brand-border)]">GRATIS</span> en nuestra plataforma y conectamos tu talento</>
              )}
            </h2>

            <p className="font-sans font-normal text-sm sm:text-base text-[#A85967]/90 leading-relaxed max-w-2xl mx-auto">
              {language === 'en'
                ? 'We are looking for UGC creators seeking exposure to boost their professional portfolio and connect in collaborations with new brands.'
                : 'Buscamos chicas UGC y creadoras de contenido que deseen exposicion para impulsar  su portafolio profesional y conectar en colaboraciones con nuevas marcas'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[var(--color-brand-border)]/40 text-[#A85967] font-semibold text-xs shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'en' ? '100% Free' : '100% Gratuito'}
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[var(--color-brand-border)]/40 text-[#A85967] font-semibold text-xs shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'en' ? 'No follower minimum' : 'Sin mínimo de seguidores'}
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[var(--color-brand-border)]/40 text-[#A85967] font-semibold text-xs shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'en' ? 'Real UGC Deals' : 'Colaboraciones UGC Reales'}
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[var(--color-brand-border)]/40 text-[#A85967] font-semibold text-xs shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'en' ? 'Partner Brands' : 'Empresas UGC Aliadas'}
              </span>
            </div>
          </div>
        </motion.section>

        {/* CALLOUT BANNER */}
        <motion.section 
          variants={itemVariants} 
          className="text-center py-2 px-2"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-lux font-black text-[#A85967] tracking-tight leading-snug uppercase">
            <span className="block">
              {language === 'en' ? (
                <>Win - <span className="text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-4 sm:underline-offset-8">Win Partnership</span></>
              ) : (
                <>Alianza <span className="text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-4 sm:underline-offset-8">Ganar - Ganar</span></>
              )}
            </span>
            <span className="text-[#DE4B73] block text-base sm:text-lg md:text-xl font-lux font-bold mt-2">
              {language === 'en' ? 'We elevate your talent at zero cost' : 'Potenciamos tu talento sin costo'}
            </span>
          </h2>
        </motion.section>

        {/* TWO CARDS GRID: WHAT YOU GET / WHAT WE ASK */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: What you get */}
          <div className="bg-white rounded-[2.5rem] p-7 sm:p-9 border border-[#FCE8EF] shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FCE8EF] border border-[#E85B81]/30 flex items-center justify-center mb-5 text-[#E85B81]">
                <Gift className="w-6 h-6 text-[#E85B81]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-lux font-bold text-[#E85B81] mb-3">
                {language === 'en' ? '1. What You Get' : '1. Lo que obtienes tú'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed font-sans">
                {language === 'en' 
                  ? 'An exclusive professional spotlight to feature your creativity in front of brands and businesses ready to collaborate and hire.'
                  : 'Una vitrina profesional exclusiva para dar a conocer tu talento frente a marcas y empresas UGC listas para contratar y colaborar.'}
              </p>

              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 font-sans">
                  <div className="w-5 h-5 rounded-full bg-[#FCE8EF] text-[#E85B81] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E85B81]" />
                  </div>
                  <span>
                    <strong className="font-bold text-[#E85B81]">{language === 'en' ? 'Custom Card: ' : 'Tarjeta personalizada: '}</strong>
                    {language === 'en' ? 'Showcase your photo, bio, and creator tags in the official directory.' : 'Publica tu anuncio con tu rostro en una imagen y destaca tu perfil de creadora UGC.'}
                  </span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 font-sans">
                  <div className="w-5 h-5 rounded-full bg-[#FCE8EF] text-[#E85B81] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E85B81]" />
                  </div>
                  <span>
                    <strong className="font-bold text-[#E85B81]">{language === 'en' ? 'Brand Connections: ' : 'Conexión con Pymes y Negocios de Mujeres: '}</strong>
                    {language === 'en' ? 'Dozens of women-led businesses will discover you for content and commercial projects.' : 'Decenas de empresas de mujeres te descubrirán para proyectos comerciales.'}
                  </span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 font-sans">
                  <div className="w-5 h-5 rounded-full bg-[#FCE8EF] text-[#E85B81] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E85B81]" />
                  </div>
                  <span>
                    <strong className="font-bold text-[#E85B81]">{language === 'en' ? 'Build Your Portfolio: ' : 'Impulso y Trabajo para UGC: '}</strong>
                    {language === 'en' ? 'Build a proven track record of UGC campaigns with top brands.' : 'Construye un historial sólido en colaboraciones UGC con marcas líderes y agencias UGC.'}
                  </span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 font-sans">
                  <div className="w-5 h-5 rounded-full bg-[#FCE8EF] text-[#E85B81] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E85B81]" />
                  </div>
                  <span>
                    <strong className="font-bold text-[#E85B81]">{language === 'en' ? 'Direct Links: ' : 'Enlaces Directos: '}</strong>
                    {language === 'en' ? 'Your social media & contact info accessible for quick outreach.' : 'Tus datos de contacto visibles para colaboraciones y contrataciones inmediatas.'}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: What we ask */}
          <div className="bg-white rounded-[2.5rem] p-7 sm:p-9 border border-[#FCE8EF] shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FCE8EF] border border-[#E85B81]/30 flex items-center justify-center mb-5 text-[#E85B81]">
                <Share2 className="w-6 h-6 text-[#E85B81]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-lux font-bold text-[#E85B81] mb-3">
                {language === 'en' ? '2. All We Ask In Return' : '2. Lo único que te pedimos'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed font-sans">
                {language === 'en'
                  ? 'A transparent, collaborative partnership focused on amplifying our women’s community.'
                  : 'Un intercambio transparente, justo y dinámico basado en la difusión de nuestra comunidad de mujeres.'}
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 border border-[#FCE8EF] shadow-2xs">
                  <div className="flex items-center gap-3 mb-2">
                    <Video className="w-5 h-5 text-[#E85B81]" />
                    <h4 className="font-bold text-sm sm:text-base text-[#E85B81]" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {language === 'en' ? '2 Posts per Month' : '2 Publicaciones por Mes'}
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed font-sans mb-2.5">
                    {language === 'en' ? (
                      <>Share <strong>2 short-form videos per month</strong> across your social channels (Reel, TikTok, or Short) speaking about Roos Capital Marketplace.</>
                    ) : (
                      <>Publica <strong>2 videos a lo largo del mes</strong> en cualquiera de tus redes sociales, en formato (Short, Reel o TikTok) hablando sobre Roos Capital Marketplace.</>
                    )}
                  </p>
                  <div className="pt-2 border-t border-[#FCE8EF] text-[13px] sm:text-[14px] font-bold text-[#E85B81] font-sans not-italic">
                    {language === 'en'
                      ? '* Send your content preview via WhatsApp or Telegram for approval before the 22nd of each month.'
                      : '* Envía tu contenido a administración vía WhatsApp o Telegram para su aprobación antes de la publicación cada día 22 del mes en curso.'}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#FCE8EF] shadow-2xs">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-5 h-5 text-[#E85B81]" />
                    <h4 className="font-bold text-sm sm:text-base text-[#E85B81]" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {language === 'en' ? 'Zero Follower Minimum!' : '¡Cero Mínimo de Seguidores!'}
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                    {language === 'en' ? (
                      <>It does not matter whether you have 100 or 100,000 followers. We value your <strong>authenticity, creativity, and enthusiasm</strong> to thrive.</>
                    ) : (
                      <>No importa si tienes 100 o 100,000 seguidores. Valoramos tu <strong>autenticidad, creatividad y ganas de destacar</strong> en el mundo digital.</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 3 STEP PROCESS */}
        <motion.section 
          variants={itemVariants} 
          className="bg-white rounded-[2.5rem] p-7 sm:p-10 border border-[#FCE8EF] shadow-xs space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs sm:text-sm font-lux font-bold text-brand-orange uppercase tracking-[0.2em] block">
              {language === 'en' ? 'Step by Step' : 'Paso a Paso'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-lux font-black text-[#A85967] uppercase tracking-[0.05em]">
              {language === 'en' ? (
                <>How to join <span className="text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-4 sm:underline-offset-8">in 3 steps?</span></>
              ) : (
                <>¿Cómo unirte <span className="text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-4 sm:underline-offset-8">en 3 pasos?</span></>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-[#FCE8EF] hover:border-[#E85B81]/40 transition-all shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-[#FCE8EF] border border-[#E85B81]/30 text-[#E85B81] font-lux font-black flex items-center justify-center text-base mb-4">
                1
              </div>
              <h3 className="font-lux font-bold text-[#E85B81] text-base sm:text-lg mb-2">
                {language === 'en' ? 'Submit Your Info' : 'Llena tus Datos'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                {language === 'en' 
                  ? 'Complete the short form below with your social profile links and details.' 
                  : 'Completa el breve formulario a continuación con la información básica de tus redes.'}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-[#FCE8EF] hover:border-[#E85B81]/40 transition-all shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-[#FCE8EF] border border-[#E85B81]/30 text-[#E85B81] font-lux font-black flex items-center justify-center text-base mb-4">
                2
              </div>
              <h3 className="font-lux font-bold text-[#E85B81] text-base sm:text-lg mb-2">
                {language === 'en' ? 'We Feature You' : 'Publicamos tu Perfil'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                {language === 'en'
                  ? 'We publish your official UGC Creator card in our directory for brands to discover.'
                  : 'Creamos tu ficha oficial de Creadora UGC en nuestro sitio web para que las empresarias te encuentren.'}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-[#FCE8EF] hover:border-[#E85B81]/40 transition-all shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-[#FCE8EF] border border-[#E85B81]/30 text-[#E85B81] font-lux font-black flex items-center justify-center text-base mb-4">
                3
              </div>
              <h3 className="font-lux font-bold text-[#E85B81] text-base sm:text-lg mb-2">
                {language === 'en' ? 'Create & Connect' : 'Crea y Conecta'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                {language === 'en'
                  ? 'Share your creative videos, express your authentic style, and start receiving collaboration proposals.'
                  : 'Sube tu contenido sobre Roos, ¡Tienes libertad creativa para expresarte!; Comienza a recibir colaboraciones con marcas líderes, o envía tus propuestas directamente.'}
              </p>
            </div>
          </div>
        </motion.section>

        {/* REGISTRATION FORM SECTION */}
        <motion.section 
          variants={itemVariants} 
          className="bg-white rounded-[2.5rem] border border-[#FCE8EF] shadow-xs p-7 sm:p-12 relative overflow-hidden"
        >
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FCE8EF] text-[#E85B81] border border-[#E85B81]/30 rounded-full text-xs font-lux font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-[#E85B81]" />
                {language === 'en' ? 'Instant Application' : 'Postulación Inmediata'}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-lux font-black text-[#A85967] uppercase tracking-tight">
                {language === 'en' ? (
                  <>Join as a <span className="text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-4 sm:underline-offset-8 inline-block whitespace-nowrap">ROOS UGC Creator!</span></>
                ) : (
                  <>
                    ¡Quiero ser{' '}
                    <span className="text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-4 sm:underline-offset-8 inline-block whitespace-nowrap">
                      Creadora UGC de&nbsp;Roos!
                    </span>
                  </>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-sans">
                {language === 'en'
                  ? 'Complete your details to activate your free creator profile in our directory.'
                  : 'Completa la información para dar de alta tu perfil gratuito de creadora en nuestra plataforma.'}
              </p>

              {/* Limited spots notice */}
              <div className="bg-white border border-[#E85B81]/25 rounded-2xl p-4 flex items-start gap-3 text-left max-w-xl mx-auto mt-4 shadow-2xs">
                <Sparkles className="w-5 h-5 text-[#E85B81] shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-800 leading-relaxed font-sans space-y-1">
                  <strong className="font-bold text-[#E85B81] block text-xs sm:text-sm mb-1">
                    {language === 'en' ? 'Limited Monthly Spots:' : 'Cupos Limitados por Mes:'}
                  </strong>
                  <p>{language === 'en' ? 'To ensure quality exposure and direct brand deals for each creator, monthly admissions are limited.' : 'Con el propósito de brindar el máximo impulso y exposición de calidad a cada una de nuestras creadoras, la admisión mensual es restringida.'}</p>
                  <p>{language === 'en' ? 'If you are interested, we encourage applying today.' : 'Si estás interesada en unirte, te recomendamos enviar tu información a la brevedad.'}</p>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-50/90 backdrop-blur-md border border-emerald-200 rounded-2xl p-8 text-center text-emerald-900 space-y-3"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg sm:text-xl font-lux font-bold text-emerald-900">
                    {language === 'en' ? 'Application Submitted Successfully!' : '¡Postulación Enviada con Éxito!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto font-sans">
                    {language === 'en' ? (
                      <>Your application has been received. Our team will review your profile and contact you promptly.</>
                    ) : (
                      <>Tu información ha sido enviada a <strong>rooscapital.mx@gmail.com</strong>. Nuestro equipo revisará los datos de tu perfil a la brevedad.</>
                    )}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#E85B81] mb-1.5">
                        {language === 'en' ? 'Full Name *' : 'Nombre Completo *'}
                      </label>
                      <input 
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder={language === 'en' ? 'e.g. Sarah Jenkins' : 'Ej. Sofía Rodríguez'}
                        className="w-full px-4 py-3 bg-white/90 border border-[#FCE8EF] hover:border-[#E85B81]/40 rounded-2xl text-xs font-semibold text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E85B81]/20 focus:border-[#E85B81] transition-all shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#E85B81] mb-1.5">
                        {language === 'en' ? 'Contact WhatsApp *' : 'WhatsApp de Contacto *'}
                      </label>
                      <input 
                        type="tel"
                        required
                        value={formData.whatsapp}
                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder={language === 'en' ? 'e.g. +1 555 123 4567' : 'Ej. +52 81 1234 5678'}
                        className="w-full px-4 py-3 bg-white/90 border border-[#FCE8EF] hover:border-[#E85B81]/40 rounded-2xl text-xs font-semibold text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E85B81]/20 focus:border-[#E85B81] transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#E85B81] mb-1.5">
                        {language === 'en' ? 'Instagram (@username)' : 'Instagram (@usuario)'}
                      </label>
                      <input 
                        type="text"
                        value={formData.instagram}
                        onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                        placeholder="@yourhandle"
                        className="w-full px-4 py-3 bg-white/90 border border-[#FCE8EF] hover:border-[#E85B81]/40 rounded-2xl text-xs font-semibold text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E85B81]/20 focus:border-[#E85B81] transition-all shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#E85B81] mb-1.5">
                        {language === 'en' ? 'TikTok (@username)' : 'TikTok (@usuario)'}
                      </label>
                      <input 
                        type="text"
                        value={formData.tiktok}
                        onChange={e => setFormData({ ...formData, tiktok: e.target.value })}
                        placeholder="@yourhandle"
                        className="w-full px-4 py-3 bg-white/90 border border-[#FCE8EF] hover:border-[#E85B81]/40 rounded-2xl text-xs font-semibold text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E85B81]/20 focus:border-[#E85B81] transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#E85B81] mb-1.5">
                        {language === 'en' ? 'City / State' : 'Ciudad / Estado'}
                      </label>
                      <input 
                        type="text"
                        value={formData.ciudad}
                        onChange={e => setFormData({ ...formData, ciudad: e.target.value })}
                        placeholder={language === 'en' ? 'e.g. Austin, New York, Los Angeles...' : 'Ej. Monterrey, CDMX, Guadalajara...'}
                        className="w-full px-4 py-3 bg-white/90 border border-[#FCE8EF] hover:border-[#E85B81]/40 rounded-2xl text-xs font-semibold text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E85B81]/20 focus:border-[#E85B81] transition-all shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#E85B81] mb-1.5">
                        {language === 'en' ? 'UGC Experience Level' : 'Nivel / Experiencia UGC'}
                      </label>
                      <select
                        value={formData.experiencia}
                        onChange={e => setFormData({ ...formData, experiencia: e.target.value })}
                        className="w-full px-4 py-3 bg-white/90 border border-[#FCE8EF] hover:border-[#E85B81]/40 rounded-2xl text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#E85B81]/20 focus:border-[#E85B81] transition-all shadow-2xs"
                      >
                        <option value="Principiante / Apasionada">
                          {language === 'en' ? 'Beginner (Just starting out)' : 'Principiante (Voy empezando)'}
                        </option>
                        <option value="Intermedio">
                          {language === 'en' ? 'Intermediate (Created several videos)' : 'Intermedio (Ya he creado varios videos)'}
                        </option>
                        <option value="Avanzado / Pro">
                          {language === 'en' ? 'Pro (Established portfolio)' : 'Pro (Tengo portafolio consolidado)'}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#E85B81] mb-1.5">
                      {language === 'en' ? 'Notes or Portfolio Link (Optional)' : 'Comentario o Enlace a Portafolio (Opcional)'}
                    </label>
                    <textarea 
                      rows={3}
                      value={formData.mensaje}
                      onChange={e => setFormData({ ...formData, mensaje: e.target.value })}
                      placeholder={language === 'en' ? 'Tell us a bit about yourself or paste your portfolio link...' : 'Cuéntanos un poco sobre ti o comparte el link de tus videos...'}
                      className="w-full px-4 py-3 bg-white/90 border border-[#FCE8EF] hover:border-[#E85B81]/40 rounded-2xl text-xs font-semibold text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E85B81]/20 focus:border-[#E85B81] transition-all shadow-2xs resize-none"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-8 bg-[#E85B81] hover:bg-[#DE4B73] text-white rounded-full font-lux font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
                      id="ugc-submit-btn"
                    >
                      <Send className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                      <span>{language === 'en' ? 'Submit Application' : 'Postularme'}</span>
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

