
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StageColumn from "./StageColumn";
import PipelineToolbar from "./PipelineToolbar";
import { generateMockColumns } from "./mockData";
import { RecruitmentStage } from "./types";

interface PipelinePanelProps {
  className?: string;
}

const PipelinePanel: React.FC<PipelinePanelProps> = ({ className }) => {
  const [columns, setColumns] = useState(generateMockColumns());
  const [selectedRecruits, setSelectedRecruits] = useState<string[]>([]);
  
  const handleToggleSelect = (id: string) => {
    setSelectedRecruits(prev => 
      prev.includes(id) 
        ? prev.filter(recruitId => recruitId !== id)
        : [...prev, id]
    );
  };
  
  const handleClearSelection = () => {
    setSelectedRecruits([]);
  };
  
  const handleBulkMove = (targetStage: RecruitmentStage) => {
    if (selectedRecruits.length === 0) return;
    
    const newColumns = columns.map(column => {
      // First, remove all selected recruits from current columns
      let updatedCards = column.recruitCards.filter(
        card => !selectedRecruits.includes(card.id)
      );
      
      // If this is the target column, add all selected recruits
      if (column.title === targetStage) {
        // Find all selected recruits from all columns
        const selectedCards = columns
          .flatMap(col => col.recruitCards)
          .filter(card => selectedRecruits.includes(card.id))
          .map(card => ({ ...card, stage: targetStage }));
          
        updatedCards = [...updatedCards, ...selectedCards];
      }
      
      return {
        ...column,
        recruitCards: updatedCards
      };
    });
    
    setColumns(newColumns);
    setSelectedRecruits([]); // Clear selection after move
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Recruiting Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <PipelineToolbar 
          selectedCount={selectedRecruits.length} 
          onClearSelection={handleClearSelection}
          onBulkMove={handleBulkMove}
        />
        
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map(column => (
            <StageColumn
              key={column.id}
              column={column}
              selectedRecruits={selectedRecruits}
              onToggleSelect={handleToggleSelect}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PipelinePanel;
