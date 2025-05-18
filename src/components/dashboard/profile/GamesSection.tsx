
import { Badge } from "@/components/ui/badge";
import { Game } from "./types";

interface GamesSectionProps {
  games: Game[];
}

const GamesSection = ({ games }: GamesSectionProps) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Games Played</h3>
      <div className="flex flex-wrap gap-2">
        {games.map(game => (
          <Badge 
            key={game.name} 
            className={`${game.color} hover:${game.color} text-white cursor-pointer`}
          >
            {game.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default GamesSection;
