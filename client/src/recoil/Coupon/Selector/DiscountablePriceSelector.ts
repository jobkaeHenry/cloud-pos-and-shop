import { selector } from "recoil";
import { TotalPriceSelector } from "../../Cart/Selector/CartSelector";
import { selectedCouponAtom } from "../Atom/selectedCouponAtom";

/**
 * 현재 선택된 쿠폰과 총 가격을 입력받아 할인될 금액을 리턴하는 셀렉터
 */
export const DiscountablePriceSelector = selector({
  key: "DiscountablePriceSelector",
  get: ({ get }) => {
    const totalPrice = get(TotalPriceSelector);
    const selectedCoupon = get(selectedCouponAtom);
    if (selectedCoupon) {
      switch (selectedCoupon.type) {
        case "amount":
          return Math.ceil(selectedCoupon.amount);
        case "rate":
          return Math.ceil(totalPrice * (selectedCoupon.amount / 100));
        default:
          return 0;
      }
    } else return 0;
  },
});
