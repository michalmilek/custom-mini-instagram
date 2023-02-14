import React from "react";
import Post from "./Post";

const Posts = () => {
  const posts = [
    {
      id: "1",
      username: "michalmilek",
      userImg:
        "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/78/GEN_Burdol_2021_Split_2.png/revision/latest/scale-to-width-down/250?cb=20210610234029",
      img: "https://img.freepik.com/premium-vector/blue-watercolor-splash_23-2148118814.jpg?w=2000",
      caption: "Nice picture ",
    },
    {
      id: "2",
      username: "burdol",
      userImg:
        "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/78/GEN_Burdol_2021_Split_2.png/revision/latest/scale-to-width-down/250?cb=20210610234029",
      img: "https://img.freepik.com/premium-vector/blue-watercolor-splash_23-2148118814.jpg?w=2000",
      caption: "Nice picture ",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
};

export default Posts;
