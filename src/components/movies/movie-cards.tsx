import { FC } from "react";
import { Movie } from "../../types/movies";
import { Link } from "react-router-dom";

interface MovieCardsProps {
  movie: Movie;
}

const MovieCards: FC<MovieCardsProps> = ({ movie }) => {
  return (
    <div className="p-4 md:w-1/3">
      <Link
        to={`/detail-movies/${movie.id}`}
        className="block rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg transform hover:scale-105"
        key={movie.id}
      >
        <div className="relative aspect-square">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = "/dont-image.jpg";
            }}
            alt={movie.title}
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
    </div>
  );
};

export default MovieCards;
