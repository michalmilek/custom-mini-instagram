import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useRecoilState } from "recoil";
import { userState } from "@/atom/userAtom";
import { signOut, getAuth } from "firebase/auth";
import { useRouter } from "next/router";

const MiniProfile = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  console.log(currentUser);
  const auth = getAuth();
  const router = useRouter();

  const signOutUser = async () => {
    try {
      await signOut(auth);
      await setCurrentUser({});
      location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex-col gap-4 hidden lg:flex">
      <div className="flex items-center justify-between">
        {currentUser && (
          <div className="flex items-center gap-4">
            <LazyLoadImage
              alt="user"
              effect="blur"
              src={currentUser.userImg}
              className="w-12 h-12 xl:h-16  border-2 cursor-pointer border-orange-600 p-[2px] xl:w-16 self-center rounded-full"
            />
            <p>
              <button className="font-bold text-sm xl:text-base">
                {currentUser.username}
              </button>
            </p>
          </div>
        )}
        {currentUser && (
          <button className="font-bold text-blue-500 text-sm xl:text-base">
            Change
          </button>
        )}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm xl:text-base">
          Welcome to instagram
        </p>
        {currentUser ? (
          <button
            onClick={() => signOutUser()}
            className="font-bold text-sm xl:text-base text-blue-500">
            Sign out
          </button>
        ) : (
          <button
            onClick={() => router.push("/auth/signin")}
            className="font-bold text-sm xl:text-base text-blue-500">
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default MiniProfile;
