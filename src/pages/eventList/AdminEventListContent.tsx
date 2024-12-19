import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { getAllEvents } from "../../services/eventApi";
import { getAllAccounts } from "../../services/accountApi"; // New API function
import { Event } from "../../types/event"; // Assuming you have a User type
import { parseISO, format } from "date-fns";
import { CalendarX, CheckIcon, XIcon } from "lucide-react";
import Combobox from "../../components/ui/combobox";
import { Link, useSearchParams } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { updateEvent } from "../../services/eventApi";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import Loading from "../../components/LoadingSpinner";

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

const eventStatus = [
  { value: "all", label: "All" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
  { value: "cancelled", label: "Cancelled" },
  { value: "completed", label: "Completed" },
];

const venues = [
  { value: "all", label: "All Venues" },
  { value: "private room", label: "Private Room" },
  { value: "lounge hall", label: "Lounge Hall" },
  { value: "al fresco", label: "Al Fresco" },
  { value: "function hall", label: "Function Hall" },
];

function AdminEventListContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filter = searchParams.get("filter") || "all";
  const venue = searchParams.get("venue") || "all";

  const filteredEvents = events
    .filter((event) => {
      const matchesFilter =
        filter === "all" || event.status.toUpperCase() === filter.toUpperCase();
      const matchesVenue =
        venue === "all" || event.venue.toLowerCase() === venue.toLowerCase();

      // Check if the event matches the search query (title, venue, status, booked by)
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        users
          .find((user) => user.id === event.userId)
          ?.firstName.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        users
          .find((user) => user.id === event.userId)
          ?.lastName.toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesVenue && matchesSearch;
    })
    .map((event) => {
      const user = users.find((user) => user.id === event.userId);

      // Format startTime and endTime
      // const startTimeFormatted = format(parseISO(event.startTime), "hh:mm a");
      // const endTimeFormatted = format(parseISO(event.endTime), "hh:mm a");

      return {
        ...event,
        // date: format(parseISO(event.date), "MMM dd yyyy"),
        // startTime: startTimeFormatted,
        // endTime: endTimeFormatted,

        bookedBy: user ? `${user.firstName} ${user.lastName}` : "Unknown",
      };
    })
    .sort((a, b) => {
      // Prioritize "pending" status if filter is "all"
      if (filter === "all") {
        if (
          a.status.toUpperCase() === "PENDING" &&
          b.status.toUpperCase() !== "PENDING"
        ) {
          return -1; // a should come before b
        }
        if (
          a.status.toUpperCase() !== "PENDING" &&
          b.status.toUpperCase() === "PENDING"
        ) {
          return 1; // b should come before a
        }
      }
      return 0; // no change to order
    });

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
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set(key, value);
      return params;
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleUpdateEvent = async (id: string, event: Event) => {
    try {
      console.log("Id", id);
      console.log("Event", event);
      const response = await updateEvent(id, event);
      if (response.success) {
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <Loading />;
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-3 flex items-end justify-between">
        <div className="flex gap-3">
          <Combobox
            items={eventStatus}
            label=""
            value={filter}
            onChange={(value) => handleFilterChange("filter", value)}
            className="w-48"
          />
          <Combobox
            items={venues}
            label="Venue"
            value={venue}
            onChange={(value) => handleFilterChange("venue", value)}
            className="w-48"
          />
        </div>
        <div className="relative w-full max-w-96">
          <Input
            type="search"
            placeholder="Search by title, venue, status, or booked by..."
            className="w-full pr-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <MagnifyingGlassIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <Table className="rounded-lg border border-secondary-600 bg-secondary-100">
          <TableCaption>A list of all the events.</TableCaption>
          <TableHeader className="bg-secondary-300 font-semibold">
            <TableRow>
              <TableHead>Event Title</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Booked by</TableHead>
              <TableHead>Status</TableHead>
              {filter === "pending" || filter === "all" ? (
                <TableHead className="text-right">Approval</TableHead>
              ) : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <Link to={`/admin/dashboard/events/${event.id}`}>
                  {" "}
                  <TableCell className="cursor-pointer transition-all delay-75 hover:underline">
                    {event.title}
                  </TableCell>
                </Link>

                <TableCell>{event.venue}</TableCell>
                <TableCell>
                  {format(parseISO(event.date), "MMM dd yyyy")}
                </TableCell>
                <TableCell>
                  {format(parseISO(event.startTime), "hh:mm a")} -{" "}
                  {format(parseISO(event.endTime), "hh:mm a")}
                </TableCell>
                <TableCell>{event.bookedBy}</TableCell>
                <TableCell>
                  <span
                    className={`} inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(event.status)}`}
                  >
                    {event.status}
                  </span>
                </TableCell>
                {event.status === "PENDING" && (
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Dialog>
                        <DialogTrigger>
                          <button className="flex aspect-square h-7 cursor-pointer items-center justify-center rounded-full bg-red-500 transition-all delay-75 hover:bg-red-600">
                            <XIcon className="h-5 w-5 text-red-800" />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                          </DialogHeader>
                          <DialogFooter>
                            <button
                              onClick={() =>
                                handleUpdateEvent(event.id, {
                                  ...event,
                                  status: "REJECTED",
                                })
                              }
                              className="boarder"
                            >
                              Yes
                            </button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger>
                          <button className="flex aspect-square h-7 cursor-pointer items-center justify-center rounded-full bg-primary-100 transition-all delay-75 hover:bg-primary-200">
                            <CheckIcon className="h-5 w-5 text-green-800" />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                          </DialogHeader>
                          <DialogFooter>
                            <button
                              onClick={() =>
                                handleUpdateEvent(event.id, {
                                  ...event,
                                  status: "APPROVED",
                                })
                              }
                              className="boarder"
                            >
                              Yes
                            </button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="-mt-16 flex h-[calc(100vh-200px)] items-center justify-center">
          <div>
            <CalendarX size={"100px"} className="mx-auto text-secondary-600" />
            <h3 className="text-center text-2xl font-semibold text-secondary-600">
              No events found
            </h3>
            <h3 className="mx-auto text-center text-secondary-700">{`It looks like there are no events matching the filter criteria.`}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEventListContent;
