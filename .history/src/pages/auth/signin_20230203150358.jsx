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
      <div className="bg-gray-50 flex justify-center gap-7 mt-10 flex-col items-center">
        <LazyLoadImage
          alt="insta"
          effect="blur"
          src="https://www.gannett-cdn.com/media/2020/11/24/USATODAY/usatsports/imageforentry39-cbs.jpg"
          className="mix-blend-screen bg-gray-50"
        />
        <div>
          {Object.values(providers).map((provider) => (
            <div
              key={provider.id}
              className="flex justify-center items-center flex-col">
              <LazyLoadImage
                alt="instav1"
                effect="blur"
                src="https://www.liblogo.com/img-logo/in669id73-instagram-logo-instagram-logo-free-social-icons.png"
                className="mix-blend-multiply bg-gray-50 h-10 w-10"
              />
              <p>App is created for learning purposes</p>
              <button className="bg-orange-600 rounded-lg hover:opacity-70 transition-all text-white py-1 px-4 font-bold">
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
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
