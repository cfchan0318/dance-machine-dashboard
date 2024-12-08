// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import PoseList from "../pages/pose/PoseList";
import VideoDetailsList from "../pages/videoDetails/VideoDetailsList";
import VideoDetails from "../pages/videoDetails/VideoDetails";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            { path: "/poses", element: <PoseList /> },
            { path: "/videoDetails", element: <VideoDetailsList /> },
            { path: "/videoDetails/:id", element: <VideoDetails /> },
            
        ],
    },
]);
