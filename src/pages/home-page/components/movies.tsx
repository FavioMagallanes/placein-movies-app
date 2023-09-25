import { MoviesList } from "./movie-list";
import { InputSearch } from "./input-search";

export const Movies = () => {
  return (
    <>
      <InputSearch />
      <section className="text-gray-500 body-font mt-12">
        <div className="container px-12 py-24 mx-auto rounded-xl">
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
