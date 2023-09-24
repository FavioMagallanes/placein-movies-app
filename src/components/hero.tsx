import logo from "../assets/logo-placein.png";
import heroImage from "../assets/hero-image.jpg";
import { IconHeart } from "@tabler/icons-react";

export const Hero = () => {
  return (
    <section className="min-h-screen min-w-full bg-[#0F172A] flex flex-col justify-center p-10 animate-fade-right animate-delay-500">
      <div className="relative w-full max-w-full lg:max-w-6xl xl:max-w-screen-2xl mx-auto">
        <div className="absolute inset-0 -mr-3.5 bg-gradient-to-br from-indigo-200 via-green-300 to-yellow-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:rotate-3 sm:rounded-3xl"></div>
        <div className="relative bg-[#111E35] shadow-lg sm:rounded-3xl">
          <div className="px-6 lg:px-20 py-8">
            <article className="flex items-center justify-between">
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center text-3xl font-bold text-true-gray-800">
                  <div className="flex items-center gap-6">
                    <img src={logo} alt="logo" className="h-8 w-8" />
                    <span className="text-gray-100 font-semibold text-lg hidden xl:block tracking-tight">
                      Placein Movies
                    </span>
                  </div>
                </div>
              </div>
              <div className=" md:flex items-center justify-center hover:bg-red-100 rounded-full ">
                <IconHeart
                  size={18}
                  stroke={2}
                  className="text-gray-100 hover:text-red-700 cursor-pointer"
                />
              </div>
            </article>

            <article className=" mt-20 lg:mt-40 lg:ml-16 text-left flex items-center">
              <div className="lg:2/6 xl:w-2/4">
                <div className="md:text-2xl text-center lg:text-start text-3xl lg:text-8xl md:text-start text-gray-100 font-black leading-none">
                  <h1 className="tracking-tight">
                    Welcome to <br /> Placein Movies
                  </h1>
                </div>
                <div className="mt-6 text-sm lg:text-2xl text-center lg:text-start font-normal antialiased tracking-tight text-gray-500">
                  A place to find your favourite movies and save them to your
                  favourites list.
                </div>
              </div>
              <div className=" mt-12 lg:mt-0 lg:ml-20 text-left">
                <img
                  className="w-96 h-w-96 rounded-full object-cover object-center hidden xl:block"
                  src={heroImage}
                  alt="hero image"
                />
              </div>
            </article>
            <div className="mt-12 lg:mt-12 lg:ml-20 text-left">
              <div className="flex items-center justify-center md:w-12 h-12 rounded-full bg-cool-gray-100 text-white animate-bounce hover:text-gray-900 hover:bg-cool-gray-50 transition duration-300 ease-in-out">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
