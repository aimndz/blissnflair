import { addDays, format, isBefore } from "date-fns"; // Import isBefore for date comparison
import React from "react";
import { Event } from "@fullcalendar/types/event";
import EventModal from "@fullcalendar/event-components/eventmodal";
import AddEvent from "@fullcalendar/calendar-components/add-event";
import ListAllEvents from "@fullcalendar/event-components/listallevents";

interface RenderDaysInMonthProps {
  currentDate: Date;
  events: Event[];
  startWeek: Date;
  venue?: string;
}

export const renderDaysInMonth = ({
  currentDate,
  events,
  startWeek,
  venue,
}: RenderDaysInMonthProps) => {
  const days: React.ReactNode[] = [];
  let day = startWeek;

  // Today's date
  const todayDate = new Date();

  // Calculate the number of days in the current month
  const totalDaysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  // Add days to the calendar
  for (let i = 0; i < 6; i++) {
    // Loop for 6 rows
    for (let j = 0; j < 7; j++) {
      // Loop for 7 columns (days of the week)
      const formattedDay = format(day, "yyyy-MM-dd");
      const isCurrentMonth = format(day, "M") === format(currentDate, "M");

      // Check if the day is today or in the past
      const isToday =
        format(day, "yyyy-MM-dd") === format(todayDate, "yyyy-MM-dd");
      const isPast = isBefore(day, todayDate); // Check if the day is before today

      // Filter events for the specific day
      const eventsForDay = events.filter((event) => {
        const eventDate = format(new Date(event.startTime), "yyyy-MM-dd");
        return eventDate === formattedDay;
      });

      days.push(
        <div
          key={day.toString()}
          className={`group relative flex h-[80px] flex-col rounded border p-1 sm:h-[130px] sm:p-2 ${isCurrentMonth ? "" : "text-gray-400"}`} // Dim color for days outside the current month
        >
          {/* Day number */}
          <div
            className={`mb-1 flex h-5 w-5 items-center justify-center text-xs font-semibold sm:h-6 sm:w-6 sm:text-sm ${
              isToday
                ? "flex aspect-square w-6 items-center justify-center rounded-full bg-black text-white"
                : ""
            }`}
          >
            {format(day, "d")}
          </div>

          {/* Events list */}
          <div className="flex-grow overflow-hidden">
            {/* Only render AddEvent if the day is not in the past */}
            {(!isPast || isToday) && eventsForDay.length === 0 && (
              <AddEvent variant="secondary" currentDate={day} venue={venue} />
            )}
            {eventsForDay.length === 1 && (
              <>
                <EventModal eventdetails={eventsForDay[0]} />
                {!isPast && (
                  <AddEvent
                    variant="secondary"
                    currentDate={day}
                    venue={venue}
                  />
                )}
              </>
            )}
            {eventsForDay.length > 1 && (
              <>
                <EventModal eventdetails={eventsForDay[0]} />
                <ListAllEvents
                  view="day"
                  date={day}
                  eventsForDay={eventsForDay}
                  venue={venue}
                />
              </>
            )}
          </div>
        </div>,
      );

      // Move to the next day
      day = addDays(day, 1);
    }
  }
  return days;
};
