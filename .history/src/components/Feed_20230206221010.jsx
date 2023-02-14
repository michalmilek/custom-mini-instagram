import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";

const Feed = () => {
  const { data: session } = useSession();
  return (
    <main className="flex flex-col items-center justify-center">
      <section className="flex-shrink justify-center items-center mt-10 py-4 md:w-[700px] w-[90%]">
        <Stories />
      </section>

      <div className="flex gap-4 flex-col lg:w-full lg:justify-evenly lg:flex-row px-2">
        <section className="flex-shrink">
          <Posts />
        </section>

        <section className="hidden flex-col md:flex 3xl:absolute w-[350px] px-2 right-[10%] top-[15%]">
          <MiniProfile />
          <Suggestions />
        </section>
      </div>
    </main>
  );
};

export default Feed;
