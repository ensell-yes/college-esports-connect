
import { useState, useMemo } from "react";
import { getSchedule } from "./data";
import { GameType, ScheduleGame, ScheduleFilters } from "./types";

export const useScheduleData = (initialGameType: GameType = "Valorant") => {
  const [filters, setFilters] = useState<ScheduleFilters>({
    gameType: initialGameType,
    showCompleted: true,
    showUpcoming: true
  });

  const scheduleData = useMemo(() => {
    const allGames = getSchedule(filters.gameType);
    
    return allGames.filter(game => {
      if (game.completed && !filters.showCompleted) return false;
      if (!game.completed && !filters.showUpcoming) return false;
      return true;
    });
  }, [filters]);

  const stats = useMemo(() => {
    const allGames = getSchedule(filters.gameType);
    const completed = allGames.filter(game => game.completed);
    const wins = completed.filter(game => game.result?.win).length;
    const losses = completed.filter(game => game.result && !game.result.win).length;
    
    return {
      wins,
      losses,
      total: completed.length,
      winPercentage: completed.length > 0 
        ? Math.round((wins / completed.length) * 100) 
        : 0
    };
  }, [filters.gameType]);

  const setGameType = (gameType: GameType) => {
    setFilters(prev => ({ ...prev, gameType }));
  };

  const toggleCompleted = () => {
    setFilters(prev => ({ ...prev, showCompleted: !prev.showCompleted }));
  };

  const toggleUpcoming = () => {
    setFilters(prev => ({ ...prev, showUpcoming: !prev.showUpcoming }));
  };

  return {
    scheduleData,
    filters,
    stats,
    setGameType,
    toggleCompleted,
    toggleUpcoming
  };
};
