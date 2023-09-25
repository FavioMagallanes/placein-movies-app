import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types/movies";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [] as Movie[],
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      state.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state));
    },
    removeFavorite: (state, action: PayloadAction<Movie>) => {
      const movieIndex = state.findIndex(
        movie => movie.id === action.payload.id
      );
      if (movieIndex !== -1) {
        const newState = [
          ...state.slice(0, movieIndex),
          ...state.slice(movieIndex + 1),
        ];
        localStorage.setItem("favorites", JSON.stringify(newState));
        return newState;
      }
      return state;
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
