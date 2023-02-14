import Header from "@/components/Header";
import Stories from "@/components/Stories";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  collectionGroup,
  getDocs,
  onSnapshot,
  orderBy,
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
import Moment from "react-moment";
import UploadModal from "@/components/UploadModal";
import { uuid } from "uuidv4";

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
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const uid = id.toString();

  useEffect(() => {
    const unsubscripe = onSnapshot(
      query(collection(db, "posts"), where("userId", "==", uid)),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);

  useEffect(() => {
    if (activePhoto) {
      const unsubscripe = onSnapshot(
        query(
          collectionGroup(db, "comments"),
          where("postId", "==", activePhoto.postId1.toString()),
          //where("postId", "==", activePhoto.postId1)
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
          console.log(comments);
        }
      );
    }
  }, [activePhoto]);

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: currentUser?.username,
      userImg: currentUser?.userImg,
      timestamp: serverTimestamp(),
      postId: activePhoto.postId1,
      commId: uuid(),
    });
  };

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", currentUser?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", currentUser?.uid), {
        username: currentUser?.username,
      });
    }
  };

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
              setActivePhoto({
                img: post.data().image,
                username: post.data().user,
                caption: post.data().caption,
                postId1: post.data().postId,
              });
              setIsOpen(true);
            }}
            effect="blur"
            src={post.data().image}
            alt={post.data().caption}
            className="h-[300px] w-[400px] box-border border-2 border-black rounded-md hover:opacity-75 cursor-pointer transition-all"
          />
        ))}
      </section>

      {activePhoto && (
        <Modal
          isOpen={isOpen}
          className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <LazyLoadImage
            src={activePhoto.img}
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
            <div>
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
              <div className="flex justify-start items-center w-full px-4 gap-5">
                <p>
                  <span className="font-bold md:text-base text-sm">
                    {activePhoto.username}
                  </span>
                </p>
                <p className="md:text-base text-sm">{activePhoto.caption}</p>
              </div>
            </div>
          )}
          {comments.length > 0 && (
            <div className="w-full px-4 overflow-y-scroll scrollbar-none">
              <h1 className="text-center font-bold text-base md:text-lg">
                Comments
              </h1>
              {comments.map((comment) => (
                <div
                  className="flex items-center justify-between"
                  key={comment.data().timestamp}>
                  <div className="flex items-center gap-2">
                    <LazyLoadImage
                      alt={comment.data().username}
                      effect="blur"
                      src={comment.data().userImg}
                      className="cursor-pointer h-[25px] w-[25px] md:h-[40px] md:w-[40px] rounded-full object-cover"
                    />
                    <p>
                      <span className="font-bold md:text-base text-sm">
                        {comment.data().username}
                      </span>
                    </p>
                    <p className="ml-4 md:text-base text-sm">
                      {comment.data().comment}
                    </p>
                  </div>
                  <Moment
                    className="md:text-base text-sm"
                    fromNow>
                    {comment.data().timestamp?.toDate()}
                  </Moment>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
      <UploadModal />
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
