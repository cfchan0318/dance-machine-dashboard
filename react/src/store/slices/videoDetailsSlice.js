import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getToken from '../../utils/token'

export const createVideoDetails = createAsyncThunk(
    'videoDetails/createVideoDetails',
    async (args) => {
        const data = {
            title: args.title,
            video_src: args.video_src,
            showCamera: args.showCamera,
        }

        const response = await axios.post('/api/videoDetails', data, { headers: { Authorization: getToken() } });
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

export const fetchVideoDetailsById = createAsyncThunk(
    'videoDetails/fetchVideoDetailsById',
    async (id) => {
        const response = await axios.get(`/api/videoDetails/${id}`)
        return response.data;
    }
)

export const fetchAllPose = createAsyncThunk(
    'videoDetails/fetchAllPose',
    async () => {
        const response = await axios.get(`/api/pose`)
        return response.data;
    }
)

export const updateVideoDetails = createAsyncThunk(
    'videoDetails/updateVideoDetails',
    async (args) => {
        const response = await axios.put(`/api/videoDetails/${args.id}`, args.data, { headers: { Authorization: getToken() } })
        return response.data;
    }
)

export const deleteVideoDetails = createAsyncThunk(
    'videoDetails/deleteVideoDetails',
    async (args) => {
        await axios.delete(`/api/videoDetails/${args}`, { headers: { Authorization: getToken() } })
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
        },
        videoDetails: {
            isLoading: false,
            poses: [],
            data: {}
        }
    },
    reducers: {
        addPoseChallenge: (state, action) => {
            state.videoDetails.data.poseChallenges?.push(action.payload);
        },
        deletePoseChallenge: (state, action) => {
            state.videoDetails.data.poseChallenges = state.videoDetails.data.poseChallenges?.filter(i => i.timestamp !== action.payload);
        },
        addVoiceChallenge: (state, action) => {
            state.videoDetails.data.voiceChallenges?.push(action.payload);
        },
        deleteVoiceChallenge: (state, action) => {
            state.videoDetails.data.voiceChallenges = state.videoDetails.data.voiceChallenges?.filter(i => i.timestamp !== action.payload);
        },

    },
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


            .addCase(fetchVideoDetailsById.pending, (state, action) => {
                state.videoDetails.isLoading = true;

            })
            .addCase(fetchVideoDetailsById.fulfilled, (state, action) => {
                state.videoDetails.isLoading = false;
                state.videoDetails.data = action.payload;
            })
            .addCase(fetchVideoDetailsById.rejected, (state, action) => {
                state.videoDetails.isLoading = false;
            })

            .addCase(fetchAllPose.pending, (state, action) => {
                state.videoDetails.isLoading = true;

            })
            .addCase(fetchAllPose.fulfilled, (state, action) => {
                state.videoDetails.isLoading = false;
                state.videoDetails.poses = action.payload;
            })
            .addCase(fetchAllPose.rejected, (state, action) => {
                state.videoDetails.isLoading = false;
            })

            .addCase(updateVideoDetails.pending, (state, action) => {
                state.videoDetails.isLoading = true;

            })
            .addCase(updateVideoDetails.fulfilled, (state, action) => {
                state.videoDetails.isLoading = false;
            })
            .addCase(updateVideoDetails.rejected, (state, action) => {
                state.videoDetails.isLoading = false;
            })

            .addCase(deleteVideoDetails.pending, (state, action) => {
                state.videoDetails.isLoading = true;

            })
            .addCase(deleteVideoDetails.fulfilled, (state, action) => {
                state.videoDetails.isLoading = false;
            })
            .addCase(deleteVideoDetails.rejected, (state, action) => {
                state.videoDetails.isLoading = false;
            })
    }
});

export const { addPoseChallenge, addVoiceChallenge, deletePoseChallenge, deleteVoiceChallenge } = videoDetailsSlice.actions;
export default videoDetailsSlice.reducer;