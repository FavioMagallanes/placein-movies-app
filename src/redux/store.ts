import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import favoritesReducer from "./favorites-slice";
import moviesReducer from "./movies-slice";
import { Movie } from "../types/movies";

const defaultState: Movie[] = [];

const persistedState = localStorage.getItem("favorites");
const initialState = persistedState ? JSON.parse(persistedState) : defaultState;

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
  },

  preloadedState: {
    favorites: initialState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
