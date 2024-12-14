import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import JobDetails from "../components/JobDetails";
import AllJobs from "../pages/AllJobs";
import JobApply from "../components/JobApply";
import AddJobs from "../pages/AddJobs";
import MyApplication from "../pages/MyApplication";
import MyJobs from "../pages/MyJobs";
import ReviewApplication from "../components/ReviewApplication";
import Update from "../components/Update";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/jobApply/:id",
        element: (
          <PrivateRoute>
            <JobApply></JobApply>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-jobs",
        element: (
          <PrivateRoute>
            <AddJobs></AddJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-applications",
        element: (
          <PrivateRoute>
            <MyApplication></MyApplication>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <PrivateRoute>
            <MyJobs></MyJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-jobs/:id",
        element: (
          <PrivateRoute>
            <ReviewApplication></ReviewApplication>
          </PrivateRoute>
        ),
      },
      {
        path: "/jobs/update/:id",
        element: (
          <PrivateRoute>
            <Update></Update>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/${params.id}`),
      },
      {
        path: "/jobs",
        element: <AllJobs></AllJobs>,
        loader: () => fetch("http://localhost:5000/jobs"),
      },
      {
        path: "/jobDetails/:id",
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/${params.id}`),
      },
    ],
  },
]);

export default router;
