import React, { useEffect, useRef } from 'react';

/**
 * ROOS Capital - Halloween Decorations & Interactive Dynamic Spiders
 * 
 * Requirements:
 * 1. Cantidad exacta por dispositivo:
 *    - PC (pantallas de escritorio md+): exactamente 8 arañas
 *      (2 arañas colgantes en las esquinas superiores con hilos de seda + 
 *       6 arañas autónomas recorriendo la pantalla y tejiendo octágonos completos cada 8s = 8 arañas en total).
 *    - Móvil (pantallas < md): exactamente 4 arañas móviles (sin telarañas en las esquinas, solo arañas móviles tejiendo octágonos cada 8s).
 * 2. Telarañas en las esquinas: ÚNICAMENTE visibles en versión PC/escritorio (removidas en móvil para no tapar contenido).
 * 3. Las arañas forman octágonos de telaraña completos (8 radios estructurales, 4 anillos octogonales cerrados con sutil curvatura catenaria)
 *    al pasar y detenerse, que brillan tenuemente y desaparecen de forma suave tras unos segundos.
 * 4. Sin rastro lineal continuo de seda detrás de las arañas.
 * 5. Reacción inmediata al cursor o toque (huida asustada con aceleración suave).
 * 6. 100% pointer-events-none: jamás interfiere con clics, tarjetas, botones ni navegación.
 */

