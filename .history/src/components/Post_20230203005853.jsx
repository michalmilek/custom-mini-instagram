import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon,
  ChatBubbleBottomCenterIcon,
  ArrowUpRightIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

const Post = ({ post }) => {
  return (
    <div className="flex py-2 flex-col gap-3 justify-center items-center border border-gray-200 w-[700px]">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex gap-3 flex-shrink-0 items-center">
          <LazyLoadImage
            alt={post.username}
            effect="blur"
            src={post.userImg}
            className="h-16  border-2 cursor-pointer border-orange-600 p-[2px] w-16 self-center rounded-full"
          />
          <h1 className="font-bold">{post.username}</h1>
        </div>
        <EllipsisHorizontalIcon className="h-7 w-7 cursor-pointer" />
      </div>
      <LazyLoadImage
        alt={post.caption}
        effect="blur"
        src={post.img}
        className="cursor-pointer p-[2px] h-[400px] w-[700px] object-cover"
      />
      <div className="flex gap-2 justify-between items-center w-full">
        <div className="flex">
          <ArrowUpRightIcon className="icon" />
          <HeartIcon className="icon" />
          <ChatBubbleBottomCenterIcon className="icon" />
        </div>
        <BookmarkIcon className="icon" />
      </div>
      <div className="flex justify-start w-full px-4 gap-5">
        <p>
          <span className="font-bold">{post.username}</span>
        </p>
        <p>{post.caption}</p>
      </div>
    </div>
  );
};

export default Post;
