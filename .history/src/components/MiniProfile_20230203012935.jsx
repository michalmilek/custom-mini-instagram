import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MiniProfile = () => {
  return (
    <div className="flex flex-col w-[300px]">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <LazyLoadImage
            alt="user"
            effect="blur"
            src="https://i1.sndcdn.com/artworks-5Ob9MscnM8KDRb6n-eoyjJg-t500x500.jpg"
            className="h-16  border-2 cursor-pointer border-orange-600 p-[2px] w-16 self-center rounded-full"
          />
          <p>
            <span className="font-bold">michalmilek</span>
          </p>
        </div>
        <p className="font-bold text-blue-500">Change</p>
      </div>
    </div>
  );
};

export default MiniProfile;
