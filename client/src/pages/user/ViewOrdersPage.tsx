import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import OrderHistory from "../../features/user/components/order/OrderHistory";
import { Suspense } from "react";

const ViewOrdersPage = () => {
  return (
    <Stack gap={2} height={'calc(100vh - 96px)'}>
      <Typography variant="h2" fontWeight={'bold'}>주문 현황</Typography>
      <Suspense>
        <OrderHistory />
      </Suspense>
    </Stack>
  );
};

export default ViewOrdersPage;
