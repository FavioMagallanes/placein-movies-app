import { Action, MovieState } from "../../types/movies";

export function movieReducer(state: MovieState, action: Action): MovieState {
  switch (action.type) {
    case "IS_LOADING":
      return { ...state, loading: action.payload };
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, movies: action.payload, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, movies: [], error: action.payload };
    default:
      return state;
  }
}
