import React, { useEffect, useState } from "react";
import minifaker from "minifaker";
import "minifaker/locales/en";

const Stories = () => {
  const [storyUsers, setStoryUsers] = useState([]);
  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: "en" }),
    }));
  });
  return <div>Stories</div>;
};

export default Stories;
