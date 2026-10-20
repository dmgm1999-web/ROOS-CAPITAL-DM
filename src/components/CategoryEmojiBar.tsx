import React, { useRef, useMemo } from 'react';
import { cn } from '../utils/cn';

interface CategoryEmojiBarProps {
  categories: string[];
  selectedCategories: string[];
  onSelectCategory: (cat: string | null) => void;
  translateCategory?: (cat: string) => string;
  language?: 'es' | 'en';
}

const CATEGORY_EMOJI_PREFERENCES: Record<string, string> = {
  'moda': '👗',
  'calzado': '👠',
  'zapateria': '👡',
  'bolsos': '👜',
  'marroquineria': '🎒',
  'joyeria': '💎',
  'alta joyeria': '💍',
  'cosmetica': '💄',
  'skincare': '🧴',
  'cuidado personal': '🫧',
  'maquillaje': '💋',
  'perfumeria': '💐',
  'fragancias': '🌹',
  'alta costura': '👑',
  'banadores': '🩱',
  'bañadores': '🩱',
  'bikinis': '👙',
  'lenceria': '🪞',
  'velas': '🕯️',
  'flores': '🌸',
  'floreria': '🌺',
  'alimentos': '🥗',
  'restaurante': '🍽️',
  'panaderia': '🥖',
  'pasteleria': '🧁',
  'cafeteria': '☕',
  'te': '🍵',
  'bienestar': '🧘',
  'holistico': '🌿',
  'nutricion': '🥑',
  'productos naturales': '🍃',
  'decoracion': '🏡',
  'hogar': '🛋️',
  'ceramica': '🏺',
  'textiles': '🧶',
  'arte': '🎨',
  'diseno': '🖼️',
  'fotografia': '📷',
  'papeleria': '📝',
  'idiomas': '📚',
  'educacion': '🎓',
  'jugueteria': '🧸',
  'kids': '👶',
  'maternidad': '🍼',
  'mascotas': '🐾',
  'servicios profesionales': '💼',
  'professional services': '💼',
  'tecnologia': '💻',
  'eventos': '🎉',
  'gafas': '🕶️',
  'eyewear': '👓',
  'sostenible': '♻️',
  'accesorios': '👒',
  'deportes': '🏃‍♀️',
  'artesanias': '🪡',
  'regalos': '🎁',
  'dulces': '🍫',
  'botanica': '🪴',
  'sombreros': '🧢',
  'belleza': '✨'
};

const CATEGORY_ALTERNATIVES: Record<string, string[]> = {
  'moda': ['👚', '🧥', '👘', '🥻', '🧵'],
  'calzado': ['🥿', '👢', '👞', '👟'],
  'bolsos': ['👛', '👝', '💼'],
  'joyeria': ['📿', '🔮', '✨', '🪙'],
  'cosmetica': ['🪞', '💅', '✨', '🧴'],
  'skincare': ['🫧', '🧴', '💆‍♀️', '✨'],
  'cuidado personal': ['🧼', '🚿', '🧴', '🪥'],
  'belleza': ['💖', '🪞', '💇‍♀️', '💅'],
  'alta costura': ['🪄', '💎', '👗'],
  'flores': ['🌷', '🌻', '🌼', '🪷', '🪻'],
  'alimentos': ['🍲', '🥘', '🍱', '🥣'],
  'decoracion': ['🪴', '🏮', '🎐', '🪑']
};

const UNIQUE_FALLBACK_POOL: string[] = [
  '🛍️', '✨', '⭐', '🏷️', '🪄', '💖', '🌟', '🪷', '🪻', '🌺', 
  '🌻', '🌼', '🌷', '🌾', '🍓', '🍑', '🍒', '🍋', '🥥', '🍯', 
  '🥐', '🥨', '🥞', '🧇', '🧋', '🫖', '🏮', '🎐', '🪭', '👘', 
  '🥻', '👛', '👝', '🧤', '🧣', '🧦', '🪮', '💈', '🛎️', '📦', 
  '💌', '🪴', '🪵', '🪨', '⏳', '⌚', '🧭', '🗝️', '💡', '🔍', 
  '📌', '📎', '✒️', '🖌️', '🖍️', '🧵', '🪡', '🧶', '🪢', '🪗',
  '🎨', '🎼', '🎭', '🤹‍♀️', '🎠', '🎡', '🎪', '🪅', '🎏', '🪆'
];

function getCategoryPreferredEmoji(name: string, normKey: string, usedEmojis: Set<string>): string {
  // 1. Direct match in preferences
  const direct = CATEGORY_EMOJI_PREFERENCES[normKey];
  if (direct && !usedEmojis.has(direct)) return direct;

  // 2. Try alternatives for this specific category
  const alts = CATEGORY_ALTERNATIVES[normKey] || [];
  for (const alt of alts) {
    if (!usedEmojis.has(alt)) return alt;
  }

  // 3. Substring keyword match in preferences
  for (const [key, emoji] of Object.entries(CATEGORY_EMOJI_PREFERENCES)) {
    if ((normKey.includes(key) || key.includes(normKey)) && !usedEmojis.has(emoji)) {
      return emoji;
    }
  }

  // 4. Try alternatives for substring matches
  for (const [key, altList] of Object.entries(CATEGORY_ALTERNATIVES)) {
    if (normKey.includes(key) || key.includes(normKey)) {
      for (const alt of altList) {
        if (!usedEmojis.has(alt)) return alt;
      }
    }
  }

  // 5. Pick the first unused unique emoji from the rich fallback pool
  for (const fallback of UNIQUE_FALLBACK_POOL) {
    if (!usedEmojis.has(fallback)) {
      return fallback;
    }
  }

  return '🛍️';
}

