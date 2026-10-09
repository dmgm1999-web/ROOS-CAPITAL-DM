import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Sparkles, Globe, MapPin, Building, Tag, RotateCcw, X, Lock } from 'lucide-react';
import { Announcement } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { translateCountryName } from '../utils/countryUtils';
import { playClickSound } from '../utils/sound';
import { cn } from '../utils/cn';
import { AnnouncementCard } from './AnnouncementCard';

interface ScratchAndDiscoverProps {
  announcements: Announcement[];
  availableCountries: string[];
  onToggleFavorite?: (ad: Announcement) => void;
  favorites?: string[];
}

interface SingleCardProps {
  ad: Announcement;
  cardIndex: number;
  hasQuizCompleted: boolean;
  onInitiateScratch: () => void;
  isScratchedAny: boolean;
  thisCardScratched: boolean;
  onCardRevealed: (index: number) => void;
  onToggleFavorite?: (ad: Announcement) => void;
  isFavorite?: boolean;
}

// Procedural Liquid Marble & Starry Canvas Painter matching gloss.png
function drawGlossyFoil(ctx: CanvasRenderingContext2D, width: number, height: number, language: string) {
  // Base soft pink gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#FFA8C5');
  grad.addColorStop(0.25, '#FFD1DF');
  grad.addColorStop(0.5, '#E85B81');
  grad.addColorStop(0.75, '#F582A4');
  grad.addColorStop(1, '#FFB6CB');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Swirling milky marble waves
  ctx.save();
  ctx.filter = 'blur(6px)';
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.42)' : 'rgba(255, 220, 235, 0.35)';
    ctx.lineWidth = 18 + i * 6;
    ctx.moveTo(-20, height * 0.2 + i * 40);
    ctx.bezierCurveTo(
      width * 0.4, height * 0.1 + i * 35,
      width * 0.6, height * 0.8 + i * 30,
      width + 20, height * 0.6 + i * 25
    );
    ctx.stroke();
  }
  ctx.restore();

  // Fine starry glitter dust
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  for (let i = 0; i < 90; i++) {
    const x = (i * 47) % width;
    const y = (i * 61) % height;
    const r = (i % 4 === 0) ? 1.8 : 0.9;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Sparkling cosmic stars (4-pointed stars)
  const drawSparkle = (cx: number, cy: number, r: number) => {
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    ctx.quadraticCurveTo(cx, cy, cx + r, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy + r);
    ctx.quadraticCurveTo(cx, cy, cx - r, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy - r);
    ctx.fill();
    ctx.restore();
  };

  const sparkles = [
    [width * 0.2, height * 0.25, 7],
    [width * 0.75, height * 0.2, 9],
    [width * 0.4, height * 0.7, 8],
    [width * 0.8, height * 0.65, 6],
    [width * 0.15, height * 0.8, 6],
    [width * 0.5, height * 0.4, 10]
  ];
  sparkles.forEach(([sx, sy, sr]) => drawSparkle(sx, sy, sr));

  // Center Calligraphy label
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
  ctx.shadowBlur = 6;
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText(language === 'en' ? '✦ Scratch here ✦' : '✦ Rasca aquí ✦', width / 2, height / 2 - 8);
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText(language === 'en' ? 'to reveal surprise brand' : 'para descubrir negocio', width / 2, height / 2 + 12);
  ctx.restore();
}

// 16 Precomputed radial explosive particles (includes both golden/yellow and fuchsia for the perfect blast)
const RADIAL_PARTICLES = Array.from({ length: 16 }, (_, i) => {
  const angleDeg = (i * 360) / 16;
  const angleRad = (angleDeg * Math.PI) / 180;
  const dist = 130 + (i % 4) * 25; // 130px to 205px
  const dx = Math.round(Math.cos(angleRad) * dist);
  const dy = Math.round(Math.sin(angleRad) * dist);
  const symbols = ['✦', '✨', '✧', '★', '●', '✦'];
  const isYellow = i % 2 === 0;
  return {
    id: i,
    dx,
    dy,
    symbol: symbols[i % symbols.length],
    colorClass: isYellow 
      ? 'text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.95)]' 
      : 'text-[#E85B81] drop-shadow-[0_0_12px_rgba(232,91,129,0.95)]',
    delayMs: (i % 3) * 40
  };
});

