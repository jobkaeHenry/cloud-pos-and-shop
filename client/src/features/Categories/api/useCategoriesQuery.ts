import { useSuspenseQuery } from "@tanstack/react-query";
import { Categories } from "../../../types/Categories";
import { axiosPrivate } from "../../../libs/axios/axios";

/**
 * 카테고리 리스트를 불러오는 쿼리
 */
const useGetCategoriesQuery = () => {
  return useSuspenseQuery<Categories>({
    queryKey: CategoriesQueryKeys.all,
    queryFn: async () => {
      const { data } = await axiosPrivate.get<Categories>("/category");
      return data;
    },
    // 전체보기가 기본
    select: (prev) => [{ title: "All", id: "all" } as any, ...prev],
  });
};

export const CategoriesQueryKeys = {
  all: ["Categories"],
};
export default useGetCategoriesQuery;
