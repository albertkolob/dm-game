import { DMItem } from './types';

// New Testament course passages
// Source: Doctrinal Mastery Core Document (2023), churchofjesuschrist.org.
// Spanish/Portuguese key phrases follow the Church's official translations;
// see docs/TRANSLATION-REVIEW.md for per-entry verification status.
export const DM_NT: DMItem[] = [
  {
    id: "nt-matt-5-14-16",
    work: "NT",
    book: "Matthew",
    reference: "Matthew 5:14–16",
    keyPhrase: {
      en: "Let your light so shine before men.",
      es: "Así alumbre vuestra luz delante de los hombres.",
      pt: "Assim resplandeça a vossa luz diante dos homens."
    },
    cloze: {
      en: "Let your __________ so __________ before men.",
      es: "Así __________ vuestra luz __________ de los hombres.",
      pt: "Assim __________ a vossa luz __________ dos homens."
    },
    tags: ["example", "discipleship"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "nt-matt-11-28-30",
    work: "NT",
    book: "Matthew",
    reference: "Matthew 11:28–30",
    keyPhrase: {
      en: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
      es: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
      pt: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei."
    },
    cloze: {
      en: "Come unto me, all ye that __________ and are __________ laden, and I will give you rest.",
      es: "Venid a mí todos los que estáis __________ y cargados, y yo os haré __________.",
      pt: "Vinde a mim, todos os que estais cansados e __________, e eu vos __________."
    },
    tags: ["peace", "come unto christ"],
    aceLinks: ["act_in_faith", "eternal_perspective"]
  },
  {
    id: "nt-matt-16-15-19",
    work: "NT",
    book: "Matthew",
    reference: "Matthew 16:15–19",
    keyPhrase: {
      en: "Jesus said, \"I will give unto thee the keys of the kingdom.\"",
      es: "Jesús dijo: \"A ti te daré las llaves del reino\".",
      pt: "Jesus disse: \"Eu te darei as chaves do reino\"."
    },
    cloze: {
      en: "__________ said, \"I will give unto thee the keys of the __________.\"",
      es: "__________ dijo: \"A ti te daré las __________ del reino\".",
      pt: "__________ disse: \"Eu te darei as __________ do reino\"."
    },
    tags: ["priesthood keys", "revelation"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "nt-matt-22-36-39",
    work: "NT",
    book: "Matthew",
    reference: "Matthew 22:36–39",
    keyPhrase: {
      en: "Thou shalt love the Lord thy God. … Thou shalt love thy neighbour.",
      es: "Amarás al Señor tu Dios. … Amarás a tu prójimo.",
      pt: "Amarás o Senhor teu Deus. … Amarás o teu próximo."
    },
    cloze: {
      en: "Thou __________ love the Lord thy God. … Thou shalt love thy __________.",
      es: "__________ al Señor tu Dios. … Amarás a tu __________.",
      pt: "__________ o Senhor teu Deus. … Amarás o teu __________."
    },
    tags: ["love", "commandments"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "nt-luke-2-10-12",
    work: "NT",
    book: "Luke",
    reference: "Luke 2:10–12",
    keyPhrase: {
      en: "For unto you is born this day in the city of David a Saviour, which is Christ the Lord.",
      es: "Os ha nacido hoy, en la ciudad de David, un Salvador, que es Cristo el Señor.",
      pt: "Na cidade de Davi, vos nasceu hoje o Salvador, que é Cristo, o Senhor."
    },
    cloze: {
      en: "For unto you is born this day in the city of David a __________, which is __________ the Lord.",
      es: "Os ha __________ hoy, en la ciudad de David, un __________, que es Cristo el Señor.",
      pt: "Na __________ de Davi, vos nasceu hoje o __________, que é Cristo, o Senhor."
    },
    tags: ["jesus christ", "nativity"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "nt-luke-22-19-20",
    work: "NT",
    book: "Luke",
    reference: "Luke 22:19–20",
    keyPhrase: {
      en: "Jesus Christ commanded, partake of the sacrament \"in remembrance of me.\"",
      es: "Jesucristo mandó que participáramos de la Santa Cena \"en memoria de Él\".",
      pt: "Jesus Cristo ordenou que tomemos o sacramento \"em memória de mim\"."
    },
    cloze: {
      en: "Jesus Christ __________, partake of the sacrament \"in __________ of me.\"",
      es: "__________ mandó que __________ de la Santa Cena \"en memoria de Él\".",
      pt: "Jesus Cristo __________ que tomemos o __________ \"em memória de mim\"."
    },
    tags: ["sacrament", "covenants"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "nt-luke-24-36-39",
    work: "NT",
    book: "Luke",
    reference: "Luke 24:36–39",
    keyPhrase: {
      en: "For a spirit hath not flesh and bones, as ye see me have.",
      es: "Porque un espíritu no tiene carne ni huesos como veis que yo tengo.",
      pt: "Pois um espírito não tem carne nem ossos, como vedes que eu tenho."
    },
    cloze: {
      en: "For a __________ hath not __________ and bones, as ye see me have.",
      es: "Porque un __________ no tiene carne ni __________ como veis que yo tengo.",
      pt: "Pois um __________ não tem __________ nem ossos, como vedes que eu tenho."
    },
    tags: ["resurrection"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "nt-john-3-5",
    work: "NT",
    book: "John",
    reference: "John 3:5",
    keyPhrase: {
      en: "Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.",
      es: "El que no naciere de agua y del Espíritu no puede entrar en el reino de Dios.",
      pt: "Aquele que não nascer da água e do Espírito não pode entrar no reino de Deus."
    },
    cloze: {
      en: "__________ a man be born of water and of the Spirit, he cannot enter into the __________ of God.",
      es: "El que no __________ de agua y del __________ no puede entrar en el reino de Dios.",
      pt: "Aquele que não __________ da água e do __________ não pode entrar no reino de Deus."
    },
    tags: ["baptism", "ordinances"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "nt-john-3-16",
    work: "NT",
    book: "John",
    reference: "John 3:16",
    keyPhrase: {
      en: "For God so loved the world, that he gave his only begotten Son.",
      es: "Porque de tal manera amó Dios al mundo que ha dado a su Hijo Unigénito.",
      pt: "Porque Deus amou o mundo de tal maneira, que deu o seu Filho Unigênito."
    },
    cloze: {
      en: "For God so __________ the world, that he gave his only __________ Son.",
      es: "Porque de tal __________ amó Dios al mundo que ha dado a su Hijo __________.",
      pt: "Porque Deus amou o mundo de tal __________, que deu o seu Filho __________."
    },
    tags: ["god's love", "atonement"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "nt-john-7-17",
    work: "NT",
    book: "John",
    reference: "John 7:17",
    keyPhrase: {
      en: "If any man will do his will, he shall know of the doctrine.",
      es: "El que quiera hacer su voluntad conocerá si la doctrina es de Dios.",
      pt: "Se alguém quiser fazer a vontade dele, conhecerá a doutrina."
    },
    cloze: {
      en: "If any man will do his will, he shall know of the __________.",
      es: "El que quiera hacer su __________ __________ si la doctrina es de Dios.",
      pt: "Se alguém quiser fazer a vontade dele, __________ a __________."
    },
    tags: ["testimony", "obedience"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "nt-john-17-3",
    work: "NT",
    book: "John",
    reference: "John 17:3",
    keyPhrase: {
      en: "And this is life eternal, that they might know thee the only true God, and Jesus Christ.",
      es: "Y esta es la vida eterna: que te conozcan a ti, el único Dios verdadero, y a Jesucristo.",
      pt: "E a vida eterna é esta: que conheçam a ti, por único Deus verdadeiro, e a Jesus Cristo."
    },
    cloze: {
      en: "And this is life __________, that they might know thee the only true God, and Jesus __________.",
      es: "Y esta es la vida eterna: que te conozcan a ti, el único Dios __________, y a __________.",
      pt: "E a vida eterna é esta: que __________ a ti, por único Deus __________, e a Jesus Cristo."
    },
    tags: ["eternal life"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "nt-1cor-6-19-20",
    work: "NT",
    book: "1 Corinthians",
    reference: "1 Corinthians 6:19–20",
    keyPhrase: {
      en: "Your body is the temple of the Holy Ghost.",
      es: "Vuestro cuerpo es templo del Espíritu Santo.",
      pt: "Vosso corpo é o templo do Espírito Santo."
    },
    cloze: {
      en: "Your body is the __________ of the Holy __________.",
      es: "Vuestro __________ es templo del __________ Santo.",
      pt: "Vosso corpo é o __________ do __________ Santo."
    },
    tags: ["body", "word of wisdom"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "nt-1cor-11-11",
    work: "NT",
    book: "1 Corinthians",
    reference: "1 Corinthians 11:11",
    keyPhrase: {
      en: "Neither is the man without the woman, neither the woman without the man, in the Lord.",
      es: "Ni el varón es sin la mujer, ni la mujer sin el varón, en el Señor.",
      pt: "Nem o homem é sem a mulher, nem a mulher, sem o homem, no Senhor."
    },
    cloze: {
      en: "__________ is the man __________ the woman, neither the woman without the man, in the Lord.",
      es: "Ni el __________ es sin la __________, ni la mujer sin el varón, en el Señor.",
      pt: "Nem o homem é sem a __________, nem a __________, sem o homem, no Senhor."
    },
    tags: ["marriage"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "nt-1cor-15-20-22",
    work: "NT",
    book: "1 Corinthians",
    reference: "1 Corinthians 15:20–22",
    keyPhrase: {
      en: "As in Adam all die, even so in Christ shall all be made alive.",
      es: "Así como en Adán todos mueren, así también en Cristo todos serán vivificados.",
      pt: "Assim como todos morrem em Adão, assim também em Cristo todos serão vivificados."
    },
    cloze: {
      en: "As in Adam all die, even so in __________ shall all be made __________.",
      es: "Así como en Adán todos mueren, así __________ en Cristo todos serán __________.",
      pt: "Assim como todos __________ em Adão, assim também em Cristo todos serão __________."
    },
    tags: ["resurrection"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "nt-1cor-15-40-42",
    work: "NT",
    book: "1 Corinthians",
    reference: "1 Corinthians 15:40–42",
    keyPhrase: {
      en: "In the Resurrection, there are three degrees of glory.",
      es: "En la resurrección hay tres grados de gloria.",
      pt: "Na ressurreição, há três graus de glória."
    },
    cloze: {
      en: "In the __________, there are three __________ of glory.",
      es: "En la __________ hay tres __________ de gloria.",
      pt: "Na __________, há três graus de __________."
    },
    tags: ["degrees of glory"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "nt-eph-1-10",
    work: "NT",
    book: "Ephesians",
    reference: "Ephesians 1:10",
    keyPhrase: {
      en: "In the dispensation of the fulness of times he might gather together in one all things in Christ.",
      es: "Dios reunirá todas las cosas en Cristo, en la dispensación del cumplimiento de los tiempos.",
      pt: "Na dispensação da plenitude dos tempos, tornar a congregar em Cristo todas as coisas."
    },
    cloze: {
      en: "In the __________ of the fulness of times he might gather __________ in one all things in Christ.",
      es: "Dios reunirá todas las cosas en Cristo, en la __________ del __________ de los tiempos.",
      pt: "Na __________ da __________ dos tempos, tornar a congregar em Cristo todas as coisas."
    },
    tags: ["restoration", "dispensations"],
    aceLinks: ["eternal_perspective", "divinely_appointed_sources"]
  },
  {
    id: "nt-eph-2-19-20",
    work: "NT",
    book: "Ephesians",
    reference: "Ephesians 2:19–20",
    keyPhrase: {
      en: "The Church is \"built upon the foundation of the apostles and prophets, Jesus Christ himself being the chief corner stone.\"",
      es: "La Iglesia está edificada \"sobre el fundamento de los apóstoles y profetas, siendo la principal piedra del ángulo Jesucristo mismo\".",
      pt: "A Igreja é \"edificada sobre o fundamento dos apóstolos e dos profetas, de que Jesus Cristo é a principal pedra da esquina\"."
    },
    cloze: {
      en: "The Church is \"built upon the __________ of the __________ and prophets, Jesus Christ himself being the chief corner stone.\"",
      es: "La Iglesia está edificada \"sobre el __________ de los apóstoles y profetas, siendo la principal piedra del ángulo __________ mismo\".",
      pt: "A Igreja é \"__________ sobre o __________ dos apóstolos e dos profetas, de que Jesus Cristo é a principal pedra da esquina\"."
    },
    tags: ["church organization", "apostles"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "nt-2thess-2-1-3",
    work: "NT",
    book: "2 Thessalonians",
    reference: "2 Thessalonians 2:1–3",
    keyPhrase: {
      en: "The day of Christ … shall not come, except there come a falling away first.",
      es: "El día del Señor … no vendrá sin que antes venga la apostasía.",
      pt: "O dia de Cristo … não virá sem que antes venha a apostasia."
    },
    cloze: {
      en: "The day of __________ … shall not come, except there come a __________ away first.",
      es: "El día del Señor … no __________ sin que antes venga la __________.",
      pt: "O dia de __________ … não virá sem que antes venha a __________."
    },
    tags: ["apostasy", "second coming"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "nt-2tim-3-15-17",
    work: "NT",
    book: "2 Timothy",
    reference: "2 Timothy 3:15–17",
    keyPhrase: {
      en: "The holy scriptures … are able to make thee wise unto salvation.",
      es: "Las Sagradas Escrituras … te pueden hacer sabio para la salvación.",
      pt: "As sagradas escrituras … podem fazer-te sábio para a salvação."
    },
    cloze: {
      en: "The holy __________ … are able to make thee wise unto __________.",
      es: "Las Sagradas __________ … te pueden hacer sabio para la __________.",
      pt: "As __________ __________ … podem fazer-te sábio para a salvação."
    },
    tags: ["scriptures"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "nt-heb-12-9",
    work: "NT",
    book: "Hebrews",
    reference: "Hebrews 12:9",
    keyPhrase: {
      en: "Heavenly Father is \"the Father of spirits.\"",
      es: "El Padre Celestial es el \"Padre de los espíritus\".",
      pt: "O Pai Celestial é o \"Pai dos espíritos\"."
    },
    cloze: {
      en: "__________ Father is \"the Father of __________.\"",
      es: "El Padre __________ es el \"Padre de los __________\".",
      pt: "O Pai __________ é o \"Pai dos __________\"."
    },
    tags: ["identity", "heavenly father"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "nt-james-1-5-6",
    work: "NT",
    book: "James",
    reference: "James 1:5–6",
    keyPhrase: {
      en: "If any of you lack wisdom, let him ask of God.",
      es: "Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios.",
      pt: "E se algum de vós tem falta de sabedoria, peça-a a Deus."
    },
    cloze: {
      en: "If any of you lack __________, let him ask of God.",
      es: "Y si alguno de __________ tiene falta de __________, pídala a Dios.",
      pt: "E se __________ de vós tem falta de __________, peça-a a Deus."
    },
    tags: ["prayer", "revelation", "first vision"],
    aceLinks: ["divinely_appointed_sources", "act_in_faith"]
  },
  {
    id: "nt-james-2-17-18",
    work: "NT",
    book: "James",
    reference: "James 2:17–18",
    keyPhrase: {
      en: "Faith, if it hath not works, is dead.",
      es: "La fe, si no tiene obras, es muerta.",
      pt: "A fé, se não tiver as obras, está morta."
    },
    cloze: {
      en: "__________, if it hath not __________, is dead.",
      es: "La fe, si no __________ obras, es __________.",
      pt: "A fé, se não __________ as __________, está morta."
    },
    tags: ["faith", "works"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "nt-1pet-4-6",
    work: "NT",
    book: "1 Peter",
    reference: "1 Peter 4:6",
    keyPhrase: {
      en: "The gospel [was] preached also to them that are dead.",
      es: "También ha sido predicado el evangelio a los muertos.",
      pt: "O evangelho foi pregado também aos mortos."
    },
    cloze: {
      en: "The __________ [was] __________ also to them that are dead.",
      es: "También ha sido __________ el __________ a los muertos.",
      pt: "O __________ foi __________ também aos mortos."
    },
    tags: ["spirit world", "redemption of the dead"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "nt-rev-20-12",
    work: "NT",
    book: "Revelation",
    reference: "Revelation 20:12",
    keyPhrase: {
      en: "And the dead were judged … according to their works.",
      es: "Y fueron juzgados los muertos … según sus obras.",
      pt: "Os mortos foram julgados … segundo as suas obras."
    },
    cloze: {
      en: "And the dead were __________ … __________ to their works.",
      es: "Y fueron __________ los __________ … según sus obras.",
      pt: "Os __________ foram __________ … segundo as suas obras."
    },
    tags: ["judgment"],
    aceLinks: ["eternal_perspective"]
  }
];
