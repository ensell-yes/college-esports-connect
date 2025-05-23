
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
    id: "1",
    name: "Graceland University",
    city: "Lamoni",
    state: "Iowa",
    country: "USA",
    logo: "/lovable-uploads/1ddc042c-abb8-49e8-89b5-44238316961e.png",
    coverImage: "/lovable-uploads/9e981126-05f0-4341-b2a0-d6e95259b11a.png",
    headline: "Building champions in esports and academics",
    followers: 1245,
    overview: "Graceland University is a leading institution in collegiate esports, offering competitive gaming scholarships and state-of-the-art facilities.",
    website: "https://www.graceland.edu",
    esportsWebsite: "https://www.graceland.edu/esports",
    games: [
      { id: "1", name: "Valorant", iconUrl: "https://via.placeholder.com/30" },
      { id: "2", name: "Rocket League", iconUrl: "https://via.placeholder.com/30" },
      { id: "3", name: "League of Legends", iconUrl: "https://via.placeholder.com/30" }
    ],
    activelyRecruitingGames: [
      { id: "1", name: "Valorant", iconUrl: "https://via.placeholder.com/30" },
      { id: "2", name: "Rocket League", iconUrl: "https://via.placeholder.com/30" }
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
        
        <CollegeLayout>
          {isCollegeProfile ? (
            <>
              <CollegeProfilePanel college={collegeData} onUpdate={handleUpdate} />
              <TopRecruitsPanel />
              <CollegeOverviewPanel college={collegeData} onUpdate={handleUpdate} />
            </>
          ) : (
            <>
              <PipelinePanel />
              <SmartProspectingPanel />
              <SchedulePanel />
              <IntegratedCommPanel />
            </>
          )}
        </CollegeLayout>
      </div>
    </div>
  );
};

export default CollegeProfile;
