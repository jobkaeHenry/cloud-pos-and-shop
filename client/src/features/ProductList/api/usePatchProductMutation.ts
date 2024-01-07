import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PatchProductDTO } from "../types/ProductDTO";
import { axiosPrivate } from "../../../libs/axios/axios";
import { PATCH_PRODUCT } from "../../../const/serverPath";
import { ProductQueryKeys } from "./useProductQuery";

const usePatchProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ menuId, formData }: PatchProductFnInterface) =>
      await patchProduct({ formData, menuId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ProductQueryKeys.all });
    },
  });
};

interface PatchProductFnInterface {
  menuId: number;
  formData: PatchProductDTO;
}

export const patchProduct = async ({
  formData,
  menuId,
}: PatchProductFnInterface) => {
  const { data } = await axiosPrivate.patch(PATCH_PRODUCT(menuId), {
    ...formData,
    price: Number(formData.price),
  });
  return data;
};

export default usePatchProductMutation;
