
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProfileHeader from "./profile/ProfileHeader";
import UserInfo from "./profile/UserInfo";
import HeadlineSection from "./profile/HeadlineSection";
import GamesSection from "./profile/GamesSection";
import RecruitmentSection from "./profile/RecruitmentSection";
import { Game, ProfileData, RecruitmentOption } from "./profile/types";

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

  // Handler for updating profile data
  const handleProfileUpdate = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
  };

  return (
    <Card className="col-span-1 shadow-md overflow-hidden">
      <ProfileHeader profile={profile} onProfileUpdate={handleProfileUpdate} />
      
      <CardContent className="pt-2">
        <UserInfo profile={profile} onProfileUpdate={handleProfileUpdate} />
        <HeadlineSection profile={profile} onProfileUpdate={handleProfileUpdate} />
        <GamesSection games={games} />
        <RecruitmentSection recruitmentOptions={recruitmentOptions} />
      </CardContent>
    </Card>
  );
};

export default ProfilePanel;
