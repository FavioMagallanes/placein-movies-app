import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home-page";
import { Favorites } from "./pages/favorite-movies-page";
import { Layout } from "./components/layout";
import { DetailMovies } from "./pages/detail-movies-page";
import { NotFoundPage } from "./pages/not-found-page";
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
          loader: () => import("./pages/favorite-movies-page"),
        },
        {
          path: "/detail-movies/:id",
          element: <DetailMovies />,
          loader: () => import("./pages/detail-movies-page"),
        },
      ],
    },
  ]);
  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A]">
      <RouterProvider router={routes} fallbackElement={<div>Loading...</div>} />
    </div>
  );
}

export default App;
