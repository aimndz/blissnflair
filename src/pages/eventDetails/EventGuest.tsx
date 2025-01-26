import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../services/eventApi";
import {
  Box,
  Calendar,
  CheckIcon,
  Image,
  MapPin,
  TriangleAlert,
  User2,
  Utensils,
  XIcon,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { Event as EventProps } from "../../types/event";
import Countdown from "./Countdown";
import eventServices from "../create/spaceDetails";
import Loading from "../../components/LoadingSpinner";
import { getCateringByEventId } from "../../services/cateringSelectionApi";
import { Avatar } from "../../components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Separator } from "../../components/ui/separator";
import { AddOn, CateringResponseData, MainDish } from "../../types/catering";
import { useUser } from "../../hooks/use-user";
import Logo from "../../components/icons/Logo";

function EventGuest() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventProps | null>(null);
  const [catering, setCatering] = useState<CateringResponseData | null>(null);

  const getEventServiceByValue = (value: string) => {
    return eventServices.find((service) => service.value === value);
  };

  const eventSpace = getEventServiceByValue(event?.venue || "");

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        if (id) {
          const [eventResponse, cateringResponse] = await Promise.all([
            getEventById(id),
            getCateringByEventId(id),
          ]);

          setEvent(eventResponse.data);
          setCatering(cateringResponse.data);
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
    <div className="mx-auto mb-10 min-h-[calc(100vh-80px)] max-w-6xl pt-10">
      <div>
        <Logo className="mx-auto h-14 w-14" />
        <p className="mt-3 text-center uppercase">
          <p className="text-3xl font-bold leading-5">Bliss & Flair</p>
          <span className="text-sm font-semibold">Commercial Building</span>
        </p>
      </div>

      <div className="mt-10">
        {event?.status === "APPROVED"
          ? event?.startTime && (
              <Countdown
                eventStartTime={event.startTime}
                eventEndTime={event.endTime}
              />
            )
          : null}

        {event?.status === "PENDING" && (
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-orange-200 p-3 text-xl font-bold text-orange-500">
            <TriangleAlert size={20} />{" "}
            <span>Event is currently under review</span>
          </div>
        )}

        {event?.status === "COMPLETED" && (
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-blue-200 p-3 text-xl font-bold text-blue-500">
            <CheckIcon size={20} /> <span>Event Successfully Completed</span>
          </div>
        )}

        {event?.status === "REJECTED" && (
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-red-200 p-3 text-xl font-bold text-red-500">
            <XIcon size={20} /> <span>Event has been rejected</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div>
          <div className="col-span-1 flex aspect-square flex-col items-center justify-center rounded-lg border border-solid border-secondary-600 bg-secondary-300">
            {event?.imageUrl ? (
              <img
                src={event?.imageUrl}
                alt="Event Image"
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <Image className="text-secondary-100" size={40} />
            )}
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex justify-between">
            <div className="gap-3">
              <span className="text-xs text-secondary-800">
                {event?.category}
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-bold">{event?.title}</h2>
          <div className="mt-3 flex flex-wrap items-center gap-3 font-semibold">
            <Calendar className="text-secondary-800" size={20} />
            <span className="">
              {event?.date
                ? format(new Date(event.date), "MMM d, yyyy")
                : "Date not available"}
            </span>
            <span>
              {event?.startTime && format(parseISO(event.startTime), "h:mm a")}{" "}
              - {event?.endTime && format(parseISO(event.endTime), "h:mm a")}
            </span>
            {(event?.additionalHours ?? 0) > 0 && (
              <span className="text-xs font-normal text-secondary-800">
                ( {event?.additionalHours}{" "}
                {event?.additionalHours === 1 ? "hr" : "hrs"} added )
              </span>
            )}
          </div>
          <p className="flex items-center gap-3">
            <MapPin className="text-secondary-800" size={20} />
            <span>{eventSpace?.name}</span>
          </p>
          <div className="mt-3 flex items-center gap-1 text-sm">
            <Avatar className="flex h-8 w-8 items-center justify-center bg-secondary-600/50 text-xs">
              {event?.organizer?.trim() === ""
                ? "Y"
                : event?.organizer?.charAt(0).toUpperCase()}
            </Avatar>

            <p>
              Organized by{" "}
              <span className="font-semibold">
                {user?.role !== "ADMIN" && event?.organizer?.trim() === ""
                  ? "You"
                  : event?.organizer ||
                    `${event?.user.firstName} ${event?.user.lastName}`}
              </span>
            </p>
          </div>
          <div className="mt-8">
            <h3 className="text-sm font-semibold">Description</h3>
            <p>{event?.description}</p>
          </div>
          <div className="mt-8">
            {event?.additionalNotes && event.additionalNotes.trim() !== "" && (
              <div>
                <h3 className="text-sm font-semibold">Additional note</h3>
                <p>{event?.additionalNotes}</p>
              </div>
            )}
          </div>
          {catering && (
            <Accordion
              type="single"
              collapsible
              className="mt-8 rounded-lg border border-secondary-600 bg-secondary-300"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-5 py-3">
                  <h3 className="flex items-center gap-3 text-lg font-bold">
                    <Utensils size={20} />
                    <span>Catering</span>
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="px-5">
                  <Separator className="mb-3" />
                  <div className="space-y-3 rounded-lg pb-3">
                    <div className="flex items-center gap-3">
                      <Box className="text-secondary-800" size={15} />
                      <h4 className="text-sm font-semibold">Package </h4>
                      <p>{catering?.mainDishPackage?.price} / pax</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <User2 className="text-secondary-800" size={15} />
                      <h4 className="text-sm font-semibold">Expected Pax </h4>
                      <p>{catering?.expectedPax} pax</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Main Dishes</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {catering?.mainDishes
                          .filter((dish: MainDish) => dish.dishType === "MAIN") // Filter for dishes of type "MAIN"
                          .map((dish: MainDish) => (
                            <div
                              key={dish.id}
                              className="dish-name rounded-lg border border-solid bg-secondary-100/50 p-2 text-center text-xs"
                            >
                              <p className="font-semibold">{dish.name}</p>
                              <p className="text-xs text-secondary-800">
                                ( {dish.category} )
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Others</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {catering?.mainDishes
                          .filter(
                            (dish: MainDish) => dish.dishType === "OTHERS",
                          ) // Filter for dishes of type "MAIN"
                          .map((dish: MainDish) => (
                            <div
                              key={dish.id}
                              className="dish-name rounded-lg border border-solid bg-secondary-100/50 p-2 text-center text-xs"
                            >
                              <p className="font-semibold">{dish.name}</p>
                              <p className="text-xs text-secondary-800">
                                ( {dish.category} )
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">
                        Picka Pick-A-Snack Corner
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {catering?.pickASnackCorner.map((dish: MainDish) => (
                          <div
                            key={dish.id}
                            className="dish-name rounded-lg border border-solid bg-secondary-100/50 p-2 text-center text-xs"
                          >
                            <p className="font-semibold">{dish.name}</p>
                            <p className="text-xs text-secondary-800">
                              ( {dish.category} )
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {catering?.addOns.filter(
                      (dish: AddOn) => dish.category === "Food Carts",
                    ).length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold">Food Carts</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {catering?.addOns
                            .filter(
                              (dish: AddOn) => dish.category === "Food Carts",
                            ) // Filter for dishes of type "MAIN"
                            .map((dish: AddOn) => (
                              <div
                                key={dish.id}
                                className="dish-name rounded-lg border border-solid bg-secondary-100/50 p-2 text-center text-xs"
                              >
                                <p className="font-semibold">{dish.name}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                    {catering?.addOns.filter(
                      (dish: AddOn) => dish.category === "Technicals",
                    ).length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold">Technicals</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {catering?.addOns
                            .filter(
                              (dish: AddOn) => dish.category === "Technicals",
                            ) // Filter for dishes of type "MAIN"
                            .map((dish: AddOn) => (
                              <div
                                key={dish.id}
                                className="dish-name rounded-lg border border-solid bg-secondary-100/50 p-2 text-center text-xs"
                              >
                                <p className="font-semibold">{dish.name}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventGuest;
