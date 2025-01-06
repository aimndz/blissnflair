import { Calendar, CheckIcon, XIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import OverviewSection from "./OverviewSection";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Event } from "../../types/event";
import { format, parseISO } from "date-fns";
import { getAllEvents } from "../../services/eventApi";
import { Profile } from "iconsax-react";
import SummaryCard from "./SummaryCard";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import { Button } from "../../components/ui/button";
import StatisticsChart from "./StatisticsChart";
import { Calendar as CalendarPreview } from "../../components/ui/calendar";
import { Separator } from "../../components/ui/separator";
import { getAllAccounts } from "../../services/accountApi";
import { getPast7DaysAccountData, getPast7DaysData } from "./chartData";
import { useRoutePrefix } from "../../hooks/useRoutePrefix";
import Loading from "../../components/LoadingSpinner";

function AdminOverviewContent() {
  const routePrefix = useRoutePrefix();
  const [events, setEvents] = useState<Event[]>([]);
  const [account, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to manage the fetching process

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

  const scheduledDates = upcomingEvents.map((event) => new Date(event.date));

  // get all pending events
  const pendingEvents = events
    .filter(
      (event) =>
        event.status === "PENDING" && new Date(event.date) > new Date(),
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
    });

  const totalEventsChart = getPast7DaysData(events);
  const totalAccountsChart = getPast7DaysAccountData(account);
  const activeEventsChart = getPast7DaysData(
    events.filter((event) => event.status === "APPROVED"),
  );
  const pendingEventsChart = getPast7DaysData(
    events.filter((event) => event.status === "PENDING"),
  );

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [events, accounts] = await Promise.all([
          getAllEvents(),
          getAllAccounts(),
        ]);

        const eventsData = events.data;
        const accountsData = accounts.data;

        setEvents(eventsData);
        setAccounts(accountsData);
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
        <h2 className="mb-3 flex items-center gap-3 text-2xl font-medium">
          Summary
        </h2>

        <div className="grid grid-cols-4 gap-3">
          <SummaryCard
            title="No. of Active Events"
            value={events.filter((event) => event.status === "APPROVED").length}
            chartData={activeEventsChart}
          />

          <SummaryCard
            title="No. of Pending Events"
            value={events.filter((event) => event.status === "PENDING").length}
            chartData={pendingEventsChart}
          />
          <SummaryCard
            title="Total Registered Accounts"
            value={account.length}
            chartData={totalAccountsChart}
            dataKey="accounts"
          />
          <SummaryCard
            title="Total Events"
            value={events.length}
            chartData={totalEventsChart}
          />
        </div>
      </OverviewSection>

      <Separator className="my-5" />

      <OverviewSection>
        <div>
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
                  to={`/admin/dashboard/events/${event.id}`}
                  className="w-full max-w-xs"
                  state={{ from: location.pathname }}
                  replace
                  key={event.id}
                >
                  <Card>
                    <CardHeader className="px-5 pb-3 text-xl font-semibold">
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
                      <div className="mt-3 text-xs">
                        <p className="font-medium">Organized by:</p>
                        <div className="flex items-center gap-1">
                          <div className="flex aspect-square h-7 items-center justify-center rounded-full bg-secondary-200">
                            <Profile
                              size={"20px"}
                              className="text-secondary-700"
                            />
                          </div>
                          <p className="font-semibold">
                            {event.organizer ||
                              `${event.user.firstName} ${event.user.firstName}  `}
                          </p>
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

      <Separator className="my-5" />

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
                        <Card>
                          <CardHeader className="px-5 pb-3 text-xl font-semibold">
                            <CardTitle className="truncate">
                              {event.title}
                            </CardTitle>
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
                            <div className="mt-3 flex items-center justify-between text-xs">
                              <div>
                                <p className="font-medium">Booked by:</p>
                                <div className="flex items-center gap-1">
                                  <div className="flex aspect-square h-7 items-center justify-center rounded-full bg-secondary-200">
                                    <Profile
                                      size={"20px"}
                                      className="text-secondary-700"
                                    />
                                  </div>
                                  <p className="font-semibold">
                                    Amiel Ian Mendoza
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <div className="flex aspect-square h-7 cursor-pointer items-center justify-center rounded-full bg-red-500 transition-all delay-75 hover:bg-red-600">
                                  <XIcon size={"15px"} />
                                </div>
                                <div className="flex aspect-square h-7 cursor-pointer items-center justify-center rounded-full bg-primary-100 transition-all delay-75 hover:bg-primary-200">
                                  <CheckIcon size={"15px"} />
                                </div>
                              </div>
                            </div>
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
                      to={`/${routePrefix}/events/${event.id}`}
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
    </>
  );
}

export default AdminOverviewContent;
