import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";

function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-secondary-200">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default DashboardLayout;
