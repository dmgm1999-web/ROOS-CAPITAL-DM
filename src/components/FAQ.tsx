import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ArrowLeft, 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  DollarSign, 
  Award, 
  Store, 
  Video, 
  Crown, 
  BookOpen, 
  Globe, 
  Heart, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  HelpCircle, 
  Megaphone, 
  Mail, 
  GraduationCap, 
  ShieldAlert, 
  AlertCircle,
  ChevronRight,
  X
} from 'lucide-react';
import roseGoldPattern from '../assets/images/rose_gold_organic_pattern_1779358688635.png';
import { useLanguage } from '../context/LanguageContext';

const WhatsappIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const TelegramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.119.098.152.228.166.321.015.093.032.308.017.481z" />
  </svg>
);

interface FAQItem {
  id: number;
  categoryLabel: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

interface FAQProps {
  onBack: () => void;
}

export default function FAQ({ onBack }: FAQProps) {
  const { t, language } = useLanguage();
  const [openId, setOpenId] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const faqs: FAQItem[] = [
    // SOBRE ROOS CAPITAL
    {
      id: 1,
      categoryLabel: 'Sobre Roos Capital',
      question: '¿Qué es Roos Capital Marketplace?',
      answer: 'Roos Capital Marketplace es una plataforma digital especializada en descubrir y dar visibilidad a negocios liderados por mujeres.\n\nReunimos emprendimientos de distintas categorías y ubicaciones en un mismo espacio para que nuevas personas puedan descubrirlos y conectar directamente con cada negocio.\n\nNuestro objetivo es convertirnos en un punto de encuentro entre emprendedoras, clientes, creadoras de contenido y nuevas oportunidades de colaboración.',
      icon: <Award className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 2,
      categoryLabel: 'Sobre Roos Capital',
      question: '¿Roos es una tienda en línea?',
      answer: 'No exactamente.\n\nRoos funciona como un marketplace de descubrimiento. Las personas encuentran tu negocio dentro de la plataforma y, desde tu publicación, pueden acceder directamente a tus redes sociales y canales de contacto.\n\nLa compra se realiza directamente contigo. Tú conservas el 100% de tus ventas.',
      icon: <Store className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 3,
      categoryLabel: 'Sobre Roos Capital',
      question: '¿Por qué Roos se enfoca exclusivamente en negocios liderados por mujeres?',
      answer: 'Porque creemos que un nicho específico puede generar conexiones más relevantes.\n\nEn Roos no necesitas competir por atención con negocios de cualquier industria. Formas parte de un ecosistema construido alrededor del emprendimiento femenino, donde pueden surgir oportunidades de colaboración, networking, recomendaciones y nuevas conexiones.\n\nA medida que nuestra comunidad crezca, también buscamos crear espacios donde emprendedoras, empresas, profesionales e inversionistas interesados en este ecosistema puedan descubrir nuevos proyectos.',
      icon: <Heart className="w-5 h-5 text-brand-orange" />
    },

    // DIRECTORIO Y DESCUBRIMIENTO
    {
      id: 4,
      categoryLabel: 'Directorio y Descubrimiento',
      question: '¿Todos los negocios que aparecen en Roos Capital son socios?',
      answer: 'No. Roos Capital Marketplace también incluye negocios descubiertos por nuestra comunidad y por nuestras Embajadoras, con el objetivo de facilitar a los usuarios el descubrimiento de nuevas marcas y emprendimientos.\n\nLa aparición de un negocio en el sitio no significa necesariamente que tenga una relación comercial, afiliación, patrocinio o colaboración con Roos Capital Marketplace.',
      icon: <Store className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 5,
      categoryLabel: 'Directorio y Descubrimiento',
      question: '¿Por qué aparece un negocio que no es socio de Roos?',
      answer: 'Porque parte de nuestra misión es ayudar a nuestra comunidad a descubrir negocios interesantes. Algunos negocios pueden ser encontrados durante nuestro proceso de descubrimiento y publicados como referencia para los usuarios, aunque todavía no formen parte de Roos Capital Marketplace.',
      icon: <Sparkles className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 6,
      categoryLabel: 'Directorio y Descubrimiento',
      question: '¿Un negocio puede solicitar cambios o retirar su información?',
      answer: 'Sí. Los propietarios o representantes autorizados pueden contactar a Roos Capital Marketplace para solicitar la corrección o revisión de información relacionada con su negocio.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-orange" />
    },

    // PUBLICA TU NEGOCIO
    {
      id: 7,
      categoryLabel: 'Publica tu Negocio',
      question: '¿Cómo puedo publicar mi emprendimiento en Roos?',
      answer: 'El proceso es sencillo:\n1. Completa nuestro formulario oficial.\n2. Nuestro equipo revisa tu información y materiales.\n3. Esperas la aprobación de tu publicación.\n4. Una vez aprobada, la administración te proporciona el enlace oficial de pago.\n5. Realizas el pago y activamos tu publicación en Roos.\n\nEl tiempo estimado de revisión es de 3 a 7 días laborables.',
      icon: <CheckCircle2 className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 8,
      categoryLabel: 'Publica tu Negocio',
      question: '¿Cuánto cuesta publicar mi negocio?',
      answer: 'La membresía tiene un costo de:\n26 USD al mes\n\nTambién puedes elegir la modalidad anual ($264 USD al año) que tiene un descuento único, disponible al momento de realizar tu inscripción.',
      icon: <DollarSign className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 9,
      categoryLabel: 'Publica tu Negocio',
      question: '¿Roos cobra comisión por mis ventas?',
      answer: 'No. Roos no se queda con un porcentaje de las ventas que realices a través de tus canales.\n\nTus ventas son 100% tuyas.',
      icon: <Award className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 10,
      categoryLabel: 'Publica tu Negocio',
      question: '¿Qué incluye mi membresía?',
      answer: 'Tu membresía incluye la publicación de tu emprendimiento dentro de Roos Capital Marketplace, con acceso directo a tus redes sociales y canales de contacto.\n\nAdemás, tu negocio forma parte del ecosistema de Roos y puede beneficiarse de la difusión que realizamos para atraer nuevas personas hacia nuestra plataforma.\n\nTambién tendrás la posibilidad de participar en futuras iniciativas de networking, colaboración y comunidad.',
      icon: <Sparkles className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 11,
      categoryLabel: 'Publica tu Negocio',
      question: '¿Cómo promociona Roos mi negocio?',
      answer: 'Nuestra prioridad es hacer crecer la audiencia de Roos Capital Marketplace.\n\nRealizamos difusión y contenido en nuestras redes sociales para atraer nuevas personas hacia la plataforma y aumentar las oportunidades de descubrimiento de los negocios que forman parte de ella.\n\nTrabajamos continuamente para aumentar la visibilidad del marketplace y de nuestra comunidad.',
      icon: <Megaphone className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 12,
      categoryLabel: 'Publica tu Negocio',
      question: '¿Puedo cancelar mi membresía?',
      answer: 'Sí. Para solicitar la cancelación de tu membresía debes comunicarte directamente con el equipo de administración a través de nuestros canales oficiales de soporte.',
      icon: <MessageCircle className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 13,
      categoryLabel: 'Publica tu Negocio & Seguridad',
      question: '¿Las Embajadoras pueden cobrarme o enviarme el enlace de pago?',
      answer: 'No. Las Embajadoras únicamente realizan labores de recomendación y registro de nuevas emprendedoras.\n\nNo están autorizadas para recibir pagos ni proporcionar enlaces de pago.\n\nLos enlaces de pago son enviados exclusivamente por la administración de Roos Capital a través de nuestros canales oficiales.\n\nSi alguien te solicita realizar un pago directamente a su cuenta o te proporciona un enlace que no provenga de la administración, no realices el pago y comunícate con nosotros.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-orange" />
    },

    // ROOS UGC PROGRAM
    {
      id: 14,
      categoryLabel: 'Roos UGC Program',
      question: '¿Qué es el programa UGC de Roos?',
      answer: 'El Roos UGC Program es una iniciativa para creadoras de contenido que quieren colaborar con nuestra plataforma.\n\nLas creadoras seleccionadas pueden publicar su perfil dentro de Roos sin costo, a cambio de crear contenido para nuestra marca.',
      icon: <Video className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 15,
      categoryLabel: 'Roos UGC Program',
      question: '¿Tengo que pagar para formar parte del programa UGC?',
      answer: 'No. Las creadoras UGC seleccionadas pueden tener una publicación gratuita dentro de Roos como parte del intercambio de colaboración.',
      icon: <CheckCircle2 className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 16,
      categoryLabel: 'Roos UGC Program',
      question: '¿Qué debo hacer a cambio?',
      answer: 'Las creadoras participantes se comprometen a crear contenido UGC para Roos únicamente 2 veces cada mes, de acuerdo con las condiciones establecidas por el programa.\n\nEl contenido puede utilizarse para ayudar a promocionar Roos Capital y mostrar nuestra plataforma a nuevas audiencias.',
      icon: <Video className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 17,
      categoryLabel: 'Roos UGC Program',
      question: '¿Necesito tener miles de seguidores?',
      answer: 'No necesariamente. El programa UGC está enfocado principalmente en la capacidad de crear contenido auténtico y atractivo, no únicamente en el número de seguidores.\n\nBuscamos creadoras que puedan comunicar de manera natural nuestra propuesta y conectar con nuevas audiencias.',
      icon: <Users className="w-5 h-5 text-brand-orange" />
    },

    // ROOS AMBASSADORS
    {
      id: 18,
      categoryLabel: 'Roos Ambassadors',
      question: '¿Qué es una Embajadora de Roos?',
      answer: 'Una Embajadora es una mujer que representa Roos Capital y ayuda a que nuevas emprendedoras conozcan nuestra plataforma.\n\nSu principal función es:\nEncontrar emprendedoras → Presentarles Roos → Registrarlas.',
      icon: <Crown className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 19,
      categoryLabel: 'Roos Ambassadors',
      question: '¿Cómo gana dinero una Embajadora?',
      answer: 'Cada emprendedora que una Embajadora incorpora y que posteriormente mantiene una membresía activa queda vinculada a su cartera.\n\nMientras esa clienta continúe activa, la Embajadora recibe una comisión mensual recurrente, de acuerdo con las condiciones vigentes del programa.\n\nNo se trata solamente de conseguir una venta. Se trata de construir una cartera.',
      icon: <DollarSign className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 20,
      categoryLabel: 'Roos Ambassadors',
      question: '¿La comisión se paga una sola vez?',
      answer: 'No. La comisión es recurrente mientras la clienta referida mantenga activa su membresía.\n\nSi una clienta cancela, deja de generar comisión a partir del período correspondiente.\n\nSi la Embajadora incorpora nuevas clientas, su cartera vuelve a crecer.',
      icon: <TrendingUp className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 21,
      categoryLabel: 'Roos Ambassadors',
      question: '¿Necesito trabajar presencialmente?',
      answer: 'No. El programa está diseñado para realizarse completamente en línea y desde casa.\n\nPuedes encontrar emprendedoras a través de tus propias redes sociales, contactos personales, grupos, networking y otros canales digitales.',
      icon: <Globe className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 22,
      categoryLabel: 'Roos Ambassadors',
      question: '¿Necesito experiencia en ventas?',
      answer: 'No necesariamente. No buscamos únicamente expertas en ventas. Buscamos mujeres capaces de comunicar una oportunidad, crear conexiones y encontrar emprendedoras que puedan beneficiarse de Roos.',
      icon: <Users className="w-5 h-5 text-brand-orange" />
    },

    // ROOS EDUCATE
    {
      id: 23,
      categoryLabel: 'Roos Educate',
      question: '¿Qué es Roos Educate?',
      answer: 'Roos Educate es nuestro espacio de educación para mujeres que quieren comenzar a emprender pero no saben por dónde empezar.\n\nEs un curso diseñado para acompañarte desde cero, incluso si todavía no tienes un negocio.',
      icon: <GraduationCap className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 24,
      categoryLabel: 'Roos Educate',
      question: '¿Cuánto cuesta Roos Educate?',
      answer: 'Es completamente GRATIS.\n\nNo necesitas ser miembro de pago de Roos Capital para comenzar a aprender.',
      icon: <Sparkles className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 25,
      categoryLabel: 'Roos Educate',
      question: '¿Qué voy a aprender?',
      answer: 'El programa aborda diferentes aspectos necesarios para comenzar a construir un emprendimiento, desde la idea inicial hasta conceptos fundamentales para administrar y hacer crecer un negocio.',
      icon: <BookOpen className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 26,
      categoryLabel: 'Roos Educate',
      question: '¿Necesito tener un negocio para participar?',
      answer: 'No. Roos Educate también está pensado para mujeres que todavía están en la etapa de idea y quieren adquirir conocimientos antes de comenzar.',
      icon: <Heart className="w-5 h-5 text-brand-orange" />
    },

    // COMUNIDAD ROOS
    {
      id: 27,
      categoryLabel: 'Comunidad Roos',
      question: '¿Qué puedo encontrar además de mi publicación?',
      answer: 'Roos busca construir una comunidad donde las emprendedoras puedan descubrirse, conectarse y colaborar.\n\nA medida que la comunidad crezca, desarrollaremos iniciativas de networking, colaboraciones, eventos y otras oportunidades para conectar a las mujeres que forman parte del ecosistema.',
      icon: <Users className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 28,
      categoryLabel: 'Comunidad Roos',
      question: '¿Roos garantiza clientes, ventas o inversión?',
      answer: 'No. Roos proporciona una plataforma de visibilidad y descubrimiento, pero no podemos garantizar un número específico de clientes, ventas, seguidores o inversiones.\n\nNuestro compromiso es trabajar continuamente para hacer crecer la plataforma, atraer nuevas audiencias y generar un ecosistema donde puedan surgir esas oportunidades.',
      icon: <ShieldAlert className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 29,
      categoryLabel: 'Comunidad Roos',
      question: '¿Roos está disponible solamente en México?',
      answer: 'Roos comienza su desarrollo y expansión inicial en México, pero nace con una visión internacional.\n\nNuestra meta es construir un marketplace donde los negocios liderados por mujeres puedan ser descubiertos más allá de sus fronteras.',
      icon: <Globe className="w-5 h-5 text-brand-orange" />
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24 pt-6 font-sans">
      {/* Header with Back button */}
      <div className="flex items-center justify-start mb-6 md:mb-10">
        <a 
          href="/"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault();
              onBack();
            }
          }}
          className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white border-2 border-[#E2A7B5] hover:bg-[#E2A7B5]/10 text-[#A85967] hover:border-[#A85967] rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url(${roseGoldPattern})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '1100px 800px',
            backgroundColor: '#FFFFFF',
          }}
          id="faq-back-button"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('common.backHome')}
        </a>
      </div>

      <div className="text-center space-y-3 sm:space-y-4 mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-brand-wine tracking-tight leading-none uppercase">
          Preguntas <span className="text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-8">Frecuentes</span>
        </h1>
      </div>

      {/* Accordion FAQ list */}
      <div className="space-y-3.5 sm:space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div 
              key={faq.id}
              className={`bg-white border-2 rounded-2xl transition-all overflow-hidden ${
                isOpen 
                  ? 'border-[#A85967] shadow-lg shadow-[#E2A7B5]/10' 
                  : 'border-neutral-200/80 hover:border-[#E2A7B5] shadow-xs'
              }`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-3.5 sm:p-5 md:p-6 text-left flex items-start justify-between gap-3 sm:gap-4 transition-colors focus:outline-none cursor-pointer"
                id={`faq-item-toggle-${faq.id}`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors shrink-0 ${isOpen ? 'bg-brand-orange/15 text-brand-orange' : 'bg-neutral-50 text-[#A85967]'}`}>
                    {faq.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-brand-orange">
                      {faq.categoryLabel}
                    </span>
                    <span className="font-extrabold text-xs sm:text-sm md:text-base text-brand-wine uppercase tracking-wide leading-tight">
                      {faq.question}
                    </span>
                  </div>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-[#A85967] transition-transform duration-300 flex-shrink-0 mt-1 ${
                    isOpen ? 'rotate-180 text-brand-orange' : ''
                  }`} 
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <div className="px-3.5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-neutral-100">
                      <div className="font-sans text-neutral-700 text-xs sm:text-sm leading-relaxed text-justify mt-3.5 font-normal pl-0 sm:pl-11 whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* "¿TIENES OTRA PREGUNTA?" Contact Card */}
      <div 
        className="mt-8 sm:mt-12 max-w-xl mx-auto bg-white/95 border-2 border-[#E2A7B5] rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-7 text-center shadow-[0_12px_35px_rgba(226,167,181,0.22)] relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 248, 249, 0.92) 100%), url(${roseGoldPattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '1100px 800px',
        }}
        id="faq-contact-card"
      >
        {/* Decorative background glows */}
        <div className="absolute -top-10 -left-10 w-36 h-36 bg-[#E2A7B5]/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-[#E2A7B5]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-md mx-auto space-y-2.5 sm:space-y-3 relative z-10">
          <div className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border-2 border-[#E2A7B5] shadow-[0_3px_12px_rgba(226,167,181,0.3)] text-[#A85967]">
            <Sparkles className="w-4 h-4 text-brand-orange" />
          </div>

          <div className="space-y-0.5">
            <span className="text-[9px] sm:text-[10px] font-bold text-[#A85967] uppercase tracking-[0.18em] block">
              Atención Personalizada
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-lux font-black text-brand-wine uppercase tracking-[0.06em]">
              ¿Tienes otra pregunta?
            </h2>
          </div>

          <p className="text-neutral-600 text-xs sm:text-xs md:text-sm font-sans font-medium leading-relaxed max-w-sm mx-auto">
            Si no encontraste la respuesta que buscas, nuestro equipo de soporte y atención está listo para ayudarte.
          </p>

          <div className="pt-1.5 flex flex-col items-center justify-center">
            {/* Elegant Contáctanos Pill Button (Matching Home Page) */}
            <motion.button 
              onClick={() => setShowContactModal(true)}
              whileHover={{ 
                scale: 1.04,
                borderColor: "rgba(168, 89, 103, 0.9)",
                boxShadow: "0 12px 35px rgba(226,167,181,0.45), 0 0 25px 8px rgba(226,167,181,0.6)"
              }}
              whileTap={{ 
                scale: 0.96,
                borderColor: "rgba(168, 89, 103, 1)"
              }}
              className="bg-white border-2 border-[#E2A7B5] rounded-[1.5rem] px-6 py-2.5 sm:px-7 sm:py-3 flex flex-col items-center justify-center leading-none gap-1 group select-none text-center cursor-pointer shadow-[0_8px_25px_rgba(226,167,181,0.3)] transition-all duration-200 focus:outline-none"
              id="faq-contact-pill-button"
            >
              <span className="text-[8px] sm:text-[9px] font-bold text-[#A85967]/80 uppercase tracking-[0.18em] leading-none w-full text-center group-hover:text-[#A85967] transition-colors" id="faq-pill-label">
                UNIRSE A LA COMUNIDAD
              </span>
              <div className="flex items-center justify-center gap-2 text-brand-wine" id="faq-pill-body">
                <div className="flex items-center gap-1 shrink-0">
                  <WhatsappIcon className="w-3.5 h-3.5 text-[#A85967]" />
                  <TelegramIcon className="w-3.5 h-3.5 text-[#A85967]" />
                  <Mail className="w-3.5 h-3.5 text-[#A85967]" />
                </div>
                <span 
                  className="text-xs sm:text-sm font-lux font-extrabold tracking-[0.18em] leading-none text-brand-wine uppercase not-italic"
                  style={{ WebkitTextStroke: '0.3px currentColor' }}
                >
                  CONTÁCTANOS
                </span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Elegant Contact Modal (Matching Home Page Modal) */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="fixed inset-0 bg-[#A85967]/30 backdrop-blur-xs"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative z-10 w-full max-w-[340px] sm:max-w-[360px] bg-gradient-to-b from-white via-white to-[#FFF8F9] rounded-tr-2xl rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-bl-2xl p-5 sm:p-6 border-2 border-[#E2A7B5]/60 shadow-[0_20px_50px_rgba(168,89,103,0.22)] space-y-4 text-center overflow-hidden"
            >
              {/* Decorative background glows */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#E2A7B5]/30 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#E2A7B5]/20 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-3.5 right-3.5 w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#E2A7B5]/15 hover:bg-[#E2A7B5]/30 text-[#A85967] border border-[#E2A7B5]/40 flex items-center justify-center transition-all active:scale-95 cursor-pointer z-20"
                aria-label="Cerrar"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Header */}
              <div className="space-y-1.5 pt-1 relative z-10">
                <h3 className="text-base sm:text-lg font-black text-[#A85967] tracking-tight uppercase font-lux">
                  Contáctanos
                </h3>
                <p className="text-xs text-[#A85967]/80 font-sans font-medium leading-relaxed">
                  Elige tu medio de contacto preferido:
                </p>
              </div>

              {/* Contact Options */}
              <div className="space-y-2.5 pt-1 relative z-10">
                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/5218123222533"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowContactModal(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-[#E2A7B5]/15 border-2 border-[#E2A7B5]/40 hover:border-[#A85967] transition-all transform hover:-translate-y-0.5 shadow-xs hover:shadow-md no-underline group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#A85967] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <WhatsappIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-extrabold text-sm text-[#A85967] flex items-center gap-1.5 transition-colors">
                      WhatsApp
                      <span className="text-[9px] bg-[#E2A7B5]/30 text-[#A85967] border border-[#E2A7B5]/60 font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                        Recomendado
                      </span>
                    </div>
                    <div className="text-xs text-[#A85967]/70 font-sans truncate font-medium">
                      @rooscapital
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#A85967]/40 group-hover:text-[#A85967] group-hover:translate-x-0.5 transition-all" />
                </a>

                {/* Telegram Button */}
                <a
                  href="https://t.me/rooscapital"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowContactModal(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-[#E2A7B5]/15 border-2 border-[#E2A7B5]/40 hover:border-[#A85967] transition-all transform hover:-translate-y-0.5 shadow-xs hover:shadow-md no-underline group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#A85967] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <TelegramIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-extrabold text-sm text-[#A85967] transition-colors">
                      Telegram
                    </div>
                    <div className="text-xs text-[#A85967]/70 font-sans truncate font-medium">
                      @rooscapital
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#A85967]/40 group-hover:text-[#A85967] group-hover:translate-x-0.5 transition-all" />
                </a>

                {/* Correo Button */}
                <a
                  href="mailto:central@rooscapital.com?subject=Contacto%20-%20Roos%20Capital"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowContactModal(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-[#E2A7B5]/15 border-2 border-[#E2A7B5]/40 hover:border-[#A85967] transition-all transform hover:-translate-y-0.5 shadow-xs hover:shadow-md no-underline group"
                  id="faq-modal-contact-email-btn"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#A85967] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-extrabold text-sm text-[#A85967] transition-colors">
                      Correo
                    </div>
                    <div className="text-xs text-[#A85967]/70 font-sans truncate font-medium">
                      central@rooscapital.com
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#A85967]/40 group-hover:text-[#A85967] group-hover:translate-x-0.5 transition-all" />
                </a>
              </div>

              {/* Footer note */}
              <div className="p-2.5 bg-[#E2A7B5]/10 rounded-xl border-l-3 border-[#A85967] text-[11px] text-[#A85967] font-sans font-medium leading-tight text-center relative z-10">
                Servicio al cliente, atención personalizada
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
