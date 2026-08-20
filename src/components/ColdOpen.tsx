// ACT 2 · COLD OPEN — scrolling down advances one line of the Chef's monologue.
// One gesture (wheel tick or touch swipe) = one line; Enter still works.
import { useEffect, useRef, type CSSProperties } from 'react';
import { CKC } from '../data/content';
import type { Shift } from '../useShift';

const pretty = { textWrap: 'pretty' } as CSSProperties;

export function ColdOpen({ shift }: { shift: Shift }) {
  const { s } = shift;
  const lines = CKC.coldOpen.slice(0, s.revealed);
  const hint =
    s.revealed < CKC.coldOpen.length
      ? 'scroll to continue'
      : 'the bell rings — step up to the pass';

  const openNextRef = useRef(shift.openNext);
  openNextRef.current = shift.openNext;
  const revealedRef = useRef(s.revealed);
  revealedRef.current = s.revealed;
  const lastLineRef = useRef<HTMLParagraphElement | null>(null);
  const previousRevealed = useRef(s.revealed);

  useEffect(() => {
    if (s.revealed > previousRevealed.current) {
      lastLineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    previousRevealed.current = s.revealed;
  }, [s.revealed]);

  useEffect(() => {
    let acc = 0;
    let lockedUntil = 0;
    const fire = () => {
      if (revealedRef.current >= CKC.coldOpen.length) return;
      const now = performance.now();
      if (now < lockedUntil) {
        acc = 0;
        return;
      }
      lockedUntil = now + 700; // let each line settle before accepting another gesture
      acc = 0;
      openNextRef.current();
    };
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0) return;
      acc += e.deltaY;
      if (acc >= 40) fire();
    };
    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null) return;
      const dy = touchY - e.touches[0].clientY; // swipe up = scroll down
      if (dy > 46) {
        touchY = null;
        fire();
      }
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--ck-ink)',
        display: 'grid',
        gridTemplateRows: '1fr auto',
        animation: 'ck-fadein .7s ease both',
      }}
      onClick={() => openNextRef.current()}
    >
      <div style={{ display: 'grid', placeItems: 'center', padding: '7vh 24px 0', overflowY: 'auto' }}>
        <div style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <span style={{ width: 32, height: 1, background: 'var(--ck-yellow)' }} />
            <span
              style={{
                fontFamily: 'var(--ck-mono)',
                fontSize: 10,
                letterSpacing: '.32em',
                textTransform: 'uppercase',
                color: 'var(--ck-yellow)',
              }}
            >
              Before service · 17:42
            </span>
          </div>
          {lines.map((l, i) => (
            <p
              key={i}
              ref={i === lines.length - 1 ? lastLineRef : undefined}
              style={{
                fontSize: 'clamp(20px,2.5vw,31px)',
                lineHeight: 1.44,
                color: '#F2E7D5',
                margin: '0 0 24px',
                fontWeight: 200,
                animation: 'ck-fade .72s cubic-bezier(.16,1,.3,1) both',
                ...pretty,
              }}
            >
              {l}
            </p>
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 32px',
          borderTop: '1px solid rgba(242,231,213,.13)',
        }}
      >
        <span style={{ fontSize: 15, color: '#A2937F' }}>
          <em>The Chief Cyber Chef</em>
        </span>
        <span
          style={{
            fontFamily: 'var(--ck-mono)',
            fontSize: 10.5,
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: 'var(--ck-yellow)',
            animation: 'ck-flick 2.8s ease-in-out infinite',
          }}
        >
          {hint}
        </span>
      </div>
    </div>
  );
}
