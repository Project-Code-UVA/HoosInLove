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