
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ValorantStatsPanel from "./stats/ValorantStatsPanel";
import RocketLeagueStatsPanel from "./stats/RocketLeagueStatsPanel";

const StatsPanel = () => {
  const [selectedGame, setSelectedGame] = useState("valorant");

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <span>Player Stats</span>
          <div className="flex gap-2">
            <Button
              variant={selectedGame === "valorant" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGame("valorant")}
              className="text-xs"
            >
              Valorant
            </Button>
            <Button
              variant={selectedGame === "rocket-league" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGame("rocket-league")}
              className="text-xs"
            >
              Rocket League
            </Button>
            <Button
              variant={selectedGame === "league-of-legends" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGame("league-of-legends")}
              className="text-xs"
            >
              League of Legends
            </Button>
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
