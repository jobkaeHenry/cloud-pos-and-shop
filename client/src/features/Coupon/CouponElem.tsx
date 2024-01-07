import { AmountCoupons, RateCoupons } from "../../types/Coupons";
import ParsePrice from "./utils/ParsePrice";

type Props = {
  data: RateCoupons | AmountCoupons;
};

const CouponElem = ({ data: coupon }: Props) => {

  return (
    <option value={JSON.stringify(coupon)}>
      {`${ParsePrice(coupon.amount, coupon.type)} 할인 쿠폰`}
    </option>
  );
};

export default CouponElem;
