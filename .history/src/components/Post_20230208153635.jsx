import React, { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  EllipsisHorizontalIcon,
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/24/solid";
import {
  HeartIcon,
  ChatBubbleBottomCenterIcon,
  ArrowUpRightIcon,
  BookmarkIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { userState } from "@/atom/userAtom";
import Link from "next/link";
import { uuid } from "uuidv4";

const Post = ({ username, userImg, caption, img, id, uid }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const postRef = useRef();

  useEffect(() => {
    const unsubscripe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
        console.log(posts);
      }
    );
  }, [db, id]);

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: currentUser?.username,
      userImg: currentUser?.userImg,
      timestamp: serverTimestamp(),
      postId: uuid(),
    });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

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

  const writeComm = () => {
    postRef.current.focus();
  };

  return (
    <div className="flex py-2 flex-col gap-3 justify-center items-center border border-gray-200 w-[90%] md:w-[600px] xl:w-[700px]">
      <div className="flex items-center justify-between w-full px-4">
        <Link href={`/profiles/${uid}`}>
          <div className="flex gap-3 flex-shrink-0 items-center">
            <LazyLoadImage
              alt={username}
              effect="blur"
              src={userImg}
              className="h-12 w-12 md:h-16  border-2 cursor-pointer border-orange-600 p-[2px] md:w-16 self-center rounded-full"
            />
            <h1 className="font-bold md:text-base text-sm">{username}</h1>
          </div>
        </Link>
        <EllipsisHorizontalIcon className="h-7 w-7 cursor-pointer" />
      </div>
      <LazyLoadImage
        alt={caption}
        effect="blur"
        src={img}
        className="cursor-pointer p-[2px] w-full lg:h-[400px] lg:w-[700px] object-cover"
      />

      {currentUser && (
        <div className="flex gap-2 justify-between items-center w-full px-4">
          <div className="flex gap-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="icon text-red-500"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="icon"
              />
            )}
            <ChatBubbleBottomCenterIcon
              onClick={writeComm}
              className="icon"
            />
            <ArrowUpRightIcon className="icon" />
          </div>
          <BookmarkIcon className="icon" />
        </div>
      )}
      <div className="flex justify-start items-center w-full px-4 gap-5">
        <p>
          <span className="font-bold md:text-base text-sm">{username}</span>
        </p>
        <p className="md:text-base text-sm">{caption}</p>
      </div>
      {likes.length > 0 && (
        <div className="flex justify-start w-full px-4">
          <p className="font-bold md:text-base text-sm">
            {likes.length} {likes.length > 1 ? "likes" : "like"}
          </p>
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
      {currentUser && (
        <div className="flex justify-between items-center w-full px-4">
          <div className="flex gap-2 justify-center items-center">
            <FaceSmileIcon className="icon" />
            <input
              ref={postRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment..."
              className="bg-transparent focus:border-none focus:ring-0 ring-0 outline-none border-none md:text-base text-sm"
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
    </div>
  );
};

export default Post;
