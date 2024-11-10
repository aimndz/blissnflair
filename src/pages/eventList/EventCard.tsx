import { format, parseISO } from "date-fns";
import { Event } from "../../types/event";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  return (
    <Link
      to={`/dashboard/events/${event.id}`}
      state={{ from: location.pathname }}
    >
      <div className="rounded-lg bg-secondary-300">
        <div className="h-28 rounded-t-lg bg-[linear-gradient(45deg,_#43A9C6,_#61DDFF)]"></div>
        <div className="p-3">
          <h3 className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
            {event.title}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
            <Calendar className="text-secondary-800" size={20} />
            <span className="whitespace-nowrap">
              {format(new Date(event.date), "EEE, MMM d, yyyy")}
            </span>
            <span className="whitespace-nowrap">
              {format(parseISO(event.startTime), "h:mm a")} -{" "}
              {format(parseISO(event.endTime), "h:mm a")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
