import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMovieDetails } from "../../../hooks/use-movie-details";
import { useParams } from "react-router-dom";
import { DialogFooter, Textarea, Button } from "@material-tailwind/react";
import {
  IconCalendarEvent,
  IconHeartFilled,
  IconHeartPlus,
  IconTrendingUp,
} from "@tabler/icons-react";
import { MovieRating } from "../../favorite-movies/components/rating-movies";
import { RootState } from "../../../redux/store";
import { addFavorite } from "../../../redux/favorites-slice";
import { Movie } from "../../../types/movies";
import { voteColor } from "../../../utils/utils";

export const MovieDetails: FC = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const {
    comment,
    movie,
    isLoading,
    comments,
    handleCommentChange,
    handleSubmit,
    handleDeleteComment,
  } = useMovieDetails(id || "");

  const toggleFavorite = (movie: Movie) => {
    if (favorites.some(favorite => favorite.id === movie.id)) {
      setIsFavorite(true);
    } else {
      dispatch(addFavorite(movie));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    if (favorites.some(favorite => favorite.id === movie?.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites, movie]);

  return (
    <>
      <div className="text-gray-400 body-font overflow-hidden py-6 lg:p-0 min-h-screen">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <div
              className="spinner-border text-gray-400 h-16 w-16 mb-4"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="container px-5 mx-auto mt-24">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="poster"
                className="lg:w-1/2 w-full lg:h-[650px] h-64 object-contain object-center mb-10 lg:mb-0 rounded-xl"
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = "/dont-image.jpg";
                }}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0 lg:py-0">
                <h1 className="text-gray-400 text-3xl title-font font-medium mb-1">
                  {movie?.title}
                </h1>
                <div className="flex items-center mb-4">
                  <div className="text-gray-400 text-xs md:text-sm font-medium mr-2">
                    Add to favorites:
                  </div>
                  {isFavorite ? (
                    <IconHeartFilled
                      size={20}
                      stroke={2}
                      className="text-red-600 cursor-pointer hover:text-red-500 transition-colors duration-300"
                    />
                  ) : (
                    <IconHeartPlus
                      size={20}
                      stroke={2}
                      className="text-red-600 cursor-pointer hover:text-red-500 transition-colors duration-300"
                      onClick={() => toggleFavorite(movie!)}
                    />
                  )}
                </div>
                <div className="flex mb-4">
                  <span className="flex items-center text-gray-400 text-xs md:text-sm font-medium mr-4">
                    <MovieRating />
                  </span>
                  <div className="flex flex-col sm:flex-row">
                    <span className="flex items-center text-gray-400 text-xs md:text-sm font-medium mr-4">
                      <IconHeartFilled
                        size={16}
                        stroke={2}
                        className="text-red-600 mr-1 mb-[2px]"
                      />
                      {movie?.vote_count}
                    </span>

                    <span className="flex items-center text-gray-400 text-xs md:text-sm font-medium">
                      <IconCalendarEvent
                        size={16}
                        stroke={2}
                        className="text-gray-400 mr-1"
                      />
                      {movie?.release_date
                        ? new Date(movie.release_date).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="flex mb-4 items-center">
                  <div>
                    <span className="text-gray-400 text-xs md:text-sm font-medium mr-2">
                      Popularity:
                    </span>
                    <span className="text-gray-600 inline-flex items-center leading-none text-xs md:text-sm mr-3 mt-1">
                      #{movie?.popularity}
                      <IconTrendingUp
                        size={16}
                        stroke={2}
                        className="text-green-500 ml-2"
                      />
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs md:text-sm font-medium">
                      Original language:
                    </span>
                    <span className="text-gray-600 inline-flex items-center leading-none text-xs md:text-sm mr-3 mt-1 ml-1">
                      {movie?.original_language.toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-xs md:text-sm font-medium">
                      Vote average:{"  "}
                    </span>
                    <span
                      className={`text-${voteColor(
                        movie?.vote_average ?? 0
                      )} text-xs font-medium`}
                    >
                      {movie?.vote_average}
                    </span>
                  </div>
                </div>
                <p className="leading-relaxed text-sm">{movie?.overview}</p>

                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5"></div>
                <div className="flex flex-col">
                  <>
                    <span className="title-font font-medium text-2xl text-gray-400 mb-3">
                      Comments
                    </span>
                    {comments.map((comment, index) => (
                      <div
                        key={index}
                        className="flex flex-col mb-4 animate-fade animate-delay-300 transition-all max-w-lg p-4"
                      >
                        <div className="flex justify-between items-center max-w-xl">
                          <p className="text-gray-400 text-xs font-body overflow-hidden whitespace-nowrap text-overflow-ellipsis mr-3">
                            {comment.comment}
                          </p>
                          <button
                            onClick={() => handleDeleteComment(index)}
                            className="text-red-600 text-xs font-medium hover:text-red-500 transition-colors duration-300"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="text-gray-600 text-[10px]">
                          {comment.date.toLocaleString()}
                        </p>
                      </div>
                    ))}
                    <DialogFooter className="flex flex-col items-center p-0 mt-2">
                      <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex flex-col">
                          <Textarea
                            variant="outlined"
                            label="Leave a comment.."
                            id="comment"
                            value={comment}
                            onChange={handleCommentChange}
                            color="deep-purple"
                            required
                            className="rounded-lg p-2 mb-4"
                          />
                        </div>
                        <Button
                          variant="gradient"
                          color="deep-purple"
                          type="submit"
                          className="w-full"
                        >
                          <span>Submit</span>
                        </Button>
                      </form>
                    </DialogFooter>
                  </>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
