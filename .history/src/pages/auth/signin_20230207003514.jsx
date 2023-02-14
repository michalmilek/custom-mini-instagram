import React from "react";
import Header from "@/components/Header";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "../../firebase";

const Signin = () => {
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };
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
        <LazyLoadImage
          alt="instav1"
          effect="blur"
          src="https://www.liblogo.com/img-logo/in669id73-instagram-logo-instagram-logo-free-social-icons.png"
          className="mix-blend-multiply bg-gray-50 h-10 w-10"
        />
        <p>App is created for learning purposes</p>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center items-center flex-col">
            <button
              onClick={() => onGoogleClick()}
              className={`rounded-lg bg-orange-700 hover:opacity-70 transition-all text-white py-1 px-4 font-bold`}>
              Sign in with
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
