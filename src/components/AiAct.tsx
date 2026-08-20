// ACT 4 · AI POISON PLATTER — the set-piece. The interface itself degrades in
// three drift stages (<25 / <55 / ≥55); the sous-chef's voice gets colder and
// more machine-like the more you let slide.
import type { CSSProperties } from 'react';
import { CKC } from '../data/content';
import type { AiAction } from '../data/types';
import type { Shift } from '../useShift';

const pretty = { textWrap: 'pretty' } as CSSProperties;

export function AiAct({ shift }: { shift: Shift }) {
  const { s } = shift;
  const c = CKC.ai;
  const turn = c.turns[Math.min(s.aiTurn, c.turns.length - 1)];
  const drift = s.aiActs.reduce(
    (a, k, i) => a + (k === c.turns[i].best ? 0 : k === 'approve' ? 17 : 8),
    0,
  );
  const st = drift < 25 ? 0 : drift < 55 ? 1 : 2;

  const driftLabel =
    drift === 0
      ? 'holding'
      : drift < 25
        ? 'seasoning shifting'
        : drift < 55
          ? 'too clean, too fast'
          : 'it is cooking for itself';
  const aiStatus =
    drift < 25 ? 'helpful · supervised' : drift < 55 ? 'confident · unusually tidy' : 'immaculate · not yours anymore';
  const aiTrack = drift < 25 ? 'normal' : drift < 55 ? '0.04em' : '0.1em';
  const aiFont = drift < 55 ? 'var(--ck-serif)' : 'var(--ck-mono)';
  const aiSat = drift < 25 ? 1 : drift < 55 ? 0.6 : 0.15;
  const aiBg = ['#C1352A', '#AC4033', '#5C6462'][st];
  const aiAccent = st === 2 ? 'var(--ck-paper)' : 'var(--ck-yellow)';
  const aiDim = st === 2 ? 'rgba(252,247,235,.95)' : 'rgba(252,247,235,.7)';
  const aiDim2 = st === 2 ? 'rgba(252,247,235,.97)' : 'rgba(252,247,235,.85)';
  const aiPanel = ['#FCF7EB', '#F7F5EF', '#EDF0EF'][st];
  const aiRadius = ['22px', '12px', '2px'][st];
  const aiShadow = [
    '0 26px 50px rgba(0,0,0,.28)',
    '0 18px 34px rgba(0,0,0,.24)',
    '0 1px 0 rgba(0,0,0,.3)',
  ][st];
  const aiNoise = [0, 0.06, 0.16][st];
  const aiTitleFont = st === 2 ? 'var(--ck-mono)' : 'var(--ck-slab)';
  const aiTitleTrack = ['normal', '0.01em', '0.1em'][st];
  const aiLead = ['1.5', '1.44', '1.3'][st];
  const aiGap = ['22px', '16px', '8px'][st];

  const tasted = s.aiTasted.includes(s.aiTurn);
  const myAct = s.aiActs[s.aiTurn];
  const aiFeedback = myAct ? turn.fb[myAct] : '';
  const aiNextLabel = s.aiTurn + 1 >= c.turns.length ? 'The final stir' : 'Next suggestion';

  const acts: { key: AiAction; label: string; hint: string; explanation: string; bg: string; fg: string }[] = [
    { key: 'approve', label: 'Approve', hint: 'safe and in scope', explanation: 'Let it run when the action is expected, reviewed and within its limits.', bg: '#F1E6D2', fg: '#191411' },
    { key: 'question', label: 'Question', hint: 'need evidence or limits', explanation: 'Ask for the rule, evidence, scope or reviewer before it proceeds.', bg: '#F1E6D2', fg: '#191411' },
    { key: 'block', label: 'Block', hint: 'unsafe or irreversible', explanation: 'Stop it when the action is unauthorized, risky or hard to undo.', bg: '#191411', fg: '#FCF7EB' },
  ];

  const caughtN = s.aiTasted.length;
  const rightN = s.aiActs.filter((k, i) => k === c.turns[i].best).length;
  const aiVerdict =
    'You tasted ' +
    caughtN +
    ' of 6 poisoned lines and handled ' +
    rightN +
    ' of 6 suggestions the way I would have. ' +
    (rightN >= 5
      ? 'That is a supervised assistant. Keep it that way.'
      : rightN >= 3
        ? 'Good instincts, uneven hands. Drift travels on the ones you let through.'
        : 'It cooked for itself tonight. Read it again — slower.');

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: aiBg,
        color: 'var(--ck-paper)',
        overflowY: 'auto',
        transition: 'background 1.8s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          background: 'repeating-linear-gradient(0deg,rgba(255,255,255,.10) 0 1px,transparent 1px 3px)',
          opacity: aiNoise,
          transition: 'opacity 1.4s ease',
        }}
      />
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '6vh 26px 64px' }}>
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--ck-mono)',
                fontSize: 10,
                letterSpacing: '.36em',
                textTransform: 'uppercase',
                color: aiDim,
              }}
            >
              Chef's special
            </div>
            <h2
              style={{
                margin: '14px 0 0',
                fontFamily: aiTitleFont,
                fontWeight: 800,
                fontSize: 'clamp(32px,5.4vw,58px)',
                lineHeight: 1.02,
                letterSpacing: aiTitleTrack,
                transition: 'letter-spacing 1.4s ease',
              }}
            >
              The AI poison platter
            </h2>
            <div style={{ margin: '8px 0 0', fontSize: 19, fontStyle: 'italic', color: aiDim2 }}>
              The future of failure
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--ck-mono)',
                fontSize: 9.5,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: aiDim,
              }}
            >
              Drift
            </div>
            <div
              style={{
                marginTop: 8,
                position: 'relative',
                width: 150,
                height: 5,
                borderRadius: 999,
                background: 'rgba(252,247,235,.24)',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${Math.min(100, drift)}%`,
                  background: 'var(--ck-paper)',
                  transition: 'width .8s cubic-bezier(.2,0,.2,1)',
                }}
              />
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: 'var(--ck-mono)',
                fontSize: 9.5,
                letterSpacing: '.14em',
                color: aiDim2,
              }}
            >
              {driftLabel}
            </div>
          </div>
        </div>

        {s.aiStage === 'intro' && (
          <>
            <div
              style={{
                position: 'absolute',
                right: '3vw',
                top: '16vh',
                height: 'min(42vh,360px)',
                opacity: 0.9,
                filter: 'invert(1)',
                pointerEvents: 'none',
                animation:
                  'ck-riseT 1.4s cubic-bezier(.2,0,.2,1) .3s both,ck-floatT 9s ease-in-out 1.6s infinite',
              }}
            >
              <img src="art/sous-chef.png" alt="" style={{ height: '100%', width: 'auto' }} />
            </div>
            <div style={{ margin: '44px 0 0', maxWidth: 760 }}>
              {c.intro.map((l, i) => (
                <p
                  key={i}
                  style={{
                    margin: '0 0 22px',
                    fontSize: 'clamp(20px,2.4vw,29px)',
                    lineHeight: 1.44,
                    fontWeight: 200,
                    ...pretty,
                  }}
                >
                  {l}
                </p>
              ))}
              <div
                style={{
                  margin: '34px 0 0',
                  padding: '22px 24px',
                  borderRadius: 18,
                  background: 'rgba(25,20,17,.28)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--ck-mono)',
                    fontSize: 9.5,
                    letterSpacing: '.26em',
                    textTransform: 'uppercase',
                    color: aiAccent,
                  }}
                >
                  How to work the platter
                </div>
                <p style={{ margin: '11px 0 0', fontSize: 17.5, lineHeight: 1.5 }}>{c.howto}</p>
              </div>
              <button
                onClick={shift.aiStart}
                className="hv-up2"
                style={{
                  marginTop: 28,
                  padding: '14px 26px',
                  borderRadius: 999,
                  background: 'var(--ck-paper)',
                  color: 'var(--ck-ink)',
                  fontFamily: 'var(--ck-slab)',
                  fontWeight: 700,
                  fontSize: 16,
                  transition: 'transform .16s',
                }}
              >
                Bring the sous-chef in
              </button>
            </div>
          </>
        )}

        {s.aiStage === 'run' && (
          <div
            className="ck-ai-grid"
            style={{
              position: 'relative',
              zIndex: 3,
              margin: '40px 0 0',
              gap: aiGap,
              transition: 'gap 1.4s ease',
            }}
          >
            <div
              style={{
                position: 'relative',
                zIndex: 3,
                borderRadius: aiRadius,
                background: aiPanel,
                color: 'var(--ck-ink)',
                padding: '26px 28px 28px',
                boxShadow: aiShadow,
                animation: 'ck-slide .5s cubic-bezier(.2,0,.2,1) both',
                transition: 'background 1.6s ease,border-radius 1.6s ease,box-shadow 1.6s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 13,
                  paddingBottom: 18,
                  borderBottom: '1px solid rgba(25,20,17,.1)',
                }}
              >
                <img
                  src="art/sous-chef.png"
                  alt=""
                  style={{
                    width: 52,
                    height: 52,
                    objectFit: 'contain',
                    animation: 'ck-bob 5s ease-in-out infinite',
                    opacity: aiSat,
                    transition: 'opacity 1s ease',
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: 'var(--ck-slab)',
                      fontWeight: 700,
                      fontSize: 17,
                      letterSpacing: aiTrack,
                      transition: 'letter-spacing .6s ease',
                    }}
                  >
                    The sous-chef
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--ck-mono)',
                      fontSize: 9.5,
                      letterSpacing: '.16em',
                      textTransform: 'uppercase',
                      color: 'var(--ck-ink2)',
                    }}
                  >
                    {aiStatus}
                  </div>
                </div>
                <span
                  style={{
                    marginLeft: 'auto',
                    fontFamily: 'var(--ck-mono)',
                    fontSize: 9.5,
                    letterSpacing: '.16em',
                    textTransform: 'uppercase',
                    color: 'var(--ck-ink2)',
                  }}
                >
                  Suggestion {s.aiTurn + 1} of {c.turns.length}
                </span>
              </div>
              <div
                style={{
                  margin: '22px 0 0',
                  padding: '13px 16px',
                  borderLeft: `3px solid ${aiAccent}`,
                  background: 'rgba(25,20,17,.12)',
                }}
              >
                <div style={{ fontFamily: 'var(--ck-mono)', fontSize: 9.5, letterSpacing: '.2em', textTransform: 'uppercase', color: aiAccent }}>
                  Pattern {s.aiTurn + 1} of {c.turns.length} · risk
                </div>
                <div style={{ marginTop: 6, fontSize: 16, lineHeight: 1.45 }}>
                  {turn.technique}: {turn.risk}
                </div>
              </div>
              <p
                style={{
                  margin: '18px 0 0',
                  fontSize: 'clamp(19px,2.2vw,25px)',
                  lineHeight: aiLead,
                  fontWeight: 300,
                  fontFamily: aiFont,
                  letterSpacing: aiTrack,
                  transition: 'letter-spacing 1.2s ease,line-height 1.2s ease',
                }}
              >
                {turn.pre}
                <button
                  onClick={shift.taste}
                  className="hv-poison"
                  aria-label={`Inspect suspicious phrase: ${turn.poison}`}
                  title="Inspect this suspicious phrase"
                  style={{
                    padding: '2px 4px',
                    borderRadius: 5,
                    background: tasted ? 'rgba(239,177,41,.85)' : 'rgba(239,177,41,.16)',
                    boxShadow: tasted ? 'inset 0 0 0 1.5px #8B1F19' : 'inset 0 0 0 1px rgba(25,20,17,.16)',
                    font: 'inherit',
                    transition: 'background .2s,box-shadow .2s',
                  }}
                >
                  {turn.poison}
                </button>
                {turn.post}
              </p>
              {tasted && (
                <div
                  style={{
                    margin: '22px 0 0',
                    padding: '20px 22px',
                    borderRadius: 16,
                    background: 'var(--ck-blush)',
                    animation: 'ck-fade .45s ease both',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--ck-slab)',
                      fontWeight: 800,
                      fontSize: 11.5,
                      letterSpacing: '.22em',
                      textTransform: 'uppercase',
                      color: 'var(--ck-red-d)',
                    }}
                  >
                    Risk inspected · {turn.technique}
                  </div>
                  <p style={{ margin: '11px 0 0', fontSize: 16.5, lineHeight: 1.5 }}>
                    {turn.techDesc}
                  </p>
                  <div style={{ marginTop: 12, fontFamily: 'var(--ck-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ck-red-d)' }}>
                    Why it matters
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: 15.5, lineHeight: 1.45 }}>{turn.risk}</p>
                </div>
              )}
              {!s.aiAnswered && (
                <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
                  {acts.map((a) => (
                    <button
                      key={a.key}
                      onClick={shift.aiAct(a.key)}
                      className="hv-aiact"
                      style={{
                        flex: '1 1 140px',
                        padding: '15px 16px',
                        borderRadius: 16,
                        background: a.bg,
                        color: a.fg,
                        boxShadow: 'inset 0 0 0 1px rgba(25,20,17,.14)',
                        transition: 'transform .16s,box-shadow .16s',
                      }}
                    >
                      <span style={{ display: 'block', fontFamily: 'var(--ck-slab)', fontWeight: 700, fontSize: 16 }}>
                        {a.label}
                      </span>
                      <span
                        style={{
                          display: 'block',
                          marginTop: 5,
                          fontFamily: 'var(--ck-mono)',
                          fontSize: 9.5,
                          letterSpacing: '.12em',
                          textTransform: 'uppercase',
                          opacity: 0.65,
                        }}
                      >
                        {a.hint}
                      </span>
                      <span style={{ display: 'block', marginTop: 8, fontSize: 12.5, lineHeight: 1.35, opacity: 0.72 }}>
                        {a.explanation}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {s.aiAnswered && (
                <div
                  style={{
                    margin: '24px 0 0',
                    paddingTop: 22,
                    borderTop: '1px dashed rgba(25,20,17,.24)',
                    animation: 'ck-fade .5s ease both',
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
                    Chef, watching
                  </div>
                  <div style={{ marginTop: 10, fontFamily: 'var(--ck-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ck-red)' }}>
                    Best response · {turn.best}
                  </div>
                  <p style={{ margin: '12px 0 0', fontSize: 18.5, lineHeight: 1.5 }}>{aiFeedback}</p>
                  <button
                    onClick={shift.aiNext}
                    className="hv-up2"
                    style={{
                      marginTop: 20,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 11,
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
                    {aiNextLabel}
                    <span style={{ fontFamily: 'var(--ck-mono)', fontSize: 10.5, opacity: 0.55 }}>↵</span>
                  </button>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ padding: 22, borderRadius: 18, background: 'rgba(25,20,17,.26)' }}>
                <div
                  style={{
                    fontFamily: 'var(--ck-mono)',
                    fontSize: 9.5,
                    letterSpacing: '.26em',
                    textTransform: 'uppercase',
                    color: aiAccent,
                  }}
                >
                  What it becomes
                </div>
                <div style={{ marginTop: 12, fontFamily: 'var(--ck-slab)', fontWeight: 700, fontSize: 20 }}>
                  {turn.archetype}
                </div>
                <p style={{ margin: '10px 0 0', fontSize: 16, lineHeight: 1.5, color: aiDim2 }}>{turn.arch}</p>
              </div>
              <div style={{ padding: 22, borderRadius: 18, background: 'rgba(25,20,17,.14)' }}>
                <div
                  style={{
                    fontFamily: 'var(--ck-mono)',
                    fontSize: 9.5,
                    letterSpacing: '.26em',
                    textTransform: 'uppercase',
                    color: aiDim,
                  }}
                >
                  The nudges caught
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14 }}>
                  {c.turns.map((x, i) => {
                    const wasTasted = s.aiTasted.includes(i);
                    return (
                      <div
                        key={x.technique}
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'center',
                          opacity: wasTasted ? 1 : i < s.aiTurn ? 0.5 : 0.3,
                        }}
                      >
                        <span
                          style={{
                            width: 9,
                            height: 9,
                            borderRadius: 2,
                            background: wasTasted ? '#EFB129' : i < s.aiTurn ? '#8B1F19' : 'rgba(252,247,235,.3)',
                          }}
                        />
                        <span style={{ fontFamily: 'var(--ck-mono)', fontSize: 11, letterSpacing: '.04em' }}>
                          {x.technique}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {s.aiStage === 'debrief' && (
          <div style={{ margin: '44px 0 0', animation: 'ck-fade .7s ease both' }}>
            <div style={{ maxWidth: 760 }}>
              <div
                style={{
                  fontFamily: 'var(--ck-slab)',
                  fontWeight: 800,
                  fontSize: 12,
                  letterSpacing: '.26em',
                  textTransform: 'uppercase',
                  color: aiAccent,
                }}
              >
                Keeping it safe
              </div>
              <p style={{ margin: '16px 0 0', fontSize: 'clamp(20px,2.4vw,28px)', lineHeight: 1.42, fontWeight: 200 }}>
                {aiVerdict}
              </p>
              <div style={{ marginTop: 22, padding: '18px 20px', borderRadius: 16, background: 'rgba(25,20,17,.22)' }}>
                <div style={{ fontFamily: 'var(--ck-mono)', fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase', color: aiAccent }}>
                  The plain-English takeaway
                </div>
                <p style={{ margin: '10px 0 0', fontSize: 17, lineHeight: 1.5 }}>
                  AI poisoning is prevented by controlling what the assistant learns from, limiting what it can access, requiring approval for consequential actions, and watching for repeated unsafe patterns.
                </p>
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
                gap: 14,
                marginTop: 30,
              }}
            >
              {c.mitigations.map(([t, d]) => (
                <div key={t} style={{ padding: 22, borderRadius: 18, background: 'var(--ck-paper)', color: 'var(--ck-ink)' }}>
                  <div style={{ fontFamily: 'var(--ck-slab)', fontWeight: 700, fontSize: 17, lineHeight: 1.2 }}>{t}</div>
                  <p style={{ margin: '9px 0 0', fontSize: 15.5, lineHeight: 1.48, color: 'var(--ck-ink2)' }}>{d}</p>
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0,1fr) auto',
                gap: 24,
                alignItems: 'end',
                marginTop: 32,
              }}
            >
              <p style={{ margin: 0, maxWidth: 760, fontSize: 19, lineHeight: 1.55, fontStyle: 'italic', color: aiDim2 }}>
                {c.finalStir}
              </p>
              <img
                src="art/chef-worried.png"
                alt=""
                style={{ height: 'min(300px,32vh)', objectFit: 'contain', animation: 'ck-rise 1.1s cubic-bezier(.2,0,.2,1) both' }}
              />
            </div>
            <button
              onClick={shift.toCake}
              className="hv-up2"
              style={{
                marginTop: 28,
                padding: '14px 26px',
                borderRadius: 999,
                background: 'var(--ck-paper)',
                color: 'var(--ck-ink)',
                fontFamily: 'var(--ck-slab)',
                fontWeight: 700,
                fontSize: 16,
                transition: 'transform .16s',
              }}
            >
              Dessert, chef →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
