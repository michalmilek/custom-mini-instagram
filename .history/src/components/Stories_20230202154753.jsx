import React, { useEffect, useState } from "react";
import minifaker from "minifaker";

const Stories = () => {
  const [storyUsers, setStoryUsers] = useState([]);
  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => ({
      username: minifaker.username,
    }));
  });
  return <div>Stories</div>;
};

export default Stories;
