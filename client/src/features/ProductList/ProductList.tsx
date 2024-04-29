import ProductCard from "./ProductCard";
import CurrentCategoryAtom from "./../../recoil/CurrentCategory/Atom/CurrentCategoryAtom";
import { useRecoilValue } from "recoil";
import useModal from "../../hooks/useModal";
import useGetProductQueryByCategory from "./api/useProductQuery";
import OptionModal from "../Cart/Components/OptionModal";
// import useCart from "../Cart/hooks/useCart";
import { Product } from "../../types/Products";

const ProdutcList = () => {
  // 현재 카테고리
  const CurrentCategory = useRecoilValue(CurrentCategoryAtom);
  const { data: filteredData } = useGetProductQueryByCategory(CurrentCategory);
  // const { add } = useCart();
  const { openModal } = useModal();

  const addToCartHandler = (product: Product) => {
    // if (product.option) {
    openModal(<OptionModal data={product} />);
    // } else {
    //   add(product);
    // }
  };

  return (
    <ul className="grid gap-4 p-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      {filteredData.map((product) => (
        <ProductCard
          data={product}
          key={product.id}
          onClick={() => {
            addToCartHandler(product);
          }}
        />
      ))}
    </ul>
  );
};

export default ProdutcList;
