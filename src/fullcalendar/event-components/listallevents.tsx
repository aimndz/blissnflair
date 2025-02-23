"use client";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@components/ui/credenza";
import { Button } from "@components/ui/button";
import AddEvent from "@fullcalendar/calendar-components/add-event";
import { CalendarAdd } from "iconsax-react";
import EventModal from "./eventmodal"; // Importing EventModalProps type
import { Eventyearviewbtn } from "./yearviewlist";

type Event = {
  eventname: string;
  description: string;
};

type ButtonProps = {
  view: "day" | "year"; // Specify the views available, e.g., "day" or "month"
  eventsForDay: Event[]; // Array of Event objects
  eventsForDate?: Event[]; // Optional prop for year view (pass if needed)
  date?: Date; // Optional prop for the date (pass if needed)
  isToday?: boolean; // Optional boolean for checking if the date is today
  isCurrentMonth?: boolean; // Optional boolean for checking if the date is in the current month
  index?: number; // Optional index prop (if needed for the year view button)
  venue?: string; // Optional venue prop
};

function ListAllEvents({
  eventsForDay,
  view,
  eventsForDate,
  date,
  isToday,
  isCurrentMonth,
  index,
  venue,
}: ButtonProps) {
  return (
    <Credenza>
      <CredenzaTrigger className="w-full" asChild>
        {view === "day" ? (
          <Button
            variant="ghost"
            className="mb-1 w-full text-xs text-muted-foreground"
          >
            +{eventsForDay.length - 1} more
          </Button>
        ) : (
          <Eventyearviewbtn
            key={date?.toString()} // Optional chaining for date
            eventsForDate={eventsForDate || []}
            isToday={isToday as any}
            isCurrentMonth={isCurrentMonth as any}
            date={date ?? new Date()}
            index={index}
          />
        )}
      </CredenzaTrigger>

      <CredenzaContent className="max-w-lg">
        <CredenzaHeader className="px-6 lg:px-2">
          <CredenzaTitle>
            <div className="flex items-center justify-start">
              <CalendarAdd className="h-6 w-6" color="black" strokeWidth={20} />
              <span className="ml-2">All the events for the day</span>
            </div>
          </CredenzaTitle>
          <CredenzaDescription className="text-left">
            Click on an event to view more details.
          </CredenzaDescription>
        </CredenzaHeader>

        {/* Make the ListAllEvents body scrollable */}
        <CredenzaBody className="max-h-[80vh] overflow-y-auto">
          {eventsForDay.map((event, index) => (
            <EventModal key={index} eventdetails={event} />
          ))}
          <div className="w-full">
            <AddEvent variant="primary" currentDate={date} venue={venue} />
          </div>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}

export default ListAllEvents;
