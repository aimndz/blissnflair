// components/calendar-components/CalendarHeader.tsx

import { TabTypes } from "@fullcalendar/types/tabs";
import { Dispatch, SetStateAction } from "react";
import AddEvent from "./add-event";
import { MonthHeader } from "./monthheader";
import { Tabs } from "./tabs";
import { YearHeader } from "./yearheader";
import { CalendarProps } from "@fullcalendar/types/event";
import { Button } from "@fullcalendar/ui/button";
import { Link } from "react-router-dom";
import { AddCircle } from "iconsax-react";

export interface CalendarHeaderProps {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  activeTab: TabTypes;
  setActiveTab: Dispatch<SetStateAction<TabTypes>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isAnimating: boolean;
  handleMonthChange: (action: "prev" | "next" | string) => void;
  handleYearChange: (action: "prev" | "next" | number) => void;
  handleToday: () => void;
  config?: CalendarProps["config"];
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  return (
    <header>
      {props.activeTab === "month" ? (
        <div className="mb-4 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <MonthHeader
            currentDate={props.currentDate}
            setCurrentDate={props.setCurrentDate}
            isAnimating={props.isAnimating}
            value={props.value}
            setValue={props.setValue}
            handleMonthChange={props.handleMonthChange}
            handleYearChange={props.handleYearChange}
          />
          <div className="flex items-center justify-between gap-4">
            <Link to="/dashboard/create/select-venue">
              {" "}
              <Button className="bg-primary-100 text-secondary-900 hover:bg-primary-200">
                <AddCircle className="mr-1" /> Add Event
              </Button>{" "}
            </Link>
            {/* <AddEvent
                            CustomForm={props.config?.addEventConfig?.customForm}
                            buttonText={props.config?.addEventConfig?.buttonText}
                            formDescription={props.config?.addEventConfig?.formDescription}
                            formTitle={props.config?.addEventConfig?.formTitle}
                            icon={props.config?.addEventConfig?.icon}
                        /> */}
            <Tabs
              activeTab={props.activeTab}
              setActiveTab={props.setActiveTab}
            />
            <Button variant="outline" onClick={props.handleToday}>
              Today
            </Button>
          </div>
        </div>
      ) : (
        <div className="mb-4 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <YearHeader
            getFullYear={props.currentDate.getFullYear()}
            setCurrentDate={props.setCurrentDate}
            isAnimating={props.isAnimating}
            handleYearChange={props.handleYearChange}
          />
          <div className="flex items-center justify-center gap-4">
            <AddEvent
              CustomForm={props.config?.addEventConfig?.customForm}
              buttonText={props.config?.addEventConfig?.buttonText}
              formDescription={props.config?.addEventConfig?.formDescription}
              formTitle={props.config?.addEventConfig?.formTitle}
              icon={props.config?.addEventConfig?.icon}
            />
            <Tabs
              activeTab={props.activeTab}
              setActiveTab={props.setActiveTab}
            />
            <Button variant="outline" onClick={props.handleToday}>
              This Year
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default CalendarHeader;
