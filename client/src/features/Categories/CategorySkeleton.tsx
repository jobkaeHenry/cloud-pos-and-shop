import Logo from "../../assets/Logo";
import RepeatComponent from "./../../components/Hocs/RepeatComponent";

const CategorySkeleton = () => {
  return (
    <nav className="flex-row flex items-center border-b justify-between px-4 h-[60px]">
      <ul className="flex-row flex h">
        <RepeatComponent count={4}>
          <li className="p-4 px-8 cursor-pointer">
            <div className="animate-pulse">
              <div className="bg-slate-200 w-16 h-6"></div>
            </div>
          </li>
        </RepeatComponent>
      </ul>
      <Logo />
    </nav>
  );
};

export default CategorySkeleton;
