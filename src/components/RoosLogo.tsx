import React from 'react';
import { cn } from '../utils/cn';

interface RoosLogoProps {
  className?: string;
  subtitleClassName?: string;
  align?: 'left' | 'center';
}

interface RoosLogoTextProps {
  className?: string;
}

/**
 * Geometric intersecting double-ring O's matching the reference image.
 * Uses classical calligraphic modulation (slender arches, graceful side strokes)
 * perfectly scaled to align with the cap height of the serif 'R' and 'S'.
 */
const RING_1_PATH = "M 28 2 A 26 29 0 1 0 28 60 A 26 29 0 1 0 28 2 Z M 28 6.8 A 20.5 24.2 0 1 1 28 55.2 A 20.5 24.2 0 1 1 28 6.8 Z";
const RING_2_PATH = "M 58 2 A 26 29 0 1 0 58 60 A 26 29 0 1 0 58 2 Z M 58 6.8 A 20.5 24.2 0 1 1 58 55.2 A 20.5 24.2 0 1 1 58 6.8 Z";

export function RoosLogoText({ className }: RoosLogoTextProps) {
  return (
    <span className={cn("font-serif font-bold text-2xl sm:text-3xl tracking-tight leading-none inline-flex items-center select-none", className)}>
      {/* First letter R from the current serif typography */}
      <span className="relative z-0 leading-none">R</span>

      {/* Two intersecting geometric rings 'OO' scaled to match R and S optical cap height */}
      <span className="inline-flex items-center mx-[0.03em] shrink-0 leading-none">
        <svg 
          viewBox="0 0 86 62" 
          className="h-[0.78em] w-auto overflow-visible select-none inline-block translate-y-[0.10em] sm:translate-y-[0.015em]" 
          fill="currentColor"
          aria-label="OO"
        >
          <path d={RING_1_PATH} fillRule="evenodd" />
          <path d={RING_2_PATH} fillRule="evenodd" />
        </svg>
      </span>

      {/* Trailing letter S from the current serif typography */}
      <span className="relative z-0 leading-none ml-[0.01em]">
        S
      </span>
    </span>
  );
}

export default function RoosLogo({ 
  className, 
  subtitleClassName,
  align = 'center'
}: RoosLogoProps) {
  return (
    <div className={cn("flex flex-col leading-none select-none", align === 'left' ? "items-start" : "items-center")}>
      <RoosLogoText className={className} />
      <span className={cn("font-sans font-bold text-[8.5px] sm:text-[9.5px] tracking-[0.34em] text-neutral-500 uppercase mt-0.5 leading-none pl-[0.34em] text-center w-full", subtitleClassName)}>
        CAPITAL
      </span>
    </div>
  );
}
