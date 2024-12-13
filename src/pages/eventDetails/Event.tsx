import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getEventById } from "../../services/eventApi";
import {
  ArrowLeft,
  Calendar,
  Image,
  MapPin,
  TriangleAlert,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { Event as EventProps } from "../../types/event";
import { Button } from "../../components/ui/button";
import Countdown from "./Countdown";
import eventServices from "../create/spaceDetails";
import { useRoutePrefix } from "../../hooks/useRoutePrefix";
import Loading from "../../components/LoadingSpinner";

function Event() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const routePrefix = useRoutePrefix();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [event, setEvent] = useState<EventProps | null>(null);

  const getEventServiceByValue = (value: string) => {
    return eventServices.find((service) => service.value === value);
  };

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from); // Go back to the originating page
    } else {
      navigate(`/${routePrefix}/overview`); // Default if no previous path is stored
    }
  };

  // console.log(event);

  const eventSpace = getEventServiceByValue(event?.venue || "");
  // console.log(event);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (id) {
          const res = await getEventById(id);
          const data = res.data;
          setEvent(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Button
        className="bg-transparent px-0 text-secondary-900 shadow-none hover:bg-transparent hover:text-secondary-800"
        onClick={handleGoBack}
      >
        <ArrowLeft />
        <span>Back</span>
      </Button>
      {event?.status === "APPROVED" ? (
        event?.startTime && (
          <Countdown
            eventStartTime={event.startTime}
            eventEndTime={event.endTime}
          />
        )
      ) : (
        <div className="mb-3 flex items-center gap-3 text-xl font-bold text-orange-500">
          <TriangleAlert size={20} />{" "}
          <span>Event is currently under review</span>
        </div>
      )}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="col-span-1 flex aspect-square items-center justify-center rounded-lg border border-solid border-secondary-600 bg-secondary-300">
          <Image className="text-secondary-100" size={40} />
        </div>
        <div className="col-span-2">
          <div>
            <span className="text-xs text-secondary-800">
              {event?.category}
            </span>
            <h2 className="text-2xl font-bold">{event?.title}</h2>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Calendar className="text-secondary-800" size={20} />
            <span>
              {event?.date && format(new Date(event.date), "EEE, MMM d, yyyy")}
            </span>
            <span>
              {event?.startTime && format(parseISO(event.startTime), "h:mm a")}{" "}
              - {event?.endTime && format(parseISO(event.endTime), "h:mm a")}
            </span>
          </div>
          <p className="mt-3 flex gap-3">
            <MapPin className="text-secondary-800" size={20} />
            <span>{eventSpace?.name}</span>
          </p>
          {event?.additionalServices && event.additionalServices.length > 0 && (
            <div className="mt-8">
              <h3 className="font-medium">Additional Services:</h3>
              <div className="flex flex-wrap gap-3">
                {event?.additionalServices?.map((service: string) => (
                  <span
                    key={service}
                    className="rounded-lg border border-solid border-secondary-600 bg-secondary-300 px-3 py-1"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-8">
            <h3 className="font-medium">Description:</h3>
            <p>{event?.description}</p>
          </div>
          <div className="mt-8">
            {event?.additionalNotes?.trim() !== "" && (
              <div>
                <h3 className="font-medium">Note:</h3>
                <p>{event?.additionalNotes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
