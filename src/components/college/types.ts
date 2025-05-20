
// Game interface
export interface CollegeGame {
  name: string;
  color: string;
}

// College data interface
export interface CollegeData {
  name: string;
  city: string;
  state: string;
  country: string;
  headline: string;
  followers: number;
  logo: string;
  coverImage: string;
  games: CollegeGame[];
  overview: string;
  website: string;
  esportsWebsite: string;
}
