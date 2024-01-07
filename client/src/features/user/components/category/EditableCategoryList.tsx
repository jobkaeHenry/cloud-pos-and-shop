import useGetCategoriesQuery from "../../../Categories/api/useCategoriesQuery";
import EditableCategoryCard from "./EditableCategoryCard";

const EditableCategoryList = () => {
  const { data: category } = useGetCategoriesQuery();

  return (
    <>
      {category
        .filter(({ id }) => id !== ("all" as any))
        .map(({ id, title }) => (
          <EditableCategoryCard title={title} id={id} key={id} />
        ))}
    </>
  );
};

export default EditableCategoryList;
