
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AchievementsPanel = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            Achievements panel content will be displayed here. This will show badges, awards, and
            recognitions from your gaming journey.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsPanel;
