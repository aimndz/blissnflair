"use client";

import { AddCircle, CalendarAdd } from "iconsax-react";
import EventForm from "./eventform";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@fullcalendar/ui/credenza";
import { Button } from "@fullcalendar/ui/button";

type ButtonProps = {
  variant?: "default" | "secondary" | "primary"; // Optional variant type
  currentDate?: Date; // Optional day prop
  buttonText?: string; // Custom text for the button
  formTitle?: string; // Custom title for the form
  formDescription?: string; // Custom description for the form
  icon?: React.ReactNode; // Custom icon for the button
  CustomForm?: React.FC<{ currentDate?: Date }>; // Custom form component
};

function AddEvent({
  variant = "default",
  currentDate,
  buttonText = "Add Event",
  formTitle = "Add Event",
  formDescription = "Create a new event in your calendar.",
  icon = <AddCircle size={16} color="black" />, // Default icon
  CustomForm, // Accept custom form component
}: ButtonProps) {
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        {variant === "default" ? (
          <Button variant="default" className="flex items-center gap-2">
            <AddCircle size={16} color="white" />
            <span className="hidden lg:block">{buttonText}</span>
          </Button>
        ) : variant === "secondary" ? (
          <Button
            variant="ghost"
            className="inline-flex h-1/2 w-full items-center justify-center gap-2 truncate whitespace-nowrap rounded-md px-0.5 text-[8px] font-medium text-muted-foreground ring-offset-background transition-opacity hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:px-2 sm:text-xs sm:opacity-0 sm:group-hover:opacity-100 lg:py-5"
          >
            {icon}
            <span className="hidden lg:block">{buttonText}</span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="inline-flex h-1/2 w-full items-center justify-center gap-2 truncate whitespace-nowrap rounded-md bg-slate-100 px-0.5 text-[8px] font-medium text-muted-foreground ring-offset-background transition-all hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:px-2 sm:text-xs lg:py-5"
          >
            {icon}
            <span className="hidden lg:block">{buttonText}</span>
          </Button>
        )}
      </CredenzaTrigger>

      <CredenzaContent className="max-w-5xl">
        <CredenzaHeader className="px-6 lg:px-2">
          <CredenzaTitle>
            <div className="flex items-center justify-start">
              <CalendarAdd className="h-6 w-6" color="black" strokeWidth={20} />
              <span className="ml-2">{formTitle}</span>
            </div>
          </CredenzaTitle>
          <CredenzaDescription className="text-left">
            {formDescription}
          </CredenzaDescription>
        </CredenzaHeader>

        {/* Make the modal body scrollable */}
        <CredenzaBody className="max-h-[80vh] overflow-y-auto">
          {CustomForm ? (
            <CustomForm currentDate={currentDate} /> // Render custom form if provided
          ) : (
            <EventForm currentDate={currentDate} /> // Default form
          )}
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}

export default AddEvent;
