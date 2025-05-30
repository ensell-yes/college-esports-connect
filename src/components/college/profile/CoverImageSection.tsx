
import { FC, useState } from "react";
import { Camera, UserPlus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/dashboard/profile/ImageUploader";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import RecruitingForm from "./RecruitingForm";
import { Link } from "react-router-dom";
import { PageTypeProfile } from "../types";

interface CoverImageSectionProps {
  coverImage: string;
  collegeName: string;
  onUpdate: (base64data: string) => void;
  pageType: string;
}

const CoverImageSection: FC<CoverImageSectionProps> = ({ coverImage, collegeName, onUpdate, pageType }) => {
  const { hasDemoAccess } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleImageUpdate = (imageBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      onUpdate(base64data);
      toast.success("Cover image updated successfully");
    };
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? "Unfollowed successfully" : "Following successfully");
  };

  const showEditButton = hasDemoAccess();

  const navButton = (pageType: string) => {
    if (pageType == PageTypeProfile) {
      return (
        <Link to="/program-dashboard">
          <Button
            size="sm"
            className="bg-white/90 text-gray-800 hover:bg-white border-gray-300"
          >
            View Dashboard
          </Button>
        </Link>
      )
    } else {
      return (
        <Link to="/college-profile-graceland">
          <Button
            size="sm"
            className="bg-white/90 text-gray-800 hover:bg-white border-gray-300"
          >
           View Profile
          </Button>
        </Link>
      )
    }
  };

  return (
    <div className="relative h-48 overflow-hidden">
      <img 
        src={coverImage} 
        alt={`${collegeName} Cover`} 
        className="w-full h-full object-cover" 
      />
      
      {/* Edit button */}
      {showEditButton && (
        <div className="absolute top-2 right-2">
          <ImageUploader
            onImageSelected={handleImageUpdate}
            aspectRatio={3.5}
            buttonIcon={<Camera size={16} className="text-gray-700" />}
            buttonVariant="ghost"
            className="bg-white/80 p-1 rounded-full shadow hover:bg-white"
            maxSizeInMB={2}
            buttonText=""
          />
        </div>
      )}

      {/* New action buttons */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        { pageType === PageTypeProfile && (
          <Button
            size="sm"
            variant={isFollowing ? "default" : "outline"}
            onClick={handleFollow}
            className="bg-white/90 text-gray-800 hover:bg-white border-gray-300"
          >
            <UserPlus size={16} className="mr-1" />
            {isFollowing ? "Following" : "Follow"}
          </Button>
        )}
        
        <Sheet>
          { pageType === PageTypeProfile && (
            <SheetTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="bg-white/90 text-gray-800 hover:bg-white border-gray-300"
              >
                <Info size={16} className="mr-1" />
                Recruiting Information
              </Button>
            </SheetTrigger>
          )}
          <SheetContent className="overflow-y-auto" side="right">
            <SheetHeader>
              <SheetTitle>Esports Recruiting Information</SheetTitle>
            </SheetHeader>
            <RecruitingForm collegeName={collegeName} />
          </SheetContent>
        </Sheet>

        {navButton(pageType)}
      </div>
    </div>
  );
};

export default CoverImageSection;
