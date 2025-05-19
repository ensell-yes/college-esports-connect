
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ValorantStatsPanel from "./stats/ValorantStatsPanel";
import RocketLeagueStatsPanel from "./stats/RocketLeagueStatsPanel";

const StatsPanel = () => {
  const [selectedGame, setSelectedGame] = useState("valorant");

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <span>Player Stats</span>
          <div className="w-48">
            <Select value={selectedGame} onValueChange={setSelectedGame}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Game Stats" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="valorant">Valorant</SelectItem>
                <SelectItem value="rocket-league">Rocket League</SelectItem>
                <SelectItem value="league-of-legends">League of Legends</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedGame === "valorant" && <ValorantStatsPanel />}
        {selectedGame === "rocket-league" && <RocketLeagueStatsPanel />}
        {selectedGame === "league-of-legends" && (
          <div className="py-8 text-center">
            <p className="text-gray-500">League of Legends stats coming soon</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsPanel;
