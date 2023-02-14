import React, { useEffect } from "react";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { userState } from "@/atom/userAtom";

const Header = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    console.log(auth);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUser = async () => {
          const docRef = doc(
            db,
            "users",
            user.auth.currentUser?.providerData[0].uid
          );
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data());
            console.log(currentUser);
          }
        };
        auth && fetchUser();
      }
    });
  }, []);
  return (
    <header className="px-6 lg:px-40 z-20 py-4 shadow-sm sticky top-0 bg-white">
      <div className="flex justify-between items-center">
        {/* left */}
        <div className="flex">
          <Link href={"/"}>
            <h1 className="text-3xl hidden md:block font-Roboto">
              MMINSTAGRAM
            </h1>
          </Link>
          <h1 className="text-3xl md:hidden font-Roboto">MM</h1>
        </div>

        {/* Middle */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute right-2 top-[50%] translate-y-[-50%] h-5 w-5" />
          <input
            placeholder="Search"
            type="text"
            className="bg-gray-50 border-[1px] focus:ring-black focus:border-black border-gray-400 rounded-lg"
          />
        </div>

        {/* Right */}
        <div className="flex gap-3 justify-center items-center">
          <Link href={"/"}>
            <HomeIcon className="h-8 w-8 hidden md:block transform hover:scale-125 transition-all cursor-pointer duration-200" />
          </Link>

          {currentUser ? (
            <>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="h-8 w-8 transform hover:scale-125 transition-all cursor-pointer duration-200"
              />

              <Image
                src={currentUser?.userImg}
                width={40}
                height={40}
                className="rounded-full hover:scale-110 transition-all duration-300 cursor-pointer"
              />
            </>
          ) : (
            <button
              onClick={() => router.push("/auth/signin")}
              className="flex gap-3 items-center justify-center">
              <ArrowRightOnRectangleIcon className="h-8 w-8" />
              <p>Sign in</p>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
