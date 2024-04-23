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
import PrivateRouter from "./PrivateRouter";

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
        path: "/findJob",
        element: <FindJob />,
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
        path: "/:_id",
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
