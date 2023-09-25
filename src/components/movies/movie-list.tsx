import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MovieCards from "./movie-cards";
import { RootState, useAppDispatch } from "../../redux/store";
import { Movie } from "../../types/movies";
import { fetchMoreMovies, fetchPopularMovies } from "../../redux/movies-slice";
import { Spinner } from "@material-tailwind/react";
import { IconArrowBigUpLine } from "@tabler/icons-react";

export const MoviesList = () => {
  const dispatch = useAppDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const loading = useSelector((state: RootState) => state.movies.loading);
  const page = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  const loadMoreMovies = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (
      windowHeight + scrollTop >= documentHeight - 100 &&
      !loading &&
      !loadingMore
    ) {
      setLoadingMore(true);
      dispatch(fetchMoreMovies(page.current + 1)).then(() => {
        setLoadingMore(false);
        page.current += 1;
      });
    }
  }, [dispatch, loading, loadingMore]);

  useEffect(() => {
    window.addEventListener("scroll", loadMoreMovies);

    return () => {
      window.removeEventListener("scroll", loadMoreMovies);
    };
  }, [loadMoreMovies]);

  const handleScrollTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
