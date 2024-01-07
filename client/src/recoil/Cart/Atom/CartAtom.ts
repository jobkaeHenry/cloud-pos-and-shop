import { atom } from "recoil";
import { CartItem, CartItems } from "../../../types/CartItems";
import { setLS } from "../../../utils/localStorage";
import { localStorageKey } from "../../../const/localstorageKey";
/**
 * 카트에 담겨있는 아이템리스트
 */
export const CartAtom = atom<CartItems>({
  key: "CartItems",
  default: [],
  effects: [
    ({ onSet }) => {
      onSet((cartItems) => {
        setLS(localStorageKey._tempCart, cartItems);
      });
    },
  ],
});

/**
 * 현재 선택된 아이템 (수량 변경용)
 */
export const SelectedItemAtom = atom<CartItem['cartId']>({
  key: "SelectedCartItemAtom",
  default: '',
})