export type Person = {
  id: number;
  name: string;
  skill: string;
  category: string;
  image: string;
  avatar: string;
  theme: string;
  description: string;
  looking: string;
  duration: string;
  cost: number;
};
export const people: Person[] = [
  {
    id: 1,
    name: "Léa",
    skill: "Nail art & manucure.",
    category: "Beauté & création",
    image: "./images/nails.webp",
    avatar: "./images/lea.webp",
    theme: "rose",
    description:
      "J’adore transformer une idée en petits détails colorés. Je te propose une initiation au nail art : préparation, motifs et création de ton propre style.",
    looking: "Un coup de main pour mes montages vidéo",
    duration: "1 h",
    cost: 1,
  },
  {
    id: 2,
    name: "Noah",
    skill: "Photo au smartphone.",
    category: "Photo & vidéo",
    image: "./images/camera.svg",
    avatar: "./images/noah.webp",
    theme: "sage",
    description:
      "Lumière, cadrage, petits moments : je te partage mes astuces pour faire de belles photos avec ton téléphone. On apprend en créant ensemble.",
    looking: "Pratiquer mon anglais à l’oral",
    duration: "1 h",
    cost: 1,
  },
  {
    id: 3,
    name: "Inès",
    skill: "Premiers pas en céramique.",
    category: "Art & artisanat",
    image: "./images/pottery.svg",
    avatar: "./images/ines.webp",
    theme: "peach",
    description:
      "Une première découverte de la céramique, sans pression. On imagine une forme et on apprend les gestes de base pour la façonner.",
    looking: "De l’aide pour créer mon portfolio",
    duration: "2 h",
    cost: 2,
  },
  {
    id: 4,
    name: "Adam",
    skill: "Débuter la guitare.",
    category: "Musique",
    image: "./images/guitar.svg",
    avatar: "./images/adam.webp",
    theme: "lavender",
    description:
      "Tu veux commencer la guitare ? Je te montre quelques accords et on joue ton premier morceau à ton rythme.",
    looking: "Des conseils en dessin",
    duration: "1 h",
    cost: 1,
  },
];

export const categoryInfo = [
  {
    name: "Beauté & création",
    short: "Beauté",
    icon: "sparkles",
    color: "rose",
    cover: "./images/nails.webp",
    description: "Nail art, coiffure et petits détails.",
  },
  {
    name: "Photo & vidéo",
    short: "Photo & vidéo",
    icon: "camera",
    color: "sage",
    cover: "./images/camera.svg",
    description: "Du premier cliché au montage final.",
  },
  {
    name: "Art & artisanat",
    short: "Artisanat",
    icon: "palette",
    color: "peach",
    cover: "./images/pottery.svg",
    description: "Dessiner, fabriquer, imaginer.",
  },
  {
    name: "Musique",
    short: "Musique",
    icon: "music",
    color: "lavender",
    cover: "./images/guitar.svg",
    description: "Un instrument, un morceau, à ton rythme.",
  },
  {
    name: "Cours & langues",
    short: "Cours & langues",
    icon: "languages",
    color: "lavender",
    cover: "./images/languages.svg",
    description: "Réviser ensemble et oser parler.",
  },
  {
    name: "Numérique",
    short: "Numérique",
    icon: "laptop",
    color: "sage",
    cover: "./images/digital.svg",
    description: "Prendre confiance avec les outils.",
  },
  {
    name: "Cuisine",
    short: "Cuisine",
    icon: "chef",
    color: "peach",
    cover: "./images/cooking.svg",
    description: "Des recettes à partager et à refaire.",
  },
  {
    name: "Vie pratique",
    short: "Vie pratique",
    icon: "briefcase",
    color: "rose",
    cover: "./images/practical.svg",
    description: "Un CV, une idée, un coup de main.",
  },
];
export const categoryNames = [
  "Tout explorer",
  ...categoryInfo.map((c) => c.name),
];
const more: Omit<Person, "avatar" | "name">[] = [
  {
    id: 5,
    skill: "Pratiquer l’anglais sans stress.",
    category: "Cours & langues",
    image: "./images/languages.svg",
    theme: "lavender",
    description:
      "Une heure de conversation autour de sujets que tu aimes. On cherche ses mots, on se trompe et on progresse ensemble.",
    looking: "Apprendre les bases de la photo",
    duration: "1 h",
    cost: 1,
  },
  {
    id: 6,
    skill: "Un ordinateur, zéro panique.",
    category: "Numérique",
    image: "./images/digital.svg",
    theme: "sage",
    description:
      "Classer tes fichiers, préparer une présentation ou comprendre un tableur : on part de ce qui te bloque et on avance pas à pas.",
    looking: "De l’aide pour mon CV",
    duration: "1 h",
    cost: 1,
  },
  {
    id: 7,
    skill: "Les pâtes, faites maison.",
    category: "Cuisine",
    image: "./images/cooking.svg",
    theme: "peach",
    description:
      "Farine, eau, un peu de patience : je te montre une recette simple à refaire. On vérifie ensemble les ingrédients et les éventuelles allergies avant tout atelier.",
    looking: "Une initiation à la guitare",
    duration: "2 h",
    cost: 2,
  },
  {
    id: 8,
    skill: "Un CV qui te ressemble.",
    category: "Vie pratique",
    image: "./images/practical.svg",
    theme: "rose",
    description:
      "On organise tes expériences et tes idées pour construire un CV clair. Dans cette démo, on travaille uniquement avec des informations inventées.",
    looking: "Des conseils de mise en page",
    duration: "1 h",
    cost: 1,
  },
  {
    id: 9,
    skill: "Ton premier montage vidéo.",
    category: "Photo & vidéo",
    image: "./images/camera.svg",
    theme: "sage",
    description:
      "Choisir ses plans, faire des coupes et poser une musique : je te montre un petit montage avec des médias de démonstration.",
    looking: "Pratiquer mon anglais",
    duration: "1 h",
    cost: 1,
  },
  {
    id: 10,
    skill: "Comprendre les maths, ensemble.",
    category: "Cours & langues",
    image: "./images/languages.svg",
    theme: "lavender",
    description:
      "On reprend un exercice de lycée à ton rythme. Le but : comprendre la méthode et pouvoir la refaire seul.",
    looking: "Un atelier de cuisine",
    duration: "1 h",
    cost: 1,
  },
  {
    id: 11,
    skill: "Dessiner son premier portrait.",
    category: "Art & artisanat",
    image: "./images/pottery.svg",
    theme: "peach",
    description:
      "Des formes simples pour apprendre à observer et à dessiner un visage. Un crayon et quelques feuilles suffisent.",
    looking: "Découvrir le nail art",
    duration: "1 h",
    cost: 1,
  },
  {
    id: 12,
    skill: "Une présentation qui accroche.",
    category: "Numérique",
    image: "./images/digital.svg",
    theme: "sage",
    description:
      "On travaille la structure, la mise en page et le rythme d’une présentation scolaire, avec des exemples fictifs.",
    looking: "Débuter la céramique",
    duration: "1 h",
    cost: 1,
  },
];
// Each fictional member may offer several services. Existing IDs remain stable.
for (const [i, p] of more.entries()) {
  const member = people[i % 4];
  people.push({ ...p, name: member.name, avatar: member.avatar });
}
export const demoMembers = people.slice(0, 4);
export function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr")
    .trim();
}
