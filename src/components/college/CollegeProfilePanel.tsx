
import { Card, CardContent } from "@/components/ui/card";
import { CollegeData } from "./types";
import CoverImageSection from "./profile/CoverImageSection";
import CollegeLogoSection from "./profile/CollegeLogoSection";
import CollegeInfoSection from "./profile/CollegeInfoSection";
import HeadlineSection from "./profile/HeadlineSection";
import SupportedGamesSection from "./profile/SupportedGamesSection";

interface CollegeProfilePanelProps {
  college: CollegeData;
  onUpdate: (updatedData: Partial<CollegeData>) => void;
  className?: string;
}

const CollegeProfilePanel = ({ college, onUpdate, className = "" }: CollegeProfilePanelProps) => {
  return (
    <Card className={`shadow-md ${className}`}>
      {/* Cover Image */}
      <CoverImageSection 
        coverImage={college.coverImage}
        collegeName={college.name}
        onUpdate={(base64data) => onUpdate({ coverImage: base64data })}
      />
      
      <CardContent className="pt-0">
        <div className="flex flex-col md:flex-row gap-4 -mt-12 md:-mt-16">
          {/* School Logo */}
          <CollegeLogoSection 
            logo={college.logo}
            collegeName={college.name}
            onUpdate={(base64data) => onUpdate({ logo: base64data })}
          />
          
          {/* School Info */}
          <CollegeInfoSection 
            name={college.name}
            city={college.city}
            state={college.state}
            country={college.country}
            followers={college.followers}
          />
        </div>
        
        {/* Headline */}
        <HeadlineSection 
          headline={college.headline}
          onUpdate={(headline) => onUpdate({ headline })}
        />
        
        {/* Games Supported */}
        <SupportedGamesSection games={college.games} />
      </CardContent>
    </Card>
  );
};

export default CollegeProfilePanel;
