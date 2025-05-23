
import { StageColumn as StageColumnType, PipelineRecruitCard } from "./types";
import RecruitCard from "./RecruitCard";
import { MoreHorizontal } from "lucide-react";

interface StageColumnProps {
  column: StageColumnType;
  selectedRecruits: string[];
  onToggleSelect: (id: string) => void;
}

const StageColumn: React.FC<StageColumnProps> = ({ column, selectedRecruits, onToggleSelect }) => {
  return (
    <div className="flex flex-col bg-gray-50 rounded-md w-full min-w-[250px] max-w-[300px]">
      <div className="px-3 py-2 border-b bg-gray-100 rounded-t-md">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">{column.title}</h3>
          <div className="flex items-center gap-1">
            <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5">
              {column.recruitCards.length}
            </span>
            <button className="p-1 rounded hover:bg-gray-200">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-2 flex-1 overflow-y-auto max-h-[500px]">
        {column.recruitCards.length > 0 ? (
          column.recruitCards.map(recruit => (
            <RecruitCard 
              key={recruit.id} 
              recruit={recruit} 
              isSelected={selectedRecruits.includes(recruit.id)}
              onToggleSelect={onToggleSelect}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-400 text-sm">
            No recruits in this stage
          </div>
        )}
      </div>
    </div>
  );
};

export default StageColumn;
