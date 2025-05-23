
import { useState } from "react";
import { PipelineRecruitCard } from "./types";
import { Check, MessageSquare, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";

interface RecruitCardProps {
  recruit: PipelineRecruitCard;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

const gameColorMap: Record<string, string> = {
  "Valorant": "bg-red-500",
  "Rocket League": "bg-blue-500",
  "Marvel Rivals": "bg-red-600",
  "League of Legends": "bg-purple-600",
  "Counter-Strike": "bg-green-700",
  "Fortnite": "bg-orange-500"
};

const RecruitCard: React.FC<RecruitCardProps> = ({ recruit, isSelected, onToggleSelect }) => {
  const [hover, setHover] = useState(false);
  
  return (
    <div 
      className={cn(
        "bg-white rounded-md shadow-sm border p-3 mb-2 cursor-pointer relative",
        isSelected && "ring-2 ring-primary ring-offset-1"
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-start gap-2">
        <Checkbox 
          className="mt-1" 
          checked={isSelected} 
          onCheckedChange={() => onToggleSelect(recruit.id)}
        />
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">{recruit.name}</h4>
            <DropdownMenu>
              <DropdownMenuTrigger className="h-6 w-6 inline-flex items-center justify-center rounded-md hover:bg-gray-100">
                <MoreVertical className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Add Note</DropdownMenuItem>
                <DropdownMenuItem>Change Stage</DropdownMenuItem>
                <DropdownMenuItem>Contact</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <span className={cn("w-2 h-2 rounded-full", gameColorMap[recruit.game] || "bg-gray-400")}></span>
            <span className="text-xs text-gray-600">{recruit.game}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-600">{recruit.primaryRole}</span>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs py-0">{recruit.classification}</Badge>
            <Badge variant="outline" className="text-xs py-0">{recruit.rank}</Badge>
          </div>
          
          {recruit.latestNote && (
            <div className="mt-3 border-t pt-2">
              <div className="flex items-center text-xs text-gray-500">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span className="font-medium mr-1">{recruit.latestNote.author}</span>
                <span>• {recruit.latestNote.date}</span>
              </div>
              <p className="text-xs mt-1 text-gray-700 line-clamp-2">{recruit.latestNote.content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruitCard;
