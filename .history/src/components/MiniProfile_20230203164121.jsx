import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSession, signOut } from "next-auth/react";

const MiniProfile = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex-col gap-4 hidden 2xl:flex">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LazyLoadImage
            alt="user"
            effect="blur"
            src="https://i1.sndcdn.com/artworks-5Ob9MscnM8KDRb6n-eoyjJg-t500x500.jpg"
            className="h-16  border-2 cursor-pointer border-orange-600 p-[2px] w-16 self-center rounded-full"
          />
          <p>
            <button className="font-bold">michalmilek</button>
          </p>
        </div>
        <button className="font-bold text-blue-500">Change</button>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-400">Welcome to instagram</p>
        <button className="font-bold text-blue-500">Sign out</button>
      </div>
    </div>
  );
};

export default MiniProfile;
