import React from "react";

const Suggestions = () => {
  return (
    <div className="flex flex-col gap-4 mt-12">
      <div className="flex justify-between items-center">
        <p className="text-gray-400">Suggestions for you</p>
        <button className="font-bold">See all</button>
      </div>
    </div>
  );
};

export default Suggestions;
