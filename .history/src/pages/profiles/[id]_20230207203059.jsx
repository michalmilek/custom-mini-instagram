import Header from "@/components/Header";
import Stories from "@/components/Stories";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Page = ({ id }) => {
  const [posts, setPosts] = useState([]);

  const uid = id.toString();
  console.log(uid);

  const q = query(collection(db, "posts"), where("userId", "==", uid));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(q);
        setPosts(querySnapshot);
        console.log(posts);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center min-w-[100vw]">
      <Header />
      <section className="flex flex-shrink justify-center items-center mt-10 py-4 md:w-[700px] w-[90%]">
        <Stories />
      </section>

      <section>
        {posts.map((post) => (
          <div>
            <LazyLoadImage
              src={post.data().image}
              alt={post.data().caption}
              className="h-[400px] w-[400px]"
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Page;

export async function getServerSideProps(context) {
  const id = context.params.id;

  return {
    props: { id }, // will be passed to the page component as props
  };
}
