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
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};

const Page = ({ id }) => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState();

  const uid = id.toString();
  console.log(uid);

  useEffect(() => {
    const unsubscripe = onSnapshot(
      query(collection(db, "posts"), where("userId", "==", uid)),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center min-w-[100vw]">
      <Header />
      <section className="flex flex-shrink justify-center items-center mt-10 py-4 md:w-[700px] w-[90%]">
        <Stories />
      </section>

      <section className="grid grid-cols-4 gap-10 w-[70%] items-center justify-center">
        {posts.map((post) => (
          <LazyLoadImage
            onClick={() => {
              setActivePhoto(post.data().image);
              setIsOpen(true);
            }}
            effect="blur"
            src={post.data().image}
            alt={post.data().caption}
            className="h-[300px] w-[400px] box-border border-2 border-black rounded-md hover:opacity-75 cursor-pointer transition-all"
          />
        ))}
      </section>

      <Modal
        isOpen={isOpen}
        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <LazyLoadImage
          src={activePhoto}
          alt="img"
          effect="blur"
          className="h-[600px] w-[700px] box-border border-2 border-black rounded-md cursor-pointer transition-all"
        />
        <span className="absolute top-[2%] right-[2%] text-7xl">&times;</span>
      </Modal>
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
