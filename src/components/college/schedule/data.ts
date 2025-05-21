
import { GameType, ScheduleGame } from "./types";

export const valorantSchedule: ScheduleGame[] = [
  {
    id: "v1",
    opponent: "Coe College",
    date: "2024-09-26T00:00:00Z",
    time: "3:00 PM",
    homeAway: "Away",
    location: "Cedar Rapids, IA",
    result: {
      win: true,
      score: "13-5"
    },
    completed: true
  },
  {
    id: "v2",
    opponent: "Winthrop University",
    date: "2024-10-03T00:00:00Z",
    time: "3:00 PM",
    homeAway: "Home",
    location: "Lamoni, IA",
    result: {
      win: false,
      score: "7-13"
    },
    completed: true
  },
  {
    id: "v3",
    opponent: "University of Jamestown",
    date: "2024-10-10T00:00:00Z",
    time: "3:00 PM",
    homeAway: "Away",
    location: "Jamestown, ND",
    result: {
      win: true,
      score: "13-11"
    },
    completed: true
  },
  {
    id: "v4",
    opponent: "Midland University",
    date: "2024-10-17T00:00:00Z",
    time: "3:00 PM",
    homeAway: "Home",
    location: "Lamoni, IA",
    completed: false
  },
  {
    id: "v5",
    opponent: "Hastings College",
    date: "2024-10-24T00:00:00Z",
    time: "3:00 PM",
    homeAway: "Away",
    location: "Hastings, NE",
    completed: false
  },
  {
    id: "v6",
    opponent: "Mount Mercy University",
    date: "2024-11-07T00:00:00Z",
    time: "3:00 PM",
    homeAway: "Home",
    location: "Lamoni, IA",
    completed: false
  },
  {
    id: "v7",
    opponent: "Morningside University",
    date: "2024-11-14T00:00:00Z",
    time: "3:00 PM",
    homeAway: "Away",
    location: "Sioux City, IA",
    completed: false
  }
];

export const rocketLeagueSchedule: ScheduleGame[] = [
  {
    id: "r1",
    opponent: "Lincoln University (MO)",
    date: "2024-09-15T00:00:00Z",
    time: "3:00 PM",
    homeAway: "Away",
    location: "Jefferson City, MO",
    result: {
      win: true,
      score: "3-0"
    },
    completed: true
  },
  {
    id: "r2",
    opponent: "University of Jamestown",
    date: "2024-09-22T00:00:00Z",
    time: "3:00 PM",
    homeAway: "Home",
    location: "Lamoni, IA",
    result: {
      win: true,
      score: "3-1"
    },
    completed: true
  },
  {
    id: "r3",
    opponent: "Midland University",
    date: "2024-10-06T00:00:00Z",
    time: "3:00 PM",
    homeAway: "Away",
    location: "Fremont, NE",
    result: {
      win: false,
      score: "1-3"
    },
    completed: true
  },
  {
    id: "r4",
    opponent: "Mount Mercy University",
    date: "2024-10-13T00:00:00Z",
    time: "3:00 PM",
    homeAway: "Home",
    location: "Lamoni, IA",
    completed: false
  },
  {
    id: "r5",
    opponent: "Grand View University",
    date: "2024-10-27T00:00:00Z",
    time: "3:00 PM",
    homeAway: "Away",
    location: "Des Moines, IA",
    completed: false
  },
  {
    id: "r6",
    opponent: "Morningside University",
    date: "2024-11-03T00:00:00Z",
    time: "3:00 PM",
    homeAway: "Home",
    location: "Lamoni, IA",
    completed: false
  }
];

export const getSchedule = (gameType: GameType): ScheduleGame[] => {
  return gameType === "Valorant" ? valorantSchedule : rocketLeagueSchedule;
};
