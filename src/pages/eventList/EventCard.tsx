import { format, parseISO } from "date-fns";
import { Event } from "../../types/event";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
  randomDeg: string;
}

function EventCard({ event, randomDeg }: EventCardProps) {
  console.log(event);
  return (
    <Link
      to={`/dashboard/events/${event.id}`}
      state={{ from: location.pathname }}
    >
      <div className="border-blue border-pr rounded-lg border bg-secondary-300 hover:bg-secondary-600/50">
        <div
          className={`relative aspect-square w-full rounded-t-lg ${event.imageUrl ? "" : `${randomDeg} from-primary-100 to-green-600`} `}
        >
          {event.imageUrl && (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full rounded-t-lg object-cover"
            />
          )}
          <div className="absolute left-3 top-3 flex items-center justify-center rounded-sm bg-black/40 p-1 text-xs text-secondary-100">
            <p>{event.status}</p>
          </div>
        </div>
        <div className="p-3">
          <h3 className="mb-3 overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
            {event.title}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-xs">
            <MapPin className="text-secondary-800" size={15} />
            <span>
              {event?.venue
                ? event.venue
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                : ""}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-1 text-xs">
            <Calendar className="-mt-2 text-secondary-800" size={15} />
            <div className="flex flex-col leading-none">
              <span className="whitespace-nowrap">
                {format(new Date(event.date), " MMM d yyyy")}
              </span>
              <span className="whitespace-nowrap">
                {format(parseISO(event.startTime), "h:mm a")} -{" "}
                {format(parseISO(event.endTime), "h:mm a")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
