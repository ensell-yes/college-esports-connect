
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Check, Plus } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { CollegeGame } from "../types";

interface ActivelyRecruitingSectionProps {
  games: CollegeGame[];
  onUpdate?: (games: CollegeGame[]) => void;
}

const ActivelyRecruitingSection = ({ games = [], onUpdate }: ActivelyRecruitingSectionProps) => {
  const [selectedGames, setSelectedGames] = useState<CollegeGame[]>(games || []);
  const [isOpen, setIsOpen] = useState(false);
  const { hasDemoAccess } = useAuth();

  // List of all possible games that could be actively recruiting
  const recruitingGames = [
    { name: "Rocket League", color: "bg-blue-500 hover:bg-blue-600" },
    { name: "Valorant", color: "bg-red-500 hover:bg-red-600" },
    { name: "Marvel Rivals", color: "bg-red-600 hover:bg-red-700" },
    { name: "Counter-Strike", color: "bg-green-700 hover:bg-green-800" },
    { name: "League of Legends", color: "bg-purple-600 hover:bg-purple-700" },
    { name: "Fortnite", color: "bg-orange-500 hover:bg-orange-600" },
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
      toast.success("Actively recruiting games updated successfully");
    }
    setIsOpen(false);
  };

  const showEditButton = hasDemoAccess() && onUpdate;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Actively Recruiting</h3>
        {showEditButton && (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Pencil className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Select Actively Recruiting Games</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="grid grid-cols-2 gap-2">
                  {recruitingGames.map((game) => {
                    const isSelected = selectedGames.some(g => g.name === game.name);
                    return (
                      <div key={game.name} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                        <Checkbox 
                          id={`recruiting-game-${game.name}`} 
                          checked={isSelected}
                          onCheckedChange={() => toggleGame(game)}
                        />
                        <label 
                          htmlFor={`recruiting-game-${game.name}`}
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

export default ActivelyRecruitingSection;
