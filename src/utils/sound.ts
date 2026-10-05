let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play a delicate crystal tick sound when hovering over buttons (Variant 2)
 */
export function playHoverSound() {
  // Hover sound disabled per user request
}

/**
 * Play a double-chime / soft bubble pop sound when clicking buttons (Variant 2)
 */
export function playClickSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // First note: Soft low warm pop (E5 - 659Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659, now);
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.03);

    gain1.gain.setValueAtTime(0.04, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    // Second note: Bright crystal top harmonic (B5 - 987Hz) slightly offset (+12ms)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(987, now + 0.012);
    osc2.frequency.exponentialRampToValueAtTime(1318, now + 0.045);

    gain2.gain.setValueAtTime(0.03, now + 0.012);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.012);

    osc1.stop(now + 0.05);
    osc2.stop(now + 0.065);
  } catch (e) {
    // Audio context not ready
  }
}

// Global button sound listener setup
let isInitialized = false;

export function initGlobalButtonSounds() {
  if (typeof window === 'undefined' || isInitialized) return;
  isInitialized = true;

  const getClickable = (target: EventTarget | null): HTMLElement | null => {
    if (!target || !(target instanceof HTMLElement)) return null;
    const btn = target.closest<HTMLElement>(
      'button, a, [role="button"], .cursor-pointer, input[type="button"], input[type="submit"]'
    );
    if (!btn) return null;
    // Don't play sounds if disabled or explicitly opt-out
    if (btn.hasAttribute('disabled') || btn.getAttribute('aria-disabled') === 'true') {
      return null;
    }
    return btn;
  };

  // Click detection
  document.addEventListener(
    'click',
    (e) => {
      const btn = getClickable(e.target);
      if (btn) {
        playClickSound();
      }
    },
    { capture: true, passive: true }
  );
}
