import { DetailedHTMLProps, LiHTMLAttributes } from "react";
import { Product } from "../../types/Products";
import { MotionProps, motion } from "framer-motion";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

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
      {...others}
    >
      <Card>
        <CardMedia
          component={"img"}
          sx={{ aspectRatio: 1.2 }}
          src="https://mui.com/static/images/cards/paella.jpg"
          alt={"test"}
        />
        <CardContent
          sx={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography fontWeight={800}>{data.title}</Typography>
          <Typography>{`${data.price.toLocaleString()} 원`}</Typography>
        </CardContent>
      </Card>
    </motion.li>
  );
};
export default ProductCard;
