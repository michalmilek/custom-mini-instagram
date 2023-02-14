import Header from "@/components/Header";
import Stories from "@/components/Stories";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Page = () => {
  const [posts, setPosts] = useState();
  const router = useRouter();
  const { id } = router.query;
  console.log(id.toString());

  useEffect(() => {
    const unsubscripe = onSnapshot(
      query(collection(db, "posts"), where("userId", "==", id.toString())),
      (snapshot) => {
        setPosts(snapshot.docs);
        //console.log(posts[0]._document.data.value.mapValue.fields);
      }
    );
  }, [id]);

  /*const citiesRef = collection(db, "cities");

await setDoc(doc(citiesRef, "SF"), {
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });
await setDoc(doc(citiesRef, "LA"), {
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"] });
await setDoc(doc(citiesRef, "DC"), {
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] });
await setDoc(doc(citiesRef, "TOK"), {
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"] });
await setDoc(doc(citiesRef, "BJ"), {
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"] });*/

  return (
    <div className="flex flex-col items-center min-w-[100vw]">
      <Header />
      <section className="flex flex-shrink justify-center items-center mt-10 py-4 md:w-[700px] w-[90%]">
        <Stories />
      </section>

      <section>
        {posts?.map(
          ({
            _document: {
              data: {
                value: {
                  mapValue: {
                    fields: {
                      caption,
                      image,
                      profileImg,
                      timestamp,
                      user,
                      userId,
                    },
                  },
                },
              },
            },
          }) => (
            /*           const { caption, image, profileImg, timestamp, user, userId } =
            post._document.data.value.mapValue.fields;
          console.log(caption); */ <div key={caption}>
              <h1>{caption}</h1>
              <LazyLoadImage
                alt={caption}
                effect="blur"
                src={image}
                className="h-12 w-12 md:h-16  border-2 cursor-pointer border-orange-600 p-[2px] md:w-16 self-center rounded-full"
              />
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default Page;
