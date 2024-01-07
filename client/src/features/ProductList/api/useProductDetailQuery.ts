import { Product } from "../../../types/Products";
import useGetProductQueryByCategory from "./useProductQuery";

const useProductDetailQuery = (id: Product["id"]) => {
  // FIXME 실제 서버응답으로 바꿔야함
  const { data } = useGetProductQueryByCategory("all");
  return { data: data.filter((product) => product.id === id)[0] };
};

export default useProductDetailQuery;
