import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import DashboardMainLayout from "./DashboardMainLayout";

interface Routes {
  path: string;
  title: string;
  element: React.ReactNode;
}

function DashboardLayout({ routes }: { routes: Routes[] }) {
  const location = useLocation();
  const matchedRoute = routes.find((route) =>
    location.pathname.includes(route.path),
  );
  //
  const title = matchedRoute?.title || "Dashboard";

  // if (matchedRoute?.path === "events") {
  //   title = role === "ADMIN" ? "All Events" : "My Events";
  // }

  return (
    <SidebarProvider>
      <AppSidebar />
      <DashboardMainLayout title={title}>
        <Outlet />
      </DashboardMainLayout>
    </SidebarProvider>
  );
}

export default DashboardLayout;
