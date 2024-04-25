import { Coupon } from "../types/Coupons";

const getDiscountedPriceByCoupon = ({
  coupon,
  totalPrice,
}: {
  coupon?: Coupon | "";
  totalPrice: number;
}) => {
  if (coupon) {
    switch (coupon.type) {
      case "amount":
        return Math.ceil(coupon.amount);
      case "rate":
        return Math.ceil(totalPrice * (coupon.amount / 100));
      default:
        return 0;
    }
  } else return 0;
};

export default getDiscountedPriceByCoupon;
