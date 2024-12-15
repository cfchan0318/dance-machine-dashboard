// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import PoseList from "../pages/pose/PoseList";
import VideoDetailsList from "../pages/videoDetails/VideoDetailsList";
import VideoDetails from "../pages/videoDetails/VideoDetails";

import Week from "../pages/week/Week";
import WeekList from "../pages/week/WeekList";

import UserList from "../pages/user/UserList";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            { path: "/users", element: <UserList /> },
            { path: "/poses", element: <PoseList /> },
            { path: "/weeks/:id", element: <Week /> },
            { path: "/weeks", element: <WeekList /> },
            { path: "/videoDetails", element: <VideoDetailsList /> },
            { path: "/videoDetails/:id", element: <VideoDetails /> },
        ],
    },
]);
