// ACT 5 · RESILIENCE LAYER CAKE — nine framework layers + the topping puzzle
// (three imposters: hope, shortcuts, gut feeling).
import type { CSSProperties } from 'react';
import { CKC } from '../data/content';
import type { Shift } from '../useShift';

const pretty = { textWrap: 'pretty' } as CSSProperties;
const SHADES = ['#8B1F19', '#A82C22', '#C1352A', '#D4553F', '#E07B4C', '#EFB129', '#F3C75E', '#F7DC9A', '#FCF0D6'];

export function CakeAct({ shift }: { shift: Shift }) {
  const { s } = shift;
  const c = CKC.cake;

  const fakes = c.toppings.map((tp, i) => (tp.real ? -1 : i)).filter((i) => i >= 0);
  const gotFakes = fakes.filter((i) => s.circled.includes(i)).length;
  const wrong = s.circled.filter((i) => c.toppings[i].real).length;
  const cakeDone = gotFakes === 3 && wrong === 0;
  const toppingStatus =
    s.circled.length === 0
      ? 'Tap the ones that don’t belong. Three of them.'
      : cakeDone
        ? 'All three imposters circled. Hope, shortcuts and gut feeling are not controls.'
        : wrong > 0
          ? 'One of those earns its place on the cake — tap it again to put it back.'
          :           gotFakes + ' of 3 unsafe assumptions selected.';

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--ck-cream)', overflowY: 'auto' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '6vh 26px 64px' }}>
        <div style={{ maxWidth: 720 }}>
          <div
            style={{
              fontFamily: 'var(--ck-mono)',
              fontSize: 10,
              letterSpacing: '.36em',
              textTransform: 'uppercase',
              color: 'var(--ck-red)',
            }}
          >
            Dessert
          </div>
          <h2
            style={{
              margin: '14px 0 0',
              fontFamily: 'var(--ck-slab)',
              fontWeight: 800,
              fontSize: 'clamp(32px,5.4vw,58px)',
              lineHeight: 1.02,
            }}
          >
            The resilient layer cake
          </h2>
          <p style={{ margin: '16px 0 0', fontSize: 19.5, lineHeight: 1.5, color: 'var(--ck-ink2)', ...pretty }}>
            {c.intro}
          </p>
          <p style={{ margin: '14px 0 0', fontSize: 16.5, lineHeight: 1.5, color: 'var(--ck-ink2)' }}>
            Resilience is not one control. It is a stack of governance, prevention, detection, response and recovery.
          </p>
        </div>

        <div
          style={{
            position: 'absolute',
            right: '1vw',
            top: '6vh',
            height: 'min(52vh,470px)',
            opacity: 0.22,
            pointerEvents: 'none',
            animation: 'ck-riseT 1.6s cubic-bezier(.2,0,.2,1) both',
          }}
        >
          <img src="art/cake.png" alt="" style={{ height: '100%', width: 'auto' }} />
        </div>
        <div className="ck-cake-grid" style={{ position: 'relative', marginTop: 40 }}>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 5 }}>
              {c.layers.map(([name, , category], i) => (
                <button
                  key={name}
                  onClick={shift.pickLayer(i)}
                  className="hv-up2"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 14,
                    width: `${100 - i * 5}%`,
                    margin: '0 auto',
                    padding: '15px 20px',
                    borderRadius: 9,
                    background: SHADES[i],
                    color: i >= 6 ? '#191411' : '#FCF7EB',
                    boxShadow: s.layer === i ? '0 0 0 2.5px #191411' : '0 3px 0 rgba(25,20,17,.12)',
                    animation: 'ck-settle .6s cubic-bezier(.2,0,.2,1) both',
                    animationDelay: `${(i * 0.07).toFixed(2)}s`,
                    transition: 'transform .18s',
                  }}
                >
                  <span>
                    <span style={{ display: 'block', fontFamily: 'var(--ck-slab)', fontWeight: 700, fontSize: 16 }}>{name}</span>
                    <span style={{ display: 'block', marginTop: 3, fontFamily: 'var(--ck-mono)', fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', opacity: 0.68 }}>
                      {category}
                    </span>
                  </span>
                  <span style={{ fontFamily: 'var(--ck-mono)', fontSize: 9.5, letterSpacing: '.14em', opacity: 0.6 }}>
                    Layer {i + 1}
                  </span>
                </button>
              ))}
            </div>
            <p style={{ margin: '22px 4px 0', fontSize: 16, lineHeight: 1.55, fontStyle: 'italic', color: 'var(--ck-ink2)' }}>
              {c.fillings}
            </p>
          </div>
          <div>
            <div
              style={{
                padding: '26px 28px',
                borderRadius: 20,
                background: 'var(--ck-paper)',
                boxShadow: '0 16px 36px rgba(25,20,17,.12)',
                minHeight: 150,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--ck-mono)',
                  fontSize: 9.5,
                  letterSpacing: '.26em',
                  textTransform: 'uppercase',
                  color: 'var(--ck-red)',
                }}
              >
                Layer {s.layer + 1} of {c.layers.length} · {c.layers[s.layer][2]}
              </div>
              <div style={{ marginTop: 12, fontFamily: 'var(--ck-slab)', fontWeight: 800, fontSize: 26 }}>
                {c.layers[s.layer][0]}
              </div>
              <p style={{ margin: '12px 0 0', fontSize: 17.5, lineHeight: 1.54 }}>{c.layers[s.layer][1]}</p>
              <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px dashed rgba(25,20,17,.2)' }}>
                <div style={{ fontFamily: 'var(--ck-mono)', fontSize: 9.5, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--ck-red)' }}>
                  Do this next
                </div>
                <p style={{ margin: '7px 0 0', fontSize: 15.5, lineHeight: 1.45 }}>{c.layers[s.layer][3]}</p>
              </div>
            </div>

            <div style={{ marginTop: 22, padding: '26px 28px', borderRadius: 20, background: 'var(--ck-blush)' }}>
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
                Topping trouble
              </div>
              <img src="art/toppings.png" alt="" style={{ display: 'block', width: 'min(320px,78%)', margin: '12px 0 4px' }} />
              <p style={{ margin: '11px 0 0', fontSize: 16.5, lineHeight: 1.5 }}>{c.toppingIntro}</p>
              <div style={{ marginTop: 12, padding: '11px 13px', borderRadius: 10, background: 'rgba(255,255,255,.45)', fontFamily: 'var(--ck-mono)', fontSize: 10.5, lineHeight: 1.45, letterSpacing: '.04em' }}>
                Select the three toppings that describe unsafe assumptions, not controls.
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 18 }}>
                {c.toppings.map((tp, i) => {
                  const on = s.circled.includes(i);
                  return (
                    <button
                      key={tp.t}
                      onClick={shift.circle(i)}
                      title={tp.d}
                      className="hv-up2"
                      style={{
                        padding: '11px 15px',
                        borderRadius: 999,
                        background: on ? (tp.real ? '#F5DAD2' : '#191411') : '#FCF7EB',
                        color: on && !tp.real ? '#FCF7EB' : '#191411',
                        fontFamily: 'var(--ck-mono)',
                        fontSize: 11,
                        letterSpacing: '.04em',
                        boxShadow: on
                          ? tp.real
                            ? 'inset 0 0 0 2px #8B1F19'
                            : 'inset 0 0 0 2px #191411'
                          : 'inset 0 0 0 1px rgba(25,20,17,.16)',
                        transition: 'transform .16s,background .2s',
                      }}
                    >
                      {tp.t}
                    </button>
                  );
                })}
              </div>
              <p style={{ margin: '16px 0 0', fontSize: 15.5, lineHeight: 1.5, color: 'var(--ck-ink2)' }}>
                {toppingStatus}
              </p>
            </div>

            {cakeDone && (
              <div style={{ marginTop: 22, animation: 'ck-fade .6s ease both' }}>
                <div style={{ padding: '16px 18px', borderRadius: 14, background: 'var(--ck-paper)' }}>
                  <div style={{ fontFamily: 'var(--ck-mono)', fontSize: 9.5, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--ck-red)' }}>
                    Resilience, in plain English
                  </div>
                  <p style={{ margin: '8px 0 0', fontSize: 15.5, lineHeight: 1.45 }}>
                    Verify backups, trim access, patch regularly, monitor continuously and rehearse recovery.
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--ck-slab)',
                    fontWeight: 800,
                    fontSize: 'clamp(21px,2.6vw,28px)',
                    lineHeight: 1.2,
                  }}
                >
                  {c.outro}
                </p>
                <button
                  onClick={shift.toEnd}
                  className="hv-up2"
                  style={{
                    marginTop: 18,
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
                  Counters wiped →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
