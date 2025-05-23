
export type RecruitmentStage = "Scouted" | "Contacted" | "Invite to Trial" | "Offer" | "Committed";

export type PipelineRecruitCard = {
  id: string;
  name: string;
  game: string;
  primaryRole: string;
  classification: string;
  rank: string;
  recruitmentStatus: string;
  stage: RecruitmentStage;
  latestNote?: {
    content: string;
    date: string;
    author: string;
  };
};

export type StageColumn = {
  id: string;
  title: RecruitmentStage;
  recruitCards: PipelineRecruitCard[];
};
