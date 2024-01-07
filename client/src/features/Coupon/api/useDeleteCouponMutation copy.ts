import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../../../libs/axios/axios";
import { PATCH_COUPON_URL } from "../../../const/serverPath";
import { CouponQueryKey } from "./useCouponQuery";
import { CouponData } from "../components/CouponCardEditor";

const usePatchCouponMutation = () => {
  const cueryClient = useQueryClient();
  return useMutation({
    mutationFn: (couponData: CouponData) => patchCouponMutateFn(couponData),
    onSuccess: () => {
      cueryClient.invalidateQueries({ queryKey: CouponQueryKey.all });
    },
  });
};

const patchCouponMutateFn = async (couponData: CouponData) => {
  const { id, ...omittedData } = couponData;
  if (!id) {
    throw new Error();
  }
  const { data } = await axiosPrivate.patch(PATCH_COUPON_URL(Number(id)), {
    ...omittedData,
    amount: Number(couponData.amount),
  });
  return data;
};

export default usePatchCouponMutation;
