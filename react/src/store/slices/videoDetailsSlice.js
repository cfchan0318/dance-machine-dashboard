import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const createVideoDetails = createAsyncThunk(
    'videoDetails/createVideoDetails',
    async (args) => {
        const data = {
            title: args.title,
            video_src: args.video_src,
            showCamera: args.showCamera,
        }

        const response = await axios.post('/api/videoDetails', data);
        return response.data;

    }
)

export const fetchVideoDetailsList = createAsyncThunk(
    'videoDetails/fetchVideoDetailsList',
    async () => {
        const response = await axios.get('/api/videoDetails');
        return response.data;
    }
)

const videoDetailsSlice = createSlice({
    name: 'videoDetails',
    initialState: {
        videoDetailsForm: {
            isLoading: false,
            error: null,
        },
        videoDetailsList: {
            items: [],
            isLoading: false,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createVideoDetails.pending, (state, action) => {
                state.videoDetailsForm.isLoading = true;
            })
            .addCase(createVideoDetails.fulfilled, (state, action) => {
                state.videoDetailsForm.isLoading = false;
            })
            .addCase(createVideoDetails.rejected, (state, action) => {
                state.videoDetailsForm.isLoading = false;
            })
        
            .addCase(fetchVideoDetailsList.pending, (state, action) => {
                state.videoDetailsList.isLoading = true;
                
            })
            .addCase(fetchVideoDetailsList.fulfilled, (state, action) => {
                state.videoDetailsList.isLoading = false;
                state.videoDetailsList.items = action.payload;
            })
            .addCase(fetchVideoDetailsList.rejected, (state, action) => {
                state.videoDetailsList.isLoading = false;
            })
    }
});

export default videoDetailsSlice.reducer;