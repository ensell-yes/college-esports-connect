
import { FC } from "react";

interface OverviewSectionProps {
  overview: string;
  onUpdate: (overview: string) => void;
}

const OverviewSection: FC<OverviewSectionProps> = ({ overview }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-esports-dark">Overview</h3>
      </div>
      
      <p className="text-gray-700">
        {overview}
      </p>
    </div>
  );
};

export default OverviewSection;
