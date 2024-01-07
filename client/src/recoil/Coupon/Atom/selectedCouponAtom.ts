import { atom } from "recoil";
import { Coupon } from "../../../types/Coupons";

/**
 * 현재 선택된 쿠폰
 */
export const selectedCouponAtom = atom<Coupon | "">({
  key: "selectedCouponAtom",
  default: "",
});

