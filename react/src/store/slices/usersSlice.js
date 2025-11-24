import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getToken from "../../utils/token";

export const createUser = createAsyncThunk(
    'User/createUser',
    async (args, { rejectWithValue }) => {
        try {
            const name = args.name;
            const code = args.code;
            await axios.post('/api/user', {
                name: name,
                code: code,
            }, { headers: { Authorization: getToken() } })
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const fetchUserList = createAsyncThunk(
    'User/fetchUserList',
    async () => {
        const response = await axios.get('/api/user');
        return response.data;
    }
)

export const fetchUserById = createAsyncThunk(
    'User/fetchUserById',
    async (id) => {
        const response = await axios.get(`/api/user/${id}`);
        return response.data;
    }
)

export const updateUser = createAsyncThunk(
    'User/updateUser',
    async (args,{rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/user/${args._id}`, args, { headers: { Authorization: getToken() } });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const deleteUser = createAsyncThunk(
    'User/deleteUser',
    async (args) => {
        const response = await axios.delete(`/api/user/${args}`, { headers: { Authorization: getToken() } });
        return response.data;
    }
)


const UserSlice = createSlice({
    name: 'User',
    initialState: {
        UserForm: {
            isLoading: false,
            error: null,
        },
        UserList: {
            items: [],
            isLoading: false,
            error: null,
        },
        User: {
            data: {},
            isLoading: false,
            error: null,
        }
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            //createUser
            .addCase(createUser.pending, (state) => {
                state.UserForm.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.UserForm.isLoading = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.UserForm.isLoading = false;
                state.UserForm.error = action.payload?.error;
            })
            //fetchUserList
            .addCase(fetchUserList.pending, (state) => {
                state.UserList.isLoading = true;
            })
            .addCase(fetchUserList.fulfilled, (state, action) => {
                state.UserList.items = action.payload;
                state.UserList.isLoading = false;
            })
            .addCase(fetchUserList.rejected, (state, action) => {
                state.UserList.isLoading = false;
                state.UserList.error = action.error.message;
            })
            //deleteUser
            .addCase(deleteUser.pending, (state) => {
                state.UserList.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.UserList.isLoading = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.UserList.isLoading = false;
                state.UserList.error = action.error.message;
            })
            //fetchUserById
            .addCase(fetchUserById.pending, (state) => {
                state.User.isLoading = true;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.User.data = action.payload;
                state.User.isLoading = false;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.User.isLoading = false;
                state.User.error = action.error.message;
            })
            //fetchUserById
            .addCase(updateUser.pending, (state) => {
                state.User.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.User.isLoading = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.User.isLoading = false;
                state.UserForm.error = action.payload?.error;
            })
    }

})

export default UserSlice.reducer;