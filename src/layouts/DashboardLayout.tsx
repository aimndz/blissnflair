import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import DashboardMainLayout from "./DashboardMainLayout";

function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <DashboardMainLayout>
        <Outlet />
      </DashboardMainLayout>
    </SidebarProvider>
  );
}

export default DashboardLayout;
