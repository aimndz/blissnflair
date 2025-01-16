import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../services/eventApi";
import { Event } from "../../types/event";
import EventCard from "./EventCard";
import NoEventsMessage from "./NoEventsMessage";
import AddEventCard from "./AddEventCard";
import Combobox from "../../components/ui/combobox";
import Loading from "../../components/LoadingSpinner";
import { getRandomDegree } from "../../utils/randomGradient";

const eventStatus = [
  {
    value: "approved",
    label: "Approved",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

function UserEventListContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const filter = searchParams.get("filter") || "approved";

  const currentFilterLabel =
    eventStatus.find((status) => status.value === filter)?.label || "Approved";

  const filteredEvents = events
    .filter((event) => {
      return (
        event.deletedAt === null ||
        event.deletedAt === "0000-01-01T00:00:00.000Z"
      );
    })
    .filter((event) => {
      switch (filter) {
        case "pending":
          return event.status === "PENDING";
        case "approved":
          return event.status === "APPROVED";
        case "cancelled":
          return event.status === "CANCELLED";
        case "completed":
          return event.status === "COMPLETED";
        case "rejected":
          return event.status === "REJECTED";
        default:
          return event.status === "APPROVED";
      }
    });

  useEffect(() => {
    if (!searchParams.get("filter")) {
      setSearchParams({ filter: "approved" }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

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

  const handleFilterChange = (value: string) => {
    setSearchParams({ filter: value });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-col">
        <p className="text-sm font-medium">Event status</p>
        <Combobox
          items={eventStatus}
          label=""
          value={filter}
          onChange={handleFilterChange}
        />
        {/* <span className="flex aspect-square h-8 items-center justify-center rounded-full border border-secondary-600 bg-secondary-100 text-xl font-medium">
          {filteredEvents.length}
        </span> */}
      </div>
      {filteredEvents.length > 0 ? (
        <div className="mt-3 grid grid-cols-1 gap-3 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1400px]:grid-cols-6">
          {filteredEvents.map((event) => {
            const randomDeg = getRandomDegree();

            return (
              <EventCard key={event.id} event={event} randomDeg={randomDeg} />
            );
          })}
          <AddEventCard />
        </div>
      ) : (
        <NoEventsMessage message={`No ${filter} events`} />
      )}
    </div>
  );
}

export default UserEventListContent;
