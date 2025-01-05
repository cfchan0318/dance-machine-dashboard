// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import PoseList from "../pages/pose/PoseList";
import VideoDetailsList from "../pages/videoDetails/VideoDetailsList";
import VideoDetails from "../pages/videoDetails/VideoDetails";
import ResultList from "../pages/result/ResultList";
import Result from "../pages/result/Result";

import Week from "../pages/week/Week";
import WeekList from "../pages/week/WeekList";

import UserList from "../pages/user/UserList";

import ProtectedRoute from "./protectedRoute";

import Login from "../pages/Login";
import NoPermission from "../pages/NoPermission";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute element={<ResultList />} />,
            }, // Protect the root path
            {
                path: "/results",
                element: <ProtectedRoute element={<ResultList />} />,
            }, // Protect the results path
            {
                path: "/results/:id",
                element: <ProtectedRoute element={<Result />} />,
            }, // Protect the result detail path
            {
                path: "/users",
                element: <ProtectedRoute element={<UserList />} />,
            },
            {
                path: "/poses",
                element: (
                    <ProtectedRoute
                        element={<PoseList />}
                        usernames={["test"]}
                    />
                ),
            },
            {
                path: "/weeks/:id",
                element: (
                    <ProtectedRoute element={<Week />} usernames={["test"]} />
                ),
            },
            {
                path: "/weeks",
                element: (
                    <ProtectedRoute
                        element={<WeekList />}
                        usernames={["test"]}
                    />
                ),
            },
            {
                path: "/videoDetails",
                element: (
                    <ProtectedRoute
                        element={<VideoDetailsList />}
                        usernames={["test"]}
                    />
                ),
            },
            {
                path: "/videoDetails/:id",
                element: (
                    <ProtectedRoute
                        element={<VideoDetails />}
                        usernames={["test"]}
                    />
                ),
            },
            { path: "/login", element: <Login /> }, // Add the login route
            {
                path: "/no-permission",
                element: <NoPermission />,
            },
        ],
    },
    
]);
