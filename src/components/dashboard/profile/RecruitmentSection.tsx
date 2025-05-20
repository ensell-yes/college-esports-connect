
import { Badge } from "@/components/ui/badge";
import { RecruitmentOption } from "./types";

interface RecruitmentSectionProps {
  recruitmentOptions: RecruitmentOption[];
}

const RecruitmentSection = ({ recruitmentOptions }: RecruitmentSectionProps) => {
  return (
    <div className="mt-6 mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Open To</h3>
      <div className="flex flex-wrap gap-2">
        {recruitmentOptions.map(option => (
          <Badge 
            key={option.name} 
            variant="outline" 
            className={`border-2 border-${option.color.replace('bg-', '')} hover:${option.color} hover:text-white cursor-pointer transition-colors`}
          >
            {option.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentSection;
