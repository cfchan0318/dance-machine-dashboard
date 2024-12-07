// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import PoseList from "../pages/pose/PoseList";
// import WeekList from '../pages/weeks/WeekList';
// import WeekDetail from '../pages/weeks/WeekDetail';
// import VideoDetail from '../pages/videos/VideoDetail';
// import PostureList from '../pages/postures/PostureList';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            { path: "/poses", element: <PoseList/> },
            //{ path: '/', element: <WeekList /> },
            //{ path: '/weeks/:weekId', element: <WeekDetail /> },
            //{ path: '/weeks/:weekId/videos/:videoId', element: <VideoDetail /> },
            //{ path: '/postures', element: <PostureList /> },
        ],
    },
]);
