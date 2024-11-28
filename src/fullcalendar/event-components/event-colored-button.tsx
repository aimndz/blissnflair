import React, { forwardRef } from "react";
import { Button } from "@components/ui/button";
import { format, parseISO } from "date-fns";
import { ClockIcon } from "@radix-ui/react-icons";

type EventDetails = {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};

type ColorScheme = "default" | "blue" | "green" | "red"; // Add more as needed

type ColoredButtonProps = {
  eventdetails: EventDetails;
  colorScheme?: ColorScheme; // Optional color scheme
  onClick?: () => void; // Optional onClick prop
};

// Wrap with forwardRef
const EventColoredButton = forwardRef<HTMLButtonElement, ColoredButtonProps>(
  (
    {
      eventdetails,
      colorScheme = "default", // Default color scheme
      onClick, // Include onClick prop
    },
    ref,
  ) => {
    // Define Tailwind classes for each color scheme
    const colorClasses = {
      default: {
        bgColor: "bg-yellow-200 dark:bg-yellow-800",
        textColor: "text-yellow-800 dark:text-yellow-200",
        borderColor: "border-l-black/70 dark:border-l-white/50",
      },
      blue: {
        bgColor: "bg-blue-200 dark:bg-blue-800",
        textColor: "text-blue-800 dark:text-blue-200",
        borderColor: "border-l-blue-600 dark:border-l-blue-400",
      },
      green: {
        bgColor: "bg-green-200 dark:bg-green-800",
        textColor: "text-green-800 dark:text-green-200",
        borderColor: "border-l-green-600 dark:border-l-green-400",
      },
      red: {
        bgColor: "bg-red-200 dark:bg-red-800",
        textColor: "text-red-800 dark:text-red-200",
        borderColor: "border-l-red-600 dark:border-l-red-400",
      },
    };

    const { bgColor, textColor, borderColor } = colorClasses[colorScheme];

    return (
      <Button
        variant="ghost"
        type="button"
        onClick={onClick} // Use onClick passed from the parent
        ref={ref} // Forward the ref to the Button
        className={`mb-1 flex h-full w-full cursor-pointer flex-col items-start justify-center rounded border-opacity-70 p-1 text-[8px] transition-colors duration-200 sm:text-xs ${parseISO(eventdetails.startTime) > new Date("2024-11-15") ? bgColor : "bg-secondary-200"} text-secondary-900 ${borderColor} hover:bg-opacity-85 dark:hover:bg-opacity-40`}
      >
        <div className="w-full max-w-md truncate">
          <h2 className="truncate font-semibold">{eventdetails.title}</h2>
        </div>
        <div className="hidden w-full max-w-md truncate sm:block">
          <p className="truncate font-light">{eventdetails.description}</p>
        </div>
        <div className="flex w-full justify-center">
          <ClockIcon className="mr-1 h-4 w-4" />
          <div className="whitespace-nowrap">
            {format(parseISO(eventdetails.startTime), "h:mm a")} -{" "}
            {format(parseISO(eventdetails.endTime), "h:mm a")}
          </div>
        </div>
      </Button>
    );
  },
);

// Set a display name for better debugging
EventColoredButton.displayName = "EventColoredButton";

export default EventColoredButton;
