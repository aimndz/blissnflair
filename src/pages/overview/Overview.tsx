import { useUser } from "../../hooks/use-user";
import AdminOverviewContent from "./AdminOverviewContent";
import UserOverviewContent from "./UserOverviewContent";

function Overview() {
  const { user } = useUser();

  return (
    <div>
      {user?.role === "ADMIN" ? (
        <AdminOverviewContent />
      ) : (
        <UserOverviewContent />
      )}
    </div>
  );
}

export default Overview;
