
import { FC } from "react";

interface CoverImageSectionProps {
  coverImage: string;
  collegeName: string;
  onUpdate: (base64data: string) => void;
}

const CoverImageSection: FC<CoverImageSectionProps> = ({ coverImage, collegeName }) => {
  return (
    <div className="relative h-48 overflow-hidden">
      <img 
        src={coverImage} 
        alt={`${collegeName} Cover`} 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

export default CoverImageSection;
