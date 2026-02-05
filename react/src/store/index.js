import { configureStore } from '@reduxjs/toolkit'
import poseSlice from './slices/posesSlice'
import videoDetailsSlice from './slices/videoDetailsSlice'
import weekSlice from './slices/weekSlice';
import userSlice from "./slices/usersSlice";
import userGroupSlice from "./slices/userGroupSlice";
import resultSlice from "./slices/resultSlice";
import dashboardUserSlice from "./slices/dashboardUserSlice";
import songSlice from "./slices/songSlice";
import gameLevelSlice from './slices/gameLevelSlice';

export const store = configureStore({
    reducer: {
        pose: poseSlice,
        videoDetails: videoDetailsSlice,
        week: weekSlice,
        user: userSlice,
        userGroup: userGroupSlice,
        result: resultSlice,
        dashboardUser: dashboardUserSlice,
        song: songSlice,
        gameLevels: gameLevelSlice,
    }
});