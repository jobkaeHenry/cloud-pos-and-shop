import { selector } from "recoil";
import { CartAtom } from "../Atom/CartAtom";
import { DiscountablePriceSelector } from "../../Coupon/Selector/DiscountablePriceSelector";
import getPriceToPurchase from "../../../utils/getPriceToPurchase";
import { CreateOrderMutateDTO } from "../../../features/Purchase/apis/useCreateOrderMutation";
import { OrderedItem } from "../../../types/Orders";
/**
 * 갯수와 옵션을 포함한 가격을 곱한 최종가격 (할인 적용전)
 */
export const TotalPriceSelector = selector({
  key: "CartTotalPrice",
  get: ({ get }) => {
    const CartItems = get(CartAtom);
    const sum = CartItems.reduce(
      (acc, cur) => acc + cur.totalPrice * cur.quantity,
      0
    );
    return sum;
  },
});

/**
 * 카트에 담겨있는 모든 아이템 갯수의 총합
 */
export const TotalQuantitySelector = selector({
  key: "TotalQuantity",
  get: ({ get }) => {
    const CartItems = get(CartAtom);
    const sum = CartItems.reduce((acc, cur) => acc + cur.quantity, 0);
    return sum;
  },
});
/**
 * 아이템 최종가격 (총액 - 할인액)
 */
export const PriceToPurchaseSelector = selector({
  key: "PriceToPurchaseSelector",
  get: ({ get }) => {
    const totalPrice = get(TotalPriceSelector);
    const discountablePrice = get(DiscountablePriceSelector);
    return getPriceToPurchase({ totalPrice, discountablePrice });
  },
});

export const CartItemToOrderDto = selector({
  key: "CartItemToOrderDto",
  get: ({ get }) => {
    const cartItems = get(CartAtom);
    return cartItems.map<Partial<OrderedItem>>(({ id, quantity, option }) => ({
      menuId: id,
      quantity,
      selectedOptions:
        option.length > 0
          ? option.map(({ id }) => ({ optionId: id }))
          : undefined,
    }));
  },
});
