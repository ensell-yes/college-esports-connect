
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Recruit } from "./types/recruitTypes";
import { recruitData } from "./data/recruitData";

interface TopRecruitsPanelProps {
  className?: string;
}

type GameOption = "Valorant" | "Rocket League" | "League of Legends";
type CountOption = 10 | 50 | 100;

const TopRecruitsPanel = ({ className = "" }: TopRecruitsPanelProps) => {
  // State for selected game and count
  const [selectedGame, setSelectedGame] = useState<GameOption>("Valorant");
  const [selectedCount, setSelectedCount] = useState<CountOption>(10);

  // Filter recruits based on the selected game
  const filteredRecruits = recruitData
    .filter(recruit => recruit.game === selectedGame)
    .slice(0, selectedCount);

  // Check if the selected game has enough data or if it's still coming soon
  const isComingSoon = selectedGame === "Rocket League" || selectedGame === "League of Legends";

  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Top Recruits</CardTitle>
        <div className="flex space-x-2">
          {/* Game selector */}
          <Select 
            value={selectedGame} 
            onValueChange={(value) => setSelectedGame(value as GameOption)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Game" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Valorant">Valorant</SelectItem>
              <SelectItem value="Rocket League">Rocket League</SelectItem>
              <SelectItem value="League of Legends">League of Legends</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Count selector */}
          <Select 
            value={selectedCount.toString()} 
            onValueChange={(value) => setSelectedCount(parseInt(value) as CountOption)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Count" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Top 10</SelectItem>
              <SelectItem value="50">Top 50</SelectItem>
              <SelectItem value="100">Top 100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isComingSoon ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">{selectedGame} recruit data coming soon</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Classification</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>University</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecruits.map((recruit) => (
                  <TableRow key={recruit.id}>
                    <TableCell className="font-medium">{recruit.currentRank}</TableCell>
                    <TableCell>{recruit.firstName} {recruit.lastName}</TableCell>
                    <TableCell>
                      {recruit.city}, {recruit.state ? `${recruit.state}, ` : ''}{recruit.country}
                    </TableCell>
                    <TableCell>{recruit.classification}</TableCell>
                    <TableCell>
                      {recruit.game === "Valorant" ? recruit.mainAgent : "-"}
                    </TableCell>
                    <TableCell>{recruit.recruitmentStatus}</TableCell>
                    <TableCell>{recruit.university || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopRecruitsPanel;
