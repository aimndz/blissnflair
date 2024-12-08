import { ArrowLeft, Calendar, Image, MapPin } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { createEvent } from "../../services/eventApi";
import { format, parseISO } from "date-fns";
import eventServices from "../create/spaceDetails";
import { useRoutePrefix } from "../../hooks/useRoutePrefix";

function Preview() {
  const location = useLocation();
  const { event } = location.state || {};
  const navigate = useNavigate();
  const routePrefix = useRoutePrefix();

  const getEventServiceByValue = (value: string) => {
    return eventServices.find((service) => service.value === value);
  };

  const handleGoBack = () => {
    navigate(`/${routePrefix}/create/catering`, { state: { event } });
  };

  const eventSpace = getEventServiceByValue(event.spaceName);

  const handleEventSubmit = async () => {
    // Set default values for missing properties
    const eventWithDefaults = {
      ...event,
      expectedPax: event.expectedPax || 50,
      hasInHouseCatering: event.hasInHouseCatering ?? false,
      additionalHours: event.additionalHours || 0,
      additionalServices: event.additionalServices || [],
    };

    const res = await createEvent(eventWithDefaults);

    if (res.success) {
      // TODO: Show success message
      console.log("Event created successfully");
      navigate(`/${routePrefix}`);
    } else {
      console.error("Failed to create event");
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Button
        className="bg-transparent px-0 text-secondary-900 shadow-none hover:bg-transparent hover:text-secondary-800"
        onClick={handleGoBack}
      >
        <ArrowLeft />
        <span>Back</span>
      </Button>
      <div className="flex h-60 w-full items-center justify-center rounded-lg border border-solid border-secondary-600 bg-secondary-300">
        <Image className="text-secondary-100" size={40} />
      </div>
      <div className="mt-5 gap-3">
        <span className="text-xs text-secondary-800">{event.category}</span>
        <h2 className="text-2xl font-bold">{event.title}</h2>{" "}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Calendar className="text-secondary-800" size={20} />
        <span className="mr-10">
          {format(new Date(event.date), "EEE, MMM d, yyyy")}
        </span>
        <span>
          {format(parseISO(event.startTime), "h:mm a")} -{" "}
          {format(parseISO(event.endTime), "h:mm a")}
        </span>
      </div>
      <p className="mt-3 flex gap-3">
        <MapPin className="text-secondary-800" size={20} />
        <span>{eventSpace?.name}</span>
      </p>
      {/* <div className="mt-8">
        <h3 className="font-medium">Additional Services</h3>
        <div className="flex flex-wrap gap-3">
          {event.additionalServices.map((service: string) => (
            <span
              key={service}
              className="rounded-lg border border-solid border-secondary-600 bg-secondary-300 px-3 py-1"
            >
              {service}
            </span>
          ))}
        </div>
      </div> */}
      <div className="mt-8">
        <h3 className="font-medium">Description:</h3>
        <p>{event.description}</p>
      </div>
      <div className="mt-8">
        {event.additionalNotes.trim() !== "" && (
          <div>
            <h3 className="font-medium">Additional note:</h3>
            <p>{event.additionalNotes}</p>
          </div>
        )}
      </div>
      <Button
        onClick={handleEventSubmit}
        className="mt-8 rounded-full bg-primary-100 px-10 text-secondary-900 hover:bg-primary-200"
      >
        Confirm
      </Button>
    </div>
  );
}

export default Preview;
