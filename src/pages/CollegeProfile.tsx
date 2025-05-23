
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CollegeLayout from "@/components/college/CollegeLayout";
import CollegeProfilePanel from "@/components/college/CollegeProfilePanel";
import TopRecruitsPanel from "@/components/college/TopRecruitsPanel";
import CollegeOverviewPanel from "@/components/college/CollegeOverviewPanel";
import PipelinePanel from "@/components/college/pipeline/PipelinePanel";
import SmartProspectingPanel from "@/components/college/prospecting/SmartProspectingPanel";
import SchedulePanel from "@/components/college/schedule/SchedulePanel";
import IntegratedCommPanel from "@/components/dashboard/communications/IntegratedCommPanel";
import { CollegeData } from "@/components/college/types";

const CollegeProfile = () => {
  const location = useLocation();
  const isCollegeProfile = location.pathname === "/college-profile-graceland";
  const isProgramDashboard = location.pathname === "/program-dashboard";
  
  // Mock college data for the profile
  const [collegeData, setCollegeData] = useState<CollegeData>({
    name: "Graceland University",
    city: "Lamoni",
    state: "Iowa",
    country: "USA",
    logo: "https://www.gujackets.com/images/setup/headshot_default.jpg?max_width=510&max_height=600",
    coverImage: "https://media.licdn.com/dms/image/v2/C561BAQEUtxn1-sABcg/company-background_10000/company-background_10000/0/1584525006592/graceland_university_cover?e=1748581200&v=beta&t=eJZZxAeDZahcO_l0Bdc8khh2jLKAYqFEYfYFAPRJHG8",
    headline: "Building champions in esports and academics",
    followers: 1245,
    overview: "Graceland University is a leading institution in collegiate esports, offering competitive gaming scholarships and state-of-the-art facilities.",
    website: "https://www.graceland.edu",
    esportsWebsite: "https://www.graceland.edu/esports",
    games: [
      { name: "Valorant", color: "red" },
      { name: "Rocket League", color: "blue" },
      { name: "League of Legends", color: "purple" }
    ],
    activelyRecruitingGames: [
      { name: "Valorant", color: "red" },
      { name: "Rocket League", color: "blue" }
    ]
  });

  // Handle data updates
  const handleUpdate = (updatedData: Partial<CollegeData>) => {
    setCollegeData(prev => ({ ...prev, ...updatedData }));
  };
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-20 pb-10">
        <h1 className="text-2xl font-bold text-esports-dark mb-6 mt-6">
          {isCollegeProfile ? "College Profile" : "Program Dashboard"}
        </h1>
        
        {isCollegeProfile ? (
          // College Profile Layout
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CollegeProfilePanel college={collegeData} onUpdate={handleUpdate} className="col-span-1 md:col-span-2" />
            <TopRecruitsPanel />
            <CollegeOverviewPanel college={collegeData} onUpdate={handleUpdate} />
          </div>
        ) : (
          // Program Dashboard Layout with the new requirements
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CollegeProfilePanel college={collegeData} onUpdate={handleUpdate} className="col-span-1 md:col-span-2" />
            <TopRecruitsPanel />
            <SmartProspectingPanel />
            <PipelinePanel />
            <IntegratedCommPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeProfile;
