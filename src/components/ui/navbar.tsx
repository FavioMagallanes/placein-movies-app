import { Navbar } from "@material-tailwind/react";
import logo from "../../assets/logo-placein.png";
import { NavLink } from "react-router-dom";
import { IconHeart } from "@tabler/icons-react";

export const NavbarComponent = () => {
  return (
    <Navbar
      className="mx-auto max-w-screen-xl py-1 mt-6 px-4 lg:px-8"
      shadow={false}
      color="transparent"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center text-3xl font-bold text-true-gray-800">
            <NavLink to="/" className="flex items-center gap-6">
              <img src={logo} alt="logo" className="h-6 w-6" />
              <span className="text-gray-100 font-semibold text-lg hidden xl:block tracking-tight">
                Placein Movies
              </span>
            </NavLink>
          </div>
        </div>
        <div className=" md:flex items-center justify-center hover:bg-red-100 rounded-full ">
          <NavLink to="/favorites">
            <IconHeart
              size={18}
              stroke={2}
              className="text-gray-100 hover:text-red-700 cursor-pointer"
            />
          </NavLink>
        </div>
      </div>
    </Navbar>
  );
};
