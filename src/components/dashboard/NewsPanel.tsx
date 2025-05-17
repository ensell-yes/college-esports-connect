
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewsPanel = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Esports News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            Esports news panel content will be displayed here. This will show the latest
            news, updates, and announcements from the esports world.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsPanel;
