
export type RecruitmentStatus = "Available" | "Committed" | "Signed" | "Interested";

export type Classification = "Freshman" | "Sophomore" | "Junior" | "Senior";

export type ValorantAgent = 
  | "Astra" | "Breach" | "Brimstone" | "Chamber" | "Cypher" | "Fade" 
  | "Gekko" | "Harbor" | "Iso" | "Jett" | "KAY/O" | "Killjoy" | "Neon" 
  | "Omen" | "Phoenix" | "Raze" | "Reyna" | "Sage" | "Skye" | "Sova" 
  | "Viper" | "Yoru" | "Clove" | "Deadlock";

export interface BaseRecruit {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  country: string;
  classification: Classification;
  recruitmentStatus: RecruitmentStatus;
  university?: string;
  currentRank: number;
}

export interface ValorantRecruit extends BaseRecruit {
  game: "Valorant";
  mainAgent: ValorantAgent;
  rank: string;
}

export interface RocketLeagueRecruit extends BaseRecruit {
  game: "Rocket League";
}

export interface LeagueRecruit extends BaseRecruit {
  game: "League of Legends";
}

export type Recruit = ValorantRecruit | RocketLeagueRecruit | LeagueRecruit;
