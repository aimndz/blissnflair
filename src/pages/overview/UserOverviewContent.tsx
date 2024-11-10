import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Calendar as CalendarPreview } from "../../components/ui/calendar";
import { Button } from "../../components/ui/button";
import OverviewSection from "./OverviewSection";
import { SidebarTrigger } from "../../components/ui/sidebar";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../services/eventApi";
import { Event } from "../../types/event";
import { format, parseISO } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { Link } from "react-router-dom";
import { Separator } from "../../components/ui/separator";
import { ScrollArea } from "../../components/ui/scroll-area";

function UserOverviewContent() {
  const [events, setEvents] = useState<Event[]>([]);

  const upcomingEvents = events
    .filter((event) => new Date(event.date) > new Date())
    .map((event) => ({
      ...event,
      date: format(parseISO(event.date), "MMM dd yyyy"),
      daysLeft: Math.ceil(
        (new Date(event.date).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    }))
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 4);

  // const upcomingEvents = [];
  // const pendingEvents = [];
  const pendingEvents = events.filter((event) => event.status === "PENDING");

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

  return (
    <>
      <OverviewSection sectionTitle="Upcoming events">
        {upcomingEvents.length !== 0 ? (
          <div className="flex gap-3">
            {upcomingEvents.map((event) => (
              <Link
                to={`/dashboard/events/${event.id}`}
                className="w-full max-w-xs"
                replace
                key={event.id}
              >
                <Card>
                  <CardHeader className="pt-6 text-xl font-semibold">
                    <CardTitle className="truncate">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-6">
                    <div className="rounded-lg bg-secondary-200 p-2">
                      <div className="justify-left itemss-center flex gap-3">
                        <Calendar />
                        <div>
                          <p className="text-xs">{event.daysLeft} days left</p>
                          <p className="font-semibold">{event.date}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="italic text-secondary-800">
            It looks like there are no upcoming events right now.
          </p>
        )}
      </OverviewSection>

      <Separator className="mb-6 mt-8" />

      <OverviewSection>
        <div className="flex gap-3">
          <div className="w-full max-w-80">
            <h2 className="mb-3 text-2xl font-medium">Pending events</h2>
            <ScrollArea className="h-[500px] pr-3">
              {pendingEvents.length !== 0 ? (
                <Carousel
                  opts={{
                    dragFree: true,
                  }}
                  orientation="vertical"
                >
                  <CarouselContent className="-ml-3">
                    {pendingEvents.map((event) => (
                      <CarouselItem className="basis-1/4 pl-3" key={event.id}>
                        <Card className="w-full max-w-xs select-none border-secondary-600 bg-secondary-100 hover:cursor-default">
                          <CardHeader>
                            <CardTitle className="w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                              {event.title}
                            </CardTitle>
                            <CardDescription className="w-xs overflow-hidden text-ellipsis whitespace-nowrap font-normal">
                              Your event is currently under review
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button className="bg-primary-100 text-secondary-900 hover:bg-primary-200">
                              Edit event
                            </Button>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {/* <CarouselPrevious />
          <CarouselNext /> */}
                </Carousel>
              ) : (
                <div className="text-center italic text-secondary-800">
                  <p>No pending events!</p>
                  <p>Ready to create your next event?</p>
                </div>
              )}
            </ScrollArea>
          </div>

          <Separator className="mx-6" orientation="vertical" />

          <div>
            <h2 className="mb-3 text-2xl font-medium">Calendar</h2>
            <CalendarPreview
              mode="multiple"
              selected={[new Date(2024, 10, 1), new Date(2024, 10, 2)]}
              className="rounded-md border bg-secondary-100 shadow"
            />
          </div>
        </div>
      </OverviewSection>
    </>
  );
}

export default UserOverviewContent;
