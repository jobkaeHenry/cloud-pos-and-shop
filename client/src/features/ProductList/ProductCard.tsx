import { DetailedHTMLProps, LiHTMLAttributes } from "react";
import { Product } from "../../types/Products";
import { MotionProps, motion } from "framer-motion";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ProductImage from "./ProductImage";

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
        transition: { duration: 0.1 },
      }}
      {...others}
    >
      <Card className="cursor-pointer">
        <ProductImage src={data.image} alt={data.title} />
        <CardContent
          sx={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 0.5,
            height: "98px",
          }}
        >
          <Typography fontWeight={800} className="line-clamp-2">
            {data.title}
          </Typography>
          <Typography fontWeight={800} color={"error.main"}>
            &#8361; {data.price.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </motion.li>
  );
};
export default ProductCard;
