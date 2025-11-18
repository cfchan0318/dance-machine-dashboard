import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrUpdateDashboardUser = createAsyncThunk('dashboardUser/createOrUpdate', async (params) => {
    const { username, password, userId } = params;

    if (userId) {
        const res = await axios.post(`/api/auth/updateUser/${userId}`, { username, password })
        return res;
    } else {
        const res = await axios.post(`/api/auth/register`, { username, password });
        return res;
    }
})

export const getDashboardUsers = createAsyncThunk('dashboardUser/get', async (params) => {
    const res = await axios.get(`/api/app-user`);
    return res.data
})

const dashboardUserSlice = createSlice({
    name: 'dashboardUser',
    initialState: {
        data: [],
        loading: false,
        error:null,
    },
    reducers: {
        
    }, extraReducers: (builder) => {
        builder
            .addCase(getDashboardUsers.pending, (state) => {
                state.loading = true;
                state.data = [];
                state.error = null;
            })
            .addCase(getDashboardUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getDashboardUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
})

export default dashboardUserSlice.reducer;