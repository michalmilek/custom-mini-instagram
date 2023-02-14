import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscripe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().user}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
          uid={post.data().userId}
          postId={post.data().postId}
        />
      ))}
    </div>
  );
};

export default Posts;
