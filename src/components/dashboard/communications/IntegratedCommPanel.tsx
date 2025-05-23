
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, MessageSquare, Video, VideoOff, Phone } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const IntegratedCommPanel = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("calendar");
  
  // Mock data for calendar events
  const events = [
    { id: 1, title: "Interview with Coach Thompson", time: "10:00 AM", type: "interview" },
    { id: 2, title: "Scrimmage Discussion", time: "1:30 PM", type: "scrimmage" },
    { id: 3, title: "Campus Visit Planning", time: "4:00 PM", type: "campus-visit" }
  ];

  // Mock data for chat messages
  const chatThreads = [
    {
      id: 1,
      name: "Coach Williams",
      avatar: "/placeholder.svg",
      lastMessage: "Let's discuss your performance in the last match",
      time: "10 min ago",
      unread: true
    },
    {
      id: 2,
      name: "Graceland University",
      avatar: "https://d2o2figo6ddd0g.cloudfront.net/m/m/bzo8yu4irp36w2/headshot_default_-10-.jpg",
      lastMessage: "Are you available for a campus visit next week?",
      time: "2 hours ago",
      unread: false
    },
    {
      id: 3,
      name: "Coach Martinez",
      avatar: "/placeholder.svg",
      lastMessage: "Great job in yesterday's scrimmage!",
      time: "Yesterday",
      unread: false
    }
  ];

  // Mock data for upcoming calls
  const upcomingCalls = [
    {
      id: 1,
      title: "Strategy Discussion",
      with: "Coach Williams",
      time: "Today, 3:00 PM",
      platform: "Zoom",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Recruitment Interview",
      with: "Graceland University",
      time: "Tomorrow, 11:00 AM",
      platform: "Teams",
      status: "upcoming"
    }
  ];

  return (
    <Card className="col-span-1 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Communications Hub</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <CalendarIcon className="h-3 w-3 mr-1" />
              Connect Calendar
            </Button>
          </div>
        </div>
        <CardDescription>
          Schedule meetings, chat with coaches, and join video calls
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-4">
          <TabsList className="w-full">
            <TabsTrigger value="calendar" className="flex-1">
              <CalendarIcon className="h-4 w-4 mr-2" /> Calendar
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" /> Messages
            </TabsTrigger>
            <TabsTrigger value="calls" className="flex-1">
              <Video className="h-4 w-4 mr-2" /> Video Calls
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="pt-4">
          <TabsContent value="calendar" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium">
                  Events for {selectedDate?.toLocaleDateString()}
                </h3>
                {events.length > 0 ? (
                  events.map((event) => (
                    <div 
                      key={event.id} 
                      className="flex justify-between items-center p-2 rounded-md border hover:bg-accent cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                      <Badge variant={
                        event.type === "interview" ? "default" : 
                        event.type === "scrimmage" ? "destructive" : "outline"
                      }>
                        {event.type}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No events scheduled for this day
                  </div>
                )}
                <div className="mt-auto pt-2">
                  <Button size="sm" className="w-full">
                    <CalendarIcon className="h-4 w-4 mr-2" /> Schedule New Event
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="mt-0">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Recent Conversations</h3>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" /> New Message
                </Button>
              </div>
              {chatThreads.map((thread) => (
                <div 
                  key={thread.id} 
                  className={`flex items-center gap-3 p-3 rounded-md hover:bg-accent cursor-pointer ${thread.unread ? 'bg-accent/50' : 'bg-background'}`}
                >
                  <Avatar>
                    <AvatarImage src={thread.avatar} />
                    <AvatarFallback>{thread.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm">{thread.name}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{thread.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{thread.lastMessage}</p>
                  </div>
                  {thread.unread && (
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                  )}
                </div>
              ))}
              <div className="mt-4 pt-3 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  View All Messages
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calls" className="mt-0">
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-medium">Upcoming Video Calls</h3>
              {upcomingCalls.length > 0 ? (
                upcomingCalls.map((call) => (
                  <div key={call.id} className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{call.title}</h4>
                      <Badge>{call.platform}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      with {call.with} • {call.time}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="flex-1">
                        <Video className="h-4 w-4 mr-2" /> Join Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <VideoOff className="h-4 w-4 mr-2" /> Reschedule
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No upcoming calls scheduled
                </div>
              )}
              <Separator className="my-2" />
              <h3 className="text-sm font-medium">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">
                  <Video className="h-4 w-4 mr-2" /> Start Video Call
                </Button>
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" /> Start Audio Call
                </Button>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default IntegratedCommPanel;
