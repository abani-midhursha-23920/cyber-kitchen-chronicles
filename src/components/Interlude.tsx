// INTERLUDE — full-bleed yellow, after dockets 3, 6 and 8.
import type { CSSProperties } from 'react';
import { CKC } from '../data/content';
import type { Shift } from '../useShift';

const balance = { textWrap: 'balance' } as CSSProperties;

export function Interlude({ shift }: { shift: Shift }) {
  const { s } = shift;
  const b = CKC.interludes[s.brk as number];
  if (!b) return null;
  const cta = s.brk === 8 ? 'The chef’s special' : 'Back to the pass';
  const taleLabel = s.taleFlip ? 'Truth' : 'Tale';
  const taleText = s.taleFlip ? b.truth : b.tale;
  const taleC = s.taleFlip ? '#3D6B50' : '#8B1F19';
  const taleHint = s.taleFlip ? 'tap to see the tale again' : 'tap to toss it';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--ck-yellow)',
        overflowY: 'auto',
        animation: 'ck-fadein .55s ease both',
      }}
    >
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '8vh 26px 60px' }}>
        <div
          style={{
            fontFamily: 'var(--ck-mono)',
            fontSize: 10,
            letterSpacing: '.34em',
            textTransform: 'uppercase',
            color: 'rgba(25,20,17,.6)',
          }}
        >
          Between courses
        </div>
        <h2
          style={{
            margin: '16px 0 0',
            fontFamily: 'var(--ck-slab)',
            fontWeight: 800,
            fontSize: 'clamp(32px,5.6vw,60px)',
            lineHeight: 1.02,
            ...balance,
          }}
        >
          {b.title}
        </h2>
        <div
          style={{
            margin: '40px 0 0',
            padding: '26px 28px',
            background: 'var(--ck-ink)',
            color: 'var(--ck-paper)',
            borderRadius: 20,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--ck-mono)',
              fontSize: 9.5,
              letterSpacing: '.28em',
              textTransform: 'uppercase',
              color: 'var(--ck-yellow)',
            }}
          >
            {b.law[0]}
          </div>
          <p style={{ margin: '13px 0 0', fontSize: 'clamp(19px,2.3vw,25px)', lineHeight: 1.44, fontWeight: 300 }}>
            {b.law[1]}
          </p>
        </div>
        <div style={{ margin: '26px 0 0' }}>
          <div
            style={{
              fontFamily: 'var(--ck-slab)',
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '.24em',
              textTransform: 'uppercase',
              color: 'var(--ck-red-d)',
            }}
          >
            Tales that need tossing
          </div>
          <button
            onClick={shift.flipTale}
            className="hv-up3"
            style={{
              display: 'block',
              width: '100%',
              marginTop: 14,
              padding: 28,
              borderRadius: 20,
              background: 'var(--ck-paper)',
              boxShadow: '0 12px 28px rgba(25,20,17,.14)',
              transition: 'transform .2s cubic-bezier(.2,0,.2,1)',
            }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--ck-mono)',
                fontSize: 9.5,
                letterSpacing: '.26em',
                textTransform: 'uppercase',
                color: taleC,
              }}
            >
              {taleLabel}
            </span>
            <span
              style={{
                display: 'block',
                marginTop: 12,
                fontSize: 'clamp(19px,2.4vw,26px)',
                lineHeight: 1.4,
                fontWeight: 300,
              }}
            >
              {taleText}
            </span>
            <span
              style={{
                display: 'block',
                marginTop: 16,
                fontFamily: 'var(--ck-mono)',
                fontSize: 9.5,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                color: 'var(--ck-steel)',
              }}
            >
              {taleHint}
            </span>
          </button>
        </div>
        <div
          style={{
            margin: '26px 0 0',
            padding: '26px 28px',
            borderRadius: 20,
            background: 'rgba(25,20,17,.07)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--ck-slab)',
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '.24em',
              textTransform: 'uppercase',
              color: 'var(--ck-red-d)',
            }}
          >
            Chef's challenge
          </div>
          <p
            style={{
              margin: '13px 0 0',
              fontSize: 'clamp(20px,2.4vw,27px)',
              lineHeight: 1.34,
              fontFamily: 'var(--ck-slab)',
              fontWeight: 700,
            }}
          >
            {b.challenge[0]}
          </p>
          <p style={{ margin: '11px 0 0', fontSize: 17.5, lineHeight: 1.52 }}>{b.challenge[1]}</p>
        </div>
        <p style={{ margin: '34px 0 0', fontSize: 19, lineHeight: 1.5, fontStyle: 'italic', maxWidth: 640 }}>
          {b.next}
        </p>
        <button
          onClick={shift.closeBreak}
          className="hv-up2"
          style={{
            marginTop: 26,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 26px',
            borderRadius: 999,
            background: 'var(--ck-ink)',
            color: 'var(--ck-paper)',
            fontFamily: 'var(--ck-slab)',
            fontWeight: 700,
            fontSize: 16,
            transition: 'transform .16s',
          }}
        >
          {cta}
          <span style={{ fontFamily: 'var(--ck-mono)', fontSize: 10.5, opacity: 0.55 }}>↵</span>
        </button>
      </div>
    </div>
  );
}
