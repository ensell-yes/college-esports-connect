
import { FC } from "react";
import { Globe } from "lucide-react";

interface WebsitesSectionProps {
  website: string;
  esportsWebsite: string;
  onUpdate: (data: { website: string; esportsWebsite: string }) => void;
}

const WebsitesSection: FC<WebsitesSectionProps> = ({ website, esportsWebsite }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-esports-dark">Websites</h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center">
          <Globe size={16} className="mr-2 text-blue-600" />
          <span className="font-medium">Main Website:</span>
          <a 
            href={website.startsWith('http') ? website : `https://${website}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 hover:underline"
          >
            {website}
          </a>
        </div>
        
        <div className="flex items-center">
          <Globe size={16} className="mr-2 text-blue-600" />
          <span className="font-medium">Esports Website:</span>
          <a 
            href={esportsWebsite} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 hover:underline"
          >
            {esportsWebsite.includes('gujackets.com') ? 'gujackets.com/sports/esports' : new URL(esportsWebsite).hostname}
          </a>
        </div>
      </div>
    </div>
  );
};

export default WebsitesSection;
