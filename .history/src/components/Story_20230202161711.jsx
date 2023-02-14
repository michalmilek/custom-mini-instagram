import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Story = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center h-30 w-24 text-ellipsis overflow-hidden whitespace-nowrap border border-black">
      <LazyLoadImage
        alt={user.username}
        effect="blur"
        src={user.img}
        className="h-16 w-16 rounded-full"
      />
      <p className="text-ellipsis">{user.username}</p>
    </div>
  );
};

export default Story;
