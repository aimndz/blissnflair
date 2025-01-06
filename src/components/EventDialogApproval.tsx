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
          className={`flex items-center gap-1 ${status === "APPROVED" ? "" : "text-red-800"} `}
        >
          {status === "APPROVED" ? (
            <Info className="h-5 w-5 text-red-800" />
          ) : (
            <ExclamationTriangleIcon className="h-5 w-5 text-red-800" />
          )}

          <p>
            {status === "APPROVED"
              ? "Approving"
              : status === "REJECTED"
                ? "Rejecting"
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
            className={`${status === "APPROVED" ? "bg-primary-100 hover:bg-primary-200" : status === "REJECTED" ? "bg-red-500 text-secondary-100 hover:bg-red-600" : "bg-primary-100 text-secondary-100 hover:bg-primary-200"}`}
            onClick={() => onUpdateEvent()}
          >
            {status === "APPROVED"
              ? "Approve"
              : status === "REJECTED"
                ? "Reject"
                : status === "CANCELLED"
                  ? "Confirm"
                  : null}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

export default EventDialogApproval;
