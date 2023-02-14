import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import {
  HeartIcon,
  ChatBubbleBottomCenterIcon,
  ArrowUpRightIcon,
  BookmarkIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const Post = ({ username, userImg, caption, img }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  return (
    <div className="flex py-2 flex-col gap-3 justify-center items-center border border-gray-200 w-[700px]">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex gap-3 flex-shrink-0 items-center">
          <LazyLoadImage
            alt={username}
            effect="blur"
            src={userImg}
            className="h-16  border-2 cursor-pointer border-orange-600 p-[2px] w-16 self-center rounded-full"
          />
          <h1 className="font-bold">{username}</h1>
        </div>
        <EllipsisHorizontalIcon className="h-7 w-7 cursor-pointer" />
      </div>
      <LazyLoadImage
        alt={caption}
        effect="blur"
        src={img}
        className="cursor-pointer p-[2px] h-[400px] w-[700px] object-cover"
      />
      {session && (
        <div className="flex gap-2 justify-between items-center w-full px-4">
          <div className="flex gap-4">
            <HeartIcon className="icon" />
            <ChatBubbleBottomCenterIcon className="icon" />
            <ArrowUpRightIcon className="icon" />
          </div>
          <BookmarkIcon className="icon" />
        </div>
      )}
      <div className="flex justify-start w-full px-4 gap-5">
        <p>
          <span className="font-bold">{username}</span>
        </p>
        <p>{caption}</p>
      </div>
      {session && (
        <div className="flex justify-between items-center w-full px-4">
          <div className="flex gap-2 justify-center items-center">
            <FaceSmileIcon className="icon" />
            <input
              placeholder="Enter your comment..."
              className="bg-transparent focus:border-none focus:ring-0 ring-0 outline-none border-none"
              type="text"
            />
          </div>
          <button
            disabled={!comment.trim()}
            className={`font-bold ${
              comment ? "text-blue-500" : "text-red-500"
            } `}>
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
