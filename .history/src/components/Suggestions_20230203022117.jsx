import React, { useEffect, useState } from "react";
import minifaker from "minifaker";
import "minifaker/locales/en";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      jobTitle: minifaker.jobTitle(),
      img: `https://i.pravatar.cc/150?img=${i + 1}`,
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);
  console.log(suggestions);
  return (
    <div className="flex flex-col gap-4 mt-12">
      <div className="flex justify-between items-center">
        <p className="text-gray-400 font-bold">Suggestions for you</p>
        <button className="font-bold">See all</button>
      </div>
      {suggestions.map((suggestion) => (
        <div
          className="flex items-center justify-between"
          key={suggestion.id}>
          <div className="flex gap-4 items-center">
            <LazyLoadImage
              alt={suggestion.username}
              effect="blur"
              src={suggestion.img}
              className="h-12  cursor-pointer w-12 self-center rounded-full"
            />
            <div className="flex flex-col justify-center items-start">
              <p>
                <span>{suggestion.username}</span>
              </p>
              <p className="text-sm text-gray-300">{suggestion.jobTitle}</p>
            </div>
          </div>
          <button className="font-bold">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
