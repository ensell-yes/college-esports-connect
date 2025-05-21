
import { FC } from "react";

interface CollegeLogoSectionProps {
  logo: string;
  collegeName: string;
  onUpdate: (base64data: string) => void;
}

const CollegeLogoSection: FC<CollegeLogoSectionProps> = ({ collegeName }) => {
  return (
    <div className="relative">
      <div className="h-24 w-24 md:h-32 md:w-32 border-4 border-white rounded-md shadow-lg overflow-hidden bg-white">
        <img 
          src="https://pbs.twimg.com/profile_images/1838647739149635584/NDiHx-YX_400x400.jpg" 
          alt={`${collegeName} Logo`} 
          className="w-full h-full object-contain" 
        />
      </div>
    </div>
  );
};

export default CollegeLogoSection;
