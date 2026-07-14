import { DMItem } from './types';

// Old Testament course passages (Bible portion)
// Source: Doctrinal Mastery Core Document (2023), churchofjesuschrist.org.
// Spanish/Portuguese key phrases follow the Church's official translations;
// see docs/TRANSLATION-REVIEW.md for per-entry verification status.
export const DM_OT: DMItem[] = [
  {
    id: "ot-gen-1-26-27",
    work: "OT",
    book: "Genesis",
    reference: "Genesis 1:26–27",
    keyPhrase: {
      en: "God created man in his own image.",
      es: "Creó Dios al hombre a su imagen.",
      pt: "Criou Deus o homem à sua imagem."
    },
    cloze: {
      en: "God __________ man in his own __________.",
      es: "Creó Dios al __________ a su __________.",
      pt: "__________ Deus o homem à sua __________."
    },
    tags: ["creation", "identity"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "ot-gen-2-24",
    work: "OT",
    book: "Genesis",
    reference: "Genesis 2:24",
    keyPhrase: {
      en: "A man … shall cleave unto his wife: and they shall be one.",
      es: "El hombre … se allegará a su mujer, y serán una sola carne.",
      pt: "O homem … apegar-se-á à sua mulher, e serão ambos uma carne."
    },
    cloze: {
      en: "A man … shall __________ unto his wife: and they shall be one.",
      es: "El __________ … se __________ a su mujer, y serán una sola carne.",
      pt: "O homem … __________-se-á à sua __________, e serão ambos uma carne."
    },
    tags: ["marriage", "family"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "ot-gen-39-9",
    work: "OT",
    book: "Genesis",
    reference: "Genesis 39:9",
    keyPhrase: {
      en: "How then can I do this great wickedness, and sin against God?",
      es: "¿Cómo, pues, haría yo esta gran maldad y pecaría contra Dios?",
      pt: "Como, pois, faria eu tamanha maldade e pecaria contra Deus?"
    },
    cloze: {
      en: "How then can I do this great __________, and sin __________ God?",
      es: "¿Cómo, pues, haría yo esta gran __________ y __________ contra Dios?",
      pt: "Como, pois, faria eu __________ __________ e pecaria contra Deus?"
    },
    tags: ["integrity", "chastity"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "ot-ex-20-3-17",
    work: "OT",
    book: "Exodus",
    reference: "Exodus 20:3–17",
    keyPhrase: {
      en: "The Ten Commandments",
      es: "Los Diez Mandamientos",
      pt: "Os Dez Mandamentos"
    },
    cloze: {
      en: "The Ten __________",
      es: "Los Diez __________",
      pt: "Os Dez __________"
    },
    tags: ["commandments"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "ot-josh-24-15",
    work: "OT",
    book: "Joshua",
    reference: "Joshua 24:15",
    keyPhrase: {
      en: "Choose you this day whom ye will serve.",
      es: "Escogeos hoy a quién sirváis.",
      pt: "Escolhei hoje a quem sirvais."
    },
    cloze: {
      en: "__________ you this day whom ye will __________.",
      es: "__________ hoy a quién __________.",
      pt: "__________ hoje a quem __________."
    },
    tags: ["agency", "commitment"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "ot-ps-24-3-4",
    work: "OT",
    book: "Psalms",
    reference: "Psalm 24:3–4",
    keyPhrase: {
      en: "Who shall stand in his holy place? He that hath clean hands, and a pure heart.",
      es: "¿Quién estará en su lugar santo? El limpio de manos y puro de corazón.",
      pt: "Quem estará no seu lugar santo? Aquele que é limpo de mãos e puro de coração."
    },
    cloze: {
      en: "Who shall __________ in his holy __________? He that hath clean hands, and a pure heart.",
      es: "¿Quién __________ en su lugar santo? El limpio de manos y puro de __________.",
      pt: "Quem __________ no seu lugar santo? Aquele que é limpo de mãos e puro de __________."
    },
    tags: ["temple", "purity"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "ot-prov-3-5-6",
    work: "OT",
    book: "Proverbs",
    reference: "Proverbs 3:5–6",
    keyPhrase: {
      en: "Trust in the Lord with all thine heart … and he shall direct thy paths.",
      es: "Confía en Jehová con todo tu corazón … y él enderezará tus veredas.",
      pt: "Confia no Senhor de todo o teu coração … e ele endireitará as tuas veredas."
    },
    cloze: {
      en: "__________ in the Lord with all thine heart … and he shall __________ thy paths.",
      es: "Confía en Jehová con todo tu __________ … y él __________ tus veredas.",
      pt: "Confia no Senhor de todo o teu __________ … e ele __________ as tuas veredas."
    },
    tags: ["trust", "guidance"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "ot-isa-1-18",
    work: "OT",
    book: "Isaiah",
    reference: "Isaiah 1:18",
    keyPhrase: {
      en: "Though your sins be as scarlet, they shall be as white as snow.",
      es: "Aunque vuestros pecados sean como la grana, como la nieve serán emblanquecidos.",
      pt: "Ainda que os vossos pecados sejam como a escarlata, eles se tornarão brancos como a neve."
    },
    cloze: {
      en: "__________ your sins be as __________, they shall be as white as snow.",
      es: "Aunque __________ pecados sean como la grana, como la nieve serán __________.",
      pt: "Ainda que os vossos pecados sejam como a __________, eles se __________ brancos como a neve."
    },
    tags: ["repentance", "forgiveness"],
    aceLinks: ["act_in_faith", "eternal_perspective"]
  },
  {
    id: "ot-isa-5-20",
    work: "OT",
    book: "Isaiah",
    reference: "Isaiah 5:20",
    keyPhrase: {
      en: "Woe unto them that call evil good, and good evil.",
      es: "¡Ay de los que a lo malo llaman bueno, y a lo bueno, malo!",
      pt: "Ai dos que ao mal chamam bem, e ao bem, mal."
    },
    cloze: {
      en: "Woe unto them that call evil good, and good evil.",
      es: "¡Ay de los que a lo malo __________ __________, y a lo bueno, malo!",
      pt: "Ai dos que ao mal __________ bem, e ao bem, mal."
    },
    tags: ["discernment"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "ot-isa-29-13-14",
    work: "OT",
    book: "Isaiah",
    reference: "Isaiah 29:13–14",
    keyPhrase: {
      en: "The restoration of the gospel is \"a marvellous work and a wonder.\"",
      es: "La Restauración del Evangelio es \"una obra maravillosa y un prodigio\".",
      pt: "A Restauração do evangelho é \"uma obra maravilhosa e um assombro\"."
    },
    cloze: {
      en: "The __________ of the gospel is \"a __________ work and a wonder.\"",
      es: "La __________ del Evangelio es \"una obra __________ y un prodigio\".",
      pt: "A __________ do evangelho é \"uma obra __________ e um assombro\"."
    },
    tags: ["restoration"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "ot-isa-53-3-5",
    work: "OT",
    book: "Isaiah",
    reference: "Isaiah 53:3–5",
    keyPhrase: {
      en: "Surely [Jesus Christ] hath borne our griefs, and carried our sorrows.",
      es: "Ciertamente llevó [Jesucristo] nuestras enfermedades y sufrió nuestros dolores.",
      pt: "Verdadeiramente, [Jesus Cristo] tomou sobre si as nossas enfermidades e as nossas dores levou sobre si."
    },
    cloze: {
      en: "Surely [Jesus Christ] hath borne our griefs, and __________ our __________.",
      es: "__________ llevó [Jesucristo] nuestras __________ y sufrió nuestros dolores.",
      pt: "__________, [Jesus Cristo] tomou sobre si as nossas __________ e as nossas dores levou sobre si."
    },
    tags: ["atonement"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "ot-isa-58-6-7",
    work: "OT",
    book: "Isaiah",
    reference: "Isaiah 58:6–7",
    keyPhrase: {
      en: "The blessings of a proper fast",
      es: "Las bendiciones de un ayuno apropiado",
      pt: "As bênçãos do jejum adequado"
    },
    cloze: {
      en: "The __________ of a __________ fast",
      es: "Las __________ de un ayuno __________",
      pt: "As __________ do jejum __________"
    },
    tags: ["fasting"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "ot-isa-58-13-14",
    work: "OT",
    book: "Isaiah",
    reference: "Isaiah 58:13–14",
    keyPhrase: {
      en: "Turn away … from doing thy pleasure on my holy day; and call the sabbath a delight.",
      es: "Retrae tu pie … de hacer tu voluntad en mi día santo, y llama al día de reposo delicia.",
      pt: "Desvia … de fazer a tua vontade no meu santo dia, e chama ao sábado deleitoso."
    },
    cloze: {
      en: "Turn away … from doing thy __________ on my holy day; and call the __________ a delight.",
      es: "Retrae tu pie … de hacer tu __________ en mi día santo, y llama al día de reposo __________.",
      pt: "Desvia … de fazer a tua __________ no meu santo dia, e chama ao sábado __________."
    },
    tags: ["sabbath"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "ot-jer-1-4-5",
    work: "OT",
    book: "Jeremiah",
    reference: "Jeremiah 1:4–5",
    keyPhrase: {
      en: "Before I formed thee in the belly … I ordained thee a prophet unto the nations.",
      es: "Antes que te formase en el vientre … te di por profeta a las naciones.",
      pt: "Antes que te formasse no ventre … às nações te dei por profeta."
    },
    cloze: {
      en: "Before I formed thee in the belly … I __________ thee a __________ unto the nations.",
      es: "Antes que te __________ en el vientre … te di por profeta a las __________.",
      pt: "Antes que te __________ no ventre … às nações te dei por __________."
    },
    tags: ["premortal life", "prophets"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "ot-ezek-3-16-17",
    work: "OT",
    book: "Ezekiel",
    reference: "Ezekiel 3:16–17",
    keyPhrase: {
      en: "The prophet is \"a watchman unto the house of Israel.\"",
      es: "El profeta es \"atalaya a la casa de Israel\".",
      pt: "O profeta é \"atalaia sobre a casa de Israel\"."
    },
    cloze: {
      en: "The __________ is \"a __________ unto the house of Israel.\"",
      es: "El __________ es \"__________ a la casa de Israel\".",
      pt: "O __________ é \"__________ sobre a casa de Israel\"."
    },
    tags: ["prophets"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "ot-ezek-37-15-17",
    work: "OT",
    book: "Ezekiel",
    reference: "Ezekiel 37:15–17",
    keyPhrase: {
      en: "The Bible and the Book of Mormon \"shall become one in thine hand.\"",
      es: "La Biblia y el Libro de Mormón \"serán uno solo en tu mano\".",
      pt: "A Bíblia e o Livro de Mórmon \"serão um só na tua mão\"."
    },
    cloze: {
      en: "The Bible and the Book of __________ \"shall __________ one in thine hand.\"",
      es: "La __________ y el Libro de __________ \"serán uno solo en tu mano\".",
      pt: "A __________ e o Livro de __________ \"serão um só na tua mão\"."
    },
    tags: ["scriptures", "book of mormon"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "ot-dan-2-44-45",
    work: "OT",
    book: "Daniel",
    reference: "Daniel 2:44–45",
    keyPhrase: {
      en: "God shall \"set up a kingdom, which shall never be destroyed.\"",
      es: "Dios \"levantará un reino que no será jamás destruido\".",
      pt: "Deus \"levantará um reino que não será jamais destruído\"."
    },
    cloze: {
      en: "God shall \"set up a __________, which shall never be __________.\"",
      es: "Dios \"__________ un reino que no será jamás __________\".",
      pt: "Deus \"__________ um reino que não será jamais __________\"."
    },
    tags: ["restoration", "kingdom of god"],
    aceLinks: ["divinely_appointed_sources", "eternal_perspective"]
  },
  {
    id: "ot-amos-3-7",
    work: "OT",
    book: "Amos",
    reference: "Amos 3:7",
    keyPhrase: {
      en: "The Lord God … revealeth his secret unto his servants the prophets.",
      es: "Jehová el Señor … revela su secreto a sus siervos los profetas.",
      pt: "O Senhor Deus … revela o seu segredo aos seus servos, os profetas."
    },
    cloze: {
      en: "The Lord God … __________ his secret unto his __________ the prophets.",
      es: "Jehová el Señor … revela su __________ a sus siervos los __________.",
      pt: "O Senhor Deus … revela o seu __________ aos seus servos, os __________."
    },
    tags: ["prophets", "revelation"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "ot-mal-3-8-10",
    work: "OT",
    book: "Malachi",
    reference: "Malachi 3:8–10",
    keyPhrase: {
      en: "The blessings of paying tithing",
      es: "Las bendiciones de pagar el diezmo",
      pt: "As bênçãos de pagar o dízimo"
    },
    cloze: {
      en: "The __________ of paying __________",
      es: "Las __________ de pagar el __________",
      pt: "As __________ de pagar o __________"
    },
    tags: ["tithing"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "ot-mal-4-5-6",
    work: "OT",
    book: "Malachi",
    reference: "Malachi 4:5–6",
    keyPhrase: {
      en: "Elijah \"shall turn … the heart of the children to their fathers.\"",
      es: "Elías \"hará volver el corazón … de los hijos hacia los padres\".",
      pt: "Elias \"converterá … o coração dos filhos a seus pais\"."
    },
    cloze: {
      en: "Elijah \"shall turn … the heart of the __________ to their __________.\"",
      es: "Elías \"hará __________ el __________ … de los hijos hacia los padres\".",
      pt: "Elias \"__________ … o __________ dos filhos a seus pais\"."
    },
    tags: ["elijah", "family history"],
    aceLinks: ["eternal_perspective"]
  }
];
