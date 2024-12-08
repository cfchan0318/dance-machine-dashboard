import { configureStore } from '@reduxjs/toolkit'
import poseSlice from './slices/posesSlice'
import videoDetailsSlice from './slices/videoDetailsSlice'

export const store = configureStore({
    reducer: {
        pose: poseSlice,
        videoDetails: videoDetailsSlice
    }
});