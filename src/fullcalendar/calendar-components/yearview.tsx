import ListAllEvents from "@fullcalendar/event-components/listallevents";
import { Event } from "@fullcalendar/types/event";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  parseISO,
  startOfMonth,
  subDays,
} from "date-fns";
import React from "react";

interface YearViewProps {
  currentDate: Date; // Current date
  events: Event[]; // Array of events
}

const YearView: React.FC<YearViewProps> = ({ currentDate, events }) => {
  // Define the color map for event types

  // Generate dates for each month in the year, including leading and trailing days
  const generateDatesForMonth = (month: number) => {
    const start = startOfMonth(new Date(currentDate.getFullYear(), month));
    const end = endOfMonth(start);

    // Get the day of the week the month starts and ends on
    const startDayOfWeek = start.getDay(); // 0 = Sunday, 6 = Saturday
    const endDayOfWeek = end.getDay();

    // Calculate leading days from the previous month
    const leadingDays =
      startDayOfWeek > 0
        ? eachDayOfInterval({
            start: subDays(start, startDayOfWeek),
            end: subDays(start, 1),
          })
        : [];

    // Calculate trailing days from the next month
    const trailingDays =
      endDayOfWeek < 6
        ? eachDayOfInterval({
            start: addDays(end, 1),
            end: addDays(end, 6 - endDayOfWeek),
          })
        : [];

    // Combine leading days, current month's days, and trailing days
    return [
      ...leadingDays,
      ...eachDayOfInterval({ start, end }),
      ...trailingDays,
    ];
  };

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]; // Days of the week

  // Create an array of months with their names and dates
  const months = Array.from({ length: 12 }, (_, i) => {
    const monthName = format(new Date(currentDate.getFullYear(), i), "MMMM");
    const dates = generateDatesForMonth(i);
    return { monthName, dates };
  });

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date belongs to the current month
  const isCurrentMonth = (date: Date, month: number) => {
    return date.getMonth() === month;
  };

  // Create a function to get the events for a specific date
  const getEventsForDate = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");

    return events.filter((event: Event) => {
      const startTime = format(parseISO(event.startTime), "yyyy-MM-dd");
      const endTime = format(parseISO(event.endTime), "yyyy-MM-dd");

      if (startTime === endTime) {
        return startTime === formattedDate;
      } else {
        return formattedDate >= startTime && formattedDate <= endTime;
      }
    });
  };

  return (
    <div className="mx-auto p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
        {months.map((month, index) => (
          <div key={index} className="rounded border p-2">
            <h3 className="mb-4 text-center text-xl font-semibold">
              {month.monthName}
            </h3>
            {/* Render the days of the week once */}
            <div className="mb-2 grid grid-cols-7 gap-2 text-center">
              {daysOfWeek.map((day, index) => (
                <div
                  key={`${day}-${index}`}
                  className="h-6 w-6 text-xs font-semibold"
                >
                  {day}
                </div>
              ))}
            </div>
            {/* Render the dates, including leading and trailing days */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {month.dates.map((date) => {
                const eventsForDate = getEventsForDate(date);
                return (
                  <ListAllEvents
                    view="year"
                    eventsForDay={eventsForDate}
                    key={date.toString()}
                    eventsForDate={eventsForDate}
                    isToday={isToday as any}
                    isCurrentMonth={isCurrentMonth as any}
                    date={date}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearView;

// Sample events for testing
