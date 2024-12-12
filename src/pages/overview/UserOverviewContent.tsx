import { Calendar, Flower } from "lucide-react";
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
import { useEffect, useState } from "react";
import { getAllEvents } from "../../services/eventApi";
import { Event } from "../../types/event";
import { format, parseISO } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import { Link } from "react-router-dom";
import { ScrollArea } from "../../components/ui/scroll-area";
import { ClockIcon } from "@radix-ui/react-icons";
import StatisticsChart from "./StatisticsChart";
import Loading from "../../components/LoadingSpinner";

const availableServices = [
  "Floral Arrangement Services",
  "Audio-Visual Equipment Rental",
  "Entertainment Services",
  "Decor and Setup",
  "Event lighting Services",
];

function UserOverviewContent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const upcomingEvents = events
    .filter(
      (event) =>
        event.status === "APPROVED" && new Date(event.date) > new Date(),
    )
    .map((event) => {
      const daysLeft = Math.ceil(
        (new Date(event.date).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      );

      return {
        ...event,
        date: format(parseISO(event.date), "MMM dd yyyy"),
        daysLeft,
      };
    })
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 4);

  const countdownDetails = events
    .filter(
      (event) =>
        event.status === "APPROVED" && new Date(event.date) > new Date(),
    )
    .map((event) => {
      const daysLeft = Math.ceil(
        (new Date(event.date).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      );

      const percentagePassed = Math.min(100, Math.max(0, 100 - daysLeft * 10));

      return {
        ...event,
        date: format(parseISO(event.date), "MMM dd yyyy"),
        daysLeft,
        percentagePassed,
      };
    })
    .filter((event) => event.daysLeft <= 10) // Filter for events with exactly 10 days left
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 4);

  console.log(countdownDetails);
  // get all scheduled dates
  const scheduledDates = upcomingEvents.map((event) => new Date(event.date));

  // get all pending events
  const pendingEvents = events.filter((event) => event.status === "PENDING");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getAllEvents();
        const data = res.data;

        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <OverviewSection>
        <div className="rounded-lg border border-secondary-600 p-5">
          <h2 className="mb-3 flex items-center gap-3 text-2xl font-medium">
            Upcoming events{" "}
            <span className="text-lg font-light">
              ( {upcomingEvents.length} )
            </span>
          </h2>
          {upcomingEvents.length !== 0 ? (
            <div className="flex gap-3">
              {upcomingEvents.map((event) => (
                <Link
                  to={`/dashboard/events/${event.id}`}
                  className="w-full max-w-xs"
                  state={{ from: location.pathname }}
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
                            <p className="text-xs">
                              {event.daysLeft} days left
                            </p>
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
        </div>
      </OverviewSection>

      <OverviewSection>
        <div className="mt-5 flex gap-5">
          <div className="w-full max-w-96 rounded-lg border border-secondary-600 py-5 pl-5 pr-2">
            <h2 className="mb-3 flex items-center gap-3 text-2xl font-medium">
              Pending events{" "}
              <span className="text-lg font-light">
                ( {pendingEvents.length} )
              </span>
            </h2>
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
                        <Card className="w-full select-none border-secondary-600 bg-secondary-100 hover:cursor-default">
                          <CardHeader>
                            <CardTitle className="w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                              {event.title}
                            </CardTitle>
                            <CardDescription className="w-xs space-y-3 overflow-hidden text-ellipsis whitespace-nowrap font-normal">
                              <p className="flex items-center gap-1 text-secondary-900">
                                <ClockIcon />{" "}
                                {event?.date &&
                                  format(
                                    new Date(event.date),
                                    "EEE, MMM d, yyyy",
                                  )}
                              </p>
                              <p>This event is currently under review</p>
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
                <div className="italic text-secondary-800">
                  <p>No pending events!</p>
                  <p>Ready to create your next event?</p>
                </div>
              )}
            </ScrollArea>
          </div>

          <div className="text flex w-full gap-3 rounded-lg border border-secondary-600 p-5">
            <div className="w-full">
              <h2 className="mb-3 text-2xl font-medium">
                10 days Countdown{" "}
                <span className="text-lg font-light">
                  ( {countdownDetails.length} )
                </span>
              </h2>
              {countdownDetails.length > 0 ? (
                <div className="space-y-3 rounded-lg border border-secondary-600 bg-secondary-100 p-5">
                  {countdownDetails.map((event) => (
                    <Link
                      to={`/dashboard/events/${event.id}`}
                      className="block"
                      key={event.id}
                    >
                      <div className="flex justify-between">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-xs">{event.daysLeft} days left</p>
                      </div>
                      <div className="rounded-md border border-secondary-600 bg-secondary-200 text-center">
                        <div
                          className="rounded-md bg-primary-100 p-3 hover:bg-primary-200"
                          style={{ width: `${event.percentagePassed}%` }}
                        ></div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="max-w-96 italic text-secondary-800">
                  No countdown to show right now. Add an event soon to start the
                  10-day countdown!
                </p>
              )}
            </div>
            <div className="w-full">
              <h2 className="mb-3 text-2xl font-medium">Statistics</h2>
              {events.length > 0 ? (
                <StatisticsChart events={events} />
              ) : (
                <p className="my-auto max-w-96 italic text-secondary-800">
                  We don't have any data to show statistics yet. Book an event
                  to see detailed stats!
                </p>
              )}
            </div>
          </div>

          <div className="w-full max-w-72 rounded-lg border border-secondary-600 p-5">
            <h2 className="mb-3 text-2xl font-medium">Calendar</h2>
            <CalendarPreview
              key={scheduledDates.length}
              mode="multiple"
              selected={scheduledDates}
              onSelect={() => {}} // disable date selection
              className="mx-auto rounded-md border bg-secondary-100 shadow"
            />
          </div>
        </div>
      </OverviewSection>

      {/* <OverviewSection>
        <div className="text w-full rounded-lg border border-secondary-600 bg-secondary-300 p-5">
          <h2 className="mb-3 text-2xl font-medium">Available services</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {availableServices.map((service) => (
              <div className="flex aspect-square flex-col items-center justify-center rounded-lg border border-secondary-600 bg-secondary-100 p-3 text-center">
                <Flower />
                <p className="font-medium">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </OverviewSection> */}
    </>
  );
}

export default UserOverviewContent;
