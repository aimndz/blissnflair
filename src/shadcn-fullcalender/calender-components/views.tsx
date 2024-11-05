// components/calender-components/Views.tsx

import { Card } from "@components/ui/card"; // shadcn Card for structure
import { MonthView } from "./monthview";
import YearView from "./yearview";
import { TabTypes } from "@shadcn-fullcalender/types/tabs";
import { CalendarProps } from "@shadcn-fullcalender/types/event";

export interface ViewsProps extends CalendarProps {
  activeTab: TabTypes;
  isAnimating: boolean;
  currentDate: Date;
}
const Views = (props: ViewsProps) => {
  return (
    <Card
      className={`rounded-lg border bg-card p-2 text-card-foreground shadow-sm transition-all duration-300 sm:p-4 ${
        props.isAnimating
          ? "-translate-y-1 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div style={{ minWidth: "100%", display: "table" }}>
        {props.activeTab === "month" ? (
          <MonthView currentDate={props.currentDate} events={props.events} />
        ) : (
          <YearView currentDate={props.currentDate} events={props.events} />
        )}
      </div>
    </Card>
  );
};

export default Views;
