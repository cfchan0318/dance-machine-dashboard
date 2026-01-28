import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getToken from '../../utils/token'

export const createSong = createAsyncThunk(
    'song/createSong',
    async (formData) => {
        const response = await axios.post('/api/song', formData, {
            headers: {
                Authorization: getToken(),
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    }
)

export const fetchSongList = createAsyncThunk(
    'song/fetchSongList',
    async () => {
        const response = await axios.get('/api/song');
        return response.data;
    }
)

export const fetchSongById = createAsyncThunk(
    'song/fetchSongById',
    async (id) => {
        const response = await axios.get(`/api/song/${id}`);
        return response.data;
    }
)

export const updateSong = createAsyncThunk(
    'song/updateSong',
    async ({ id, formData }) => {
        const response = await axios.put(`/api/song/${id}`, formData, {
            headers: {
                Authorization: getToken(),
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    }
)

export const deleteSong = createAsyncThunk(
    'song/deleteSong',
    async (id) => {
        const response = await axios.delete(`/api/song/${id}`, {
            headers: { Authorization: getToken() }
        });
        return response.data;
    }
)

const songSlice = createSlice({
    name: 'song',
    initialState: {
        songForm: {
            isLoading: false,
            error: null,
        },
        songList: {
            items: [],
            isLoading: false,
            error: null,
        },
        song: {
            data: {},
            isLoading: false,
            error: null,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // createSong
            .addCase(createSong.pending, (state) => {
                state.songForm.isLoading = true;
            })
            .addCase(createSong.fulfilled, (state, action) => {
                state.songForm.isLoading = false;
                state.songList.items.push(action.payload);
            })
            .addCase(createSong.rejected, (state, action) => {
                state.songForm.isLoading = false;
                state.songForm.error = action.error.message;
            })
            // fetchSongList
            .addCase(fetchSongList.pending, (state) => {
                state.songList.isLoading = true;
            })
            .addCase(fetchSongList.fulfilled, (state, action) => {
                state.songList.items = action.payload;
                state.songList.isLoading = false;
            })
            .addCase(fetchSongList.rejected, (state, action) => {
                state.songList.isLoading = false;
                state.songList.error = action.error.message;
            })
            // deleteSong
            .addCase(deleteSong.pending, (state) => {
                state.songList.isLoading = true;
            })
            .addCase(deleteSong.fulfilled, (state, action) => {
                state.songList.isLoading = false;
            })
            .addCase(deleteSong.rejected, (state, action) => {
                state.songList.isLoading = false;
                state.songList.error = action.error.message;
            })
            // fetchSongById
            .addCase(fetchSongById.pending, (state) => {
                state.song.isLoading = true;
            })
            .addCase(fetchSongById.fulfilled, (state, action) => {
                state.song.data = action.payload;
                state.song.isLoading = false;
            })
            .addCase(fetchSongById.rejected, (state, action) => {
                state.song.isLoading = false;
                state.song.error = action.error.message;
            })
            // updateSong
            .addCase(updateSong.pending, (state) => {
                state.song.isLoading = true;
            })
            .addCase(updateSong.fulfilled, (state, action) => {
                state.song.isLoading = false;
                const index = state.songList.items.findIndex(row => row._id === action.payload._id);
                if (index !== -1) {
                    state.songList.items[index] = action.payload;
                }
            })
            .addCase(updateSong.rejected, (state, action) => {
                state.song.isLoading = false;
                state.song.error = action.error.message;
            })
    }
});

export default songSlice.reducer;
