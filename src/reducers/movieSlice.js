import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
export const movies_URL = 'http://localhost:3006/movies'
export const user = true;

const initialState = {
    movies: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}
//get one movie
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (initialPost) => {
    const {id} = initialPost
     const response = await axios.get(`${movies_URL}/find/${id}`)
    return response.data
})

//get movie

export const fetchMovie = createAsyncThunk('movies/fetchMovie', async (initialPost) => {
    
    try {
        const res = await axios.get(`${movies_URL}/find/`+ initialPost, {
            headers: {
                token:
                `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
            },
        });
        
        return res.data
      } catch (err) {
        console.log(err);
      }
})


//get random movie
export const getRandomContent = createAsyncThunk('movies/getRandomContent', async (initialPost) => {
    
    try {
        const res = await axios.get(`${movies_URL}/random?type=${initialPost.type}`, {
          headers: {
            token:
              `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
          },
        });
        return res.data[0]
      } catch (err) {
        console.log(err);
      }
})




export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(fetchMovies.pending, (state, action) => {
            state.status = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload
            })
            .addCase(fetchMovies.rejected, (state, action)=>{
                state.status = 'failed';
                state.error=action.error.message
            })
            .addCase(getRandomContent.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.movies = action.payload
            })
            
    }
})






export default moviesSlice.reducer;