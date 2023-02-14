import React, { useState } from "react";
import minifaker from "minifaker";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  return (
    <div className="flex flex-col gap-4 mt-12">
      <div className="flex justify-between items-center">
        <p className="text-gray-400 font-bold">Suggestions for you</p>
        <button className="font-bold">See all</button>
      </div>
    </div>
  );
};

export default Suggestions;
