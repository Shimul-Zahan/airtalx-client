import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Users from "../pages/Users/Users";
import JobseekerDashboard from "../pages/AllDashboard/JobseekerDashboard/JobseekerDashboard";
import EmployerDashboard from "../pages/AllDashboard/EmployerDashboard/EmployerDashboard";
import JobDetails from "../pages/AllDashboard/SharedComponents/JobDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/admin/users',
                element: <Users/>
            },
            {
                path: '/jobseeker/dashboard',
                element: <JobseekerDashboard/>
            },
            {
                path: '/employer/dashboard',
                element: <EmployerDashboard/>
            },
            {
                path: '/:_id',
                element: <JobDetails/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
        ]
    },
]);