import Header from "@/components/Header";
import Stories from "@/components/Stories";
import React from "react";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <div className="flex flex-col items-center min-w-[100vw]">
      <Header />
      <section className="flex flex-shrink justify-center items-center mt-10 py-4 md:w-[700px] w-[90%]">
        <Stories />
      </section>
    </div>
  );
};

export default Page;
