import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../../../libs/axios/axios";
import { CREATE_CATEGORY } from "../../../const/serverPath";
import { ProductQueryKeys } from "../../ProductList/api/useProductQuery";
import { CategoriesQueryKeys } from "../../Categories/api/useCategoriesQuery";
import useFireToast from "../../../hooks/useFireToast";

const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  const { fireToast } = useFireToast();

  return useMutation({
    mutationFn: (title: string) => createCategoryMutateFn(title),
    onSuccess: (_, title) => {
      fireToast(`"${title}" 카테고리가 생성되었습니다`);
      queryClient.invalidateQueries({ queryKey: ProductQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: CategoriesQueryKeys.all });
    },
  });
};
const createCategoryMutateFn = async (title: string) => {
  const { data } = await axiosPrivate.post(CREATE_CATEGORY, { title });
  return data;
};

export default useCreateCategoryMutation;
