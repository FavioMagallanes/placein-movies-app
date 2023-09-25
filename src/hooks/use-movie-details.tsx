import { useState, useEffect } from "react";
import { Movie } from "../types/movies";

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
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${id}?api_key=${
          import.meta.env.VITE_API_KEY
        }`
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
