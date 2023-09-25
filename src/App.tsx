import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home-page/home-page";
import { Favorites } from "./pages/favorite-movies/favorite-movies-page";
import { Layout } from "./components/ui/layout";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { Spinner } from "@material-tailwind/react";
import { DetailMovies } from "./pages/movie-details/movie-details-page";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        { path: "/", index: true, element: <Home /> },
        {
          path: "/favorites",
          element: <Favorites />,
          loader: () => import("./pages/favorite-movies/favorite-movies-page"),
        },
        {
          path: "/detail-movies/:id",
          element: <DetailMovies />,
          loader: () => import("./pages/movie-details/movie-details-page"),
        },
      ],
    },
  ]);
  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A]">
      <RouterProvider router={routes} fallbackElement={<Spinner />} />
    </div>
  );
}

export default App;
