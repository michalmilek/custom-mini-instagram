import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const Header = () => {
  return (
    <header className="px-6 py-2">
      <div className="flex justify-between items-center">
        {/* left */}
        <div className="flex">
          <h1 className="text-3xl hidden md:block font-Roboto">MMINSTAGRAM</h1>
          <h1 className="text-3xl md:hidden font-Roboto">MM</h1>
        </div>

        {/* Middle */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute right-2 top-[50%] translate-y-[-50%] h-5 w-5" />
          <input
            placeholder="Search"
            type="text"
            className="bg-gray-50 border-[1px] focus:ring-black focus:border-black border-gray-400 rounded-lg"
          />
        </div>

        {/* Right */}
        <div>
          <HomeIcon className="h-8 w-8 transform hover:scale-125 transition-all cursor-pointer duration-200" />
          <Image src="https://d2lv662meabn0u.cloudfront.net/boomerang/dynamic/character/00000000/116/42d10e25f9d500aab06ad5b8b7a7a0b8d9a67145_1600856805.jpg" />
        </div>
      </div>
    </header>
  );
};

export default Header;
