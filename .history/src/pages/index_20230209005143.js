import Head from 'next/head'
import Image from 'next/image'
import { Inter } from "@next/font/google";
import Header from "@/components/Header";
import Feed from "@/components/Feed";
import UploadModal from "@/components/UploadModal";
import Modal from "react-modal";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [modalOpen, setModalOpen] = useState(true);

  //JSON.parse(localStorage.getItem("modal"))

  useEffect(() => {
    const modal = localStorage.getItem("modal");
    if (modal) {
      setModalOpen(JSON.parse(modal));
    }
  });

  useEffect(() => {
    localStorage.setItem("modal", JSON.stringify(modalOpen));
  }, [modalOpen]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Header />
      <Feed />
      <UploadModal />
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="fixed gap-10 flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black rounded-lg text-white h-[300px] w-[400px] text-center flex items-center justify-center border-2 border-gray-200 drop-shadow-xl">
        <h1 className="text-3xl">App was made for learning purposes only!</h1>
        <span className="text-2xl italic">
          Press outside of the modal to close him.
        </span>
      </Modal>
    </>
  );
}
