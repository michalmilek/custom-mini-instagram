import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";

const Feed = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <section className="flex-shrink justify-center items-centermt-10 py-4 w-[700px]">
        <Stories />
      </section>

      <section className="flex-shrink">
        <Posts />
      </section>

      <section className="hidden flex-col md:flex absolute w-[350px] px-2 right-[10%] top-[15%]">
        <MiniProfile />
        <Suggestions />
      </section>
    </main>
  );
};

export default Feed;
