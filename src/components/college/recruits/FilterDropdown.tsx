
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MultiFilterState, FilterOptions } from "./types";
import { Classification, RecruitmentStatus, ValorantAgent } from "../types/recruitTypes";

interface FilterDropdownProps {
  filters: MultiFilterState;
  filterOptions: FilterOptions;
  selectedGame: string;
  toggleFilter: (filterType: keyof MultiFilterState, value: Classification | ValorantAgent | RecruitmentStatus) => void;
  resetFilters: () => void;
}

const FilterDropdown = ({
  filters,
  filterOptions,
  selectedGame,
  toggleFilter,
  resetFilters,
}: FilterDropdownProps) => {
  // Get active filter count for the button label
  const activeFilterCount = Object.values(filters).reduce(
    (count, filterArray) => count + filterArray.length, 
    0
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 text-xs">Classification</DropdownMenuLabel>
          <ScrollArea className="h-[120px]">
            <div className="p-2 space-y-1">
              {filterOptions.classifications.map((cls) => (
                <div key={cls} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`classification-${cls}`} 
                    checked={filters.classifications.includes(cls)}
                    onCheckedChange={() => toggleFilter('classifications', cls)}
                  />
                  <label 
                    htmlFor={`classification-${cls}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {cls}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        {selectedGame === "Valorant" && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-2 text-xs">Agent</DropdownMenuLabel>
              <ScrollArea className="h-[180px]">
                <div className="p-2 space-y-1">
                  {filterOptions.agents.map((agent) => (
                    <div key={agent} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`agent-${agent}`} 
                        checked={filters.agents.includes(agent)}
                        onCheckedChange={() => toggleFilter('agents', agent)}
                      />
                      <label 
                        htmlFor={`agent-${agent}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {agent}
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 text-xs">Status</DropdownMenuLabel>
          <ScrollArea className="h-[120px]">
            <div className="p-2 space-y-1">
              {filterOptions.statuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`status-${status}`} 
                    checked={filters.statuses.includes(status)}
                    onCheckedChange={() => toggleFilter('statuses', status)}
                  />
                  <label 
                    htmlFor={`status-${status}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={resetFilters}
          >
            Reset All Filters
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
