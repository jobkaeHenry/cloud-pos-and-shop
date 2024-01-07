import { AmountCoupons, RateCoupons } from "@/feature/store/interface/Coupons";

type PriceType = RateCoupons["amount"] | AmountCoupons["amount"];
type CouponType = RateCoupons["type"] | AmountCoupons["type"];
/**
 * 가격과 타입을 입력받아 단위를 붙혀 리턴
 * @param price 쿠폰 가격
 * @param type 쿠폰 타입
 * @returns 원 | % 를 추가한 문자열
 */
const ParsePrice = (price: PriceType, type: CouponType) => {
  switch (type) {
    case "amount":
      return `${price.toLocaleString()}원`;

    case "rate":
      return `${price}%`;

    default:
      return price;
  }
};

export default ParsePrice;
