
import { Badge } from "@/components/ui/badge";

interface SupportedGamesSectionProps {
  games: { name: string; color: string }[];
}

const SupportedGamesSection = ({ games }: SupportedGamesSectionProps) => {
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

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Games Supported</h3>
      <div className="flex flex-wrap gap-2">
        {allGames.map((game) => (
          <Badge key={game.name} className={game.color}>
            {game.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SupportedGamesSection;
