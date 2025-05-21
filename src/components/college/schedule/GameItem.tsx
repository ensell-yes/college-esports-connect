
import { Badge } from "@/components/ui/badge";
import { ScheduleGame } from "./types";
import { Calendar } from "lucide-react";

interface GameItemProps {
  game: ScheduleGame;
}

const GameItem = ({ game }: GameItemProps) => {
  const isHomeGame = game.homeAway === "Home";
  const isNeutralGame = game.homeAway === "Neutral";
  
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{new Date(game.date).toLocaleDateString()}</span>
          <span className="text-sm text-gray-600">{game.time}</span>
        </div>
        
        {game.completed ? (
          <Badge variant={game.result?.win ? "success" : "destructive"}>
            {game.result?.win ? "Win" : "Loss"}
          </Badge>
        ) : (
          <Badge variant="outline">Upcoming</Badge>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">
            {isHomeGame ? "vs " : isNeutralGame ? "vs " : "@ "}
            {game.opponent}
          </h3>
          <p className="text-sm text-gray-600">{game.location}</p>
        </div>
        
        {game.completed && game.result && (
          <div className="text-xl font-bold">
            {game.result.score}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameItem;
