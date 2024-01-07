import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../../../libs/axios/axios";
import { DELETE_CATEGORY } from "../../../const/serverPath";
import { ProductQueryKeys } from "../../ProductList/api/useProductQuery";
import { CategoriesQueryKeys } from "../../Categories/api/useCategoriesQuery";

const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCategoryMutateFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ProductQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: CategoriesQueryKeys.all });
    },
  });
};
const deleteCategoryMutateFn = async (id: number) => {
  const { data } = await axiosPrivate.delete(DELETE_CATEGORY(id));
  return data;
};

export default useDeleteCategoryMutation;
