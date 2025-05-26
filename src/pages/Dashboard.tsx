
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfilePanel from "@/components/dashboard/ProfilePanel";
import StatsPanel from "@/components/dashboard/StatsPanel";
import AchievementsPanel from "@/components/dashboard/AchievementsPanel";
import UpcomingEventsPanel from "@/components/dashboard/UpcomingEventsPanel";
import NewsPanel from "@/components/dashboard/NewsPanel";
import FriendsPanel from "@/components/dashboard/FriendsPanel";
import IntegratedCommPanel from "@/components/dashboard/communications/IntegratedCommPanel";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const { user, hasDemoAccess, redirectAfterAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to auth if not logged in and no demo access
  useEffect(() => {
    if (!user && !hasDemoAccess()) {
      redirectAfterAuth(location.pathname);
      navigate(`/auth?redirect=${encodeURIComponent(location.pathname)}`);
    }
  }, [user, hasDemoAccess, navigate, location.pathname, redirectAfterAuth]);

  // Show loading or redirect if not authenticated
  if (!user && !hasDemoAccess()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-20 pb-10">
        <h1 className="text-2xl font-bold text-esports-dark mb-6 mt-6">Player Dashboard</h1>
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
          <div className="col-span-1 sm:col-span-2">
            <IntegratedCommPanel />
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Dashboard;
