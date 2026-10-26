import React, { useEffect, useRef } from 'react';

/**
 * ROOS Capital - Phosphor Green Spider (High Performance Cursor Chaser)
 * 
 * - Exactly ONE phosphor neon green spider (#39FF14) that stalks the mouse cursor.
 * - Desktop only (hidden on mobile / touch devices < 768px).
 * - Ultra-optimized: Zero React re-renders during motion.
 * - Auto-sleeping RAF: stops running frames when the mouse is stationary and spider has caught up.
 * - 100% pointer-events-none: completely non-blocking.
 */

function PhosphorSpiderGraphic({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible select-none drop-shadow-[0_0_9px_#39FF14]"
      aria-hidden="true"
    >
      <defs>
        <filter id="singlePhosphorGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#39FF14" floodOpacity="0.85" />
        </filter>
        <radialGradient id="singleSpiderBodyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1C3818" />
          <stop offset="60%" stopColor="#0B1A0A" />
          <stop offset="100%" stopColor="#050C05" />
        </radialGradient>
      </defs>

      {/* Spider Ground Glow Shadow */}
      <ellipse cx="50" cy="56" rx="18" ry="10" fill="rgba(57, 255, 20, 0.22)" filter="blur(2px)" />

      {/* Articulated Spider Legs - Left */}
      <g
        className="spider-legs-l"
        stroke="#39FF14"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 46 44 Q 28 20 14 10 Q 8 18 12 30" />
        <path d="M 44 48 Q 22 34 10 36 Q 4 46 8 54" />
        <path d="M 44 54 Q 20 54 10 68 Q 8 78 16 82" />
        <path d="M 46 58 Q 26 74 18 88 Q 20 96 28 98" />
      </g>

      {/* Articulated Spider Legs - Right */}
      <g
        className="spider-legs-r"
        stroke="#39FF14"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 54 44 Q 72 20 86 10 Q 92 18 88 30" />
        <path d="M 56 48 Q 78 34 90 36 Q 96 46 92 54" />
        <path d="M 56 54 Q 80 54 90 68 Q 92 78 84 82" />
        <path d="M 54 58 Q 74 74 82 88 Q 80 96 72 98" />
      </g>

      {/* Pedipalps / Fangs */}
      <path d="M 46 36 L 43 25 L 40 28" stroke="#39FF14" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 54 36 L 57 25 L 60 28" stroke="#39FF14" strokeWidth="2.2" strokeLinecap="round" />

      {/* Cephalothorax (Head) */}
      <circle cx="50" cy="42" r="9" fill="url(#singleSpiderBodyGrad)" stroke="#39FF14" strokeWidth="1.8" />

      {/* Abdomen (Rear) */}
      <ellipse cx="50" cy="62" rx="13" ry="17" fill="url(#singleSpiderBodyGrad)" stroke="#39FF14" strokeWidth="2" />

      {/* Phosphor Glowing Bio-Hazard Spine Marking */}
      <path
        d="M 50 56 L 54 64 L 50 67 L 46 64 Z M 50 74 L 54 67 L 50 64 L 46 67 Z"
        fill="#39FF14"
        filter="url(#singlePhosphorGlow)"
      />

      {/* Glowing Neon Green Eyes */}
      <circle cx="47" cy="40" r="1.8" fill="#39FF14" filter="url(#singlePhosphorGlow)" />
      <circle cx="53" cy="40" r="1.8" fill="#39FF14" filter="url(#singlePhosphorGlow)" />
      <circle cx="47" cy="40" r="0.9" fill="#FFFFFF" />
      <circle cx="53" cy="40" r="0.9" fill="#FFFFFF" />
    </svg>
  );
}

export default function PhosphorSpiders() {
  const spiderDomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    let isMobile = window.innerWidth < 768;
    const dom = spiderDomRef.current;
    if (!dom) return;

    const handleResize = () => {
      isMobile = window.innerWidth < 768;
      if (dom) {
        dom.style.display = isMobile ? 'none' : 'block';
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let currentX = window.innerWidth * 0.75;
    let currentY = 180;
    let currentAngle = Math.PI * 0.7;
    let targetX = currentX;
    let targetY = currentY;
    let animFrameId: number | null = null;
    let isRunning = false;
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
      if (isTabVisible && !isRunning) {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const step = () => {
      if (!isTabVisible || isMobile) {
        isRunning = false;
        return;
      }

      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const dist = Math.hypot(dx, dy);

      // Stop distance: 30px away from the cursor
      if (dist > 30) {
        const desiredAngle = Math.atan2(dy, dx);
        
        let angleDiff = desiredAngle - currentAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        currentAngle += angleDiff * 0.16;

        const speed = Math.min(5.2, Math.max(1.8, dist * 0.026 + 1.2));
        currentX += Math.cos(currentAngle) * speed;
        currentY += Math.sin(currentAngle) * speed;

        dom.style.transform = `translate3d(${currentX - 14}px, ${currentY - 14}px, 0) rotate(${currentAngle + Math.PI / 2}rad)`;
        animFrameId = requestAnimationFrame(step);
      } else {
        // Paused at destination: stop RAF to save 100% of CPU on idle
        dom.style.transform = `translate3d(${currentX - 14}px, ${currentY - 14}px, 0) rotate(${currentAngle + Math.PI / 2}rad)`;
        isRunning = false;
        animFrameId = null;
      }
    };

    const startLoop = () => {
      if (!isRunning && isTabVisible && !isMobile) {
        isRunning = true;
        animFrameId = requestAnimationFrame(step);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      startLoop();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Initial position render
    dom.style.transform = `translate3d(${currentX - 14}px, ${currentY - 14}px, 0) rotate(${currentAngle + Math.PI / 2}rad)`;

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      className="hidden md:block fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
      id="phosphor-spider-container"
      aria-hidden="true"
    >
      <style>{`
        @keyframes phosphorSingleSpiderCrawlL {
          0%, 100% { transform: rotate(-5deg); transform-origin: 45px 50px; }
          50% { transform: rotate(6deg); transform-origin: 45px 50px; }
        }
        @keyframes phosphorSingleSpiderCrawlR {
          0%, 100% { transform: rotate(6deg); transform-origin: 55px 50px; }
          50% { transform: rotate(-5deg); transform-origin: 55px 50px; }
        }
        .spider-legs-l {
          animation: phosphorSingleSpiderCrawlL 0.22s infinite ease-in-out;
        }
        .spider-legs-r {
          animation: phosphorSingleSpiderCrawlR 0.22s infinite ease-in-out;
        }
      `}</style>

      <div
        ref={spiderDomRef}
        className="absolute top-0 left-0 will-change-transform pointer-events-none"
        style={{
          width: 28,
          height: 28,
          contain: 'layout style paint'
        }}
      >
        <PhosphorSpiderGraphic size={28} />
      </div>
    </div>
  );
}
