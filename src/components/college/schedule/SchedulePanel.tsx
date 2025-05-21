
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScheduleData } from "./useScheduleData";
import ScheduleFilters from "./ScheduleFilters";
import GameItem from "./GameItem";
import { GameType } from "./types";

interface SchedulePanelProps {
  className?: string;
  initialGameType?: GameType;
}

const SchedulePanel = ({ className = "", initialGameType = "Valorant" }: SchedulePanelProps) => {
  const {
    scheduleData,
    filters,
    stats,
    setGameType,
    toggleCompleted,
    toggleUpcoming
  } = useScheduleData(initialGameType);

  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Schedule & Results</span>
          <div className="text-sm font-normal flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 text-green-800">
              {stats.wins} W
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-red-100 text-red-800">
              {stats.losses} L
            </span>
            {stats.total > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800">
                {stats.winPercentage}%
              </span>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ScheduleFilters 
            filters={filters}
            onGameTypeChange={setGameType}
            onToggleCompleted={toggleCompleted}
            onToggleUpcoming={toggleUpcoming}
          />
          
          {scheduleData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No games match your current filters
            </div>
          ) : (
            <div className="grid gap-4">
              {scheduleData.map(game => (
                <GameItem key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchedulePanel;
