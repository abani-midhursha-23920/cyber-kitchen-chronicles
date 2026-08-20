// The chef's coat (right drawer) and the dictionary of oddities (left drawer).
// As in the prototype, the click handler sits on the whole overlay.
import { CKC } from '../data/content';
import type { Shift } from '../useShift';

export function CoatDrawer({ shift }: { shift: Shift }) {
  const { s } = shift;
  const allBadges = CKC.tickets.map((x) => x.badge).concat(['Sous-chef supervised']);

  return (
    <div
      onClick={shift.toggleCoat}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 40,
        background: 'rgba(16,12,10,.62)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'ck-fadein .28s ease both',
      }}
    >
      <div
        style={{
          width: 'min(470px,94vw)',
          height: '100%',
          background: 'var(--ck-paper)',
          boxShadow: '-22px 0 60px rgba(0,0,0,.42)',
          padding: '30px 30px 44px',
          overflowY: 'auto',
          animation: 'ck-slide .32s cubic-bezier(.2,0,.2,1) both',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 14 }}>
          <div>
            <div
              style={{
                fontFamily: 'var(--ck-mono)',
                fontSize: 10,
                letterSpacing: '.28em',
                textTransform: 'uppercase',
                color: 'var(--ck-red)',
              }}
            >
              Your whites
            </div>
            <h3 style={{ margin: '9px 0 0', fontFamily: 'var(--ck-slab)', fontWeight: 800, fontSize: 30 }}>
              The chef's coat
            </h3>
          </div>
          <span style={{ fontFamily: 'var(--ck-mono)', fontSize: 11, color: 'var(--ck-steel)' }}>
            {s.badges.length}/9
          </span>
        </div>
        <p style={{ margin: '14px 0 0', fontSize: 16, lineHeight: 1.5, color: 'var(--ck-ink2)' }}>
          Patches aren't points. Each one is a pattern you recognised — and the Chef only sews on what you actually
          did.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 13, marginTop: 26 }}>
          {allBadges.map((n) => {
            const has = s.badges.includes(n);
            return (
              <div
                key={n}
                style={{
                  textAlign: 'center',
                  padding: '16px 8px 14px',
                  borderRadius: 16,
                  background: has ? '#F5DAD2' : '#F1E6D2',
                  opacity: has ? 1 : 0.55,
                }}
              >
                <span
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 50,
                    height: 50,
                    margin: '0 auto',
                    borderRadius: 999,
                    background: has ? '#C1352A' : '#DCD1BB',
                    boxShadow: 'inset 0 0 0 2px rgba(252,247,235,.72)',
                  }}
                >
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={has ? '#FCF7EB' : '#A2937F'}
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  >
                    <path d="M12 3l7 3v6c0 4.3-3 7.5-7 9-4-1.5-7-4.7-7-9V6z" />
                  </svg>
                </span>
                <span
                  style={{
                    display: 'block',
                    marginTop: 10,
                    fontFamily: 'var(--ck-slab)',
                    fontWeight: 700,
                    fontSize: 12.5,
                    lineHeight: 1.22,
                  }}
                >
                  {has ? n : 'Not yet earned'}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 30, paddingTop: 22, borderTop: '1px dashed rgba(25,20,17,.2)' }}>
          <div
            style={{
              fontFamily: 'var(--ck-slab)',
              fontWeight: 800,
              fontSize: 11.5,
              letterSpacing: '.24em',
              textTransform: 'uppercase',
              color: 'var(--ck-ink2)',
            }}
          >
            Chef's tips collected
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
            {s.tips.map((t, i) => (
              <div
                key={i}
                style={{ padding: '15px 17px', borderRadius: 14, background: 'var(--ck-yellow)', fontSize: 15, lineHeight: 1.45 }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GlossDrawer({ shift }: { shift: Shift }) {
  return (
    <div
      onClick={shift.openGloss}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 41,
        background: 'rgba(16,12,10,.62)',
        display: 'flex',
        animation: 'ck-fadein .28s ease both',
      }}
    >
      <div
        style={{
          width: 'min(470px,94vw)',
          height: '100%',
          background: 'var(--ck-cream)',
          boxShadow: '22px 0 60px rgba(0,0,0,.42)',
          padding: '30px 30px 44px',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--ck-mono)',
            fontSize: 10,
            letterSpacing: '.28em',
            textTransform: 'uppercase',
            color: 'var(--ck-red)',
          }}
        >
          Side dishes
        </div>
        <h3 style={{ margin: '9px 0 0', fontFamily: 'var(--ck-slab)', fontWeight: 800, fontSize: 28 }}>
          The chef's dictionary of oddities
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 24 }}>
          {CKC.glossary.map(([term, def]) => (
            <div key={term}>
              <div style={{ fontFamily: 'var(--ck-slab)', fontWeight: 700, fontSize: 17 }}>{term}</div>
              <p style={{ margin: '6px 0 0', fontSize: 16, lineHeight: 1.5, color: 'var(--ck-ink2)' }}>{def}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
