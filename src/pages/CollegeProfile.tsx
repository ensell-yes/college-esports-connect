
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { PageTypeProfile } from "@/components/college/types";

const CollegeProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCollegeProfile = location.pathname === "/college-profile-graceland";
  const isProgramDashboard = location.pathname === "/program-dashboard";
  const isMobile = useIsMobile();
  const { user, hasDemoAccess, redirectAfterAuth } = useAuth();
  
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
      { name: "Valorant", color: "bg-red-500 hover:bg-red-600" },
      { name: "Rocket League", color: "bg-blue-500 hover:bg-blue-600" },
      { name: "League of Legends", color: "bg-purple-600 hover:bg-purple-700" }
    ],
    activelyRecruitingGames: [
      { name: "Valorant", color: "bg-red-500 hover:bg-red-600" },
      { name: "Rocket League", color: "bg-blue-500 hover:bg-blue-600" }
    ]
  });

  // Handle data updates
  const handleUpdate = (updatedData: Partial<CollegeData>) => {
    setCollegeData(prev => ({ ...prev, ...updatedData }));
  };

  // Check authentication for program dashboard
  useEffect(() => {
    if (isProgramDashboard && !user && !hasDemoAccess()) {
      redirectAfterAuth(location.pathname);
      navigate(`/auth?redirect=${encodeURIComponent(location.pathname)}`);
    }
    window.scrollTo(0, 0);
  }, [isProgramDashboard, user, hasDemoAccess, navigate, location.pathname, redirectAfterAuth]);

  // Show loading for program dashboard if not authenticated
  if (isProgramDashboard && !user && !hasDemoAccess()) {
    return null;
  }

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
            <CollegeProfilePanel college={collegeData} onUpdate={handleUpdate} pageType={PageTypeProfile} className="col-span-1 md:col-span-2" />
            <SchedulePanel className="col-span-1" initialGameType="Valorant" />
            <CollegeOverviewPanel college={collegeData} onUpdate={handleUpdate} />
          </div>
        ) : (
          // Program Dashboard Layout with the new requirements
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CollegeProfilePanel college={collegeData} onUpdate={handleUpdate} pageType="dashboard" className="col-span-1 md:col-span-2" />
            <TopRecruitsPanel />
            <SmartProspectingPanel />
            <PipelinePanel className="col-span-1 md:col-span-2" />
            <IntegratedCommPanel className="col-span-1 md:col-span-2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeProfile;
