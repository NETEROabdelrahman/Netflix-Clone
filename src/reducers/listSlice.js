import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
export const LISTS_URL = 'http://localhost:3006/list'
export const user = true;

const initialState = {
    lists: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchlists = createAsyncThunk('lists/fetchlists', async (initialPost) => {
    
    let { type, genre } = initialPost;
    if (!type) {
        genre=undefined
    }
    const response = await axios.get(`${LISTS_URL}${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""
        }`, {
            
        headers: {
            token:
            `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        },
    }
    )
    
    return response.data
});


export const listsSlice = createSlice({
    name: 'lists',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(fetchlists.pending, (state, action) => {
            state.status = 'loading';
            })
            .addCase(fetchlists.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.lists = action.payload
            })
            .addCase(fetchlists.rejected, (state, action)=>{
                state.status = 'failed';
                state.error=action.error.message
            })
            
    }
})






export default listsSlice.reducer;