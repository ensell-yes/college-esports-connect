
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { 
  Twitch, 
  Twitter,
  MessageSquare, // Using MessageSquare instead of Discord
  GameController, // Using GameController instead of Xbox
  Gamepad, // Using Gamepad instead of Steam for consistent styling
} from "lucide-react";

import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type ServiceAccount = {
  id: string;
  name: string;
  icon: React.ElementType;
  connected: boolean;
  username?: string;
};

const ConnectedAccountsForm = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<ServiceAccount[]>([
    { id: "twitch", name: "Twitch", icon: Twitch, connected: false },
    { id: "twitter", name: "Twitter / X", icon: Twitter, connected: false },
    { id: "discord", name: "Discord", icon: MessageSquare, connected: false },
    { id: "xbox", name: "Xbox", icon: GameController, connected: false },
    { id: "steam", name: "Steam", icon: Gamepad, connected: false },
    { id: "epic", name: "Epic Games", icon: Gamepad, connected: false },
    { id: "battle", name: "Battle.net", icon: Gamepad, connected: false },
  ]);

  const handleConnect = (id: string) => {
    // In a real app, this would open an OAuth flow
    setAccounts(
      accounts.map((account) =>
        account.id === id
          ? { ...account, connected: true, username: `user_${id}` }
          : account
      )
    );
    toast.success(`Connected to ${id} successfully!`);
  };

  const handleDisconnect = (id: string) => {
    // In a real app, this would revoke access tokens
    setAccounts(
      accounts.map((account) =>
        account.id === id
          ? { ...account, connected: false, username: undefined }
          : account
      )
    );
    toast.success(`Disconnected from ${id}`);
  };

  const handleFinish = () => {
    // Navigate to home page after completion
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Connected Gaming Accounts</CardTitle>
          <CardDescription className="text-center">
            Connect your gaming profiles to enhance your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {accounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-muted rounded-md">
                    <account.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{account.name}</h3>
                    {account.connected && (
                      <p className="text-sm text-muted-foreground">
                        Connected as {account.username}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`switch-${account.id}`}
                      checked={account.connected}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleConnect(account.id);
                        } else {
                          handleDisconnect(account.id);
                        }
                      }}
                    />
                    <Label htmlFor={`switch-${account.id}`}>
                      {account.connected ? "Connected" : "Disconnected"}
                    </Label>
                  </div>
                  {!account.connected ? (
                    <Button
                      onClick={() => handleConnect(account.id)}
                      variant="outline"
                      size="sm"
                    >
                      Connect
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleDisconnect(account.id)}
                      variant="outline"
                      size="sm"
                    >
                      Disconnect
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Button 
              onClick={handleFinish} 
              className="w-full bg-esports-purple hover:bg-esports-purple/80 mt-6"
            >
              Finish Setup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectedAccountsForm;
