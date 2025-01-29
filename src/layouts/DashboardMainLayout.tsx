import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { SidebarTrigger } from "../components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useUser } from "../hooks/use-user";
import { logout } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { useRoutePrefix } from "../hooks/useRoutePrefix";

function DashboardMainLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const { user } = useUser();
  const navigate = useNavigate();
  const routePrefix = useRoutePrefix();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleProfile = () => {
    navigate(`/${routePrefix}/profile`);
  };

  return (
    <div className="w-full">
      <header className="relative z-10 flex w-full justify-between gap-3 px-5 py-8">
        <div className="flex items-center justify-center gap-3">
          <SidebarTrigger />
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={user?.imageUrl}
                alt="@shadcn"
                className="object-cover"
              />
              <AvatarFallback className="uppercase">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <p>
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs font-normal text-secondary-800">
                {user?.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfile}>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="w-full bg-secondary-200 px-5 pb-5">{children}</main>
    </div>
  );
}

export default DashboardMainLayout;
