
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Save, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

// Game interface
interface Game {
  name: string;
  color: string;
}

// Recruitment option interface
interface RecruitmentOption {
  name: string;
  color: string;
}
const ProfilePanel = () => {
  // Mock profile data - in a real app, this would come from a database
  const [profile, setProfile] = useState({
    prefix: "[Yes]",
    gamertag: "DadJoke",
    firstName: "Ensell",
    lastName: "Lee",
    headline: "Aspiring professional gamer with a focus on strategy games. Currently studying Computer Science at Hard Knocks University.",
    city: "Redwood City",
    state: "CA",
    followers: 2195,
    profileImage: "/lovable-uploads/58566401-146a-4e8b-81cd-0b39e696f1b6.png",
    coverImage: "/lovable-uploads/1ddc042c-abb8-49e8-89b5-44238316961e.png",
    showLocation: true
  });

  // State for editing headline
  const [isEditingHeadline, setIsEditingHeadline] = useState(false);
  const [headlineInput, setHeadlineInput] = useState(profile.headline);

  // Games played
  const games: Game[] = [{
    name: "Rocket League",
    color: "bg-blue-500"
  }, {
    name: "League of Legends",
    color: "bg-purple-600"
  }, {
    name: "Valorant",
    color: "bg-red-500"
  }, {
    name: "Marvel Rivals",
    color: "bg-orange-500"
  }, {
    name: "Counter-Strike",
    color: "bg-gray-700"
  }, {
    name: "Super Smash Bros",
    color: "bg-yellow-500"
  }];

  // Recruitment options
  const recruitmentOptions: RecruitmentOption[] = [{
    name: "College Recruiting",
    color: "bg-esports-purple"
  }, {
    name: "Looking for Team",
    color: "bg-esports-teal"
  }, {
    name: "Looking for Coach",
    color: "bg-esports-orange"
  }, {
    name: "Looking for Support",
    color: "bg-blue-600"
  }, {
    name: "Looking for Internship",
    color: "bg-green-600"
  }];

  // Function to toggle location visibility
  const toggleLocationVisibility = () => {
    setProfile({
      ...profile,
      showLocation: !profile.showLocation
    });
    toast.success(`Location visibility ${profile.showLocation ? 'hidden' : 'shown'}`);
  };

  // Function to handle headline save
  const handleSaveHeadline = () => {
    if (headlineInput.length > 240) {
      toast.error("Headline must be 240 characters or less");
      return;
    }
    setProfile({
      ...profile,
      headline: headlineInput
    });
    setIsEditingHeadline(false);
    toast.success("Headline updated successfully");
  };
  return <Card className="col-span-1 shadow-md overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={profile.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover object-center" 
        />
        <button className="absolute top-2 right-2 bg-white/80 p-1 rounded-full shadow hover:bg-white">
          <Pencil size={16} className="text-gray-700" />
        </button>
      </div>
      
      {/* Profile Image */}
      <div className="relative -mt-16 ml-6">
        <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
          <AvatarImage src={profile.profileImage} alt={profile.firstName} className="object-scale-down" />
          <AvatarFallback className="text-2xl">
            {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <button className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow hover:bg-gray-100">
          <Pencil size={14} className="text-gray-700" />
        </button>
      </div>
      
      <CardContent className="pt-2">
        {/* Name and Gamertag */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-esports-dark">
              {profile.firstName} {profile.lastName}
            </h2>
            <Badge variant="outline" className="font-mono">
              {profile.prefix} {profile.gamertag}
            </Badge>
          </div>
          
          {/* Location and Followers */}
          <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
            <div className="flex items-center gap-2">
              {profile.showLocation && <span>{profile.city}, {profile.state}</span>}
              <button onClick={toggleLocationVisibility} className="text-xs p-1 hover:bg-gray-100 rounded-full" aria-label={profile.showLocation ? "Hide location" : "Show location"}>
                {profile.showLocation ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <div>{profile.followers.toLocaleString()} followers</div>
          </div>
        </div>
        
        {/* Headline */}
        <div className="mb-4">
          {isEditingHeadline ? <div className="flex flex-col gap-2">
              <Input value={headlineInput} onChange={e => setHeadlineInput(e.target.value)} placeholder="Add a headline" maxLength={240} className="text-sm" />
              <div className="flex items-center justify-between">
                <span className={`text-xs ${headlineInput.length > 240 ? 'text-red-500' : 'text-gray-500'}`}>
                  {headlineInput.length}/240
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => {
                setHeadlineInput(profile.headline);
                setIsEditingHeadline(false);
              }}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveHeadline}>
                    <Save size={14} className="mr-1" /> Save
                  </Button>
                </div>
              </div>
            </div> : <div className="relative group">
              <p className="text-sm text-gray-600 pr-8">
                {profile.headline || "No headline added yet"}
              </p>
              <button onClick={() => setIsEditingHeadline(true)} className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded" aria-label="Edit headline">
                <Pencil size={14} />
              </button>
            </div>}
        </div>
        
        {/* Games Played */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Games Played</h3>
          <div className="flex flex-wrap gap-2">
            {games.map(game => <Badge key={game.name} className={`${game.color} hover:${game.color} text-white cursor-pointer`}>
                {game.name}
              </Badge>)}
          </div>
        </div>
        
        {/* Open To */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Open To</h3>
          <div className="flex flex-wrap gap-2">
            {recruitmentOptions.map(option => <Badge key={option.name} variant="outline" className={`border-2 border-${option.color.replace('bg-', '')} hover:${option.color} hover:text-white cursor-pointer transition-colors`}>
                {option.name}
              </Badge>)}
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default ProfilePanel;
