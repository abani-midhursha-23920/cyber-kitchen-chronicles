// Content model for THE PASS — mirrors the shape of the handoff's content.js (window.CKC).
// Types only; the prose in content.ts is the book's voice and must not be edited.

export interface Cover {
  title: string;
  by: string;
  tagline: string;
  edition: string;
}

export interface TicketTool {
  name: string;
  sub: string;
  ok: boolean;
}

export interface DecisionOption {
  k: string;
  t: string;
}

export interface Decision {
  prompt: string;
  sub: string;
  options: DecisionOption[];
  answer: 'B' | 'D' | 'E';
  wrongs: Record<string, string>;
  right: string;
}

export interface Scene {
  who: string;
  line: string;
  note: string;
}

export interface Ticket {
  id: string;
  art: string;
  course: string;
  no: string;
  dish: string;
  sub: string;
  station: string;
  concept: string;
  open: string[];
  escTitle?: string;
  esc?: string;
  witness?: true;
  scenes?: Scene[];
  tools?: TicketTool[];
  decision?: Decision;
  save: string;
  toolList: [name: string, what: string][];
  tip: string;
  reflection: string;
  badge: string;
}

export interface Interlude {
  title: string;
  law: [title: string, line: string];
  tale: string;
  truth: string;
  challenge: [question: string, answer: string];
  next: string;
}

export type AiAction = 'approve' | 'question' | 'block';

export interface AiTurn {
  archetype: string;
  arch: string;
  pre: string;
  poison: string;
  post: string;
  technique: string;
  techDesc: string;
  risk: string;
  best: AiAction;
  fb: Record<AiAction, string>;
}

export interface AiContent {
  intro: string[];
  howto: string;
  turns: AiTurn[];
  mitigations: [title: string, description: string][];
  finalStir: string;
}

export interface Topping {
  t: string;
  d: string;
  real: boolean;
}

export interface CakeContent {
  intro: string;
  layers: [name: string, description: string, category: string, action: string][];
  fillings: string;
  toppingIntro: string;
  toppings: Topping[];
  outro: string;
}

export interface Closing {
  title: string;
  body: string[];
  sign: string;
}

export interface CKCData {
  cover: Cover;
  coldOpen: string[];
  tickets: Ticket[];
  interludes: Record<number, Interlude>;
  ai: AiContent;
  cake: CakeContent;
  glossary: [term: string, definition: string][];
  closing: Closing;
}
