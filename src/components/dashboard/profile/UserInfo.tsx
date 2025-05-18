
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff } from "lucide-react";
import { ProfileData } from "./types";
import { toast } from "sonner";

interface UserInfoProps {
  profile: ProfileData;
  onProfileUpdate: (updatedProfile: ProfileData) => void;
}

const UserInfo = ({ profile, onProfileUpdate }: UserInfoProps) => {
  // Function to toggle location visibility
  const toggleLocationVisibility = () => {
    const updatedProfile = {
      ...profile,
      showLocation: !profile.showLocation
    };
    onProfileUpdate(updatedProfile);
    toast.success(`Location visibility ${profile.showLocation ? 'hidden' : 'shown'}`);
  };

  return (
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
          <button 
            onClick={toggleLocationVisibility} 
            className="text-xs p-1 hover:bg-gray-100 rounded-full" 
            aria-label={profile.showLocation ? "Hide location" : "Show location"}
          >
            {profile.showLocation ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        <div>{profile.followers.toLocaleString()} followers</div>
      </div>
    </div>
  );
};

export default UserInfo;
