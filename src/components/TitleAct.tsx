// ACT 1 · TITLE — timed 4-beat opening. Beat 0: near-black + steam + stamp line.
// Beat 1: burners catch. Beat 2: Chef, prop, title rise. Beat 3: CTA. Click skips to 3.
import type { Shift } from '../useShift';

export function TitleAct({ shift }: { shift: Shift }) {
  const { s } = shift;
  const beat = s.beat;
  const tDark = [1, 0.62, 0.2, 0][beat];
  const tKitchen = beat < 1 ? 0 : 0.13;
  const tWash = beat < 1 ? 0 : 1;
  const tMeta = beat < 2 ? 0 : 1;
  const tTitle = beat < 2 ? 0 : 1;
  const tCta = beat < 3 ? 0 : 1;
  const tCtaY = beat < 3 ? '14px' : '0px';
  const tStamp = beat < 2 ? 1 : 0;
  const tStampText = beat < 1 ? '17:42 · the kitchen is still cold' : 'the burners catch';

  return (
    <div
      onClick={shift.skipIntro}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        background: 'var(--ck-cream)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translate3d(calc(var(--mx,0) * 18px),calc(var(--my,0) * 10px),0)',
          transition: 'transform .6s cubic-bezier(.2,0,.2,1)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '-6vh',
            transform: 'translateX(-50%)',
            height: 'min(66vh,600px)',
            opacity: tKitchen,
            transition: 'opacity 1.8s ease',
          }}
        >
          <img src="art/kitchen.png" alt="" style={{ height: '100%', width: 'auto' }} />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(70% 72% at 50% 52%,rgba(241,230,210,.97) 52%,rgba(241,230,210,.72) 78%,rgba(241,230,210,.25) 94%)',
          opacity: tWash,
          transition: 'opacity 1.8s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '6%',
          width: 3,
          height: '36%',
          background: 'linear-gradient(to bottom,transparent,rgba(255,255,255,.95))',
          filter: 'blur(10px)',
          animation: 'ck-steam 8s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 'calc(50% - 60px)',
          top: '11%',
          width: 2,
          height: '26%',
          background: 'linear-gradient(to bottom,transparent,rgba(255,255,255,.85))',
          filter: 'blur(12px)',
          animation: 'ck-steam 10s ease-in-out 1.4s infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 'calc(50% + 54px)',
          top: '13%',
          width: 2,
          height: '22%',
          background: 'linear-gradient(to bottom,transparent,rgba(255,255,255,.8))',
          filter: 'blur(13px)',
          animation: 'ck-steam 11s ease-in-out 2.6s infinite',
        }}
      />
      <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px', maxWidth: 920, zIndex: 3 }}>
        <div style={{ opacity: tMeta, transition: 'opacity 1.1s ease' }}>
          <div
            style={{
              fontFamily: 'var(--ck-mono)',
              fontSize: 10.5,
              letterSpacing: '.42em',
              textTransform: 'uppercase',
              color: 'var(--ck-ink2)',
            }}
          >
            Zoho Corporation · ManageEngine · First edition 2026
          </div>
          <div style={{ width: 50, height: 1, background: 'var(--ck-ink)', margin: '24px auto 0', opacity: 0.3 }} />
        </div>
        <h1
          style={{
            fontWeight: 200,
            fontSize: 'clamp(44px,7.6vw,108px)',
            lineHeight: 0.93,
            margin: '28px 0 0',
            letterSpacing: '-.025em',
            opacity: tTitle,
            transition: 'opacity 1.2s ease',
          }}
        >
          <span style={{ display: 'block', animation: 'ck-rise 1.5s cubic-bezier(.2,0,.2,1) .1s both' }}>
            The cyber kitchen
          </span>
          <em
            style={{
              display: 'block',
              fontWeight: 300,
              color: 'var(--ck-red)',
              animation: 'ck-rise 1.5s cubic-bezier(.2,0,.2,1) .3s both',
            }}
          >
            chronicles
          </em>
        </h1>
        <div style={{ opacity: tTitle, transition: 'opacity 1.2s ease .2s' }}>
          <div style={{ margin: '28px 0 0', fontSize: 20, color: 'var(--ck-ink2)' }}>
            <em>by the</em> Chief Cyber Chef
          </div>
          <div
            style={{
              margin: '10px 0 0',
              fontFamily: 'var(--ck-mono)',
              fontSize: 11.5,
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              color: 'var(--ck-steel)',
            }}
          >
            Battling breaches since the dawn of dial-up
          </div>
        </div>
        <div
          style={{
            margin: '52px auto 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 15,
            opacity: tCta,
            transform: `translateY(${tCtaY})`,
            transition: 'opacity .9s ease,transform .9s cubic-bezier(.2,0,.2,1)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--ck-slab)',
              fontWeight: 800,
              fontSize: 12.5,
              letterSpacing: '.26em',
              textTransform: 'uppercase',
              color: 'var(--ck-red)',
            }}
          >
            Tonight, you work the pass
          </div>
          <button
            onClick={shift.begin}
            className="hv-cta"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 15,
              background: 'var(--ck-ink)',
              color: 'var(--ck-paper)',
              padding: '15px 30px 15px 22px',
              borderRadius: 999,
              fontFamily: 'var(--ck-slab)',
              fontWeight: 700,
              fontSize: 17.5,
              boxShadow: '0 16px 34px rgba(25,20,17,.3)',
              transition: 'transform .18s cubic-bezier(.2,0,.2,1),box-shadow .18s',
            }}
          >
            <span
              style={{
                display: 'grid',
                placeItems: 'center',
                width: 36,
                height: 36,
                borderRadius: 999,
                background: 'var(--ck-yellow)',
                animation: 'ck-bell 5s ease-in-out 1.6s infinite',
              }}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#191411"
                strokeWidth="1.7"
                strokeLinecap="round"
              >
                <path d="M4 17.5h16M12 17.5c0-5.2 3-4.6 3-8.2a3 3 0 0 0-6 0c0 3.6 3 3 3 8.2Z" />
                <path d="M12 4.3V2.6" />
              </svg>
            </span>
            Ring in · begin service
          </button>
          <div
            style={{
              fontFamily: 'var(--ck-mono)',
              fontSize: 10,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: 'var(--ck-ink2)',
            }}
          >
            No timers · nothing here punishes reading
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 4,
          background: 'radial-gradient(64% 56% at 50% 64%,rgba(16,12,10,.55) 0%,#100C0A 76%)',
          opacity: tDark,
          transition: 'opacity 1.6s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '9vh',
          textAlign: 'center',
          zIndex: 5,
          fontFamily: 'var(--ck-mono)',
          fontSize: 10.5,
          letterSpacing: '.34em',
          textTransform: 'uppercase',
          color: '#B9A88C',
          opacity: tStamp,
          transition: 'opacity 1.1s ease',
          pointerEvents: 'none',
        }}
      >
        {tStampText}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 6,
          background: '#FFF3DC',
          opacity: s.flash,
          transition: 'opacity .3s ease',
        }}
      />
    </div>
  );
}
