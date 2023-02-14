import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscripe = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs);
    });
  }, []);

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      {posts.map((post) => (
        <Post
          key={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};

export default Posts;
