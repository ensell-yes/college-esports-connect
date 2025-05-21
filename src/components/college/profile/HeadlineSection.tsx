
import { FC, useState } from "react";
import { Pencil, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface HeadlineSectionProps {
  headline: string;
  onUpdate: (headline: string) => void;
}

const HeadlineSection: FC<HeadlineSectionProps> = ({ headline, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedHeadline, setEditedHeadline] = useState(headline);
  const { hasDemoAccess } = useAuth();

  const handleSave = () => {
    if (editedHeadline.trim() !== headline) {
      onUpdate(editedHeadline.trim());
      toast.success("Headline updated successfully");
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedHeadline(headline);
    setIsEditing(false);
  };

  const showEditButton = hasDemoAccess();

  return (
    <div className="mt-4">
      <div className="relative">
        {isEditing ? (
          <div className="flex flex-col space-y-2">
            <Input
              value={editedHeadline}
              onChange={(e) => setEditedHeadline(e.target.value)}
              className="w-full"
              placeholder="Enter headline"
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
          <div className="group relative">
            <p className="text-sm text-gray-600">
              {headline || "No headline added"}
            </p>
            {showEditButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeadlineSection;
