
import { ValorantAgent, Classification, RecruitmentStatus } from "../types/recruitTypes";

export type GameOption = "Valorant" | "Rocket League" | "League of Legends";
export type CountOption = 10 | 50 | 100;
export type SortDirection = "asc" | "desc" | null;
export type SortColumn = "rank" | "name" | "location" | "classification" | "agent" | "status" | "university" | null;

export interface SortState {
  column: SortColumn;
  direction: SortDirection;
}

export interface MultiFilterState {
  classifications: Classification[];
  agents: ValorantAgent[];
  statuses: RecruitmentStatus[];
}

export interface FilterOptions {
  classifications: Classification[];
  agents: ValorantAgent[];
  statuses: RecruitmentStatus[];
}
