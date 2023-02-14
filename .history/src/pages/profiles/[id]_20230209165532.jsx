import Header from "@/components/Header";
import Stories from "@/components/Stories";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  collectionGroup,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
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
  FaceSmileIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Moment from "react-moment";
import UploadModal from "@/components/UploadModal";
import { uuid } from "uuidv4";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Head from "next/head";

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
  const [checkedUser, setCheckedUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  //console.log(currentUser);
  console.log(checkedUser[0].data().uid);

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
    const unsubscripe = onSnapshot(
      query(collection(db, "users"), where("uid", "==", uid)),
      (snapshot) => {
        setCheckedUser(snapshot.docs);
        console.log(checkedUser);
      }
    );
  }, []);

  useEffect(() => {
    if (activePhoto) {
      const unsubscripe = onSnapshot(
        query(
          collection(db, "posts", activePhoto.id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      );
    }
  }, [activePhoto]);

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", activePhoto.id, "comments"), {
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
      <Head>
        <title>Mini Instagram</title>
        <meta
          name="description"
          content="Made for learning purposes only"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Header />
      <section className="flex flex-shrink justify-center items-center mt-10 py-4 md:w-[700px] w-[90%]">
        <Stories />
      </section>
      {checkedUser && (
        <section className="flex gap-5 items-center mt-5 bg-white border border-gray-200 drop-shadow-xl p-4">
          <article>
            <LazyLoadImage
              effect="blur"
              src={checkedUser[0].data().userImg}
              alt={checkedUser[0].data().username}
              className="h-[80px] w-[80px] drop-shadow-2xl rounded-full hover:opacity-75 cursor-pointer transition-all"
            />
          </article>
          <article className="flex flex-col justify-center gap-4">
            <div className="flex gap-5">
              <p className="font-bold">{checkedUser[0].data().username}</p>
              {checkedUser[0].data().uid === currentUser.uid && (
                <>
                  <button className="bg-gray-800 drop-shadow-2xl text-white px-3 py-1 rounded-lg hover:scale-105 transition-all duration-200">
                    Edit profile
                  </button>
                  <Cog6ToothIcon className="icon" />
                </>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <PhotoIcon className="icon cursor-auto" />
              <p className="font-bold">{posts.length} posts</p>
            </div>
          </article>
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-[70%] items-center justify-center mt-16">
        {posts.map((post) => (
          <LazyLoadImage
            onClick={() => {
              setActivePhoto({
                img: post.data().image,
                username: post.data().user,
                caption: post.data().caption,
                postId1: post.data().postId,
                id: post.id,
              });
              setIsOpen(true);
            }}
            effect="blur"
            src={post.data().image}
            alt={post.data().caption}
            className="h-[300px] w-[400px] box-border border-4 drop-shadow-2xl border-white rounded-md hover:opacity-75 cursor-pointer transition-all"
          />
        ))}
      </section>

      {activePhoto && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => {
            setIsOpen(false);
            setActivePhoto(null);
          }}
          className="fixed z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white border border-gray-200 drop-shadow-xl">
          <LazyLoadImage
            src={activePhoto.img}
            alt="img"
            effect="blur"
            className="h-[400px] w-[500px] lg:h-[500px] lg:w-[700px] box-border border-2 border-black rounded-md cursor-pointer transition-all"
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
              <div className="flex justify-start items-center w-full px-4 gap-5 mt-2">
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
            <div className="w-full px-4 overflow-y-scroll scrollbar-none flex flex-col gap-3">
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
          {currentUser && (
            <div className="flex justify-between items-center w-full px-4">
              <div className="flex gap-2 justify-center items-center">
                <FaceSmileIcon className="icon" />
                <input
                  //ref={postRef}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter your comment..."
                  className="bg-transparent focus:border-none focus:ring-0 ring-0 outline-none border-none md:text-base text-sm mt-3"
                  type="text"
                />
              </div>
              <button
                type="submit"
                onClick={sendComment}
                disabled={!comment.trim()}
                className={`font-bold text-blue-500 md:text-base text-sm`}>
                Post
              </button>
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
