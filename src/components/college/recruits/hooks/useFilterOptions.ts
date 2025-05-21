
import { useMemo } from "react";
import { Recruit } from "../../types/recruitTypes";
import { FilterOptions } from "../types";

const useFilterOptions = (recruitData: Recruit[], selectedGame: string): FilterOptions => {
  return useMemo(() => {
    const gameRecruits = recruitData.filter(recruit => recruit.game === selectedGame);
    
    const classifications = Array.from(new Set(
      gameRecruits.map(recruit => recruit.classification)
    ));
    
    const agents = Array.from(new Set(
      gameRecruits
        .filter(recruit => recruit.game === "Valorant")
        .map(recruit => (recruit.game === "Valorant" ? recruit.mainAgent : undefined))
        .filter(Boolean)
    ));
    
    const statuses = Array.from(new Set(
      gameRecruits.map(recruit => recruit.recruitmentStatus)
    ));
    
    return { 
      classifications, 
      agents, 
      statuses 
    };
  }, [recruitData, selectedGame]);
};

export default useFilterOptions;
