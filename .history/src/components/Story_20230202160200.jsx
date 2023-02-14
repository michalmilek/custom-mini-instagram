import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Story = ({ user }) => {
  return (
    <div>
      <LazyLoadImage
        alt={user.username}
        effect="blur"
        src={user.img}
        className="h-16 w-16 rounded-full"
      />
    </div>
  );
};

export default Story;
