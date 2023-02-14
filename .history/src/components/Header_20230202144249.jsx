import React from "react";

const Header = () => {
  return (
    <header className="px-6 py-2">
      {/* left */}
      <div className="flex">
        <div className="flex">
          <h1 className="text-3xl hidden md:block font-Roboto">MMINSTAGRAM</h1>
          <h1 className="text-3xl font-Roboto">MM</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
