import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Story = ({ user }) => {
  return (
    <div className="box-border flex flex-col truncate flex-shrink-0 items-center justify-center h-30 w-28 border border-black">
      <LazyLoadImage
        alt={user.username}
        effect="blur"
        src={user.img}
        className="h-20 border-2 cursor-pointer border-orange-600 p-[2px] w-20 self-center rounded-full"
      />
      <p className="truncate text-center w-[100px] block">{user.username}</p>
    </div>
  );
};

export default Story;
