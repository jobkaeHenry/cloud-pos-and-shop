import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { axiosPrivate } from "./../../../../libs/axios/axios";
import { Order } from "../../../../types/Orders";
import useMyInfoQuery from "../../../auth/api/useMyInfoQuery";
import useSSE from "../../../../hooks/useSSE";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { Box } from "@mui/material";
import { useState } from "react";

import Receipt from "./../../../Purchase/Receipt";
import getDiscountedPriceByCoupon from "../../../../utils/getDiscountedPriceByCoupon";
import getPriceToPurchase from "../../../../utils/getPriceToPurchase";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const OrderHistory = () => {
  const { data } = useSuspenseQuery({
    queryFn: async () => {
      const { data } = await axiosPrivate.get<Order[]>("/order");
      return data;
    },
    queryKey: ["order"],
  });
  const { data: me } = useMyInfoQuery();
  const queryclient = useQueryClient();

  useSSE({
    url: "/sse/" + me.id,
    onOpen: () => {
      console.log("open");
      queryclient.invalidateQueries({ queryKey: ["order"] });
    },
    onMessage: async (message: MessageEvent<string>) => {
      const { data } = await message;
      queryclient.cancelQueries({ queryKey: ["order"] });
      const querySnapshot = queryclient.getQueryData<Order[]>(["order"]);
      queryclient.setQueryData(["order"], [...querySnapshot, JSON.parse(data)]);
    },
  });

  return (
    <TableContainer sx={{ height: "100%" }}>
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell>상품명</TableCell>
            <TableCell>주문 총액</TableCell>
            <TableCell>총 수량</TableCell>
            <TableCell>날짜</TableCell>
            <TableCell>상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ status, createdAt, id, orderedItems, coupon }) => (
            <CollapsableRow
              key={id}
              data={{ status, createdAt, id, orderedItems, coupon }}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
const CollapsableRow = ({ data }: { data: Order }) => {
  const { status, createdAt, orderedItems, coupon } = data;
  const [open, setOpen] = useState(false);

  const totalPrice = orderedItems.reduce(
    (acc, { price, quantity, option }) =>
      acc +
      (price + option.reduce((acc, { price }) => acc + price, 0)) * quantity,
    0
  );
  const totlaQuantity = orderedItems.reduce(
    (acc, { quantity }) => acc + quantity,
    0
  );
  const discountablePrice = getDiscountedPriceByCoupon({
    coupon,
    totalPrice: totalPrice,
  });
  const priceToPurchase = getPriceToPurchase({ totalPrice, discountablePrice });

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
            orderedItems.length - 1 > 0 ? `외 ${totlaQuantity - 1} 건` : ""
          }`}
        </TableCell>
        <TableCell>
          {/* 총 가격 */}
          {priceToPurchase.toLocaleString()}원
        </TableCell>
        <TableCell>{totlaQuantity}</TableCell>
        <TableCell>{dayjs(createdAt).fromNow()}</TableCell>
        <TableCell>{status}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box p={4} margin={"0 auto"}>
              <Receipt
                items={orderedItems}
                priceToPurchase={priceToPurchase}
                discountablePrice={discountablePrice}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderHistory;
