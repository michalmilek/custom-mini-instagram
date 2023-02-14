import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Post = ({ post }) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <h1>{post.username}</h1>
        <LazyLoadImage
          alt={post.username}
          effect="blur"
          src={post.userImg}
          className="h-20 border-2 cursor-pointer border-orange-600 p-[2px] w-20 self-center rounded-full"
        />
      </div>
      <LazyLoadImage
        alt={post.caption}
        effect="blur"
        src={post.img}
        className="cursor-pointer p-[2px] h-[400px] w-[600px] object-cover"
      />
    </div>
  );
};

export default Post;
