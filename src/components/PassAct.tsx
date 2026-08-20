// ACT 3 · THE PASS — persistent shell: rail (steel bar, hanging dockets, heat
// gauge), counter (kitchen backdrop, simmer plumes, smoke wash), menu bar.
import type { CSSProperties } from 'react';
import { CKC } from '../data/content';
import type { Shift } from '../useShift';
import { Docket } from './Docket';

const ROTS = [-1.5, 0.9, -0.7, 1.3, -1.1, 0.7, -1.3, 1];
const pretty = { textWrap: 'pretty' } as CSSProperties;

export function PassAct({ shift }: { shift: Shift }) {
  const { s, cur, doneCount: dn, unlocked } = shift;
  const sat = s.act === 'pass' && cur && cur.witness ? 0.5 : 1;
  const smoke = (0.04 + s.heat / 300).toFixed(3);
  const courseLabel =
    dn >= 6
      ? 'Main courses · they do not behave'
      : dn >= 3
        ? 'Entrées · mid-level blunders'
        : 'Starters · small slips, big consequences';
  const idleTitle =
    dn === 0 ? 'Service is on. Read the rail.' : dn >= 8 ? 'The rail is clear.' : 'Next docket, chef.';
  const idleBody =
    dn === 0
      ? 'Dockets hang above you. Pull one down, read it properly, then decide. The heat gauge is atmosphere — nothing here is timed, and nothing punishes reading.'
      : dn >= 8
        ? 'Something else has been waiting all night. It has been very helpful.'
        : 'The next course fires once this one is served. Slow and correct beats fast and clever.';

  const unlockedActs: Record<string, boolean> = {
    pass: true,
    ai: dn >= 8,
    cake: s.aiStage === 'debrief',
    end: s.act === 'end' || s.act === 'cake',
  };
  const menu: [string, string][] = [
    ['pass', 'The pass'],
    ['ai', "Chef's special"],
    ['cake', 'Dessert'],
    ['end', 'Service report'],
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateColumns: 'minmax(0,1fr)',
        background: 'var(--ck-cream)',
        filter: `saturate(${sat})`,
        transition: 'filter 1.4s ease',
      }}
    >
      {/* ticket rail */}
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(to bottom,#1B1510,#241C15)',
          padding: '0 24px 18px',
          boxShadow: '0 3px 0 #100C0A',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50,
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
            <span
              style={{
                fontFamily: 'var(--ck-slab)',
                fontWeight: 800,
                fontSize: 13.5,
                letterSpacing: '.28em',
                textTransform: 'uppercase',
                color: 'var(--ck-paper)',
              }}
            >
              The pass
            </span>
            <span
              style={{
                fontFamily: 'var(--ck-mono)',
                fontSize: 10,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: 'var(--ck-steel)',
                whiteSpace: 'nowrap',
              }}
            >
              {courseLabel}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 9 }}
              title="Kitchen heat. Atmosphere, not a timer."
            >
              <span
                style={{
                  fontFamily: 'var(--ck-mono)',
                  fontSize: 9.5,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: 'var(--ck-steel)',
                }}
              >
                Heat
              </span>
              <span
                style={{
                  position: 'relative',
                  display: 'block',
                  width: 96,
                  height: 5,
                  borderRadius: 999,
                  background: 'rgba(242,231,213,.15)',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${s.heat}%`,
                    background: 'linear-gradient(to right,#3D6B50,var(--ck-yellow),var(--ck-red))',
                    transition: 'width 1s cubic-bezier(.2,0,.2,1)',
                  }}
                />
              </span>
            </div>
            <button
              onClick={shift.openGloss}
              className="hv-paper"
              style={{
                fontFamily: 'var(--ck-mono)',
                fontSize: 9.5,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: 'var(--ck-steel)',
                padding: '8px 4px',
              }}
            >
              Dictionary
            </button>
            <button
              onClick={shift.toggleCoat}
              className="hv-coat"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '8px 14px',
                borderRadius: 999,
                background: 'rgba(242,231,213,.08)',
                color: 'var(--ck-paper)',
                fontFamily: 'var(--ck-mono)',
                fontSize: 10,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                transition: 'background .16s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EFB129" strokeWidth="1.7">
                <path d="M6.5 21V7l3.5-2.6L12 6l2-1.6L17.5 7v14z" />
                <path d="M12 6v15" />
              </svg>
              Coat · {s.badges.length}/9
            </button>
          </div>
        </div>
        <div
          className="ck-rail-scroller"
          style={{
            position: 'relative',
            display: 'flex',
            gap: 11,
            alignItems: 'flex-start',
            minHeight: 118,
            paddingTop: 12,
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 4,
              height: 3,
              background: 'linear-gradient(to bottom,#9A9184,#6A6255 55%,#3A342C)',
              boxShadow: '0 1px 3px rgba(0,0,0,.5)',
            }}
          />
          {CKC.tickets.map((x, i) => {
            const isDone = !!s.results[x.id];
            const locked = i >= unlocked;
            const active = s.ti === i;
            const bg = isDone
              ? 'linear-gradient(163deg,#E3D9C4,#D6CAB2)'
              : locked
                ? 'linear-gradient(163deg,#332A21,#241C15)'
                : active
                  ? 'linear-gradient(163deg,#F5C255,#E9A81C)'
                  : 'linear-gradient(163deg,#FDFAF1,#F4EBD9)';
            const state = isDone ? 'served' : locked ? 'not fired' : active ? 'at the pass' : 'waiting';
            return (
              <span
                key={x.id}
                className="ck-rail-item"
                style={{
                  flex: '0 0 auto',
                  display: 'block',
                  transformOrigin: 'top center',
                  animation: 'ck-hang .95s cubic-bezier(.22,.9,.28,1) both',
                  animationDelay: `${(i * 0.075).toFixed(2)}s`,
                }}
              >
                <button
                  onClick={locked ? undefined : shift.pickTicket(i)}
                  title={locked ? 'Fires later in the service' : x.sub}
                  className="hv-docket ck-rail-docket"
                  style={{
                    position: 'relative',
                    display: 'block',
                    width: 174,
                    padding: '15px 13px 16px',
                    borderRadius: 1,
                    backgroundImage: `var(--ck-fiber),${bg}`,
                    color: locked ? '#6B5D4E' : '#191411',
                    opacity: locked ? 0.5 : isDone ? 0.72 : 1,
                    transform: `rotate(${ROTS[i]}deg)`,
                    boxShadow: '0 1px 0 rgba(0,0,0,.22),0 14px 24px -6px rgba(0,0,0,.46)',
                    transition:
                      'transform .26s cubic-bezier(.2,0,.2,1),box-shadow .26s,opacity .3s',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: -3,
                      height: 7,
                      background: 'radial-gradient(circle at 4px 3px,transparent 3px,#241C15 3.2px)',
                      backgroundSize: '8px 7px',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: -1,
                      height: 6,
                      background:
                        'radial-gradient(circle at 5px 6px,transparent 4.4px,#241C15 4.9px)',
                      backgroundSize: '10px 6px',
                    }}
                  />
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 6,
                      fontFamily: 'var(--ck-mono)',
                      fontSize: 9,
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      opacity: 0.62,
                    }}
                  >
                    Docket {x.no}
                    <em style={{ fontStyle: 'normal' }}>{state}</em>
                  </span>
                  <span
                    style={{
                      display: 'block',
                      marginTop: 8,
                      fontFamily: 'var(--ck-slab)',
                      fontWeight: 700,
                      fontSize: 15,
                      lineHeight: 1.14,
                    }}
                  >
                    {x.dish}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      marginTop: 9,
                      fontFamily: 'var(--ck-mono)',
                      fontSize: 9,
                      letterSpacing: '.08em',
                      opacity: 0.6,
                    }}
                  >
                    {x.station}
                  </span>
                </button>
              </span>
            );
          })}
        </div>
      </div>

      {/* counter */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '-8%',
            transform:
              'translateX(-50%) translate3d(calc(var(--mx,0) * 15px),calc(var(--my,0) * 8px),0)',
            height: 'min(78%,540px)',
            opacity: 0.13,
            pointerEvents: 'none',
            transition: 'transform .7s cubic-bezier(.2,0,.2,1)',
          }}
        >
          <img src="art/kitchen.png" alt="" style={{ height: '100%', width: 'auto' }} />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(90deg,rgba(25,20,17,.03) 0 1px,transparent 1px 48px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 12,
            background: 'linear-gradient(to bottom,rgba(25,20,17,.14),transparent)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '8%',
            bottom: '6%',
            width: 3,
            height: 180,
            background: 'linear-gradient(to top,rgba(255,255,255,.9),transparent)',
            filter: 'blur(9px)',
            animation: 'ck-simmer 7s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 'calc(8% + 34px)',
            bottom: '5%',
            width: 2,
            height: 150,
            background: 'linear-gradient(to top,rgba(255,255,255,.8),transparent)',
            filter: 'blur(11px)',
            animation: 'ck-simmer 9s ease-in-out 1.8s infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '9%',
            bottom: '7%',
            width: 3,
            height: 160,
            background: 'linear-gradient(to top,rgba(255,255,255,.85),transparent)',
            filter: 'blur(10px)',
            animation: 'ck-simmer 8s ease-in-out 3.4s infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(74% 58% at 50% 118%,rgba(193,53,42,${smoke}),transparent 72%)`,
            transition: 'background 1.4s ease',
          }}
        />

        {!cur && (
          <div
            style={{
              position: 'relative',
              height: '100%',
              display: 'grid',
              placeItems: 'center',
              textAlign: 'center',
              padding: 24,
            }}
          >
            <div style={{ maxWidth: 600, animation: 'ck-fade .8s ease both' }}>
              <svg
                width="52"
                height="52"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A2937F"
                strokeWidth="1.2"
                style={{ marginBottom: 20 }}
              >
                <path d="M2.5 18.5h19M6 18.5c0-6.2 2.7-9.3 6-9.3s6 3.1 6 9.3" />
                <path d="M12 6.6V4.4M8.6 5.2 8 3.5M15.4 5.2 16 3.5" />
              </svg>
              <div
                style={{
                  fontFamily: 'var(--ck-slab)',
                  fontWeight: 700,
                  fontSize: 'clamp(25px,3.4vw,38px)',
                  lineHeight: 1.12,
                }}
              >
                {idleTitle}
              </div>
              <p
                style={{
                  margin: '16px 0 0',
                  fontSize: 18,
                  lineHeight: 1.52,
                  color: 'var(--ck-ink2)',
                  ...pretty,
                }}
              >
                {idleBody}
              </p>
            </div>
          </div>
        )}

        {cur && <Docket shift={shift} t={cur} />}
      </div>

      {/* menu bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          padding: '11px 24px',
          background: '#1B1510',
          color: 'var(--ck-steel)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--ck-mono)',
            fontSize: 9.5,
            letterSpacing: '.2em',
            textTransform: 'uppercase',
          }}
        >
          Nothing leaves the kitchen until it's checked
        </span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {menu.map(([key, label]) => (
            <button
              key={key}
              onClick={unlockedActs[key] ? shift.goto(key as never) : undefined}
              className="hv-menu"
              style={{
                padding: '7px 12px',
                borderRadius: 999,
                fontFamily: 'var(--ck-mono)',
                fontSize: 9.5,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
                color: unlockedActs[key] ? '#F2E7D5' : '#5E5245',
                background: s.act === key ? 'rgba(242,231,213,.15)' : 'transparent',
                transition: 'background .16s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
