import { selector } from "recoil";
import { CartAtom } from "../Atom/CartAtom";
import { DiscountablePriceSelector } from "../../Coupon/Selector/DiscountablePriceSelector";
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
    const priceToPurChase = totalPrice - discountablePrice;
    return priceToPurChase > 0 ? priceToPurChase : 0;
  },
});
