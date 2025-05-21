
import { Camera } from "lucide-react";
import ImageUploader from "@/components/dashboard/profile/ImageUploader";
import { toast } from "sonner";

interface CollegeLogoSectionProps {
  logo: string;
  collegeName: string;
  onUpdate: (base64data: string) => void;
}

const CollegeLogoSection = ({ logo, collegeName, onUpdate }: CollegeLogoSectionProps) => {
  // Handle profile image update
  const handleProfileImageUpdate = (imageBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      onUpdate(base64data);
      toast.success("School logo updated successfully");
    };
  };

  return (
    <div className="relative">
      <div className="h-24 w-24 md:h-32 md:w-32 border-4 border-white rounded-md shadow-lg overflow-hidden bg-white">
        <img 
          src="https://pbs.twimg.com/profile_images/1838647739149635584/NDiHx-YX_400x400.jpg" 
          alt={`${collegeName} Logo`} 
          className="w-full h-full object-contain" 
        />
      </div>
      <div className="absolute bottom-1 right-1">
        <ImageUploader
          onImageSelected={handleProfileImageUpdate}
          aspectRatio={1}
          buttonIcon={<Camera size={14} className="text-gray-700" />}
          buttonVariant="ghost"
          buttonText=""
          className="bg-white p-1 rounded-full shadow hover:bg-gray-100"
          maxSizeInMB={2}
        />
      </div>
    </div>
  );
};

export default CollegeLogoSection;
