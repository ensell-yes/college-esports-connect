
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recruitData } from "./data/recruitData";
import { GameOption, CountOption, SortState, MultiFilterState } from "./recruits/types";
import { Classification, ValorantAgent, RecruitmentStatus } from "./types/recruitTypes";
import GameSelector from "./recruits/GameSelector";
import CountSelector from "./recruits/CountSelector";
import FilterDropdown from "./recruits/FilterDropdown";
import RecruitsTable from "./recruits/RecruitsTable";
import useRecruitFiltering from "./recruits/hooks/useRecruitFiltering";
import useFilterOptions from "./recruits/hooks/useFilterOptions";

interface TopRecruitsPanelProps {
  className?: string;
}

const TopRecruitsPanel = ({ className = "" }: TopRecruitsPanelProps) => {
  // State for selected game and count
  const [selectedGame, setSelectedGame] = useState<GameOption>("Valorant");
  const [selectedCount, setSelectedCount] = useState<CountOption>(10);
  
  // State for sorting
  const [sort, setSort] = useState<SortState>({ column: "rank", direction: "asc" });
  
  // State for multi-select filters
  const [filters, setFilters] = useState<MultiFilterState>({
    classifications: [],
    agents: [],
    statuses: []
  });

  // Toggle sort direction for a column
  const toggleSort = (column: typeof sort.column) => {
    if (sort.column === column) {
      // Cycle through: asc -> desc -> null -> asc
      const nextDirection = sort.direction === "asc" 
        ? "desc" 
        : sort.direction === "desc" 
          ? null 
          : "asc";
      
      setSort({ column: nextDirection ? column : null, direction: nextDirection });
    } else {
      setSort({ column, direction: "asc" });
    }
  };

  // Handle checkbox filter changes
  const toggleFilter = (filterType: keyof MultiFilterState, value: Classification | ValorantAgent | RecruitmentStatus) => {
    setFilters(prev => {
      const currentValues = prev[filterType] as any[];
      return {
        ...prev,
        [filterType]: currentValues.includes(value)
          ? currentValues.filter(item => item !== value)
          : [...currentValues, value]
      };
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      classifications: [],
      agents: [],
      statuses: []
    });
  };

  // Get the filter options
  const filterOptions = useFilterOptions(recruitData, selectedGame);

  // Filter and sort recruits based on selected options
  const processedRecruits = useRecruitFiltering(
    recruitData, 
    selectedGame, 
    selectedCount, 
    filters, 
    sort
  );

  // Check if the selected game has enough data or if it's still coming soon
  const isComingSoon = selectedGame === "Rocket League" || selectedGame === "League of Legends";
  
  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Top Recruits</CardTitle>
        <div className="flex space-x-2">
          {/* Game selector */}
          <GameSelector 
            selectedGame={selectedGame} 
            onGameChange={(game) => setSelectedGame(game)} 
          />
          
          {/* Count selector */}
          <CountSelector 
            selectedCount={selectedCount} 
            onCountChange={(count) => setSelectedCount(count)}
          />
          
          {/* Filter dropdown */}
          <FilterDropdown 
            filters={filters}
            filterOptions={filterOptions}
            selectedGame={selectedGame}
            toggleFilter={toggleFilter}
            resetFilters={resetFilters}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isComingSoon ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">{selectedGame} recruit data coming soon</p>
          </div>
        ) : (
          <RecruitsTable 
            recruits={processedRecruits}
            sort={sort}
            toggleSort={toggleSort}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TopRecruitsPanel;
