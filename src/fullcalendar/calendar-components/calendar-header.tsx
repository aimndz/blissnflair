import { TabTypes } from "@fullcalendar/types/tabs";
import { Dispatch, SetStateAction } from "react";

import { MonthHeader } from "./monthheader";
import { Tabs } from "./tabs";
import { YearHeader } from "./yearheader";
import { CalendarProps } from "@fullcalendar/types/event";
import { Button } from "@fullcalendar/ui/button";
import { useNavigate } from "react-router-dom";
import { Add } from "iconsax-react";
import { useRoutePrefix } from "../../hooks/useRoutePrefix";

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
  const routePrefix = useRoutePrefix();
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate(`/${routePrefix}/create/event-info`);
  };

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
            <Button
              className="bg-primary-100 text-secondary-900 hover:bg-primary-200"
              onClick={handleCreateEvent}
            >
              <Add className="mr-1" /> Add Event
            </Button>
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
            {/* <Button variant="outline" onClick={props.handleToday}>
              Today
            </Button> */}
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
            <Button
              className="bg-primary-100 text-secondary-900 hover:bg-primary-200"
              onClick={handleCreateEvent}
            >
              <Add className="mr-1" /> Add Event
            </Button>
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
            {/* <Button variant="outline" onClick={props.handleToday}>
              This Year
            </Button> */}
          </div>
        </div>
      )}
    </header>
  );
};

export default CalendarHeader;
