
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GameOption } from "./types";

interface GameSelectorProps {
  selectedGame: GameOption;
  onGameChange: (game: GameOption) => void;
}

const GameSelector = ({ selectedGame, onGameChange }: GameSelectorProps) => {
  return (
    <Select 
      value={selectedGame} 
      onValueChange={(value) => onGameChange(value as GameOption)}
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
  );
};

export default GameSelector;
