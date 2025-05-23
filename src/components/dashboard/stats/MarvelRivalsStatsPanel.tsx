
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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

  // Mock roles data for the roles played table
  const mockRolesData = profileData.data.segments.slice(1);

  const RolesPlayedTable = () => {
    return (
      <div className="space-y-2">
        <h3 className="font-semibold text-sm flex items-center gap-1">
          Roles Played - Marvel Rivals
        </h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Matches</TableHead>
                <TableHead className="text-right">Win Rate (%)</TableHead>
                <TableHead className="text-right">Kills</TableHead>
                <TableHead className="text-right">Deaths</TableHead>
                <TableHead className="text-right">Assists</TableHead>
                <TableHead className="text-right">KDA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRolesData.map((role) => (
                <TableRow key={role.attributes.roleId}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <img
                        src={role.metadata.imageUrl}
                        alt={role.metadata.name}
                        className="w-6 h-6 rounded-full"
                      />
                      {role.metadata.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{role.stats.matchesPlayed.value}</TableCell>
                  <TableCell className="text-right">{role.stats.winRate.value.toFixed(1)}</TableCell>
                  <TableCell className="text-right">{role.stats.kills.value}</TableCell>
                  <TableCell className="text-right">{role.stats.deaths.value}</TableCell>
                  <TableCell className="text-right">{role.stats.assists.value}</TableCell>
                  <TableCell className="text-right">{role.stats.kda.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

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
              <Button 
                variant={timeframe === 'lifetime' ? 'default' : 'ghost'}
                size="sm" 
                className="text-xs h-7"
                onClick={() => setTimeframe('lifetime')}
              >
                Lifetime
              </Button>
              <Button 
                variant={timeframe === 'recent' ? 'default' : 'ghost'}
                size="sm" 
                className="text-xs h-7"
                onClick={() => setTimeframe('recent')}
              >
                Recent
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-5xl font-bold">{stats.kdRatio.value}</div>
          </div>
        </div>

        <div className="bg-muted/20 p-4 rounded-md">
          <h3 className="font-semibold text-sm mb-2">MATCH STATISTICS</h3>
          <div className="flex flex-col space-y-2">
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
          <div className="flex flex-col space-y-2">
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

      <div className="mt-4">
        {RolesPlayedTable()}
      </div>
    </div>
  );
};

export default MarvelRivalsStatsPanel;
