// Mock data for Valorant stats
export const valorantMockData = {
  kdRatio: {
    lifetime: "0.61",
    recent: "0.65"
  },
  bestMatch: {
    map: "Haven",
    kills: 14,
    kdRatio: "1.00"
  },
  bestMap: {
    map: "Haven",
    kills: 4,
    kdRatio: "1.00"
  },
  stats: {
    kills: 11,
    deaths: 18,
    assists: 4,
    headshots: 3,
    matchesWL: "2 / 2",
    roundsWL: "12 / 11",
    totalDamage: 2021,
    avgPlacement: 7.5
  },
  performanceTrend: [
    { date: "Aug 15, 15:41", value: 0.3 },
    { date: "Aug 15, 15:45", value: 0.5 },
    { date: "Aug 15, 15:50", value: 1.0 },
    { date: "Aug 15, 15:55", value: 0.8 },
    { date: "Aug 15, 16:01", value: 0.25 },
    { date: "Aug 15, 16:05", value: 0.7 },
    { date: "Aug 15, 16:09", value: 1.0 }
  ]
};

// Mock data for Marvel Rivals
export const marvelRivalsMockData = {
  data: {
    platformInfo: {
      platformSlug: "ign",
      platformUserId: "NC3LL-YeS",
      platformUserHandle: "NC3LL-YeS",
      avatarUrl: "https://avatars.tracker.gg/api/avatar/3/nc3ll-yes.png"
    },
    userInfo: {
      userId: null,
      isPremium: false,
      isVerified: false,
      isInfluencer: false,
      isPartner: false,
      countryCode: null
    },
    metadata: {
      currentSeason: 1
    },
    segments: [
      {
        type: "overview",
        attributes": { },
        metadata: {
          name: "All Characters"
        },
        stats: {
          winRate: {
            rank: null,
            percentile: null,
            value: 52.3
          },
          matchesPlayed: {
            rank: null,
            percentile: null,
            value: 142
          },
          matchesWon: {
            rank: null,
            percentile: null,
            value: 74
          },
          kills: {
            rank: null,
            percentile: null,
            value: 1287
          },
          deaths: {
            rank: null,
            percentile: null,
            value: 946
          },
          assists: {
            rank: null,
            percentile: null,
            value: 621
          },
          kda: {
            rank: null,
            percentile: null,
            value: 2.01
          },
          kdRatio: {
            rank: null,
            percentile: null,
            value: 1.36
          },
          damageDealt: {
            rank: null,
            percentile: null,
            value: 1025700
          },
          healingDone: {
            rank: null,
            percentile: null,
            value: 186500
          }
        }
      }
    ]
  }
};

// Add more mock data for other games here
