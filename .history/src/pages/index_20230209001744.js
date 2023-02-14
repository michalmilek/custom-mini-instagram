import Head from 'next/head'
import Image from 'next/image'
import { Inter } from "@next/font/google";
import Header from "@/components/Header";
import Feed from "@/components/Feed";
import UploadModal from "@/components/UploadModal";
import Modal from "react-modal";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [modalOpen, setModalOpen] = useState(true);
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
        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black rounded-lg text-white h-[300px] w-[400px] text-center flex items-center justify-center">
        <h1 className="text-3xl">App was made for learning purposes only!</h1>
      </Modal>
    </>
  );
}
