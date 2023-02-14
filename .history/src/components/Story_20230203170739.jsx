import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSession } from "next-auth/react";
import { PlusIcon } from "@heroicons/react/24/solid";

const Story = ({ username, img }) => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="box-border flex flex-col truncate flex-shrink-0 items-center justify-center h-30 w-24">
      <div
        className={`relative ${
          username === session?.user.username ? "opacity-40" : "opacity-100"
        }`}>
        <LazyLoadImage
          alt={username}
          effect="blur"
          src={img}
          className={`${
            username === session?.user.username ? "opacity-40" : ""
          } h-[70px] border-2 cursor-pointer border-orange-600 p-[2px] w-[70px] self-center rounded-full`}
        />
        {username === session?.user.username && (
          <PlusIcon className="opacity-100 h-14 w-14 font-bold absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white" />
        )}
      </div>
      <p className="truncate text-sm text-center w-[100px] block">{username}</p>
    </div>
  );
};

export default Story;
