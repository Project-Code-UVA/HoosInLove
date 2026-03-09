export type Profile = {
  id: string;
  name: string;
  age: number;
  yearLabel: string;
  quote: string;

  major?: string;
  pronouns?: string;
  about?: string;

  lookingFor?: string[];
  lifestyle?: string[];
  loveLanguages?: string[];

  funFact?: string;
  favoriteSpot?: string;
  playlist?: string;
  instagram?: string;

  photoUri?: string;
};

export const MOCK_PROFILES: Profile[] = [
  {
    id: "1",
    name: "Anastasia",
    age: 20,
    yearLabel: "3rd Year",
    quote: "I’m basically always at 2nd floor clem pretending to be locked in",

    major: "Computer Science",
    pronouns: "she/her",
    about: "Matcha addict. Gym 5x a week. Probably debugging something right now.",
    lookingFor: ["Long-term", "Study buddy"],
    lifestyle: ["Gym", "Late-night eats"],
    loveLanguages: ["Quality Time", "Acts of Service"],
    funFact: "When I’m not in class, I’m at hackathons",
    favoriteSpot: "Shenandoah",
    playlist: "Chill coding mix",
    instagram: "ana.codes",
  },
  {
    id: "2",
    name: "Bella",
    age: 19,
    yearLabel: "1st Year",
    quote: "My cats and I come as a package deal.",
    major: "Biology",
    pronouns: "she/her",
    about: "Future vet. Coffee dependent. Obsessed with fall weather.",
  },
  {
    id: "3",
    name: "Grace",
    age: 22,
    yearLabel: "4th Year",
    quote: "If it’s late-night food, I’m already there.",
    major: "Economics",
    pronouns: "she/her",
  },
  {
    id: "4",
    name: "Alyssa",
    age: 20,
    yearLabel: "3rd Year",
    quote: "SQL is my passion <3",
    major: "Computer Science",
    pronouns: "she/her",
  },
  {
    id: "5",
    name: "Any",
    age: 21,
    yearLabel: "3rd Year",
    quote: "Are there any other computer engineers out there",
    major: "Computer Engineering",
    pronouns: "she/her",
  },
  {
    id: "6",
    name: "Calli",
    age: 20,
    yearLabel: "3rd Year",
    quote: "#1 hater of parking passes",
    major: "Computer Science",
    pronouns: "she/her",
  },
  {
    id: "7",
    name: "Naomi",
    age: 19,
    yearLabel: "1st Year",
    quote: "I need a study partner",
    major: "Nursing",
    pronouns: "she/her",
  },
];