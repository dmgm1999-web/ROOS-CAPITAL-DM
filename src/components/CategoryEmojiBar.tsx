import React, { useRef, useMemo } from 'react';
import { cn } from '../utils/cn';

interface CategoryEmojiBarProps {
  categories: string[];
  selectedCategories: string[];
  onSelectCategory: (cat: string | null) => void;
  translateCategory?: (cat: string) => string;
  language?: 'es' | 'en';
}

const CATEGORY_EMOJIS: Record<string, string> = {
  'holistico': '🌿',
  'holístico': '🌿',
  'joyería': '💎',
  'joyeria': '💎',
  'moda': '👗',
  'fashion & accessories': '👗',
  'diseño': '🎨',
  'diseno': '🎨',
  'art & design': '🎨',
  'fotografía': '📷',
  'fotografia': '📷',
  'restaurante': '🍽️',
  'food & beverages': '🍽️',
  'bienestar': '🧘',
  'wellness & health': '🧘',
  'belleza': '💄',
  'beauty & cosmetics': '💄',
  'alimentos': '🥗',
  'panadería': '🥖',
  'panaderia': '🥖',
  'cafetería': '☕',
  'cafeteria': '☕',
  'pastelería': '🧁',
  'pasteleria': '🧁',
  'florería': '🌸',
  'floreria': '🌸',
  'arte': '🖼️',
  'skincare': '✨',
  'maquillaje': '💋',
  'salón de belleza': '💇‍♀️',
  'salon de belleza': '💇‍♀️',
  'perfumería': '🧴',
  'perfumeria': '🧴',
  'eventos': '🎉',
  'zapatería': '👠',
  'zapateria': '👠',
  'idiomas': '📚',
  'education & coaching': '📚',
  'productos naturales': '🍃',
  'juguetería': '🧸',
  'jugueteria': '🧸',
  'nutrición': '🥑',
  'nutricion': '🥑',
  'professional services': '💼',
  'home & decor': '🏡',
  'tech & innovation': '💻',
  'ugc creators': '🎬',
  'suppliers': '📦',
  'social impact': '🤝',
  'kids & maternity': '👶',
  'calzado': '👠',
  'footwear': '👠',
  'bolsos': '👜',
  'handbags': '👜',
  'marroquinería': '💼',
  'marroquineria': '💼',
  'leather goods': '💼',
  'velas': '🕯️',
  'candles': '🕯️',
  'lencería': '👙',
  'lenceria': '👙',
  'lingerie': '👙',
  'bañadores': '🩱',
  'banadores': '🩱',
  'swimwear': '🩱',
  'bikinis': '👙',
  'fragancias': '💐',
  'fragrances': '💐',
  'flores': '🌸',
  'flowers': '🌸',
  'papelería': '📝',
  'papeleria': '📝',
  'stationery': '📝',
  'gafas': '🕶️',
  'eyewear': '🕶️',
  'cuidado personal': '✨',
  'personal care': '✨',
  'alta costura': '👑',
  'haute couture': '👑',
  'ropa': '👚',
  'apparel': '👚',
  'jewelry': '💎',
  'decoración': '🏡',
  'decoracion': '🏡',
  'cosmética': '💄',
  'cosmetica': '💄',
  'cosmetics': '💄'
};

export function getCategoryEmoji(catName: string): string {
  const lower = (catName || '').toLowerCase().trim();
  if (CATEGORY_EMOJIS[lower]) return CATEGORY_EMOJIS[lower];
  for (const [key, emoji] of Object.entries(CATEGORY_EMOJIS)) {
    if (lower.includes(key) || key.includes(lower)) {
      return emoji;
    }
  }
  return '✨';
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

  // Group and deduplicate categories by their displayed name so "Art & Design", "Beauty & Cosmetics", etc. NEVER repeat!
  const uniquePills = useMemo(() => {
    const map = new Map<string, UnifiedCategoryPill>();

    for (const cat of categories) {
      if (!cat || !cat.trim()) continue;
      const clean = cat.trim();
      if (clean.toLowerCase() === 'categoria' || clean.toLowerCase() === 'todas' || clean.toLowerCase() === 'all') {
        continue;
      }
      const displayName = translateCategory(clean).trim();
      const normKey = displayName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      if (!map.has(normKey)) {
        const emoji = getCategoryEmoji(displayName) !== '✨' ? getCategoryEmoji(displayName) : getCategoryEmoji(clean);
        map.set(normKey, {
          displayName,
          emoji,
          matchingCategories: [clean]
        });
      } else {
        const existing = map.get(normKey)!;
        if (!existing.matchingCategories.includes(clean)) {
          existing.matchingCategories.push(clean);
        }
      }
    }

    return Array.from(map.values());
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
