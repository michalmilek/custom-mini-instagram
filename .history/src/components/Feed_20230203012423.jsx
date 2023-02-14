import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";

const Feed = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <section className="flex-shrink justify-center items-centermt-10 py-4 w-[700px]">
        <Stories />
      </section>

      <section className="flex-shrink">
        <Posts />
      </section>

      <section className="hidden flex-col md:flex absolute right-[20%] top-[10%]">
        <MiniProfile />
      </section>
    </main>
  );
};

export default Feed;
