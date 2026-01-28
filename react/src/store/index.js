import { configureStore } from '@reduxjs/toolkit'
import poseSlice from './slices/posesSlice'
import videoDetailsSlice from './slices/videoDetailsSlice'
import weekSlice from './slices/weekSlice';
import userSlice from "./slices/usersSlice";
import resultSlice from "./slices/resultSlice";
import dashboardUserSlice from "./slices/dashboardUserSlice";
import songSlice from "./slices/songSlice";

export const store = configureStore({
    reducer: {
        pose: poseSlice,
        videoDetails: videoDetailsSlice,
        week: weekSlice,
        user: userSlice,
        result: resultSlice,
        dashboardUser: dashboardUserSlice,
        song: songSlice,
    }
});