import { useEffect, useState } from "react";
import { newevents } from "./data";
import FullCalendar from "@fullcalendar/full-calendar";
import { getAllEvents } from "../../services/eventApi";

function Calendar() {
  const [events, setEvents] = useState(newevents);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getAllEvents();
        const data = res.data;

        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>
        <FullCalendar events={newevents} />
      </h1>
    </div>
  );
}

export default Calendar;
