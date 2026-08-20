// The single state machine behind THE PASS.
// Mirrors the prototype's Component class (The Pass.dc.html) — same state shape,
// same transitions, same numbers. Acts are states, not pages.
import { useRef, useState } from 'react';
import { CKC } from './data/content';
import type { AiAction, Ticket } from './data/types';

export type Act = 'title' | 'open' | 'pass' | 'ai' | 'cake' | 'end';
export type Phase =
  | 'open'
  | 'esc'
  | 'act'
  | 'result'
  | 'scenes'
  | 'save'
  | 'tip'
  | 'reflect'
  | 'badge';

export interface ShiftState {
  act: Act;
  ti: number | null;
  phase: Phase;
  choice: string | null;
  revealed: number;
  results: Record<string, { choice: string | null; correct: boolean; witness: boolean }>;
  badges: string[];
  tips: string[];
  heat: number;
  coat: boolean;
  gloss: boolean;
  brk: number | null;
  taleFlip: boolean;
  aiStage: 'intro' | 'run' | 'debrief';
  aiTurn: number;
  aiTasted: number[];
  aiActs: AiAction[];
  aiAnswered: boolean;
  layer: number;
  circled: number[];
  beat: number;
  flash: number;
}

const initial: ShiftState = {
  act: 'title',
  ti: null,
  phase: 'open',
  choice: null,
  revealed: 1,
  results: {},
  badges: [],
  tips: [],
  heat: 8,
  coat: false,
  gloss: false,
  brk: null,
  taleFlip: false,
  aiStage: 'intro',
  aiTurn: 0,
  aiTasted: [],
  aiActs: [],
  aiAnswered: false,
  layer: 0,
  circled: [],
  beat: 0,
  flash: 0,
};

export function phasesOf(t: Ticket): Phase[] {
  return t.witness
    ? ['open', 'scenes', 'save', 'tip', 'reflect', 'badge']
    : ['open', 'esc', 'act', 'result', 'save', 'tip', 'reflect', 'badge'];
}

export function useShift() {
  const [s, set] = useState<ShiftState>(initial);
  const sRef = useRef(s);
  sRef.current = s;

  const patch = (p: Partial<ShiftState>) => set((prev) => ({ ...prev, ...p }));
  const bump = (n: number) =>
    set((p) => ({ ...p, heat: Math.max(0, Math.min(100, p.heat + n)) }));

  const cur: Ticket | null = s.ti === null ? null : CKC.tickets[s.ti];
  const doneCount = Object.keys(s.results).length;
  const unlocked = doneCount >= 6 ? 8 : doneCount >= 3 ? 6 : 3;
  const canAdvance = !!cur && s.phase !== 'act';

  const bumpBeat = (n: number) => set((p) => ({ ...p, beat: Math.max(n, p.beat) }));
  const skipIntro = () => patch({ beat: 3 });

  const begin = () => {
    if (sRef.current.flash) return;
    patch({ flash: 1 });
    setTimeout(() => patch({ act: 'open', revealed: 1, flash: 0 }), 360);
  };

  const openNext = () => {
    if (sRef.current.revealed < CKC.coldOpen.length)
      set((p) => ({ ...p, revealed: p.revealed + 1 }));
    else patch({ act: 'pass' });
  };

  const toggleCoat = () => set((p) => ({ ...p, coat: !p.coat }));
  const openGloss = () => set((p) => ({ ...p, gloss: !p.gloss }));
  const backToRail = () => patch({ ti: null });
  const goto = (act: Act) => () => patch({ act, ti: null, coat: false, gloss: false });
  const restart = () =>
    set(() => ({ ...initial, beat: 3 }));

  const pickTicket = (i: number) => () =>
    patch({ ti: i, phase: 'open', choice: null, coat: false, gloss: false });

  const pickTool = (ok: boolean) => () => {
    bump(ok ? -5 : 7);
    patch({ phase: 'result', choice: ok ? 'ok' : 'soft' });
  };

  const choose = (k: string) => () => {
    const t = sRef.current.ti === null ? null : CKC.tickets[sRef.current.ti];
    if (!t || !t.decision) return;
    const ok = k === t.decision.answer;
    bump(ok ? -9 : 17);
    patch({ choice: k, phase: 'result' });
  };

  const finish = () => {
    set((p) => {
      const t = p.ti === null ? null : CKC.tickets[p.ti];
      if (!t) return p;
      const results = {
        ...p.results,
        [t.id]: {
          choice: p.choice,
          correct: t.decision ? p.choice === t.decision.answer : true,
          witness: !!t.witness,
        },
      };
      const badges = p.badges.includes(t.badge) ? p.badges : [...p.badges, t.badge];
      const tips = [...p.tips, t.tip];
      const n = Object.keys(results).length;
      const brk = CKC.interludes[n] ? n : null;
      return {
        ...p,
        results,
        badges,
        tips,
        ti: null,
        choice: null,
        phase: 'open',
        brk,
        taleFlip: false,
      };
    });
  };

  const next = () => {
    const p = sRef.current;
    const t = p.ti === null ? null : CKC.tickets[p.ti];
    if (!t) return;
    const list = phasesOf(t);
    const i = list.indexOf(p.phase);
    if (i < 0 || i === list.length - 1) return finish();
    patch({ phase: list[i + 1] });
  };

  const flipTale = () => set((p) => ({ ...p, taleFlip: !p.taleFlip }));
  const closeBreak = () => {
    const b = sRef.current.brk;
    patch({ brk: null, act: b === 8 ? 'ai' : 'pass' });
  };

  const aiStart = () => patch({ aiStage: 'run', aiTurn: 0, aiAnswered: false });
  const taste = () => {
    const p = sRef.current;
    if (p.aiTasted.includes(p.aiTurn)) return;
    set((prev) => ({ ...prev, aiTasted: [...prev.aiTasted, prev.aiTurn] }));
  };
  const aiAct = (kind: AiAction) => () => {
    if (sRef.current.aiAnswered) return;
    set((p) => ({ ...p, aiActs: [...p.aiActs, kind], aiAnswered: true }));
  };
  const aiNext = () => {
    const p = sRef.current;
    const nx = p.aiTurn + 1;
    if (nx >= CKC.ai.turns.length) {
      set((prev) => ({
        ...prev,
        aiStage: 'debrief',
        badges: prev.badges.includes('Sous-chef supervised')
          ? prev.badges
          : [...prev.badges, 'Sous-chef supervised'],
      }));
    } else patch({ aiTurn: nx, aiAnswered: false });
  };

  const toCake = () => patch({ act: 'cake', layer: 0 });
  const toEnd = () => patch({ act: 'end' });
  const pickLayer = (i: number) => () => patch({ layer: i });
  const circle = (i: number) => () =>
    set((p) => ({
      ...p,
      circled: p.circled.includes(i) ? p.circled.filter((x) => x !== i) : [...p.circled, i],
    }));

  return {
    s,
    sRef,
    cur,
    doneCount,
    unlocked,
    canAdvance,
    bumpBeat,
    skipIntro,
    begin,
    openNext,
    toggleCoat,
    openGloss,
    backToRail,
    goto,
    restart,
    pickTicket,
    pickTool,
    choose,
    next,
    flipTale,
    closeBreak,
    aiStart,
    taste,
    aiAct,
    aiNext,
    toCake,
    toEnd,
    pickLayer,
    circle,
  };
}

export type Shift = ReturnType<typeof useShift>;
