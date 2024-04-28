import { CardMedia, SxProps, Theme } from "@mui/material";
//@ts-expect-error
import FoodIcon from "../../assets/food-icon.png";

type ProductImageProps = {
  src: string;
  alt: string;
  sx?: SxProps<Theme>;
};

const ProductImage = ({ src, alt, sx }: ProductImageProps) => {
  return (
    <CardMedia
      component={"img"}
      sx={{ aspectRatio: 1, ...sx }}
      src={src ?? FoodIcon}
      alt={alt}
    />
  );
};

export default ProductImage;
