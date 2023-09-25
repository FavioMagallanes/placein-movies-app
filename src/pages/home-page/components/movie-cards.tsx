import { FC } from "react";
import { Movie } from "../../../types/movies";
import { Link } from "react-router-dom";

interface MovieCardsProps {
  movie: Movie;
}

const MovieCards: FC<MovieCardsProps> = ({ movie }) => {
  return (
    <div className="p-4 sm:block md:w-1/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {movie.poster_path === null ? (
        <div className="block rounded-lg overflow-hidden">
          <div className="relative aspect-square hover:cursor-not-allowed pointer-events-none border border-gray-50 border-opacity-10">
            <p>
              <span className="absolute top-0 right-0 px-4 py-2 text-white font-bold text-lg">
                Movie not found
              </span>
            </p>
          </div>
        </div>
      ) : (
        <Link
          to={`/detail-movies/${movie.id}`}
          className="block rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg transform hover:scale-105 "
          key={movie.id}
        >
          <div className="relative aspect-square ">
            <img
              className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
              src={
                !movie.poster_path
                  ? "/src/assets/dont-image.jpg"
                  : `https://image.tmdb.org/t/p/original${movie.poster_path}`
              }
              alt={!movie.poster_path ? "Image not found" : `${movie.title}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            <h1 className="absolute bottom-0 left-0 right-0 px-4 py-2 text-white font-bold text-lg">
              {movie.title}
            </h1>
            <p>
              <span className="absolute top-0 right-0 px-4 py-2 text-white font-bold text-lg">
                {movie.release_date}
              </span>
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default MovieCards;
