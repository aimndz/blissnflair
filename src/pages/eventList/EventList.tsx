import { useUser } from "../../hooks/use-user";
import AdminEventListContent from "./AdminEventListContent";
import UserEventListContent from "./UserEventListContent";

function EventList() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user.role === "ADMIN" ? (
        <AdminEventListContent />
      ) : (
        <UserEventListContent />
      )}
    </div>
  );
}

export default EventList;
