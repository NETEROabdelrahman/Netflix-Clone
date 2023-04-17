import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


const USERS_URL = 'http://localhost:3006/auth'
let accessToken;
if (localStorage.getItem("user") === "undefined") {
    accessToken = []
} else {
    accessToken =  JSON.parse(localStorage.getItem("user"))
   
}


const initialState = {
    users: accessToken||[],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

//fetch all users
export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', async () => {
    
    const response = await axios.get(`${USERS_URL}`, {
        headers: {
            token:`bearer ${JSON.parse(localStorage.getItem("user")).token}`
        }
    })
    return response.data
})
export const signUp = createAsyncThunk('users/signUp', async (initialPost) => {
    const response = await axios.post(`${USERS_URL}/register`, initialPost)
    
    return response.data
})

export const login = createAsyncThunk('users/login', async (initialPost) => {
    const response = await axios.post(`${USERS_URL}/login`, initialPost)
    
    return response.data
})

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(fetchAllUsers.pending, (state, action) => {
            state.status = 'loading';
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload
            })
            .addCase(fetchAllUsers.rejected, (state, action)=>{
                state.status = 'failed';
                state.error=action.error.message
            })
            .addCase(signUp.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.users = action.payload
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.users = action.payload
                localStorage.setItem("user",JSON.stringify(action.payload))
            })
    }
})






export default usersSlice.reducer;