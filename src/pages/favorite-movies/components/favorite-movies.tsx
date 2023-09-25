import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { removeFavorite } from "../../../redux/favorites-slice";
import { Movie } from "../../../types/movies";

export const FavoriteMovies = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);

  const handleRemoveFavorite = (movieId: number) => {
    const movie = {
      id: movieId,
      title: "",
      overview: "",
      release_date: "",
      poster_path: "",
    } as Movie;
    dispatch(removeFavorite(movie));
  };

  return (
    <div className="container mx-auto mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map(movie => (
          <div
            className="bg-transparent rounded-lg overflow-hidden shadow-md border border-gray-50 border-opacity-10"
            key={movie.id}
          >
            <img
              className="h-48 w-full object-cover object-center"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt="content"
            />
            <div className="p-4">
              <h3 className="text-gray-600 font-bold text-base mb-2 tracking-tight">
                {movie.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {movie.overview.slice(0, 100)}
              </p>
              <button
                onClick={() => handleRemoveFavorite(movie.id)}
                className="text-red-600 text-xs font-medium hover:text-red-500 transition-colors duration-300 mt-2 flex items-center"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
