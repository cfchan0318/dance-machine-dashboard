import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchResultList = createAsyncThunk(
    'result/fetchResultList',
    async (args) => {
        const { pagination, userId } = args;
        
        let params = {
            page: pagination.current,
            limit: pagination.pageSize,
            userId: userId,
        }

        const response = await axios.get('/api/result',{params:params});
        let data = response.data
        data.data = data.data.map(row => ({_id: row._id, ...row.json}))
        return data;
    }
)

export const fetchResultById = createAsyncThunk(
    'result/fetchResultById',
    async (id) => {
        const response = await axios.get(`/api/result/${id}`);
        let data = response.data
        data = {_id: data._id, ...data.json}
        return data;
    }
)

const resultSlice = createSlice({
    name: 'result',
    initialState: {
        resultList: {
            items: [],
            isLoading: false,
            total: 0,
            error: null,
        },
        result: {
            data: {},
            isLoading: false,
            error: null,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetchResultList
            .addCase(fetchResultList.pending, (state) => {
                state.resultList.isLoading = true;
                state.resultList.total = 0;
            })
            .addCase(fetchResultList.fulfilled, (state, action) => {
                state.resultList.items = action.payload.data;
                state.resultList.isLoading = false;
                state.resultList.total = action.payload.total;
            })
            .addCase(fetchResultList.rejected, (state, action) => {
                state.resultList.isLoading = false;
                state.resultList.error = action.error.message;
                state.resultList.total = 0;
            })
            
            //fetchResultById
            .addCase(fetchResultById.pending, (state) => {
                state.result.isLoading = true;
            })
            .addCase(fetchResultById.fulfilled, (state, action) => {
                state.result.data = action.payload;
                state.result.isLoading = false;
            })
            .addCase(fetchResultById.rejected, (state, action) => {
                state.result.isLoading = false;
                state.result.error = action.error.message;
            })
          
    }

})


export default resultSlice.reducer;