import { GET_COUPON_LIST } from "@/const/serverPath";
import axios from "@/libs/api/axios";
import { Coupons } from "../interface/Coupons";

const getCouponLIst = async (shopDomain: string) => {
  const { data } = await axios.get<Coupons>(GET_COUPON_LIST(shopDomain));
  return data;
};

export default getCouponLIst;
