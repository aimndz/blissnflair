import {
  ArrowLeft,
  Box,
  Calendar,
  Image,
  MapPin,
  User2,
  Utensils,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { createEvent } from "../../services/eventApi";
import { format, parseISO } from "date-fns";
import eventServices from "../create/spaceDetails";
import { useRoutePrefix } from "../../hooks/useRoutePrefix";
import { useEffect, useState } from "react";
import { createCatering } from "../../services/cateringSelectionApi";
import { toast } from "sonner";
import { AddOn, MainDish, SnackCorner } from "../../types/catering";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Avatar } from "../../components/ui/avatar";
import { Separator } from "../../components/ui/separator";

function Preview() {
  const location = useLocation();
  const { event, catering } = location.state || {};
  const navigate = useNavigate();
  const routePrefix = useRoutePrefix();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  let formattedCatering = null;
  let cateringData = null;

  if (catering?.isInternalCatering) {
    formattedCatering = {
      expectedPax: catering.expectedPax,
      totalAmount: catering.totalAmount,
      numberOfMainDishes: catering.numberOfMainDishes,
      eventId: "",
      package: catering.selectedPackage,
      mainDishes: [
        ...catering.selectedDishes,
        ...catering.drinks,
        ...catering.desserts,
        ...catering.pastas,
      ],
      pickASnackCorner: [
        ...catering.sandwiches,
        ...catering.fruits,
        ...catering.salad,
      ],
      addOns: [...catering.foodCarts, ...catering.technicals],
    };

    cateringData = {
      expectedPax: catering.expectedPax,
      totalAmount: catering.totalAmount,
      numberOfMainDishes: catering.numberOfMainDishes,
      eventId: "",
      packageId: catering.selectedPackage.id,
      mainDishes: [
        ...catering.selectedDishes,
        ...catering.drinks,
        ...catering.desserts,
        ...catering.pastas,
      ].map((dish: MainDish) => dish.id),
      pickASnackCorner: [
        ...catering.sandwiches,
        ...catering.fruits,
        ...catering.salad,
      ].map((snack: SnackCorner) => snack.id),
      addOns: [...catering.foodCarts, ...catering.technicals].map(
        (addOn: AddOn) => addOn.id,
      ),
    };
  }

  useEffect(() => {
    if (event?.eventImage instanceof File) {
      const objectUrl = URL.createObjectURL(event.eventImage);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof event?.eventImage === "string") {
      setImagePreview(event.eventImage);
    }
  }, [event?.eventImage]);

  const getEventServiceByValue = (value: string) => {
    return eventServices.find((service) => service.value === value);
  };

  const handleGoBack = () => {
    navigate(`/${routePrefix}/create/catering`, { state: { event, catering } });
  };

  const eventSpace = getEventServiceByValue(event.spaceName);

  const handleEventSubmit = async () => {
    const { eventImage, ...eventInfo } = event;

    const formData = new FormData();

    try {
      Object.keys(eventInfo).forEach((key) => {
        const value = eventInfo[key];

        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(key, item);
          });
        } else if (typeof value === "boolean") {
          formData.append(key, String(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      if (eventImage) {
        formData.append("eventImage", eventImage);
      }

      const eventRes = await createEvent(formData);

      if (eventRes.success) {
        if (cateringData) {
          cateringData.eventId = eventRes.data.event.id;
          const cateringRes = await createCatering(cateringData);
          if (!cateringRes.success) {
            console.error("Failed to create catering");
            return;
          }
        }

        toast.success("Event created successfully");
        navigate(`/${routePrefix}`);
      } else {
        console.error("Failed to create event");
      }
    } catch (error) {
      console.error("An error occurred during submission:", error);
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
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="col-span-1 flex aspect-square items-center justify-center rounded-lg border border-solid border-secondary-600 bg-secondary-300">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Event Image"
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <Image className="text-secondary-100" size={40} />
          )}
        </div>
        <div className="col-span-2">
          <div className="mt-5 gap-3">
            <span className="text-xs text-secondary-800">{event.category}</span>
            <h2 className="text-2xl font-bold">{event.title}</h2>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 font-semibold">
            <Calendar className="text-secondary-800" size={20} />
            <span className="">
              {format(new Date(event.date), "MMM d, yyyy")}
            </span>
            <span>
              {format(parseISO(event.startTime), "h:mm a")} -{" "}
              {format(parseISO(event.endTime), "h:mm a")}
            </span>
            {event.additionalHours > 0 && (
              <span className="text-xs font-normal text-secondary-800">
                ( {event.additionalHours}{" "}
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
              {event.organizer.trim() === ""
                ? "Y"
                : event.organizer.charAt(0).toUpperCase()}
            </Avatar>

            <p>
              Organized by{" "}
              <span className="font-semibold">
                {event.organizer.trim() === "" ? "You" : event.organizer}
              </span>
            </p>
          </div>
          <div className="mt-8">
            <h3 className="text-sm font-semibold">Description</h3>
            <p>{event.description}</p>
          </div>
          <div className="mt-8">
            {event.additionalNotes.trim() !== "" && (
              <div>
                <h3 className="text-sm font-semibold">Additional note</h3>
                <p>{event.additionalNotes}</p>
              </div>
            )}
          </div>
          {formattedCatering && (
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
                      <p>{formattedCatering.package.price} / pax</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <User2 className="text-secondary-800" size={15} />
                      <h4 className="text-sm font-semibold">Expected Pax </h4>
                      <p>{formattedCatering.expectedPax} pax</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Main Dishes</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {formattedCatering.mainDishes
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
                        {formattedCatering.mainDishes
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
                        {formattedCatering.pickASnackCorner.map(
                          (dish: MainDish) => (
                            <div
                              key={dish.id}
                              className="dish-name rounded-lg border border-solid bg-secondary-100/50 p-2 text-center text-xs"
                            >
                              <p className="font-semibold">{dish.name}</p>
                              <p className="text-xs text-secondary-800">
                                ( {dish.category} )
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    {formattedCatering.addOns.filter(
                      (dish: AddOn) => dish.category === "Food Carts",
                    ).length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold">Food Carts</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {formattedCatering.addOns
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
                    {formattedCatering.addOns.filter(
                      (dish: AddOn) => dish.category === "Technicals",
                    ).length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold">Technicals</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {formattedCatering.addOns
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
      <div className="flex justify-end">
        <Button
          onClick={handleEventSubmit}
          className="mt-3 rounded-full bg-primary-100 px-10 text-secondary-900 hover:bg-primary-200"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default Preview;
