
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ConnectedAccountsFormProps {
  onBack?: () => void;
}

const ConnectedAccountsForm = ({ onBack }: ConnectedAccountsFormProps) => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1); // Navigate back to previous page as fallback
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleGoBack} 
              className="mr-2"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-center">Connected Accounts</CardTitle>
              <CardDescription className="text-center">
                Connect your gaming accounts to your profile
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="p-4 border rounded-lg flex items-center justify-between bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">D</div>
                <div>
                  <h3 className="font-medium">Discord</h3>
                  <p className="text-sm text-muted-foreground">Connect your Discord account</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>

            <div className="p-4 border rounded-lg flex items-center justify-between bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">X</div>
                <div>
                  <h3 className="font-medium">Xbox Game Pass</h3>
                  <p className="text-sm text-muted-foreground">Connect your Xbox account</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>

            <div className="p-4 border rounded-lg flex items-center justify-between bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">T</div>
                <div>
                  <h3 className="font-medium">Twitch</h3>
                  <p className="text-sm text-muted-foreground">Connect your Twitch account</p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-esports-purple hover:bg-esports-purple/80"
            onClick={() => navigate("/")}
          >
            Complete Setup
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConnectedAccountsForm;
