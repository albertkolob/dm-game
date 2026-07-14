import { describe, it, expect } from 'vitest';
import {
  generateReferenceQuestion,
  generateClozeQuestion,
  generateACEQuestion,
  generateQuestionSet,
  applyFiftyFifty,
} from './generators';
import { DMItem, ACE } from '@/data/types';

function makeItem(n: number, aces: ACE[] = ['act_in_faith']): DMItem {
  return {
    id: `item-${n}`,
    work: 'BOM',
    book: 'Book',
    reference: `Ref ${n}:${n}`,
    keyPhrase: { en: `phrase en ${n}`, es: `phrase es ${n}`, pt: `phrase pt ${n}` },
    cloze: { en: `cloze en ${n}`, es: `cloze es ${n}`, pt: `cloze pt ${n}` },
    tags: [],
    aceLinks: aces,
  };
}

const pool = [1, 2, 3, 4, 5, 6].map((n) => makeItem(n));

describe('generateReferenceQuestion', () => {
  it('throws when the pool has fewer than 4 items', () => {
    expect(() => generateReferenceQuestion('en', pool.slice(0, 3))).toThrow();
  });

  it('builds 4 unique options with the correct reference at correctIndex', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateReferenceQuestion('en', pool);
      expect(q.type).toBe('ref');
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(q.options![q.correctIndex!]).toBe(q.meta.ref);
    }
  });

  it('uses the key phrase of the answer item as the prompt', () => {
    const q = generateReferenceQuestion('en', pool);
    const item = pool.find((i) => i.id === q.meta.id)!;
    expect(q.prompt).toBe(item.keyPhrase.en);
  });
});

describe('generateClozeQuestion', () => {
  it('offers the answer key phrase at correctIndex', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateClozeQuestion('en', pool);
      const item = pool.find((it) => it.id === q.meta.id)!;
      expect(q.type).toBe('cloze');
      expect(q.prompt).toBe(item.cloze.en);
      expect(q.options![q.correctIndex!]).toBe(item.keyPhrase.en);
    }
  });
});

describe('generateACEQuestion', () => {
  it('accepts every principle the verse is linked to', () => {
    const multiPool = [
      makeItem(1, ['act_in_faith', 'eternal_perspective']),
      makeItem(2, ['act_in_faith']),
      makeItem(3, ['divinely_appointed_sources']),
      makeItem(4, ['eternal_perspective']),
    ];
    const q = generateACEQuestion('en', multiPool, multiPool[0]);
    expect(q.correctACEs).toEqual(['act_in_faith', 'eternal_perspective']);
    expect(q.acePrimary).toBe('act_in_faith');
  });

  it('asks for a DIFFERENT verse sharing the principle when one exists', () => {
    const p = [
      makeItem(1, ['act_in_faith']),
      makeItem(2, ['act_in_faith']), // the only possible partner
      makeItem(3, ['divinely_appointed_sources']),
      makeItem(4, ['eternal_perspective']),
      makeItem(5, ['eternal_perspective']),
    ];
    for (let i = 0; i < 15; i++) {
      const q = generateACEQuestion('en', p, p[0]);
      expect(q.optionsVerse).toHaveLength(4);
      // the source verse is not the answer to its own question
      expect(q.optionsVerse).not.toContain(p[0].reference);
      expect(q.correctVerses).toEqual([p[1].reference]);
    }
  });

  it('counts any offered verse that shares the principle as correct', () => {
    const p = [
      makeItem(1, ['act_in_faith']),
      makeItem(2, ['act_in_faith']),
      makeItem(3, ['act_in_faith']),
      makeItem(4, ['act_in_faith']),
      makeItem(5, ['divinely_appointed_sources']),
    ];
    const q = generateACEQuestion('en', p, p[0]);
    for (const verse of q.correctVerses!) {
      const owner = p.find((it) => it.reference === verse)!;
      expect(owner.aceLinks).toContain('act_in_faith');
    }
    expect(q.correctVerses!.length).toBeGreaterThanOrEqual(1);
  });

  it('falls back to the source verse when no partner shares the principle', () => {
    const p = [
      makeItem(1, ['divinely_appointed_sources']),
      makeItem(2, ['act_in_faith']),
      makeItem(3, ['act_in_faith']),
      makeItem(4, ['eternal_perspective']),
    ];
    const q = generateACEQuestion('en', p, p[0]);
    expect(q.correctVerses).toContain(p[0].reference);
  });
});

describe('generateQuestionSet', () => {
  it('returns the requested number of questions', () => {
    const questions = generateQuestionSet('en', pool, 'reference_rush', 5);
    expect(questions).toHaveLength(5);
  });

  it('avoids repeating a verse when the pool is large enough', () => {
    const questions = generateQuestionSet('en', pool, 'reference_rush', 6);
    const ids = questions.map((q) => q.meta.id);
    expect(new Set(ids).size).toBe(6);
  });

  it('generates only the matching type for single-type modes', () => {
    expect(generateQuestionSet('en', pool, 'fill_verse', 4).every((q) => q.type === 'cloze')).toBe(true);
    expect(generateQuestionSet('en', pool, 'ace_match', 4).every((q) => q.type === 'ace')).toBe(true);
  });

  it('throws when the pool has fewer than 4 items', () => {
    expect(() => generateQuestionSet('en', pool.slice(0, 2), 'reference_rush', 4)).toThrow();
  });

  it('puts the focus verse first when focusId is given (daily quest)', () => {
    for (let i = 0; i < 10; i++) {
      const questions = generateQuestionSet('en', pool, 'reference_rush', 3, 'item-5');
      expect(questions[0].meta.id).toBe('item-5');
    }
  });
});

describe('applyFiftyFifty', () => {
  it('keeps the correct answer among 2 remaining options', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateReferenceQuestion('en', pool);
      const reduced = applyFiftyFifty(q);
      expect(reduced.options).toHaveLength(2);
      expect(reduced.options![reduced.correctIndex!]).toBe(q.options![q.correctIndex!]);
    }
  });
});
