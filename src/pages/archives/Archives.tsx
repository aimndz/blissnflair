import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { getAllEvents, updateEvent } from "../../services/eventApi";
import { getAllAccounts } from "../../services/accountApi";
import { Event } from "../../types/event";
import { parseISO, format } from "date-fns";
import { ArchiveRestore, CalendarX } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Dialog, DialogTrigger } from "../../components/ui/dialog";
import Loading from "../../components/LoadingSpinner";
import EventDialogApproval from "../../components/EventDialogApproval";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import EventEditDialog from "../eventList/EventEditDialog";
import { getRandomDegree } from "../../utils/randomGradient";
import { toast } from "sonner";
import PaginationBar from "../../components/PaginationBar";
import CustomToast from "../../components/toasts/CustomToast";
import { useRoutePrefix } from "../../hooks/useRoutePrefix";

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

function Archives() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editEventData, setEditEventData] = useState<Event | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // Pagination state
  const currentPageParam = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState<number>(currentPageParam);
  const itemsPerPage = 15; // Number of items per page
  const routePrefix = useRoutePrefix();

  const navigate = useNavigate();

  const filter = searchParams.get("filter") || "all";
  const venue = searchParams.get("venue") || "all";

  const filteredEvents = events
    .filter((event) => {
      return (
        event.deletedAt !== null &&
        event.deletedAt !== "0000-01-01T00:00:00.000Z"
      );
    })
    .map((event) => {
      return {
        ...event,
      };
    })
    .sort((a, b) => {
      if (filter === "all") {
        if (
          a.status.toUpperCase() === "CANCELLED" &&
          b.status.toUpperCase() !== "CANCELLED"
        ) {
          return -1;
        }
      }
      return 0;
    })
    .sort((a, b) => {
      if (filter === "all") {
        if (
          a.status.toUpperCase() === "COMPLETED" &&
          b.status.toUpperCase() !== "COMPLETED"
        ) {
          return -1;
        }
      }
      return 0;
    })
    .sort((a, b) => {
      if (filter === "all") {
        if (
          a.status.toUpperCase() === "APPROVED" &&
          b.status.toUpperCase() !== "APPROVED"
        ) {
          return -1;
        }
      }
      return 0;
    })
    .sort((a, b) => {
      if (filter === "all") {
        if (
          a.status.toUpperCase() === "PENDING" &&
          b.status.toUpperCase() !== "PENDING"
        ) {
          return -1;
        }
      }
      return 0;
    });

  // Calculate paginated events
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent,
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status.toUpperCase()) {
      case "APPROVED":
        return "bg-green-100 text-green-600 border border-green-500";
      case "PENDING":
        return "bg-yellow-100 text-yellow-600 border border-yellow-500";
      case "REJECTED":
        return "bg-red-100 text-red-600 border border-red-500";
      case "CANCELLED":
        return "bg-gray-100 text-gray-600 border border-gray-500";
      case "COMPLETED":
        return "bg-blue-100 text-blue-600 border border-blue-500";
      default:
        return "bg-secondary-100 text-secondary-600 border border-secondary-500";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, userRes] = await Promise.all([
          getAllEvents(),
          getAllAccounts(),
        ]);
        setEvents(eventRes.data);
        setUsers(userRes.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, venue, searchQuery]);

  const handleUpdateEvent = async (id: string, updatedEvent: Event) => {
    try {
      const formData = new FormData();
      // Add all necessary fields to FormData
      formData.append("title", updatedEvent.title);
      formData.append("organizer", updatedEvent?.organizer || "");
      formData.append("description", updatedEvent.description);
      formData.append("category", updatedEvent.category);
      formData.append("date", updatedEvent.date);
      formData.append("startTime", updatedEvent.startTime);
      formData.append("endTime", updatedEvent.endTime);
      formData.append("venue", updatedEvent.venue);
      formData.append("additionalNotes", updatedEvent.additionalNotes || "");
      formData.append("additionalHours", String(updatedEvent.additionalHours));
      formData.append("status", updatedEvent.status);
      // Only append imageUrl if it exists
      if (updatedEvent.imageUrl) {
        formData.append("imageUrl", updatedEvent.imageUrl);
      }

      if (updatedEvent.deletedAt === null) {
        formData.append("deletedAt", "0000-01-01T00:00:00Z");
      }

      const res = await updateEvent(id, formData);

      if (res.success) {
        toast.custom(() => (
          <CustomToast type="success" message="Item restored successfully" />
        ));

        console.log(res.data);
        // Update the local events state
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === id ? { ...event, ...updatedEvent } : event,
          ),
        );
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const handleGotoEvent = (id: string) => {
    navigate(`/${routePrefix}/events/${id}`);
  };

  return (
    <div className="mx-auto">
      {currentEvents.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-secondary-600">
          <Table>
            <TableHeader className="bg-secondary-300 font-semibold">
              <TableRow>
                <TableHead>Event Title</TableHead>
                <TableHead>Organized by</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Date and Time</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Status</TableHead>
                {filter === "pending" || filter === "all" ? (
                  <TableHead>Restore</TableHead>
                ) : null}
              </TableRow>
            </TableHeader>
            <TableBody className="bg-secondary-100">
              {currentEvents.map((event) => {
                const randomDeg = getRandomDegree();
                return (
                  <TableRow key={event.id}>
                    <TableCell
                      className="cursor-pointer transition-all duration-200 ease-in-out hover:underline"
                      onClick={() => handleGotoEvent(event.id)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 overflow-hidden rounded-lg object-cover">
                          {event.imageUrl ? (
                            <img
                              src={event.imageUrl}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div
                              className={`relative aspect-square w-full rounded-t-lg ${randomDeg} from-primary-100/20 to-primary-100`}
                            ></div>
                          )}
                        </div>
                        <p>{event.title}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Avatar className="flex h-8 w-8 items-center justify-center bg-secondary-600/50 text-xs">
                          {event.organizer === "" && event.user.imageUrl ? (
                            <AvatarImage
                              src={event.user?.imageUrl}
                              className="object-cover"
                            />
                          ) : event?.organizer?.trim() === "" ? (
                            "Y"
                          ) : (
                            event?.organizer?.charAt(0).toUpperCase()
                          )}
                        </Avatar>
                        <div>
                          <p>
                            {event?.organizer?.trim() === ""
                              ? event.user.firstName + " " + event.user.lastName
                              : event?.organizer}
                          </p>
                          <p className="text-xs text-secondary-800">
                            {event.user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {event.venue.replace(/\b\w/g, (char) =>
                        char.toUpperCase(),
                      )}{" "}
                    </TableCell>
                    <TableCell>
                      <p>{format(parseISO(event.date), "MMM dd yyyy ")}</p>
                      <p className="text-secondary-800">
                        {format(parseISO(event.startTime), "hh:mm a")} -{" "}
                        {format(parseISO(event.endTime), "hh:mm a")}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p>{format(parseISO(event.createdAt), "MMM dd yyyy")}</p>
                      <p className="text-secondary-800">
                        {format(parseISO(event.createdAt), "hh:mm a")}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(event.status)} w-full max-w-28 text-center`}
                      >
                        {event.status}
                      </span>
                    </TableCell>
                    <TableCell className="w-52">
                      <Dialog>
                        <DialogTrigger>
                          <Button className="w-full rounded-lg bg-primary-100 text-secondary-100 hover:bg-primary-200">
                            <ArchiveRestore size={20} />
                            <p>Restore</p>
                          </Button>
                        </DialogTrigger>
                        <EventDialogApproval
                          status="RESTORED"
                          event={event}
                          onUpdateEvent={async () =>
                            await handleUpdateEvent(event.id, {
                              ...event,
                              deletedAt: null,
                            })
                          }
                        />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="-mt-16 flex h-[calc(100vh-100px)] items-center justify-center">
          <div>
            <CalendarX size={"100px"} className="mx-auto text-secondary-600" />
            <h3 className="text-center text-2xl font-semibold text-secondary-600">
              No items found
            </h3>
            <h3 className="mx-auto text-center text-secondary-700">{`It looks like there are no records to display.`}</h3>
          </div>
        </div>
      )}
      <EventEditDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        event={editEventData}
        onUpdate={(updatedEvent: Event) =>
          handleUpdateEvent(updatedEvent.id, updatedEvent)
        }
      />

      {/* Pagination */}
      {filteredEvents.length === 0 ? null : (
        <PaginationBar
          itemsPerPage={itemsPerPage}
          dataLength={filteredEvents.length}
          currentPage={currentPage}
          handleSetCurrentPage={setCurrentPage}
          handleSetSearchParams={setSearchParams}
        />
      )}
    </div>
  );
}

export default Archives;
