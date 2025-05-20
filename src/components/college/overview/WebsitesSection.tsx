
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Pencil, Save, Globe } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

interface WebsitesSectionProps {
  website: string;
  esportsWebsite: string;
  onUpdate: (data: { website: string; esportsWebsite: string }) => void;
}

interface WebsitesFormValues {
  website: string;
  esportsWebsite: string;
}

const WebsitesSection = ({ website, esportsWebsite, onUpdate }: WebsitesSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const websiteForm = useForm<WebsitesFormValues>({
    defaultValues: {
      website: website,
      esportsWebsite: esportsWebsite
    }
  });

  // Save websites
  const onSubmit = (data: WebsitesFormValues) => {
    onUpdate({
      website: data.website,
      esportsWebsite: data.esportsWebsite
    });
    setIsEditing(false);
    toast.success("Website information updated successfully");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-esports-dark">Websites</h3>
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
        <Form {...websiteForm}>
          <form onSubmit={websiteForm.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={websiteForm.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Website</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. university.edu" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={websiteForm.control}
              name="esportsWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Esports Website</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. university.edu/esports" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button"
                variant="outline" 
                size="sm" 
                onClick={() => {
                  websiteForm.reset({
                    website: website,
                    esportsWebsite: esportsWebsite
                  });
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm">
                <Save size={14} className="mr-1" /> Save
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center">
            <Globe size={16} className="mr-2 text-blue-600" />
            <span className="font-medium">Main Website:</span>
            <a 
              href={website.startsWith('http') ? website : `https://${website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 hover:underline"
            >
              {website}
            </a>
          </div>
          
          <div className="flex items-center">
            <Globe size={16} className="mr-2 text-blue-600" />
            <span className="font-medium">Esports Website:</span>
            <a 
              href={esportsWebsite} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 hover:underline"
            >
              {esportsWebsite.includes('gujackets.com') ? 'gujackets.com/sports/esports' : new URL(esportsWebsite).hostname}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsitesSection;
