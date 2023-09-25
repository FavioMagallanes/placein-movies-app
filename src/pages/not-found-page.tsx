import { NavLink } from "react-router-dom";
export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-6xl font-bold text-gray-700">404</div>
      <div className="text-2xl font-medium mb-4">Page Not Found</div>
      <NavLink to="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go Home
        </button>
      </NavLink>
    </div>
  );
};
