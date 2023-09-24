import { Hero } from "./components/hero";

function App() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0F172A]">
      <div className="flex-grow">
        <Hero />
      </div>
    </main>
  );
}

export default App;
