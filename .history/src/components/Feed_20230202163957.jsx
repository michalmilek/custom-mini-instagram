import React from "react";
import Stories from "./Stories";

const Feed = () => {
  return (
    <main>
      <section className="pl-6 mt-10 lg:pl-40 py-4 bg-white border border-gray-200 drop-shadow-sm">
        <Stories />
      </section>

      <section></section>
    </main>
  );
};

export default Feed;
