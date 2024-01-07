import { useEffect } from "react";
import { getLS } from "../utils/localStorage";
import { localStorageKey } from "../const/localstorageKey";
import { CartItems } from "../types/CartItems";
import useModal from "./useModal";
import UseSavedCartItemsModal from "../features/Cart/Components/SavedCartItemsModal";

/**
 * 최초 페이지 진입시 이전에 담아놓은 장바구니아이템이 있다면 불러올 것인지 체크하는 Hooks
 */
const useInitialCartItems = () => {
  const { openModal } = useModal();
  useEffect(() => {
    if (getLS<CartItems>(localStorageKey._tempCart)?.length > 0) {
      openModal(<UseSavedCartItemsModal />);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useInitialCartItems;
