// THE PASS — one route, one scene. Acts are states, not pages.
import { useEffect, useRef } from 'react';
import './styles/app.css';
import { useShift } from './useShift';
import { PassAct } from './components/PassAct';
import { TitleAct } from './components/TitleAct';
import { ColdOpen } from './components/ColdOpen';
import { Interlude } from './components/Interlude';
import { AiAct } from './components/AiAct';
import { CakeAct } from './components/CakeAct';
import { EndAct } from './components/EndAct';
import { CoatDrawer, GlossDrawer } from './components/Drawers';

export default function App() {
  const shift = useShift();
  const ref = useRef(shift);
  ref.current = shift;

  // Title beats: 0→3 via timers at 1100/2600/4300ms. bumpBeat uses Math.max,
  // so StrictMode double-mount and a user skip are both safe.
  useEffect(() => {
    const beats = [
      setTimeout(() => ref.current.bumpBeat(1), 1100),
      setTimeout(() => ref.current.bumpBeat(2), 2600),
      setTimeout(() => ref.current.bumpBeat(3), 4300),
    ];
    return () => beats.forEach(clearTimeout);
  }, []);

  // Pointer parallax: --mx / --my in −1..1 on the root element.
  useEffect(() => {
    const mm = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty('--mx', x.toFixed(3));
      document.documentElement.style.setProperty('--my', y.toFixed(3));
    };
    window.addEventListener('mousemove', mm);
    return () => window.removeEventListener('mousemove', mm);
  }, []);

  // Enter advances the title, the cold open, the docket phase, an interlude,
  // and the AI turn. No other shortcuts.
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      const a = ref.current;
      const s = a.s;
      if (s.act === 'title') a.begin();
      else if (s.act === 'open') a.openNext();
      else if (s.brk) a.closeBreak();
      else if (s.act === 'pass' && s.ti !== null && a.canAdvance) a.next();
      else if (s.act === 'ai' && s.aiAnswered) a.aiNext();
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, []);

  const s = shift.s;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: 'var(--ck-serif)',
        background: '#100C0A',
      }}
    >
      {s.act === 'title' && <TitleAct shift={shift} />}
      {s.act === 'open' && <ColdOpen shift={shift} />}
      {s.act === 'pass' && !s.brk && <PassAct shift={shift} />}
      {!!s.brk && <Interlude shift={shift} />}
      {s.act === 'ai' && <AiAct shift={shift} />}
      {s.act === 'cake' && <CakeAct shift={shift} />}
      {s.act === 'end' && <EndAct shift={shift} />}

      {/* global vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 30,
          pointerEvents: 'none',
          background:
            'radial-gradient(130% 110% at 50% 48%,transparent 62%,rgba(25,20,17,.11) 100%)',
        }}
      />

      {s.coat && <CoatDrawer shift={shift} />}
      {s.gloss && <GlossDrawer shift={shift} />}
    </div>
  );
}
