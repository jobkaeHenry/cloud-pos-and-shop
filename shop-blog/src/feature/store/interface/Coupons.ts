export interface RateCoupons extends CouponPrototype {
  type: "rate";
}
export interface AmountCoupons extends CouponPrototype {
  type: "amount";
}

export type Coupon = RateCoupons | AmountCoupons;

interface CouponPrototype {
  id: number;
  title: string;
  amount: number;
}

export type Coupons = Coupon[];
