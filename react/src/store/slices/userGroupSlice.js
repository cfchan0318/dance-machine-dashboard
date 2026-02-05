import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getToken from "../../utils/token";

export const createUserGroup = createAsyncThunk(
    'UserGroup/createUserGroup',
    async (args, { rejectWithValue }) => {
        try {
            const { name, description } = args;
            await axios.post('/api/user-group', {
                name,
                description,
            }, { headers: { Authorization: getToken() } })
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const fetchUserGroupList = createAsyncThunk(
    'UserGroup/fetchUserGroupList',
    async () => {
        const response = await axios.get('/api/user-group');
        return response.data;
    }
)

export const fetchUserGroupById = createAsyncThunk(
    'UserGroup/fetchUserGroupById',
    async (id) => {
        const response = await axios.get(`/api/user-group/${id}`);
        return response.data;
    }
)

export const updateUserGroup = createAsyncThunk(
    'UserGroup/updateUserGroup',
    async (args, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/user-group/${args._id}`, args, { headers: { Authorization: getToken() } });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const deleteUserGroup = createAsyncThunk(
    'UserGroup/deleteUserGroup',
    async (args) => {
        const response = await axios.delete(`/api/user-group/${args}`, { headers: { Authorization: getToken() } });
        return response.data;
    }
)

const UserGroupSlice = createSlice({
    name: 'UserGroup',
    initialState: {
        UserGroupForm: {
            isLoading: false,
            error: null,
        },
        UserGroupList: {
            items: [],
            isLoading: false,
            error: null,
        },
        UserGroup: {
            data: {},
            isLoading: false,
            error: null,
        }
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            //createUserGroup
            .addCase(createUserGroup.pending, (state) => {
                state.UserGroupForm.isLoading = true;
            })
            .addCase(createUserGroup.fulfilled, (state, action) => {
                state.UserGroupForm.isLoading = false;
            })
            .addCase(createUserGroup.rejected, (state, action) => {
                state.UserGroupForm.isLoading = false;
                state.UserGroupForm.error = action.payload?.error;
            })
            //fetchUserGroupList
            .addCase(fetchUserGroupList.pending, (state) => {
                state.UserGroupList.isLoading = true;
            })
            .addCase(fetchUserGroupList.fulfilled, (state, action) => {
                state.UserGroupList.items = action.payload;
                state.UserGroupList.isLoading = false;
            })
            .addCase(fetchUserGroupList.rejected, (state, action) => {
                state.UserGroupList.isLoading = false;
                state.UserGroupList.error = action.error.message;
            })
            //fetchUserGroupById
            .addCase(fetchUserGroupById.pending, (state) => {
                state.UserGroup.isLoading = true;
            })
            .addCase(fetchUserGroupById.fulfilled, (state, action) => {
                state.UserGroup.data = action.payload;
                state.UserGroup.isLoading = false;
            })
            .addCase(fetchUserGroupById.rejected, (state, action) => {
                state.UserGroup.isLoading = false;
                state.UserGroup.error = action.error.message;
            })
            //updateUserGroup
            .addCase(updateUserGroup.pending, (state) => {
                state.UserGroupForm.isLoading = true;
            })
            .addCase(updateUserGroup.fulfilled, (state, action) => {
                state.UserGroupForm.isLoading = false;
            })
            .addCase(updateUserGroup.rejected, (state, action) => {
                state.UserGroupForm.isLoading = false;
                state.UserGroupForm.error = action.payload?.error;
            })
            //deleteUserGroup
            .addCase(deleteUserGroup.pending, (state) => {
                state.UserGroupList.isLoading = true;
            })
            .addCase(deleteUserGroup.fulfilled, (state, action) => {
                state.UserGroupList.isLoading = false;
            })
            .addCase(deleteUserGroup.rejected, (state, action) => {
                state.UserGroupList.isLoading = false;
                state.UserGroupList.error = action.error.message;
            })

    }
})

export default UserGroupSlice.reducer;
