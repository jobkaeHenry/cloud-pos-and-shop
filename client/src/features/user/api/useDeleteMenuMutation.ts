import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../../../libs/axios/axios";
import { DELETE_PRODUCT } from "../../../const/serverPath";
import { ProductQueryKeys } from "../../ProductList/api/useProductQuery";

const useDeleteMenuMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteMenuMutateFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ProductQueryKeys.all });
    },
  });
};
const deleteMenuMutateFn = async (id: number) => {
  const { data } = await axiosPrivate.delete(DELETE_PRODUCT(id));
  return data;
};

export default useDeleteMenuMutation;
