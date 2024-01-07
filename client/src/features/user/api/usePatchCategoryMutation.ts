import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../../../libs/axios/axios";
import { PATCH_CATEGORY } from "../../../const/serverPath";
import { ProductQueryKeys } from "../../ProductList/api/useProductQuery";
import { CategoriesQueryKeys } from "../../Categories/api/useCategoriesQuery";

const usePatchCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) =>
      patchCategoryMutateFn(title, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ProductQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: CategoriesQueryKeys.all });
    },
  });
};
const patchCategoryMutateFn = async (title: string, id: number) => {
  const { data } = await axiosPrivate.patch(PATCH_CATEGORY(id), { title });
  return data;
};

export default usePatchCategoryMutation;
