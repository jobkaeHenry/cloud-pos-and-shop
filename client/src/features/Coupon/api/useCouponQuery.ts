import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Coupons } from "../../../types/Coupons";
import { axiosPrivate } from "../../../libs/axios/axios";

/**
 * 보유하고 있는 쿠폰을 패칭하는 쿼리
 * @returns Coupon
 */
const useGetCouponQuery = () => {
  return useSuspenseQuery<Coupons>({
    queryKey: CouponQueryKey.all,
    queryFn: async () => {
      const { data } = await axiosPrivate.get<Coupons>("/coupon");
      return data;
    },
  });
};
/**
 * 쿠폰 쿼리를 invalidate 하는 함수를 리턴하는 Hooks
 * @returns 쿠폰 쿼리를 invalidate 하는 함수
 */
export const useInvalidateCouponQuery = () => {
  const queryClient = useQueryClient();
  const invalidateQuery = () =>
    queryClient.invalidateQueries({ queryKey: CouponQueryKey.all });
  return invalidateQuery;
};
/**
 * 보유한 쿠폰을 프리패치하는 함수를 리턴하는 Hooks
 * @returns 보유한 쿠폰을 프리패치하는 함수
 */
export const usePrefetchCouponQuery = () => {
  const queryClient = useQueryClient();
  const prefetch = () =>
    queryClient.prefetchQuery({
      queryKey: CouponQueryKey.all,
      queryFn: async () => {
        const { data } = await axios.get<{ data: Coupons }>("/coupons");
        return data.data;
      },
    });
  return prefetch;
};

export const CouponQueryKey = {
  all: ["Coupons"],
};

export default useGetCouponQuery;
