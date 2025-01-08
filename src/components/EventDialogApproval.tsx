import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Event } from "../types/event";
import { Info } from "lucide-react";

function EventDialogApproval({
  status,
  event,
  onUpdateEvent,
}: {
  status: string;
  event: Event;
  onUpdateEvent: () => void;
}) {
  return (
    <DialogContent className="max-w-sm">
      <DialogHeader>
        <DialogTitle
          className={`flex items-center gap-1 ${status === "REJECTED" ? "text-red-800" : ""} `}
        >
          {status! !== "REJECTED" ? (
            <Info className="h-5 w-5 text-red-800" />
          ) : (
            <ExclamationTriangleIcon className="h-5 w-5 text-red-800" />
          )}

          <p>
            {status === "APPROVED"
              ? "Approving"
              : status === "REJECTED"
                ? "Rejecting"
                : status === "COMPLETED"
                  ? "Completing"
                  : "Cancelling"}{" "}
            an Event
          </p>
        </DialogTitle>
      </DialogHeader>
      <DialogDescription className="text-secondary-900">
        Are you sure you want to{" "}
        {status === "APPROVED"
          ? "approve"
          : status === "REJECTED"
            ? "reject"
            : status === "COMPLETED"
              ? "complete"
              : "cancel"}{" "}
        <span className="font-bold">{event.title}</span>? This action cannot be
        undone.
      </DialogDescription>
      <DialogFooter>
        <DialogClose>
          <Button className="border border-secondary-600 bg-secondary-200 text-secondary-900 hover:bg-secondary-300">
            Cancel
          </Button>
        </DialogClose>
        <DialogClose>
          <Button
            className={`${status === "APPROVED" ? "bg-primary-100 hover:bg-primary-200" : status === "REJECTED" ? "bg-red-500 text-secondary-100 hover:bg-red-600" : status === "COMPLETED" ? "border border-secondary-700 bg-blue-200 text-secondary-800 hover:bg-blue-800/30" : "border border-secondary-700 bg-secondary-600/50 text-secondary-800 hover:bg-secondary-800/20"}`}
            onClick={() => onUpdateEvent()}
          >
            {status === "APPROVED"
              ? "Approve"
              : status === "REJECTED"
                ? "Reject"
                : status === "COMPLETED"
                  ? "Complete"
                  : "Confirm"}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

export default EventDialogApproval;
