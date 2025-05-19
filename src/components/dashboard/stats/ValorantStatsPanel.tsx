
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { valorantMockData } from "./mockData";
import { 
  ChartLine, 
  ArrowUp, 
  ArrowDown, 
  Calendar 
} from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const ValorantStatsPanel = () => {
  const [gameMode, setGameMode] = useState("all");
  const [agent, setAgent] = useState("all");
  const [matchResult, setMatchResult] = useState("all");
  const [kdTimeframe, setKdTimeframe] = useState("lifetime");

  const data = valorantMockData;

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
              <SelectItem value="swiftplay">Swiftplay</SelectItem>
              <SelectItem value="escalation">Escalation</SelectItem>
              <SelectItem value="spike-rush">Spike Rush</SelectItem>
              <SelectItem value="unrated">Unrated</SelectItem>
              <SelectItem value="premier">Premier</SelectItem>
              <SelectItem value="competitive">Competitive</SelectItem>
              <SelectItem value="replication">Replication</SelectItem>
              <SelectItem value="snowball">Snowball Fight</SelectItem>
              <SelectItem value="practice">Practice Game Modes</SelectItem>
              <SelectItem value="radiant">Radiant Rank Competitive</SelectItem>
              <SelectItem value="plant-defuse">Plant Defuse Mode Unrated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="text-xs text-muted-foreground mb-1 block">Agent</label>
          <Select value={agent} onValueChange={setAgent}>
            <SelectTrigger>
              <SelectValue placeholder="Select Agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="jett">Jett</SelectItem>
              <SelectItem value="omen">Omen</SelectItem>
              <SelectItem value="brimstone">Brimstone</SelectItem>
              <SelectItem value="phoenix">Phoenix</SelectItem>
              <SelectItem value="raze">Raze</SelectItem>
              <SelectItem value="reyna">Reyna</SelectItem>
              <SelectItem value="sova">Sova</SelectItem>
              <SelectItem value="viper">Viper</SelectItem>
              <SelectItem value="astra">Astra</SelectItem>
              <SelectItem value="neon">Neon</SelectItem>
              <SelectItem value="sage">Sage</SelectItem>
              <SelectItem value="skye">Skye</SelectItem>
              <SelectItem value="yoru">Yoru</SelectItem>
              <SelectItem value="cypher">Cypher</SelectItem>
              <SelectItem value="killjoy">Killjoy</SelectItem>
              <SelectItem value="chamber">Chamber</SelectItem>
              <SelectItem value="harbor">Harbor</SelectItem>
              <SelectItem value="fade">Fade</SelectItem>
              <SelectItem value="breach">Breach</SelectItem>
              <SelectItem value="kayo">KAY/O</SelectItem>
              <SelectItem value="gekko">Gekko</SelectItem>
              <SelectItem value="iso">Iso</SelectItem>
              <SelectItem value="clove">Clove</SelectItem>
              <SelectItem value="deadlock">Deadlock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[120px]">
          <label className="text-xs text-muted-foreground mb-1 block">Match Result</label>
          <div className="flex rounded-md bg-muted/30 p-1">
            <button 
              className={`flex-1 text-xs px-3 py-1 rounded ${matchResult === 'all' ? 'bg-background shadow-sm' : ''}`}
              onClick={() => setMatchResult('all')}
            >
              All
            </button>
            <button 
              className={`flex-1 text-xs px-3 py-1 rounded ${matchResult === 'win' ? 'bg-background shadow-sm' : ''}`}
              onClick={() => setMatchResult('win')}
            >
              Win
            </button>
            <button 
              className={`flex-1 text-xs px-3 py-1 rounded ${matchResult === 'loss' ? 'bg-background shadow-sm' : ''}`}
              onClick={() => setMatchResult('loss')}
            >
              Loss
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/20 p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-sm">K/D RATIO</h3>
            <div className="flex rounded-md bg-muted/30 p-1">
              <button 
                className={`text-xs px-3 py-1 rounded ${kdTimeframe === 'lifetime' ? 'bg-background shadow-sm' : ''}`}
                onClick={() => setKdTimeframe('lifetime')}
              >
                Lifetime
              </button>
              <button 
                className={`text-xs px-3 py-1 rounded ${kdTimeframe === 'recent' ? 'bg-background shadow-sm' : ''}`}
                onClick={() => setKdTimeframe('recent')}
              >
                Recent Matches
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-5xl font-bold">{data.kdRatio[kdTimeframe]}</div>
          </div>
        </div>

        <div className="bg-muted/20 p-4 rounded-md">
          <h3 className="font-semibold text-sm mb-2">BEST MATCH</h3>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Map</span>
              <span className="font-semibold">{data.bestMatch.map}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Kills</span>
              <span className="font-semibold">{data.bestMatch.kills}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">K/D Ratio</span>
              <span className="font-semibold">{data.bestMatch.kdRatio}</span>
            </div>
          </div>
        </div>

        <div className="bg-muted/20 p-4 rounded-md">
          <h3 className="font-semibold text-sm mb-2">BEST MAP</h3>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Map</span>
              <span className="font-semibold">{data.bestMap.map}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Kills</span>
              <span className="font-semibold">{data.bestMap.kills}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">K/D Ratio</span>
              <span className="font-semibold">{data.bestMap.kdRatio}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted/20 p-3 rounded-md flex flex-col">
          <span className="text-xs text-muted-foreground">Kills</span>
          <span className="text-2xl font-semibold">{data.stats.kills}</span>
        </div>
        <div className="bg-muted/20 p-3 rounded-md flex flex-col">
          <span className="text-xs text-muted-foreground">Deaths</span>
          <span className="text-2xl font-semibold">{data.stats.deaths}</span>
        </div>
        <div className="bg-muted/20 p-3 rounded-md flex flex-col">
          <span className="text-xs text-muted-foreground">Assists</span>
          <span className="text-2xl font-semibold">{data.stats.assists}</span>
        </div>
        <div className="bg-muted/20 p-3 rounded-md flex flex-col">
          <span className="text-xs text-muted-foreground">Headshots</span>
          <span className="text-2xl font-semibold">{data.stats.headshots}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-muted/20 p-3 rounded-md flex flex-col">
          <span className="text-xs text-muted-foreground">Matches W/L</span>
          <span className="text-2xl font-semibold">{data.stats.matchesWL}</span>
        </div>
        <div className="bg-muted/20 p-3 rounded-md flex flex-col">
          <span className="text-xs text-muted-foreground">Rounds W/L</span>
          <span className="text-2xl font-semibold">{data.stats.roundsWL}</span>
        </div>
        <div className="bg-muted/20 p-3 rounded-md flex flex-col">
          <span className="text-xs text-muted-foreground">Total Damage</span>
          <span className="text-2xl font-semibold">{data.stats.totalDamage.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm flex items-center gap-1">
            <ChartLine className="h-4 w-4" /> PERFORMANCE TREND
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" /> Last 30 days
          </div>
        </div>
        <div className="bg-muted/10 rounded-md p-2 h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.performanceTrend}>
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

export default ValorantStatsPanel;
