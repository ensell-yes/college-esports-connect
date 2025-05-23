
// Smart Prospecting Types
export type GameTitle = 'Valorant' | 'Rocket League' | 'League of Legends' | 'Counter-Strike' | 'Fortnite' | 'Marvel Rivals';

export type Role = {
  name: string;
  game: GameTitle;
};

export type PlayStyleTag = 
  | 'aggressive'
  | 'defensive'
  | 'objective-oriented' 
  | 'shot-caller'
  | 'support-oriented'
  | 'flex'
  | 'strategic'
  | 'mechanical'
  | 'team-oriented'
  | 'solo-oriented';

export type SkillTier = {
  tier: string;
  division?: string;
  game: GameTitle;
};

export type ProspectProfile = {
  id: string;
  name: string;
  location: string;
  avatarUrl: string;
  games: Array<{
    title: GameTitle;
    primaryRole: string;
    skillTier: SkillTier;
    playStyleTags: PlayStyleTag[];
    performanceMetrics: {
      winRate?: number;
      kda?: number;
      avgScore?: number;
      matches?: number;
    };
  }>;
  education: {
    school: string;
    type: 'High School' | 'Community College';
    graduationYear: number;
  };
};

export type RosterNeed = {
  role: string;
  count: number;
  priority: number;
};

export type RecommendationRequest = {
  programId: string;
  game: GameTitle;
  requiredRoles: RosterNeed[];
  stylePreferences: PlayStyleTag[];
};

export type RecommendationMatch = {
  prospect: ProspectProfile;
  matchScore: number;
  roleMatchScore: number;
  skillTierScore: number;
  playStyleScore: number;
  keyHighlights: string[];
};
