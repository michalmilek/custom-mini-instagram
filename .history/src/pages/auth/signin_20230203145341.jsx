import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Header from "@/components/Header";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const signin = ({ providers }) => {
  console.log(providers);
  return (
    <>
      <Header />
      <div className="bg-gray-50">
        <LazyLoadImage
          alt="insta"
          effect="blur"
          src="https://www.gannett-cdn.com/media/2020/11/24/USATODAY/usatsports/imageforentry39-cbs.jpg"
          className="mix-blend-multiply"
        />
      </div>
    </>
  );
};

export default signin;

export async function getServerSideProps(ctx) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

//https://www.gannett-cdn.com/media/2020/11/24/USATODAY/usatsports/imageforentry39-cbs.jpg
