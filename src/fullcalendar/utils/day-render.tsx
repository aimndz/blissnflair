import { addDays, format, parseISO } from "date-fns";

import React from "react";
import { Event } from "@fullcalendar/types/event";
import EventModal from "@fullcalendar/event-components/eventmodal";
import AddEvent from "@fullcalendar/calendar-components/add-event";
import ListAllEvents from "@fullcalendar/event-components/listallevents";

interface RenderDaysInMonthProps {
  currentDate: Date;
  events: Event[];
  startWeek: Date;
  daysOfWeek: string[];
}

export const renderDaysInMonth = ({
  currentDate,
  events,
  startWeek,
}: RenderDaysInMonthProps) => {
  const days: React.ReactNode[] = [];
  let day = startWeek;

  // Today's date
  const todayDate = format(new Date(), "d");
  const todayMonth = format(new Date(), "M");
  const todayYear = format(new Date(), "yyyy");

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

      // For days not in the current month, we'll handle the display differently
      const isToday =
        format(day, "d") === todayDate &&
        format(day, "M") === todayMonth &&
        format(day, "yyyy") === todayYear;

      // Filter events for the specific day
      // Filter events for the specific day
      const eventsForDay = events.filter((event) => {
        const eventDate = format(new Date(event.startTime), "yyyy-MM-dd");
        return eventDate === formattedDay;
      });

      days.push(
        <div
          key={day.toString()}
          className={`group relative flex h-[80px] flex-col rounded border p-1 sm:h-[130px] sm:p-2 ${isCurrentMonth ? "" : "text-gray-400"} `} // Dim color for days outside the current month
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
            {eventsForDay.length === 0 && (
              <AddEvent variant="secondary" currentDate={day} />
            )}
            {eventsForDay.length === 1 && (
              <>
                <EventModal eventdetails={eventsForDay[0]} />
                <AddEvent variant="secondary" currentDate={day} />
              </>
            )}
            {eventsForDay.length > 1 && (
              <>
                <EventModal eventdetails={eventsForDay[0]} />
              </>
            )}
            {eventsForDay.length > 1 && (
              <ListAllEvents
                view="day"
                date={day}
                eventsForDay={eventsForDay}
              />
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
