import { format } from "date-fns";

export function Eventyearviewbtn(props: {
  isToday: (arg0: any) => any;
  date: string | number | Date;
  isCurrentMonth: (arg0: any, arg1: any) => any;
  index: any;
  eventsForDate: any[];
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`flex h-6 w-6 cursor-pointer items-center justify-center text-xs text-foreground`}
    >
      <div
        className={`relative flex aspect-square h-6 flex-col items-center justify-center rounded-full transition-all duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700 ${props.isToday(props.date) ? "bg-black text-white" : props.isCurrentMonth(props.date, props.index) ? "" : "text-gray-400"}`}
      >
        {format(props.date, "d")}
        <div className="flex items-center justify-center space-x-[0.2px]">
          {props.eventsForDate.length > 0 ? (
            <>
              {props.eventsForDate.slice(0, 4).map((_event, index) => (
                <div
                  key={index} // Add a unique key for each event
                  className={`aspect-square w-1 rounded-full bg-black ${
                    index === 3 ? "opacity-50" : "" // Optional: Add a class for the 4th item
                  }`}
                />
              ))}
            </>
          ) : null}
        </div>
      </div>
    </button>
  );
}
