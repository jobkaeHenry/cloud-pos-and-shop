import { useRecoilValue } from "recoil";
import Portal from "./Portal";

import useModal from "../../hooks/useModal";
import {
  isModalOpenAtom,
  modalComponentAtom,
} from "../../recoil/Modal/Atom/modalAtom";

export const Modal = () => {
  const modalElem = useRecoilValue(modalComponentAtom);
  const isModalOpen = useRecoilValue(isModalOpenAtom);
  const { closeModal } = useModal();

  return isModalOpen ? (
    <Portal>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-70 z-[9999]"
        onClick={() => {
          closeModal();
        }}
      >
        <dialog
          open
          className="w-fit-content h-fit-content min-w-300 min-h-300 overflow-y-auto max-h-[90vh] relative p-8 md:p-16 bg-white rounded"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            onClick={closeModal}
            className="absolute right-4 top-2 pl-4 pb-2 text-2xl text-gray-400"
          >
            x
          </button>
          {modalElem}
        </dialog>
      </div>
    </Portal>
  ) : null;
};
