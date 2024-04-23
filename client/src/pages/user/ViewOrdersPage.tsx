import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import OrderHistory from "../../features/user/components/order/OrderHistory";
import { Suspense } from "react";

const ViewOrdersPage = () => {
  return (
    <Stack gap={2}>
      <Typography variant="h2">주문 현황</Typography>
      <Divider />
      <Typography variant="h2">주문 내역</Typography>
      <Suspense>
        <OrderHistory />
      </Suspense>
    </Stack>
  );
};

export default ViewOrdersPage;
