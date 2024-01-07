import { useSuspenseQuery } from "@tanstack/react-query";
import { Category } from "../../../types/Categories";
import { Products } from "../../../types/Products";
import { axiosPrivate } from "../../../libs/axios/axios";

/**
 * 카테고리를 입력받아 해당 카테고리의 아이템을 리턴하는 쿼리
 * @param category 카테고리ID
 * @returns 해당 카테고리 아이템리스트
 */
const useGetProductQueryByCategory = (category: Category["id"] | "all") => {
  return useSuspenseQuery<Products>({
    queryKey: ProductQueryKeys.all,
    queryFn: async () => {
      const { data } = await axiosPrivate.get<Products>("/menu");
      return data;
    },
    select: (product) =>
      product.filter((product) => {
        if (category === "all") {
          return true;
        } else {
          return product.category.id === category;
        }
      }),
  });
};

export const ProductQueryKeys = {
  all: ["Products"],
};

export default useGetProductQueryByCategory;
