import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "../Home";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Error from "../pages/Error";
import DashboardLayout from "../layouts/DashboardLayout";
import Overview from "../pages/Overview";
import Create from "../pages/Create";
import EventList from "../pages/EventList";
import Calendar from "../pages/Calendar";
import Profile from "../pages/Profile";
import AdminLogin from "../pages/auth/AdminLogin";
import Accounts from "../pages/Accounts";
import Preview from "../pages/Preview";
import ProfileEdit from "../pages/ProfileEdit";
import AccountCreate from "../pages/AccountCreate";
import SystemSettings from "../pages/SystemSettings";
import MainLayout from "../layouts/MainLayout";

const userRoutes = [
  {
    path: "overview",
    element: <Overview />,
  },
  {
    path: "create",
    element: <Create />,
  },
  {
    path: "preview",
    element: <Preview />,
  },
  {
    path: "events",
    element: <EventList />,
  },
  {
    path: "calendar",
    element: <Calendar />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "profile/edit",
    element: <ProfileEdit />,
  },
];

const adminRoutes = [
  {
    path: "accounts",
    element: <Accounts />,
  },
  {
    path: "accounts/create",
    element: <AccountCreate />,
  },
  {
    path: "system-settings",
    element: <SystemSettings />,
  },
  ...userRoutes, // Include user routes in admin
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
    element: <DashboardLayout />,
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
        element: <DashboardLayout />,
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
