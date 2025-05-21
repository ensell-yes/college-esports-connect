
import { useState, useMemo } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Filter, ArrowUp, ArrowDown } from "lucide-react";
import { Recruit, RecruitmentStatus, Classification, ValorantAgent } from "./types/recruitTypes";
import { recruitData } from "./data/recruitData";

interface TopRecruitsPanelProps {
  className?: string;
}

type GameOption = "Valorant" | "Rocket League" | "League of Legends";
type CountOption = 10 | 50 | 100;
type SortDirection = "asc" | "desc" | null;
type SortColumn = "rank" | "name" | "location" | "classification" | "agent" | "status" | "university" | null;

interface SortState {
  column: SortColumn;
  direction: SortDirection;
}

const TopRecruitsPanel = ({ className = "" }: TopRecruitsPanelProps) => {
  // State for selected game and count
  const [selectedGame, setSelectedGame] = useState<GameOption>("Valorant");
  const [selectedCount, setSelectedCount] = useState<CountOption>(10);
  
  // State for sorting
  const [sort, setSort] = useState<SortState>({ column: "rank", direction: "asc" });
  
  // State for filters
  const [filters, setFilters] = useState({
    classification: "" as Classification | "",
    agent: "" as ValorantAgent | "",
    status: "" as RecruitmentStatus | "",
  });

  // Toggle sort direction for a column
  const toggleSort = (column: SortColumn) => {
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

  // Get sort icon based on current sort state
  const getSortIcon = (column: SortColumn) => {
    if (sort.column !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sort.direction === "asc" 
      ? <ArrowUp className="ml-2 h-4 w-4" /> 
      : <ArrowDown className="ml-2 h-4 w-4" />;
  };

  // Handle filter changes
  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      classification: "",
      agent: "",
      status: ""
    });
  };

  // Filter and sort recruits based on selected options
  const processedRecruits = useMemo(() => {
    let filtered = recruitData.filter(recruit => recruit.game === selectedGame);

    // Apply filters
    if (filters.classification) {
      filtered = filtered.filter(recruit => recruit.classification === filters.classification);
    }

    if (filters.status) {
      filtered = filtered.filter(recruit => recruit.recruitmentStatus === filters.status);
    }

    if (filters.agent && selectedGame === "Valorant") {
      filtered = filtered.filter(
        recruit => recruit.game === "Valorant" && recruit.mainAgent === filters.agent
      );
    }

    // Apply sorting if needed
    if (sort.column && sort.direction) {
      filtered.sort((a, b) => {
        let comparison = 0;
        
        switch (sort.column) {
          case "rank":
            comparison = a.currentRank - b.currentRank;
            break;
          case "name":
            comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
            break;
          case "location":
            const locationA = `${a.city}, ${a.state ? `${a.state}, ` : ''}${a.country}`;
            const locationB = `${b.city}, ${b.state ? `${b.state}, ` : ''}${b.country}`;
            comparison = locationA.localeCompare(locationB);
            break;
          case "classification":
            comparison = a.classification.localeCompare(b.classification);
            break;
          case "agent":
            if (a.game === "Valorant" && b.game === "Valorant") {
              comparison = a.mainAgent.localeCompare(b.mainAgent);
            }
            break;
          case "status":
            comparison = a.recruitmentStatus.localeCompare(b.recruitmentStatus);
            break;
          case "university":
            const uniA = a.university || "";
            const uniB = b.university || "";
            comparison = uniA.localeCompare(uniB);
            break;
        }

        return sort.direction === "asc" ? comparison : -comparison;
      });
    }

    // Limit to selected count
    return filtered.slice(0, selectedCount);
  }, [selectedGame, selectedCount, filters, sort]);

  // Check if the selected game has enough data or if it's still coming soon
  const isComingSoon = selectedGame === "Rocket League" || selectedGame === "League of Legends";
  
  // Extract unique values for filter dropdowns
  const filterOptions = useMemo(() => {
    const valorantRecruits = recruitData.filter(recruit => recruit.game === "Valorant");
    
    const classifications = Array.from(new Set(
      valorantRecruits.map(recruit => recruit.classification)
    )) as Classification[];
    
    const agents = Array.from(new Set(
      valorantRecruits
        .filter(recruit => recruit.game === "Valorant")
        .map(recruit => (recruit.game === "Valorant" ? recruit.mainAgent : undefined))
        .filter(Boolean)
    )) as ValorantAgent[];
    
    const statuses = Array.from(new Set(
      valorantRecruits.map(recruit => recruit.recruitmentStatus)
    )) as RecruitmentStatus[];
    
    return { classifications, agents, statuses };
  }, []);

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
          
          {/* Filter button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-2 text-xs">Classification</DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => handleFilterChange("classification", "")}>
                  All
                </DropdownMenuItem>
                {filterOptions.classifications.map((cls) => (
                  <DropdownMenuItem 
                    key={cls} 
                    onSelect={() => handleFilterChange("classification", cls)}
                    className={filters.classification === cls ? "bg-accent" : ""}
                  >
                    {cls}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator />
              
              {selectedGame === "Valorant" && (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-2 text-xs">Agent</DropdownMenuLabel>
                    <DropdownMenuItem onSelect={() => handleFilterChange("agent", "")}>
                      All
                    </DropdownMenuItem>
                    {filterOptions.agents.map((agent) => (
                      <DropdownMenuItem 
                        key={agent} 
                        onSelect={() => handleFilterChange("agent", agent)}
                        className={filters.agent === agent ? "bg-accent" : ""}
                      >
                        {agent}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </>
              )}
              
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-2 text-xs">Status</DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => handleFilterChange("status", "")}>
                  All
                </DropdownMenuItem>
                {filterOptions.statuses.map((status) => (
                  <DropdownMenuItem 
                    key={status} 
                    onSelect={() => handleFilterChange("status", status)}
                    className={filters.status === status ? "bg-accent" : ""}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={resetFilters} className="justify-center font-medium">
                Reset All Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                  <TableHead 
                    className="w-12 cursor-pointer"
                    onClick={() => toggleSort("rank")}
                  >
                    <div className="flex items-center">
                      Rank
                      {getSortIcon("rank")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => toggleSort("name")}
                  >
                    <div className="flex items-center">
                      Name
                      {getSortIcon("name")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => toggleSort("location")}
                  >
                    <div className="flex items-center">
                      Location
                      {getSortIcon("location")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => toggleSort("classification")}
                  >
                    <div className="flex items-center">
                      Classification
                      {getSortIcon("classification")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => toggleSort("agent")}
                  >
                    <div className="flex items-center">
                      Agent
                      {getSortIcon("agent")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => toggleSort("status")}
                  >
                    <div className="flex items-center">
                      Status
                      {getSortIcon("status")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => toggleSort("university")}
                  >
                    <div className="flex items-center">
                      University
                      {getSortIcon("university")}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedRecruits.map((recruit) => (
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
