import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { axiosPrivate } from "./../../../../libs/axios/axios";
import { Order } from "../../../../types/Orders";
import useMyInfoQuery from "../../../auth/api/useMyInfoQuery";
import useSSE from "../../../../hooks/useSSE";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import CollapsableRow from "./CollapsableRow";

const OrderHistory = () => {
  // Todo 분리
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
      queryclient.setQueryData(["order"], [JSON.parse(data), ...querySnapshot]);
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

export default OrderHistory;
