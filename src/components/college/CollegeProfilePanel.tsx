
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Pencil, Save, Camera, MapPin, Users } from "lucide-react";
import { toast } from "sonner";
import { CollegeData } from "./types";
import ImageUploader from "@/components/dashboard/profile/ImageUploader";

interface CollegeProfilePanelProps {
  college: CollegeData;
  onUpdate: (updatedData: Partial<CollegeData>) => void;
  className?: string;
}

const CollegeProfilePanel = ({ college, onUpdate, className = "" }: CollegeProfilePanelProps) => {
  const [isEditingHeadline, setIsEditingHeadline] = useState(false);
  const [headlineInput, setHeadlineInput] = useState(college.headline);

  // Handle profile image update
  const handleProfileImageUpdate = (imageBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      onUpdate({ logo: base64data });
      toast.success("School logo updated successfully");
    };
  };

  // Handle cover image update
  const handleCoverImageUpdate = (imageBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      onUpdate({ coverImage: base64data });
      toast.success("Cover image updated successfully");
    };
  };

  // Save headline
  const handleSaveHeadline = () => {
    if (headlineInput.length > 240) {
      toast.error("Headline must be 240 characters or less");
      return;
    }
    
    onUpdate({ headline: headlineInput });
    setIsEditingHeadline(false);
    toast.success("Headline updated successfully");
  };

  return (
    <Card className={`shadow-md ${className}`}>
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={college.coverImage} 
          alt={`${college.name} Cover`} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-2 right-2">
          <ImageUploader
            onImageSelected={handleCoverImageUpdate}
            aspectRatio={3.5}
            buttonIcon={<Camera size={16} className="text-gray-700" />}
            buttonVariant="ghost"
            className="bg-white/80 p-1 rounded-full shadow hover:bg-white"
            maxSizeInMB={2}
          />
        </div>
      </div>
      
      <CardContent className="pt-0">
        <div className="flex flex-col md:flex-row gap-4 -mt-12 md:-mt-16">
          {/* School Logo */}
          <div className="relative">
            <div className="h-24 w-24 md:h-32 md:w-32 border-4 border-white rounded-md shadow-lg overflow-hidden bg-white">
              <img 
                src={college.logo} 
                alt={`${college.name} Logo`} 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="absolute bottom-1 right-1">
              <ImageUploader
                onImageSelected={handleProfileImageUpdate}
                aspectRatio={1}
                buttonIcon={<Camera size={14} className="text-gray-700" />}
                buttonVariant="ghost"
                className="bg-white p-1 rounded-full shadow hover:bg-gray-100"
                maxSizeInMB={2}
              />
            </div>
          </div>
          
          {/* School Info */}
          <div className="flex-1 pt-4">
            <h2 className="text-2xl font-bold text-esports-dark">{college.name}</h2>
            
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin size={14} className="mr-1" />
              <span>{college.city}, {college.state}, {college.country}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Users size={14} className="mr-1" />
              <span>{college.followers.toLocaleString()} followers</span>
            </div>
          </div>
        </div>
        
        {/* Headline */}
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
                      setHeadlineInput(college.headline);
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
                {college.headline || "No headline added yet"}
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
        
        {/* Games Supported */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Games Supported</h3>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-500 hover:bg-blue-600">Rocket League</Badge>
            <Badge className="bg-purple-600 hover:bg-purple-700">League of Legends</Badge>
            <Badge className="bg-red-500 hover:bg-red-600">Valorant</Badge>
            <Badge className="bg-red-600 hover:bg-red-700">Marvel Rivals</Badge>
            <Badge className="bg-green-700 hover:bg-green-800">Counter-Strike</Badge>
            <Badge className="bg-yellow-500 hover:bg-yellow-600">Super Smash Bros</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-800">Call of Duty</Badge>
            <Badge className="bg-blue-700 hover:bg-blue-800">Chess</Badge>
            <Badge className="bg-orange-500 hover:bg-orange-600">Fortnite</Badge>
            <Badge className="bg-blue-600 hover:bg-blue-700">Hearthstone</Badge>
            <Badge className="bg-green-600 hover:bg-green-700">iRacing</Badge>
            <Badge className="bg-red-700 hover:bg-red-800">F1</Badge>
            <Badge className="bg-green-500 hover:bg-green-600">Madden</Badge>
            <Badge className="bg-blue-800 hover:bg-blue-900">NBA 2K</Badge>
            <Badge className="bg-orange-600 hover:bg-orange-700">Overwatch 2</Badge>
            <Badge className="bg-yellow-600 hover:bg-yellow-700">PUBG</Badge>
            <Badge className="bg-teal-600 hover:bg-teal-700">Rainbow 6: Siege</Badge>
            <Badge className="bg-green-800 hover:bg-green-900">FC</Badge>
            <Badge className="bg-purple-700 hover:bg-purple-800">Tekken 8</Badge>
            <Badge className="bg-red-800 hover:bg-red-900">Street Fighter 6</Badge>
            <Badge className="bg-red-500 hover:bg-red-600">Apex Legends</Badge>
            <Badge className="bg-purple-800 hover:bg-purple-900">DOTA</Badge>
            <Badge className="bg-blue-900 hover:bg-blue-950">ESL R1</Badge>
            <Badge className="bg-orange-700 hover:bg-orange-800">Free Fire</Badge>
            <Badge className="bg-blue-500 hover:bg-blue-600">Mobile Legends Bang Bang</Badge>
            <Badge className="bg-yellow-800 hover:bg-yellow-900">Starcraft 2</Badge>
            <Badge className="bg-indigo-600 hover:bg-indigo-700">Teamfight Tactics</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollegeProfilePanel;
