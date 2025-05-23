
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GameTitle, PlayStyleTag, RecommendationMatch } from "./types";
import { generateRecommendations } from "./mockData";
import { Brain, Filter, RefreshCw, UserPlus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface SmartProspectingPanelProps {
  className?: string;
}

const SmartProspectingPanel: React.FC<SmartProspectingPanelProps> = ({ className = "" }) => {
  // State for selected game, roles, and style preferences
  const [selectedGame, setSelectedGame] = useState<GameTitle>("Valorant");
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Game-specific roles
  const gameRoles: Record<GameTitle, string[]> = {
    'Valorant': ['Duelist', 'Controller', 'Initiator', 'Sentinel'],
    'Rocket League': ['Striker', 'Midfielder', 'Defender', 'Flex'],
    'League of Legends': ['Top', 'Jungle', 'Mid', 'ADC', 'Support'],
    'Counter-Strike': ['Entry Fragger', 'AWPer', 'Lurker', 'Support', 'IGL'],
    'Fortnite': ['Builder', 'Box Fighter', 'Sniper', 'Support'],
    'Marvel Rivals': ['Tank', 'Damage', 'Support', 'Flex']
  };

  // Pre-selected required roles based on the game
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['Duelist', 'Controller']);
  
  // Pre-selected play style preferences
  const [selectedStyles, setSelectedStyles] = useState<PlayStyleTag[]>(['aggressive', 'shot-caller']);
  
  // State for recommended prospects
  const [recommendations, setRecommendations] = useState<RecommendationMatch[]>(
    generateRecommendations(selectedGame, selectedRoles, selectedStyles)
  );

  // Handle game change
  const handleGameChange = (game: GameTitle) => {
    setSelectedGame(game);
    
    // Reset roles based on new game selection
    const defaultRoles = gameRoles[game].slice(0, 2);
    setSelectedRoles(defaultRoles);
    
    // Simulate loading
    refreshRecommendations(game, defaultRoles, selectedStyles);
  };

  // Refresh recommendations
  const refreshRecommendations = (
    game = selectedGame,
    roles = selectedRoles,
    styles = selectedStyles
  ) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newRecommendations = generateRecommendations(game, roles, styles);
      setRecommendations(newRecommendations);
      setIsLoading(false);
    }, 1000);
  };

  // Toggle role selection
  const toggleRole = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  // Toggle style preference
  const toggleStyle = (style: PlayStyleTag) => {
    setSelectedStyles(prev => 
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  // Handle apply filters
  const applyFilters = () => {
    refreshRecommendations();
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-blue-500" />
          <CardTitle className="text-xl font-bold">Smart Prospecting</CardTitle>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedGame} onValueChange={value => handleGameChange(value as GameTitle)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select Game" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Valorant">Valorant</SelectItem>
              <SelectItem value="Rocket League">Rocket League</SelectItem>
              <SelectItem value="League of Legends">League of Legends</SelectItem>
              <SelectItem value="Counter-Strike">Counter-Strike</SelectItem>
              <SelectItem value="Marvel Rivals">Marvel Rivals</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => refreshRecommendations()}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      {showFilters && (
        <div className="px-6 py-2 bg-slate-50 border-t border-b">
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-1">Required Roles</h4>
              <div className="flex flex-wrap gap-1">
                {gameRoles[selectedGame].map(role => (
                  <Badge
                    key={role}
                    variant={selectedRoles.includes(role) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleRole(role)}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Play Style Preferences</h4>
              <div className="flex flex-wrap gap-1">
                {['aggressive', 'defensive', 'objective-oriented', 'shot-caller', 'support-oriented', 'strategic'].map(style => (
                  <Badge
                    key={style}
                    variant={selectedStyles.includes(style as PlayStyleTag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleStyle(style as PlayStyleTag)}
                  >
                    {style}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button size="sm" onClick={applyFilters}>Apply Filters</Button>
            </div>
          </div>
        </div>
      )}
      
      <CardContent>
        <Tabs defaultValue="best-match" className="mt-2">
          <TabsList className="mb-2">
            <TabsTrigger value="best-match">Best Match</TabsTrigger>
            <TabsTrigger value="high-potential">High Potential</TabsTrigger>
          </TabsList>
          
          <TabsContent value="best-match" className="mt-0">
            <div className="space-y-3">
              {isLoading ? (
                // Loading states
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center p-3 border rounded-md">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="ml-3 space-y-2 flex-1">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-8 w-16" />
                  </div>
                ))
              ) : (
                // Recommendation results
                recommendations.map((match, index) => (
                  <div
                    key={match.prospect.id}
                    className={`flex flex-col sm:flex-row sm:items-center p-3 border rounded-md ${
                      index === 0 ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-center flex-1">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={match.prospect.avatarUrl} />
                        <AvatarFallback>{getInitials(match.prospect.name)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="ml-3">
                        <div className="font-medium">
                          {match.prospect.name}
                          {index === 0 && <Badge className="ml-2 bg-blue-500">Top Pick</Badge>}
                        </div>
                        <div className="text-xs text-gray-500">
                          {match.prospect.education.school} • {match.prospect.location}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {match.prospect.games.find(g => g.title === selectedGame)?.primaryRole && (
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              {match.prospect.games.find(g => g.title === selectedGame)?.primaryRole}
                            </Badge>
                          )}
                          {match.prospect.games.find(g => g.title === selectedGame)?.skillTier.tier && (
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              {match.prospect.games.find(g => g.title === selectedGame)?.skillTier.tier} 
                              {match.prospect.games.find(g => g.title === selectedGame)?.skillTier.division}
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            Class of {match.prospect.education.graduationYear}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 sm:mt-0 sm:ml-2 flex flex-col sm:items-end gap-1">
                      <div className="flex items-center">
                        <span className="text-xs font-semibold mr-2">Match:</span>
                        <Progress value={Math.round(match.matchScore)} className="h-2 w-16" />
                        <span className="ml-2 text-xs">{Math.round(match.matchScore)}%</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs h-7">
                        <UserPlus className="h-3 w-3 mr-1" /> Add to Watch List
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="high-potential" className="mt-0">
            <div className="py-8 text-center">
              <p className="text-gray-500">High potential prospects feature coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SmartProspectingPanel;
