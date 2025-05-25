
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
