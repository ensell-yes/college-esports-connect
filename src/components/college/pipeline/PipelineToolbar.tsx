
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CheckSquare, Filter, Mail, MoveRight, RefreshCw, Search, Download } from "lucide-react";
import { RecruitmentStage } from "./types";

interface PipelineToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkMove?: (stage: RecruitmentStage) => void;
}

const PipelineToolbar: React.FC<PipelineToolbarProps> = ({ selectedCount, onClearSelection, onBulkMove }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="bg-white p-4 border rounded-md mb-4 shadow-sm">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2 flex-grow">
          <div className="relative flex-grow max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search recruits..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
        
        {selectedCount > 0 ? (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">
              <CheckSquare className="inline h-4 w-4 mr-1 text-primary" />
              {selectedCount} selected
            </span>
            
            <div className="flex items-center gap-1 bg-gray-100 rounded-md px-2">
              <Select onValueChange={(value) => onBulkMove?.(value as RecruitmentStage)}>
                <SelectTrigger className="h-8 w-[140px] text-xs border-0 bg-transparent">
                  <SelectValue placeholder="Move to..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scouted">Scouted</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Invite to Trial">Invite to Trial</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                  <SelectItem value="Committed">Committed</SelectItem>
                </SelectContent>
              </Select>
              <MoveRight className="h-4 w-4 text-gray-400" />
            </div>
            
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Message
            </Button>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Button variant="ghost" size="sm" onClick={onClearSelection}>
              Clear
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PipelineToolbar;
