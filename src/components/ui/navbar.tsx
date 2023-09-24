import { Navbar } from "@material-tailwind/react";
import logo from "../assets/logo-placein.png";

export const NavbarComponent = () => {
  return (
    <Navbar
      className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8  mt-2 mb-4"
      shadow={false}
      color="transparent"
    >
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-8 w-8" />
        </div>
      </div>
    </Navbar>
  );
};
