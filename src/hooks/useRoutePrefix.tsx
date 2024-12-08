import { useUser } from "./use-user";

export function useRoutePrefix() {
  const { user } = useUser();

  return user?.role === "ADMIN" ? "admin/dashboard" : "dashboard";
}
