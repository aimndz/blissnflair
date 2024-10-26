import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import verifyAuth from "../utils/verifyAuth";

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredRoles?: string[];
}

function ProtectedRoute({ element, requiredRoles = [] }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { authenticated, role } = await verifyAuth();
      setIsAuth(authenticated);
      setUserRole(role);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If user is authenticated and has the required role
  if (
    isAuth &&
    (requiredRoles.length === 0 || requiredRoles.includes(userRole!))
  ) {
    return element;
  }

  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
