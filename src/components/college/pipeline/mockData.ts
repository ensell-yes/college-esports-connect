
import { PipelineRecruitCard, RecruitmentStage, StageColumn } from "./types";

// Mock recruit cards
const mockRecruits: PipelineRecruitCard[] = [
  {
    id: "r1",
    name: "Alex Johnson",
    game: "Valorant",
    primaryRole: "Duelist",
    classification: "Junior",
    rank: "Diamond II",
    recruitmentStatus: "Available",
    stage: "Scouted",
    latestNote: {
      content: "Strong mechanical skills, needs to work on communication",
      date: "2025-05-20",
      author: "Coach Anderson"
    }
  },
  {
    id: "r2",
    name: "Sam Rodriguez",
    game: "Valorant",
    primaryRole: "Controller",
    classification: "Sophomore",
    rank: "Platinum I",
    recruitmentStatus: "Available",
    stage: "Scouted"
  },
  {
    id: "r3",
    name: "Taylor Kim",
    game: "Rocket League",
    primaryRole: "Striker",
    classification: "Senior",
    rank: "Champion III",
    recruitmentStatus: "Available",
    stage: "Contacted",
    latestNote: {
      content: "Excellent positioning, follow up next week",
      date: "2025-05-19",
      author: "Coach Wilson"
    }
  },
  {
    id: "r4",
    name: "Jordan Lee",
    game: "Marvel Rivals",
    primaryRole: "Support",
    classification: "Freshman",
    rank: "Gold I",
    recruitmentStatus: "Available",
    stage: "Contacted"
  },
  {
    id: "r5",
    name: "Casey Parker",
    game: "Valorant",
    primaryRole: "Initiator",
    classification: "Junior",
    rank: "Immortal I",
    recruitmentStatus: "Available",
    stage: "Invite to Trial",
    latestNote: {
      content: "Set up trial for next Tuesday, @CoachLee please join",
      date: "2025-05-21",
      author: "Coach Martinez"
    }
  },
  {
    id: "r6",
    name: "Morgan Smith",
    game: "Rocket League",
    primaryRole: "Defender",
    classification: "Senior",
    rank: "Grand Champion I",
    recruitmentStatus: "Available",
    stage: "Offer",
    latestNote: {
      content: "Offer sent for Fall 2025 scholarship, waiting response",
      date: "2025-05-18",
      author: "Coach Anderson"
    }
  },
  {
    id: "r7",
    name: "Riley Thompson",
    game: "Valorant",
    primaryRole: "Sentinel",
    classification: "Junior",
    rank: "Diamond III",
    recruitmentStatus: "Interested",
    stage: "Committed",
    latestNote: {
      content: "Signed letter of intent for Fall 2025",
      date: "2025-05-15",
      author: "Coach Wilson"
    }
  }
];

// Generate columns with recruits
export const generateMockColumns = (): StageColumn[] => {
  const stages: RecruitmentStage[] = ["Scouted", "Contacted", "Invite to Trial", "Offer", "Committed"];
  
  return stages.map((stage, index) => ({
    id: `column-${index}`,
    title: stage,
    recruitCards: mockRecruits.filter(recruit => recruit.stage === stage)
  }));
};
