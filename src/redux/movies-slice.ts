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
      `${import.meta.env.VITE_BASE_URL}/movie/popular?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-EN&page=1`
    );
    return response.data;
  }
);

export const fetchMoreMovies = createAsyncThunk(
  "movies/fetchMoreMovies",
  async (page: number) => {
    const response = await axios.get<{ results: Movie[] }>(
      `${import.meta.env.VITE_BASE_URL}/movie/popular?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-EN&page=${page}`
    );
    return response.data;
  }
);

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query: string) => {
    const response = await axios.get<{ results: Movie[] }>(
      `${import.meta.env.VITE_BASE_URL}/search/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&query=${query}`
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
      .addCase(fetchMoreMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoreMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = [...state.movies, ...action.payload.results];
        state.error = null;
      })
      .addCase(fetchMoreMovies.rejected, (state, action) => {
        state.loading = false;
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
