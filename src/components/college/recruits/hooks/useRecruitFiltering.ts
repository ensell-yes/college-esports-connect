
import { useMemo } from "react";
import { MultiFilterState, SortState, CountOption } from "../types";
import { Recruit } from "../../types/recruitTypes";

const useRecruitFiltering = (
  recruitData: Recruit[],
  selectedGame: string,
  selectedCount: CountOption,
  filters: MultiFilterState,
  sort: SortState
) => {
  return useMemo(() => {
    let filtered = recruitData.filter(recruit => recruit.game === selectedGame);

    // Apply classification filters if any are selected
    if (filters.classifications.length > 0) {
      filtered = filtered.filter(recruit => 
        filters.classifications.includes(recruit.classification)
      );
    }

    // Apply status filters if any are selected
    if (filters.statuses.length > 0) {
      filtered = filtered.filter(recruit => 
        filters.statuses.includes(recruit.recruitmentStatus)
      );
    }

    // Apply agent filters if any are selected (only for Valorant)
    if (filters.agents.length > 0 && selectedGame === "Valorant") {
      filtered = filtered.filter(
        recruit => recruit.game === "Valorant" && 
          filters.agents.includes(recruit.mainAgent)
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
  }, [recruitData, selectedGame, selectedCount, filters, sort]);
};

export default useRecruitFiltering;
