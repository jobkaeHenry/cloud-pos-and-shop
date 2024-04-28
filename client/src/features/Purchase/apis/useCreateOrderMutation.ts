import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "../../../libs/axios/axios";
import { Coupon } from "../../../types/Coupons";
import { Order, OrderedItem } from "../../../types/Orders";

const useCreateOrderMutation = (
  options?: Omit<
    UseMutationOptions<Order, Error, CreateOrderMutateDTO, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    mutationFn: async ({ couponId, orderedItems }: CreateOrderMutateDTO) => {
      return await CreateOrderMutationFn({ couponId, orderedItems });
    },
    ...options,
  });
};

export const CreateOrderMutationFn = async ({
  couponId,
  orderedItems,
}: CreateOrderMutateDTO) => {
  const { data } = await axiosPrivate.post<Order>("/order", {
    couponId,
    orderedItems,
  });
  return data;
};

export interface CreateOrderMutateDTO {
  couponId?: Coupon["id"];
  orderedItems: Partial<OrderedItem>[];
}

export default useCreateOrderMutation;
