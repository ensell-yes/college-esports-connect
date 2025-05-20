
import { useState } from "react";
import { Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface HeadlineSectionProps {
  headline: string;
  onUpdate: (headline: string) => void;
}

const HeadlineSection = ({ headline, onUpdate }: HeadlineSectionProps) => {
  const [isEditingHeadline, setIsEditingHeadline] = useState(false);
  const [headlineInput, setHeadlineInput] = useState(headline);

  // Save headline
  const handleSaveHeadline = () => {
    if (headlineInput.length > 240) {
      toast.error("Headline must be 240 characters or less");
      return;
    }
    
    onUpdate(headlineInput);
    setIsEditingHeadline(false);
    toast.success("Headline updated successfully");
  };

  return (
    <div className="mt-4">
      {isEditingHeadline ? (
        <div className="flex flex-col gap-2">
          <Input 
            value={headlineInput} 
            onChange={e => setHeadlineInput(e.target.value)} 
            placeholder="Add a headline" 
            maxLength={240} 
            className="text-sm" 
          />
          <div className="flex items-center justify-between">
            <span className={`text-xs ${headlineInput.length > 240 ? 'text-red-500' : 'text-gray-500'}`}>
              {headlineInput.length}/240
            </span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  setHeadlineInput(headline);
                  setIsEditingHeadline(false);
                }}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveHeadline}>
                <Save size={14} className="mr-1" /> Save
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative group">
          <p className="text-sm text-gray-600 pr-8">
            {headline || "No headline added yet"}
          </p>
          <button 
            onClick={() => setIsEditingHeadline(true)} 
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded" 
            aria-label="Edit headline"
          >
            <Pencil size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default HeadlineSection;
