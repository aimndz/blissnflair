import { daysOfWeek } from "@fullcalendar/constants";
import { Event } from "@fullcalendar/types/event";
import { renderDaysInMonth } from "@fullcalendar/utils/day-render";
import { renderDaysOfWeek } from "@fullcalendar/utils/week-render";
import { getDay, startOfMonth, startOfWeek } from "date-fns";

interface MonthViewProps {
  currentDate: Date;
  events: Event[];
  venue?: string;
}

export function MonthView({ currentDate, events, venue }: MonthViewProps) {
  const startDay = startOfMonth(currentDate);
  const startWeek = startOfWeek(startDay);
  const firstDayIndex = getDay(startDay);
  const reorderedDaysOfWeek = [...daysOfWeek];

  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2">
      {renderDaysOfWeek({
        weekDays: reorderedDaysOfWeek,
      })}
      {renderDaysInMonth({
        venue,
        currentDate,
        events,
        startWeek,
        daysOfWeek,
      })}
    </div>
  );
}
