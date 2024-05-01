import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Users from "../pages/Users/Users";
import JobseekerDashboard from "../pages/AllDashboard/JobseekerDashboard/JobseekerDashboard";
import EmployerDashboard from "../pages/AllDashboard/EmployerDashboard/EmployerDashboard";
import JobDetails from "../pages/AllDashboard/SharedComponents/JobDetails";
import Profile from "../pages/Profile/Profile";
import FindJob from "../pages/Find Job/FindJob";
import UserProfile from "../pages/Users/UserProfile";
import PrivateRouter from "./PrivateRouter";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword/ResetPassword";
import EmployeProfile from "../pages/EmployeProfile/EmployeProfile";
import FindEmployee from "../pages/FindEmploye/FindEmployee";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin/dashboard",
        element: <PrivateRouter><Users /></PrivateRouter>,
      },
      {
        path: "/profile",
        element: <PrivateRouter><Profile /></PrivateRouter>,
      },
      {
        path: '/user/:email',
        element: <PrivateRouter><UserProfile /></PrivateRouter>
      },
      {
        path: '/employeProfile/:id',
        element: <PrivateRouter><EmployeProfile /></PrivateRouter>
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: "/reset_password/:id/:token",
        element: <ResetPassword />
      },
      {
        path: "/findJob",
        element: <FindJob />,
      },
      {
        path: "/findEmploye",
        element: <FindEmployee />,
      },
      {
        path: "/jobseeker/dashboard",
        element: <PrivateRouter><JobseekerDashboard /></PrivateRouter>,
      },
      {
        path: "/employer/dashboard",
        element: <PrivateRouter><EmployerDashboard /></PrivateRouter>,
      },
      {
        path: "/jobdetails/:_id",
        element: <PrivateRouter><JobDetails /></PrivateRouter>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);
