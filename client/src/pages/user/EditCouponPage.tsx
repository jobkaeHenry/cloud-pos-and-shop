import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import EditableCouponList from "../../features/Coupon/components/EditableCouponList";
import { Suspense } from "react";
import { CouponWrapper } from "../../features/Coupon/components/CouponCard";
import AddCouponBtn from "../../features/Coupon/components/AddCouponBtn";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "../../components/Loading/Message";

const EditCouponPage = () => {
  return (
    <Stack gap={2}>
      <Typography variant="h2" fontWeight={'bold'}>쿠폰관리</Typography>
      <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
        <AddCouponBtn />
        <ErrorBoundary fallback={<ErrorMessage />}>
          <Suspense fallback={<CouponWrapper />}>
            <EditableCouponList />
          </Suspense>
        </ErrorBoundary>
      </Stack>
    </Stack>
  );
};

export default EditCouponPage;
