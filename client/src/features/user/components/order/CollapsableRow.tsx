import React, { useEffect, useState } from "react";
import { Order, OrderedItem } from "../../../../types/Orders";
import Receipt from "./../../../Purchase/Receipt";
import getDiscountedPriceByCoupon from "../../../../utils/getDiscountedPriceByCoupon";
import getPriceToPurchase from "../../../../utils/getPriceToPurchase";
import CheatingSheet from "./CheatingSheet";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Stack from "@mui/material/Stack";

type CollapsableRowProps = {
  data: Order;
};

dayjs.extend(relativeTime);
dayjs.locale("ko");

const CollapsableRow = ({ data }: CollapsableRowProps) => {
  const { status, createdAt, orderedItems, coupon } = data;
  const [open, setOpen] = useState(false);
  const [cheatingSheet, setCheatingSheet] = useState<OrderedItem | undefined>();

  const totalPrice = orderedItems.reduce(
    (acc, { price, quantity, option }) =>
      acc +
      (price + option.reduce((acc, { price }) => acc + price, 0)) * quantity,
    0
  );
  const totalQuantity = orderedItems.reduce(
    (acc, { quantity }) => acc + quantity,
    0
  );
  const discountablePrice = getDiscountedPriceByCoupon({
    coupon,
    totalPrice: totalPrice,
  });
  const priceToPurchase = getPriceToPurchase({ totalPrice, discountablePrice });

  useEffect(() => setCheatingSheet(undefined), [open]);

  return (
    <>
      <TableRow
        sx={{
          "& *": { borderBottom: "unset" },
        }}
      >
        <TableCell padding="checkbox">
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          {/* 주문 명 */}
          {`${orderedItems[0].title} ${
            orderedItems.length - 1 > 0 ? `외 ${totalQuantity - 1} 건` : ""
          }`}
        </TableCell>
        <TableCell>
          {/* 총 가격 */}
          {priceToPurchase.toLocaleString()}원
        </TableCell>
        <TableCell>{totalQuantity}</TableCell>
        <TableCell>{dayjs(createdAt).fromNow()}</TableCell>
        <TableCell>{status}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Stack p={4} margin={"0 auto"} direction={"row"} gap={2}>
              <Receipt
                items={orderedItems}
                priceToPurchase={priceToPurchase}
                discountablePrice={discountablePrice}
                onClickElement={setCheatingSheet}
              />
              {cheatingSheet !== undefined && (
                <CheatingSheet
                  title={cheatingSheet.title}
                  memo={cheatingSheet.adminMemo}
                />
              )}
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CollapsableRow;
