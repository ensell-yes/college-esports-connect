
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UpcomingEventsPanel = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            Upcoming events panel content will be displayed here. This will show tournaments,
            matches, and other gaming events that you've registered for.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEventsPanel;
