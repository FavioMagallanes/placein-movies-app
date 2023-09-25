import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MovieCards from "./movie-cards";
import { RootState, useAppDispatch } from "../../../redux/store";
import { Movie } from "../../../types/movies";
import {
  fetchMoreMovies,
  fetchPopularMovies,
} from "../../../redux/movies-slice";
import { Spinner } from "@material-tailwind/react";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import useScrollToTop from "../../../hooks/useScrollTop";
import { IconArrowBigUpLine } from "@tabler/icons-react";

export const MoviesList = () => {
  const dispatch = useAppDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const loading = useSelector((state: RootState) => state.movies.loading);
  const page = useRef(1);

  const loadingMore = useInfiniteScroll(async () => {
    if (!loading) {
      await dispatch(fetchMoreMovies(page.current + 1)).then(() => {
        page.current += 1;
      });
    }
  });

  const handleScrollTopClick = useScrollToTop();

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  if (loading && page.current === 1) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="md:flex md:flex-wrap">
        {movies.map((movie: Movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </div>
      {loadingMore && (
        <div className="flex justify-center my-4">
          <Spinner />
        </div>
      )}
      <IconArrowBigUpLine
        onClick={handleScrollTopClick}
        className="fixed bottom-5 right-12 text-gray-400  hover:cursor-pointer rounded-full transition-all duration-300 ease-in-out"
      />
    </div>
  );
};
