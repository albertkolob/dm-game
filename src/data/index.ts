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

// Presets for quick selection.
// Course presets follow the official seminary courses: the Old Testament
// course includes Moses/Abraham, and the D&C course includes JS—History.
export const PRESETS = {
  all_dm: DM_MASTER.map(item => item.id),

  // By course
  old_testament: ["pgp-moses-1-39", "pgp-moses-7-18", "pgp-abr-2-9-11", "pgp-abr-3-22-23", "ot-gen-1-26-27", "ot-gen-2-24", "ot-gen-39-9", "ot-ex-20-3-17", "ot-josh-24-15", "ot-ps-24-3-4", "ot-prov-3-5-6", "ot-isa-1-18", "ot-isa-5-20", "ot-isa-29-13-14", "ot-isa-53-3-5", "ot-isa-58-6-7", "ot-isa-58-13-14", "ot-jer-1-4-5", "ot-ezek-3-16-17", "ot-ezek-37-15-17", "ot-dan-2-44-45", "ot-amos-3-7", "ot-mal-3-8-10", "ot-mal-4-5-6"],
  new_testament: ["nt-matt-5-14-16", "nt-matt-11-28-30", "nt-matt-16-15-19", "nt-matt-22-36-39", "nt-luke-2-10-12", "nt-luke-22-19-20", "nt-luke-24-36-39", "nt-john-3-5", "nt-john-3-16", "nt-john-7-17", "nt-john-17-3", "nt-1cor-6-19-20", "nt-1cor-11-11", "nt-1cor-15-20-22", "nt-1cor-15-40-42", "nt-eph-1-10", "nt-eph-2-19-20", "nt-2thess-2-1-3", "nt-2tim-3-15-17", "nt-heb-12-9", "nt-james-1-5-6", "nt-james-2-17-18", "nt-1pet-4-6", "nt-rev-20-12"],
  book_of_mormon: ["bom-1ne-3-7", "bom-2ne-2-25", "bom-2ne-2-27", "bom-2ne-26-33", "bom-2ne-28-30", "bom-2ne-32-3", "bom-2ne-32-8-9", "bom-mosiah-2-17", "bom-mosiah-2-41", "bom-mosiah-3-19", "bom-mosiah-4-9", "bom-mosiah-18-8-10", "bom-alma-7-11-13", "bom-alma-34-9-10", "bom-alma-39-9", "bom-alma-41-10", "bom-helaman-5-12", "bom-3ne-11-10-11", "bom-3ne-12-48", "bom-3ne-27-20", "bom-ether-12-6", "bom-ether-12-27", "bom-moroni-7-45-48", "bom-moroni-10-4-5"],
  doctrine_covenants: ["pgp-js-h-1-15-20", "dc-1-30", "dc-1-37-38", "dc-6-36", "dc-8-2-3", "dc-13-1", "dc-18-10-11", "dc-18-15-16", "dc-19-16-19", "dc-21-4-6", "dc-29-10-11", "dc-49-15-17", "dc-58-42-43", "dc-64-9-11", "dc-76-22-24", "dc-82-10", "dc-84-20-22", "dc-88-118", "dc-89-18-21", "dc-107-8", "dc-121-36-41-42", "dc-130-22-23", "dc-131-1-4", "dc-135-3"],
  pearl_great_price: DM_PGP.map(item => item.id),

  // Popular subsets
  dc_76_131: [
    "dc-76-22-24",
    "dc-82-10",
    "dc-84-20-22",
    "dc-88-118",
    "dc-89-18-21",
    "dc-107-8",
    "dc-121-36-41-42",
    "dc-130-22-23",
    "dc-131-1-4",
  ],

  bom_core: [
    "bom-1ne-3-7",
    "bom-2ne-2-25",
    "bom-2ne-2-27",
    "bom-mosiah-2-17",
    "bom-mosiah-3-19",
    "bom-alma-7-11-13",
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
