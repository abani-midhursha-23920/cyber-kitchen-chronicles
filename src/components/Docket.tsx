// ACT 3 · the docket at the pass. Phase machine:
// non-witness: open → esc → act → result → save → tip → reflect → badge
// witness (Mains): open → scenes → save → tip → reflect → badge
import type { CSSProperties } from 'react';
import type { Ticket } from '../data/types';
import { phasesOf, type Shift } from '../useShift';

const pretty = { textWrap: 'pretty' } as CSSProperties;
const balance = { textWrap: 'balance' } as CSSProperties;

const PHASE_LABEL: Record<string, string> = {
  open: 'reading the docket',
  esc: 'the escalation',
  act: 'your call',
  result: 'consequence',
  scenes: 'witnessed only',
  save: "chef's save",
  tip: "chef's tip",
  reflect: 'reflection',
  badge: 'plated',
};

export function Docket({ shift, t }: { shift: Shift; t: Ticket }) {
  const { s } = shift;
  const list = phasesOf(t);
  const pi = list.indexOf(s.phase);
  const correct = t.decision ? s.choice === t.decision.answer : s.choice === 'ok';

  const showEsc = !t.witness && pi >= list.indexOf('esc');
  const showScenes = !!t.witness && pi >= list.indexOf('scenes');
  const showTray = s.phase === 'act' && !t.decision;
  const showDecision = s.phase === 'act' && !!t.decision;
  const showResult = !t.witness && pi >= list.indexOf('result');
  const showReveal = !!t.decision && showResult;
  const showSave = pi >= list.indexOf('save');
  const showTip = pi >= list.indexOf('tip');
  const showReflect = pi >= list.indexOf('reflect');
  const showBadge = pi >= list.indexOf('badge');

  const dec = t.decision;
  const resText = !showResult
    ? ''
    : t.decision
      ? correct
        ? 'Isolated, traced, cleaned — in that order. Boring. Correct. Usually the same thing.'
        : t.decision.wrongs[s.choice as string]
      : correct
        ? 'Calm hands. The mess stops spreading and you keep everything you need to understand it.'
        : 'Not wrong, exactly — just not first. The smell stays in the kitchen a while longer.';

  const nextLabel: string =
    (
      {
        open: t.witness ? 'Keep reading' : 'What went wrong',
        esc: 'Make the call',
        result: t.witness ? 'Continue' : "Chef's save",
        scenes: 'What changed',
        save: "Chef's tip",
        tip: 'Sit with it',
        reflect: 'Plate it',
        badge: 'Send it out',
      } as Record<string, string>
    )[s.phase] || 'Continue';

  return (
    <div style={{ position: 'relative', height: '100%', overflowY: 'auto', padding: '0 22px 44px' }}>
      <div
        key={t.id}
        style={{
          maxWidth: 950,
          margin: '28px auto 0',
          position: 'relative',
          backgroundImage: 'var(--ck-fiber),var(--ck-paper-grad)',
          borderRadius: 2,
          boxShadow: 'var(--ck-paper-lift)',
          animation: 'ck-land .85s cubic-bezier(.22,.9,.28,1) both',
          transform: 'rotate(-.35deg)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -3,
            height: 7,
            background: 'radial-gradient(circle at 5px 3px,transparent 3.6px,#F1E6D2 4px)',
            backgroundSize: '10px 7px',
            pointerEvents: 'none',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -2,
            height: 8,
            background: 'radial-gradient(circle at 6px 8px,transparent 5.4px,#F1E6D2 5.9px)',
            backgroundSize: '12px 8px',
            pointerEvents: 'none',
          }}
        />
        {/* header — sticky so the phase label + dots stay visible as phases stack up */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 20,
            padding: '26px 32px 20px',
            borderBottom: '1px dashed rgba(25,20,17,.28)',
            backgroundImage: 'var(--ck-fiber),var(--ck-paper-grad)',
            borderRadius: '2px 2px 0 0',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: 'var(--ck-mono)',
                fontSize: 10,
                letterSpacing: '.28em',
                textTransform: 'uppercase',
                color: 'var(--ck-red)',
              }}
            >
              {t.course} · docket {t.no}
            </div>
            <h2
              style={{
                margin: '10px 0 0',
                fontFamily: 'var(--ck-slab)',
                fontWeight: 800,
                fontSize: 'clamp(27px,4.1vw,46px)',
                lineHeight: 1.02,
              }}
            >
              {t.dish}
            </h2>
            <div style={{ margin: '9px 0 0', fontSize: 17, fontStyle: 'italic', color: 'var(--ck-ink2)' }}>
              {t.sub}
            </div>
            <div
              style={{
                margin: '11px 0 0',
                fontFamily: 'var(--ck-mono)',
                fontSize: 10,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--ck-steel)',
              }}
            >
              {t.station} — {t.concept}
            </div>
          </div>
          <div style={{ textAlign: 'right', flex: '0 0 auto' }}>
            <div
              style={{
                fontFamily: 'var(--ck-mono)',
                fontSize: 9.5,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: 'var(--ck-steel)',
              }}
            >
              {PHASE_LABEL[s.phase]}
            </div>
            <div style={{ display: 'flex', gap: 5, justifyContent: 'flex-end', marginTop: 10 }}>
              {list.map((p, i) => (
                <span
                  key={p}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: i <= pi ? '#C1352A' : 'rgba(25,20,17,.16)',
                    transition: 'background .3s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* body */}
        <div style={{ padding: '30px 32px 34px' }}>
          <div className="ck-docket-grid">
            <div>
              {t.open.map((x, i) => (
                <p
                  key={i}
                  style={{
                    margin: '0 0 21px',
                    fontSize: 'clamp(18px,2vw,23px)',
                    lineHeight: 1.47,
                    fontWeight: 300,
                    ...pretty,
                  }}
                >
                  {x}
                </p>
              ))}
            </div>
            <img
              src={t.art}
              alt=""
              className="ck-docket-art"
              style={{
                width: '100%',
                maxHeight: 320,
                objectFit: 'contain',
                transform: 'translate3d(calc(var(--mx,0) * -10px),calc(var(--my,0) * -5px),0)',
                transition: 'transform .7s cubic-bezier(.2,0,.2,1)',
                animation: 'ck-rise 1s cubic-bezier(.2,0,.2,1) both',
              }}
            />
          </div>

          {showEsc && (
            <div
              style={{
                margin: '30px 0 0',
                padding: '24px 28px',
                background: 'var(--ck-blush)',
                borderRadius: 16,
                animation: 'ck-fade .8s ease both',
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
                {t.escTitle}
              </div>
              <p style={{ margin: '13px 0 0', fontSize: 18.5, lineHeight: 1.56, ...pretty }}>{t.esc}</p>
            </div>
          )}

          {showScenes && (
            <div
              style={{
                margin: '28px 0 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 28,
                borderLeft: '2px solid rgba(25,20,17,.14)',
                paddingLeft: 26,
              }}
            >
              {(t.scenes || []).map((x, i) => (
                <div key={i} style={{ animation: 'ck-fade 1.1s ease both' }}>
                  <div
                    style={{
                      fontFamily: 'var(--ck-mono)',
                      fontSize: 9.5,
                      letterSpacing: '.22em',
                      textTransform: 'uppercase',
                      color: 'var(--ck-steel)',
                    }}
                  >
                    {x.who}
                  </div>
                  <p style={{ margin: '10px 0 0', fontSize: 'clamp(19px,2.2vw,26px)', lineHeight: 1.42, fontWeight: 300 }}>
                    {x.line}
                  </p>
                  <p
                    style={{
                      margin: '10px 0 0',
                      fontSize: 16.5,
                      lineHeight: 1.52,
                      fontStyle: 'italic',
                      color: 'var(--ck-ink2)',
                    }}
                  >
                    {x.note}
                  </p>
                </div>
              ))}
            </div>
          )}

          {showTray && (
            <div style={{ margin: '32px 0 0', animation: 'ck-fade .6s ease both' }}>
              <div
                style={{
                  fontFamily: 'var(--ck-slab)',
                  fontWeight: 800,
                  fontSize: 12,
                  letterSpacing: '.24em',
                  textTransform: 'uppercase',
                  color: 'var(--ck-ink2)',
                }}
              >
                Reach for something
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(215px,1fr))',
                  gap: 12,
                  marginTop: 15,
                }}
              >
                {(t.tools || []).map((o, i) => (
                  <button
                    key={i}
                    onClick={shift.pickTool(o.ok)}
                    className="hv-tool"
                    style={{
                      padding: 18,
                      borderRadius: 16,
                      background: 'var(--ck-cream)',
                      boxShadow: 'inset 0 0 0 1px rgba(25,20,17,.13)',
                      transition: 'box-shadow .16s,transform .16s',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'var(--ck-slab)',
                        fontWeight: 700,
                        fontSize: 16.5,
                        lineHeight: 1.2,
                      }}
                    >
                      {o.name}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        marginTop: 7,
                        fontSize: 14.5,
                        lineHeight: 1.45,
                        color: 'var(--ck-ink2)',
                      }}
                    >
                      {o.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showDecision && dec && (
            <div style={{ margin: '34px 0 0', animation: 'ck-fade .6s ease both' }}>
              <img
                src="art/fork.png"
                alt=""
                style={{ display: 'block', width: 'min(300px,58%)', margin: '0 0 6px -14px' }}
              />
              <div
                style={{
                  fontFamily: 'var(--ck-slab)',
                  fontWeight: 800,
                  fontSize: 'clamp(25px,3.4vw,36px)',
                  lineHeight: 1.06,
                  color: 'var(--ck-red)',
                }}
              >
                {dec.prompt}
              </div>
              <p style={{ margin: '11px 0 0', fontSize: 18, lineHeight: 1.5, color: 'var(--ck-ink2)', maxWidth: 660 }}>
                {dec.sub}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22 }}>
                {dec.options.map((o) => (
                  <button
                    key={o.k}
                    onClick={shift.choose(o.k)}
                    className="hv-opt"
                    style={{
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                      padding: '16px 20px',
                      borderRadius: 18,
                      background: 'var(--ck-blush)',
                      transition: 'transform .18s cubic-bezier(.2,0,.2,1),box-shadow .16s',
                    }}
                  >
                    <span
                      style={{
                        flex: '0 0 auto',
                        display: 'grid',
                        placeItems: 'center',
                        width: 30,
                        height: 30,
                        borderRadius: 999,
                        background: 'var(--ck-paper)',
                        fontFamily: 'var(--ck-slab)',
                        fontWeight: 800,
                        fontSize: 14,
                      }}
                    >
                      {o.k}
                    </span>
                    <span style={{ fontSize: 17.5, lineHeight: 1.44, paddingTop: 3 }}>{o.t}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showResult && (
            <div
              style={{
                position: 'relative',
                margin: '34px 0 0',
                padding: 28,
                borderRadius: 18,
                background: correct ? '#E6EDE3' : '#F5DAD2',
                animation: 'ck-fade .5s ease both',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  right: 20,
                  top: -15,
                  fontFamily: 'var(--ck-slab)',
                  fontWeight: 800,
                  fontSize: 12.5,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: correct ? '#3D6B50' : '#8B1F19',
                  padding: '8px 14px',
                  border: `2.5px solid ${correct ? '#3D6B50' : '#8B1F19'}`,
                  borderRadius: 5,
                  background: 'var(--ck-paper)',
                  animation: 'ck-stamp .55s cubic-bezier(.2,0,.2,1) both',
                }}
              >
                {correct ? 'Pass' : 'Sent back'}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1fr) auto',
                  gap: 20,
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--ck-mono)',
                      fontSize: 9.5,
                      letterSpacing: '.26em',
                      textTransform: 'uppercase',
                      color: 'var(--ck-ink2)',
                    }}
                  >
                    What that costs
                  </div>
                  <p style={{ margin: '13px 0 0', fontSize: 19, lineHeight: 1.52, ...pretty }}>{resText}</p>
                </div>
                <img
                  src={correct ? 'art/chef.png' : 'art/chef-panic.png'}
                  alt=""
                  style={{
                    height: 150,
                    objectFit: 'contain',
                    animation: correct
                      ? 'ck-rise .8s cubic-bezier(.2,0,.2,1) both, ck-bob 7s ease-in-out 1s infinite'
                      : 'ck-shake .7s cubic-bezier(.2,0,.2,1) both',
                  }}
                />
              </div>
              {showReveal && dec && (
                <div style={{ margin: '20px 0 0', paddingTop: 18, borderTop: '1px dashed rgba(25,20,17,.26)' }}>
                  <div
                    style={{
                      fontFamily: 'var(--ck-mono)',
                      fontSize: 9.5,
                      letterSpacing: '.26em',
                      textTransform: 'uppercase',
                      color: 'var(--ck-red)',
                    }}
                  >
                    About that earlier answer
                  </div>
                  <p style={{ margin: '11px 0 0', fontSize: 18, lineHeight: 1.5, fontStyle: 'italic' }}>{dec.right}</p>
                </div>
              )}
            </div>
          )}

          {showSave && (
            <div style={{ margin: '34px 0 0', animation: 'ck-fade .7s ease both' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 24, height: 1, background: 'var(--ck-red)' }} />
                <span
                  style={{
                    fontFamily: 'var(--ck-slab)',
                    fontWeight: 800,
                    fontSize: 12,
                    letterSpacing: '.24em',
                    textTransform: 'uppercase',
                    color: 'var(--ck-red)',
                  }}
                >
                  {t.witness ? 'What changed' : "Chef's save"}
                </span>
              </div>
              <p style={{ margin: '15px 0 0', fontSize: 19.5, lineHeight: 1.54, ...pretty }}>{t.save}</p>
              <div style={{ margin: '26px 0 0', padding: 24, background: 'var(--ck-cream)', borderRadius: 16 }}>
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
                  Chef's tools
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginTop: 16 }}>
                  {t.toolList.map(([name, what]) => (
                    <div key={name} style={{ display: 'flex', gap: 16, alignItems: 'baseline', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          flex: '0 0 200px',
                          fontFamily: 'var(--ck-mono)',
                          fontSize: 12,
                          fontWeight: 500,
                          letterSpacing: '.02em',
                        }}
                      >
                        {name}
                      </span>
                      <span style={{ flex: '1 1 260px', fontSize: 16, lineHeight: 1.46, color: 'var(--ck-ink2)' }}>
                        {what}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showTip && (
            <div
              style={{
                margin: '30px 0 0',
                padding: 32,
                borderRadius: 20,
                background: 'var(--ck-yellow)',
                animation: 'ck-drop .65s cubic-bezier(.2,0,.2,1) both',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--ck-mono)',
                  fontSize: 10,
                  letterSpacing: '.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(25,20,17,.62)',
                }}
              >
                Chef's tip · collected
              </div>
              <p
                style={{
                  margin: '15px 0 0',
                  fontFamily: 'var(--ck-slab)',
                  fontWeight: 800,
                  fontSize: 'clamp(23px,3.2vw,34px)',
                  lineHeight: 1.16,
                  ...balance,
                }}
              >
                {t.tip}
              </p>
            </div>
          )}

          {showReflect && (
            <div
              style={{
                margin: '30px 0 0',
                paddingLeft: 26,
                borderLeft: '2px solid var(--ck-steel)',
                animation: 'ck-fadein 1.8s ease both',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--ck-mono)',
                  fontSize: 9.5,
                  letterSpacing: '.26em',
                  textTransform: 'uppercase',
                  color: 'var(--ck-steel)',
                }}
              >
                Chef's reflection
              </div>
              <p
                style={{
                  margin: '13px 0 0',
                  fontSize: 19,
                  lineHeight: 1.62,
                  fontStyle: 'italic',
                  color: 'var(--ck-ink2)',
                  ...pretty,
                }}
              >
                {t.reflection}
              </p>
            </div>
          )}

          {showBadge && (
            <div
              style={{
                margin: '36px 0 0',
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                flexWrap: 'wrap',
                animation: 'ck-fade .8s ease both',
              }}
            >
              <span
                style={{
                  flex: '0 0 auto',
                  display: 'grid',
                  placeItems: 'center',
                  width: 76,
                  height: 76,
                  borderRadius: 999,
                  background: 'var(--ck-red)',
                  boxShadow:
                    '0 0 0 3px var(--ck-paper),0 0 0 6px var(--ck-red-d),0 12px 24px rgba(139,31,25,.34)',
                  animation: 'ck-sew .7s cubic-bezier(.2,0,.2,1) both',
                }}
              >
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FCF7EB"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                >
                  <path d="M12 3l7 3v6c0 4.3-3 7.5-7 9-4-1.5-7-4.7-7-9V6z" />
                  <path d="M9 12.2l2.2 2.2L15.4 10" />
                </svg>
              </span>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--ck-mono)',
                    fontSize: 9.5,
                    letterSpacing: '.26em',
                    textTransform: 'uppercase',
                    color: 'var(--ck-ink2)',
                  }}
                >
                  Patch earned · sewn onto the coat
                </div>
                <div style={{ marginTop: 7, fontFamily: 'var(--ck-slab)', fontWeight: 800, fontSize: 27 }}>
                  {t.badge}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            padding: '16px 32px 20px',
            borderTop: '1px dashed rgba(25,20,17,.28)',
          }}
        >
          <button
            onClick={shift.backToRail}
            className="hv-ink"
            style={{
              fontFamily: 'var(--ck-mono)',
              fontSize: 10,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: 'var(--ck-steel)',
            }}
          >
            ← back to the rail
          </button>
          {shift.canAdvance && (
            <button
              onClick={shift.next}
              className="hv-up2"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '13px 24px',
                borderRadius: 999,
                background: 'var(--ck-ink)',
                color: 'var(--ck-paper)',
                fontFamily: 'var(--ck-slab)',
                fontWeight: 700,
                fontSize: 15.5,
                transition: 'transform .16s',
              }}
            >
              {nextLabel}
              <span style={{ fontFamily: 'var(--ck-mono)', fontSize: 10.5, opacity: 0.55 }}>↵</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
