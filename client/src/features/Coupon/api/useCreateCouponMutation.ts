import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../../../libs/axios/axios";
import { CouponQueryKey } from "./useCouponQuery";
import { CREATE_COUPON_URL } from "./../../../const/serverPath";
import { CouponData } from "../components/CouponCardEditor";
import useFireToast from "../../../hooks/useFireToast";

const useCreateCouponMutation = () => {
  const cueryClient = useQueryClient();
  const { fireToast } = useFireToast();
  return useMutation({
    mutationFn: (data: CouponData) => createCouponMutateFn(data),
    onSuccess: (_, { title }) => {
      fireToast(`${title} 쿠폰이 생성됐습니다`);
      cueryClient.invalidateQueries({ queryKey: CouponQueryKey.all });
    },
  });
};

const createCouponMutateFn = async (couponDto: CouponData) => {
  const { data } = await axiosPrivate.post(CREATE_COUPON_URL, {
    ...couponDto,
    amount: Number(couponDto.amount),
  });
  return data;
};

export default useCreateCouponMutation;
