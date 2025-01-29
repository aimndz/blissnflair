import { useEffect, useState } from "react";
import AnalyticsAreaChart from "./AnalyticsAreaChart";
import { getAllEvents } from "../../services/eventApi";
import { getAllCatering } from "../../services/cateringSelectionApi";
import { getAllAccounts } from "../../services/accountApi";
import { Catering } from "../../types/catering";
import { Event } from "../../types/event";
import { Account } from "../../types/account";
import AnalyticsHeader from "./AnalyticsHeader";
import { AnalyticsPieChart } from "./AnalyticsPieChart";

function Analytics() {
  const [events, setEvents] = useState<Event[]>([]);
  const [caterings, setCaterings] = useState<Catering[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const existingEvents = events.filter((event) => {
    return (
      event.deletedAt === null || event.deletedAt === "0000-01-01T00:00:00.000Z"
    );
  });

  const eventsScheduleDates = existingEvents.map((event) => {
    const eventDate = new Date(event.startTime);
    return eventDate.toISOString();
  });

  const eventsCreatedDates = existingEvents.map((event) => {
    const eventDate = new Date(event.createdAt);
    return eventDate.toISOString();
  });

  const cateringsScheduleDate = caterings.map((catering) => {
    const eventDate = new Date(catering.event.date);
    return eventDate.toISOString();
  });

  const cateringsCreatedDates = caterings.map((catering) => {
    const eventDate = new Date(catering.event.createdAt);
    return eventDate.toISOString();
  });

  const accountsDates = accounts
    .map((account) => {
      if (account.createdAt) {
        const eventDate = new Date(account.createdAt);
        return eventDate.toISOString();
      }
      return "";
    })
    .filter((date) => date !== "");

  const eventsStatusData = existingEvents.map((event) => {
    return event.status;
  });

  const eventsVenueData = existingEvents.map((event) => {
    return event.venue;
  });

  const statusColors = {
    PENDING: "#FFC107",
    APPROVED: "#4CAF50",
    REJECTED: "#F44336",
    CANCELLED: "#9E9E9E",
    COMPLETED: "#03A9F4",
  };

  const venueColors = {
    "lounge hall": "#FFC107",
    "function hall": "#4CAF50",
    "al fresco": "#F44336",
  };

  useEffect(() => {
    (async () => {
      const [eventRes, cateringRes, accountRes] = await Promise.all([
        getAllEvents(),
        getAllCatering(),
        getAllAccounts(),
      ]);

      setEvents(eventRes.data);
      setCaterings(cateringRes.data);
      setAccounts(accountRes.data);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-3">
      <AnalyticsHeader
        events={existingEvents}
        caterings={caterings}
        accounts={accounts}
      />
      <div className="flex gap-3">
        <AnalyticsAreaChart
          className="w-full"
          title="Events Scheduled"
          dates={eventsScheduleDates}
        />
        <AnalyticsAreaChart
          className="w-full"
          title="Events Creation"
          dates={eventsCreatedDates}
        />
      </div>
      <div className="flex gap-3">
        <AnalyticsAreaChart
          className="w-full"
          title="Caterings Scheduled"
          dates={cateringsScheduleDate}
        />
        <AnalyticsAreaChart
          className="w-full"
          title="Caterings Creation"
          dates={cateringsCreatedDates}
        />
      </div>
      <div className="flex gap-3">
        <AnalyticsPieChart
          className="w-full"
          title="Event Status Overview"
          label="Total Events"
          data={eventsStatusData}
          colorMapping={statusColors}
          dataKey="status"
        />
        <AnalyticsPieChart
          className="w-full"
          title="Event Venue Overview"
          label="Total Events"
          data={eventsVenueData}
          colorMapping={venueColors}
          dataKey="venue"
        />
      </div>
      <AnalyticsAreaChart
        className="w-full"
        title="Accounts Registered"
        dates={accountsDates}
      />
    </div>
  );
}

export default Analytics;
