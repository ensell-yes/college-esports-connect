
import { FC } from "react";
import { Camera } from "lucide-react";
import ImageUploader from "@/components/dashboard/profile/ImageUploader";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface CollegeLogoSectionProps {
  logo: string;
  collegeName: string;
  onUpdate: (base64data: string) => void;
}

const CollegeLogoSection: FC<CollegeLogoSectionProps> = ({ logo, collegeName, onUpdate }) => {
  const { hasDemoAccess } = useAuth();

  const handleImageUpdate = (imageBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      onUpdate(base64data);
      toast.success("Logo updated successfully");
    };
  };

  const showEditButton = hasDemoAccess();

  return (
    <div className="relative">
      <div className="h-24 w-24 md:h-32 md:w-32 border-4 border-white rounded-md shadow-lg overflow-hidden bg-white">
        <img 
          src={logo} 
          alt={`${collegeName} Logo`} 
          className="w-full h-full object-contain" 
        />
      </div>
      
      {showEditButton && (
        <div className="absolute bottom-0 right-0">
          <ImageUploader
            onImageSelected={handleImageUpdate}
            aspectRatio={1}
            buttonIcon={<Camera size={16} className="text-gray-700" />}
            buttonVariant="ghost"
            className="bg-white/80 p-1 rounded-full shadow hover:bg-white"
            maxSizeInMB={2}
            buttonText=""
          />
        </div>
      )}
    </div>
  );
};

export default CollegeLogoSection;
