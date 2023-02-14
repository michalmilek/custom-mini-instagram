import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import Modal from "react-modal";
import { CameraIcon } from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { userState } from "@/atom/userAtom";

const UploadModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentUser] = useRecoilState(userState);

  async function uploadPost() {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      caption: captionRef.current.value,
      user: currentUser.username,
      profileImg: currentUser.userImg,
      timestamp: serverTimestamp(),
      userId: currentUser.uid,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  }

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
    console.log();
  };

  const filePickerRef = useRef();
  const captionRef = useRef(null);
  return (
    <div>
      {open && (
        <Modal
          className={`max-w-lg w-[90%] h-[300px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white border rounded-md dropshadow-lg`}
          isOpen={open}
          onRequestClose={() => {
            setOpen(false);
            setSelectedFile(null);
          }}>
          <div className="flex flex-col justify-center items-center h-full w-full">
            {selectedFile ? (
              <img
                src={selectedFile}
                onClick={() => setSelectedFile(null)}
                className="w-full max-h-[250px] object-cover cursor-pointer"
              />
            ) : (
              <CameraIcon
                onClick={() => filePickerRef.current.click()}
                className="cursor-pointer bg-red-200 p-2 rounded-full border-2 text-red-500 h-16 w-16"
              />
            )}
            <input
              type="file"
              name="photoInput"
              id="photoInput"
              hidden
              ref={filePickerRef}
              onChange={addImageToPost}
            />
            <input
              type="text"
              placeholder="Please enter your caption..."
              className=" m-4 border-none text-center w-full focus:ring-0"
              ref={captionRef}
            />
            <button
              disabled={!selectedFile || loading}
              onClick={uploadPost}
              className="bg-black transition-all disabled:bg-gray-400 text-white px-3 py-1 rounded-lg drop-shadow-xl shadow-black">
              Upload your post
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UploadModal;
