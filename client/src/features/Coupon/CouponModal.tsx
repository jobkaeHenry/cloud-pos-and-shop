import CouponList from "./CouponList";
import { Suspense } from "react";
import { CircularProgress, Stack } from "@mui/material";

const CouponModal = () => {
  return (
    <Stack gap={2} width={"100%"}>
      {/* 제목 */}
      <Stack flexGrow={1}>
        <span className="font-semibold text-xl">쿠폰 적용하기</span>
        <span>할인쿠폰을 적용해보세요</span>
      </Stack>
      {/* 리스트 */}
      <Suspense
        fallback={
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            height={376}
            width={347}
          >
            <CircularProgress />
          </Stack>
        }
      >
        <CouponList />
      </Suspense>
    </Stack>
  );
};
export default CouponModal;
