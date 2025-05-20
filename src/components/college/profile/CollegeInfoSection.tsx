
import { MapPin, Users } from "lucide-react";

interface CollegeInfoSectionProps {
  name: string;
  city: string;
  state: string;
  country: string;
  followers: number;
}

const CollegeInfoSection = ({ name, city, state, country, followers }: CollegeInfoSectionProps) => {
  return (
    <div className="flex-1 pt-2 md:pt-0">
      <h2 className="text-2xl font-bold text-esports-dark">{name}</h2>
      
      <div className="flex items-center text-sm text-gray-600 mt-1">
        <MapPin size={14} className="mr-1" />
        <span>{city}, {state}, {country}</span>
      </div>
      
      <div className="flex items-center text-sm text-gray-600 mt-1">
        <Users size={14} className="mr-1" />
        <span>{followers.toLocaleString()} followers</span>
      </div>
    </div>
  );
};

export default CollegeInfoSection;
