import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import Modal from "react-modal";

const UploadModal = () => {
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div>
      <h1>Open Modal</h1>
      {open && <h2>The Modal is open</h2>}
    </div>
  );
};

export default UploadModal;
