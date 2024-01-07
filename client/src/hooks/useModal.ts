import { useRecoilState, useSetRecoilState } from "recoil";
import { isModalOpenAtom, modalComponentAtom } from "../recoil/Modal/Atom/modalAtom";
import { JSXElementConstructor, ReactElement } from "react";


/** 모달 컴포넌트를 인자로 받아 모달을 생성해주는 함수를 리턴하는 훅 */
const useModal = () => {
  const setModalComponent = useSetRecoilState(modalComponentAtom);

  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenAtom);
  /** 모달로 사용할 컴포넌트를 인자로 받아 모달을 생성 */
  const openModal = (component: ReactElement<any, string | JSXElementConstructor<any>>) => {
    if (!isModalOpen) {
      setIsModalOpen(true);
      window.history.pushState(
        { ...window.history.state, modal: true },
        "",
        window.location.href
      );
      window.addEventListener("popstate", closeModal);
    }
    setModalComponent(component);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalComponent(null);
    // 이전에 모달이 켜져있는 경우
    if (window.history.state?.modal) {
      // 뒤로가기를 한번 더먹임
      window.history.back();
    }
    window.removeEventListener("popstate", closeModal);
  };

  return { openModal, closeModal };
};

export default useModal;
