import { useState, useEffect } from "react";
import { Movie } from "../types/movies";

export const useMovieDetails = (id: string) => {
  const [comment, setComment] = useState("");
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<{ comment: string; date: Date }[]>(
    []
  );

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=8f781d70654b5a6f2fa69770d1d115a3`
      );
      const data = await response.json();
      setMovie(data);
      setIsLoading(false);
    };
    fetchMovie();
  }, [id]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComments([...comments, { comment, date: new Date() }]);
    setComment("");
  };

  const handleDeleteComment = (index: number) => {
    const newComments = [...comments];
    newComments.splice(index, 1);
    setComments(newComments);
  };

  return {
    comment,
    movie,
    isLoading,
    comments,
    handleCommentChange,
    handleSubmit,
    handleDeleteComment,
  };
};
