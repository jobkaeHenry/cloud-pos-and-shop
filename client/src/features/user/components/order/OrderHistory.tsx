import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { axiosPrivate } from "./../../../../libs/axios/axios";
import { Order, OrderedItem } from "../../../../types/Orders";
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
import { Box, Typography } from "@mui/material";
import { Fragment, useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale("ko");
// 유틸 분리
const hasOptions = (orderedItems: OrderedItem[]) =>
  orderedItems.some(({ option }) => option.length);

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
    <TableContainer sx={{ maxHeight: "50vh" }}>
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
          {data.map(({ status, createdAt, id, orderedItems }) => (
            <CollapsableRow
              key={id}
              data={{ status, createdAt, id, orderedItems }}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
const CollapsableRow = ({ data }: { data: Order }) => {
  const { status, createdAt, orderedItems } = data;
  const [open, setOpen] = useState(false);

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
            orderedItems.length - 1 > 0
              ? `외 ${orderedItems.length - 1} 건`
              : ""
          }`}
        </TableCell>
        <TableCell>
          {/* 총 가격 */}
          {orderedItems
            .reduce(
              (acc, { price, quantity, option }) =>
                acc +
                (price + option.reduce((acc, { price }) => acc + price, 0)) *
                  quantity,
              0
            )
            .toLocaleString()}
          원
        </TableCell>
        <TableCell>
          {orderedItems.reduce((acc, { quantity }) => acc + quantity, 0)}
        </TableCell>
        <TableCell>{dayjs(createdAt).fromNow()}</TableCell>
        <TableCell>{status}</TableCell>
      </TableRow>

      {/* {hasOptions(orderedItems) && ( */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box p={4} width={"50%"} margin={"0 auto"}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>상품명</TableCell>
                    <TableCell>옵션명</TableCell>
                    <TableCell>가격</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderedItems.map(({ title: menuTitle, option, id }, i) => (
                    <TableRow key={id}>
                      <TableCell colSpan={option.length}>{menuTitle}</TableCell>
                      {option.length > 0 ? (
                        option.map(({ title: optionTitle, id, price }) => (
                          <Fragment key={id}>
                            <TableCell>{optionTitle}</TableCell>
                            <TableCell>{price}</TableCell>
                          </Fragment>
                        ))
                      ) : (
                        <TableCell colSpan={2}>-</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {/* )} */}
    </>
  );
};

export default OrderHistory;
