// store.ts
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import { Movie } from "../types/movies";

const defaultState: Movie[] = [];

const persistedState = localStorage.getItem("favorites");
const initialState = persistedState ? JSON.parse(persistedState) : defaultState;

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: initialState,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
