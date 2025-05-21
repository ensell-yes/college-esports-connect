
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, UserPlus } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ConnectedAccountsFormProps {
  onBack?: () => void;
  onComplete?: () => void;
}

const ConnectedAccountsForm = ({ onBack, onComplete }: ConnectedAccountsFormProps) => {
  // Function to handle account connection
  const handleConnectAccount = (platform: string) => {
    // In a real app, this would initiate OAuth flow
    toast.success(`Connected to ${platform}!`);
  };

  // Handle form completion
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-center">Connect Your Accounts</CardTitle>
              <CardDescription className="text-center">
                Link your gaming accounts to showcase your achievements
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Account connection buttons */}
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => handleConnectAccount("Steam")}
            >
              <span className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5" />
                Connect Steam
              </span>
              <Check className="h-5 w-5 text-green-500 opacity-0" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => handleConnectAccount("Epic Games")}
            >
              <span className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5" />
                Connect Epic Games
              </span>
              <Check className="h-5 w-5 text-green-500 opacity-0" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => handleConnectAccount("Discord")}
            >
              <span className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5" />
                Connect Discord
              </span>
              <Check className="h-5 w-5 text-green-500 opacity-0" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => handleConnectAccount("Riot Games")}
            >
              <span className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5" />
                Connect Riot Games
              </span>
              <Check className="h-5 w-5 text-green-500 opacity-0" />
            </Button>
          </div>
          
          {/* Complete profile button */}
          <Button 
            className="w-full bg-esports-purple hover:bg-esports-purple/80"
            onClick={handleComplete}
          >
            Complete Setup
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectedAccountsForm;
