import { ACE, LocalizedText } from './types';

/**
 * Scenario bank for ACE Match: short, teen-relatable situations where a
 * student applies one of the principles of acquiring spiritual knowledge.
 * Original game content (not scripture text); scenario translations are
 * game copy, not official Church translations.
 */
export interface AceScenario {
  id: string;
  principle: ACE;
  text: LocalizedText;
}

export const ACE_SCENARIOS: AceScenario[] = [
  // --- Act in Faith ---
  {
    id: 'sc-aif-1',
    principle: 'act_in_faith',
    text: {
      en: 'Maya isn’t sure early-morning seminary is worth it. She decides to keep attending for a month and pay attention to how she feels.',
      es: 'Maya no está segura de que valga la pena el seminario matutino. Decide seguir asistiendo un mes y prestar atención a cómo se siente.',
      pt: 'Maya não tem certeza se o seminário de madrugada vale a pena. Ela decide continuar frequentando por um mês e observar como se sente.',
    },
  },
  {
    id: 'sc-aif-2',
    principle: 'act_in_faith',
    text: {
      en: 'Diego hasn’t received a clear answer about serving a mission, so he starts preparing anyway while he keeps praying.',
      es: 'Diego no ha recibido una respuesta clara sobre servir una misión, así que comienza a prepararse de todos modos mientras sigue orando.',
      pt: 'Diego não recebeu uma resposta clara sobre servir uma missão, então começa a se preparar mesmo assim enquanto continua orando.',
    },
  },
  {
    id: 'sc-aif-3',
    principle: 'act_in_faith',
    text: {
      en: 'After praying about a conflict with her friend, Ava decides to apologize first — even though it feels unfair.',
      es: 'Después de orar sobre un conflicto con su amiga, Ava decide disculparse primero, aunque le parezca injusto.',
      pt: 'Depois de orar sobre um conflito com a amiga, Ava decide pedir desculpas primeiro — mesmo parecendo injusto.',
    },
  },
  {
    id: 'sc-aif-4',
    principle: 'act_in_faith',
    text: {
      en: 'Ethan doesn’t feel anything when he reads the scriptures lately. Instead of quitting, he keeps his daily study and asks God for help to understand.',
      es: 'Últimamente Ethan no siente nada cuando lee las Escrituras. En vez de rendirse, continúa su estudio diario y le pide ayuda a Dios para entender.',
      pt: 'Ultimamente Ethan não sente nada ao ler as escrituras. Em vez de desistir, mantém o estudo diário e pede a Deus ajuda para entender.',
    },
  },
  {
    id: 'sc-aif-5',
    principle: 'act_in_faith',
    text: {
      en: 'Lena has doubts about a gospel topic. She writes them down, keeps living the standards she does believe, and trusts answers will come.',
      es: 'Lena tiene dudas sobre un tema del Evangelio. Las anota, sigue viviendo las normas en las que sí cree y confía en que las respuestas llegarán.',
      pt: 'Lena tem dúvidas sobre um assunto do evangelho. Ela as anota, continua vivendo os padrões em que crê e confia que as respostas virão.',
    },
  },
  // --- Examine concepts with an Eternal Perspective ---
  {
    id: 'sc-ep-1',
    principle: 'eternal_perspective',
    text: {
      en: 'Liam’s family has to move right before his senior year. He asks himself what this change might mean ten years from now — and in eternity.',
      es: 'La familia de Liam debe mudarse justo antes de su último año. Él se pregunta qué significará este cambio dentro de diez años y en la eternidad.',
      pt: 'A família de Liam precisa se mudar bem antes do último ano dele. Ele se pergunta o que essa mudança significará daqui a dez anos — e na eternidade.',
    },
  },
  {
    id: 'sc-ep-2',
    principle: 'eternal_perspective',
    text: {
      en: 'Sofia didn’t make the team and wonders why God would let it happen. She tries to see what this disappointment could teach her about who she is becoming.',
      es: 'Sofia no quedó en el equipo y se pregunta por qué Dios lo permitiría. Intenta ver qué puede enseñarle esta decepción sobre quién está llegando a ser.',
      pt: 'Sofia não entrou no time e se pergunta por que Deus permitiria isso. Ela tenta ver o que essa decepção pode ensinar sobre quem ela está se tornando.',
    },
  },
  {
    id: 'sc-ep-3',
    principle: 'eternal_perspective',
    text: {
      en: 'When his grandmother passes away, Noah frames his grief with what he knows about God’s plan and families being eternal.',
      es: 'Cuando fallece su abuela, Noah enmarca su dolor en lo que sabe del plan de Dios y de que las familias son eternas.',
      pt: 'Quando sua avó falece, Noah encara a dor com o que sabe sobre o plano de Deus e sobre as famílias serem eternas.',
    },
  },
  {
    id: 'sc-ep-4',
    principle: 'eternal_perspective',
    text: {
      en: 'A friend asks Zoe why her church has rules about dating. Before answering, Zoe thinks about how the standards fit into God’s plan for her happiness.',
      es: 'Una amiga le pregunta a Zoe por qué su iglesia tiene normas sobre las citas. Antes de responder, Zoe piensa en cómo esas normas encajan en el plan de Dios para su felicidad.',
      pt: 'Uma amiga pergunta a Zoe por que a igreja dela tem padrões sobre namoro. Antes de responder, Zoe pensa em como esses padrões se encaixam no plano de Deus para a felicidade dela.',
    },
  },
  {
    id: 'sc-ep-5',
    principle: 'eternal_perspective',
    text: {
      en: 'Mateo feels behind because his friends seem to have life figured out. He remembers that God measures growth differently than the world does.',
      es: 'Mateo se siente atrasado porque sus amigos parecen tener la vida resuelta. Recuerda que Dios mide el progreso de manera distinta al mundo.',
      pt: 'Mateo se sente atrasado porque os amigos parecem ter a vida resolvida. Ele lembra que Deus mede o crescimento de um jeito diferente do mundo.',
    },
  },
  // --- Seek further understanding through Divinely Appointed Sources ---
  {
    id: 'sc-das-1',
    principle: 'divinely_appointed_sources',
    text: {
      en: 'Emma sees a viral video making claims about the Church. Before reacting, she looks up what the scriptures and living prophets actually teach.',
      es: 'Emma ve un video viral con afirmaciones sobre la Iglesia. Antes de reaccionar, busca lo que realmente enseñan las Escrituras y los profetas vivientes.',
      pt: 'Emma vê um vídeo viral com afirmações sobre a Igreja. Antes de reagir, ela pesquisa o que as escrituras e os profetas vivos realmente ensinam.',
    },
  },
  {
    id: 'sc-das-2',
    principle: 'divinely_appointed_sources',
    text: {
      en: 'Lucas has a question about the Word of Wisdom, so he studies it in the scriptures and in recent general conference talks.',
      es: 'Lucas tiene una pregunta sobre la Palabra de Sabiduría, así que la estudia en las Escrituras y en discursos recientes de la conferencia general.',
      pt: 'Lucas tem uma pergunta sobre a Palavra de Sabedoria, então a estuda nas escrituras e em discursos recentes da conferência geral.',
    },
  },
  {
    id: 'sc-das-3',
    principle: 'divinely_appointed_sources',
    text: {
      en: 'Before making a big decision about school, Isabela re-reads her patriarchal blessing and asks her parents and bishop for counsel.',
      es: 'Antes de tomar una gran decisión sobre sus estudios, Isabela vuelve a leer su bendición patriarcal y pide consejo a sus padres y a su obispo.',
      pt: 'Antes de tomar uma grande decisão sobre os estudos, Isabela relê sua bênção patriarcal e pede conselho aos pais e ao bispo.',
    },
  },
  {
    id: 'sc-das-4',
    principle: 'divinely_appointed_sources',
    text: {
      en: 'A classmate says the Bible has been changed too much to trust. Aiden decides to study what the Restoration teaches about scripture before forming his answer.',
      es: 'Un compañero dice que la Biblia ha cambiado demasiado para confiar en ella. Aiden decide estudiar lo que la Restauración enseña sobre las Escrituras antes de formar su respuesta.',
      pt: 'Um colega diz que a Bíblia mudou demais para ser confiável. Aiden decide estudar o que a Restauração ensina sobre as escrituras antes de formar sua resposta.',
    },
  },
  {
    id: 'sc-das-5',
    principle: 'divinely_appointed_sources',
    text: {
      en: 'Chloe wonders how to help a friend who is struggling. She searches the Gospel Library and prays to know which teachings apply.',
      es: 'Chloe se pregunta cómo ayudar a una amiga que está pasando por dificultades. Busca en la Biblioteca del Evangelio y ora para saber qué enseñanzas aplicar.',
      pt: 'Chloe quer saber como ajudar uma amiga que está passando por dificuldades. Ela pesquisa na Biblioteca do Evangelho e ora para saber quais ensinamentos se aplicam.',
    },
  },
];
