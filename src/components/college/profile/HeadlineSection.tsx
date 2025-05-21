
import { FC } from "react";

interface HeadlineSectionProps {
  headline: string;
  onUpdate: (headline: string) => void;
}

const HeadlineSection: FC<HeadlineSectionProps> = ({ headline }) => {
  return (
    <div className="mt-4">
      <div className="relative">
        <p className="text-sm text-gray-600">
          {headline || "No headline added"}
        </p>
      </div>
    </div>
  );
};

export default HeadlineSection;
