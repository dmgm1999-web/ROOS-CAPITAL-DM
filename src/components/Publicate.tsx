import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowLeft, 
  Clock, 
  ShieldAlert, 
  CreditCard, 
  CheckCircle2, 
  Store, 
  ShieldCheck,
  AlertTriangle,
  Award,
  Send,
  Heart
} from 'lucide-react';
import roseGoldPattern from '../assets/images/rose_gold_organic_pattern_1779358688635.png';
import { ContactModal } from './ContactModal';
import { useLanguage } from '../context/LanguageContext';

interface PublicateProps {
  onBack: () => void;
  onOpenForm?: () => void;
  onOpenContact?: () => void;
}

export default function Publicate({ onBack, onOpenForm, onOpenContact }: PublicateProps) {
  const { t, language } = useLanguage();
  const [showContactModal, setShowContactModal] = useState(false);

  const handleOpenContact = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      setShowContactModal(true);
    }
  };

  const handleOpenForm = () => {
    if (onOpenForm) {
      onOpenForm();
    } else {
      window.open('https://forms.gle/izRobrUsjQrWJFAP9', '_blank');
    }
  };

  // Animation variants
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
      {/* Background organic glow shapes matching UgcProgram / SomosRoos */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-[#E2A7B5]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-4 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-[#E2A7B5]/25 rounded-full blur-3xl pointer-events-none -z-10" />

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
          className="flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-5 sm:py-2.5 bg-white/90 backdrop-blur-md border border-[#E2A7B5] hover:bg-[#E2A7B5]/15 text-[#A85967] rounded-full font-medium text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-xs hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          id="publicate-back-btn"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-[#A85967]" />
          <span>{t('common.backHome')}</span>
        </a>

        <span className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-1.5 bg-white/80 backdrop-blur-md border border-[#E2A7B5]/50 text-[#A85967] rounded-full text-[10px] sm:text-xs font-bold shadow-xs whitespace-nowrap">
          <Store className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-orange shrink-0" />
          {language === 'en' ? 'Brand Registration' : 'Inscripción de Marcas'}
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-lux font-black text-[#A85967] tracking-tight leading-tight uppercase">
            {language === 'en' ? (
              <>How to get featured on <br /> <span className="inline-block whitespace-nowrap text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-8">Roos Capital</span>?</>
            ) : (
              <>¿Cómo publicarte en <br /> <span className="inline-block whitespace-nowrap text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-8">Roos Capital</span>?</>
            )}
          </h1>
        </motion.section>

        {/* HERO CARD - Organic shape matching UgcProgram styling */}
        <motion.section 
          variants={itemVariants} 
          className="relative bg-white/50 backdrop-blur-md rounded-tl-2xl rounded-tr-[3rem] rounded-bl-[3rem] rounded-br-2xl p-6 sm:p-10 border border-[#E2A7B5]/40 shadow-xs space-y-4 text-[#A85967] text-center overflow-hidden"
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
            <h2 className="text-base sm:text-lg md:text-xl font-lux font-bold text-[#A85967] leading-relaxed">
              {language === 'en' ? (
                <>Publishing your business on <span className="text-brand-orange font-extrabold">Roos Capital Marketplace</span> is simple.</>
              ) : (
                <>Publicar tu negocio en <span className="text-brand-orange font-extrabold">Roos Capital Marketplace</span> es sencillo.</>
              )}
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[#E2A7B5]/40 text-[#A85967] font-semibold text-xs shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'en' ? 'No account required to start' : 'No necesitas crear una cuenta'}
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[#E2A7B5]/40 text-[#A85967] font-semibold text-xs shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'en' ? 'Step-by-step guidance' : 'Sigue los pasos'}
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[#E2A7B5]/40 text-[#A85967] font-semibold text-xs shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'en' ? 'Personalized support' : 'La atención es personalizada'}
              </span>
            </div>
          </div>
        </motion.section>

        {/* STEP 01 */}
        <motion.section 
          variants={itemVariants} 
          className="bg-white/85 backdrop-blur-md rounded-[2.5rem] p-7 sm:p-9 border border-[#E2A7B5]/40 shadow-xs relative overflow-hidden space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2A7B5]/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF9FB] border border-[#FCE8EF] flex items-center justify-center text-[#E85B81] font-lux font-black text-xl shadow-2xs">
                01
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-lux font-extrabold text-[#E85B81] uppercase tracking-[0.04em]">
                {language === 'en' ? 'COMPLETE THE REGISTRATION FORM' : 'COMPLETA EL FORMULARIO'}
              </h3>
            </div>
            <span className="text-xs font-lux font-bold px-3.5 py-1 bg-[#FFF9FB] text-[#E85B81] rounded-full border border-[#FCE8EF] uppercase tracking-wider shadow-2xs">
              {language === 'en' ? 'Step 1 of 5' : 'Paso 1 de 5'}
            </span>
          </div>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
            {language === 'en'
              ? 'The first step is to message the word "info" to any of our official support social channels or click below to fill out our official registration form with your business information, logo, photos, and social profiles.'
              : 'El primer paso es escribir la palabra "info" a cualquiera de nuestras redes sociales de atención al cliente, y completar nuestro formulario oficial de inscripción con los datos de tu empresa, logotipo, imágenes y redes sociales.'}
          </p>
        </motion.section>

        {/* STEP 02 */}
        <motion.section 
          variants={itemVariants} 
          className="bg-white/85 backdrop-blur-md rounded-[2.5rem] p-7 sm:p-9 border border-[#E2A7B5]/40 shadow-xs relative overflow-hidden space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2A7B5]/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF9FB] border border-[#FCE8EF] flex items-center justify-center text-[#E85B81] font-lux font-black text-xl shadow-2xs">
                02
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-lux font-extrabold text-[#E85B81] uppercase tracking-[0.04em]">
                {language === 'en' ? 'AWAIT PROFILE REVIEW & QUALITY CHECK' : 'ESPERA LA REVISIÓN DE TU INFORMACIÓN'}
              </h3>
            </div>
            <span className="text-xs font-lux font-bold px-3.5 py-1 bg-[#FFF9FB] text-[#E85B81] rounded-full border border-[#FCE8EF] uppercase tracking-wider shadow-2xs">
              {language === 'en' ? 'Step 2 of 5' : 'Paso 2 de 5'}
            </span>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
            <p style={{ fontFamily: 'Inter, sans-serif' }}>
              {language === 'en'
                ? 'Once your form is submitted, our team personally reviews the details and media files to ensure they meet our publication and quality standards.'
                : 'Una vez enviado el formulario, nuestro equipo revisará personalmente la información y los archivos proporcionados para verificar que todo cumpla con nuestras especificaciones de publicación.'}
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif' }}>
              {language === 'en'
                ? 'We review dimensions, format, resolution, and confirm that all essential details needed to feature your business are complete and well-structured.'
                : 'Revisaremos aspectos como las dimensiones, formato y calidad de los materiales enviados, así como que la información necesaria para publicar tu negocio esté completa.'}
            </p>
          </div>

          {/* Timeframe Box */}
          <div className="p-5 bg-[#FFFAFC] rounded-2xl border-l-4 border-[#E85B81] flex items-start sm:items-center gap-3 text-neutral-600 border border-[#E85B81]/15">
            <Clock className="w-6 h-6 text-brand-orange shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs sm:text-sm font-sans text-neutral-600">
              {language === 'en' ? (
                <>The review and verification process takes an estimated <strong className="font-bold text-neutral-600">3 to 7 business days</strong>.</>
              ) : (
                <>El proceso de revisión y aprobación tiene un tiempo estimado de <strong className="font-bold text-neutral-600">3 a 7 días laborables</strong>.</>
              )}
            </p>
          </div>
        </motion.section>

        {/* STEP 03 */}
        <motion.section 
          variants={itemVariants} 
          className="bg-white/85 backdrop-blur-md rounded-[2.5rem] p-7 sm:p-9 border border-[#E2A7B5]/40 shadow-xs relative overflow-hidden space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2A7B5]/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF9FB] border border-[#FCE8EF] flex items-center justify-center text-[#E85B81] font-lux font-black text-xl shadow-2xs">
                03
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-lux font-extrabold text-[#E85B81] uppercase tracking-[0.04em]">
                {language === 'en' ? 'RECEIVE YOUR APPROVAL' : 'RECIBE TU APROBACIÓN'}
              </h3>
            </div>
            <span className="text-xs font-lux font-bold px-3.5 py-1 bg-[#FFF9FB] text-[#E85B81] rounded-full border border-[#FCE8EF] uppercase tracking-wider shadow-2xs">
              {language === 'en' ? 'Step 3 of 5' : 'Paso 3 de 5'}
            </span>
          </div>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
            {language === 'en' ? (
              <>Once your information and assets have been verified, the <strong className="font-bold text-neutral-600">Roos Capital</strong> team will reach out directly through our official support channels to proceed with activation.</>
            ) : (
              <>Una vez que tu información y materiales hayan sido aprobados, la administración de <strong className="font-bold text-neutral-600">Roos Capital</strong> se pondrá en contacto contigo a través de nuestros canales oficiales de soporte para continuar con el proceso.</>
            )}
          </p>

          {/* Security Alert Section (without enclosing box, softened warning border) */}
          <div className="pt-2 space-y-3 text-neutral-600">
            <div className="flex items-center gap-2.5 text-red-700 font-lux font-extrabold text-xs sm:text-sm uppercase tracking-wider">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
              <span>{language === 'en' ? 'IMPORTANT: PAYMENT SECURITY' : 'IMPORTANTE: SEGURIDAD DE TU PAGO'}</span>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed font-sans text-neutral-600">
              <p className="font-bold text-neutral-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                {language === 'en'
                  ? 'Roos Capital Ambassadors are NOT authorized to provide payment links or collect fees directly from entrepreneurs.'
                  : 'Las Embajadoras de Roos Capital NO están autorizadas para proporcionar enlaces de pago ni recibir pagos directamente de las emprendedoras.'}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif' }}>
                {language === 'en' ? (
                  <>Payment links are provided <strong className="font-bold text-neutral-600">exclusively by the Roos Capital administration through our official support channels.</strong></>
                ) : (
                  <>Los enlaces de pago son proporcionados <strong className="font-bold text-neutral-600">exclusivamente por la administración de Roos Capital a través de nuestros canales oficiales de atención.</strong></>
                )}
              </p>
              <div className="p-3.5 bg-white rounded-xl border border-[#E85B81]/35 text-neutral-600 font-medium text-xs font-sans shadow-2xs">
                {language === 'en' ? (
                  <>If an Ambassador offers a direct link, asks for a personal bank transfer, or requests payment to herself, <strong className="font-bold text-neutral-600">do not make the payment and contact Roos Capital administration immediately to verify.</strong></>
                ) : (
                  <>Si una Embajadora te ofrece un enlace de pago, solicita un pago por transferencia o te pide realizar un pago directamente a ella, <strong className="font-bold text-neutral-600">no realices el pago y contacta con la administración de Roos Capital para verificar la información.</strong></>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* STEP 04 */}
        <motion.section 
          variants={itemVariants} 
          className="bg-white/85 backdrop-blur-md rounded-[2.5rem] p-7 sm:p-9 border border-[#E2A7B5]/40 shadow-xs relative overflow-hidden space-y-6"
        >
          <div className="flex items-center gap-3 border-b border-[#E2A7B5]/30 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9FB] border border-[#FCE8EF] flex items-center justify-center text-[#E85B81] font-lux font-black text-xl shadow-2xs">
              04
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl md:text-2xl font-lux font-extrabold text-[#E85B81] uppercase tracking-[0.04em]">
                {language === 'en' ? 'ACTIVATE YOUR MEMBERSHIP' : 'ACTIVA TU MEMBRESÍA'}
              </h3>
            </div>
            <span className="text-xs font-lux font-bold px-3.5 py-1 bg-[#FFF9FB] text-[#E85B81] rounded-full border border-[#FCE8EF] uppercase tracking-wider shadow-2xs">
              {language === 'en' ? 'Step 4 of 5' : 'Paso 4 de 5'}
            </span>
          </div>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
            {language === 'en' ? (
              <>Once your listing is approved, you will receive the official secure link to complete your payment with full protection powered by <strong className="font-bold text-neutral-600">Stripe</strong>.</>
            ) : (
              <>Una vez aprobada tu publicación, recibirás el enlace oficial para realizar tu pago de forma segura mediante <strong className="font-bold text-neutral-600">Stripe</strong>.</>
            )}
          </p>

          {/* Membership Plans Container */}
          <div className="bg-[#FFFAFC] rounded-2xl p-6 border border-[#E85B81]/20 shadow-2xs space-y-4">
            <h4 className="text-xs sm:text-sm font-lux font-black uppercase tracking-[0.15em] text-[#E85B81] text-center">
              {language === 'en' ? 'CHOOSE THE PLAN THAT BEST SUITS YOU:' : 'ELIGE EL PLAN QUE MÁS TE CONVENGA:'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Plan Mensual */}
              <div className="bg-white rounded-2xl p-5 border-2 border-[#E2A7B5]/50 shadow-2xs space-y-2 text-center hover:border-[#E85B81] transition-all">
                <span className="text-xs font-lux font-extrabold text-[#E85B81] uppercase tracking-widest block">
                  {language === 'en' ? 'MONTHLY' : 'MENSUAL'}
                </span>
                <div className="text-2xl sm:text-3xl font-lux font-black text-neutral-800">
                  26 USD <span className="text-xs font-bold text-neutral-500">/{language === 'en' ? 'mo' : 'mes'}</span>
                </div>
                <p className="text-[11px] text-neutral-600 font-sans">
                  {language === 'en' ? 'Renew month by month. Cancel anytime.' : 'Renovación mes con mes. Cancela cuando quieras.'}
                </p>
              </div>

              {/* Plan Anual */}
              <div className="bg-white rounded-2xl pt-6 pb-5 px-4 sm:p-5 border-2 border-[#E85B81]/50 shadow-2xs space-y-2 text-center relative overflow-visible sm:overflow-hidden">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-2 sm:right-2 sm:left-auto sm:translate-x-0 sm:translate-y-0 px-2.5 py-0.5 bg-[#FFF7F9] border border-[#E85B81]/40 text-[#E85B81] text-[9px] font-lux font-black uppercase rounded-full tracking-wider shadow-2xs whitespace-nowrap z-10">
                  {language === 'en' ? 'Best Value' : 'Mejor Valor'}
                </span>
                <span className="text-xs font-lux font-extrabold text-[#E85B81] uppercase tracking-widest block pt-1 sm:pt-0">
                  {language === 'en' ? 'ANNUAL' : 'ANUAL'}
                </span>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xs font-semibold text-neutral-400 line-through">
                    $312 USD
                  </span>
                  <div className="text-2xl sm:text-3xl font-lux font-black text-neutral-800">
                    $264 USD <span className="text-xs font-bold text-neutral-500">/{language === 'en' ? 'yr' : 'año'}</span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-600 font-sans">
                  {language === 'en' ? 'Full continuous year-round access with priority placement in the directory.' : 'Acceso continuo durante todo el año con prioridad en directorio.'}
                </p>
              </div>
            </div>

            <p className="text-xs text-center text-neutral-600 font-sans font-medium pt-2">
              {language === 'en' ? 'Select your preferred plan and complete payment to activate your active membership.' : 'Selecciona el plan que prefieras y completa tu pago para activar tu membresía.'}
            </p>
          </div>
        </motion.section>

        {/* STEP 05 */}
        <motion.section 
          variants={itemVariants} 
          className="bg-white/85 backdrop-blur-md rounded-[2.5rem] p-7 sm:p-9 border border-[#E2A7B5]/40 shadow-xs relative overflow-hidden space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2A7B5]/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF9FB] border border-[#FCE8EF] flex items-center justify-center text-[#E85B81] font-lux font-black text-xl shadow-2xs">
                05
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-lux font-extrabold text-[#E85B81] uppercase tracking-[0.04em]">
                {language === 'en' ? 'YOUR BUSINESS GOES LIVE ON ROOS' : 'TU NEGOCIO APARECE EN ROOS'}
              </h3>
            </div>
            <span className="text-xs font-lux font-bold px-3.5 py-1 bg-[#FFF9FB] text-[#E85B81] rounded-full border border-[#FCE8EF] uppercase tracking-wider shadow-2xs">
              {language === 'en' ? 'Step 5 of 5' : 'Paso 5 de 5'}
            </span>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
            <p style={{ fontFamily: 'Inter, sans-serif' }}>
              {language === 'en' ? (
                <>Once your payment is verified, we immediately publish your listing card on <strong className="font-bold text-neutral-600">Roos Capital Marketplace</strong>.</>
              ) : (
                <>Una vez confirmado tu pago, procederemos a publicar tu anuncio en <strong className="font-bold text-neutral-600">Roos Capital Marketplace</strong>.</>
              )}
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif' }}>
              {language === 'en'
                ? 'Your brand will be discovered by thousands of customers, with direct clickable links to your WhatsApp, social networks, and online channels.'
                : 'Tu negocio estará disponible para que nuevas personas puedan descubrirlo y acceder directamente a tus redes sociales y canales de contacto.'}
            </p>
          </div>

          {/* FINAL HIGHLIGHT BANNER */}
          <div className="p-6 bg-[#FFFAFC] text-neutral-600 rounded-2xl shadow-2xs border border-[#E85B81]/20 text-center space-y-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white rounded-full text-xs font-lux font-bold uppercase tracking-wider text-[#E85B81] border border-[#E2A7B5]/50 shadow-2xs mb-2">
                <Award className="w-5 h-5 sm:w-3.5 sm:h-3.5 text-brand-orange shrink-0" />
                {language === 'en' ? 'Independence Guarantee' : 'Garantía de Independencia'}
              </div>
            </div>
            <h4 className="text-base sm:text-lg md:text-xl font-lux font-black uppercase tracking-wider text-[#E85B81]">
              {language === 'en' ? 'YOU KEEP 100% OF YOUR SALES.' : 'TÚ CONSERVAS EL 100% DE TUS VENTAS.'}
            </h4>
            <div className="text-xs sm:text-sm text-neutral-600 font-sans max-w-xl mx-auto font-medium space-y-1 pt-1">
              <p style={{ fontFamily: 'Inter, sans-serif' }}>
                {language === 'en' ? 'We do not take commissions on your customer transactions.' : 'No cobramos comisiones sobre tus transacciones.'}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif' }}>
                {language === 'en' ? 'Clients connect and buy directly from you.' : 'Las clientes te contactan y compran directamente a ti.'}
              </p>
            </div>
          </div>
        </motion.section>

        {/* BOTTOM CTA BUTTON */}
        <motion.section variants={itemVariants} className="text-center pt-4 space-y-4">
          <button
            onClick={handleOpenContact}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#E85B81] hover:bg-[#DE4B73] text-white rounded-full font-lux font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            id="publicate-bottom-cta-btn"
          >
            <Send className="w-4 h-4" />
            <span>{language === 'en' ? 'Register My Business' : 'Registrar mi empresa'}</span>
          </button>
        </motion.section>

      </motion.div>

      {/* Modal de Contacto oficial (misma ventanilla de Contáctanos) */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </div>
  );
}
