import React from "react";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";

const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <header className="px-6 lg:px-40 z-20 py-4 shadow-sm sticky top-0 bg-white">
      <div className="flex justify-between items-center">
        {/* left */}
        <div className="flex">
          <h1 className="text-3xl hidden md:block font-Roboto">MMINSTAGRAM</h1>
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
          <HomeIcon className="h-8 w-8 hidden md:block transform hover:scale-125 transition-all cursor-pointer duration-200" />

          {session ? (
            <>
              <PlusCircleIcon className="h-8 w-8 transform hover:scale-125 transition-all cursor-pointer duration-200" />

              <Image
                src={session.user.image}
                width={40}
                height={40}
                className="rounded-full"
              />
            </>
          ) : (
            <button
              onClick={signIn}
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
