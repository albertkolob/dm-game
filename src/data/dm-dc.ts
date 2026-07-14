import { DMItem } from './types';

// Doctrine and Covenants course passages (D&C portion)
// Source: Doctrinal Mastery Core Document (2023), churchofjesuschrist.org.
// Spanish/Portuguese key phrases follow the Church's official translations;
// see docs/TRANSLATION-REVIEW.md for per-entry verification status.
export const DM_DC: DMItem[] = [
  {
    id: "dc-1-30",
    work: "DC",
    book: "D&C",
    reference: "D&C 1:30",
    keyPhrase: {
      en: "The only true and living church.",
      es: "La única iglesia verdadera y viviente.",
      pt: "A única igreja verdadeira e viva."
    },
    cloze: {
      en: "The only true and __________ __________.",
      es: "La única iglesia __________ y __________.",
      pt: "A única __________ __________ e viva."
    },
    tags: ["church", "restoration"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "dc-1-37-38",
    work: "DC",
    book: "D&C",
    reference: "D&C 1:37–38",
    keyPhrase: {
      en: "Whether by mine own voice or by the voice of my servants, it is the same.",
      es: "Sea por mi propia voz o por la voz de mis siervos, es lo mismo.",
      pt: "Seja pela minha própria voz ou pela voz de meus servos, é o mesmo."
    },
    cloze: {
      en: "__________ by mine own voice or by the voice of my __________, it is the same.",
      es: "Sea por mi __________ voz o por la voz de mis __________, es lo mismo.",
      pt: "Seja pela minha __________ voz ou pela voz de meus __________, é o mesmo."
    },
    tags: ["prophets", "revelation"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "dc-6-36",
    work: "DC",
    book: "D&C",
    reference: "D&C 6:36",
    keyPhrase: {
      en: "Look unto me in every thought; doubt not, fear not.",
      es: "Mirad hacia mí en todo pensamiento; no dudéis; no temáis.",
      pt: "Buscai-me em cada pensamento; não duvideis, não temais."
    },
    cloze: {
      en: "Look unto me in __________ __________; doubt not, fear not.",
      es: "Mirad hacia mí en todo __________; no __________; no temáis.",
      pt: "__________-me em cada __________; não duvideis, não temais."
    },
    tags: ["faith", "peace"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "dc-8-2-3",
    work: "DC",
    book: "D&C",
    reference: "D&C 8:2–3",
    keyPhrase: {
      en: "I will tell you in your mind and in your heart, by the Holy Ghost.",
      es: "Hablaré a tu mente y a tu corazón por medio del Espíritu Santo.",
      pt: "Falar-te-ei em tua mente e em teu coração pelo Espírito Santo."
    },
    cloze: {
      en: "I will tell you in your mind and in your __________, by the Holy __________.",
      es: "__________ a tu mente y a tu corazón por medio del __________ Santo.",
      pt: "__________-te-ei em tua mente e em teu coração pelo __________ Santo."
    },
    tags: ["revelation", "holy ghost"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "dc-13-1",
    work: "DC",
    book: "D&C",
    reference: "D&C 13:1",
    keyPhrase: {
      en: "The Aaronic Priesthood \"holds the keys of the ministering of angels, and of the gospel of repentance, and of baptism.\"",
      es: "El Sacerdocio Aarónico \"tiene las llaves del ministerio de ángeles, y del evangelio de arrepentimiento, y del bautismo\".",
      pt: "O Sacerdócio Aarônico \"possui as chaves do ministério de anjos e do evangelho do arrependimento e do batismo\"."
    },
    cloze: {
      en: "The Aaronic __________ \"holds the keys of the __________ of angels, and of the gospel of repentance, and of baptism.\"",
      es: "El __________ Aarónico \"tiene las llaves del ministerio de ángeles, y del evangelio de __________, y del bautismo\".",
      pt: "O __________ Aarônico \"possui as chaves do ministério de anjos e do evangelho do __________ e do batismo\"."
    },
    tags: ["priesthood"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "dc-18-10-11",
    work: "DC",
    book: "D&C",
    reference: "D&C 18:10–11",
    keyPhrase: {
      en: "The worth of souls is great in the sight of God.",
      es: "El valor de las almas es grande a la vista de Dios.",
      pt: "O valor das almas é grande à vista de Deus."
    },
    cloze: {
      en: "The __________ of __________ is great in the sight of God.",
      es: "El __________ de las almas es __________ a la vista de Dios.",
      pt: "O __________ das almas é __________ à vista de Deus."
    },
    tags: ["worth of souls"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "dc-18-15-16",
    work: "DC",
    book: "D&C",
    reference: "D&C 18:15–16",
    keyPhrase: {
      en: "How great will be your joy if you should bring many souls unto me!",
      es: "¡Cuán grande no será vuestro gozo si me trajereis muchas almas!",
      pt: "Quão grande será vossa alegria se me trouxerdes muitas almas!"
    },
    cloze: {
      en: "How __________ will be your joy if you __________ bring many souls unto me!",
      es: "¡Cuán __________ no será vuestro gozo si me __________ muchas almas!",
      pt: "Quão grande será vossa __________ se me __________ muitas almas!"
    },
    tags: ["missionary work", "joy"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "dc-19-16-19",
    work: "DC",
    book: "D&C",
    reference: "D&C 19:16–19",
    keyPhrase: {
      en: "I, [Jesus Christ], have suffered these things for all.",
      es: "Yo, [Jesucristo], he padecido estas cosas por todos.",
      pt: "Eu, [Jesus Cristo], sofri essas coisas por todos."
    },
    cloze: {
      en: "I, [Jesus __________], have __________ these things for all.",
      es: "Yo, [__________], he __________ estas cosas por todos.",
      pt: "Eu, [__________ __________], sofri essas coisas por todos."
    },
    tags: ["atonement", "repentance"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "dc-21-4-6",
    work: "DC",
    book: "D&C",
    reference: "D&C 21:4–6",
    keyPhrase: {
      en: "The prophet's \"word ye shall receive, as if from mine own mouth.\"",
      es: "Recibiréis la palabra del profeta \"como si viniera de mi propia boca\".",
      pt: "As palavras do profeta \"recebereis como de minha própria boca\"."
    },
    cloze: {
      en: "The __________'s \"word ye shall __________, as if from mine own mouth.\"",
      es: "__________ la __________ del profeta \"como si viniera de mi propia boca\".",
      pt: "As __________ do profeta \"__________ como de minha própria boca\"."
    },
    tags: ["prophets"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "dc-29-10-11",
    work: "DC",
    book: "D&C",
    reference: "D&C 29:10–11",
    keyPhrase: {
      en: "I will reveal myself from heaven with power and great glory … and dwell in righteousness with men on earth a thousand years.",
      es: "Con poder y gran gloria me revelaré desde los cielos … y moraré en rectitud con los hombres sobre la tierra mil años.",
      pt: "Revelar-me-ei do céu com poder e grande glória … e em retidão habitarei com os homens na Terra por mil anos."
    },
    cloze: {
      en: "I will reveal myself from heaven with power and great glory … and dwell in __________ with men on earth a __________ years.",
      es: "Con poder y gran gloria me __________ desde los cielos … y moraré en __________ con los hombres sobre la tierra mil años.",
      pt: "__________-me-ei do céu com poder e grande glória … e em retidão __________ com os homens na Terra por mil anos."
    },
    tags: ["second coming", "millennium"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "dc-49-15-17",
    work: "DC",
    book: "D&C",
    reference: "D&C 49:15–17",
    keyPhrase: {
      en: "Marriage is ordained of God.",
      es: "El matrimonio lo decretó Dios.",
      pt: "O casamento foi instituído por Deus."
    },
    cloze: {
      en: "__________ is __________ of God.",
      es: "El __________ lo __________ Dios.",
      pt: "O __________ foi __________ por Deus."
    },
    tags: ["marriage", "family"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "dc-58-42-43",
    work: "DC",
    book: "D&C",
    reference: "D&C 58:42–43",
    keyPhrase: {
      en: "He who has repented of his sins, the same is forgiven.",
      es: "Quien se ha arrepentido de sus pecados es perdonado.",
      pt: "Aquele que se arrependeu de seus pecados é perdoado."
    },
    cloze: {
      en: "He who has __________ of his sins, the same is __________.",
      es: "Quien se ha __________ de sus pecados es __________.",
      pt: "Aquele que se __________ de seus pecados é __________."
    },
    tags: ["repentance", "forgiveness"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "dc-64-9-11",
    work: "DC",
    book: "D&C",
    reference: "D&C 64:9–11",
    keyPhrase: {
      en: "Of you it is required to forgive all men.",
      es: "A vosotros os es requerido perdonar a todos los hombres.",
      pt: "De vós é exigido que perdoeis a todos os homens."
    },
    cloze: {
      en: "Of you it is __________ to __________ all men.",
      es: "A __________ os es __________ perdonar a todos los hombres.",
      pt: "De vós é __________ que __________ a todos os homens."
    },
    tags: ["forgiveness"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "dc-76-22-24",
    work: "DC",
    book: "D&C",
    reference: "D&C 76:22–24",
    keyPhrase: {
      en: "By [Jesus Christ] the worlds are and were created.",
      es: "Por [Jesucristo] … los mundos son y fueron creados.",
      pt: "Por [Jesus Cristo] … os mundos são e foram criados."
    },
    cloze: {
      en: "By [Jesus __________] the worlds are and were __________.",
      es: "Por [__________] … los mundos son y fueron __________.",
      pt: "Por [Jesus __________] … os mundos são e foram __________."
    },
    tags: ["jesus christ", "testimony"],
    aceLinks: ["divinely_appointed_sources", "eternal_perspective"]
  },
  {
    id: "dc-82-10",
    work: "DC",
    book: "D&C",
    reference: "D&C 82:10",
    keyPhrase: {
      en: "I, the Lord, am bound when ye do what I say.",
      es: "Yo, el Señor, estoy obligado cuando hacéis lo que os digo.",
      pt: "Eu, o Senhor, estou obrigado quando fazeis o que eu digo."
    },
    cloze: {
      en: "I, the Lord, am __________ when ye do what I say.",
      es: "Yo, el Señor, estoy __________ cuando __________ lo que os digo.",
      pt: "Eu, o __________, estou __________ quando fazeis o que eu digo."
    },
    tags: ["obedience", "promises"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "dc-84-20-22",
    work: "DC",
    book: "D&C",
    reference: "D&C 84:20–22",
    keyPhrase: {
      en: "In the ordinances thereof, the power of godliness is manifest.",
      es: "En sus ordenanzas se manifiesta el poder de la divinidad.",
      pt: "Em suas ordenanças manifesta-se o poder da divindade."
    },
    cloze: {
      en: "In the __________ thereof, the power of __________ is manifest.",
      es: "En sus __________ se __________ el poder de la divinidad.",
      pt: "Em suas __________ __________-se o poder da divindade."
    },
    tags: ["ordinances", "priesthood"],
    aceLinks: ["eternal_perspective", "act_in_faith"]
  },
  {
    id: "dc-88-118",
    work: "DC",
    book: "D&C",
    reference: "D&C 88:118",
    keyPhrase: {
      en: "Seek learning, even by study and also by faith.",
      es: "Buscad conocimiento, tanto por el estudio como por la fe.",
      pt: "Procurai conhecimento, sim, pelo estudo e também pela fé."
    },
    cloze: {
      en: "Seek __________, even by __________ and also by faith.",
      es: "Buscad __________, tanto por el __________ como por la fe.",
      pt: "__________ __________, sim, pelo estudo e também pela fé."
    },
    tags: ["learning", "study"],
    aceLinks: ["divinely_appointed_sources", "act_in_faith"]
  },
  {
    id: "dc-89-18-21",
    work: "DC",
    book: "D&C",
    reference: "D&C 89:18–21",
    keyPhrase: {
      en: "The blessings of the Word of Wisdom",
      es: "Las bendiciones de vivir la Palabra de Sabiduría",
      pt: "As bênçãos da Palavra de Sabedoria"
    },
    cloze: {
      en: "The __________ of the Word of __________",
      es: "Las __________ de vivir la Palabra de __________",
      pt: "As __________ da Palavra de __________"
    },
    tags: ["word of wisdom", "health"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "dc-107-8",
    work: "DC",
    book: "D&C",
    reference: "D&C 107:8",
    keyPhrase: {
      en: "The Melchizedek Priesthood … has power and authority … to administer in spiritual things.",
      es: "El Sacerdocio de Melquisedec … tiene poder y autoridad … para administrar en las cosas espirituales.",
      pt: "O Sacerdócio de Melquisedeque … tem poder e autoridade … para administrar em assuntos espirituais."
    },
    cloze: {
      en: "The __________ __________ … has power and authority … to administer in spiritual things.",
      es: "El Sacerdocio de __________ … tiene poder y autoridad … para administrar en las cosas __________.",
      pt: "O Sacerdócio de __________ … tem poder e autoridade … para __________ em assuntos espirituais."
    },
    tags: ["priesthood"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "dc-121-36-41-42",
    work: "DC",
    book: "D&C",
    reference: "D&C 121:36, 41–42",
    keyPhrase: {
      en: "The rights of the priesthood … cannot be controlled nor handled only on the principles of righteousness.",
      es: "Los derechos del sacerdocio … no pueden ser gobernados ni manejados sino conforme a los principios de la rectitud.",
      pt: "Os direitos do sacerdócio … não podem ser controlados nem exercidos a não ser de acordo com os princípios da retidão."
    },
    cloze: {
      en: "The rights of the __________ … cannot be controlled nor handled only on the principles of __________.",
      es: "Los derechos del __________ … no pueden ser __________ ni manejados sino conforme a los principios de la rectitud.",
      pt: "Os direitos do __________ … não podem ser __________ nem exercidos a não ser de acordo com os princípios da retidão."
    },
    tags: ["priesthood", "righteousness"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "dc-130-22-23",
    work: "DC",
    book: "D&C",
    reference: "D&C 130:22–23",
    keyPhrase: {
      en: "The Father has a body of flesh and bones … ; the Son also; but the Holy Ghost … is a personage of Spirit.",
      es: "El Padre tiene un cuerpo de carne y huesos …; así también el Hijo; pero el Espíritu Santo … es un personaje de Espíritu.",
      pt: "O Pai tem um corpo de carne e ossos …; o Filho também; mas o Espírito Santo … é um personagem de Espírito."
    },
    cloze: {
      en: "The __________ has a body of flesh and bones … ; the Son also; but the Holy Ghost … is a __________ of Spirit.",
      es: "El Padre tiene un cuerpo de carne y huesos …; así también el Hijo; pero el __________ Santo … es un __________ de Espíritu.",
      pt: "O Pai tem um corpo de carne e ossos …; o Filho também; mas o __________ Santo … é um __________ de Espírito."
    },
    tags: ["godhead"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "dc-131-1-4",
    work: "DC",
    book: "D&C",
    reference: "D&C 131:1–4",
    keyPhrase: {
      en: "The new and everlasting covenant of marriage.",
      es: "El nuevo y sempiterno convenio del matrimonio.",
      pt: "O novo e eterno convênio do casamento."
    },
    cloze: {
      en: "The new and __________ __________ of marriage.",
      es: "El nuevo y __________ convenio del __________.",
      pt: "O novo e eterno __________ do __________."
    },
    tags: ["marriage", "exaltation"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "dc-135-3",
    work: "DC",
    book: "D&C",
    reference: "D&C 135:3",
    keyPhrase: {
      en: "Joseph Smith \"brought forth the Book of Mormon, which he translated by the gift and power of God.\"",
      es: "José Smith sacó \"a luz el Libro de Mormón, que tradujo por el don y el poder de Dios\".",
      pt: "Joseph Smith \"trouxe à luz o Livro de Mórmon, que traduziu pelo dom e poder de Deus\"."
    },
    cloze: {
      en: "Joseph Smith \"__________ forth the Book of Mormon, which he __________ by the gift and power of God.\"",
      es: "José Smith sacó \"a luz el Libro de __________, que __________ por el don y el poder de Dios\".",
      pt: "__________ Smith \"trouxe à luz o Livro de Mórmon, que __________ pelo dom e poder de Deus\"."
    },
    tags: ["joseph smith", "book of mormon"],
    aceLinks: ["divinely_appointed_sources"]
  }
];
