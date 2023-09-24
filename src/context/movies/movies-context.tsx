import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { movieReducer } from "../reducers/movies-reducer";
import { Action, Movie, MovieState } from "../../types/movies";
import axios from "axios";
import { toast } from "sonner";

interface MovieContextType {
  state: MovieState;
  dispatch: React.Dispatch<Action>;
  searchMovies: (query: string) => Promise<Movie[]>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

const API_KEY = "8f781d70654b5a6f2fa69770d1d115a3";
const BASE_URL = "https://api.themoviedb.org/3/";

export function MovieProvider({ children }: MovieProviderProps) {
  const [state, dispatch] = useReducer(movieReducer, {
    movies: [],
    loading: false,
    error: null,
  });

  const fetchPopularMovies = async () => {
    dispatch({ type: "FETCH_START" });
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const { data } = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`
      );
      dispatch({ type: "FETCH_SUCCESS", payload: data.results });
      dispatch({ type: "IS_LOADING", payload: false });
      return data.results;
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch({ type: "FETCH_ERROR", payload: errorMessage });
      dispatch({ type: "IS_LOADING", payload: false });
      toast.error("An error has occurred, please try again ");

      return [];
    }
  };

  const searchMovies = async (query: string = ""): Promise<Movie[]> => {
    dispatch({ type: "FETCH_START" });
    dispatch({ type: "IS_LOADING", payload: true });

    try {
      let url;
      if (query) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
      } else {
        url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
      }

      const { data } = await axios.get(url);
      dispatch({ type: "FETCH_SUCCESS", payload: data.results });
      dispatch({ type: "IS_LOADING", payload: false });

      return data.results;
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch({ type: "FETCH_ERROR", payload: errorMessage });
      dispatch({ type: "IS_LOADING", payload: false });
      toast.error("An error has occurred, please try again ");
      return [];
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const contextValue = { state, dispatch, searchMovies };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error(
      "useMovieContext debe ser usado dentro de un MovieProvider"
    );
  }
  return context;
}
