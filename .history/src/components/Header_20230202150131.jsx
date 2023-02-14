import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="px-6 py-2">
      <div className="flex justify-between">
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
            className="bg-gray-50 border-[1px] border-gray-400 outline-none rounded-lg active:outline-none active:border-none focus-visible:border-none focus-visible:outline-none"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
