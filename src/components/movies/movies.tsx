import { MoviesList } from "./movie-list";
import { InputSearch } from "../input-search";

export const Movies = () => {
  return (
    <>
      <InputSearch />
      <section className="text-gray-500 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div>
            <h2 className="mb-6 font-body text-2xl animate-fade-right animate-delay-500">
              Most Popular
            </h2>
            <MoviesList />
          </div>
        </div>
      </section>
    </>
  );
};
