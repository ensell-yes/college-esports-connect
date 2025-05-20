
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Pencil, Save, Globe } from "lucide-react";
import { toast } from "sonner";
import { CollegeData } from "./types";
import { useForm } from "react-hook-form";

interface CollegeOverviewPanelProps {
  college: CollegeData;
  onUpdate: (updatedData: Partial<CollegeData>) => void;
  className?: string;
}

interface WebsitesFormValues {
  website: string;
  esportsWebsite: string;
}

const CollegeOverviewPanel = ({ college, onUpdate, className = "" }: CollegeOverviewPanelProps) => {
  const [isEditingOverview, setIsEditingOverview] = useState(false);
  const [isEditingWebsites, setIsEditingWebsites] = useState(false);
  const [overviewInput, setOverviewInput] = useState(college.overview);

  const websiteForm = useForm<WebsitesFormValues>({
    defaultValues: {
      website: college.website,
      esportsWebsite: college.esportsWebsite
    }
  });

  // Save overview
  const handleSaveOverview = () => {
    onUpdate({ overview: overviewInput });
    setIsEditingOverview(false);
    toast.success("Overview updated successfully");
  };

  // Save websites
  const onSubmitWebsites = (data: WebsitesFormValues) => {
    onUpdate({
      website: data.website,
      esportsWebsite: data.esportsWebsite
    });
    setIsEditingWebsites(false);
    toast.success("Website information updated successfully");
  };

  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl">College Overview</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overview Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-esports-dark">Overview</h3>
            {!isEditingOverview && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditingOverview(true)}
              >
                <Pencil size={14} className="mr-1" /> Edit
              </Button>
            )}
          </div>
          
          {isEditingOverview ? (
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
                    setOverviewInput(college.overview);
                    setIsEditingOverview(false);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSaveOverview}
                >
                  <Save size={14} className="mr-1" /> Save
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700">
              {college.overview}
            </p>
          )}
        </div>
        
        {/* Website Information */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-esports-dark">Websites</h3>
            {!isEditingWebsites && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditingWebsites(true)}
              >
                <Pencil size={14} className="mr-1" /> Edit
              </Button>
            )}
          </div>
          
          {isEditingWebsites ? (
            <Form {...websiteForm}>
              <form onSubmit={websiteForm.handleSubmit(onSubmitWebsites)} className="space-y-4">
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
                        website: college.website,
                        esportsWebsite: college.esportsWebsite
                      });
                      setIsEditingWebsites(false);
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
                  href={college.website.startsWith('http') ? college.website : `https://${college.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:underline"
                >
                  {college.website}
                </a>
              </div>
              
              <div className="flex items-center">
                <Globe size={16} className="mr-2 text-blue-600" />
                <span className="font-medium">Esports Website:</span>
                <a 
                  href={college.esportsWebsite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:underline"
                >
                  {new URL(college.esportsWebsite).hostname}
                </a>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollegeOverviewPanel;
