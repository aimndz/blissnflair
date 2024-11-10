import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../services/eventApi";
import { Event } from "../../types/event";
import EventCard from "./EventCard";
import NoEventsMessage from "./NoEventsMessage";
import AddEventCard from "./AddEventCard";

function UserEventListContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);

  const filter = searchParams.get("filter") || "scheduled";

  const pendingEvents = events.filter((event) => event.status === "PENDING");
  const scheduledEvents = events.filter((event) => event.status === "APPROVED");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getAllEvents();
        const data = res.data;

        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const handleTabChange = (value: string) => {
    setSearchParams({ filter: value });
  };

  return (
    <div>
      <Tabs value={filter} onValueChange={handleTabChange} className="w-full">
        <TabsList>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        {/* Scheduled events */}
        <TabsContent value="scheduled">
          {scheduledEvents.length > 0 ? (
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {scheduledEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
              <AddEventCard />
            </div>
          ) : (
            <NoEventsMessage message="No scheduled events" />
          )}
        </TabsContent>

        {/* Pending events */}
        <TabsContent value="pending">
          {pendingEvents.length > 0 ? (
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {pendingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
              <AddEventCard />
            </div>
          ) : (
            <NoEventsMessage message="No pending events" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UserEventListContent;
