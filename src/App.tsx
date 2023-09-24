import { Hero } from "./components/hero";
import { Movies } from "./components/movies/movies";
import { MovieProvider } from "./context/movies/movies-context";
function App() {
  return (
    <MovieProvider>
      <main className="flex flex-col min-h-screen bg-[#0F172A]">
        <div className="flex-grow">
          <Hero />
          <Movies />
        </div>
      </main>
    </MovieProvider>
  );
}

export default App;
