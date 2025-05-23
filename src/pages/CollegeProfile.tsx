
import { useEffect } from "react";
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

const CollegeProfile = () => {
  const location = useLocation();
  const isCollegeProfile = location.pathname === "/college-profile-graceland";
  const isProgramDashboard = location.pathname === "/program-dashboard";
  
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
              <CollegeProfilePanel />
              <TopRecruitsPanel />
              <CollegeOverviewPanel />
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
