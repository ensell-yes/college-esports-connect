
import { FC, useState } from "react";
import { Pencil, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface OverviewSectionProps {
  overview: string;
  onUpdate: (overview: string) => void;
}

const OverviewSection: FC<OverviewSectionProps> = ({ overview, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOverview, setEditedOverview] = useState(overview);
  const { hasDemoAccess } = useAuth();

  const handleSave = () => {
    if (editedOverview.trim() !== overview) {
      onUpdate(editedOverview.trim());
      toast.success("Overview updated successfully");
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedOverview(overview);
    setIsEditing(false);
  };

  const showEditButton = hasDemoAccess();

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-esports-dark">Overview</h3>
        {showEditButton && !isEditing && (
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="flex flex-col space-y-2">
          <Textarea
            value={editedOverview}
            onChange={(e) => setEditedOverview(e.target.value)}
            className="w-full min-h-[150px]"
            placeholder="Enter overview"
          />
          <div className="flex justify-end space-x-2">
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Check className="mr-1 h-4 w-4" /> Save
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">{overview}</p>
      )}
    </div>
  );
};

export default OverviewSection;
