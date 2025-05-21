
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
  // Handler functions
  const handleHeadlineUpdate = (headline: string) => {
    onUpdate({ headline });
  };

  const handleCoverImageUpdate = (base64data: string) => {
    onUpdate({ coverImage: base64data });
  };

  const handleLogoUpdate = (base64data: string) => {
    onUpdate({ logo: base64data });
  };

  const handleGamesUpdate = (games: typeof college.games) => {
    onUpdate({ games });
  };

  return (
    <Card className={`shadow-md ${className}`}>
      {/* Cover Image */}
      <CoverImageSection 
        coverImage={college.coverImage}
        collegeName={college.name}
        onUpdate={handleCoverImageUpdate}
      />
      
      <CardContent className="pt-0">
        <div className="flex flex-col -mt-12 md:-mt-16">
          <div className="flex justify-center">
            {/* School Logo */}
            <CollegeLogoSection 
              logo={college.logo}
              collegeName={college.name}
              onUpdate={handleLogoUpdate}
            />
          </div>
          
          {/* School Info - Now positioned below the logo on all screen sizes */}
          <div className="mt-4 text-center">
            <CollegeInfoSection 
              name={college.name}
              city={college.city}
              state={college.state}
              country={college.country}
              followers={college.followers}
            />
          </div>
        </div>
        
        {/* Headline */}
        <HeadlineSection 
          headline={college.headline}
          onUpdate={handleHeadlineUpdate}
        />
        
        {/* Games Supported */}
        <SupportedGamesSection games={college.games} onUpdate={handleGamesUpdate} />
      </CardContent>
    </Card>
  );
};

export default CollegeProfilePanel;
