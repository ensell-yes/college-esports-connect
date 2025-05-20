
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Save } from "lucide-react";
import { toast } from "sonner";

interface OverviewSectionProps {
  overview: string;
  onUpdate: (overview: string) => void;
}

const OverviewSection = ({ overview, onUpdate }: OverviewSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [overviewInput, setOverviewInput] = useState(overview);

  // Save overview
  const handleSave = () => {
    onUpdate(overviewInput);
    setIsEditing(false);
    toast.success("Overview updated successfully");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-esports-dark">Overview</h3>
        {!isEditing && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={14} className="mr-1" /> Edit
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-2">
          <Textarea 
            value={overviewInput}
            onChange={e => setOverviewInput(e.target.value)}
            className="min-h-[150px]"
            placeholder="Enter college overview"
          />
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setOverviewInput(overview);
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave}
            >
              <Save size={14} className="mr-1" /> Save
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">
          {overview}
        </p>
      )}
    </div>
  );
};

export default OverviewSection;
