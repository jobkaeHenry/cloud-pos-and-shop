import RepeatComponent from "../../components/Hocs/RepeatComponent";

const ProductListSkeleton = () => {
  return (
    <ul className="grid gap-4 p-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <RepeatComponent count={7}>
        <li className="animate-pulse">
          <div className="bg-slate-100 border p-4 min-h-[130px] w-full"/>
        </li>
      </RepeatComponent>
    </ul>
  );
};

export default ProductListSkeleton;
