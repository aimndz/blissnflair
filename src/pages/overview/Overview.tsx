import { useUser } from "../../hooks/use-user";
import AdminOverviewContent from "./AdminOverviewContent";
import UserOverviewContent from "./UserOverviewContent";

function Overview() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user.role === "ADMIN" ? (
        <AdminOverviewContent />
      ) : (
        <UserOverviewContent />
      )}
    </div>
  );
}

export default Overview;
