import React, { useEffect, useRef } from 'react';

/**
 * ROOS Capital - Cursor Aura Light
 * Elegant, soft pink luminous aura right at the cursor tip.
 * Optimized with high-efficiency requestAnimationFrame throttle, zero continuous idle loops,
 * and pure CSS transform-gpu to eliminate any hover/cursor lag.
 */
export default function CursorAura() {
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop devices that have a fine/accurate mouse pointer
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const aura = auraRef.current;
    if (!aura) return;

    let rafScheduled = false;
    let targetX = -100;
    let targetY = -100;

    const updatePosition = () => {
      if (aura) {
        // Centered around 28px width aura (target - 14px)
        aura.style.transform = `translate3d(${targetX - 14}px, ${targetY - 14}px, 0)`;
      }
      rafScheduled = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (aura.style.opacity !== '1') {
        aura.style.opacity = '1';
      }

      if (!rafScheduled) {
        rafScheduled = true;
        requestAnimationFrame(updatePosition);
      }
    };

    const onMouseLeave = () => {
      if (aura) aura.style.opacity = '0';
    };

    const onMouseEnter = () => {
      if (aura) aura.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={auraRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-200 select-none opacity-0"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        contain: 'layout style paint'
      }}
      aria-hidden="true"
    >
      {/* Outer soft pink aura illumination */}
      <div className="relative flex items-center justify-center pointer-events-none">
        {/* Soft atmospheric pink halo */}
        <div 
          className="w-7 h-7 rounded-full opacity-60 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(232, 91, 129, 0.4) 0%, rgba(244, 114, 182, 0.15) 45%, rgba(252, 232, 239, 0) 70%)'
          }}
        />

        {/* Luminous concentrated pink center glow point */}
        <div 
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #FFFFFF 20%, #FF7DA1 65%, #E85B81 100%)',
            boxShadow: '0 0 6px 1px rgba(232, 91, 129, 0.65)'
          }}
        />
      </div>
    </div>
  );
}
