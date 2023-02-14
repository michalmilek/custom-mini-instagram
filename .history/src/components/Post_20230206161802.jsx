import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  EllipsisHorizontalIcon,
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
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

const Post = ({ username, userImg, caption, img, id }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsubscripe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, id]);

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  return (
    <div className="flex py-2 flex-col gap-3 justify-center items-center border border-gray-200 w-[700px]">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex gap-3 flex-shrink-0 items-center">
          <LazyLoadImage
            alt={username}
            effect="blur"
            src={userImg}
            className="h-16  border-2 cursor-pointer border-orange-600 p-[2px] w-16 self-center rounded-full"
          />
          <h1 className="font-bold">{username}</h1>
        </div>
        <EllipsisHorizontalIcon className="h-7 w-7 cursor-pointer" />
      </div>
      <LazyLoadImage
        alt={caption}
        effect="blur"
        src={img}
        className="cursor-pointer p-[2px] h-[400px] w-[700px] object-cover"
      />
      {likes.length > 0 && (
        <div>
          <p>{likes.length} likes</p>
        </div>
      )}

      {session && (
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
            <ChatBubbleBottomCenterIcon className="icon" />
            <ArrowUpRightIcon className="icon" />
          </div>
          <BookmarkIcon className="icon" />
        </div>
      )}
      <div className="flex justify-start w-full px-4 gap-5">
        <p>
          <span className="font-bold">{username}</span>
        </p>
        <p>{caption}</p>
      </div>
      {comments.length > 0 && (
        <div className="w-full px-4 overflow-y-scroll scrollbar-none">
          <h1 className="text-center font-bold text-lg">Comments</h1>
          {comments.map((comment) => (
            <div
              className="flex items-center justify-between"
              key={comment.data().timestamp}>
              <div className="flex items-center gap-2">
                <LazyLoadImage
                  alt={comment.data().username}
                  effect="blur"
                  src={comment.data().userImg}
                  className="cursor-pointer h-[40px] w-[40px] rounded-full object-cover"
                />
                <p>
                  <span className="font-bold">{comment.data().username}</span>
                </p>
                <p className="ml-4">{comment.data().comment}</p>
              </div>
              <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
      )}
      {session && (
        <div className="flex justify-between items-center w-full px-4">
          <div className="flex gap-2 justify-center items-center">
            <FaceSmileIcon className="icon" />
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment..."
              className="bg-transparent focus:border-none focus:ring-0 ring-0 outline-none border-none"
              type="text"
            />
          </div>
          <button
            type="submit"
            onClick={sendComment}
            disabled={!comment.trim()}
            className={`font-bold text-blue-500 `}>
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
