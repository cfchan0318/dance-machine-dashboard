import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import getToken from "../../utils/token";

export const fetchPose = createAsyncThunk(
    'pose/fetchPose',
    async () => {
        const response = await axios.get('/api/pose');
        return response.data;
    }
);

export const removePose = createAsyncThunk(
    'pose/removePose',
    async (id) => {
        await axios.delete(`/api/pose/${id}`,{headers:{Authorization:getToken()}})
        return id
    }
)


export const createPose = createAsyncThunk(
    'pose/createPose',
    async (args) => {
        const form = new FormData();
        form.append('image', args.image.file);
        form.append('pose', args.pose);

        const response = await axios.post('/api/pose', form, {headers:{Authorization:getToken()}})
        return response.data;
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
                state.loading = true;
                state.isCreateSuccess = null;
            })
            .addCase(createPose.fulfilled, (state, action) => {
                state.isCreateSuccess = true;
                state.loading = false;
                action.payload._id = action.payload._id.toString();
                state.items.push(action.payload);
            })
            .addCase(createPose.rejected, (state) => {
                state.loading = false;
                state.isCreateSuccess = false;
            })
            .addCase(removePose.pending, (state) => {
                state.loading = true;
            })
            .addCase(removePose.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(item => {
                    return item._id !== action.payload
                })

            })
            .addCase(removePose.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default poseSlice.reducer;