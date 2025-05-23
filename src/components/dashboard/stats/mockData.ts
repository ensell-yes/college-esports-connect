
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
        attributes: { },
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
      },
      {
        type: "hero-role",
        attributes: {
          roleId: "strategist"
        },
        metadata: {
          name: "Strategist",
          imageUrl: "https://trackercdn.com/cdn/tracker.gg/marvel-rivals/images/roles/strategist.png"
        },
        stats: {
          matchesPlayed: {
            value: 86
          },
          matchesWon: {
            value: 33
          },
          winRate: {
            value: 38.4
          },
          kills: {
            value: 713
          },
          deaths: {
            value: 475
          },
          assists: {
            value: 861
          },
          kda: {
            value: 3.31
          }
        }
      },
      {
        type: "hero-role",
        attributes: {
          roleId: "vanguard"
        },
        metadata: {
          name: "Vanguard",
          imageUrl: "https://trackercdn.com/cdn/tracker.gg/marvel-rivals/images/roles/vanguard.png"
        },
        stats: {
          matchesPlayed: {
            value: 28
          },
          matchesWon: {
            value: 9
          },
          winRate: {
            value: 32.1
          },
          kills: {
            value: 196
          },
          deaths: {
            value: 175
          },
          assists: {
            value: 24
          },
          kda: {
            value: 1.26
          }
        }
      },
      {
        type: "hero-role",
        attributes: {
          roleId: "duelist"
        },
        metadata: {
          name: "Duelist",
          imageUrl: "https://trackercdn.com/cdn/tracker.gg/marvel-rivals/images/roles/duelist.png"
        },
        stats: {
          matchesPlayed: {
            value: 3
          },
          matchesWon: {
            value: 1
          },
          winRate: {
            value: 33.3
          },
          kills: {
            value: 48
          },
          deaths: {
            value: 20
          },
          assists: {
            value: 0
          },
          kda: {
            value: 2.4
          }
        }
      }
    ]
  }
};

// Add more mock data for other games here
