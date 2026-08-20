// ACT 6 · SERVICE REPORT — the closing letter, verbatim, then the shift's stats.
import type { CSSProperties } from 'react';
import { CKC } from '../data/content';
import type { Shift } from '../useShift';

const pretty = { textWrap: 'pretty' } as CSSProperties;

export function EndAct({ shift }: { shift: Shift }) {
  const { s, doneCount: dn } = shift;
  const c = CKC.closing;
  const decided = CKC.tickets.filter((x) => x.decision && s.results[x.id]);
  const rightCalls = decided.filter((x) => s.results[x.id].correct).length;
  const stats = [
    { key: 'served', v: String(dn), k: 'dockets served', d: 'of eight on the rail tonight' },
    { key: 'calls', v: `${rightCalls}/${decided.length}`, k: 'calls I’d have made', d: 'the entrées where you held the pass' },
    { key: 'ai', v: `${s.aiTasted.length}/6`, k: 'poisoned lines tasted', d: 'nudges you caught in the sous-chef' },
    { key: 'coat', v: `${s.badges.length}/9`, k: 'patches on the coat', d: 'patterns you can now recognise cold' },
  ];
  const verdict =
    rightCalls === decided.length && decided.length > 0
      ? 'You held the pass. Not because you were fast — because you checked. That is the whole recipe.'
      : 'Some plates went out before you were sure. That is honest work, and now you know the taste of it. Resilience forms in the quiet, long before anything breaks.';

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--ck-ink)', color: 'var(--ck-paper)', overflowY: 'auto' }}>
      <img
        src="art/kitchen.png"
        alt=""
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '-4vh',
          transform: 'translateX(-50%)',
          height: 'min(60vh,520px)',
          width: 'auto',
          opacity: 0.07,
          filter: 'invert(1)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="ck-chef-standing"
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          height: 'min(56vh,500px)',
          // opacity: 0.58,
          filter:'brightness(1.2) contrast(1.2)',
          pointerEvents: 'none',
          animation: 'ck-riseT 2s cubic-bezier(.2,0,.2,1) .4s both',
        }}
      >
        <img src="art/chef.svg" alt="The Chief Cyber Chef" style={{ height: '100%', width: 'auto' }} />
      </div>
      <div style={{ position: 'relative', maxWidth: 960, margin: '0 auto', padding: '8vh 26px 70px' }}>
        <div
          style={{
            fontFamily: 'var(--ck-mono)',
            fontSize: 10,
            letterSpacing: '.36em',
            textTransform: 'uppercase',
            color: 'var(--ck-yellow)',
          }}
        >
          End of service
        </div>
        <h2
          style={{
            margin: '16px 0 0',
            fontFamily: 'var(--ck-serif)',
            fontWeight: 200,
            fontSize: 'clamp(36px,6.4vw,72px)',
            lineHeight: 1.02,
          }}
        >
          {c.title}
        </h2>
        <div style={{ maxWidth: 720, marginTop: 34 }}>
          {c.body.map((l, i) => (
            <p
              key={i}
              style={{
                margin: '0 0 22px',
                fontSize: 'clamp(19px,2.3vw,27px)',
                lineHeight: 1.48,
                fontWeight: 200,
                color: '#F2E7D5',
                ...pretty,
              }}
            >
              {l}
            </p>
          ))}
          <p style={{ margin: '30px 0 0', fontSize: 18, fontStyle: 'italic', color: 'var(--ck-yellow)' }}>{c.sign}</p>
        </div>
        <div style={{ marginTop: 52, paddingTop: 30, borderTop: '1px solid rgba(242,231,213,.14)' }}>
          <div
            style={{
              fontFamily: 'var(--ck-slab)',
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '.26em',
              textTransform: 'uppercase',
              color: 'var(--ck-steel)',
            }}
          >
            Your service report
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))',
              gap: 16,
              marginTop: 20,
            }}
          >
            {stats.map((st) => (
              <div key={st.key} style={{ padding: 22, borderRadius: 18, background: 'rgba(242,231,213,.07)' }}>
                <div style={{ fontFamily: 'var(--ck-slab)', fontWeight: 800, fontSize: 34, lineHeight: 1, color: 'var(--ck-yellow)' }}>
                  {st.v}
                </div>
                <div
                  style={{
                    marginTop: 9,
                    fontFamily: 'var(--ck-mono)',
                    fontSize: 9.5,
                    letterSpacing: '.18em',
                    textTransform: 'uppercase',
                    color: 'var(--ck-steel)',
                  }}
                >
                  {st.k}
                </div>
                <div style={{ marginTop: 8, fontSize: 15.5, lineHeight: 1.45, color: '#E6D9C4' }}>{st.d}</div>
              </div>
            ))}
          </div>
          <p style={{ margin: '30px 0 0', maxWidth: 720, fontSize: 19, lineHeight: 1.55, fontStyle: 'italic', color: '#E6D9C4' }}>
            {verdict}
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <button
              onClick={shift.toggleCoat}
              className="hv-up2"
              style={{
                padding: '13px 24px',
                borderRadius: 999,
                background: 'var(--ck-paper)',
                color: 'var(--ck-ink)',
                fontFamily: 'var(--ck-slab)',
                fontWeight: 700,
                fontSize: 15.5,
                transition: 'transform .16s',
              }}
            >
              See the coat
            </button>
            <button
              onClick={shift.restart}
              className="hv-dimbg"
              style={{
                padding: '13px 24px',
                borderRadius: 999,
                background: 'rgba(242,231,213,.1)',
                color: 'var(--ck-paper)',
                fontFamily: 'var(--ck-slab)',
                fontWeight: 700,
                fontSize: 15.5,
                transition: 'background .16s',
              }}
            >
              Another shift
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
