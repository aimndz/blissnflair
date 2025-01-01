import { NavLink, Link } from "react-router-dom";
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
  SidebarTrigger,
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
    title: "Analytics",
    url: "analytics",
    icon: ChartLine,
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

  return (
    <Sidebar>
      <SidebarHeader className="mt-8 px-4 text-center">
        <div className="relative">
          <div className="absolute left-0 top-0">
            <SidebarTrigger />
          </div>
          <Link to="/">
            <div className="mx-auto flex w-10 justify-center">
              <Logo />
            </div>
            <div className="mb-6 text-2xl font-bold">
              <span>BLISS & FLAIR</span>
            </div>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="create/select-venue">
                  {({ isActive }) => (
                    <SidebarMenuButton
                      asChild
                      className={`border border-solid border-secondary-600 ${isActive ? "border-primary-100 bg-primary-100 text-secondary-900 hover:bg-primary-100 active:bg-primary-100" : "text-secondary-800 hover:bg-secondary-300 active:bg-secondary-300"}`}
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
                            : "text-secondary-800 hover:bg-transparent active:bg-transparent"
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
