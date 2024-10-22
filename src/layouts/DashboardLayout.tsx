import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
