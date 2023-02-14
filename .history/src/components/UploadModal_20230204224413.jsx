import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import Modal from "react-modal";
import { CameraIcon } from "@heroicons/react/24/outline";

const UploadModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef();

  return (
    <div>
      <h1>Open Modal</h1>
      {open && (
        <Modal
          className={`max-w-lg w-[90%] h-[300px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white border rounded-md dropshadow-lg`}
          isOpen={open}
          onRequestClose={() => setOpen(false)}>
          <div className="flex flex-col justify-center items-center h-full w-full">
            <CameraIcon className="cursor-pointer bg-red-200 p-2 rounded-full border-2 text-red-500 h-16 w-16" />
            <input
              type="file"
              name="photoInput"
              id="photoInput"
              hidden
              ref={filePickerRef}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UploadModal;
