import { useSetRecoilState } from "recoil";
import { CartAtom } from "../../../recoil/Cart/Atom/CartAtom";
import { Option, Product } from "../../../types/Products";
import { generateCartItemID } from "../utils/generateCartItemID";
import { getOptionPrice } from "../utils/getTotalPrice";
import { CartItem } from "../../../types/CartItems";
import { useCallback } from "react";

const useCart = () => {
  const setCartItem = useSetRecoilState(CartAtom);

  const add = (product: Product, selectedOption?: Option[]) => {
    // 새로 생성된 카트ID
    const newCartId = generateCartItemID(String(product.id), selectedOption);
    const { option, ...filteredProduct } = product;
    setCartItem((prev) => {
      // 카트아이템을 뒤지고
      const index = prev.findIndex((prev) => prev.cartId === newCartId);
      if (index === -1) {
        // 해당아이템이 없다면 Qantity를 1로하고 추가
        return [
          {
            ...filteredProduct,
            quantity: 1,
            cartId: newCartId,
            option: selectedOption ?? [],
            totalPrice:
              filteredProduct.price + getOptionPrice(selectedOption ?? []),
          },
          ...prev,
        ];
        // 해당아이템이 있다면 해당아이템의 Quantity를 +1
      } else if (index !== -1) {
        return prev.map((prevCartItem) => {
          if (prevCartItem.cartId === newCartId) {
            return { ...prevCartItem, quantity: prevCartItem.quantity + 1 };
          } else return prevCartItem;
        });
      }
    });
  };
  /**
   * CartId를 인자로해 해당 아이템을 삭제
   * @param cartId 카트ID
   */
  const remove = (cartId: CartItem["cartId"]) => {
    setCartItem((prev) => prev.filter((item) => item.cartId !== cartId));
  };
  type setStateLike = (prev: CartItem["quantity"]) => number;
  /**
   * CartId와 바꿀 갯수를 입력받아 해당 아이템의 갯수를 변경
   * @param cartId 카트ID
   * @param newQuantity 바뀔 갯수 혹은 SetState처럼 사용 ((prev)=>prev+1)
   */
  const changeQuantity = (
    cartId: CartItem["cartId"],
    newQuantity: number | setStateLike
  ) => {
    setCartItem((prev) =>
      prev.map((item) => {
        if (item.cartId === cartId) {
          if (typeof newQuantity === "function") {
            return { ...item, quantity: newQuantity(item.quantity) };
          } else {
            return { ...item, quantity: newQuantity };
          }
        } else return { ...item };
      })
    );
  };
  /**
   * 카트아이템을 리셋하는 함수
   */
  const reset = () => {
    setCartItem([]);
  };

  const plusQuantity = (itemId: string) =>
    changeQuantity(itemId, (prev) => prev + 1);

  const minusQuantity = (itemId: string) => {
    changeQuantity(itemId, (prev) => (prev > 1 ? prev - 1 : 1));
  };

  return { add, reset, remove, changeQuantity, plusQuantity, minusQuantity };
};

export default useCart;
