import React, { useEffect, useState } from "react";
import minifaker from "minifaker";
import "minifaker/locales/en";
import Story from "./Story";
import { useSession } from "next-auth/react";

const Stories = () => {
  const [storyUsers, setStoryUsers] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));
    setStoryUsers(storyUsers);
    console.log(storyUsers);
  }, []);
  return (
    <div className="flex bg-white border border-gray-200 drop-shadow-sm scrollbar-none justify-start items-center overflow-x-scroll py-3 px-4">
      {session && (
        <Story
          username={session.user.username}
          img={session.user.image}
        />
      )}
      {storyUsers.map((user) => (
        <Story
          key={user.id}
          username={user.username}
          img={user.img}
        />
      ))}
    </div>
  );
};

export default Stories;
