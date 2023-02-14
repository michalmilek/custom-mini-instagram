import React, { useEffect, useState } from "react";
import minifaker from "minifaker";
import "minifaker/locales/en";

const Stories = () => {
  const [storyUsers, setStoryUsers] = useState([]);
  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: "en" }),
      img: `https://i.pravatar.cc/150?img=${Math.floor(Math.random * 70)}`,
      id: i,
    }));
    setStoryUsers(storyUsers);
    console.log(storyUsers);
  }, []);
  return <div>Stories</div>;
};

export default Stories;
