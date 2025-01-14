import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "../Home";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Error from "../pages/Error";
import DashboardLayout from "../layouts/DashboardLayout";
import Overview from "../pages/overview/Overview";
import Create from "../pages/create/Create";
import Venue from "../pages/create/Venue";
import EventList from "../pages/eventList/EventList";
import Calendar from "../pages/calendar/Calendar";
import Profile from "../pages/profile/Profile";
import AdminLogin from "../pages/auth/AdminLogin";
import Accounts from "../pages/accounts/Accounts";
import Preview from "../pages/preview/Preview";
import ProfileEdit from "../pages/ProfileEdit";
import AccountCreate from "../pages/accounts/AccountCreate";
import SystemSettings from "../pages/SystemSettings";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Event from "../pages/eventDetails/Event";
import Catering from "../pages/create/catering/Catering";
import { CateringProvider } from "../contexts/CateringContext";
import Analytics from "../pages/analytics/Analytics";
import CalendarFunctionHall from "../pages/calendar/CalendarFunctionHall";
import CalendarLoungeHall from "../pages/calendar/CalendarLoungeHall";
import CalendarAlFresco from "../pages/calendar/CalendarAlFresco";
import CalendarPrivateRoom from "../pages/calendar/CalendarPrivateRoom";
import EventGuest from "../pages/eventDetails/EventGuest";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ChangePassword from "../pages/auth/ChangePassword";
import VerifyCode from "../pages/auth/VerifyCode";

const userRoutes = [
  {
    path: "overview",
    title: "Overview",
    element: <Overview />,
  },
  {
    path: "create/event-info",
    title: "Create Event",
    element: <Create />,
  },
  {
    path: "create/select-venue",
    title: "Create Event",
    element: <Venue />,
  },
  {
    path: "create/catering",
    title: "Create Event",
    element: (
      <CateringProvider>
        <Catering />
      </CateringProvider>
    ),
  },
  {
    path: "create/preview",
    title: "Preview",
    element: <Preview />,
  },
  {
    path: "events",
    title: "Events",
    element: <EventList />,
  },
  {
    path: "events/:id",
    title: "Event Details",
    element: <Event />,
  },
  // {
  //   path: "calendar",
  //   title: "Calendar",
  //   element: <Calendar />,
  // },
  {
    path: "calendar/function-hall",
    title: "Function Hall Calendar",
    element: <CalendarFunctionHall />,
  },
  {
    path: "calendar/lounge-hall",
    title: "Lounge Hall Calendar",
    element: <CalendarLoungeHall />,
  },
  {
    path: "calendar/al-fresco",
    title: "Al Fresco Calendar",
    element: <CalendarAlFresco />,
  },
  {
    path: "calendar/private-room",
    title: "Private Room Calendar",
    element: <CalendarPrivateRoom />,
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
    path: "analytics",
    title: "Analytics",
    element: <Analytics />,
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
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-code",
        element: <VerifyCode />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/events/:id",
        element: <EventGuest />,
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
