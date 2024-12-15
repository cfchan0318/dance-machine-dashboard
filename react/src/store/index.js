import { configureStore } from '@reduxjs/toolkit'
import poseSlice from './slices/posesSlice'
import videoDetailsSlice from './slices/videoDetailsSlice'
import weekSlice from './slices/weekSlice';

export const store = configureStore({
    reducer: {
        pose: poseSlice,
        videoDetails: videoDetailsSlice,
        week:weekSlice,
    }
});