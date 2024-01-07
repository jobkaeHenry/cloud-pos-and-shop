import { DetailedHTMLProps, LiHTMLAttributes } from "react";
import { Product } from "../../types/Products";
import { MotionProps, motion } from "framer-motion";

interface Props extends MotionProps {
  data: Product;
  onClick: DetailedHTMLProps<
    LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >["onClick"];
}

const ProductCard = ({ data, ...others }: Props) => {
  return (
    <motion.li
      whileTap={{
        scale: 0.95,
        backgroundColor: "#f5ecff",
        transition: { duration: 0.1 },
      }}
      className={CardWrapper}
      {...others}
    >
      <span className="font-semibold">{data.title}</span>
      <span>{`${data.price.toLocaleString()} 원`}</span>
    </motion.li>
  );
};

const CardWrapper =
  "flex flex-col bg-white gap-2 justify-center items-center text-center border p-4 min-h-[130px] w-full cursor-pointer select-none";

export default ProductCard;
