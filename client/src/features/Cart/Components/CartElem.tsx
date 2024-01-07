import { DetailedHTMLProps, LiHTMLAttributes } from "react";
import { CartItem } from "../../../types/CartItems";
import { ColumnWrapper, RowWrapper } from "../../../layouts/Wrapper";
import useCart from "../hooks/useCart";
import { motion } from "framer-motion";
import React from "react";
import { Box } from "@mui/material";

interface Props
  extends Omit<
    DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    "onClick"
  > {
  data: CartItem;
  highlighted?: boolean;
  onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const CartElem = React.forwardRef(
  (
    { data, onClick, highlighted }: Props,
    ref: React.ForwardedRef<HTMLLIElement>
  ) => {
    const { remove } = useCart();

    return (
      <Box
        component={motion.li}
        className={"p-4 border bg-white select-none cursor-pointer "}
        sx={{ borderColor: highlighted ? "secondary.main" : "font.disabled" }}
        onClick={(e) => onClick && onClick(e)}
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%", transition: { duration: 0.1 } }}
        transition={{ duration: 0.25, type: "spring" }}
        layout
        ref={ref}
      >
        <div className="flex justify-end">
          <button
            className="px-4 pr-0 pb-4 justify-self-end"
            onClick={(event) => {
              event.stopPropagation();
              remove(data.cartId);
            }}
          >
            x
          </button>
        </div>
        <CartElemDetail data={data} />
      </Box>
    );
  }
);

export default CartElem;

export const CartElemDetail = ({ data }: { data: CartItem }) => {
  return (
    <ColumnWrapper gap={4}>
      <RowWrapper className="justify-between">
        <RowWrapper gap={2}>
          <span className="font-bold">{data.title}</span>
          <span>{`x ${data.quantity}`}</span>
        </RowWrapper>
        <span>{`${(data.price * data.quantity).toLocaleString()}원`}</span>
      </RowWrapper>

      {data.selectedOptions.length > 0 && (
        <ColumnWrapper gap={2}>
          {data.selectedOptions.map((option) => (
            <RowWrapper
              className="text-gray-500 justify-between"
              key={option.title}
            >
              <span className="before:content-['└'] before:mr-1">
                {option.title}
              </span>
              <span>{`${(option.price ?? 0).toLocaleString()}원`}</span>
            </RowWrapper>
          ))}
        </ColumnWrapper>
      )}

      <span className="text-right font-bold">
        {`총 ${(data.totalPrice * data.quantity).toLocaleString()}원`}
      </span>
    </ColumnWrapper>
  );
};
