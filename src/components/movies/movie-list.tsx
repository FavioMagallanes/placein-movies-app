import { useSelector } from "react-redux";
import MovieCards from "./movie-cards";
import { RootState, useAppDispatch } from "../../redux/store";
import { Movie } from "../../types/movies";
import { useEffect } from "react";
import { fetchPopularMovies } from "../../redux/movies-slice";
import { Spinner } from "@material-tailwind/react";

export const MoviesList = () => {
  const dispatch = useAppDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const loading = useSelector((state: RootState) => state.movies.loading);
  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="md:flex md:flex-wrap ">
      {movies.map((movie: Movie) => (
        <MovieCards key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
