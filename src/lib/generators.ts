import { DMItem, Question, Language, ACE } from '@/data/types';
import { ACE_SCENARIOS, AceScenario } from '@/data/ace-scenarios';
import { shuffle, randomItem } from './utils';

/**
 * Generate a Reference Rush question
 * Shows key phrase, player picks the correct reference
 */
export function generateReferenceQuestion(
  lang: Language,
  pool: DMItem[],
  item: DMItem = randomItem(pool)
): Question {
  if (pool.length < 4) {
    throw new Error('Pool must have at least 4 items');
  }

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
  pool: DMItem[],
  item: DMItem = randomItem(pool)
): Question {
  if (pool.length < 4) {
    throw new Error('Pool must have at least 4 items');
  }

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
 * Generate an ACE Match question.
 * Step 1: which principle does this verse support? (any linked principle counts)
 * Step 2: which OTHER verse also supports that principle? (any offered verse
 * that shares the link counts) — so the second step teaches the
 * principle<->scripture mapping instead of repeating Reference Rush.
 */
export function generateACEQuestion(
  lang: Language,
  pool: DMItem[],
  item: DMItem = randomItem(pool)
): Question {
  if (pool.length < 4) {
    throw new Error('Pool must have at least 4 items');
  }

  const aceOptions: ACE[] = [
    'act_in_faith',
    'eternal_perspective',
    'divinely_appointed_sources',
  ];

  const links: ACE[] = item.aceLinks.length > 0 ? item.aceLinks : ['act_in_faith'];
  const primary = links[0];

  // The quote is transparent about its source; the questions live in the UI labels
  const prompt = `"${item.keyPhrase[lang]}" — ${item.reference}`;

  // Partner verse that shares the primary principle; fall back to the source
  // verse itself when the pool has no partner (tiny custom sets)
  const partners = pool.filter((d) => d.id !== item.id && d.aceLinks.includes(primary));
  const partner = partners.length > 0 ? randomItem(partners) : item;

  // Prefer distractors that do NOT share the principle; top up if needed
  const nonMatching = shuffle(
    pool.filter((d) => d.id !== item.id && d.id !== partner.id && !d.aceLinks.includes(primary))
  );
  let distractors = nonMatching.slice(0, 3);
  if (distractors.length < 3) {
    const fillers = shuffle(
      pool.filter((d) => d.id !== item.id && d.id !== partner.id && !distractors.includes(d))
    );
    distractors = [...distractors, ...fillers.slice(0, 3 - distractors.length)];
  }

  const optionItems = shuffle([partner, ...distractors]);
  const correctVerses = optionItems
    .filter((d) => d.id === partner.id || d.aceLinks.includes(primary))
    .map((d) => d.reference);

  return {
    type: 'ace',
    prompt,
    optionsACE: aceOptions,
    correctACEs: links,
    acePrimary: primary,
    optionsVerse: optionItems.map((d) => d.reference),
    correctVerses,
    meta: {
      id: item.id,
      ref: item.reference,
    },
  };
}

/**
 * Generate a scenario-based ACE question: a real-life situation where a
 * student applies a principle. Step 1: name the principle; step 2: pick a
 * verse that supports it. Returns null when the pool has no verse linked
 * to any scenario's principle.
 */
export function generateScenarioQuestion(
  lang: Language,
  pool: DMItem[],
  scenario?: AceScenario
): Question | null {
  if (pool.length < 4) {
    throw new Error('Pool must have at least 4 items');
  }

  const usable = ACE_SCENARIOS.filter((s) =>
    pool.some((item) => item.aceLinks.includes(s.principle))
  );
  const chosen = scenario ?? (usable.length > 0 ? randomItem(usable) : undefined);
  if (!chosen || !pool.some((item) => item.aceLinks.includes(chosen.principle))) {
    return null;
  }

  const aceOptions: ACE[] = [
    'act_in_faith',
    'eternal_perspective',
    'divinely_appointed_sources',
  ];

  const supporting = pool.filter((item) => item.aceLinks.includes(chosen.principle));
  const anchor = randomItem(supporting);
  const nonMatching = shuffle(
    pool.filter((item) => item.id !== anchor.id && !item.aceLinks.includes(chosen.principle))
  );
  let distractors = nonMatching.slice(0, 3);
  if (distractors.length < 3) {
    const fillers = shuffle(
      pool.filter((item) => item.id !== anchor.id && !distractors.includes(item))
    );
    distractors = [...distractors, ...fillers.slice(0, 3 - distractors.length)];
  }

  const optionItems = shuffle([anchor, ...distractors]);
  const correctVerses = optionItems
    .filter((item) => item.aceLinks.includes(chosen.principle))
    .map((item) => item.reference);

  return {
    type: 'ace',
    aceScenario: true,
    prompt: chosen.text[lang],
    optionsACE: aceOptions,
    correctACEs: [chosen.principle],
    acePrimary: chosen.principle,
    optionsVerse: optionItems.map((item) => item.reference),
    correctVerses,
    meta: {
      // Credit the anchor verse so crowns/mastery/review track a real passage
      id: anchor.id,
      ref: anchor.reference,
    },
  };
}

/**
 * Generate a mixed question for Lightning Ladder
 */
export function generateMixedQuestion(
  lang: Language,
  pool: DMItem[],
  item: DMItem = randomItem(pool)
): Question {
  const questionTypes: ('ref' | 'cloze' | 'ace')[] = ['ref', 'cloze', 'ace'];
  const type = randomItem(questionTypes);

  switch (type) {
    case 'ref':
      return generateReferenceQuestion(lang, pool, item);
    case 'cloze':
      return generateClozeQuestion(lang, pool, item);
    case 'ace':
      return generateACEQuestion(lang, pool, item);
    default:
      return generateReferenceQuestion(lang, pool, item);
  }
}

/**
 * Generate a full set of questions for a game round
 */
export function generateQuestionSet(
  lang: Language,
  pool: DMItem[],
  mode: 'reference_rush' | 'fill_verse' | 'ace_match' | 'lightning_ladder' | 'team_mode',
  count: number,
  focusId?: string
): Question[] {
  if (pool.length < 4) {
    throw new Error('Pool must have at least 4 items for question generation');
  }

  const questions: Question[] = [];

  // Deal one verse per question from a shuffled pool, so a verse only
  // repeats when count exceeds the pool size
  let order = shuffle(pool);

  // Daily quest: guarantee the featured verse appears (first question)
  if (focusId) {
    const focusIndex = order.findIndex((item) => item.id === focusId);
    if (focusIndex > 0) {
      order = [order[focusIndex], ...order.slice(0, focusIndex), ...order.slice(focusIndex + 1)];
    }
  }

  for (let i = 0; i < count; i++) {
    const item = order[i % order.length];

    switch (mode) {
      case 'reference_rush':
        questions.push(generateReferenceQuestion(lang, pool, item));
        break;
      case 'fill_verse':
        questions.push(generateClozeQuestion(lang, pool, item));
        break;
      case 'ace_match': {
        // Alternate verse-based and scenario-based questions
        const scenarioQuestion = i % 2 === 1 ? generateScenarioQuestion(lang, pool) : null;
        questions.push(scenarioQuestion ?? generateACEQuestion(lang, pool, item));
        break;
      }
      case 'lightning_ladder':
      case 'team_mode':
        questions.push(generateMixedQuestion(lang, pool, item));
        break;
      default:
        questions.push(generateReferenceQuestion(lang, pool, item));
    }
  }

  return questions;
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
