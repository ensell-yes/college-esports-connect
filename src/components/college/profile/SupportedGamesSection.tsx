
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Check, Plus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { CollegeGame } from "../types";

interface SupportedGamesSectionProps {
  games: CollegeGame[];
  onUpdate?: (games: CollegeGame[]) => void;
}

const SupportedGamesSection = ({ games, onUpdate }: SupportedGamesSectionProps) => {
  const [selectedGames, setSelectedGames] = useState<CollegeGame[]>(games || []);
  const [isOpen, setIsOpen] = useState(false);
  const { hasDemoAccess } = useAuth();

  // List of all possible games
  const allGames = [
    { name: "Rocket League", color: "bg-blue-500 hover:bg-blue-600" },
    { name: "League of Legends", color: "bg-purple-600 hover:bg-purple-700" },
    { name: "Valorant", color: "bg-red-500 hover:bg-red-600" },
    { name: "Marvel Rivals", color: "bg-red-600 hover:bg-red-700" },
    { name: "Counter-Strike", color: "bg-green-700 hover:bg-green-800" },
    { name: "Super Smash Bros", color: "bg-yellow-500 hover:bg-yellow-600" },
    { name: "Call of Duty", color: "bg-gray-700 hover:bg-gray-800" },
    { name: "Chess", color: "bg-blue-700 hover:bg-blue-800" },
    { name: "Fortnite", color: "bg-orange-500 hover:bg-orange-600" },
    { name: "Hearthstone", color: "bg-blue-600 hover:bg-blue-700" },
    { name: "iRacing", color: "bg-green-600 hover:bg-green-700" },
    { name: "F1", color: "bg-red-700 hover:bg-red-800" },
    { name: "Madden", color: "bg-green-500 hover:bg-green-600" },
    { name: "NBA 2K", color: "bg-blue-800 hover:bg-blue-900" },
    { name: "Overwatch 2", color: "bg-orange-600 hover:bg-orange-700" },
    { name: "PUBG", color: "bg-yellow-600 hover:bg-yellow-700" },
    { name: "Rainbow 6: Siege", color: "bg-teal-600 hover:bg-teal-700" },
    { name: "FC", color: "bg-green-800 hover:bg-green-900" },
    { name: "Tekken 8", color: "bg-purple-700 hover:bg-purple-800" },
    { name: "Street Fighter 6", color: "bg-red-800 hover:bg-red-900" },
    { name: "Apex Legends", color: "bg-red-500 hover:bg-red-600" },
    { name: "DOTA", color: "bg-purple-800 hover:bg-purple-900" },
    { name: "ESL R1", color: "bg-blue-900 hover:bg-blue-950" },
    { name: "Free Fire", color: "bg-orange-700 hover:bg-orange-800" },
    { name: "Mobile Legends Bang Bang", color: "bg-blue-500 hover:bg-blue-600" },
    { name: "Starcraft 2", color: "bg-yellow-800 hover:bg-yellow-900" },
    { name: "Teamfight Tactics", color: "bg-indigo-600 hover:bg-indigo-700" },
  ];

  const toggleGame = (game: CollegeGame) => {
    const gameIndex = selectedGames.findIndex(g => g.name === game.name);
    if (gameIndex >= 0) {
      // Remove the game
      setSelectedGames(selectedGames.filter(g => g.name !== game.name));
    } else {
      // Add the game
      setSelectedGames([...selectedGames, game]);
    }
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(selectedGames);
      toast.success("Supported games updated successfully");
    }
    setIsOpen(false);
  };

  const showEditButton = hasDemoAccess() && onUpdate;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Games Supported</h3>
        {showEditButton && (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Pencil className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Select Supported Games</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="grid grid-cols-2 gap-2">
                  {allGames.map((game) => {
                    const isSelected = selectedGames.some(g => g.name === game.name);
                    return (
                      <div key={game.name} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                        <Checkbox 
                          id={`game-${game.name}`} 
                          checked={isSelected}
                          onCheckedChange={() => toggleGame(game)}
                        />
                        <label 
                          htmlFor={`game-${game.name}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                        >
                          {game.name}
                        </label>
                        <Badge className={game.color.split(' ')[0]}>
                          Sample
                        </Badge>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Check className="mr-1 h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {(games || []).map((game) => (
          <Badge key={game.name} className={game.color}>
            {game.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SupportedGamesSection;
