import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getToken from '../../utils/token'

export const createWeek = createAsyncThunk(
    'week/createWeek',
    async (args) => {
        const week = args.week;
        const name = args.name;
        await axios.post('/api/week', {
            week: week,
            name: name,
        },{headers:{Authorization:getToken()}})
    }
)

export const fetchWeekList = createAsyncThunk(
    'week/fetchWeekList',
    async () => {
        const response = await axios.get('/api/week');
        return response.data;
    }
)

export const fetchWeekById = createAsyncThunk(
    'week/fetchWeekById',
    async (id) => {
        const response = await axios.get(`/api/week/${id}`);
        return response.data;
    }
)

export const updateWeeek = createAsyncThunk(
    'week/updateWeek',
    async (args) => {
        const response = await axios.put(`/api/week/${args._id}`, args,{headers:{Authorization:getToken()}});
        return response.data;
    }
)

export const deleteWeek = createAsyncThunk(
    'week/deleteWeek',
    async (args) => {
        const response = await axios.delete(`/api/week/${args}`,{headers:{Authorization:getToken()}});
        return response.data;
    }
)


const weekSlice = createSlice({
    name: 'week',
    initialState: {
        weekForm: {
            isLoading: false,
            error: null,
        },
        weekList: {
            items: [],
            isLoading: false,
            error: null,
        },
        week: {
            data: {},
            isLoading: false,
            error: null,
        }
    },
    reducers: {
        addVideo: (state, action) => {
            state.week.data.videos.push(action.payload)
            state.week.data.videos = state.week.data.videos.sort((a, b) => a.order - b.order)
        },
        removeVideo: (state, action) => {
            const index = action.payload - 1;
            state.week.data.videos =
                state.week.data.videos.filter((v, i) => i !== index);
        }
    },
    extraReducers: (builder) => {
        builder
            //createWeek
            .addCase(createWeek.pending, (state) => {
                state.weekForm.isLoading = true;
            })
            .addCase(createWeek.fulfilled, (state, action) => {
                state.weekForm.isLoading = false;
            })
            .addCase(createWeek.rejected, (state, action) => {
                state.weekForm.isLoading = false;
                state.weekForm.error = action.error.message;
            })
            //fetchWeekList
            .addCase(fetchWeekList.pending, (state) => {
                state.weekList.isLoading = true;
            })
            .addCase(fetchWeekList.fulfilled, (state, action) => {
                state.weekList.items = action.payload;
                state.weekList.isLoading = false;
            })
            .addCase(fetchWeekList.rejected, (state, action) => {
                state.weekList.isLoading = false;
                state.weekList.error = action.error.message;
            })
            //deleteWeek
            .addCase(deleteWeek.pending, (state) => {
                state.weekList.isLoading = true;
            })
            .addCase(deleteWeek.fulfilled, (state, action) => {
                state.weekList.isLoading = false;
            })
            .addCase(deleteWeek.rejected, (state, action) => {
                state.weekList.isLoading = false;
                state.weekList.error = action.error.message;
            })
            //fetchWeekById
            .addCase(fetchWeekById.pending, (state) => {
                state.week.isLoading = true;
            })
            .addCase(fetchWeekById.fulfilled, (state, action) => {
                state.week.data = action.payload;
                state.week.isLoading = false;
            })
            .addCase(fetchWeekById.rejected, (state, action) => {
                state.week.isLoading = false;
                state.week.error = action.error.message;
            })
            //fetchWeekById
            .addCase(updateWeeek.pending, (state) => {
                state.week.isLoading = true;
            })
            .addCase(updateWeeek.fulfilled, (state, action) => {
                state.week.isLoading = false;
            })
            .addCase(updateWeeek.rejected, (state, action) => {
                state.week.isLoading = false;
                state.week.error = action.error.message;
            })
    }

})

export const { addVideo, removeVideo } = weekSlice.actions;
export default weekSlice.reducer;