import React, { useEffect, useState } from "react";
import minifaker from "minifaker";
import "minifaker/locales/en";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = minifaker.array(5, (i) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      jobTitle: minifaker.jobTitle(),
      img: `https://i.pravatar.cc/150?img=${i}`,
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="flex flex-col gap-4 mt-12">
      <div className="flex justify-between items-center">
        <p className="text-gray-400 font-bold">Suggestions for you</p>
        <button className="font-bold">See all</button>
      </div>
      {suggestions.map((suggestion) => {
        <div key={suggestion.id}></div>;
      })}
    </div>
  );
};

export default Suggestions;
