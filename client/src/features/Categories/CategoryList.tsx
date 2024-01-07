import CategoryElem from "./CategoryElem";
import useGetCategoriesQuery from "./api/useCategoriesQuery";
import { useRecoilState } from "recoil";
import CurrentCategoryAtom from "../../recoil/CurrentCategory/Atom/CurrentCategoryAtom";

const CategoryList = () => {
  const { data: categories } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] =
    useRecoilState(CurrentCategoryAtom);

  return (
    <ul className="flex-row flex overflow-x-auto">
      {categories.map((category) => (
        <CategoryElem
          title={category.title}
          key={category.id}
          isSelected={category.id === selectedCategory}
          onClick={() => {
            setSelectedCategory(category.id);
          }}
        />
      ))}
    </ul>
  );
};

export default CategoryList;
