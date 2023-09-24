import { FC } from "react";

import { Movie } from "../../types/movies";
import { IconCalendarEvent, IconHeartFilled } from "@tabler/icons-react";
import { voteColor } from "../../utils/utils";

interface MovieCardsProps {
  movie: Movie;
}

const MovieCards: FC<MovieCardsProps> = ({ movie }) => {
  return (
    <div className="p-4 md:w-1/3">
      <div
        className="h-full rounded-lg overflow-hidden bg-[#0B1021] cursor-pointer"
        key={movie.id}
      >
        <img
          className="lg:h-48 md:h-36 w-full object-scale-down object-center aspect-square rounded-b-sm"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = "/dont-image.jpg";
          }}
          alt={movie.title}
        />
        <div className="p-6">
          <h1 className="title-font text-sm font-semibold text-gray-400 tracking-tighter mb-3">
            {movie.title}
          </h1>

          <div className="flex items-center flex-wrap ">
            <span className="text-gray-400 inline-flex items-center leading-none text-xs mr-3 py-1 ">
              <IconCalendarEvent size={16} className="mr-1" />
              {new Date(movie.release_date).toLocaleDateString()}
            </span>

            <span
              className={`hidden xl:inline-flex items-center leading-none text-xs mr-3 py-1 ${voteColor(
                movie.vote_average
              )}`}
            >
              {movie.vote_average}
            </span>
            <span className="hidden text-gray-400 mr-3 xl:inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-xs pr-3 py-1 border-r-2 border-gray-200">
              <span className="mr-1">Language</span>
              {movie.original_language.toUpperCase()}
            </span>
            <span className="hidden text-red-200 xl:inline-flex items-center leading-none text-xs">
              <IconHeartFilled
                size={14}
                stroke={2}
                className="mr-1 mb-[2px] text-red-700"
              />
              {movie.vote_count}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCards;
