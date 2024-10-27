import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "./icons/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

import {
  Calendar,
  PlusIcon,
  PartyPopper,
  ChartLine,
  CircleUserRound,
  Settings,
} from "lucide-react";
import { useUser } from "../hooks/use-user";

// Menu items.
const items = [
  {
    title: "Overview",
    url: "overview",
    icon: ChartLine,
  },
  {
    title: "My Events",
    url: "events",
    icon: PartyPopper,
  },
  {
    title: "Calendar View",
    url: "calendar",
    icon: Calendar,
  },
];

const adminItems = [
  ...items,
  {
    title: "Accounts",
    url: "accounts",
    icon: CircleUserRound,
  },
  {
    title: "System Settings",
    url: "system-settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const userContext = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (userContext) {
      const userRole = userContext.user?.role;
      setIsAdmin(userRole === "ADMIN");
    }
  }, [userContext]);

  if (!userContext) {
    return <div>Loading...</div>;
  }

  return (
    <Sidebar>
      <SidebarHeader className="mt-8 text-center">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="create">
                  {({ isActive }) => (
                    <SidebarMenuButton
                      asChild
                      className={`border border-solid border-secondary-600 bg-[#D6D6D6] ${isActive ? "border-primary-100 bg-primary-100 text-secondary-900 hover:bg-primary-100 active:bg-primary-100" : "text-secondary-800 hover:bg-secondary-600 active:bg-secondary-600"}`}
                    >
                      <div className="flex items-center">
                        <PlusIcon />
                        <span>Create</span>
                      </div>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {(isAdmin ? adminItems : items).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        asChild
                        className={
                          isActive
                            ? "bg-primary-100 text-secondary-900 hover:bg-primary-100 active:bg-primary-100"
                            : "text-secondary-800"
                        }
                      >
                        <div className="flex items-center">
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
