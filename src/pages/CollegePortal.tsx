
import { useState } from "react";
import CollegeLayout from "@/components/college/CollegeLayout";
import CollegeProfilePanel from "@/components/college/CollegeProfilePanel";
import CollegeOverviewPanel from "@/components/college/CollegeOverviewPanel";
import TopRecruitsPanel from "@/components/college/TopRecruitsPanel";
import { CollegeData } from "@/components/college/types";
import { PageTypeProfile } from "@/components/college/types";

const CollegePortal = () => {
  // Initial college data
  const [collegeData, setCollegeData] = useState<CollegeData>({
    name: "Graceland University",
    city: "Lamoni",
    state: "IA",
    country: "USA",
    headline: "Graceland creates learning communities where students develop their potential for meaningful and productive lives.",
    followers: 14000,
    logo: "/lovable-uploads/ca061be0-623d-41dd-99eb-6cdea177c746.png",
    coverImage: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3",
    games: [
      { name: "Rocket League", color: "bg-blue-500" },
      { name: "League of Legends", color: "bg-purple-600" },
      { name: "Valorant", color: "bg-red-500" },
      { name: "Counter-Strike", color: "bg-green-700" },
      { name: "Fortnite", color: "bg-orange-500" }
    ],
    overview: "Graceland University, founded in 1895, creates learning communities where students develop their potential for meaningful, productive lives. Offering residential and non-residential environments, Graceland boasts more than 50 academic majors and programs and over 50 clubs and organizations.",
    website: "graceland.edu",
    esportsWebsite: "https://www.gujackets.com/sports/esports/index"
  });

  // Function to update college data
  const handleUpdateCollege = (updatedData: Partial<CollegeData>) => {
    setCollegeData(prevData => ({
      ...prevData,
      ...updatedData
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-esports-dark">College Portal</h1>
        
        <CollegeLayout>
          {/* Profile Panel (spans across both columns) */}
          <CollegeProfilePanel 
            className="col-span-2" 
            college={collegeData} 
            onUpdate={handleUpdateCollege} 
            pageType={PageTypeProfile}
          />
          
          {/* Overview Panel (spans across both columns) */}
          <CollegeOverviewPanel 
            className="col-span-2" 
            college={collegeData} 
            onUpdate={handleUpdateCollege} 
          />

          {/* Top Recruits Panel (spans across both columns) */}
          <TopRecruitsPanel className="col-span-2 mt-6" />
        </CollegeLayout>
      </div>
    </div>
  );
};

export default CollegePortal;
