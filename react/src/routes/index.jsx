// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import AuthLayout from "../components/layout/AuthLayout";

import PoseList from "../pages/pose/PoseList";
import VideoDetailsList from "../pages/videoDetails/VideoDetailsList";
import VideoDetails from "../pages/videoDetails/VideoDetails";
import UserResultList from "../pages/result/USerResultList";
import ResultListing from "../pages/result/ResultListing";
import Result from "../pages/result/Result";

import Week from "../pages/week/Week";
import WeekList from "../pages/week/WeekList";

import SongList from "../pages/song/SongList";
import SongDetails from "../pages/song/SongDetails";

import UserList from "../pages/user/UserList";
import UserGroupList from "../pages/userGroup/UserGroupList";

import DashboardUser from "../pages/dashboardUser/DashboardUser";

import ProtectedRoute from "./protectedRoute";

import Login from "../pages/Login";
import NoPermission from "../pages/NoPermission";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    }, // Add the login route
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute element={<ResultListing />} />,
            }, // Protect the root path
            {
                path: "/results",
                element: <ProtectedRoute element={<ResultListing />} />,
            }, // Protect the results path
            {
                path: "/results-by-user/:id",
                element: <ProtectedRoute element={<UserResultList />} />,
            }, // Protect the result detail path
            {
                path: "/results/:id",
                element: <ProtectedRoute element={<Result />} />,
            }, // Protect the result detail path
            {
                path: "/users",
                element: <ProtectedRoute element={<UserList />} />,
            },
            {
                path: "/user-groups",
                element: <ProtectedRoute element={<UserGroupList />} />,
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
                path: "/songs",
                element: (
                    <ProtectedRoute
                        element={<SongList />}
                        usernames={["test"]}
                    />
                ),
            },
            {
                path: "/songs/:songId",
                element: (
                    <ProtectedRoute
                        element={<SongDetails />}
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
            {
                path: "/dashboard-user",
                element: (
                    <ProtectedRoute
                        element={<DashboardUser />}
                        usernames={["test"]}
                    />
                ),
            },
            {
                path: "/no-permission",
                element: <NoPermission />,
            },
        ],
    },
]);
