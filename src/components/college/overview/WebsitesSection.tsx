
import { FC, useState } from "react";
import { Globe, Plus, Check, Trash, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface Website {
  name: string;
  url: string;
}

interface WebsitesSectionProps {
  website: string;
  esportsWebsite: string;
  onUpdate: (data: { website: string; esportsWebsite: string }) => void;
}

const WebsitesSection: FC<WebsitesSectionProps> = ({ website, esportsWebsite, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedWebsite, setEditedWebsite] = useState(website);
  const [editedEsportsWebsite, setEditedEsportsWebsite] = useState(esportsWebsite);
  const [additionalWebsites, setAdditionalWebsites] = useState<Website[]>([]);
  const [newWebsiteName, setNewWebsiteName] = useState("");
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("");
  const { hasDemoAccess } = useAuth();

  const handleSave = () => {
    onUpdate({ 
      website: editedWebsite.trim(), 
      esportsWebsite: editedEsportsWebsite.trim() 
    });
    setIsEditing(false);
    toast.success("Websites updated successfully");
  };

  const handleCancel = () => {
    setEditedWebsite(website);
    setEditedEsportsWebsite(esportsWebsite);
    setIsEditing(false);
  };

  const handleAddWebsite = () => {
    if (newWebsiteName.trim() && newWebsiteUrl.trim()) {
      setAdditionalWebsites([
        ...additionalWebsites,
        { name: newWebsiteName.trim(), url: newWebsiteUrl.trim() }
      ]);
      setNewWebsiteName("");
      setNewWebsiteUrl("");
      toast.success("Website added");
    }
  };

  const handleRemoveWebsite = (index: number) => {
    const newWebsites = [...additionalWebsites];
    newWebsites.splice(index, 1);
    setAdditionalWebsites(newWebsites);
    toast.success("Website removed");
  };

  const showEditButton = hasDemoAccess();

  const formatUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  const displayUrl = (url: string) => {
    try {
      return new formatUrl(url);
    } catch (e) {
      return url;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-esports-dark">Websites</h3>
        {showEditButton && !isEditing && (
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Main Website</label>
            <Input
              value={editedWebsite}
              onChange={(e) => setEditedWebsite(e.target.value)}
              placeholder="e.g., example.edu"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Esports Website</label>
            <Input
              value={editedEsportsWebsite}
              onChange={(e) => setEditedEsportsWebsite(e.target.value)}
              placeholder="e.g., example.edu/esports"
            />
          </div>
          
          {additionalWebsites.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Additional Websites</h4>
              {additionalWebsites.map((site, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={site.name} disabled className="flex-1" />
                  <Input value={site.url} disabled className="flex-2" />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveWebsite(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          <div className="space-y-2 pt-2 border-t">
            <h4 className="text-sm font-medium">Add Another Website</h4>
            <div className="flex items-center gap-2">
              <Input
                value={newWebsiteName}
                onChange={(e) => setNewWebsiteName(e.target.value)}
                placeholder="Website Name"
                className="flex-1"
              />
              <Input
                value={newWebsiteUrl}
                onChange={(e) => setNewWebsiteUrl(e.target.value)}
                placeholder="URL"
                className="flex-2"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAddWebsite}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Check className="mr-1 h-4 w-4" /> Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center">
            <Globe size={16} className="mr-2 text-blue-600" />
            <span className="font-medium">Main Website:</span>
            <a 
              href={formatUrl(website)} 
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
              href={formatUrl(esportsWebsite)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 hover:underline"
            >
              {displayUrl(esportsWebsite)}
            </a>
          </div>
          
          {additionalWebsites.map((site, index) => (
            <div key={index} className="flex items-center">
              <Globe size={16} className="mr-2 text-blue-600" />
              <span className="font-medium">{site.name}:</span>
              <a 
                href={formatUrl(site.url)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-blue-600 hover:underline"
              >
                {displayUrl(site.url)}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WebsitesSection;
