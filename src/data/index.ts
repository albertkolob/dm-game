import { DM_OT } from './dm-ot';
import { DM_NT } from './dm-nt';
import { DM_BOM } from './dm-bom';
import { DM_DC } from './dm-dc';
import { DM_PGP } from './dm-pgp';
import { DMItem, Work } from './types';

// Combined master list of all DM items
export const DM_MASTER: DMItem[] = [
  ...DM_OT,
  ...DM_NT,
  ...DM_BOM,
  ...DM_DC,
  ...DM_PGP,
];

// Get items by work
export function getItemsByWork(work: Work): DMItem[] {
  return DM_MASTER.filter(item => item.work === work);
}

// Get items by book
export function getItemsByBook(book: string): DMItem[] {
  return DM_MASTER.filter(item => item.book === book);
}

// Get items by IDs
export function getItemsByIds(ids: string[]): DMItem[] {
  return DM_MASTER.filter(item => ids.includes(item.id));
}

// Get all unique books
export function getAllBooks(): string[] {
  return [...new Set(DM_MASTER.map(item => item.book))];
}

// Get books by work
export function getBooksByWork(work: Work): string[] {
  return [...new Set(DM_MASTER.filter(item => item.work === work).map(item => item.book))];
}

// Presets for quick selection
export const PRESETS = {
  all_dm: DM_MASTER.map(item => item.id),

  // By work
  old_testament: DM_OT.map(item => item.id),
  new_testament: DM_NT.map(item => item.id),
  book_of_mormon: DM_BOM.map(item => item.id),
  doctrine_covenants: DM_DC.map(item => item.id),
  pearl_great_price: DM_PGP.map(item => item.id),

  // Popular subsets
  dc_76_131: [
    "dc-76-22-24",
    "dc-82-10",
    "dc-84-20-22",
    "dc-84-33-39",
    "dc-88-118",
    "dc-89-18-21",
    "dc-107-8",
    "dc-121-34-36",
    "dc-121-41-42",
    "dc-130-22-23",
    "dc-131-1-4",
  ],

  bom_core: [
    "bom-1ne-3-7",
    "bom-2ne-2-25",
    "bom-2ne-2-27",
    "bom-2ne-31-19-20",
    "bom-mosiah-2-17",
    "bom-mosiah-3-19",
    "bom-alma-7-11-13",
    "bom-alma-32-21",
    "bom-alma-41-10",
    "bom-helaman-5-12",
    "bom-ether-12-27",
    "bom-moroni-10-4-5",
  ],

  faith_action: DM_MASTER.filter(item =>
    item.aceLinks.includes('act_in_faith')
  ).map(item => item.id),

  eternal_perspective: DM_MASTER.filter(item =>
    item.aceLinks.includes('eternal_perspective')
  ).map(item => item.id),

  divine_sources: DM_MASTER.filter(item =>
    item.aceLinks.includes('divinely_appointed_sources')
  ).map(item => item.id),
};

export type PresetKey = keyof typeof PRESETS;

// Re-export types
export * from './types';
