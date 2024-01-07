import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProductDTO } from "../types/ProductDTO";
import { axiosPrivate } from "../../../libs/axios/axios";
import { ProductQueryKeys } from "./useProductQuery";
import { CREATE_PRODUCT } from "../../../const/serverPath";

const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: CreateProductDTO) =>
      await createProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ProductQueryKeys.all });
    },
  });
};
export const createProduct = async (formData: CreateProductDTO) => {
  const { data } = await axiosPrivate.post(CREATE_PRODUCT, {
    ...formData,
    price: Number(formData.price),
  });
  return data;
};

export default useCreateProductMutation;