// SVG spider icon with articulated legs, glowing eyes, and subtle drop shadow
function SpiderGraphic({ 
  size = 28, 
  color = '#17141f', 
  accentColor = '#E85B81',
  legAnimClass = '' 
}: { 
  size?: number; 
  color?: string; 
  accentColor?: string;
  legAnimClass?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible select-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] ${legAnimClass}`}
      aria-hidden="true"
    >
      {/* Spider Ground Shadow */}
      <ellipse cx="50" cy="54" rx="20" ry="12" fill="rgba(0,0,0,0.22)" filter="blur(2px)" />

      {/* Spider Legs - Left */}
      <g className="spider-legs-left" stroke={color} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 46 44 Q 28 22 14 12 Q 8 20 12 32" className="leg-l1" />
        <path d="M 44 48 Q 22 36 10 38 Q 4 48 8 56" className="leg-l2" />
        <path d="M 44 54 Q 20 54 10 68 Q 8 78 16 82" className="leg-l3" />
        <path d="M 46 58 Q 26 74 18 88 Q 20 96 28 98" className="leg-l4" />
      </g>

      {/* Spider Legs - Right */}
      <g className="spider-legs-right" stroke={color} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 54 44 Q 72 22 86 12 Q 92 20 88 32" className="leg-r1" />
        <path d="M 56 48 Q 78 36 90 38 Q 96 48 92 56" className="leg-r2" />
        <path d="M 56 54 Q 80 54 90 68 Q 92 78 84 82" className="leg-r3" />
        <path d="M 54 58 Q 74 74 82 88 Q 80 96 72 98" className="leg-r4" />
      </g>

      {/* Pedipalps / Fangs */}
      <path d="M 46 36 L 44 26 L 41 29" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M 54 36 L 56 26 L 59 29" stroke={color} strokeWidth="2.4" strokeLinecap="round" />

      {/* Cephalothorax (Head/Chest) */}
      <circle cx="50" cy="45" r="9" fill={color} />
      <circle cx="50" cy="45" r="7.5" fill="#252033" />

      {/* Abdomen */}
      <ellipse cx="50" cy="65" rx="13" ry="17" fill={color} />
      <ellipse cx="50" cy="65" rx="11" ry="15" fill="#262135" />

      {/* ROOS Signature Accent Hourglass / Diamond */}
      <path
        d="M 50 56 L 55 64 L 50 67 L 45 64 Z M 50 74 L 55 67 L 50 64 L 45 67 Z"
        fill={accentColor}
      />

      {/* Glowing Spider Eyes */}
      <circle cx="47" cy="40" r="1.6" fill="#ffffff" />
      <circle cx="53" cy="40" r="1.6" fill="#ffffff" />
      <circle cx="47" cy="40" r="1" fill="#ff2e63" />
      <circle cx="53" cy="40" r="1" fill="#ff2e63" />
    </svg>
  );
}

// Model for complete octagonal webs woven dynamically by walking spiders
interface OctagonWebItem {
  id: number;
  cx: number;
  cy: number;
  maxRadius: number;
  rings: number;
  rotation: number;
  createdAt: number;
  weaveDuration: number;
  lifespan: number;
  accent: boolean;
}

interface WalkingSpiderState {
  x: number;
  y: number;
  angle: number;
  targetAngle: number;
  speed: number;
  baseSpeed: number;
  fleeSpeed: number;
  isFleeing: boolean;
  pauseTicks: number;
  distanceSinceLastOctagon: number;
  lastWebSpinTime: number;
}

// Declarative definitions for autonomous walking spiders:
// 2 active on mobile + desktop; 4 active on desktop only (md+).
// Together with the 2 hanging corner spiders:
// Mobile total = 2 hanging + 2 walkers = 4 spiders.
// PC total = 2 hanging + 6 walkers = 8 spiders.
const WALKER_DEFS = [
  {
    initialXRatio: 0.15,
    initialYRatio: 0.24,
    initialAngle: 0.4,
    size: 28,
    baseSpeed: 1.15,
    fleeSpeed: 4.8,
    color: '#181422',
    accentColor: '#E85B81',
    isDesktopOnly: false
  },
  {
    initialXRatio: 0.82,
    initialYRatio: 0.35,
    initialAngle: 2.1,
    size: 26,
    baseSpeed: 1.05,
    fleeSpeed: 4.6,
    color: '#1e1828',
    accentColor: '#FF7DA1',
    isDesktopOnly: false
  },
  {
    initialXRatio: 0.25,
    initialYRatio: 0.78,
    initialAngle: -0.8,
    size: 25,
    baseSpeed: 1.20,
    fleeSpeed: 5.0,
    color: '#181422',
    accentColor: '#f43f5e',
    isDesktopOnly: false
  },
  {
    initialXRatio: 0.75,
    initialYRatio: 0.72,
    initialAngle: 3.5,
    size: 27,
    baseSpeed: 1.00,
    fleeSpeed: 4.5,
    color: '#1a1624',
    accentColor: '#E85B81',
    isDesktopOnly: false
  },
  {
    initialXRatio: 0.48,
    initialYRatio: 0.50,
    initialAngle: 1.2,
    size: 24,
    baseSpeed: 1.25,
    fleeSpeed: 5.2,
    color: '#14111d',
    accentColor: '#fb7185',
    isDesktopOnly: true
  },
  {
    initialXRatio: 0.62,
    initialYRatio: 0.20,
    initialAngle: -2.3,
    size: 26,
    baseSpeed: 1.10,
    fleeSpeed: 4.7,
    color: '#181422',
    accentColor: '#FF7DA1',
    isDesktopOnly: true
  }
];

export default function HalloweenDecorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References for hanging spiders & threads
  const hangingSpider1Ref = useRef<HTMLDivElement>(null);
  const hangingSpider2Ref = useRef<HTMLDivElement>(null);
  const thread1Ref = useRef<SVGLineElement>(null);
  const thread2Ref = useRef<SVGLineElement>(null);

  // References for walking spider DOM elements
  const walkingSpidersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track viewport bounds
    let width = window.innerWidth;
    let height = window.innerHeight;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas retina sizing
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse / Touch tracking
    let mouseX = -9999;
    let mouseY = -9999;
    let lastUserInteraction = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastUserInteraction = Date.now();
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        lastUserInteraction = Date.now();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        lastUserInteraction = Date.now();
      }
    };

    const onTouchEnd = () => {
      setTimeout(() => {
        if (Date.now() - lastUserInteraction >= 1500) {
          mouseX = -9999;
          mouseY = -9999;
        }
      }, 1600);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    // Hanging spiders state (top corners)
    const isMobileInit = width < 768;
    const hSpider1 = {
      anchorX: Math.min(110, width * 0.1),
      anchorY: 0,
      targetLength: isMobileInit ? 95 : 160,
      currentLength: isMobileInit ? 90 : 150,
      minLength: 25,
      maxLength: isMobileInit ? 150 : 230,
      swingAngle: 0,
      swingSpeed: 0.02,
      swingAmplitude: 0.08,
      speed: 0
    };

    const hSpider2 = {
      anchorX: Math.max(width - 110, width * 0.9),
      anchorY: 0,
      targetLength: isMobileInit ? 115 : 190,
      currentLength: isMobileInit ? 110 : 180,
      minLength: 30,
      maxLength: isMobileInit ? 160 : 250,
      swingAngle: 0.5,
      swingSpeed: 0.018,
      swingAmplitude: 0.07,
      speed: 0
    };

    // Autonomous Walking Spiders state array initialized from WALKER_DEFS
    const walkers: WalkingSpiderState[] = WALKER_DEFS.map((def, idx) => ({
      x: width * def.initialXRatio,
      y: Math.max(120, height * def.initialYRatio),
      angle: def.initialAngle,
      targetAngle: def.initialAngle,
      speed: def.baseSpeed,
      baseSpeed: def.baseSpeed,
      fleeSpeed: def.fleeSpeed,
      isFleeing: false,
      pauseTicks: 0,
      distanceSinceLastOctagon: 0,
      // Stagger initial timer across 8 seconds so spiders leave webs in a natural cadence every 8s
      lastWebSpinTime: Date.now() - (idx * 1300)
    }));

    // Dynamic complete octagonal webs collection (pre-seeded with 2 complete webs so user sees them immediately)
    let octagonWebs: OctagonWebItem[] = [
      {
        id: 1,
        cx: Math.max(120, width * 0.22),
        cy: Math.max(180, height * 0.32),
        maxRadius: 38,
        rings: 4,
        rotation: 0.26,
        createdAt: Date.now() - 400,
        weaveDuration: 800,
        lifespan: 7500,
        accent: true
      },
      {
        id: 2,
        cx: Math.min(width - 120, width * 0.76),
        cy: Math.max(220, height * 0.58),
        maxRadius: 40,
        rings: 4,
        rotation: 0.52,
        createdAt: Date.now() - 600,
        weaveDuration: 800,
        lifespan: 7500,
        accent: false
      }
    ];
    let webIdCounter = 3;

    let animFrameId: number;

    // Helper to spawn a complete octagon web at the spider's position
    const spawnOctagonWeb = (x: number, y: number, isAccent: boolean) => {
      // Don't spawn outside screen bounds or too close to existing ones
      for (const w of octagonWebs) {
        if (Math.hypot(w.cx - x, w.cy - y) < 50) {
          return;
        }
      }

      octagonWebs.push({
        id: webIdCounter++,
        cx: x,
        cy: y,
        maxRadius: Math.floor(Math.random() * 8) + 36, // 36px to 44px: visible, regular complete octagon
        rings: 4, // 4 concentric complete octagonal rings
        rotation: Math.random() * (Math.PI / 4), // subtle natural rotation
        createdAt: Date.now(),
        weaveDuration: 800,
        lifespan: 7500, // Disappears smoothly after ~7.5 seconds
        accent: isAccent
      });
    };

    // Physics & render animation loop
    const updateLoop = () => {
      const now = Date.now();
      const currentW = window.innerWidth;
      const currentH = window.innerHeight;
      const isMobileNow = currentW < 768;

      // ----------------------------------------------------
      // 1. Clear Canvas & Update Complete Octagonal Cobwebs
      // ----------------------------------------------------
      ctx.clearRect(0, 0, currentW, currentH);

      // Filter out webs that exceeded lifespan
      octagonWebs = octagonWebs.filter((item) => now - item.createdAt < item.lifespan);

      // Draw all complete octagonal cobwebs
      for (let i = 0; i < octagonWebs.length; i++) {
        const item = octagonWebs[i];
        const age = now - item.createdAt;
        const totalProgress = age / item.lifespan; // 0 to 1

        // Smooth fade in (0.6s) and smooth fade out in the final 35% of its lifespan
        let fadeAlpha = 1;
        if (age < 600) {
          fadeAlpha = age / 600;
        } else if (totalProgress > 0.65) {
          fadeAlpha = Math.max(0, 1 - (totalProgress - 0.65) / 0.35);
        }

        const currentRadius = item.maxRadius;
        const spokes = 8; // Exactly 8 spokes to form regular complete octagons
        const rings = item.rings;
        const cx = item.cx;
        const cy = item.cy;
        const baseRot = item.rotation;
        const spokeStep = (Math.PI * 2) / spokes;

        ctx.save();

        // 1. Subtle, ethereal ambient glow highlighting the full web
        const glowRadius = currentRadius * 1.25;
        const glow = ctx.createRadialGradient(cx, cy, 2, cx, cy, glowRadius);
        glow.addColorStop(0, item.accent 
          ? `rgba(232, 91, 129, ${fadeAlpha * 0.16})` 
          : `rgba(255, 255, 255, ${fadeAlpha * 0.12})`);
        glow.addColorStop(0.65, item.accent 
          ? `rgba(232, 91, 129, ${fadeAlpha * 0.04})` 
          : `rgba(210, 225, 255, ${fadeAlpha * 0.04})`);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. The 8 Radial Spokes forming the full octagonal frame
        ctx.strokeStyle = item.accent
          ? `rgba(232, 91, 129, ${fadeAlpha * 0.72})`
          : `rgba(225, 232, 255, ${fadeAlpha * 0.68})`;
        ctx.lineWidth = 1.0;
        ctx.lineCap = 'round';

        ctx.beginPath();
        for (let s = 0; s < spokes; s++) {
          const angle = baseRot + s * spokeStep;
          const sx = cx + Math.cos(angle) * currentRadius;
          const sy = cy + Math.sin(angle) * currentRadius;
          ctx.moveTo(cx, cy);
          ctx.lineTo(sx, sy);
        }
        ctx.stroke();

        // 3. Concentric Closed Octagons (all 8 connected sides with natural catenary sag)
        ctx.lineWidth = 0.95;
        for (let r = 1; r <= rings; r++) {
          const ringRadius = (currentRadius * r) / rings;
          ctx.strokeStyle = item.accent
            ? `rgba(240, 110, 145, ${fadeAlpha * 0.78})`
            : `rgba(220, 230, 255, ${fadeAlpha * 0.72})`;

          ctx.beginPath();
          // Closed octagon: iterate all 8 segments from s = 0 to s = spokes
          for (let s = 0; s <= spokes; s++) {
            const angle = baseRot + s * spokeStep;
            const px = cx + Math.cos(angle) * ringRadius;
            const py = cy + Math.sin(angle) * ringRadius;

            if (s === 0) {
              ctx.moveTo(px, py);
            } else {
              // Catenary sag point for authentic organic silk tension between spokes
              const prevAngle = baseRot + (s - 1) * spokeStep;
              const midAngle = (prevAngle + angle) / 2;
              const sagDist = ringRadius * 0.94; // 6% gentle inward curve
              const cpx = cx + Math.cos(midAngle) * sagDist;
              const cpy = cy + Math.sin(midAngle) * sagDist;

              ctx.quadraticCurveTo(cpx, cpy, px, py);
            }
          }
          ctx.closePath();
          ctx.stroke();

          // Tiny silk dewdrops/knots at each spoke vertex
          ctx.fillStyle = item.accent
            ? `rgba(255, 140, 170, ${fadeAlpha * 0.85})`
            : `rgba(240, 245, 255, ${fadeAlpha * 0.8})`;
          for (let s = 0; s < spokes; s++) {
            const angle = baseRot + s * spokeStep;
            const vx = cx + Math.cos(angle) * ringRadius;
            const vy = cy + Math.sin(angle) * ringRadius;
            ctx.beginPath();
            ctx.arc(vx, vy, 0.9, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // 4. Central Dewdrop / Silk Knot
        ctx.fillStyle = item.accent 
          ? `rgba(255, 125, 161, ${fadeAlpha * 0.95})` 
          : `rgba(255, 255, 255, ${fadeAlpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(cx, cy, 2.0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // ----------------------------------------------------
      // 2. Hanging Spider 1 (Top Left)
      // ----------------------------------------------------
      const defaultLen1 = isMobileNow ? 95 : 160;
      const defaultLen2 = isMobileNow ? 115 : 190;

      if (hangingSpider1Ref.current && thread1Ref.current) {
        hSpider1.anchorX = Math.min(isMobileNow ? 50 : 110, currentW * 0.1);
        const distToMouse = Math.hypot(mouseX - hSpider1.anchorX, mouseY - hSpider1.currentLength);
        if (distToMouse < 130) {
          hSpider1.targetLength = hSpider1.minLength;
        } else {
          hSpider1.targetLength = defaultLen1 + Math.sin(now * 0.001) * (isMobileNow ? 10 : 20);
        }

        hSpider1.currentLength += (hSpider1.targetLength - hSpider1.currentLength) * 0.07;
        hSpider1.swingAngle = Math.sin(now * 0.0018) * hSpider1.swingAmplitude;

        const renderX1 = hSpider1.anchorX + Math.sin(hSpider1.swingAngle) * hSpider1.currentLength;
        const renderY1 = hSpider1.anchorY + Math.cos(hSpider1.swingAngle) * hSpider1.currentLength;
        const deg1 = (hSpider1.swingAngle * 180) / Math.PI;

        hangingSpider1Ref.current.style.transform = `translate3d(${renderX1 - 14}px, ${renderY1 - 14}px, 0) rotate(${deg1}deg)`;
        thread1Ref.current.setAttribute('x1', String(hSpider1.anchorX));
        thread1Ref.current.setAttribute('y1', '0');
        thread1Ref.current.setAttribute('x2', String(renderX1));
        thread1Ref.current.setAttribute('y2', String(renderY1));
      }

      // ----------------------------------------------------
      // 3. Hanging Spider 2 (Top Right)
      // ----------------------------------------------------
      if (hangingSpider2Ref.current && thread2Ref.current) {
        hSpider2.anchorX = Math.max(currentW - (isMobileNow ? 50 : 110), currentW * (isMobileNow ? 0.88 : 0.9));
        const distToMouse = Math.hypot(mouseX - hSpider2.anchorX, mouseY - hSpider2.currentLength);
        if (distToMouse < 130) {
          hSpider2.targetLength = hSpider2.minLength;
        } else {
          hSpider2.targetLength = defaultLen2 + Math.cos(now * 0.0012) * (isMobileNow ? 12 : 24);
        }

        hSpider2.currentLength += (hSpider2.targetLength - hSpider2.currentLength) * 0.07;
        hSpider2.swingAngle = Math.cos(now * 0.0016) * hSpider2.swingAmplitude;

        const renderX2 = hSpider2.anchorX + Math.sin(hSpider2.swingAngle) * hSpider2.currentLength;
        const renderY2 = hSpider2.anchorY + Math.cos(hSpider2.swingAngle) * hSpider2.currentLength;
        const deg2 = (hSpider2.swingAngle * 180) / Math.PI;

        hangingSpider2Ref.current.style.transform = `translate3d(${renderX2 - 14}px, ${renderY2 - 14}px, 0) rotate(${deg2}deg)`;
        thread2Ref.current.setAttribute('x1', String(hSpider2.anchorX));
        thread2Ref.current.setAttribute('y1', '0');
        thread2Ref.current.setAttribute('x2', String(renderX2));
        thread2Ref.current.setAttribute('y2', String(renderY2));
      }

      // ----------------------------------------------------
      // 4. Update Autonomous Walking Spiders
      // Mobile: exactly 4 moving spiders (only mobile/moving spiders)
      // PC: exactly 6 walkers (+ 2 hanging = 8 total spiders)
      // ----------------------------------------------------
      const activeWalkersCount = isMobileNow ? 4 : 6;

      for (let index = 0; index < activeWalkersCount; index++) {
        const spider = walkers[index];
        const spiderEl = walkingSpidersRef.current[index];
        if (!spider || !spiderEl) continue;

        const distToMouse = Math.hypot(mouseX - spider.x, mouseY - spider.y);

        if (distToMouse < 135) {
          // Panic flee away from cursor
          spider.isFleeing = true;
          spider.pauseTicks = 0;
          const fleeAngle = Math.atan2(spider.y - mouseY, spider.x - mouseX);
          spider.targetAngle = fleeAngle;
          spider.speed += (spider.fleeSpeed - spider.speed) * 0.25;
        } else {
          if (spider.isFleeing) {
            spider.isFleeing = false;
          }

          if (spider.pauseTicks > 0) {
            spider.pauseTicks--;
            spider.speed *= 0.88; // Decelerate smoothly to a stop

            // While pausing, if enough time elapsed, weave an octagon right at this spot
            if (now - spider.lastWebSpinTime > 5000) {
              spider.lastWebSpinTime = now;
              spider.distanceSinceLastOctagon = 0;
              spawnOctagonWeb(spider.x, spider.y, Math.random() < 0.35);
            }
          } else {
            // Calm exploration
            spider.speed += (spider.baseSpeed - spider.speed) * 0.1;

            // Random subtle wander turns
            if (Math.random() < 0.02) {
              spider.targetAngle += (Math.random() - 0.5) * 1.5;
            }

            // Spontaneous pause (stopping to orient or spin an octagon)
            if (Math.random() < 0.005) {
              spider.pauseTicks = Math.floor(Math.random() * 60) + 35;
            }
          }
        }

        // Angular interpolation (smooth turning)
        let diff = spider.targetAngle - spider.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        const turnSpeed = spider.isFleeing ? 0.24 : 0.08;
        spider.angle += diff * turnSpeed;

        // Move position
        const stepX = Math.cos(spider.angle) * spider.speed;
        const stepY = Math.sin(spider.angle) * spider.speed;
        spider.x += stepX;
        spider.y += stepY;

        // Accumulate distance walked
        const stepDist = Math.hypot(stepX, stepY);
        spider.distanceSinceLastOctagon += stepDist;

        // Spiders form complete octagons of web every 8 seconds as they pass
        if (now - spider.lastWebSpinTime >= 8000 && !spider.isFleeing) {
          spider.distanceSinceLastOctagon = 0;
          spider.lastWebSpinTime = now;
          spawnOctagonWeb(spider.x, spider.y, Math.random() < 0.35);
        }

        // Screen boundary padding: steer away from viewport edges gently
        const pad = 24;
        if (spider.x < pad) {
          spider.x = pad;
          spider.targetAngle = (Math.random() * 1.2 - 0.6);
        } else if (spider.x > currentW - pad) {
          spider.x = currentW - pad;
          spider.targetAngle = Math.PI + (Math.random() * 1.2 - 0.6);
        }

        if (spider.y < pad) {
          spider.y = pad;
          spider.targetAngle = Math.PI / 2 + (Math.random() * 1.2 - 0.6);
        } else if (spider.y > currentH - pad) {
          spider.y = currentH - pad;
          spider.targetAngle = -Math.PI / 2 + (Math.random() * 1.2 - 0.6);
        }

        // Update DOM transform & legs animation state
        const deg = (spider.angle * 180) / Math.PI + 90; // Face forward along velocity
        spiderEl.style.transform = `translate3d(${spider.x - 14}px, ${spider.y - 14}px, 0) rotate(${deg}deg)`;
        spiderEl.setAttribute('data-moving', spider.speed > 0.2 ? 'true' : 'false');
      }

      animFrameId = requestAnimationFrame(updateLoop);
    };

    animFrameId = requestAnimationFrame(updateLoop);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[95] overflow-hidden select-none"
      aria-hidden="true"
    >
      <style>{`
        /* Realistic Spider Leg Articulation Animation during crawl */
        @keyframes spiderLegLeftSwing {
          0%, 100% { transform: rotate(-7deg); }
          50% { transform: rotate(11deg); }
        }
        @keyframes spiderLegRightSwing {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(-8deg); }
        }
        [data-moving="true"] .leg-l1,
        [data-moving="true"] .leg-l3 {
          transform-origin: 45px 50px;
          animation: spiderLegLeftSwing 0.24s infinite ease-in-out;
        }
        [data-moving="true"] .leg-l2,
        [data-moving="true"] .leg-l4 {
          transform-origin: 45px 50px;
          animation: spiderLegRightSwing 0.24s infinite ease-in-out;
        }
        [data-moving="true"] .leg-r1,
        [data-moving="true"] .leg-r3 {
          transform-origin: 55px 50px;
          animation: spiderLegRightSwing 0.24s infinite ease-in-out;
        }
        [data-moving="true"] .leg-r2,
        [data-moving="true"] .leg-r4 {
          transform-origin: 55px 50px;
          animation: spiderLegLeftSwing 0.24s infinite ease-in-out;
        }
      `}</style>

      {/* Background Canvas: Full Octagonal Web rendering */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* SVG Canvas for Hanging Silk Threads (Desktop only) */}
      <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none">
        <line
          ref={thread1Ref}
          stroke="rgba(240, 243, 255, 0.55)"
          strokeWidth="1.1"
          strokeDasharray="2 1"
          className="dark:stroke-rose-200/50"
        />
        <line
          ref={thread2Ref}
          stroke="rgba(240, 243, 255, 0.55)"
          strokeWidth="1.1"
          strokeDasharray="2 1"
          className="dark:stroke-rose-200/50"
        />
      </svg>

      {/* ============================================================ */}
      {/* 1. TOP CORNER SPIDERWEBS (Solo en versión PC / Desktop)     */}
      {/* ============================================================ */}

      {/* Top-Left Corner Web */}
      <div className="hidden md:block absolute top-0 left-0 w-28 h-28 sm:w-36 sm:h-36 opacity-35 dark:opacity-45 pointer-events-none">
        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" className="text-slate-600 dark:text-rose-200/50" strokeWidth="0.85" strokeLinecap="round">
            <line x1="0" y1="0" x2="160" y2="12" />
            <line x1="0" y1="0" x2="148" y2="44" />
            <line x1="0" y1="0" x2="128" y2="84" />
            <line x1="0" y1="0" x2="96" y2="122" />
            <line x1="0" y1="0" x2="52" y2="148" />
            <line x1="0" y1="0" x2="12" y2="160" />

            {/* Delicate Spiral Arches */}
            <path d="M 38 3 Q 35 12 30 22 Q 22 30 12 36 Q 3 38 0 38" fill="none" />
            <path d="M 75 6 Q 69 24 58 42 Q 44 58 24 70 Q 6 75 0 75" fill="none" />
            <path d="M 115 9 Q 104 35 88 64 Q 68 88 38 108 Q 9 116 0 116" fill="none" />
            <path d="M 152 11 Q 138 43 118 80 Q 90 114 48 140 Q 11 152 0 152" fill="none" />
          </g>
        </svg>
      </div>

      {/* Top-Right Corner Web */}
      <div className="hidden md:block absolute top-0 right-0 w-28 h-28 sm:w-36 sm:h-36 opacity-35 dark:opacity-45 pointer-events-none">
        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" className="text-slate-600 dark:text-rose-200/50" strokeWidth="0.85" strokeLinecap="round">
            <line x1="160" y1="0" x2="0" y2="12" />
            <line x1="160" y1="0" x2="12" y2="44" />
            <line x1="160" y1="0" x2="32" y2="84" />
            <line x1="160" y1="0" x2="64" y2="122" />
            <line x1="160" y1="0" x2="108" y2="148" />
            <line x1="160" y1="0" x2="148" y2="160" />

            <path d="M 122 3 Q 125 12 130 22 Q 138 30 148 36 Q 157 38 160 38" fill="none" />
            <path d="M 85 6 Q 91 24 102 42 Q 116 58 136 70 Q 154 75 160 75" fill="none" />
            <path d="M 45 9 Q 56 35 72 64 Q 92 88 122 108 Q 151 116 160 116" fill="none" />
            <path d="M 8 11 Q 22 43 42 80 Q 70 114 112 140 Q 149 152 160 152" fill="none" />
          </g>
        </svg>
      </div>

      {/* ============================================================ */}
      {/* 2. HANGING SPIDERS (Arañas 1 y 2 en esquinas superiores - Solo PC) */}
      {/* ============================================================ */}

      {/* Hanging Spider 1 (Top Left - Desktop Only) */}
      <div
        ref={hangingSpider1Ref}
        className="hidden md:block absolute top-0 left-0 pointer-events-none will-change-transform z-20"
        style={{ transform: 'translate3d(50px, 120px, 0)' }}
      >
        <SpiderGraphic size={28} color="#16131e" accentColor="#E85B81" />
      </div>

      {/* Hanging Spider 2 (Top Right - Desktop Only) */}
      <div
        ref={hangingSpider2Ref}
        className="hidden md:block absolute top-0 left-0 pointer-events-none will-change-transform z-20"
        style={{ transform: 'translate3d(calc(90vw - 14px), 140px, 0)' }}
      >
        <SpiderGraphic size={28} color="#16131e" accentColor="#FF7DA1" />
      </div>

      {/* ============================================================ */}
      {/* 3. WALKING SPIDERS (Arañas móviles que forman octágonos al pasar) */}
      {/* En PC: 6 caminantes (+ 2 colgantes = 8 arañas en total)     */}
      {/* En Móvil: 4 arañas móviles (únicamente arañas móviles)      */}
      {/* ============================================================ */}
      {WALKER_DEFS.map((def, idx) => (
        <div
          key={idx}
          ref={(el) => { if (el) walkingSpidersRef.current[idx] = el; }}
          className={`${def.isDesktopOnly ? 'hidden md:block' : ''} absolute top-0 left-0 pointer-events-none will-change-transform z-20`}
          style={{ transform: `translate3d(${def.initialXRatio * 100}vw, ${def.initialYRatio * 100}vh, 0)` }}
        >
          <SpiderGraphic size={def.size} color={def.color} accentColor={def.accentColor} />
        </div>
      ))}
    </div>
  );
}
