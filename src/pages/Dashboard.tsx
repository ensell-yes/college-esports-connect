
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfilePanel from "@/components/dashboard/ProfilePanel";
import StatsPanel from "@/components/dashboard/StatsPanel";
import AchievementsPanel from "@/components/dashboard/AchievementsPanel";
import UpcomingEventsPanel from "@/components/dashboard/UpcomingEventsPanel";
import NewsPanel from "@/components/dashboard/NewsPanel";
import FriendsPanel from "@/components/dashboard/FriendsPanel";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user && !localStorage.getItem("demo-access-token")) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-20 pb-10">
        <h1 className="text-2xl font-bold text-esports-dark mb-6 mt-6">Esports Dashboard</h1>
        <DashboardLayout>
          <div className="col-span-1 sm:col-span-2">
            <ProfilePanel />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <StatsPanel />
          </div>
          <AchievementsPanel />
          <UpcomingEventsPanel />
          <NewsPanel />
          <FriendsPanel />
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Dashboard;
