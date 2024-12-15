import { configureStore } from '@reduxjs/toolkit'
import poseSlice from './slices/posesSlice'
import videoDetailsSlice from './slices/videoDetailsSlice'
import weekSlice from './slices/weekSlice';
import userSlice from "./slices/usersSlice";

export const store = configureStore({
    reducer: {
        pose: poseSlice,
        videoDetails: videoDetailsSlice,
        week: weekSlice,
        user: userSlice
    }
});