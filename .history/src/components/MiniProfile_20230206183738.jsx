import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSession, signOut, signIn } from "next-auth/react";

const MiniProfile = () => {
  const { data: session } = useSession();
  return (
    <div className="flex-col gap-4 hidden lg:flex">
      <div className="flex items-center justify-between">
        {session && (
          <div className="flex items-center gap-4">
            <LazyLoadImage
              alt="user"
              effect="blur"
              src={session.user.image}
              className="w-12 h-12 xl:h-16  border-2 cursor-pointer border-orange-600 p-[2px] xl:w-16 self-center rounded-full"
            />
            <p>
              <button className="font-bold text-sm xl:text-base">
                {session.user.username}
              </button>
            </p>
          </div>
        )}
        {session && (
          <button className="font-bold text-blue-500 text-sm xl:text-base">
            Change
          </button>
        )}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-400">Welcome to instagram</p>
        {session ? (
          <button
            onClick={() => signOut()}
            className="font-bold text-blue-500">
            Sign out
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="font-bold text-blue-500">
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default MiniProfile;
