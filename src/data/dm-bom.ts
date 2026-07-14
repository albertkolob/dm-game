import { DMItem } from './types';

// Book of Mormon course passages
// Source: Doctrinal Mastery Core Document (2023), churchofjesuschrist.org.
// Spanish/Portuguese key phrases follow the Church's official translations;
// see docs/TRANSLATION-REVIEW.md for per-entry verification status.
export const DM_BOM: DMItem[] = [
  {
    id: "bom-1ne-3-7",
    work: "BOM",
    book: "1 Nephi",
    reference: "1 Nephi 3:7",
    keyPhrase: {
      en: "I will go and do the things which the Lord hath commanded.",
      es: "Iré y haré lo que el Señor ha mandado.",
      pt: "Eu irei e cumprirei as ordens do Senhor."
    },
    cloze: {
      en: "I will go and do the things which the Lord hath __________.",
      es: "Iré y haré lo que el __________ ha __________.",
      pt: "Eu irei e __________ as __________ do Senhor."
    },
    tags: ["obedience", "faith"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "bom-2ne-2-25",
    work: "BOM",
    book: "2 Nephi",
    reference: "2 Nephi 2:25",
    keyPhrase: {
      en: "Adam fell that men might be; and men are, that they might have joy.",
      es: "Adán cayó para que los hombres existiesen; y existen los hombres para que tengan gozo.",
      pt: "Adão caiu para que os homens existissem; e os homens existem para que tenham alegria."
    },
    cloze: {
      en: "Adam fell that men might be; and men are, that they might have joy.",
      es: "Adán cayó para que los __________ __________; y existen los hombres para que tengan gozo.",
      pt: "Adão caiu para que os homens __________; e os homens __________ para que tenham alegria."
    },
    tags: ["fall", "joy", "plan of salvation"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "bom-2ne-2-27",
    work: "BOM",
    book: "2 Nephi",
    reference: "2 Nephi 2:27",
    keyPhrase: {
      en: "They are free to choose liberty and eternal life … or … captivity and death.",
      es: "Son libres para escoger la libertad y la vida eterna … o … la cautividad y la muerte.",
      pt: "São livres para escolher a liberdade e a vida eterna … ou … o cativeiro e a morte."
    },
    cloze: {
      en: "They are free to choose __________ and eternal life … or … __________ and death.",
      es: "Son libres para escoger la __________ y la vida eterna … o … la __________ y la muerte.",
      pt: "São livres para escolher a __________ e a vida eterna … ou … o __________ e a morte."
    },
    tags: ["agency"],
    aceLinks: ["act_in_faith", "eternal_perspective"]
  },
  {
    id: "bom-2ne-26-33",
    work: "BOM",
    book: "2 Nephi",
    reference: "2 Nephi 26:33",
    keyPhrase: {
      en: "All are alike unto God.",
      es: "Todos son iguales ante Dios.",
      pt: "Todos são iguais perante Deus."
    },
    cloze: {
      en: "All are __________ unto God.",
      es: "Todos son __________ ante Dios.",
      pt: "Todos são __________ __________ Deus."
    },
    tags: ["god's love", "equality"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "bom-2ne-28-30",
    work: "BOM",
    book: "2 Nephi",
    reference: "2 Nephi 28:30",
    keyPhrase: {
      en: "God \"will give unto the children of men line upon line, precept upon precept.\"",
      es: "Dios \"dará a los hijos de los hombres línea por línea, precepto por precepto\".",
      pt: "Deus \"dará aos filhos dos homens linha sobre linha, preceito sobre preceito\"."
    },
    cloze: {
      en: "God \"will give unto the __________ of men line upon line, __________ upon precept.\"",
      es: "Dios \"dará a los hijos de los hombres línea por línea, __________ por __________\".",
      pt: "Deus \"dará aos filhos dos homens linha sobre linha, __________ sobre __________\"."
    },
    tags: ["revelation"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "bom-2ne-32-3",
    work: "BOM",
    book: "2 Nephi",
    reference: "2 Nephi 32:3",
    keyPhrase: {
      en: "Feast upon the words of Christ; for behold, the words of Christ will tell you all things what ye should do.",
      es: "Deleitaos en las palabras de Cristo; porque he aquí, las palabras de Cristo os dirán todas las cosas que debéis hacer.",
      pt: "Banqueteai-vos com as palavras de Cristo; pois eis que as palavras de Cristo vos dirão todas as coisas que deveis fazer."
    },
    cloze: {
      en: "Feast upon the words of __________; for __________, the words of Christ will tell you all things what ye should do.",
      es: "__________ en las __________ de Cristo; porque he aquí, las palabras de Cristo os dirán todas las cosas que debéis hacer.",
      pt: "__________-vos com as __________ de Cristo; pois eis que as palavras de Cristo vos dirão todas as coisas que deveis fazer."
    },
    tags: ["scriptures"],
    aceLinks: ["divinely_appointed_sources"]
  },
  {
    id: "bom-2ne-32-8-9",
    work: "BOM",
    book: "2 Nephi",
    reference: "2 Nephi 32:8–9",
    keyPhrase: {
      en: "Ye must pray always.",
      es: "Debéis orar siempre.",
      pt: "Deveis orar sempre."
    },
    cloze: {
      en: "Ye must pray __________.",
      es: "__________ orar __________.",
      pt: "__________ orar __________."
    },
    tags: ["prayer"],
    aceLinks: ["act_in_faith", "divinely_appointed_sources"]
  },
  {
    id: "bom-mosiah-2-17",
    work: "BOM",
    book: "Mosiah",
    reference: "Mosiah 2:17",
    keyPhrase: {
      en: "When ye are in the service of your fellow beings ye are only in the service of your God.",
      es: "Cuando os halláis al servicio de vuestros semejantes, solo estáis al servicio de vuestro Dios.",
      pt: "Quando estais a serviço de vosso próximo, estais somente a serviço de vosso Deus."
    },
    cloze: {
      en: "When ye are in the __________ of your fellow beings ye are only in the __________ of your God.",
      es: "Cuando os halláis al __________ de vuestros __________, solo estáis al servicio de vuestro Dios.",
      pt: "Quando estais a __________ de vosso __________, estais somente a serviço de vosso Deus."
    },
    tags: ["service"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "bom-mosiah-2-41",
    work: "BOM",
    book: "Mosiah",
    reference: "Mosiah 2:41",
    keyPhrase: {
      en: "Those that keep the commandments of God … are blessed in all things.",
      es: "Aquellos que guardan los mandamientos de Dios … son bendecidos en todas las cosas.",
      pt: "Aqueles que guardam os mandamentos de Deus … são abençoados em todas as coisas."
    },
    cloze: {
      en: "Those that keep the __________ of God … are __________ in all things.",
      es: "Aquellos que guardan los __________ de Dios … son __________ en todas las cosas.",
      pt: "Aqueles que guardam os __________ de Deus … são __________ em todas as coisas."
    },
    tags: ["obedience", "blessings"],
    aceLinks: ["act_in_faith", "eternal_perspective"]
  },
  {
    id: "bom-mosiah-3-19",
    work: "BOM",
    book: "Mosiah",
    reference: "Mosiah 3:19",
    keyPhrase: {
      en: "[Put] off the natural man and [become] a saint through the atonement of Christ the Lord.",
      es: "Despojaos del hombre natural y haceos santos por la expiación de Cristo el Señor.",
      pt: "Despoje-se do homem natural e torne-se santo pela expiação de Cristo."
    },
    cloze: {
      en: "[Put] off the __________ man and [become] a saint through the __________ of Christ the Lord.",
      es: "__________ del hombre natural y haceos santos por la __________ de Cristo el Señor.",
      pt: "__________-se do homem natural e torne-se santo pela __________ de Cristo."
    },
    tags: ["natural man", "atonement"],
    aceLinks: ["act_in_faith", "eternal_perspective"]
  },
  {
    id: "bom-mosiah-4-9",
    work: "BOM",
    book: "Mosiah",
    reference: "Mosiah 4:9",
    keyPhrase: {
      en: "Believe in God; … believe that he has all wisdom.",
      es: "Creed en Dios; … creed que él tiene toda sabiduría.",
      pt: "Acreditai em Deus; … acreditai que ele tem toda a sabedoria."
    },
    cloze: {
      en: "__________ in God; … __________ that he has all wisdom.",
      es: "__________ en Dios; … creed que él tiene toda __________.",
      pt: "__________ em Deus; … __________ que ele tem toda a sabedoria."
    },
    tags: ["faith", "trust"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "bom-mosiah-18-8-10",
    work: "BOM",
    book: "Mosiah",
    reference: "Mosiah 18:8–10",
    keyPhrase: {
      en: "Be \"baptized in the name of the Lord, as a witness … that ye have entered into a covenant with him.\"",
      es: "Bautizaos en el nombre del Señor, como testimonio … de que habéis concertado un convenio con él.",
      pt: "Sede batizados em nome do Senhor, como testemunho … de que haveis feito convênio com ele."
    },
    cloze: {
      en: "Be \"__________ in the name of the Lord, as a witness … that ye have entered into a __________ with him.\"",
      es: "Bautizaos en el nombre del Señor, como __________ … de que habéis __________ un convenio con él.",
      pt: "Sede __________ em nome do Senhor, como __________ … de que haveis feito convênio com ele."
    },
    tags: ["baptism", "covenants"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "bom-alma-7-11-13",
    work: "BOM",
    book: "Alma",
    reference: "Alma 7:11–13",
    keyPhrase: {
      en: "And he shall go forth, suffering pains and afflictions and temptations of every kind.",
      es: "Y él saldrá, sufriendo dolores, aflicciones y tentaciones de todas clases.",
      pt: "E ele seguirá, sofrendo dores e aflições e tentações de toda espécie."
    },
    cloze: {
      en: "And he shall go forth, suffering pains and __________ and __________ of every kind.",
      es: "Y él saldrá, sufriendo dolores, __________ y __________ de todas clases.",
      pt: "E ele seguirá, __________ dores e aflições e __________ de toda espécie."
    },
    tags: ["atonement", "succor"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "bom-alma-34-9-10",
    work: "BOM",
    book: "Alma",
    reference: "Alma 34:9–10",
    keyPhrase: {
      en: "There must be an atonement made, … an infinite and eternal sacrifice.",
      es: "Es necesario que se realice una expiación …, un sacrificio infinito y eterno.",
      pt: "Deverá haver uma expiação; … um sacrifício infinito e eterno."
    },
    cloze: {
      en: "There must be an __________ made, … an infinite and eternal __________.",
      es: "Es __________ que se realice una expiación …, un __________ infinito y eterno.",
      pt: "Deverá haver uma __________; … um __________ infinito e eterno."
    },
    tags: ["atonement"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "bom-alma-39-9",
    work: "BOM",
    book: "Alma",
    reference: "Alma 39:9",
    keyPhrase: {
      en: "Go no more after the lusts of your eyes.",
      es: "No te dejes llevar más por las concupiscencias de tus ojos.",
      pt: "Não mais sucumbas à concupiscência dos teus olhos."
    },
    cloze: {
      en: "Go no more after the __________ of your eyes.",
      es: "No te dejes __________ más por las __________ de tus ojos.",
      pt: "Não mais __________ à __________ dos teus olhos."
    },
    tags: ["chastity", "repentance"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "bom-alma-41-10",
    work: "BOM",
    book: "Alma",
    reference: "Alma 41:10",
    keyPhrase: {
      en: "Wickedness never was happiness.",
      es: "La maldad nunca fue felicidad.",
      pt: "Iniquidade nunca foi felicidade."
    },
    cloze: {
      en: "__________ never was __________.",
      es: "La __________ nunca fue __________.",
      pt: "__________ nunca foi __________."
    },
    tags: ["happiness", "sin"],
    aceLinks: ["eternal_perspective", "act_in_faith"]
  },
  {
    id: "bom-helaman-5-12",
    work: "BOM",
    book: "Helaman",
    reference: "Helaman 5:12",
    keyPhrase: {
      en: "It is upon the rock of our Redeemer … that ye must build your foundation.",
      es: "Es sobre la roca de nuestro Redentor … donde debéis establecer vuestro fundamento.",
      pt: "É sobre a rocha de nosso Redentor … que deveis construir os vossos alicerces."
    },
    cloze: {
      en: "It is upon the rock of our __________ … that ye must build your __________.",
      es: "Es sobre la roca de nuestro Redentor … donde debéis __________ vuestro __________.",
      pt: "É sobre a rocha de nosso Redentor … que deveis __________ os vossos __________."
    },
    tags: ["foundation", "jesus christ"],
    aceLinks: ["act_in_faith", "eternal_perspective"]
  },
  {
    id: "bom-3ne-11-10-11",
    work: "BOM",
    book: "3 Nephi",
    reference: "3 Nephi 11:10–11",
    keyPhrase: {
      en: "I have suffered the will of the Father in all things from the beginning.",
      es: "Me he sometido a la voluntad del Padre en todas las cosas desde el principio.",
      pt: "Submeti-me à vontade do Pai em todas as coisas desde o princípio."
    },
    cloze: {
      en: "I have __________ the will of the Father in all things from the __________.",
      es: "Me he __________ a la voluntad del Padre en todas las cosas desde el __________.",
      pt: "__________-me à vontade do Pai em todas as coisas desde o __________."
    },
    tags: ["jesus christ", "atonement"],
    aceLinks: ["eternal_perspective"]
  },
  {
    id: "bom-3ne-12-48",
    work: "BOM",
    book: "3 Nephi",
    reference: "3 Nephi 12:48",
    keyPhrase: {
      en: "Be perfect even as I, or your Father who is in heaven is perfect.",
      es: "Sed perfectos así como yo, o como vuestro Padre que está en los cielos es perfecto.",
      pt: "Quisera que fôsseis perfeitos, assim como eu ou como o vosso Pai que está nos céus é perfeito."
    },
    cloze: {
      en: "Be __________ even as I, or your Father who is in heaven is __________.",
      es: "Sed __________ así como yo, o como vuestro Padre que está en los cielos es __________.",
      pt: "Quisera que fôsseis __________, assim como eu ou como o vosso Pai que está nos céus é __________."
    },
    tags: ["perfection", "discipleship"],
    aceLinks: ["act_in_faith", "eternal_perspective"]
  },
  {
    id: "bom-3ne-27-20",
    work: "BOM",
    book: "3 Nephi",
    reference: "3 Nephi 27:20",
    keyPhrase: {
      en: "Come unto me and be baptized … that ye may be sanctified by the reception of the Holy Ghost.",
      es: "Venid a mí y sed bautizados …, para que seáis santificados por la recepción del Espíritu Santo.",
      pt: "Vinde a mim e sede batizados … a fim de que sejais santificados, recebendo o Espírito Santo."
    },
    cloze: {
      en: "Come unto me and be baptized … that ye may be __________ by the __________ of the Holy Ghost.",
      es: "Venid a mí y sed __________ …, para que seáis __________ por la recepción del Espíritu Santo.",
      pt: "Vinde a mim e sede __________ … a fim de que sejais __________, recebendo o Espírito Santo."
    },
    tags: ["baptism", "sanctification"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "bom-ether-12-6",
    work: "BOM",
    book: "Ether",
    reference: "Ether 12:6",
    keyPhrase: {
      en: "Ye receive no witness until after the trial of your faith.",
      es: "No recibís ningún testimonio sino hasta después de la prueba de vuestra fe.",
      pt: "Não recebeis testemunho senão depois da prova de vossa fé."
    },
    cloze: {
      en: "Ye __________ no __________ until after the trial of your faith.",
      es: "No __________ ningún __________ sino hasta después de la prueba de vuestra fe.",
      pt: "Não __________ __________ senão depois da prova de vossa fé."
    },
    tags: ["faith", "testimony"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "bom-ether-12-27",
    work: "BOM",
    book: "Ether",
    reference: "Ether 12:27",
    keyPhrase: {
      en: "If men come unto me … then will I make weak things become strong unto them.",
      es: "Si los hombres vienen a mí …, entonces haré que las cosas débiles sean fuertes para ellos.",
      pt: "Se os homens vierem a mim, … então farei com que as coisas fracas se tornem fortes para eles."
    },
    cloze: {
      en: "If men come unto me … then will I make weak things __________ __________ unto them.",
      es: "Si los __________ vienen a mí …, __________ haré que las cosas débiles sean fuertes para ellos.",
      pt: "Se os __________ __________ a mim, … então farei com que as coisas fracas se tornem fortes para eles."
    },
    tags: ["humility", "grace"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "bom-moroni-7-45-48",
    work: "BOM",
    book: "Moroni",
    reference: "Moroni 7:45–48",
    keyPhrase: {
      en: "Charity is the pure love of Christ.",
      es: "La caridad es el amor puro de Cristo.",
      pt: "A caridade é o puro amor de Cristo."
    },
    cloze: {
      en: "__________ is the pure love of __________.",
      es: "La __________ es el amor puro de __________.",
      pt: "A __________ é o puro amor de __________."
    },
    tags: ["charity", "love"],
    aceLinks: ["act_in_faith"]
  },
  {
    id: "bom-moroni-10-4-5",
    work: "BOM",
    book: "Moroni",
    reference: "Moroni 10:4–5",
    keyPhrase: {
      en: "Ask with a sincere heart, with real intent, having faith in Christ … [and] by the power of the Holy Ghost ye may know the truth of all things.",
      es: "Pedid con un corazón sincero, con verdadera intención, teniendo fe en Cristo …; y por el poder del Espíritu Santo podréis conocer la verdad de todas las cosas.",
      pt: "Perguntai com um coração sincero e com real intenção, tendo fé em Cristo, … e pelo poder do Espírito Santo podeis saber a verdade de todas as coisas."
    },
    cloze: {
      en: "Ask with a __________ heart, with real __________, having faith in Christ … [and] by the power of the Holy Ghost ye may know the truth of all things.",
      es: "Pedid con un corazón sincero, con __________ __________, teniendo fe en Cristo …; y por el poder del Espíritu Santo podréis conocer la verdad de todas las cosas.",
      pt: "__________ com um coração sincero e com real __________, tendo fé em Cristo, … e pelo poder do Espírito Santo podeis saber a verdade de todas as coisas."
    },
    tags: ["prayer", "testimony", "holy ghost"],
    aceLinks: ["divinely_appointed_sources", "act_in_faith"]
  }
];
