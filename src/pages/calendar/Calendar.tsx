import { newevents } from "./data";
import FullCalender from "@shadcn-fullcalender/full-calender";

function Calendar() {
  console.log([...newevents]);

  return (
    <div>
      <h1>
        <FullCalender events={newevents} />
      </h1>
    </div>
  );
}

export default Calendar;
