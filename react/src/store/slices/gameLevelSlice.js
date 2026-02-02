import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getToken from "../../utils/token";

export const createGameLevel = createAsyncThunk(
    'gameLevels/createGameLevel',
    async (args) => {
        const { songId, name } = args;
        const response = await axios.post(
            `/api/song/${songId}/level`,
            { name },
            {
                headers: {
                    Authorization: getToken()
                }
            }
        )
        return response.data;
    }
)

export const getGameLevels = createAsyncThunk(
    'gameLevels/getGameLevels',
    async ({ songId }) => {
        const response = await axios.get(
            `/api/song/${songId}/level`,
        )
        return response.data;
    }
)

export const getGameLevelById = createAsyncThunk(
    'gameLevels/getGameLevelById',
    async ({ songId, levelId }) => {
        const response = await axios.get(
            `/api/song/${songId}/level/${levelId}`,
        )
        response.data.videos = response.data.videos.map((video, i) => {
            return { rowId: i, ...video }
        })
        return response.data;

    }
)

export const updateGameLevel = createAsyncThunk(
    'gameLevels/updategameLevels',
    async (args) => {
        const { songId, _id} = args;
        const response = await axios.put(
            `/api/song/${songId}/level/${_id}`,
            args,
            {
                headers: {
                    Authorization: getToken()
                }
            }
        )
        return response.data;
    }
)

export const deleteGameLevel = createAsyncThunk(
    'gameLevels/deleteGameLevel',
    async (args) => {
        const { songId, levelId} = args;
        await axios.delete(
            `/api/song/${songId}/level/${levelId}`,
            {
                headers: {
                    Authorization: getToken()
                }
            }
        )
        return levelId;
    }
)

const gameLevelSlice = createSlice({
    name: 'gameLevels',
    initialState: {
        gameLevelForm: {
            loading: false,
            error: null,
        },
        gameLevelDropdown: {
            levels: [],
            loading: false,
            error: null,
        },
        level: {
            data: {},
            isLoading: false,
            error: null,
        }
    },
    reducers: {
        addVideo: (state, action) => {
            state.level.data.videos.push(action.payload)
            state.level.data.videos = state.level.data.videos.sort((a, b) => a.order - b.order)
        },
        removeVideo: (state, action) => {
            const index = action.payload - 1;
            state.level.data.videos =
                state.level.data.videos.filter((v, i) => i !== index);
        },
        toggleShowCamera: (state, action) => {
            const rowId = action.payload;
            state.level.data.videos = state.level.data.videos.map(row => row.rowId === rowId ? { ...row, showCamera: !row.showCamera } : row);
        },
        toggleShowSessionResult: (state, action) => {
            const rowId = action.payload;
            state.level.data.videos = state.level.data.videos.map(row => row.rowId === rowId ? { ...row, showSessionResult: !row.showSessionResult } : row);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGameLevel.pending, (state) => {
                state.gameLevelForm.loading = true;
            })
            .addCase(createGameLevel.fulfilled, (state, action) => {
                state.gameLevelForm.loading = false;
                state.gameLevelDropdown.levels.push(action.payload);
            })
            .addCase(createGameLevel.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(getGameLevels.pending, (state) => {
                state.gameLevelDropdown.loading = true;
            })
            .addCase(getGameLevels.fulfilled, (state, action) => {
                state.gameLevelDropdown.loading = false;
                state.gameLevelDropdown.levels = action.payload;
            })
            .addCase(getGameLevels.rejected, (state, action) => {
                state.gameLevelDropdown.loading = false;
                state.error = action.error.message;
            })
            //fetchWeekById
            .addCase(getGameLevelById.pending, (state) => {
                state.level.isLoading = true;
            })
            .addCase(getGameLevelById.fulfilled, (state, action) => {
                state.level.data = action.payload;
                state.level.isLoading = false;
            })
            .addCase(getGameLevelById.rejected, (state, action) => {
                state.level.isLoading = false;
                state.level.error = action.error.message;
            })
            //updateWeeek
            .addCase(updateGameLevel.pending, (state) => {
                state.level.isLoading = true;
            })
            .addCase(updateGameLevel.fulfilled, (state, action) => {
                state.level.isLoading = false;
            })
            .addCase(updateGameLevel.rejected, (state, action) => {
                state.level.isLoading = false;
                state.level.error = action.error.message;
            })
            //deleteGameLevel
            .addCase(deleteGameLevel.pending, (state) => {
                state.gameLevelDropdown.isLoading = true;
            })
            .addCase(deleteGameLevel.fulfilled, (state, action) => {
                state.gameLevelDropdown.isLoading = false;
                state.gameLevelDropdown.levels = state.gameLevelDropdown.levels.filter(i => i._id !== action.payload);
            })
            .addCase(deleteGameLevel.rejected, (state, action) => {
                state.gameLevelDropdown.isLoading = false;
                state.gameLevelDropdown.error = action.error.message;
            })
    }
})

export const { addVideo, removeVideo, toggleShowCamera, toggleShowSessionResult } = gameLevelSlice.actions;
export default gameLevelSlice.reducer;