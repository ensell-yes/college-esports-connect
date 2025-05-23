
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { marvelRivalsMockData } from "./mockData";
import { 
  ChartLine, 
  ArrowUp, 
  ArrowDown, 
  Calendar, 
  Shield, 
  Swords, 
  Heart,
  Bomb
} from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const MarvelRivalsStatsPanel = () => {
  const [gameMode, setGameMode] = useState("all");
  const [timeframe, setTimeframe] = useState("lifetime");
  
  // Use mock data instead of API call to avoid CORS issues
  const profileData = marvelRivalsMockData;
  const stats = profileData.data.segments[0].stats;

  // Generate performance trend data
  const performanceTrend = Array.from({ length: 14 }, (_, i) => ({
    date: `${i + 1}`,
    value: 1 + Math.random() * 1.5
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs text-muted-foreground mb-1 block">Game Mode</label>
          <Select value={gameMode} onValueChange={setGameMode}>
            <SelectTrigger>
              <SelectValue placeholder="Select Game Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="deathmatch">Deathmatch</SelectItem>
              <SelectItem value="escort">Escort</SelectItem>
              <SelectItem value="domination">Domination</SelectItem>
              <SelectItem value="ranked">Ranked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/20 p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-sm">K/D RATIO</h3>
            <div className="flex rounded-md bg-muted/30 p-1">
              <button 
                className={`text-xs px-3 py-1 rounded ${timeframe === 'lifetime' ? 'bg-background shadow-sm' : ''}`}
                onClick={() => setTimeframe('lifetime')}
              >
                Lifetime
              </button>
              <button 
                className={`text-xs px-3 py-1 rounded ${timeframe === 'recent' ? 'bg-background shadow-sm' : ''}`}
                onClick={() => setTimeframe('recent')}
              >
                Recent Matches
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-5xl font-bold">{stats.kdRatio.value}</div>
          </div>
        </div>

        <div className="bg-muted/20 p-4 rounded-md">
          <h3 className="font-semibold text-sm mb-2">MATCH STATISTICS</h3>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Matches Played</span>
              <span className="font-semibold">{stats.matchesPlayed.value}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Matches Won</span>
              <span className="font-semibold">{stats.matchesWon.value}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Win Rate</span>
              <span className="font-semibold">{stats.winRate.value}%</span>
            </div>
          </div>
        </div>

        <div className="bg-muted/20 p-4 rounded-md">
          <h3 className="font-semibold text-sm mb-2">CHARACTER STATS</h3>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">KDA Ratio</span>
              <span className="font-semibold">{stats.kda.value}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Damage Dealt</span>
              <span className="font-semibold">{stats.damageDealt.value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Healing Done</span>
              <span className="font-semibold">{stats.healingDone.value.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted/20 p-3 rounded-md flex flex-col">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Swords className="h-3 w-3" /> Kills
          </span>
          <span className="text-2xl font-semibold">{stats.kills.value}</span>
        </div>
        <div className="bg-muted/20 p-3 rounded-md flex flex-col">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Shield className="h-3 w-3" /> Deaths
          </span>
          <span className="text-2xl font-semibold">{stats.deaths.value}</span>
        </div>
        <div className="bg-muted/20 p-3 rounded-md flex flex-col">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Heart className="h-3 w-3" /> Assists
          </span>
          <span className="text-2xl font-semibold">{stats.assists.value}</span>
        </div>
        <div className="bg-muted/20 p-3 rounded-md flex flex-col">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Bomb className="h-3 w-3" /> Damage/Match
          </span>
          <span className="text-2xl font-semibold">
            {Math.round(stats.damageDealt.value / stats.matchesPlayed.value).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm flex items-center gap-1">
            <ChartLine className="h-4 w-4" /> PERFORMANCE TREND
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" /> Last 14 matches
          </div>
        </div>
        <div className="bg-muted/10 rounded-md p-2 h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceTrend}>
              <XAxis 
                dataKey="date" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                activeDot={{ r: 8 }}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MarvelRivalsStatsPanel;
