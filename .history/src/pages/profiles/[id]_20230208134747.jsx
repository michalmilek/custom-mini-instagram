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
import { useRecoilState } from "recoil";
import { userState } from "@/atom/userAtom";
import {
  ArrowUpRightIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";

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
  const [currentUser, setCurrentUser] = useRecoilState(userState);

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
        <button
          onClick={() => {
            setIsOpen(false);
            setActivePhoto(null);
          }}
          className="absolute top-[0%] right-[4%] text-7xl cursor-pointer hover:opacity-50 transition-all duration-200">
          &times;
        </button>
        {currentUser && (
          <div className="flex gap-2 justify-between items-center w-full px-4 bg-white">
            <div className="flex gap-4">
              {/* {hasLiked ? (
                <HeartIconFilled
                  onClick={likePost}
                  className="icon text-red-500"
                />
              ) : (
                <HeartIcon
                  onClick={likePost}
                  className="icon"
                />
              )} */}
              <ChatBubbleBottomCenterIcon
                //onClick={writeComm}
                className="icon"
              />
              <ArrowUpRightIcon className="icon" />
            </div>
            <BookmarkIcon className="icon" />
          </div>
        )}
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
