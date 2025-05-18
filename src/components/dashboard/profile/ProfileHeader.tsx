
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Camera } from "lucide-react";
import { ProfileData } from "./types";
import ImageUploader from "./ImageUploader";
import { toast } from "sonner";

interface ProfileHeaderProps {
  profile: ProfileData;
  onProfileUpdate: (updatedProfile: ProfileData) => void;
}

const ProfileHeader = ({ profile, onProfileUpdate }: ProfileHeaderProps) => {
  const handleCoverImageUpdate = (imageBlob: Blob) => {
    // Convert blob to data URL
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      // Update profile with new cover image
      onProfileUpdate({
        ...profile,
        coverImage: base64data
      });
      toast.success("Cover image updated successfully");
    };
  };

  const handleProfileImageUpdate = (imageBlob: Blob) => {
    // Convert blob to data URL
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      // Update profile with new profile image
      onProfileUpdate({
        ...profile,
        profileImage: base64data
      });
      toast.success("Profile image updated successfully");
    };
  };

  return (
    <>
      {/* Cover Image */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={profile.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover object-center" 
        />
        <div className="absolute top-2 right-2">
          <ImageUploader
            onImageSelected={handleCoverImageUpdate}
            aspectRatio={3.5} // Wider aspect ratio for cover
            buttonIcon={<Camera size={16} className="text-gray-700" />}
            buttonVariant="ghost"
            className="bg-white/80 p-1 rounded-full shadow hover:bg-white"
            maxSizeInMB={2}
          />
        </div>
      </div>
      
      {/* Profile Image */}
      <div className="relative -mt-16 ml-6">
        <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
          <AvatarImage src={profile.profileImage} alt={profile.firstName} className="object-scale-down" />
          <AvatarFallback className="text-2xl">
            {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="absolute bottom-1 right-1">
          <ImageUploader
            onImageSelected={handleProfileImageUpdate}
            aspectRatio={1} // Square aspect ratio for profile
            buttonIcon={<Pencil size={14} className="text-gray-700" />}
            buttonVariant="ghost"
            className="bg-white p-1 rounded-full shadow hover:bg-gray-100"
            maxSizeInMB={2}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
