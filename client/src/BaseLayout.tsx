import { Outlet, useLocation } from "react-router-dom";
import { Modal } from "./components/Modal/Modal";
import { useEffect, useState } from "react";
import useModal from "./hooks/useModal";

const BaseLayout = () => {
  const location = useLocation();
  const { closeModal } = useModal();

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    closeModal();
  }, [location]);

  return (
    <>
      <Modal />
      <Outlet />
    </>
  );
};

export default BaseLayout;
