import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft
} from 'lucide-react';

interface Quote {
  text: string;
  author: string;
}

interface RoosCapitalQuotesProps {
  onBack: () => void;
}

const DEFAULT_QUOTES: Quote[] = [
  {
    text: "El camino hacia el éxito se construye con determinación y pasión; nunca dejes que otros definan los límites de tu potencial.",
    author: "Michelle Obama"
  },
  {
    text: "Para ser irremplazable, una mujer siempre debe buscar ser diferente y auténtica.",
    author: "Coco Chanel"
  },
  {
    text: "No tengo miedo de las tormentas porque estoy aprendiendo a gobernar mi propio barco.",
    author: "Louisa May Alcott"
  },
  {
    text: "En lugar de tratar de encajar en moldes preestablecidos, diseña tu vida bajo tus propias reglas y construye un legado.",
    author: "Diane von Furstenberg"
  },
  {
    text: "La pasión es energía pura. Siente el inmenso poder mental que proviene de centrarte exclusivamente en lo que te apasiona.",
    author: "Oprah Winfrey"
  },
  {
    text: "No soñé con el gran éxito de mi marca. Trabajé incansablemente todos los días para construirlo paso a paso.",
    author: "Estée Lauder"
  },
  {
    text: "El éxito femenino se construye colectivamente: cuando una mujer tiene voz, por definición, todas nos hacemos más fuertes.",
    author: "Melinda Gates"
  },
  {
    text: "La vida no es fácil para ninguno de nosotros. ¿Pero qué importa? Debemos persistir y confiar plenamente en nuestras capacidades.",
    author: "Marie Curie"
  },
  {
    text: "Los desafíos diarios son valiosos regalos que nos obligan a buscar un nuevo centro de gravedad para triunfar.",
    author: "Valerie Aurora"
  },
  {
    text: "Pies, ¿para qué los quiero, si tengo alas de libertad y creatividad para volar alto en mis emprendimientos?",
    author: "Frida Kahlo"
  },
  {
    text: "Si tu meta no te asusta lo suficiente al principio, probablemente no sea lo suficientemente grande para ti.",
    author: "Sheryl Sandberg"
  },
  {
    text: "Hacerse preguntas inteligentes y retar el status quo es el verdadero inicio de todo futuro éxito empresarial.",
    author: "Estée Lauder"
  },
  {
    text: "La belleza y la autoridad de una mujer comienzan en el instante exacto en que decide ser ella misma sin disculparse.",
    author: "Coco Chanel"
  },
  {
    text: "No limites tus desafíos, desafía siempre tus propios límites en cada proyecto que decidas emprender.",
    author: "Inspiración"
  },
  {
    text: "El verdadero emprendimiento tecnológico y tradicional es, sobre todas las cosas, un viaje increíble de autodescubrimiento.",
    author: "Sara Blakely"
  },
  {
    text: "No intentes ser una copia perfecta de nadie; más bien sé una versión excepcional de ti misma y de tu negocio.",
    author: "Carolina Herrera"
  },
  {
    text: "Una mujer inteligente es capaz de construir una base firme en su negocio con las piedras que otros le lanzan en el camino.",
    author: "Arlene Dickinson"
  },
  {
    text: "La forma más común en que la gente renuncia a su poder es pensando que no tienen ninguno.",
    author: "Alice Walker"
  },
  {
    text: "Lo más difícil es tomar la firme decisión de actuar; todo lo que viene después es simplemente pura tenacidad.",
    author: "Amelia Earhart"
  },
  {
    text: "Aprende de los errores de otros y de los tuyos propios. No puedes vivir lo suficiente como para cometerlos todos tú misma.",
    author: "Eleanor Roosevelt"
  }
];

