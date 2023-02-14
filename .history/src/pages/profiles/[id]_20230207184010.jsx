import Header from "@/components/Header";
import React from "react";

const Page = () => {
  return (
    <div>
      <Header />
      <section className="flex-shrink justify-center items-center mt-10 py-4 md:w-[700px] w-[90%]">
        <Stories />
      </section>
    </div>
  );
};

export default Page;
