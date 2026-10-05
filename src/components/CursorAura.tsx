import React, { useEffect, useRef, useState } from 'react';

/**
 * ROOS Capital - Cursor Aura Light
 * Elegant, soft pink luminous aura right at the cursor tip (no trailing particle trace).
 */
export default function CursorAura() {
  const auraRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on devices that have a precise pointer/mouse
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const aura = auraRef.current;
    if (!aura) return;

    let targetX = -100;
    let targetY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Render loop using requestAnimationFrame for 60-120fps hardware acceleration
    const render = () => {
      if (aura && targetX >= 0 && targetY >= 0) {
        // Place the center of the light aura directly at the pointer tip
        aura.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  return (
    <div
      ref={auraRef}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 select-none will-change-transform ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: 'translate3d(-100px, -100px, 0)'
      }}
      aria-hidden="true"
    >
      {/* Outer soft pink aura illumination */}
      <div className="relative flex items-center justify-center">
        {/* Soft atmospheric pink halo */}
        <div 
          className="w-8 h-8 rounded-full blur-[3px]"
          style={{
            background: 'radial-gradient(circle, rgba(232, 91, 129, 0.45) 0%, rgba(244, 114, 182, 0.2) 40%, rgba(252, 232, 239, 0) 70%)'
          }}
        />

        {/* Luminous concentrated pink center glow point */}
        <div 
          className="absolute w-2.5 h-2.5 rounded-full"
          style={{
            background: 'radial-gradient(circle, #FFFFFF 15%, #FF7DA1 60%, #E85B81 100%)',
            boxShadow: '0 0 10px 2px rgba(232, 91, 129, 0.75), 0 0 4px 1px rgba(255, 255, 255, 0.9)'
          }}
        />
      </div>
    </div>
  );
}
