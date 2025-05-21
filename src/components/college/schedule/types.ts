
export type GameType = "Valorant" | "Rocket League";

export interface ScheduleGame {
  id: string;
  opponent: string;
  date: string; // ISO date string
  time: string;
  homeAway: "Home" | "Away" | "Neutral";
  location: string;
  result?: {
    win: boolean;
    score: string; // e.g., "3-2" or "13-7"
  };
  completed: boolean;
}

export interface ScheduleFilters {
  gameType: GameType;
  showCompleted: boolean;
  showUpcoming: boolean;
}
