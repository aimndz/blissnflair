import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getEventById, updateEvent } from "../../services/eventApi";
import {
  ArrowLeft,
  Box,
  Calendar,
  Check,
  Copy,
  Edit,
  Image,
  MapPin,
  TriangleAlert,
  User2,
  Utensils,
  X,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { Event as EventProps } from "../../types/event";
import { Button } from "../../components/ui/button";
import Countdown from "./Countdown";
import eventServices from "../create/spaceDetails";
import { useRoutePrefix } from "../../hooks/useRoutePrefix";
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
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "../../components/ui/dialog";
import EventDialogApproval from "../../components/EventDialogApproval";
import { useUser } from "../../hooks/use-user";

function Event() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventProps | null>(null);
  const [catering, setCatering] = useState<CateringResponseData | null>(null);

  const getEventServiceByValue = (value: string) => {
    return eventServices.find((service) => service.value === value);
  };

  const handleGoBack = () => {
    navigate(-1);
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

  const handleUpdateEvent = async (id: string, updatedEvent: EventProps) => {
    try {
      const response = await updateEvent(id, updatedEvent);
      if (response.success) {
        setEvent(updatedEvent);
        toast.success("Event updated successfully");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mb-10 max-w-6xl">
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
          {event?.status === "PENDING" && user?.role === "ADMIN" ? (
            <div className="mt-3 flex justify-center gap-3">
              <Dialog>
                <DialogTrigger>
                  <Button className="w-full rounded-lg bg-primary-100 text-secondary-100 hover:bg-primary-200">
                    <Check size={20} />
                    <p>Approve</p>
                  </Button>
                </DialogTrigger>
                <EventDialogApproval
                  status="APPROVED"
                  event={event!}
                  onUpdateEvent={async () => {
                    if (event?.id) {
                      await handleUpdateEvent(event.id, {
                        ...event,
                        status: "APPROVED",
                      });
                    }
                  }}
                />
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <Button className="w-full rounded-lg border border-red-500 bg-transparent text-red-500 hover:bg-red-200 hover:text-red-500">
                    <X size={20} />
                    <p>Reject</p>
                  </Button>
                </DialogTrigger>
                <EventDialogApproval
                  status="REJECTED"
                  event={event!}
                  onUpdateEvent={async () => {
                    if (event?.id) {
                      await handleUpdateEvent(event.id, {
                        ...event,
                        status: "REJECTED",
                      });
                    }
                  }}
                />
              </Dialog>
            </div>
          ) : null}
        </div>
        <div className="col-span-2">
          <div className="flex justify-between">
            <div className="gap-3">
              <span className="text-xs text-secondary-800">
                {event?.category}
              </span>
            </div>
            <div className="flex justify-end gap-5 text-secondary-800">
              <Button className="flex gap-1 rounded-lg bg-transparent p-3 shadow-none hover:bg-secondary-300">
                <Edit className="text-secondary-800" size={15} />
                <p className="text-xs font-semibold text-secondary-800">Edit</p>
              </Button>
              <Button className="flex gap-1 rounded-lg bg-transparent p-3 shadow-none hover:bg-secondary-300">
                <Copy className="text-secondary-800" size={15} />
                <p className="text-xs font-semibold text-secondary-800">
                  Copy link
                </p>
              </Button>
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

export default Event;
