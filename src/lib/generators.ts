import { DMItem, Question, Language, ACE } from '@/data/types';
import { shuffle, randomItem } from './utils';

/**
 * Generate a Reference Rush question
 * Shows key phrase, player picks the correct reference
 */
export function generateReferenceQuestion(
  lang: Language,
  pool: DMItem[]
): Question {
  if (pool.length < 4) {
    throw new Error('Pool must have at least 4 items');
  }

  const item = randomItem(pool);

  // Get distractors from the same work preferably
  let distractors = pool.filter((d) => d.id !== item.id && d.work === item.work);

  // If not enough from same work, get from other works
  if (distractors.length < 3) {
    distractors = pool.filter((d) => d.id !== item.id);
  }

  distractors = shuffle(distractors).slice(0, 3);

  const options = shuffle([
    item.reference,
    ...distractors.map((d) => d.reference),
  ]);

  return {
    type: 'ref',
    prompt: item.keyPhrase[lang],
    options,
    correctIndex: options.indexOf(item.reference),
    meta: {
      id: item.id,
      ref: item.reference,
    },
  };
}

/**
 * Generate a Fill the Verse (cloze) question
 * Shows cloze text with blanks, player picks the correct key phrase
 */
export function generateClozeQuestion(
  lang: Language,
  pool: DMItem[]
): Question {
  if (pool.length < 4) {
    throw new Error('Pool must have at least 4 items');
  }

  const item = randomItem(pool);

  // Get distractors
  const distractors = shuffle(pool.filter((d) => d.id !== item.id))
    .slice(0, 3)
    .map((d) => d.keyPhrase[lang]);

  const options = shuffle([item.keyPhrase[lang], ...distractors]);

  return {
    type: 'cloze',
    prompt: item.cloze[lang],
    options,
    correctIndex: options.indexOf(item.keyPhrase[lang]),
    meta: {
      id: item.id,
      ref: item.reference,
    },
  };
}

/**
 * Generate an ACE Match question
 * Player picks the ACE principle and a supporting verse
 */
export function generateACEQuestion(
  lang: Language,
  pool: DMItem[]
): Question {
  if (pool.length < 4) {
    throw new Error('Pool must have at least 4 items');
  }

  const item = randomItem(pool);
  const aceOptions: ACE[] = [
    'act_in_faith',
    'eternal_perspective',
    'divinely_appointed_sources',
  ];

  // Prompt based on language
  const prompts = {
    en: `"${item.keyPhrase[lang]}" — Choose the ACE principle and a supporting verse.`,
    es: `"${item.keyPhrase[lang]}" — Elige el principio ACE y un versículo de apoyo.`,
    pt: `"${item.keyPhrase[lang]}" — Escolha o princípio ACE e um versículo de apoio.`,
  };

  // Get distractor verses
  const distractorVerses = shuffle(pool.filter((d) => d.id !== item.id))
    .slice(0, 3)
    .map((d) => d.reference);

  const verseOptions = shuffle([item.reference, ...distractorVerses]);

  return {
    type: 'ace',
    prompt: prompts[lang],
    optionsACE: aceOptions,
    correctACE: item.aceLinks[0] || 'act_in_faith',
    optionsVerse: verseOptions,
    correctVerse: item.reference,
    meta: {
      id: item.id,
      ref: item.reference,
    },
  };
}

/**
 * Generate a mixed question for Lightning Ladder
 */
export function generateMixedQuestion(
  lang: Language,
  pool: DMItem[]
): Question {
  const questionTypes: ('ref' | 'cloze' | 'ace')[] = ['ref', 'cloze', 'ace'];
  const type = randomItem(questionTypes);

  switch (type) {
    case 'ref':
      return generateReferenceQuestion(lang, pool);
    case 'cloze':
      return generateClozeQuestion(lang, pool);
    case 'ace':
      return generateACEQuestion(lang, pool);
    default:
      return generateReferenceQuestion(lang, pool);
  }
}

/**
 * Generate a full set of questions for a game round
 */
export function generateQuestionSet(
  lang: Language,
  pool: DMItem[],
  mode: 'reference_rush' | 'fill_verse' | 'ace_match' | 'lightning_ladder' | 'team_mode',
  count: number
): Question[] {
  if (pool.length < 4) {
    throw new Error('Pool must have at least 4 items for question generation');
  }

  const questions: Question[] = [];
  const usedIds = new Set<string>();

  for (let i = 0; i < count; i++) {
    let question: Question;
    let attempts = 0;
    const maxAttempts = pool.length * 2;

    do {
      switch (mode) {
        case 'reference_rush':
          question = generateReferenceQuestion(lang, pool);
          break;
        case 'fill_verse':
          question = generateClozeQuestion(lang, pool);
          break;
        case 'ace_match':
          question = generateACEQuestion(lang, pool);
          break;
        case 'lightning_ladder':
        case 'team_mode':
          question = generateMixedQuestion(lang, pool);
          break;
        default:
          question = generateReferenceQuestion(lang, pool);
      }
      attempts++;
    } while (usedIds.has(question.meta.id) && attempts < maxAttempts);

    usedIds.add(question.meta.id);
    questions.push(question);
  }

  return questions;
}

/**
 * Calculate points for a correct answer
 */
export function calculatePoints(
  mode: 'reference_rush' | 'fill_verse' | 'ace_match' | 'lightning_ladder' | 'team_mode',
  isCorrect: boolean,
  isPartial: boolean = false
): number {
  if (!isCorrect && !isPartial) {
    return mode === 'reference_rush' || mode === 'fill_verse' ? -25 : 0;
  }

  switch (mode) {
    case 'reference_rush':
    case 'fill_verse':
      return 100;
    case 'ace_match':
      return isPartial ? 50 : 100;
    case 'lightning_ladder':
    case 'team_mode':
      return 100;
    default:
      return 100;
  }
}

/**
 * Apply 50/50 hint - remove 2 wrong options
 */
export function applyFiftyFifty(question: Question): Question {
  if (!question.options || question.correctIndex === undefined) {
    return question;
  }

  const correctOption = question.options[question.correctIndex];
  const wrongOptions = question.options.filter((_, i) => i !== question.correctIndex);
  const keptWrong = randomItem(wrongOptions);

  const newOptions = shuffle([correctOption, keptWrong]);

  return {
    ...question,
    options: newOptions,
    correctIndex: newOptions.indexOf(correctOption),
  };
}

/**
 * Get hint for a question (first letter of correct answer)
 */
export function getHint(question: Question): string {
  if (question.options && question.correctIndex !== undefined) {
    const correct = question.options[question.correctIndex];
    const words = correct.split(' ').slice(0, 2);
    return words.map((w) => w[0]).join('') + '...';
  }
  return '...';
}
