import { Outlet } from "react-router-dom";
import { Footer } from "./ui/footer";
import { NavbarComponent } from "./ui/navbar";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarComponent />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
