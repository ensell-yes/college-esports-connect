
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FriendsPanel = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Friends & Team</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            Friends panel content will be displayed here. This will show your gaming friends,
            teammates, and connections from various platforms.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FriendsPanel;
