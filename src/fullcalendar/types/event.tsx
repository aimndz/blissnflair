import { Event } from "../../types/event";

export interface CalendarProps {
  events: Event[];
  venue?: string;
  config?: {
    addEventConfig?: {
      variant?: "default" | "secondary" | "primary";
      buttonText?: string;
      formTitle?: string;
      formDescription?: string;
      icon?: React.ReactNode;
      customForm?: React.FC<{ currentDate?: Date }>;
    };
    animationConfig?: {
      duration?: number;
    };
  };
}
