import { useState, useEffect } from "react";
import { Movie } from "../types/movies";
import axios from "axios";

export const useMovieDetails = (id: string) => {
  const [comment, setComment] = useState("");
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<{ comment: string; date: Date }[]>(
    () => {
      const storedComments = localStorage.getItem(`comments_${id}`);
      return storedComments ? JSON.parse(storedComments) : [];
    }
  );

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=8f781d70654b5a6f2fa69770d1d115a3`
        );
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment = { comment, date: new Date() };
    setComments(prevComments => [...prevComments, newComment]);
    setComment("");
  };

  const handleDeleteComment = (index: number) => {
    const newComments = [...comments];
    newComments.splice(index, 1);
    setComments(newComments);
  };

  useEffect(() => {
    localStorage.setItem(`comments_${id}`, JSON.stringify(comments));
  }, [comments, id]);

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
