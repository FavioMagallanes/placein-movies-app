import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movie } from "../types/movies";
import axios from "axios";

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null | unknown;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
};

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async () => {
    const response = await axios.get<{ results: Movie[] }>(
      `https://api.themoviedb.org/3/movie/popular?api_key=8f781d70654b5a6f2fa69770d1d115a3`
    );
    return response.data;
  }
);

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query: string) => {
    const response = await axios.get<{ results: Movie[] }>(
      `https://api.themoviedb.org/3/search/movie?api_key=8f781d70654b5a6f2fa69770d1d115a3&query=${query}`
    );
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPopularMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.error = null;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.movies = [];
        state.error = action.error.message || "Error desconocido";
      })
      .addCase(searchMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.error = null;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.movies = [];
        state.error = action.error.message || "Error desconocido";
      });
  },
});

export default moviesSlice.reducer;
