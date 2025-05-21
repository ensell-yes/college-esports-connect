
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CollegeLayout from "@/components/college/CollegeLayout";
import CollegeProfilePanel from "@/components/college/CollegeProfilePanel";
import CollegeOverviewPanel from "@/components/college/CollegeOverviewPanel";
import TopRecruitsPanel from "@/components/college/TopRecruitsPanel";
import { CollegeData } from "@/components/college/types";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "./NotFound";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PASSWORD = "Path2College";

const CollegeProfile = () => {
  const location = useLocation();
  const { hasDemoAccess, setDemoAccess } = useAuth();
  const [password, setPassword] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState("");

  // Check if this is the program dashboard route
  const isProgramDashboard = location.pathname === "/program-dashboard";
  
  // Check if this is the Graceland college profile route
  const isGracelandProfile = location.pathname === "/college-profile-graceland";
  
  // State for college data
  const [collegeData, setCollegeData] = useState<CollegeData>({
    name: "Graceland University",
    city: "Lamoni",
    state: "IA",
    country: "USA",
    headline: "Graceland creates learning communities where students develop their potential for meaningful and productive lives.",
    followers: 14000,
    logo: "https://pbs.twimg.com/profile_images/1838647739149635584/NDiHx-YX_400x400.jpg",
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

  useEffect(() => {
    // If accessing the program dashboard and not authenticated, show dialog
    if (isProgramDashboard && !hasDemoAccess()) {
      setShowDialog(true);
    }
  }, [isProgramDashboard, hasDemoAccess]);

  const handlePasswordSubmit = () => {
    if (password === PASSWORD) {
      setDemoAccess(true);
      setShowDialog(false);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  // Function to update college data
  const handleUpdateCollege = (updatedData: Partial<CollegeData>) => {
    setCollegeData(prevData => ({
      ...prevData,
      ...updatedData
    }));
  };

  // Show 404 component if trying to access program dashboard without auth
  if (isProgramDashboard && !hasDemoAccess() && !showDialog) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <CollegeLayout>
          {/* Profile Panel (spans across both columns) */}
          <CollegeProfilePanel 
            className="col-span-2" 
            college={collegeData} 
            onUpdate={handleUpdateCollege} 
          />
          
          {/* Overview Panel (spans across both columns) */}
          <CollegeOverviewPanel 
            className="col-span-2" 
            college={collegeData} 
            onUpdate={handleUpdateCollege} 
          />

          {/* Top Recruits Panel - only show on program-dashboard, not on college-profile-graceland */}
          {!isGracelandProfile && (
            <TopRecruitsPanel className="col-span-2 mt-6" />
          )}
        </CollegeLayout>
      </div>

      {/* Password Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Password</DialogTitle>
            <DialogDescription>
              This page requires a password to access.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <div className="flex justify-end">
              <Button onClick={handlePasswordSubmit}>Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CollegeProfile;
