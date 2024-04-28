import { useCallback } from "react";
import useCart from "../../Cart/hooks/useCart";
import { useResetRecoilState } from "recoil";
import { selectedCouponAtom } from "../../../recoil/Coupon/Atom/selectedCouponAtom";
import { useInvalidateCouponQuery } from "../../Coupon/api/useCouponQuery";

/**
 * 유저가 주문하던 내역을 초기화 (다음 유저를 위해 초기화)
 */
const useResetStatus = () => {
  const { reset: resetCartItems } = useCart();
  const resetCoupon = useResetRecoilState(selectedCouponAtom);
  const invalidateCoupon = useInvalidateCouponQuery();

  return useCallback(() => {
    invalidateCoupon(); //쿠폰 쿼리 초기화
    //선택된 쿠폰을 초기화
    resetCartItems(); // 장바구니 아이템을 초기화
    resetCoupon(); // 쿠폰 초기화
  }, []);
};

export default useResetStatus;