export function getCategoryEmoji(catName: string): string {
  const normKey = (catName || '').toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return CATEGORY_EMOJI_PREFERENCES[normKey] || '✨';
}

interface UnifiedCategoryPill {
  displayName: string;
  emoji: string;
  matchingCategories: string[];
}

export default function CategoryEmojiBar({
  categories,
  selectedCategories,
  onSelectCategory,
  translateCategory = (cat) => cat,
  language = 'es'
}: CategoryEmojiBarProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Group, deduplicate categories and assign STRICTLY UNIQUE emojis with ZERO duplicates!
  const uniquePills = useMemo(() => {
    const rawMap = new Map<string, { displayName: string; normKey: string; matchingCategories: string[] }>();

    for (const cat of categories) {
      if (!cat || !cat.trim()) continue;
      const clean = cat.trim();
      if (clean.toLowerCase() === 'categoria' || clean.toLowerCase() === 'todas' || clean.toLowerCase() === 'all') {
        continue;
      }
      const displayName = translateCategory(clean).trim();
      const normKey = displayName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      if (!rawMap.has(normKey)) {
        rawMap.set(normKey, {
          displayName,
          normKey,
          matchingCategories: [clean]
        });
      } else {
        const existing = rawMap.get(normKey)!;
        if (!existing.matchingCategories.includes(clean)) {
          existing.matchingCategories.push(clean);
        }
      }
    }

    const usedEmojis = new Set<string>();
    const pills: UnifiedCategoryPill[] = [];

    for (const item of Array.from(rawMap.values())) {
      const emoji = getCategoryPreferredEmoji(item.displayName, item.normKey, usedEmojis);
      usedEmojis.add(emoji);
      pills.push({
        displayName: item.displayName,
        emoji,
        matchingCategories: item.matchingCategories
      });
    }

    return pills;
  }, [categories, translateCategory, language]);

  const isAllActive = selectedCategories.length === 0;

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -260, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 260, behavior: 'smooth' });
  };

  const handlePillClick = (pill: UnifiedCategoryPill) => {
    const isSelected = pill.matchingCategories.some(mc => 
      selectedCategories.some(sc => sc.toLowerCase().trim() === mc.toLowerCase().trim())
    );
    if (isSelected && selectedCategories.length <= pill.matchingCategories.length) {
      onSelectCategory(null);
    } else {
      // Pick first matching category
      onSelectCategory(pill.matchingCategories[0]);
    }
  };

  return (
    <div className="relative w-full flex items-center gap-1.5 sm:gap-2 select-none py-1" id="category-emoji-filter-wrapper">
      {/* Left Navigation Arrow with requested shape ˂, fuchsia symbol and fuchsia circle border */}
      <button
        onClick={scrollLeft}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#FFF9FB] text-[#E85B81] border-2 border-[#E85B81] flex items-center justify-center shrink-0 shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer text-base sm:text-lg font-black leading-none"
        title={language === 'en' ? 'Scroll left' : 'Desplazar a la izquierda'}
        aria-label="Scroll left"
      >
        ˂
      </button>

      {/* Horizontal Pills Container with NO visible scrollbar */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2 px-1 flex items-center gap-2 sm:gap-2.5 scroll-smooth"
        id="category-emoji-filter-bar"
      >
        {/* "Todas" / "All" Button */}
        <button
          onClick={() => onSelectCategory(null)}
          className={cn(
            "px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 cursor-pointer shadow-2xs",
            isAllActive
              ? "bg-[#E85B81] hover:bg-[#DE4B73] text-white shadow-sm scale-[1.02]"
              : "bg-white border border-[#E85B81]/40 text-[#E85B81] hover:border-[#E85B81] hover:bg-[#FFF9FB] hover:text-[#DE4B73]"
          )}
        >
          {language === 'en' ? 'All' : 'Todas'}
        </button>

        {/* Unique Category Buttons with Emojis (No duplicates!) */}
        {uniquePills.map((pill) => {
          const isSelected = pill.matchingCategories.some(mc =>
            selectedCategories.some(sc => sc.toLowerCase().trim() === mc.toLowerCase().trim())
          );

          return (
            <button
              key={pill.displayName}
              onClick={() => handlePillClick(pill)}
              className={cn(
                "px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 flex items-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap",
                isSelected
                  ? "bg-[#E85B81] hover:bg-[#DE4B73] text-white shadow-sm scale-[1.02]"
                  : "bg-white border border-[#E85B81]/40 text-[#E85B81] hover:border-[#E85B81] hover:bg-[#FFF9FB] hover:text-[#DE4B73]"
              )}
              title={pill.displayName}
            >
              <span className="text-sm sm:text-base leading-none">{pill.emoji}</span>
              <span>{pill.displayName}</span>
            </button>
          );
        })}
      </div>

      {/* Right Navigation Arrow with requested shape ˃, fuchsia symbol and fuchsia circle border */}
      <button
        onClick={scrollRight}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#FFF9FB] text-[#E85B81] border-2 border-[#E85B81] flex items-center justify-center shrink-0 shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer text-base sm:text-lg font-black leading-none"
        title={language === 'en' ? 'Scroll right' : 'Desplazar a la derecha'}
        aria-label="Scroll right"
      >
        ˃
      </button>
    </div>
  );
}
