
import { Group } from "lucide-react";
import { EsportOrg } from "./types";

interface EsportOrgsSectionProps {
  esportOrgs: EsportOrg[];
}

const EsportOrgsSection = ({ esportOrgs }: EsportOrgsSectionProps) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold flex items-center mb-2">
        <Group size={16} className="mr-1 text-blue-600" />
        Esport Orgs
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {esportOrgs.map((org, index) => (
          <div
            key={index}
            className={`${org.color} text-white text-xs rounded-md px-2 py-1`}
          >
            {org.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EsportOrgsSection;
