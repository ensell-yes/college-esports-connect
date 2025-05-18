
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { ProfileData } from "./types";

interface ProfileHeaderProps {
  profile: ProfileData;
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  return (
    <>
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
    </>
  );
};

export default ProfileHeader;
