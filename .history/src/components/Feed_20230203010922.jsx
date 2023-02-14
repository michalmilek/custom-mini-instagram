import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";

const Feed = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <section className="flex-shrink justify-center items-centermt-10 py-4 w-[700px]">
        <Stories />
      </section>

      <section>
        <Posts />
      </section>
    </main>
  );
};

export default Feed;
