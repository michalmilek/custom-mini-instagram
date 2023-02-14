import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

const Post = ({ post }) => {
  return (
    <div className="flex flex-col justify-center items-center border border-gray-200 w-[700px]">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex flex-shrink-0 items-center">
          <LazyLoadImage
            alt={post.username}
            effect="blur"
            src={post.userImg}
            className="h-20  border-2 cursor-pointer border-orange-600 p-[2px] w-20 self-center rounded-full"
          />
          <h1>{post.username}</h1>
        </div>
        <EllipsisHorizontalIcon className="h-7 w-7" />
      </div>
      <LazyLoadImage
        alt={post.caption}
        effect="blur"
        src={post.img}
        className="cursor-pointer p-[2px] h-[400px] w-[700px] object-cover"
      />
      <p>{post.caption}</p>
    </div>
  );
};

export default Post;
