import Header from "@/components/Header";
import Stories from "@/components/Stories";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <section className="flex-shrink justify-center items-center mt-10 py-4 md:w-[700px] w-[90%]">
        <Stories />
      </section>
    </div>
  );
};

export default Page;
