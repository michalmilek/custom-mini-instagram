import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";

const Feed = () => {
  return (
    <main>
      <section className="flex justify-center items-center pl-6 mt-10 lg:px-40 py-4 w-[700px]">
        <Stories />
      </section>

      <section>
        <Posts />
      </section>
    </main>
  );
};

export default Feed;
