import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import Modal from "react-modal";

const UploadModal = () => {
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div>
      <h1>Open Modal</h1>
      {open && (
        <Modal
          className={`max-w-lg w-[90%] h-[300px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]`}
          isOpen={open}
          onRequestClose={() => setOpen(false)}>
          <h2>Modal</h2>
        </Modal>
      )}
    </div>
  );
};

export default UploadModal;
