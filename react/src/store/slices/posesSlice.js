import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchPose = createAsyncThunk(
    'pose/fetchPose',
    async () => {
        const response = await axios.get('/api/pose');
        return response.data;
    }
);

export const createPose = createAsyncThunk(
    'pose/createPose',
    async (args) => {
        const form = new FormData();
        form.append('image', args.image.file);
        form.append('pose', args.pose);

        axios.post('/api/pose', form)
    }
)

const poseSlice = createSlice({
    name: 'pose',
    initialState: {
        items: [],
        loading: false,
        error: null,
        isCreateSuccess: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPose.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPose.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchPose.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createPose.pending, (state) => {
                state.isCreateSuccess = null;
            })
            .addCase(createPose.fulfilled, (state) => {
                state.isCreateSuccess = true;
            })
            .addCase(createPose.rejected, (state) => {
                state.isCreateSuccess = false;
            });
    }
})

export default poseSlice.reducer;