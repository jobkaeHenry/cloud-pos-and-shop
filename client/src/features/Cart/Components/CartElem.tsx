import { DetailedHTMLProps, LiHTMLAttributes, forwardRef } from "react";
import { CartItem } from "../../../types/CartItems";

import useCart from "../hooks/useCart";
import { motion } from "framer-motion";
import { IconButton, Stack } from "@mui/material";

import ProductImage from "../../ProductList/ProductImage";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CartElemContent } from "./CartElemContent";
import NumberInput from "../../../components/Atom/NumberInput";

interface Props
  extends Omit<
    DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    "onClick"
  > {
  data: CartItem;
  highlighted?: boolean;
  onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const CartElem = forwardRef(
  (
    {
      data,
    }: // onClick, highlighted
    Props,
    ref: React.ForwardedRef<HTMLLIElement>
  ) => {
    const { remove, plusQuantity, minusQuantity } = useCart();
    const { quantity, cartId, image, title } = data;

    return (
      <Stack
        component={motion.li}
        className={"select-none"}
        p={2}
        gap={2}
        bgcolor={"background.paper"}
        border={"1px solid"}
        borderColor={"grey.100"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"start"}
        // 모션프롭
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%", transition: { duration: 0.1 } }}
        transition={{ duration: 0.25, type: "spring" }}
        layout
        ref={ref}
      >
        <ProductImage
          src={image}
          alt={title}
          sx={{ maxHeight: "48px", width: "auto" }}
        />
        <Stack
          flexGrow={1}
          direction={"column"}
          justifyContent={"space-between"}
          alignItems={"start"}
          gap={2}
        >
          <CartElemContent data={data} notShowQuantity />

          <Stack
            alignSelf={"end"}
            direction={"row"}
            alignItems={"center"}
            gap={2}
          >
            <NumberInput
              value={quantity}
              onClickMinus={() => minusQuantity(cartId)}
              onClickPlus={() => plusQuantity(cartId)}
            />

            <IconButton
              onClick={() => {
                remove(cartId);
              }}
              color="primary"
              sx={{ bgcolor: "grey.100" }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

export default CartElem;
