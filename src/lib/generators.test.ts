import { describe, it, expect } from 'vitest';
import {
  generateReferenceQuestion,
  generateClozeQuestion,
  generateACEQuestion,
  generateQuestionSet,
  applyFiftyFifty,
} from './generators';
import { DMItem, ACE } from '@/data/types';

function makeItem(n: number, ace: ACE = 'act_in_faith'): DMItem {
  return {
    id: `item-${n}`,
    work: 'BOM',
    book: 'Book',
    reference: `Ref ${n}:${n}`,
    keyPhrase: { en: `phrase en ${n}`, es: `phrase es ${n}`, pt: `phrase pt ${n}` },
    cloze: { en: `cloze en ${n}`, es: `cloze es ${n}`, pt: `cloze pt ${n}` },
    tags: [],
    aceLinks: [ace],
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
  it('sets correctACE from the item and correctVerse to its reference', () => {
    for (let i = 0; i < 20; i++) {
      const q = generateACEQuestion('en', pool);
      const item = pool.find((it) => it.id === q.meta.id)!;
      expect(q.type).toBe('ace');
      expect(q.correctACE).toBe(item.aceLinks[0]);
      expect(q.correctVerse).toBe(item.reference);
      expect(q.optionsVerse).toContain(item.reference);
      expect(q.optionsVerse).toHaveLength(4);
    }
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
