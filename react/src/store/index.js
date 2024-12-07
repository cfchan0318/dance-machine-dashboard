import { configureStore } from '@reduxjs/toolkit'
import poseSlice from './slices/posesSlice'

export const store = configureStore({
    reducer: {
        pose: poseSlice
    }
});