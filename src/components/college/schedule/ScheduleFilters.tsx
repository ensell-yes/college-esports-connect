
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GameType, ScheduleFilters } from "./types";

interface ScheduleFiltersProps {
  filters: ScheduleFilters;
  onGameTypeChange: (gameType: GameType) => void;
  onToggleCompleted: () => void;
  onToggleUpcoming: () => void;
}

const ScheduleFilters = ({
  filters,
  onGameTypeChange,
  onToggleCompleted,
  onToggleUpcoming
}: ScheduleFiltersProps) => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <Tabs 
        defaultValue={filters.gameType} 
        onValueChange={(value) => onGameTypeChange(value as GameType)}
        className="w-full md:w-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Valorant">Valorant</TabsTrigger>
          <TabsTrigger value="Rocket League">Rocket League</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={filters.showCompleted ? "default" : "outline"}
          onClick={onToggleCompleted}
          className="text-xs"
        >
          {filters.showCompleted ? "Hide Completed" : "Show Completed"}
        </Button>
        <Button
          size="sm"
          variant={filters.showUpcoming ? "default" : "outline"}
          onClick={onToggleUpcoming}
          className="text-xs"
        >
          {filters.showUpcoming ? "Hide Upcoming" : "Show Upcoming"}
        </Button>
      </div>
    </div>
  );
};

export default ScheduleFilters;
