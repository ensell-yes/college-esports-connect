
import { Camera } from "lucide-react";
import ImageUploader from "@/components/dashboard/profile/ImageUploader";
import { toast } from "sonner";

interface CoverImageSectionProps {
  coverImage: string;
  collegeName: string;
  onUpdate: (base64data: string) => void;
}

const CoverImageSection = ({ coverImage, collegeName, onUpdate }: CoverImageSectionProps) => {
  // Handle cover image update
  const handleCoverImageUpdate = (imageBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      onUpdate(base64data);
      toast.success("Cover image updated successfully");
    };
  };

  return (
    <div className="relative h-48 overflow-hidden">
      <img 
        src={coverImage} 
        alt={`${collegeName} Cover`} 
        className="w-full h-full object-cover" 
      />
      <div className="absolute top-2 right-2">
        <ImageUploader
          onImageSelected={handleCoverImageUpdate}
          aspectRatio={3.5}
          buttonIcon={<Camera size={16} className="text-gray-700" />}
          buttonVariant="ghost"
          className="bg-white/80 p-1 rounded-full shadow hover:bg-white"
          maxSizeInMB={2}
        />
      </div>
    </div>
  );
};

export default CoverImageSection;
