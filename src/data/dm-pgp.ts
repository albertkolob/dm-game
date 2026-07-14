import { DMItem } from './types';

// Pearl of Great Price passages (studied in the OT and D&C courses)
// Source: Doctrinal Mastery Core Document (2023), churchofjesuschrist.org.
// Spanish/Portuguese key phrases follow the Church's official translations;
// see docs/TRANSLATION-REVIEW.md for per-entry verification status.
export const DM_PGP: DMItem[] = [
  {
    id: "pgp-moses-1-39",
    work: "PGP",
    book: "Moses",
    reference: "Moses 1:39",
    keyPhrase: {
      en: "This is my work and my glory—to bring to pass the immortality and eternal life of man.",
      es: "Esta es mi obra y mi gloria: Llevar a cabo la inmortalidad y la vida eterna del hombre.",
      pt: "Esta é minha obra e minha glória: Levar a efeito a imortalidade e vida eterna do homem."
    },
    cloze: {
      en: "This is my work and my __________—to bring to pass the __________ and eternal life of man.",
      es: "Esta es mi obra y mi __________: Llevar a cabo la __________ y la vida eterna del hombre.",
      pt: "Esta é minha obra e minha __________: Levar a efeito a __________ e vida eterna do homem."
    },
    tags: ["plan of salvation"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "pgp-moses-7-18",
    work: "PGP",
    book: "Moses",
    reference: "Moses 7:18",
    keyPhrase: {
      en: "The Lord called his people Zion, because they were of one heart and one mind.",
      es: "El Señor llamó Sion a su pueblo, porque eran uno en corazón y voluntad.",
      pt: "O Senhor chamou seu povo de Sião, porque eram unos de coração e vontade."
    },
    cloze: {
      en: "The Lord __________ his __________ Zion, because they were of one heart and one mind.",
      es: "El Señor llamó Sion a su pueblo, porque eran uno en __________ y __________.",
      pt: "O Senhor chamou seu povo de Sião, porque eram unos de __________ e __________."
    },
    tags: ["zion", "unity"],
    aceLinks: ["act_in_faith", "eternal_perspective"]
  },
  {
    id: "pgp-abr-2-9-11",
    work: "PGP",
    book: "Abraham",
    reference: "Abraham 2:9–11",
    keyPhrase: {
      en: "The Lord promised Abraham that his seed would \"bear this ministry and Priesthood unto all nations.\"",
      es: "El Señor prometió a Abraham que su posteridad llevaría \"este ministerio y sacerdocio a todas las naciones\".",
      pt: "O Senhor prometeu a Abraão que sua descendência levaria \"este ministério e Sacerdócio a todas as nações\"."
    },
    cloze: {
      en: "The Lord __________ Abraham that his seed would \"bear this ministry and __________ unto all nations.\"",
      es: "El Señor prometió a Abraham que su __________ llevaría \"este __________ y sacerdocio a todas las naciones\".",
      pt: "O Senhor prometeu a Abraão que sua __________ levaria \"este __________ e Sacerdócio a todas as nações\"."
    },
    tags: ["abrahamic covenant", "priesthood"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "pgp-abr-3-22-23",
    work: "PGP",
    book: "Abraham",
    reference: "Abraham 3:22–23",
    keyPhrase: {
      en: "As spirits we \"were organized before the world was.\"",
      es: "Como espíritus, fuimos \"organizados antes de que existiera el mundo\".",
      pt: "Como seres espirituais, fomos \"organizados antes de existir o mundo\"."
    },
    cloze: {
      en: "As __________ we \"were __________ before the world was.\"",
      es: "Como __________, fuimos \"__________ antes de que existiera el mundo\".",
      pt: "Como seres __________, fomos \"__________ antes de existir o mundo\"."
    },
    tags: ["premortal life"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "pgp-js-h-1-15-20",
    work: "PGP",
    book: "Joseph Smith—History",
    reference: "Joseph Smith—History 1:15–20",
    keyPhrase: {
      en: "Joseph Smith \"saw two Personages, whose brightness and glory defy all description.\"",
      es: "José Smith \"vio a dos Personajes, cuyo fulgor y gloria no admiten descripción\".",
      pt: "Joseph Smith \"viu dois Personagens cujo esplendor e glória desafiam qualquer descrição\"."
    },
    cloze: {
      en: "Joseph Smith \"saw two __________, whose brightness and glory defy all __________.\"",
      es: "José Smith \"vio a dos __________, cuyo fulgor y gloria no admiten __________\".",
      pt: "Joseph Smith \"viu dois __________ cujo __________ e glória desafiam qualquer descrição\"."
    },
    tags: ["first vision", "restoration"],
    aceLinks: ["divinely_appointed_sources"]
  }
];
