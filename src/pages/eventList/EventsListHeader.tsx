import { Separator } from "../../components/ui/separator";
import { Event } from "../../types/event";

function EventsListHeader({ events }: { events: Event[] }) {
  const eventsThisMonth = events.filter((event) => {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return (
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const pendingEvents = events.filter((event) => event.status === "PENDING");
  const approvedEvents = events.filter((event) => event.status === "APPROVED");
  const completedEvents = events.filter(
    (event) => event.status === "COMPLETED",
  );
  const rejectedEvents = events.filter((event) => event.status === "REJECTED");
  const cancelledEvents = events.filter(
    (event) => event.status === "CANCELLED",
  );

  return (
    <div className="mb-3 rounded-lg border border-secondary-600 bg-secondary-100 px-4 py-6 shadow-sm">
      <div className="flex">
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Total Events
          </h3>
          <p className="text-2xl font-semibold">{events?.length}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Pending Events
          </h3>
          <p className="text-2xl font-semibold">{pendingEvents.length}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Approved Events
          </h3>
          <p className="text-2xl font-semibold">{approvedEvents?.length}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Completed Events
          </h3>
          <p className="text-2xl font-semibold">{completedEvents?.length}</p>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex">
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Rejected Events
          </h3>
          <p className="text-2xl font-semibold">{rejectedEvents?.length}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Cancelled Events
          </h3>
          <p className="text-2xl font-semibold">{cancelledEvents?.length}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Events this month
          </h3>
          <p className="text-2xl font-semibold">{eventsThisMonth?.length}</p>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="w-full pl-4">
          <h3 className="text-xs font-semibold uppercase text-secondary-800">
            Approved Events
          </h3>
          <p className="text-2xl font-semibold">{approvedEvents?.length}</p>
        </div>
      </div>
    </div>
  );
}

export default EventsListHeader;
