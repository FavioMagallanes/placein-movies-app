import { useMovieContext } from "../../context/movies/movies-context";
import MovieCards from "./movie-cards";

export const MoviesList = () => {
  const { state } = useMovieContext();
  const isLoading = state.loading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap -m-5">
      {state.movies.map(movie => (
        <MovieCards key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
