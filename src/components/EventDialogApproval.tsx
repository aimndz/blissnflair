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
  const renderIcon = () =>
    status === "REJECTED" || status === "DELETED" ? (
      <ExclamationTriangleIcon className="h-5 w-5 text-red-800" />
    ) : (
      <Info className="h-5 w-5 text-red-800" />
    );

  const actionTitle =
    {
      APPROVED: "Approve",
      REJECTED: "Reject",
      COMPLETED: "Complete",
      DELETED: "Delete",
      CANCELLED: "Confirm",
      RESTORED: "Restore",
    }[status] || "Confirm";

  const actionDescription =
    {
      APPROVED: "approve",
      REJECTED: "reject",
      COMPLETED: "complete",
      DELETED: "delete",
      CANCELLED: "cancel",
      RESTORED: "restore",
    }[status] || "process";

  const buttonStyle =
    {
      APPROVED: "bg-primary-100 hover:bg-primary-200",
      REJECTED: "bg-red-500 text-secondary-100 hover:bg-red-600",
      COMPLETED:
        "border border-secondary-700 bg-blue-200 text-secondary-800 hover:bg-blue-800/30",
      DELETED: "bg-red-600 text-secondary-100 hover:bg-red-700",
      CANCELLED:
        "border border-secondary-700 bg-secondary-600/50 text-secondary-800 hover:bg-secondary-800/20",
      RESTORED: "bg-green-500 text-secondary-100 hover:bg-green-600",
    }[status] || "bg-secondary-600 hover:bg-secondary-700";

  return (
    <DialogContent className="max-w-sm">
      <DialogHeader>
        <DialogTitle
          className={`flex items-center gap-1 ${status === "REJECTED" || status === "DELETED" ? "text-red-800" : ""}`}
        >
          {renderIcon()}
          <p>{actionTitle} Event</p>
        </DialogTitle>
      </DialogHeader>
      <DialogDescription className="text-secondary-900">
        Are you sure you want to {actionDescription}{" "}
        <span className="font-bold">{event.title}</span>?{" "}
        {status === "DELETED" && "This can be undone later."}
      </DialogDescription>
      <DialogFooter>
        <DialogClose asChild>
          <Button className="border border-secondary-600 bg-secondary-200 text-secondary-900 hover:bg-secondary-300">
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button className={buttonStyle} onClick={onUpdateEvent}>
            {actionTitle}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

export default EventDialogApproval;
