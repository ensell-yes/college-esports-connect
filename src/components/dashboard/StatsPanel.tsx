
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatsPanel = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Player Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            Stats panel content will be displayed here. This will show your gaming statistics
            from connected accounts.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsPanel;
