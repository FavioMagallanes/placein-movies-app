import { useState } from "react";
import { searchMovies } from "../../../redux/movies-slice";
import { useAppDispatch } from "../../../redux/store";

export const InputSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(searchMovies(searchTerm));
    }
  };

  return (
    <div className="flex justify-center mt-8 px-3 md:px-0 gap-2 animate-fade-right animate-delay-500">
      <input
        type="text"
        placeholder="Search movies..."
        className="border-b py-2 px-4 w-96 placeholder:text-sm text-gray-300 font-light outline-none text-sm bg-[#0F172A]"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
