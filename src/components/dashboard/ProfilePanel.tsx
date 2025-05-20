
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProfileHeader from "./profile/ProfileHeader";
import UserInfo from "./profile/UserInfo";
import HeadlineSection from "./profile/HeadlineSection";
import GamesSection from "./profile/GamesSection";
import RecruitmentSection from "./profile/RecruitmentSection";
import EsportOrgsSection from "./profile/EsportOrgsSection";
import { Button } from "@/components/ui/button";
import { School, Award } from "lucide-react";
import { Game, ProfileData, RecruitmentOption, EsportOrg } from "./profile/types";

const ProfilePanel = () => {
  // Mock profile data - in a real app, this would come from a database
  const [profile, setProfile] = useState<ProfileData>({
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

  // Games played
  const games: Game[] = [
    { name: "Rocket League", color: "bg-blue-500" },
    { name: "League of Legends", color: "bg-purple-600" },
    { name: "Valorant", color: "bg-red-500" },
    { name: "Marvel Rivals", color: "bg-orange-500" },
    { name: "Counter-Strike", color: "bg-gray-700" },
    { name: "Super Smash Bros", color: "bg-yellow-500" }
  ];

  // Recruitment options
  const recruitmentOptions: RecruitmentOption[] = [
    { name: "College Recruiting", color: "bg-esports-purple" },
    { name: "Looking for Team", color: "bg-esports-teal" },
    { name: "Looking for Coach", color: "bg-esports-orange" },
    { name: "Looking for Support", color: "bg-blue-600" },
    { name: "Looking for Internship", color: "bg-green-600" }
  ];
  
  // Esport Organizations
  const esportOrgs: EsportOrg[] = [
    { name: "100 Thieves", color: "bg-red-600" },
    { name: "Cloud9", color: "bg-blue-500" },
    { name: "TSM", color: "bg-gray-800" },
    { name: "Team Liquid", color: "bg-blue-700" },
    { name: "FaZe Clan", color: "bg-red-700" }
  ];

  // Handler for updating profile data
  const handleProfileUpdate = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
  };

  return (
    <Card className="col-span-1 shadow-md overflow-hidden">
      <ProfileHeader profile={profile} onProfileUpdate={handleProfileUpdate} />
      
      <CardContent className="pt-2">
        <UserInfo profile={profile} onProfileUpdate={handleProfileUpdate} />
        
        {/* Class of 2026 and Top 500 Recruit Buttons */}
        <div className="mb-4 flex justify-start gap-2 flex-wrap">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-esports-purple text-esports-purple hover:bg-esports-purple/10"
          >
            <School size={14} className="mr-1" /> Class of 2026
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-esports-orange text-esports-orange hover:bg-esports-orange/10"
          >
            <Award size={14} className="mr-1" /> Top 500 Recruit
          </Button>
        </div>
        
        <HeadlineSection profile={profile} onProfileUpdate={handleProfileUpdate} />
        <GamesSection games={games} />
        <RecruitmentSection recruitmentOptions={recruitmentOptions} />
        <EsportOrgsSection esportOrgs={esportOrgs} />
      </CardContent>
    </Card>
  );
};

export default ProfilePanel;