export default function RoosCapitalQuotes({ onBack }: RoosCapitalQuotesProps) {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  // Load quotes from LocalStorage or pre-populate with default ones
  useEffect(() => {
    const saved = localStorage.getItem('roos_capital_quotes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const cleaned = parsed.map((item: any) => ({
          text: item.text || '',
          author: item.author || ''
        }));
        setQuotes(cleaned);
      } catch (err) {
        setQuotes(DEFAULT_QUOTES);
      }
    } else {
      setQuotes(DEFAULT_QUOTES);
    }
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.93, y: 25 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: 'easeOut' as const } 
    }
  } as const;

  // Custom visual poster frames selector to mimic the user's authentic art gallery page!
  const getPosterStyle = (idx: number) => {
    const styles = [
      {
        // 1. Classic Light Mahogany Wood Frame - Tall Portrait
        cardClass: "mb-6 break-inside-avoid inline-block w-full p-6 md:p-7 rounded-none bg-[#FAF6F0] border-[10px] md:border-[14px] border-[#3E2723] shadow-[8px_8px_0px_rgba(62,39,35,0.06),0_15px_30px_rgba(0,0,0,0.12)] text-center relative",
        textClass: "font-serif italic text-base md:text-[17px] leading-relaxed text-[#3E2723] font-semibold",
        authorClass: "font-sans font-black uppercase tracking-[0.2em] text-[#8D6E63] text-[9px] md:text-[11px]",
        dividerClass: "w-12 h-[1px] bg-[#3E2723]/20 mx-auto my-4",
        innerBorder: "border border-[#3E2723]/10 p-5 rounded-none flex flex-col justify-center min-h-[290px]"
      },
      {
        // 2. Beautiful Warm Honey Maple Frame - Dense Medium
        cardClass: "mb-6 break-inside-avoid inline-block w-full p-5 md:p-6 rounded-none bg-[#FCFAF5] border-[9px] md:border-[12px] border-[#B8860B] shadow-[6px_6px_0px_rgba(184,134,11,0.06),0_12px_24px_rgba(0,0,0,0.1)] text-center relative",
        textClass: "font-sans font-black text-[13px] md:text-[14px] leading-normal text-[#5C4308] tracking-tight uppercase",
        authorClass: "font-sans font-bold uppercase tracking-[0.15em] text-[#B8860B] text-[8px] md:text-[10px]",
        dividerClass: "w-16 h-[2.5px] bg-[#B8860B]/20 mx-auto my-3",
        innerBorder: "border border-dashed border-[#B8860B]/15 p-4 rounded-none flex flex-col justify-center min-h-[210px]"
      },
      {
        // 3. Elegant Antique Rosewood Frame - Very Tall Highlight
        cardClass: "mb-6 break-inside-avoid inline-block w-full p-6 md:p-8 rounded-none bg-[#FFF8FA] border-[12px] md:border-[16px] border-[#800020] shadow-[10px_10px_0px_rgba(128,0,32,0.05),0_18px_35px_rgba(0,0,0,0.15)] text-center relative",
        textClass: "font-lora italic text-[16px] md:text-[18px] leading-relaxed text-[#800020] font-bold",
        authorClass: "font-mono font-bold uppercase tracking-[0.1em] text-brand-orange text-[10px] md:text-[11px]",
        dividerClass: "w-10 h-[1.5px] bg-[#800020]/20 mx-auto my-5",
        innerBorder: "outline outline-1 outline-offset-4 outline-[#800020]/10 p-5 flex flex-col justify-center min-h-[380px]"
      },
      {
        // 4. Modern Charcoal Minimalist Frame - Square Compact
        cardClass: "mb-6 break-inside-avoid inline-block w-full p-5 rounded-none bg-[#F3F4F6] border-[6px] md:border-[8px] border-[#1C1917] shadow-[4px_4px_0px_rgba(28,25,23,0.08),0_10px_20px_rgba(0,0,0,0.1)] text-center relative pointer-events-auto",
        textClass: "font-mono font-semibold text-[13px] md:text-[14px] leading-loose text-[#1C1917] tracking-wider",
        authorClass: "font-sans font-bold lowercase tracking-[0.1em] text-[10px] text-stone-500",
        dividerClass: "w-8 h-[1px] bg-[#1C1917]/20 mx-auto my-3",
        innerBorder: "border border-[#1C1917]/20 p-4 flex flex-col justify-center min-h-[180px]"
      },
      {
        // 5. Bright Classic Cream & Maple Frame - Short Landscape
        cardClass: "mb-6 break-inside-avoid inline-block w-full p-6 rounded-none bg-white border-[8px] md:border-[11px] border-[#8D6E63] shadow-[8px_8px_0px_rgba(141,110,99,0.05),0_12px_22px_rgba(0,0,0,0.09)] text-center relative",
        textClass: "font-serif text-[15px] md:text-[16px] text-[#3E2723] font-medium leading-relaxed font-lora",
        authorClass: "font-sans font-bold uppercase tracking-widest text-[#B1887F] text-[9px] md:text-[10px]",
        dividerClass: "w-12 h-[1px] bg-[#8D6E63]/30 mx-auto my-3",
        innerBorder: "border-[2px] border-double border-[#8D6E63]/10 p-4 flex flex-col justify-center min-h-[160px]"
      },
      {
        // 6. Natural Sand Pine Wood Frame - Stitched Vertical
        cardClass: "mb-6 break-inside-avoid inline-block w-full p-5 md:p-7 rounded-none bg-[#FAF9F5] border-[11px] md:border-[15px] border-[#D2B48C] shadow-[9px_9px_0px_rgba(210,180,140,0.04),0_16px_32px_rgba(0,0,0,0.11)] text-center relative",
        textClass: "font-serif italic text-base md:text-lg leading-relaxed text-[#5D4037] font-bold",
        authorClass: "font-sans font-extrabold uppercase tracking-[0.12em] text-[#8C6D47] text-[10px]",
        dividerClass: "w-14 h-[1.5px] bg-[#D2B48C]/30 mx-auto my-4",
        innerBorder: "border border-[#D2B48C]/15 p-5 flex flex-col justify-center min-h-[310px]"
      },
      {
        // 7. Elite Metallic Gold Leaf Frame - Monumental Tall
        cardClass: "mb-6 break-inside-avoid inline-block w-full p-6 md:p-8 rounded-none bg-[#FCFAF0] border-[10px] md:border-[14px] border-[#D4AF37] shadow-[11px_11px_0px_rgba(212,175,55,0.05),0_20px_40px_rgba(0,0,0,0.15)] text-center relative",
        textClass: "font-sans font-black text-sm md:text-base leading-relaxed text-[#5C4308] tracking-wider",
        authorClass: "font-sans font-black uppercase tracking-[0.25em] text-[#D4AF37] text-[10px]",
        dividerClass: "w-20 h-[3px] bg-[#D4AF37]/20 mx-auto my-4",
        innerBorder: "border-[3px] border-double border-[#D4AF37]/20 p-5 flex flex-col justify-center min-h-[350px]"
      },
      {
        // 8. Elegant Rose-Quartz Pastel Frame - Slim Portrait
        cardClass: "mb-6 break-inside-avoid inline-block w-full p-5 md:p-7 rounded-none bg-white border-[8px] md:border-[11px] border-brand-orange shadow-[7px_7px_0px_rgba(194,115,135,0.05),0_14px_28px_rgba(0,0,0,0.1)] text-center relative",
        textClass: "font-sans text-[14px] md:text-[15px] font-bold leading-relaxed text-[#A85967]",
        authorClass: "font-sans font-extrabold uppercase tracking-widest text-brand-orange text-[9px]",
        dividerClass: "w-12 h-[1.5px] bg-brand-orange/20 mx-auto my-3",
        innerBorder: "border border-dashed border-brand-orange/15 p-4 flex flex-col justify-center min-h-[250px]"
      }
    ];

    return styles[idx % styles.length];
  };

  return (
    <div id="roos-capital-container" className="max-w-7xl mx-auto px-4 pb-20 pt-6 font-sans">
      
      {/* Back Header with Brand Colors */}
      <div className="flex items-center justify-between mb-8" id="roos-capital-back-bar">
        <a 
          href="/"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault();
              onBack();
            }
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#E2A7B5] hover:bg-[#E2A7B5]/10 text-[#E2A7B5] hover:text-brand-wine hover:border-[#A85967] rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          id="roos-capital-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </a>
        <span className="text-[10px] font-black uppercase text-[#A85967]/60 tracking-[0.25em]" id="roos-capital-tracker">
          INSPIRACIÓN Y VALORES — ROOS CAPITAL
        </span>
      </div>

      {/* Main Header */}
      <section className="text-center space-y-4 max-w-4xl mx-auto mb-16" id="roos-capital-hero">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#A85967]/10 text-[#A85967] text-xs font-black uppercase tracking-[0.25em] shadow-sm border border-[#A85967]/20">
          ROOS CAPITAL
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-black text-[#A85967] tracking-tight leading-none uppercase">
          El Muro de la <span className="text-brand-orange underline decoration-[#FF74DB]/30 decoration-wavy underline-offset-8">Inspiración</span>
        </h1>
        <p className="text-base md:text-lg font-lora italic text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          "Un espacio dedicado a las mentes más brillantes, los corazones decididos y la incansable tenacidad femenina."
        </p>
      </section>

      {/* Physical Room Wall Backdrop Effect */}
      <div 
        className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-orange/15 mb-16 bg-[#F5F2EC]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='80' viewBox='0 0 160 80'%3E%3Crect width='160' height='80' fill='%23F5F2EC'/%3E%3Cpath d='M0 0h160v3H0zm0 40h160v3H0zm0 37h160v3H0z' fill='%23E2DCCF'/%3E%3Cpath d='M80 0v40M0 40v40M160 40v40' stroke='%23E2DCCF' stroke-width='3'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
        id="roos-gallery-wall-frame"
      >
        
        {/* Soft Radial Spotlight overlay to look exactly like a physical gallery wall with real light casting beams */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.72)_0%,rgba(245,242,236,0.18)_60%,rgba(215,205,192,0.67)_100%)] z-0 pointer-events-none" />

        {/* Gallery Spotlights Beam */}
        <div className="absolute top-0 left-1/4 right-1/4 h-24 bg-gradient-to-b from-white/30 to-transparent blur-3xl z-0 pointer-events-none" />

        {/* Real organic multi-column layout wall as requested */}
        <div 
          className="relative z-10 px-4 py-12 md:px-8 md:py-14 columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 [column-fill:_auto]"
          id="roos-capital-floating-wall"
        >
          <AnimatePresence mode="popLayout">
            {quotes.map((quote, idx) => {
              const currentStyle = getPosterStyle(idx);
              return (
                <motion.div
                  layout
                  key={`${quote.author}-${quote.text.substring(0, 15)}-${idx}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ 
                    scale: 1.03, 
                    y: -5,
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.22)'
                  }}
                  className={currentStyle.cardClass}
                  id={`quote-pill-${idx}`}
                >
                  <div className={currentStyle.innerBorder}>
                    {/* Centered quote text */}
                    <p className={currentStyle.textClass}>
                      "{quote.text}"
                    </p>
                    
                    {/* Decorative separator line inside user's poster */}
                    <div className={currentStyle.dividerClass} />
                    
                    {/* Centered Author */}
                    <div className="mt-2">
                      <span className={currentStyle.authorClass}>
                        — {quote.author}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Simulated Wooden Baseboard & Gallery Floor at the bottom of the wall */}
        <div className="relative z-10 w-full h-8 bg-gradient-to-b from-[#8C6239] to-[#5D4037] border-t-4 border-[#4A2E20] shadow-inner" id="gallery-wood-baseboard" />
        <div className="relative z-10 w-full h-12 bg-gradient-to-b from-[#6D4C41] to-[#3E2723] opacity-95 flex items-center justify-center" id="gallery-wood-floor">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#C4A484]/40 font-bold">Galeria de Arte Roos Capital</span>
        </div>
      </div>

    </div>
  );
}
