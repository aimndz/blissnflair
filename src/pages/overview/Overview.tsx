import { SidebarTrigger } from "../../components/ui/sidebar";
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
      <div className="flex gap-3">
        <SidebarTrigger />
        <h1 className="mb-8 w-full text-3xl font-semibold">Overview</h1>
      </div>
      {user.role === "ADMIN" ? (
        <AdminOverviewContent />
      ) : (
        <UserOverviewContent />
      )}
    </div>
  );
}

export default Overview;
