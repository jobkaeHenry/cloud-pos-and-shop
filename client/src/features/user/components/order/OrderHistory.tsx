import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { Stack, Typography } from "@mui/material";
import { axiosPrivate } from "./../../../../libs/axios/axios";
import { Order } from "../../../../types/Orders";
import useMyInfoQuery from "../../../auth/api/useMyInfoQuery";
import useSSE from "../../../../hooks/useSSE";

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
    onOpen: () => console.log("open"),
    onMessage: async (message: MessageEvent<string>) => {
      const { data } = await message;
      queryclient.cancelQueries({ queryKey: ["order"] });
      const querySnapshot = queryclient.getQueryData<Order[]>(["order"]);
      queryclient.setQueryData(["order"], [...querySnapshot, JSON.parse(data)]);
    },
  });

  return (
    <div>
      {data.map(({ status, createdAt, id, orderedItems }) => (
        <Stack direction="column" key={id}>
          <Stack gap={2} direction={"row"} justifyContent={"space-between"}>
            <Typography>{status}</Typography>
            <Stack gap={1}>
              {orderedItems.map(({ id, title, price, quantity, option }) => (
                <Stack key={id} gap={1} direction="row">
                  <Typography>{title}</Typography>
                  <Typography>{price}</Typography>
                  <Stack gap={1}>
                    {option.map(({ id, title, price }) => (
                      <Stack key={id} gap={1} direction="row">
                        <Typography>{title}</Typography>
                        <Typography>{price}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Typography>{quantity}</Typography>
                </Stack>
              ))}
            </Stack>
            <Typography>{createdAt}</Typography>
          </Stack>
        </Stack>
      ))}
    </div>
  );
};

export default OrderHistory;