function ScratchCardItem({
  ad,
  cardIndex,
  hasQuizCompleted,
  onInitiateScratch,
  isScratchedAny,
  thisCardScratched,
  onCardRevealed,
  onToggleFavorite,
  isFavorite
}: SingleCardProps) {
  const { language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  // Redraw canvas foil with stable dimensions to prevent flickering/glitches
  useEffect(() => {
    if (thisCardScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animId = requestAnimationFrame(() => {
      const width = canvas.offsetWidth || 300;
      const height = canvas.offsetHeight || 380;
      if (width > 0 && height > 0) {
        canvas.width = width;
        canvas.height = height;
        drawGlossyFoil(ctx, width, height, language);
      }
    });

    return () => cancelAnimationFrame(animId);
  }, [language, thisCardScratched, ad?.id, ad?.titulo]);

  // When card is revealed: dramatic jump forward + radial explosive fuchsia sparkles,
  // then smoothly settle back and keep fuchsia heartbeat sparkles pulsating
  useEffect(() => {
    if (thisCardScratched) {
      setIsJumping(true);
      setIsExploding(true);

      const explodeTimer = setTimeout(() => {
        setIsExploding(false);
      }, 1050);

      const jumpTimer = setTimeout(() => {
        setIsJumping(false);
      }, 1000);

      return () => {
        clearTimeout(explodeTimer);
        clearTimeout(jumpTimer);
      };
    }
  }, [thisCardScratched]);

  const scratch = (clientX: number, clientY: number) => {
    if (!hasQuizCompleted) {
      onInitiateScratch();
      return;
    }

    if (isScratchedAny && !thisCardScratched) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas || thisCardScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparentCount = 0;
      const totalSampled = imgData.data.length / 16;
      for (let i = 3; i < imgData.data.length; i += 16) {
        if (imgData.data[i] === 0) transparentCount++;
      }
      if (transparentCount / totalSampled > 0.30) {
        onCardRevealed(cardIndex);
        playClickSound();
      }
    } catch (e) {}
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!hasQuizCompleted) {
      onInitiateScratch();
      return;
    }
    if (isScratchedAny && !thisCardScratched) return;
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  const isLockedOut = isScratchedAny && !thisCardScratched;

  return (
    <div 
      className={cn(
        "relative w-full rounded-2xl sm:rounded-3xl transition-all duration-700 flex flex-col justify-between group",
        isJumping 
          ? "scale-[1.18] -translate-y-8 shadow-[0_40px_80px_-12px_rgba(232,91,129,0.58)] ring-4 ring-[#E85B81] z-40 ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
          : (thisCardScratched ? "scale-100 translate-y-0 shadow-md z-10 ease-out" : "shadow-sm hover:shadow-md")
      )}
    >
      {/* 1. RADIAL EXPLOSIVE SPARKLES (Fires outward during dramatic jump with both gold and fuchsia) */}
      {isExploding && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible flex items-center justify-center">
          {RADIAL_PARTICLES.map((p) => (
            <span
              key={p.id}
              className={cn(
                "absolute text-lg sm:text-2xl font-bold pointer-events-none animate-[radialBurst_1s_cubic-bezier(0.16,1,0.3,1)_forwards]",
                p.colorClass
              )}
              style={{
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
                animationDelay: `${p.delayMs}ms`
              } as React.CSSProperties}
            >
              {p.symbol}
            </span>
          ))}
        </div>
      )}

      {/* The EXACT Directory Card - completely clean with no lingering sparkles or animations */}
      <div className="w-full h-full">
        <AnnouncementCard 
          ad={ad}
          isDiamonds={false}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(ad) : undefined}
        />
      </div>

      {/* Scratch Canvas Overlay (Liquid marble & sparkles matching gloss.png) */}
      {!thisCardScratched && (
        <div 
          onClick={() => {
            if (!hasQuizCompleted) onInitiateScratch();
          }}
          className="absolute inset-0 z-20 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col items-center justify-center select-none cursor-pointer"
        >
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="absolute inset-0 w-full h-full touch-none"
          />

          {/* Locked out state when another card was already scratched this round */}
          {isLockedOut && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs flex flex-col items-center justify-center text-center p-4 text-white z-30 pointer-events-auto">
              <Lock className="w-6 h-6 text-pink-300 mb-2" />
              <p className="text-xs font-bold leading-tight">
                {language === 'en'
                  ? 'Only 1 card per round!'
                  : '¡Solo 1 tarjeta por ronda!'}
              </p>
              <p className="text-[10px] text-pink-200 mt-1 opacity-90">
                {language === 'en'
                  ? 'Play again to scratch another card.'
                  : 'Juega otra ronda para rascar otra.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ScratchAndDiscover({
  announcements,
  availableCountries,
  onToggleFavorite,
  favorites = []
}: ScratchAndDiscoverProps) {
  const { language, translateCategory } = useLanguage();

  // Quiz state
  const [hasQuizCompleted, setHasQuizCompleted] = useState<boolean>(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedMunicipio, setSelectedMunicipio] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Round state
  const [scratchedCardIndex, setScratchedCardIndex] = useState<number | null>(null);
  const [roundId, setRoundId] = useState<number>(1);
  const activeRoundCardsRef = useRef<Announcement[] | null>(null);

  // Dynamically compute states based on selected country
  const statesForCountry = useMemo(() => {
    if (!selectedCountry || selectedCountry === 'all') return [];
    const set = new Set<string>();
    announcements.forEach(a => {
      const c = (a.pais || 'México').trim().toLowerCase();
      const target = selectedCountry.toLowerCase();
      if (c === target || (target === 'usa' && (c === 'usa' || c === 'estados unidos'))) {
        if (a.estado && a.estado.trim()) set.add(a.estado.trim());
      }
    });
    return Array.from(set).sort();
  }, [announcements, selectedCountry]);

  // Dynamically compute municipalities based on selected state
  const municipiosForState = useMemo(() => {
    if (!selectedState || selectedState === 'all') return [];
    const set = new Set<string>();
    announcements.forEach(a => {
      if (a.estado && a.estado.trim().toLowerCase() === selectedState.toLowerCase()) {
        if (a.municipio && a.municipio.trim()) set.add(a.municipio.trim());
      }
    });
    return Array.from(set).sort();
  }, [announcements, selectedState]);

  // Available categories
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    announcements.forEach(a => {
      if (a.categoria && a.categoria.trim()) set.add(a.categoria.trim());
    });
    return Array.from(set).sort();
  }, [announcements]);

  // 3 Selected announcements for current round
  // Stabilize cards in state so they only update on round change or quiz completion (eliminating flickering/glitches)
  const [currentRoundCards, setCurrentRoundCards] = useState<Announcement[]>([]);

  const pickRoundCards = useCallback(() => {
    let pool = [...announcements];

    // Filter by country if quiz was completed with preferences
    if (selectedCountry && selectedCountry !== 'all') {
      const target = selectedCountry.toLowerCase();
      pool = pool.filter(a => {
        const c = (a.pais || 'México').trim().toLowerCase();
        return c === target || (target === 'usa' && (c === 'usa' || c === 'estados unidos'));
      });
    }

    // Filter by state
    if (selectedState && selectedState !== 'all') {
      pool = pool.filter(a => a.estado && a.estado.trim().toLowerCase() === selectedState.toLowerCase());
    }

    // Filter by municipality
    if (selectedMunicipio && selectedMunicipio !== 'all') {
      pool = pool.filter(a => a.municipio && a.municipio.trim().toLowerCase() === selectedMunicipio.toLowerCase());
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      pool = pool.filter(a => a.categoria && a.categoria.trim().toLowerCase() === selectedCategory.toLowerCase());
    }

    // Fallback if needed
    if (pool.length < 3) {
      const remaining = announcements.filter(a => !pool.some(p => p.titulo === a.titulo));
      pool = [...pool, ...remaining];
    }

    // Deterministic shuffle for the new round
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, 3);
    setCurrentRoundCards(picked);
  }, [announcements, selectedCountry, selectedState, selectedMunicipio, selectedCategory]);

  // Initial load once announcements are ready
  useEffect(() => {
    if (announcements.length > 0 && currentRoundCards.length === 0) {
      pickRoundCards();
    }
  }, [announcements.length, currentRoundCards.length, pickRoundCards]);

  const handleStartQuiz = () => {
    setIsQuizModalOpen(true);
  };

  const handleCompleteQuiz = () => {
    playClickSound();
    setHasQuizCompleted(true);
    setIsQuizModalOpen(false);
    pickRoundCards();
  };

  const handleQuickSurprise = () => {
    playClickSound();
    setSelectedCountry('');
    setSelectedState('');
    setSelectedMunicipio('');
    setSelectedCategory('');
    setHasQuizCompleted(true);
    setIsQuizModalOpen(false);
    pickRoundCards();
  };

  const handleCardRevealed = (index: number) => {
    setScratchedCardIndex(index);
  };

  const handleResetRound = () => {
    playClickSound();
    setScratchedCardIndex(null);
    setHasQuizCompleted(false);
    setRoundId(prev => prev + 1);
    pickRoundCards();
  };

  const matchedCards = currentRoundCards.length >= 3 ? currentRoundCards : announcements.slice(0, 3);

  return (
    <div 
      className="w-full my-10 flex flex-col items-center select-none"
      id="scratch-and-discover-section"
    >
      {/* Header matching Explora & Encuentra size and style */}
      <div className="text-center w-full py-6 sm:py-8 px-4 flex flex-col justify-center items-center">
        <span className="text-[#E85B81] font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] font-sans">
          {language === 'en' ? 'Interactive Mini-Game' : 'Minijuego Interactivo'}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#18181B] mt-0.5 sm:mt-1.5 mb-1 sm:mb-2.5 tracking-tight">
          {language === 'en' ? (
            <>
              Scratch <span className="font-serif italic font-normal text-[#E85B81] mx-1 sm:mx-1.5 select-none">&</span> Surprise Yourself
            </>
          ) : (
            <>
              Rasca <span className="font-serif italic font-normal text-[#E85B81] mx-1 sm:mx-1.5 select-none">&</span> Sorpréndete
            </>
          )}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-neutral-600 max-w-2xl lg:max-w-4xl mx-auto font-sans">
          {language === 'en' ? (
            <>
              Touch or scratch any card to customize your quiz and reveal 1 surprise <span className="whitespace-nowrap">brand per round!</span>
            </>
          ) : (
            '¡Rasca o toca cualquier tarjeta para personalizar tu quiz y descubrir 1 negocio sorpresa por ronda!'
          )}
        </p>
      </div>

      {/* 3 SCRATCH CARDS - VISIBLE IMMEDIATELY */}
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center px-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 items-start">
          {matchedCards.map((ad, idx) => (
            <ScratchCardItem
              key={`${ad.id || ad.titulo}-${idx}-${roundId}`}
              ad={ad}
              cardIndex={idx}
              hasQuizCompleted={hasQuizCompleted}
              onInitiateScratch={handleStartQuiz}
              isScratchedAny={scratchedCardIndex !== null}
              thisCardScratched={scratchedCardIndex === idx}
              onCardRevealed={handleCardRevealed}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(ad.titulo.toLowerCase().trim())}
            />
          ))}
        </div>

        {/* Action Controls below cards - only show play again when revealed */}
        {scratchedCardIndex !== null && (
          <div className="flex items-center justify-center mt-3">
            <button
              onClick={handleResetRound}
              className="py-2.5 px-7 bg-gradient-to-r from-[#E85B81] to-[#DE4B73] text-white font-bold text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'en' ? 'Play another round!' : '¡Jugar otra ronda!'}</span>
            </button>
          </div>
        )}
      </div>

      {/* QUIZ MODAL - APPEARS RIGHT WHEN THEY GO TO SCRATCH */}
      {isQuizModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl border-2 border-[#E85B81]/30 max-w-lg w-full p-5 sm:p-7 shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setIsQuizModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#E85B81]">
                {language === 'en' ? 'Quick Preference Quiz' : 'Quiz Rápido de Preferencias'}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#18181B] mt-1">
                {language === 'en' ? 'What are you looking for?' : '¿Qué estás buscando hoy?'}
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                {language === 'en'
                  ? 'Answer to customize your scratch cards, or choose surprise me!'
                  : 'Personaliza tus opciones o elige sorprenderte al azar.'}
              </p>
            </div>

            <div className="flex flex-col gap-3.5">
              {/* 1. Country */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#E85B81]" />
                  <span>1. {language === 'en' ? 'Country' : 'País'}</span>
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setSelectedState('');
                    setSelectedMunicipio('');
                  }}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-[#E85B81] focus:ring-2 focus:ring-[#E85B81]/20 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-neutral-800 outline-none"
                >
                  <option value="">{language === 'en' ? '🌎 Any country' : '🌎 Cualquier país'}</option>
                  {availableCountries.map(c => (
                    <option key={c} value={c}>{translateCountryName(c, language)}</option>
                  ))}
                </select>
              </div>

              {/* 2. State */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E85B81]" />
                  <span>2. {language === 'en' ? 'State / Region' : 'Estado o Región'}</span>
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedMunicipio('');
                  }}
                  disabled={!selectedCountry || statesForCountry.length === 0}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-[#E85B81] focus:ring-2 focus:ring-[#E85B81]/20 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-neutral-800 outline-none disabled:opacity-50"
                >
                  <option value="">
                    {!selectedCountry 
                      ? (language === 'en' ? 'Select a country first' : 'Primero elige un país')
                      : (language === 'en' ? '📍 Any state' : '📍 Cualquier estado')}
                  </option>
                  {statesForCountry.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* 3. Municipality */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#E85B81]" />
                  <span>3. {language === 'en' ? 'Municipality / City' : 'Municipio o Ciudad'}</span>
                </label>
                <select
                  value={selectedMunicipio}
                  onChange={(e) => setSelectedMunicipio(e.target.value)}
                  disabled={!selectedState || municipiosForState.length === 0}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-[#E85B81] focus:ring-2 focus:ring-[#E85B81]/20 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-neutral-800 outline-none disabled:opacity-50"
                >
                  <option value="">
                    {!selectedState 
                      ? (language === 'en' ? 'Select a state first' : 'Primero elige un estado')
                      : (language === 'en' ? '🏙️ Any city' : '🏙️ Cualquier municipio')}
                  </option>
                  {municipiosForState.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* 4. Category */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#E85B81]" />
                  <span>4. {language === 'en' ? 'Category' : 'Categoría deseada'}</span>
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-[#E85B81] focus:ring-2 focus:ring-[#E85B81]/20 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-neutral-800 outline-none"
                >
                  <option value="">{language === 'en' ? '🎁 Surprise me with any category' : '🎁 Sorpréndete con cualquiera'}</option>
                  {categoriesList.map(cat => (
                    <option key={cat} value={cat}>{translateCategory(cat)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleCompleteQuiz}
                className="flex-1 py-2.5 px-4 bg-[#E85B81] hover:bg-[#DE4B73] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>{language === 'en' ? 'Save & Scratch Card!' : '¡Listo, rascar mi tarjeta!'}</span>
              </button>
              <button
                onClick={handleQuickSurprise}
                className="py-2.5 px-4 bg-[#FAF8F5] hover:bg-[#FCE8EF] text-neutral-700 hover:text-[#E85B81] border border-neutral-300 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                {language === 'en' ? 'Surprise me!' : '¡Sorpréndete al azar!'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
