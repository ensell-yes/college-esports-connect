
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

interface ServiceItem {
  name: string;
  color: string;
  initial: string;
  description: string;
}

const ConnectedAccountsForm = ({ onBack }: ConnectedAccountsFormProps) => {
  const navigate = useNavigate();
  
  const services: ServiceItem[] = [
    {
      name: "Discord",
      color: "bg-blue-500",
      initial: "D",
      description: "Connect your Discord account"
    },
    {
      name: "Epic Games",
      color: "bg-black",
      initial: "E",
      description: "Connect your Epic Games account"
    },
    {
      name: "League of Legends",
      color: "bg-blue-600",
      initial: "L",
      description: "Connect your League of Legends account"
    },
    {
      name: "Playstation Network",
      color: "bg-blue-800",
      initial: "P",
      description: "Connect your Playstation account"
    },
    {
      name: "Riot Games",
      color: "bg-red-600",
      initial: "R",
      description: "Connect your Riot Games account"
    },
    {
      name: "Steam",
      color: "bg-gray-800",
      initial: "S",
      description: "Connect your Steam account"
    },
    {
      name: "Twitch",
      color: "bg-purple-500",
      initial: "T",
      description: "Connect your Twitch account"
    },
    {
      name: "Xbox Game Pass",
      color: "bg-green-500",
      initial: "X",
      description: "Connect your Xbox account"
    },
    {
      name: "YouTube",
      color: "bg-red-500",
      initial: "Y",
      description: "Connect your YouTube account"
    }
  ];
  
  // Sort services alphabetically by name
  const sortedServices = [...services].sort((a, b) => a.name.localeCompare(b.name));
  
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
            {sortedServices.map((service) => (
              <div key={service.name} className="p-4 border rounded-lg flex items-center justify-between bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${service.color} rounded-full flex items-center justify-center text-white font-bold`}>
                    {service.initial}
                  </div>
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-esports-purple hover:bg-esports-purple/80"
            onClick={() => navigate("/dashboard")}
          >
            Complete Setup
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConnectedAccountsForm;
