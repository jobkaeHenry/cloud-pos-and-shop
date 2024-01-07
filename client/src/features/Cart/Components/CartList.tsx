import { useRecoilState, useRecoilValue } from "recoil";
import { CartAtom, SelectedItemAtom } from "../../../recoil/Cart/Atom/CartAtom";
import CartElem from "./CartElem";
import { useCallback, useEffect } from "react";
import { CartItem } from "../../../types/CartItems";
import { AnimatePresence } from "framer-motion";

const CartList = () => {
  const [selectedItem, setSelectedItem] = useRecoilState(SelectedItemAtom);
  const cartItems = useRecoilValue(CartAtom);

  const onClickHandler = useCallback(
    (cartId: CartItem["cartId"]) => {
      // 이미 선택된 아이템인 경우
      if (selectedItem === cartId) {
        setSelectedItem(""); // 선택을 해제함
      } else setSelectedItem(cartId); //그 외의 경우 새로선택
    },
    [selectedItem, setSelectedItem]
  );

  useEffect(() => {
    // 선택된 아이템이 사라졌을경우
    if (cartItems.findIndex((e) => e.cartId === selectedItem) === -1) {
      // 선택된 아이템을 없음으로 바꿈
      setSelectedItem("");
    }
  }, [cartItems, selectedItem, setSelectedItem]);

  return (
    <ul className="py-[100px] z-0">
      <AnimatePresence mode="popLayout">
        {cartItems.map((cartItem) => (
          <CartElem
            data={cartItem}
            key={cartItem.cartId}
            onClick={() => {
              onClickHandler(cartItem.cartId);
            }}
            highlighted={selectedItem === cartItem.cartId}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default CartList;
