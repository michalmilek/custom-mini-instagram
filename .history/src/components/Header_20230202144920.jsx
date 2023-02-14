import React from "react";
import { SearchIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="px-6 py-2">
      <div className="flex">
        {/* left */}
        <div className="flex">
          <h1 className="text-3xl hidden md:block font-Roboto">MMINSTAGRAM</h1>
          <h1 className="text-3xl md:hidden font-Roboto">MM</h1>
        </div>

        {/* Middle */}
        <div></div>
      </div>
    </header>
  );
};

export default Header;
