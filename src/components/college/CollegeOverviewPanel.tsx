
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CollegeData } from "./types";
import OverviewSection from "./overview/OverviewSection";
import WebsitesSection from "./overview/WebsitesSection";

interface CollegeOverviewPanelProps {
  college: CollegeData;
  onUpdate: (updatedData: Partial<CollegeData>) => void;
  className?: string;
}

const CollegeOverviewPanel = ({ college, onUpdate, className = "" }: CollegeOverviewPanelProps) => {
  // Handle overview update
  const handleOverviewUpdate = (overview: string) => {
    onUpdate({ overview });
  };

  // Handle websites update
  const handleWebsitesUpdate = (data: { website: string; esportsWebsite: string }) => {
    onUpdate({
      website: data.website,
      esportsWebsite: data.esportsWebsite
    });
  };

  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl">College Overview</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overview Section */}
        <OverviewSection 
          overview={college.overview} 
          onUpdate={handleOverviewUpdate}
        />
        
        {/* Website Information */}
        <WebsitesSection 
          website={college.website}
          esportsWebsite={college.esportsWebsite}
          onUpdate={handleWebsitesUpdate}
        />
      </CardContent>
    </Card>
  );
};

export default CollegeOverviewPanel;
