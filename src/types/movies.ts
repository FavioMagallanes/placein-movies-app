export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  video: boolean;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
}

export interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Movie[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "IS_LOADING"; payload: boolean }
  | { type: "SET_TOTAL_PAGES"; payload: number };
