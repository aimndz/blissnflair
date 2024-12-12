import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../services/utilsApi";

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredRoles?: string[];
}

function ProtectedRoute({ element, requiredRoles = [] }: ProtectedRouteProps) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null); // Use null to indicate "unknown"
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const userProfile = await getUserProfile();
      setIsAuth(userProfile.authenticated);
      setUserRole(userProfile.user?.role);
    };

    checkAuth();
  }, []);

  // If auth state is still unknown, render nothing or a placeholder (optional)
  if (isAuth === null) {
    return null; // Or you could show a placeholder like <div>Loading...</div>
  }

  // If user is authenticated and has the required role
  if (
    isAuth &&
    (requiredRoles.length === 0 || requiredRoles.includes(userRole!))
  ) {
    return element;
  }

  // Optionally, redirect to a specific page, but not immediately
  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
