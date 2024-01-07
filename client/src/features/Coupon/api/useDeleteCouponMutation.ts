import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../../../libs/axios/axios";
import { DELETE_COUPON_URL } from "../../../const/serverPath";
import { CouponQueryKey } from "./useCouponQuery";

const useDeleteCouponMutation = () => {
  const cueryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCouponMutateFn(id),
    onSuccess: () => {
      cueryClient.invalidateQueries({ queryKey: CouponQueryKey.all });
    },
  });
};

const deleteCouponMutateFn = async (id: number) => {
  const { data } = await axiosPrivate.delete(DELETE_COUPON_URL(id));
  return data;
};

export default useDeleteCouponMutation;
