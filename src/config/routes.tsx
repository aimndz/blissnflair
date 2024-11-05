import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "../Home";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Error from "../pages/Error";
import DashboardLayout from "../layouts/DashboardLayout";
import Overview from "../pages/overview/Overview";
import Create from "../pages/create/Create";
import EventList from "../pages/eventList/EventList";
import Calendar from "../pages/calendar/Calendar";
import Profile from "../pages/Profile";
import AdminLogin from "../pages/auth/AdminLogin";
import Accounts from "../pages/Accounts";
import Preview from "../pages/preview/Preview";
import ProfileEdit from "../pages/ProfileEdit";
import AccountCreate from "../pages/AccountCreate";
import SystemSettings from "../pages/SystemSettings";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

const userRoutes = [
  {
    path: "overview",
    title: "Overview",
    element: <Overview />,
  },
  {
    path: "create",
    title: "Create Event",
    element: <Create />,
  },
  {
    path: "preview",
    title: "Preview",
    element: <Preview />,
  },
  {
    path: "events",
    title: "Events",
    element: <EventList />,
  },
  {
    path: "calendar",
    title: "Calendar",
    element: <Calendar />,
  },
  {
    path: "profile",
    title: "Profile",
    element: <Profile />,
  },
  {
    path: "profile/edit",
    title: "Edit Profile",
    element: <ProfileEdit />,
  },
];

const adminRoutes = [
  {
    path: "accounts",
    title: "Accounts",
    element: <Accounts />,
  },
  {
    path: "accounts/create",
    title: "Create Account",
    element: <AccountCreate />,
  },
  {
    path: "system-settings",
    title: "System Settings",
    element: <SystemSettings />,
  },
  // Combine user routes in admin routes
  ...userRoutes,
];

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute
        element={<DashboardLayout routes={userRoutes} />}
        requiredRoles={["USER"]}
      />
    ),
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Navigate to="/dashboard/overview" replace />,
      },
      ...userRoutes,
    ],
  },
  {
    path: "/admin",
    errorElement: <Error />,
    children: [
      {
        path: "login",
        element: <AdminLogin />,
        errorElement: <Error />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute
            element={<DashboardLayout routes={adminRoutes} />}
            requiredRoles={["ADMIN"]}
          />
        ),
        children: [
          {
            path: "",
            element: <Navigate to="/admin/dashboard/overview" replace />,
          },
          ...adminRoutes,
        ],
      },
    ],
  },
]);

export default router;
