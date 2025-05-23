
import { GameTitle, PlayStyleTag, ProspectProfile, RecommendationMatch } from './types';

// Helper function to generate random integer
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to generate a random floating point number with 2 decimal places
const randomFloat = (min: number, max: number): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Helper to pick random items from an array
const pickRandom = <T>(arr: T[], count: number): T[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result.slice(0, count);
};

// Game-specific roles
const gameRoles: Record<GameTitle, string[]> = {
  'Valorant': ['Duelist', 'Controller', 'Initiator', 'Sentinel'],
  'Rocket League': ['Striker', 'Midfielder', 'Defender', 'Flex'],
  'League of Legends': ['Top', 'Jungle', 'Mid', 'ADC', 'Support'],
  'Counter-Strike': ['Entry Fragger', 'AWPer', 'Lurker', 'Support', 'IGL'],
  'Fortnite': ['Builder', 'Box Fighter', 'Sniper', 'Support'],
  'Marvel Rivals': ['Tank', 'Damage', 'Support', 'Flex']
};

// Skill tiers by game
const skillTiers: Record<GameTitle, string[]> = {
  'Valorant': ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'],
  'Rocket League': ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Champion', 'Grand Champion', 'Supersonic Legend'],
  'League of Legends': ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger'],
  'Counter-Strike': ['Silver', 'Nova', 'Guardian', 'Master Guardian', 'Distinguished Master Guardian', 'Legendary Eagle', 'Supreme', 'Global Elite'],
  'Fortnite': ['Open', 'Contender', 'Champion'],
  'Marvel Rivals': ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster']
};

// All possible play style tags
const allPlayStyleTags: PlayStyleTag[] = [
  'aggressive', 'defensive', 'objective-oriented', 'shot-caller', 
  'support-oriented', 'flex', 'strategic', 'mechanical', 
  'team-oriented', 'solo-oriented'
];

// High schools and community colleges
const schools = [
  { name: 'Lincoln High School', type: 'High School' as const },
  { name: 'Washington High School', type: 'High School' as const },
  { name: 'Jefferson High School', type: 'High School' as const },
  { name: 'Roosevelt High School', type: 'High School' as const },
  { name: 'Elmwood Community College', type: 'Community College' as const },
  { name: 'Riverdale Community College', type: 'Community College' as const },
  { name: 'Sunnyvale Community College', type: 'Community College' as const },
  { name: 'Oakridge Community College', type: 'Community College' as const },
];

// Locations
const locations = [
  'Los Angeles, CA', 'San Francisco, CA', 'Chicago, IL', 'New York, NY',
  'Houston, TX', 'Miami, FL', 'Seattle, WA', 'Denver, CO',
  'Atlanta, GA', 'Boston, MA', 'Philadelphia, PA', 'Dallas, TX'
];

// Generate a random prospect profile
const generateProspect = (id: number): ProspectProfile => {
  // Select 1-2 games for this player
  const playerGames: GameTitle[] = pickRandom<GameTitle>(
    ['Valorant', 'Rocket League', 'League of Legends', 'Counter-Strike', 'Fortnite', 'Marvel Rivals'] as GameTitle[],
    randomInt(1, 2)
  );
  
  const school = schools[randomInt(0, schools.length - 1)];
  
  return {
    id: `prospect-${id}`,
    name: `Player ${id}`,
    location: locations[randomInt(0, locations.length - 1)],
    avatarUrl: `https://i.pravatar.cc/150?img=${randomInt(1, 70)}`,
    games: playerGames.map(game => ({
      title: game,
      primaryRole: gameRoles[game][randomInt(0, gameRoles[game].length - 1)],
      skillTier: {
        tier: skillTiers[game][randomInt(Math.floor(skillTiers[game].length / 2), skillTiers[game].length - 1)], // Bias towards higher tiers
        division: ['I', 'II', 'III'][randomInt(0, 2)],
        game
      },
      playStyleTags: pickRandom<PlayStyleTag>(allPlayStyleTags, randomInt(2, 4)),
      performanceMetrics: {
        winRate: randomFloat(0.45, 0.70),
        kda: randomFloat(1.0, 5.0),
        avgScore: randomInt(200, 350),
        matches: randomInt(100, 1000)
      }
    })),
    education: {
      school: school.name,
      type: school.type,
      graduationYear: randomInt(2025, 2027)
    }
  };
};

// Generate 100 prospect profiles
export const mockProspects: ProspectProfile[] = Array.from({ length: 100 }, (_, i) => generateProspect(i + 1));

// Simulates the recommendation engine output for a given game
export const generateRecommendations = (
  game: GameTitle,
  requiredRoles: string[],
  stylePreferences: PlayStyleTag[]
): RecommendationMatch[] => {
  // Filter prospects who play the requested game
  const filteredProspects = mockProspects.filter(prospect => 
    prospect.games.some(g => g.title === game)
  );

  // Calculate match scores
  const matches = filteredProspects.map(prospect => {
    const playerGame = prospect.games.find(g => g.title === game)!;
    
    // Role match score (highest when the role exactly matches one of the required roles)
    const roleMatchScore = requiredRoles.includes(playerGame.primaryRole) ? 100 : 50;
    
    // Skill tier score (simplified version)
    const tierIndex = skillTiers[game].indexOf(playerGame.skillTier.tier);
    const maxTierIndex = skillTiers[game].length - 1;
    const skillTierScore = tierIndex / maxTierIndex * 100;
    
    // Play style compatibility score
    const styleMatchCount = stylePreferences.filter(style => 
      playerGame.playStyleTags.includes(style)
    ).length;
    const playStyleScore = stylePreferences.length > 0 
      ? (styleMatchCount / stylePreferences.length) * 100
      : 100;
    
    // Weighted match score (50% role, 30% skill tier, 20% play style)
    const matchScore = (
      roleMatchScore * 0.5 +
      skillTierScore * 0.3 +
      playStyleScore * 0.2
    );
    
    // Generate key highlights
    const keyHighlights: string[] = [];
    
    // Role match highlight
    if (requiredRoles.includes(playerGame.primaryRole)) {
      keyHighlights.push(`Perfect role match: ${playerGame.primaryRole}`);
    }
    
    // Skill tier highlight
    if (tierIndex >= Math.floor(maxTierIndex * 0.7)) {
      keyHighlights.push(`Top ${Math.ceil((maxTierIndex - tierIndex) / maxTierIndex * 100)}% skill tier: ${playerGame.skillTier.tier} ${playerGame.skillTier.division || ''}`);
    }
    
    // Play style match highlight
    if (styleMatchCount > 0) {
      const matchingStyles = stylePreferences.filter(style => playerGame.playStyleTags.includes(style));
      keyHighlights.push(`Style match: ${matchingStyles.join(', ')}`);
    }
    
    // Performance highlight
    if (playerGame.performanceMetrics.winRate && playerGame.performanceMetrics.winRate > 0.55) {
      keyHighlights.push(`High win rate: ${Math.round(playerGame.performanceMetrics.winRate * 100)}%`);
    }
    if (playerGame.performanceMetrics.kda && playerGame.performanceMetrics.kda > 3.0) {
      keyHighlights.push(`Strong KDA: ${playerGame.performanceMetrics.kda.toFixed(2)}`);
    }
    
    return {
      prospect,
      matchScore,
      roleMatchScore,
      skillTierScore,
      playStyleScore,
      keyHighlights: keyHighlights.slice(0, 3) // Limit to top 3 highlights
    };
  });
  
  // Sort by match score (descending) and take top 10
  return matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);
};
